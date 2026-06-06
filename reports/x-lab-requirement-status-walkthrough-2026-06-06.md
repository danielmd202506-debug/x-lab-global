# X-LAB Requirement Status Walkthrough

Date: 2026-06-06

Scope: Walkthrough of current developed local pages against `reports/x-lab-functional-requirements-bilingual-2026-06-06.md`.

Reviewed pages:

- `index.html`
- `bike-ad9.html`
- `custom-bike.html`
- `stores.html`
- `dealers.html`
- `supplier.html`
- `factory.html`
- `b2b-login.html`
- `supplier-login.html`
- `b2b-dashboard.html`
- `app.js`
- `styles.css`

## Status Definitions

| Color | Status | Hex | Meaning |
|---|---|---|---|
| Green | 🟢 已上线 | `#2E7D32` | Core page or feature exists and broadly satisfies the requirement at current site/prototype level. |
| Yellow | 🟡 部分上线 | `#F9A825` | Entry, content module, or static prototype exists, but key acceptance criteria, real data, submission flow, or backend workflow is missing. |
| Blue | 🔵 排期中 | `#1565C0` | Current site explicitly marks this as `Planned`, or it is clearly listed in the information architecture as a planned module. |
| Red | 🔴 待开发 | `#C62828` | No meaningful implementation found in the current developed pages. |

## Page-Level Coverage

| Page | Current coverage | Main gaps |
|---|---|---|
| `index.html` | Brand/factory/channel route architecture, sitemap status labels, product/store/dealer/supplier route entry points, planned module markers. | No real model comparison, bike finder, warranty registration, technical docs, local inventory, or owner support modules. |
| `bike-ad9.html` | AD9 route page, performance/factory/store proof cards, links to configurator and dealer route. | No complete spec table, geometry chart, variant comparison, warranty/return details, compatibility badges, or media/owner reviews. |
| `custom-bike.html` | Interactive configurator prototype: scene selection, model mapping, fit sliders, component choices, paint/decal options, RFQ/dealer route CTAs. | No actual RFQ submission, no price/spec comparison, no real geometry chart, no compatibility validation, no dealer inventory or checkout handoff. |
| `stores.html` | Store finder prototype with city input and visit reason selector; fit/test ride/purchase/service confidence cards. | No real store data, no appointment submission, no dealer inventory, no reservation status, no service/warranty workflow. |
| `dealers.html` | Dealer cooperation route with commercial, enablement, and service modules. | No individual dealer pages, inventory update tool, training library, objection sheet, lead inbox, or certified status records. |
| `supplier.html` | Supplier route with qualification, quality gates, shared development, and B2B login handoff. | No structured supplier application/intake form, document upload, certification data, or capability database. |
| `factory.html` | Factory capacity/proof page with frame/wheel/assembly/logistics process and downstream confidence story. | Needs more hard data: capacity figures, quality controls, spare-parts availability, service-parts proof, and lead-time rules. |
| `b2b-login.html` / `supplier-login.html` | Role-based login entry and routing to supplier/dealer dashboard. | Login is front-end only, no authentication, account provisioning, permissions, or request-access workflow. |
| `b2b-dashboard.html` | Static B2B operations dashboard: RFQ/order table, inventory/allocation panel, supplier/dealer role switch, warranty task, document/risk queues. | No data persistence, CRUD, real inventory update, claim tracking, lead inbox, service library, analytics, or integrations. |

## Requirement Status Matrix

| ID | Requirement | Status | Evidence in current pages | Gap / next action |
|---|---|---|---|---|
| FR-001 | 车型对比矩阵 / Model comparison matrix | 🔵 排期中 | `index.html` marks `Model comparison` as `Planned`. | Build real comparison table by model/use case/price/weight/groupset/warranty/channel. |
| FR-002 | 白话版车型选择器 / Plain-language model selector | 🔵 排期中 | `index.html` marks `Bike Finder` as `Planned`. | Add guided selector using riding type, budget, terrain, fit priority, and performance goal. |
| FR-003 | 参数透明模块 / Spec transparency block | 🔴 待开发 | `bike-ad9.html` has high-level AD9 proof cards only. | Add complete product spec blocks on AD9 and future product pages. |
| FR-004 | 几何与适配说明 / Geometry and fit explainer | 🟡 部分上线 | `custom-bike.html` has rider height/inseam sliders and fit readout; `stores.html` has fit support route. | Add real geometry chart, size calculator logic, height/inseam guidance, and dealer fit confirmation on product pages. |
| FR-005 | 一体把/座舱配置指南 / Integrated cockpit configuration guide | 🟡 部分上线 | `custom-bike.html` has handlebar selection and fit controls. | Add cockpit size options, adjustment range, replacement route, and purchase-time change rules. |
| FR-006 | 配置版本对比 / Build variant comparison | 🔴 待开发 | No side-by-side AD9/RT9/GT/build variant comparison found. | Add variant comparison by price, groupset, wheels, power meter, weight, and rider profile. |
| FR-007 | “为什么这个价格”FAQ / Why this price FAQ | 🟡 部分上线 | `index.html` and `factory.html` explain vertical integration and factory proof. | Add explicit FAQ explaining price/value logic, dealer model, warranty, and service commitments. |
| FR-008 | 带库存状态的经销商定位器 / Dealer locator with inventory status | 🟡 部分上线 | `stores.html` has store finder prototype; `index.html` marks `Local inventory` as `Planned`. | Connect real dealer/store data, inventory, sizes, test ride status, and last updated timestamp. |
| FR-009 | 试骑预约/车辆预留流程 / Reserve or request test ride flow | 🟡 部分上线 | `stores.html` has visit reason selector including `Test ride`. | Add appointment form, submit action, dealer notification, and request tracking. |
| FR-010 | 配额与交期可视化 / Allocation and lead-time visibility | 🟡 部分上线 | `factory.html`, `dealers.html`, and `b2b-dashboard.html` mention allocation/lead time; dashboard has allocation panel. | Add public product/dealer lead-time display and preorder/allocation rules. |
| FR-011 | 经销商详情页 / Dealer detail page | 🔴 待开发 | `dealers.html` is a cooperation route, not individual dealer detail. | Build dealer profile pages with address, services, certified status, appointment options, and warranty capability. |
| FR-012 | 经销商库存管理 / Dealer inventory management | 🟡 部分上线 | `b2b-dashboard.html` has static stock/allocation panel. | Add dealer-side editable inventory by model/size/color/test-bike/preorder/lead time and sync to locator. |
| FR-013 | 经销商服务手册库 / Dealer service playbook library | 🔴 待开发 | Dealer/service concepts exist in `dealers.html` and dashboard task lists, but no library. | Build manual/training/compatibility/warranty workflow library in dealer portal. |
| FR-014 | 经销商异议处理单页 / Dealer objection-handling sheet | 🔴 待开发 | No downloadable or shareable objection-handling sheet found. | Create one-page sales support sheet and dealer portal download/share entry. |
| FR-015 | RFQ/试骑线索收件箱 / Lead inbox for RFQ/test rides | 🟡 部分上线 | `b2b-dashboard.html` has work queue and RFQ/order table. | Add actual lead inbox for RFQ/test ride/store requests with status, owner, and SLA. |
| FR-016 | 保修注册流程 / Warranty registration flow | 🔵 排期中 | `index.html` marks `Product registration` as `Planned`. | Build bike registration flow with serial number, proof of purchase, dealer, model, size, and 90-day rule. |
| FR-017 | 保修说明页 / Warranty explainer page | 🔴 待开发 | Warranty is mentioned in `dealers.html`, `stores.html`, and dashboard, but no public explainer page exists. | Add warranty page with coverage, exclusions, registration, claim steps, and response timeline. |
| FR-018 | 保修理赔状态追踪 / Warranty claim status tracking | 🟡 部分上线 | `b2b-dashboard.html` has warranty case task and risk row. | Add claim submission, case ID, document upload, status tracking, and next-action flow. |
| FR-019 | 退货政策决策指南 / Return policy decision guide | 🔴 待开发 | No return policy guide found. | Add pre-checkout and support-page return policy guide. |
| FR-020 | 兼容性与备件数据库 / Compatibility and spare-parts database | 🔴 待开发 | `index.html` marks `Technical documents` as `Planned`, but no compatibility database exists. | Build searchable model/year/component compatibility and spare-parts database. |
| FR-021 | 专有零件透明标签 / Proprietary component transparency badges | 🔴 待开发 | No standard/semi-proprietary/proprietary labels found. | Add badges to product/spec pages with service and replacement implications. |
| FR-022 | 盘片/传动兼容指南 / Chainring and drivetrain compatibility guide | 🔴 待开发 | No drivetrain compatibility guide found. | Add GT/AD/RT drivetrain and chainring compatibility guidance. |
| FR-023 | 认证车主评价系统 / Verified owner review system | 🔴 待开发 | No owner review system found. | Build verified review submission and filtering by model/size/terrain/rider data. |
| FR-024 | 媒体评测中心 / Media review hub | 🔴 待开发 | No media review hub found. | Add third-party review aggregation page or section. |
| FR-025 | 真实车主跟进调研 / Real owner follow-up survey | 🔴 待开发 | No post-purchase survey flow found. | Add survey workflow at 14/60/180 days and feed VOC database. |
| FR-026 | XDS 制造可信度页面 / XDS manufacturing credibility page | 🟢 已上线 | `factory.html` and `index.html` provide manufacturing/factory credibility route. | Strengthen with hard proof: capacity numbers, QC standards, testing evidence, and service-parts process. |
| FR-027 | WorldTour / 赛事背书页面 / WorldTour and race proof page | 🔵 排期中 | `index.html` has `WorldTour signal` card and marks `Race validation` as `Planned`. | Build dedicated race proof page with team/bike/media evidence. |
| FR-028 | 品牌对比叙事 / Brand comparison narrative | 🔴 待开发 | No structured comparison against Trek/Giant/Canyon/Specialized/custom builds. | Add positioning narrative with value, dealer support, warranty, specs, and use cases. |
| FR-029 | 购买前信心检查清单 / Pre-purchase confidence checklist | 🟡 部分上线 | `custom-bike.html` has package checklist; `stores.html` covers fit/test ride/buy/service route. | Add real pre-checkout checklist for fit, warranty, return, service, and configuration. |
| FR-030 | 经销商辅助结账选项 / Dealer-assisted checkout option | 🟡 部分上线 | `custom-bike.html` and product/store pages route users to dealers/stores. | Add actual checkout option: ship-to-dealer, dealer pickup, assembly, consultation. |
| FR-031 | 电助力服务与合规中心 / E-bike service and compliance center | 🔴 待开发 | No e-bike support page or content found. | Build e-bike specs, range, charging, motor/battery replacement, app, and class compliance center. |
| FR-032 | 电池/电机专用工单类型 / Battery and motor support ticket type | 🔴 待开发 | No e-bike-specific support form found. | Add support ticket type with motor/battery serial, firmware/app version, range issue, error code, charger state. |
| FR-033 | VOC 证据数据库 / VOC evidence database | 🟡 部分上线 | VOC and requirement reports exist under `reports/`; Notion pages were created separately. | Create structured app/database with source, date, persona, severity, confidence, owner, and linked requirement. |
| FR-034 | 需求 intake 看板 / Requirement intake board | 🟡 部分上线 | Bilingual requirement list and Notion page exist; no live board in current pages. | Create Notion/database board or in-app board with status, owner, priority, and category. |
| FR-035 | 月度 VOC 刷新流程 / Monthly VOC refresh workflow | 🔴 待开发 | Report recommends refresh cadence, but no workflow exists. | Add recurring review process, source refresh, sentiment deltas, risk updates, and priority changes. |
| FR-036 | 证据到功能的追溯 / Evidence-to-feature traceability | 🟡 部分上线 | Reports preserve source URLs and FR mapping, but no system traceability. | Add relation between VOC evidence items and feature requirements with confidence and verification date. |
| FR-037 | 代理商目录与询价流程 / Distributor directory and inquiry flow | 🔴 待开发 | `dealers.html` and `supplier.html` are route pages only; no directory or inquiry flow. | Build distributor directory by region with contact, supported categories, dealer application path, and escalation contact. |
| FR-038 | 供应商能力准入表单 / Supplier capability intake form | 🟡 部分上线 | `supplier.html` explains qualification route; `b2b-login.html` has request access CTA. | Add structured supplier intake form with company/category/certification/capacity/compliance fields. |
| FR-039 | 零件可用性仪表盘 / Parts availability dashboard | 🟡 部分上线 | `b2b-dashboard.html` has stock/allocation and risk panels, not parts-specific. | Add proprietary parts availability, lead time, regional stock, backorders, and critical part alerts. |
| FR-040 | 转化摩擦分析 / Conversion friction analytics | 🔴 待开发 | No analytics instrumentation or reporting found in pages/scripts. | Add events for comparison use, size calculator, dealer locator clicks, test ride requests, warranty visits, compatibility search, and checkout abandonment. |

## Summary Counts

| Status | Count | Requirement IDs |
|---|---:|---|
| 🟢 已上线 | 1 | FR-026 |
| 🟡 部分上线 | 16 | FR-004, FR-005, FR-007, FR-008, FR-009, FR-010, FR-012, FR-015, FR-018, FR-029, FR-030, FR-033, FR-034, FR-036, FR-038, FR-039 |
| 🔵 排期中 | 5 | FR-001, FR-002, FR-016, FR-020, FR-027 |
| 🔴 待开发 | 18 | FR-003, FR-006, FR-011, FR-013, FR-014, FR-017, FR-019, FR-021, FR-022, FR-023, FR-024, FR-025, FR-028, FR-031, FR-032, FR-035, FR-037, FR-040 |

## Recommended Scheduling

### Sprint 1: purchase confidence foundation

- FR-001 Model comparison matrix.
- FR-004 Geometry and fit explainer.
- FR-008 Dealer locator with inventory status.
- FR-009 Test ride / reserve flow.
- FR-016 Warranty registration.
- FR-017 Warranty explainer.

### Sprint 2: service and dealer enablement

- FR-020 Compatibility and spare-parts database.
- FR-012 Dealer inventory management.
- FR-013 Dealer service playbook library.
- FR-014 Dealer objection-handling sheet.
- FR-018 Warranty claim tracking.
- FR-039 Parts availability dashboard.

### Sprint 3: trust, reviews, and demand operations

- FR-003 Spec transparency block.
- FR-024 Media review hub.
- FR-023 Verified owner reviews.
- FR-033 VOC evidence database.
- FR-034 Requirement intake board.
- FR-036 Evidence-to-feature traceability.

### Later backlog

- FR-006 Build variant comparison.
- FR-021 Proprietary component badges.
- FR-022 Drivetrain compatibility guide.
- FR-025 Owner follow-up survey.
- FR-028 Brand comparison narrative.
- FR-031 E-bike service center.
- FR-032 E-bike support ticket type.
- FR-035 Monthly VOC refresh workflow.
- FR-037 Distributor directory and inquiry flow.
- FR-040 Conversion friction analytics.

## Notes

- Many current pages are intentionally high-level route pages or static prototypes. They should count as `部分上线` when they show the intended user route but lack real data, submit actions, persistence, or backend workflows.
- The site already does a good job separating public route pages from the B2B dashboard. The largest product gap is not page existence; it is operational depth: inventory, warranty, compatibility, dealer actions, and real requirement tracking.
- A real local browser check was attempted through the bundled runtime, but Playwright could not load due a missing `playwright-core` dependency. This walkthrough is based on direct source inspection of current HTML/CSS/JS files.
