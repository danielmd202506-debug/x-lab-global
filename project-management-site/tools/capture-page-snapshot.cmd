@echo off
setlocal EnableExtensions

set "PAGE=%~1"
set "VERSION=%~2"
set "WIDTH=%~3"
set "HEIGHT=%~4"

if "%PAGE%"=="" goto usage
if "%VERSION%"=="" goto usage
if "%WIDTH%"=="" set "WIDTH=1440"
if "%HEIGHT%"=="" set "HEIGHT=1200"

set "WORKSPACE=%~dp0.."
for %%W in ("%WORKSPACE%") do set "WORKSPACE=%%~fW"

if not exist "%PAGE%" set "PAGE=%WORKSPACE%\%PAGE%"
if not exist "%PAGE%" (
  echo Page not found: %PAGE%
  exit /b 1
)

for %%P in ("%PAGE%") do set "PAGE_NAME=%%~nP"
for /f %%D in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd"') do set "SNAP_DATE=%%D"

set "OUTPUT_DIR=%WORKSPACE%\snapshots\%SNAP_DATE%"
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

set "OUTPUT_PATH=%OUTPUT_DIR%\%PAGE_NAME%-%VERSION%-%WIDTH%x%HEIGHT%.png"
if exist "%OUTPUT_PATH%" del /q "%OUTPUT_PATH%"

set "PAGE_URL=file:///%PAGE:\=/%"
set "BROWSER=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%BROWSER%" set "BROWSER=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%BROWSER%" (
  echo No supported browser found. Install Microsoft Edge or Google Chrome.
  exit /b 1
)

"%BROWSER%" --headless --disable-gpu --window-size=%WIDTH%,%HEIGHT% --screenshot="%OUTPUT_PATH%" "%PAGE_URL%"

for /l %%A in (1,1,40) do (
  if exist "%OUTPUT_PATH%" (
    for %%F in ("%OUTPUT_PATH%") do (
      if %%~zF GTR 0 goto captured
    )
  )
  powershell -NoProfile -Command "Start-Sleep -Milliseconds 250" >nul
)

echo Browser screenshot failed: %OUTPUT_PATH%
exit /b 1

:captured
echo Snapshot captured: snapshots\%SNAP_DATE%\%PAGE_NAME%-%VERSION%-%WIDTH%x%HEIGHT%.png
echo Record this path in window.xlabSnapshots.imagePath.
exit /b 0

:usage
echo Usage: tools\capture-page-snapshot.cmd PAGE VERSION [WIDTH] [HEIGHT]
exit /b 1
