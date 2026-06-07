# X-LAB Project Management Platform / X-LAB 官网项目管理平台

## 中文

这是一个独立项目，用于管理 X-LAB 官网重构和后续运营治理。它不是 X-LAB 官网本身，而是官网的项目管理平台。

当前模块：

- 需求总览 / Requirement Overview
- VOC 清单 / VOC List
- 问题清单 / Issue List
- 网页快照 / Page Snapshots
- 信息架构 / Information Architecture
- Design System 可视化页 / Visual Design System

治理规则：

- 所有需求、问题和 VOC 都必须围绕信息架构节点关联。
- 每次修改网页版本都必须保留截图。
- 所有 Markdown 文档必须中英文双语，并包含修改记录。
- 本地数据源为 `xlab-data.js`，Notion 为协作归档和同步库。

## English

This is a standalone project for managing the X-LAB official website rebuild and ongoing governance. It is not the public X-LAB website itself. It is the project management platform for the website.

Current modules:

- Requirement Overview
- VOC List
- Issue List
- Page Snapshots
- Information Architecture
- Visual Design System

Governance rules:

- Every requirement, issue, and VOC record must link around information architecture nodes.
- Every modified webpage version must keep a screenshot record.
- Every Markdown document must be bilingual in Chinese and English and include a change log.
- The local display data source is `xlab-data.js`; Notion is the collaborative archive and sync layer.

## Entry

Open `index.html`, which redirects to `requirements-board.html#requirements`.

## Change Log / 修改记录

| Date / 日期 | Change / 修改 | Reason / 原因 | Scope / 范围 |
| --- | --- | --- | --- |
| 2026-06-07 | Created standalone project README. / 创建独立项目 README。 | User clarified this is a separate project management platform for the X-LAB website. / 用户明确这是管理 X-LAB 官网的独立项目管理平台。 | `README.md`, standalone project publishing. |
