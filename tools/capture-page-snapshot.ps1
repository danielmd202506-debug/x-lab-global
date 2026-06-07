param(
  [Parameter(Mandatory = $true)]
  [string]$Page,

  [Parameter(Mandatory = $true)]
  [string]$Version,

  [int]$Width = 1440,
  [int]$Height = 1200,

  [string]$OutputRoot = "snapshots"
)

$ErrorActionPreference = "Stop"

$workspace = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$pagePath = if ([System.IO.Path]::IsPathRooted($Page)) { $Page } else { Join-Path $workspace $Page }

if (-not (Test-Path -LiteralPath $pagePath)) {
  throw "Page not found: $pagePath"
}

$browserCandidates = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
)

$browsers = @($browserCandidates | Where-Object { $_ -and (Test-Path -LiteralPath $_) })
if (-not $browsers.Count) {
  throw "No supported browser found. Install Microsoft Edge or Google Chrome."
}

$date = Get-Date -Format "yyyy-MM-dd"
$pageName = [System.IO.Path]::GetFileNameWithoutExtension($pagePath)
$outputDir = Join-Path (Join-Path $workspace $OutputRoot) $date
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$fileName = "{0}-{1}-{2}x{3}.png" -f $pageName, $Version, $Width, $Height
$outputPath = Join-Path $outputDir $fileName
$pageUri = (New-Object System.Uri($pagePath)).AbsoluteUri
Remove-Item -LiteralPath $outputPath -Force -ErrorAction SilentlyContinue

$attempts = @()
$headlessModes = @("--headless", "--headless=new")
$captured = $false

foreach ($browser in $browsers) {
  foreach ($headlessMode in $headlessModes) {
    $command = "& '$browser' $headlessMode --disable-gpu --window-size=$($Width),$($Height) --screenshot='$outputPath' '$pageUri'"
    & powershell -NoProfile -ExecutionPolicy Bypass -Command $command
    $attempts += "$browser $headlessMode isolated shell"

    $capturedFile = $null
    for ($i = 0; $i -lt 40; $i++) {
      $capturedFile = Get-Item -LiteralPath $outputPath -ErrorAction SilentlyContinue
      if ($capturedFile -and $capturedFile.Length -gt 0) { break }
      Start-Sleep -Milliseconds 250
    }

    if ($capturedFile -and $capturedFile.Length -gt 0) {
      $captured = $true
      break
    }
  }
  if ($captured) { break }
}

if (-not $captured) {
  throw "Browser screenshot failed. Attempts: $($attempts -join '; ')"
}

if (-not (Test-Path -LiteralPath $outputPath)) {
  throw "Screenshot was not created: $outputPath"
}

$relativePath = Resolve-Path -LiteralPath $outputPath | ForEach-Object {
  $_.Path.Replace($workspace + [System.IO.Path]::DirectorySeparatorChar, "")
}

Write-Output "Snapshot captured: $relativePath"
Write-Output "Record this path in window.xlabSnapshots.imagePath."
