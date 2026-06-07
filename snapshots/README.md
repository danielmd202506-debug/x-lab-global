# X-LAB webpage snapshots / X-LAB 网页快照

This folder stores PNG screenshots for modified webpage versions.
本目录用于保存每次页面修改版本的 PNG 截图。

Run from the project root:
在项目根目录运行：

```powershell
& "$env:ProgramFiles\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --window-size=1440,1200 --screenshot="snapshots\2026-06-07\issue-list-v2026-06-07-fr058-1440x1200.png" "file:///C:/Users/Administrator/Documents/x-lab/issue-list.html"
```

Governance rule:
治理规则：

- Every modified page version must have one snapshot record in `window.xlabSnapshots`.
- 每次修改后的页面版本必须在 `window.xlabSnapshots` 中登记一条快照记录。
- Store screenshots under `snapshots/YYYY-MM-DD/`.
- 截图统一保存到 `snapshots/YYYY-MM-DD/`。
- Link each snapshot to the related requirement and issue.
- 每条快照必须关联对应需求和问题。
