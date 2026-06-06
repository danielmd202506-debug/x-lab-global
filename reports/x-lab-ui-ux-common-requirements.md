# X-LAB UI/UX 共性要求与设计规则

版本：1.0  
日期：2026-06-06  
用途：作为 X-LAB 官网 UI/UX 重构过程中的统一规则文档。所有新页面、重构页面、组件设计、文案调整和前端实现都应先检查本文件。

## 1. 文档定位

本文件用于沉淀跨页面、跨模块、跨角色都必须遵守的共性要求。

它和其他文档的关系：

- `PRODUCT.md`：定义产品定位、用户、品牌性格和设计原则。
- `design.md`：定义当前设计系统、token、组件、页面模式和实现规范。
- `reports/x-lab-ui-ux-rebuild-project-plan.md`：定义项目阶段、活动、交付物和验收安排。
- 本文件：定义所有 UI/UX 工作都必须遵守的通用规则。

## 2. 最高优先级原则

以下规则优先级最高，任何页面都不能违背：

- 各页面、模块、区块、组件、文案、流程或数据结构的改动，都必须记录到需求管理清单中。
- 需求管理清单必须包含改动对象、改动原因、影响范围、优先级、状态、负责人、验收标准和关联文件。
- 如果改动影响多个页面、跨角色流程、B2B 工作流、设计系统或 Notion 同步规则，必须先说明影响范围，并在执行前得到用户确认。
- 所有 Markdown 文档必须按文档类型保持唯一性，不允许同一类型文档分散成多个重复文件；如已有同类文档，必须更新原文档，而不是新建平行文档。
- 所有 Markdown 文档必须中英文双语，且必须包含修改记录日志，记录日期、修改内容、原因、影响范围和关联需求编号。
- Markdown 文档必须定期同步到 Notion；在当前 Notion 同步规则有效期内，每次新建或修改 Markdown 文档后都要同步，并至少每周检查一次是否有未同步文档。
- 先定义用户角色，再设计页面。
- 先展示业务证据，再要求用户转化。
- 每个页面必须说明它处在 X-LAB 全链路中的哪个位置。
- 每个主要 CTA 必须指向真实下一步。
- public 官网页面和 B2B 操作页面必须使用不同的信息密度和界面节奏。
- 不新增无语义的颜色、组件和装饰。
- 不使用泛泛的品牌口号代替产品、工厂、渠道或服务证据。

Highest-priority rules:

- Every change to a page, module, section, component, copy block, flow, or data structure must be recorded in the requirement management list.
- The requirement management list must include the changed object, reason for change, affected scope, priority, status, owner, acceptance criteria, and linked files.
- If a change affects multiple pages, cross-role flows, B2B workflows, the design system, or Notion sync rules, explain the affected scope first and get user confirmation before execution.
- Every Markdown document must remain unique by document type. Do not split the same document type into multiple duplicate files; if an equivalent document already exists, update that source document instead of creating a parallel one.
- Every Markdown document must be bilingual in Chinese and English, and must include a change log with date, change summary, reason, affected scope, and linked requirement ID.
- Markdown documents must be synced to Notion regularly. During the active Notion sync rule period, every new or modified Markdown document must be synced after the change, and unsynced documents must be checked at least weekly.
- Define the user role before designing the page.
- Show business proof before asking for conversion.
- Every page must explain where it sits in the X-LAB full-chain journey.
- Every primary CTA must point to a real next step.
- Public official website pages and B2B operation pages must use different information density and interface rhythm.
- Do not add colors, components, or decoration without semantic purpose.
- Do not use generic brand slogans as a replacement for product, factory, channel, or service proof.

## 3. 用户角色规则

每个页面开工前必须回答：

- 这个页面主要服务谁？
- 用户来到这里是为了判断、购买、合作、登录，还是执行任务？
- 用户需要先看到什么证据才会继续？
- 用户完成当前页面后应该去哪里？

角色分类：

| 角色 | 页面重点 | 常见动作 |
| --- | --- | --- |
| Rider | 产品信心、门店、试骑、配置、保修 | View product, Build bike, Find store |
| Store | 门店支持、服务流程、授权销售、试骑 | Find support, Contact sales |
| Dealer / Agent | 合作政策、库存、价格、培训、保修 | Become a dealer, Request allocation, Open B2B |
| Supplier | 资质、质量、材料、交付、文件 | Open supplier login, Submit qualification |
| B2B User | 报价、订单、库存、文档、任务 | Filter, Review, Approve, Submit, Export |

规则：

- 不要把 supplier、dealer、store、rider 写成同一种用户。
- 不同角色必须有不同入口、不同文案、不同下一步动作。
- 如果一个模块同时服务多个角色，必须清楚标注当前角色或提供角色切换。

## 4. 信息架构规则

每个页面都应满足：

- 页面标题能说明当前角色或业务位置。
- 首屏能说明页面目的。
- 第一屏或第二屏内出现明确下一步。
- 页面结构遵循“定位、证据、路径、动作”。
- 底部必须提供下一站，而不是让用户走到页面尽头后断掉。
- 信息架构更新必须集中维护在一个指定 IA 主文件中，不得为每次 IA 变更新建分散页面。
- 如果已有分散的 IA 更新页，后续必须合并回 IA 主文件，并将分散页标记为已合并或停止维护。
- public 官网不能展示内部 IA 工作稿、测试结论、`Planned` 状态或给团队看的解释性模块。
- 页尾 Sitemap 只放真实用户可打开的页面入口，不放内部状态标签。

推荐页面结构：

1. Role / Route：说明页面属于哪个角色或业务路径。
2. Proof：展示产品、工厂、质量、渠道、服务或数据证据。
3. Decision：帮助用户判断是否继续。
4. Action：提供明确 CTA。
5. Next Route：引导到下一页或登录、询价、配置、申请。

## 5. 视觉规则

必须继承当前 X-LAB 视觉语言：

- 技术、直接、高压、工业化。
- Race-road energy 加 factory-floor credibility。
- public 页面以深色工业基底、真实图像、强标题和清晰路径为主。
- B2B 页面以浅色工作台、表格、筛选、状态和任务处理为主。

颜色规则：

- 红色：主 CTA、紧急、危险。
- 青色：技术信号、流程、焦点、路径、激活状态。
- 金色：警告、待处理、注意事项。
- 绿色：成功、通过、已发布、已完成。
- 深色背景：品牌、产品、路线、hero。
- 浅色背景：dashboard、表单、运营数据、可扫描内容。

禁止：

- 随意新增装饰色。
- 使用大面积抽象渐变替代真实产品或环境图像。
- 把每个 section 都做成浮动卡片。
- 在 B2B dashboard 中使用宣传型大 hero。
- 在 public 首页中堆叠复杂表格和任务流。

## 6. Typography 规则

字体必须延续当前系统：

- Display：`Barlow Condensed`
- Body：`Source Sans 3`

规则：

- 大标题短、强、清楚。
- 正文直接说明事实，不绕。
- 普通文字 letter-spacing 保持 `0`。
- 小型标签、表头、状态可使用 uppercase 和较宽 tracking。
- 移动端必须检查标题换行，不允许文字溢出容器。
- Dashboard 内的标题和数字可以强，但不能破坏扫描效率。

## 7. 组件规则

新增页面优先复用现有组件：

- `.site-nav`
- `.page-hero`
- `.section`
- `.section-head`
- `.btn`
- `.card`
- `.role-link`
- `.product-card`
- `.chain-strip`
- `.process`
- `.field`
- `.table-wrap`
- `.dash-card`
- `.toolbar`
- `.role-switch`

新增组件前必须确认：

- 现有组件是否能表达该功能？
- 新组件是否会在两个以上页面复用？
- 新组件是否有 hover、focus、active、disabled、empty、error、success 状态？
- 新组件是否需要更新 `design.md`？

卡片规则：

- 卡片用于真实重复内容、产品、任务、数据或表单。
- 不用卡片包装整段页面区域。
- 不做卡片套卡片。
- 卡片内文案保持短，避免长段落。

按钮规则：

- 按钮文案必须是动作加对象。
- 推荐：Build bike、Create RFQ、Open B2B login、Request allocation。
- 避免：Learn more、Submit、OK，除非上下文已经非常明确。
- 主 CTA 每屏不宜过多，页面应有明确主次。

## 8. 文案规则

X-LAB 文案应直接、具体、业务化。

推荐表达方向：

- route
- capacity
- qualification
- allocation
- launch
- warranty
- service
- quality gates
- delivery
- traceability
- sell-in
- stock planning

禁止或少用：

- premium experience
- world-class
- cutting-edge
- innovative solution
- seamless
- next generation
- lifestyle only

页面文案规则：

- 每段文案都应回答“为什么用户要相信或继续”。
- 先写事实，再写感受。
- 先写能力，再写主张。
- 卡片文案不超过 2 到 3 行为宜。
- CTA 文案必须可独立理解。

## 9. 文档输出规则 / Documentation Output Rules

后续所有输出到项目中的文档必须采用中英文双语。

All future project documents must be written in bilingual Chinese and English.

适用范围：

- 项目计划
- UI/UX 设计说明
- 页面设计指导
- 竞品分析
- 用户画像
- 验收 checklist
- 上线 checklist
- 需求说明
- 设计系统补充说明
- 面向合作伙伴、经销商、供应商或内部团队的说明文档

Scope:

- Project plans
- UI/UX design notes
- Page design guides
- Competitor analysis
- User personas
- Acceptance checklists
- Launch checklists
- Requirement documents
- Design system addendums
- Documents for partners, dealers, suppliers, or internal teams

推荐格式：

- 标题可以使用中文加英文，例如：`页面目标 / Page Goal`。
- 关键段落先中文，后英文。
- 表格字段使用中英文合并列名，例如：`用户角色 / User Role`。
- CTA、组件名、页面文件名、CSS class 保持英文原文。
- 如果文档主要给内部中文团队阅读，中文可以更详细，英文保持准确简洁。
- 如果文档将面向海外合作伙伴，英文必须完整，不只是中文摘要。

Recommended format:

- Use bilingual headings, for example: `页面目标 / Page Goal`.
- Write key paragraphs in Chinese first, then English.
- Use bilingual table headers, for example: `用户角色 / User Role`.
- Keep CTA labels, component names, page filenames, and CSS classes in English.
- If the document is mainly for the internal Chinese team, Chinese may be more detailed and English can stay concise.
- If the document is for overseas partners, the English version must be complete, not only a short summary.

禁止：

- 只输出中文文档。
- 只输出英文文档。
- 英文只写关键词，不表达完整意思。
- 中英文内容互相矛盾。
- 翻译时改变业务含义、CTA 含义或角色定义。

Do not:

- Produce Chinese-only documents.
- Produce English-only documents.
- Use English keywords without complete meaning.
- Let Chinese and English content contradict each other.
- Change business meaning, CTA meaning, or role definitions during translation.

### 9.1 Markdown 文档唯一性与修改日志 / Markdown Uniqueness And Change Log

规则：

- 每一种 Markdown 文档类型只能有一个当前主文档。
- 文档名称必须统一采用：`项目名称 + 文档名称 + 修改日期时间`。
- X-LAB 项目的文档标题格式为：`X-LAB + 文档名称 + YYYY-MM-DD HH:mm`，例如 `X-LAB 官网信息架构与 Sitemap 2026-06-06 16:56`。
- 如果用于本地文件名，时间中的冒号必须替换为安全字符，例如 `YYYY-MM-DD-HHmm`。
- 每次同步到 Notion 时，如文档内容发生实质修改，应同步更新 Notion 页面标题中的修改日期时间。
- 不允许为同一主题持续新建多个分散版本，例如多个项目计划、多个共性规则、多个同类需求清单。
- 如果需要补充内容，应更新现有主文档，并在修改记录日志中记录。
- 如果确实需要历史快照、归档版本或一次性调研附件，文件名必须明确标记 `archive`、`snapshot`、`evidence` 或具体日期，并在主文档中链接说明。
- 每个主 Markdown 文档必须包含 `修改记录 / Change Log` 区块。

Rules:

- Each Markdown document type must have only one current source document.
- Document titles must use this unified format: `Project Name + Document Name + Modified Date Time`.
- X-LAB document titles should use: `X-LAB + Document Name + YYYY-MM-DD HH:mm`, for example `X-LAB Website IA And Sitemap 2026-06-06 16:56`.
- For local filenames, replace filename-unsafe time characters with a safe format such as `YYYY-MM-DD-HHmm`.
- When syncing to Notion after a substantive document change, update the modified date time in the Notion page title.
- Do not keep creating scattered versions for the same topic, such as multiple project plans, multiple shared requirement documents, or multiple equivalent requirement lists.
- If content needs to be added, update the existing source document and record the update in the change log.
- If a historical snapshot, archive version, or one-off research attachment is truly needed, the filename must clearly include `archive`, `snapshot`, `evidence`, or a specific date, and the source document must link to it.
- Every source Markdown document must include a `修改记录 / Change Log` section.

修改记录格式：

| 日期 / Date | 需求编号 / Requirement ID | 修改内容 / Change | 原因 / Reason | 影响范围 / Affected Scope |
| --- | --- | --- | --- | --- |
| 2026-06-06 | FR-043 | Example change | Example reason | Example scope |

Change log format:

| 日期 / Date | 需求编号 / Requirement ID | 修改内容 / Change | 原因 / Reason | 影响范围 / Affected Scope |
| --- | --- | --- | --- | --- |
| 2026-06-06 | FR-043 | Example change | Example reason | Example scope |

Notion 同步规则：

- 当前 Notion 同步规则有效期内，所有 Markdown 文档的新建或修改都必须在完成后同步到 Notion。
- 每周至少检查一次本地 Markdown 文档和 Notion 存档是否一致。
- 如果发现同类文档分散，应先提出合并建议，得到用户确认后再整理。

Notion sync rules:

- During the active Notion sync rule period, every newly created or modified Markdown document must be synced to Notion after completion.
- Check at least weekly whether local Markdown documents and the Notion archive are aligned.
- If scattered documents of the same type are found, propose a consolidation first and reorganize only after user confirmation.

### 9.2 Notion 归档同步临时规则 / Temporary Notion Archive Sync Rule

有效期：2026-06-06 至 2026-07-06  
提醒时间：2026-06-26，提前 10 天确认是否延长、调整或取消。

Validity period: 2026-06-06 to 2026-07-06  
Reminder date: 2026-06-26, 10 days before expiration, to confirm whether to extend, adjust, or cancel.

规则：

- 在有效期内，项目中新建或修改的文档都需要同步到 Notion 的 `opalmer638’s Space`。
- 2026-06-06 更新：用户已在 Notion 中修改同步空间。后续同步以用户当前配置和确认的 Notion 同步空间为准。
- 如果 Notion 工具无法读取或验证目标空间父级，应说明工具限制，并在当前可访问的 Notion 空间中创建同步记录，或在用户提供具体目录页链接后移动到指定位置。
- 信息架构相关更新必须同步到同一个 IA 主文件；不要为每次 IA 变更新建分散文档。
- 如果需要记录版本变化，应在 IA 主文件内新增“更新记录”段落，而不是创建新的 IA 子页面。
- 同步范围包括项目计划、共性规则、设计说明、竞品分析、用户画像、验收清单和其他项目文档。
- 如果无法访问 Notion 或无法确认目标空间，应先说明原因，并保留本地文件路径作为交付依据。
- 如果同步目标、有效期或同步范围发生变化，必须先得到用户确认，再修改本规则。

Rules:

- During the validity period, every newly created or modified project document must be synced to Notion `opalmer638’s Space`.
- 2026-06-06 update: The user has changed the Notion sync space in Notion. Future syncs should use the Notion sync space currently configured and confirmed by the user.
- If the Notion tool cannot read or verify the target parent space, explain the tool limitation and create a sync record in the currently accessible Notion space, or move it to the specified location after the user provides the exact directory page URL.
- IA-related updates must be synced into the same IA master file; do not create scattered documents for each IA change.
- If version history is needed, add an update log inside the IA master file instead of creating new IA child pages.
- Sync scope includes project plans, shared requirements, design notes, competitor analysis, user personas, acceptance checklists, and other project documents.
- If Notion cannot be accessed or the target space cannot be confirmed, explain the reason first and keep the local file path as the delivery reference.
- If the sync target, validity period, or sync scope changes, get user confirmation before modifying this rule.

## 10. 图像规则

图像必须承担信息功能。

可用图像类型：

- 产品实物
- 骑行场景
- 工厂制造
- 质量检测
- 门店服务
- 仓储物流
- B2B 工作流或系统截图

禁止：

- 纯抽象背景图作为主要产品信号。
- 黑暗、模糊、无法识别产品的 hero 图。
- 与页面角色无关的生活方式图片。
- 用装饰图替代真实业务证据。

Hero 图像规则：

- public 页面 hero 必须让用户第一眼知道页面主题。
- 深色 overlay 必须保证标题和正文可读。
- 产品页面图像要能看清产品，而不是只看氛围。

## 11. 交互规则

所有交互都应支持任务完成，不做无意义动效。

规则：

- hover、focus、active 状态必须清楚。
- 表单必须有 label、帮助文字、错误提示和提交反馈。
- 配置器必须显示已选项、未选项、不兼容项和下一步。
- Dashboard 必须支持筛选、扫描、状态判断和重复操作。
- 登录入口必须表达安全、角色和下一步。
- 动效要快、稳、克制，并支持 `prefers-reduced-motion`。

## 12. Responsive 规则

重点检查：

- 980px tablet 断点。
- 640px mobile 断点。
- sticky nav 是否遮挡内容。
- 标题是否溢出。
- CTA 是否可点击。
- 表格是否在 `.table-wrap` 内横向滚动。
- Dashboard sidebar 是否正确变为移动端导航。
- 图片裁切是否仍能表达主题。

移动端规则：

- 首屏必须保留品牌或页面主题。
- 主 CTA 不应被折叠到过深位置。
- 表单字段保持可点，最小高度接近或高于 46px。
- 不允许横向滚动，表格除外。

## 13. Accessibility 规则

最低要求：

- 文本对比度目标为 WCAG AA。
- 所有可交互元素必须有 visible focus。
- 表单必须有可见 label。
- 链接和按钮文案必须可独立理解。
- 图片需要合理 alt，CSS 背景图不承载唯一信息。
- 页面标题层级必须合理。
- 不依赖颜色作为唯一状态表达。
- 动效必须有 reduced motion 方案。

## 14. B2B 特别规则

B2B 页面不是宣传页，而是操作系统界面。

设计重点：

- 高密度。
- 可扫描。
- 状态清楚。
- 筛选高效。
- 表格可读。
- 操作反馈明确。

B2B 常用内容：

- KPI
- Alert
- Task list
- Table
- Filter toolbar
- Role switch
- Status tag
- Document list
- RFQ list
- Order or allocation state

禁止：

- 大面积情绪化 hero。
- 长篇品牌文案。
- 模糊的按钮文案。
- 过大的卡片和过松的间距。
- 为了装饰牺牲扫描效率。

## 15. Public 官网特别规则

Public 官网是品牌和路径说明界面。

设计重点：

- 第一眼要强。
- 图像要真实。
- 路径要明确。
- 证据要具体。
- CTA 要角色化。

Public 页面常用内容：

- Hero
- Chain strip
- Product gateway
- Role route links
- Factory proof
- Dealer proof
- Store proof
- Final CTA

禁止：

- 只有品牌口号，没有业务证据。
- 所有角色共用同一套泛文案。
- CTA 全是 Learn more。
- 首屏看不出产品、品牌或业务位置。

## 16. 页面开工 Checklist

每个页面设计前检查：

- 本次改动是否已记录到需求管理清单？
- 需求管理清单是否包含改动对象、原因、范围、优先级、状态、负责人、验收标准和关联文件？
- 页面服务哪个用户？
- 页面属于 Global 官网还是 B2B 操作？
- 页面在全链路中的位置是什么？
- 页面主 CTA 是什么？
- 页面需要什么证据？
- 是否复用已有组件？
- 是否需要新增组件？
- 是否需要真实图像？
- 移动端最大风险是什么？
- 是否需要更新 `design.md`？
- 如输出文档，是否采用中英文双语？

## 17. 页面验收 Checklist

页面完成后检查：

- 需求管理清单是否已更新？
- 本次改动的验收标准是否已记录？
- 5 秒内能否判断页面目的？
- 角色入口是否清楚？
- 主 CTA 是否明确？
- 证据是否出现在转化前？
- 文案是否具体？
- 图像是否表达真实主题？
- 颜色语义是否正确？
- 组件是否和现有系统一致？
- 移动端是否无溢出？
- 键盘焦点是否可见？
- 表单是否有完整反馈？
- 链接是否全部可达？
- 文档交付物是否中英文双语？

## 18. 设计系统更新规则

以下情况必须更新 `design.md`：

- 新增跨页面组件。
- 修改颜色、字体、间距、按钮或卡片规则。
- 新增 dashboard 状态样式。
- 新增表单、表格或配置器通用模式。
- 修改 navigation、hero、section 或 role route 模式。
- 新增跨页面文案规则。
- 新增或修改跨项目文档输出规则。

## 19. 高频规则沉淀与变更确认 / Frequent Rule Capture And Change Approval

项目执行过程中，如果某一类要求、偏好、限制或检查项反复出现超过 5 次，应将其视为候选共性规则。

During project execution, if one type of requirement, preference, constraint, or checklist item appears more than 5 times, it should be treated as a candidate shared rule.

适用内容：

- 页面结构规则
- UI 视觉规则
- 组件使用规则
- 文案和翻译规则
- 文件命名规则
- 交付格式规则
- 验收检查规则
- 用户反复强调的偏好或限制

Scope:

- Page structure rules
- UI visual rules
- Component usage rules
- Copywriting and translation rules
- File naming rules
- Delivery format rules
- Acceptance checklist rules
- User preferences or constraints that are repeatedly emphasized

执行规则：

- 发现同类规则出现超过 5 次后，先标记为“建议沉淀规则”。
- 不直接修改本文件。
- 必须先向用户说明拟新增或修改的规则内容。
- 只有得到用户明确确认后，才可以更新本文件。
- 如果规则影响 `design.md`、项目计划或其他规范文档，也必须说明影响范围。
- 每次更新应尽量放入最相关章节，避免重复散落。

Execution rules:

- After the same type of rule appears more than 5 times, mark it as a candidate shared rule.
- Do not modify this file directly.
- First explain the proposed new or changed rule to the user.
- Update this file only after explicit user confirmation.
- If the rule affects `design.md`, the project plan, or other guideline documents, explain the affected scope.
- Place each update in the most relevant section and avoid duplicated scattered rules.

推荐确认话术：

```text
这个规则已经在项目中反复出现超过 5 次，建议沉淀到共性规则文档中。拟新增规则是：[规则内容]。是否确认加入？
```

Recommended confirmation wording:

```text
This rule has appeared more than 5 times in the project. I recommend adding it to the shared requirements document. Proposed rule: [rule content]. Please confirm whether to add it.
```

## 20. 推荐工作方式

每次 UI 设计或开发按以下顺序进行：

1. 读 `PRODUCT.md`，确认定位。
2. 读 `design.md`，确认设计系统。
3. 读本文件，确认共性规则。
4. 定义页面角色和主 CTA。
5. 画页面结构或写页面大纲。
6. 做 UI 或代码实现。
7. 检查 responsive、accessibility、CTA 和图像。
8. 如输出文档，按中英文双语格式交付。
9. 如发现某类规则反复出现超过 5 次，先请求用户确认，再沉淀到本文件。
10. 如有通用变化，更新 `design.md`。

## 21. 简短决策模板

```md
## UI Decision

- Page:
- User:
- Spec: Global / B2B
- Chain position:
- Requirement list updated: Yes / No
- Requirement item:
- Change reason:
- Affected scope:
- Priority:
- Owner:
- Acceptance criteria:
- Primary CTA:
- Required proof:
- Reused components:
- New components:
- Image requirement:
- Mobile risk:
- Accessibility checks:
- Bilingual document required: Yes / No
- Candidate shared rule over 5 times: Yes / No
- Update design.md: Yes / No
```

## 22. 一句话原则

X-LAB 的每个界面都必须让用户知道：我是谁、我在链路哪里、为什么可信、下一步做什么。

## 修改记录 / Change Log

| 日期 / Date | 需求编号 / Requirement ID | 修改内容 / Change | 原因 / Reason | 影响范围 / Affected Scope |
| --- | --- | --- | --- | --- |
| 2026-06-06 | FR-043 | 新增 Markdown 文档唯一性、双语、修改记录日志和 Notion 定期同步最高优先级规则。 / Added highest-priority rules for Markdown document uniqueness, bilingual output, change logs, and regular Notion sync. | 用户要求所有类型 Markdown 文档不要分散，必须双语、带修改记录，并定期同步 Notion。 / User required all Markdown document types to avoid fragmentation, remain bilingual, include change logs, and sync to Notion regularly. | 所有 Markdown 文档、Notion 存档、需求管理清单、后续文档交付流程。 / All Markdown documents, Notion archive, requirement management list, and future document delivery workflow. |
