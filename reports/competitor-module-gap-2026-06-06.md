# X-LAB 官网与 B2B 系统竞品模块缺口验证

日期：2026-06-06

## 验证范围

本次验证对照当前本地页面：

- 官网：`index.html`、`factory.html`、`bike-ad9.html`、`custom-bike.html`、`supplier.html`、`dealers.html`、`stores.html`
- B2B：`b2b-login.html`、`supplier-login.html`、`b2b-dashboard.html`
- 交互：`app.js`

竞品参考：

- Trek：官网购买流程、门店库存、Size Finder、注册、保修、Trek U/B2B 培训入口
- Specialized：全球门店、Rider Care、注册保修、授权零售商保修流、Assisted Replacement
- Giant：产品注册、授权经销商装配和保修流、WebLink/线上购买相关条款
- Canyon：DTC 服务中心、序列号备件、Bike Garage、服务伙伴、爆炸图、退换货、装箱/组装指导

说明：竞品的核心 B2B 工作台大多需要授权登录，外部无法完整验证。下表中的 B2B 深层能力以公开帮助文档、登录入口、保修说明、服务流程和可见官网功能为依据做保守推断。

## 总体结论

X-LAB 当前已经有“全链路信息架构”：供应商、工厂、经销商、门店、定制车、B2B 登录和运营 Dashboard 都有入口。主要缺口不在导航，而在交易闭环、售后闭环、数据自助和经销商赋能深度。

最大缺失集中在 6 类：

1. 消费者购车闭环：真实库存、价格、结账、到店提车、同日配送、退换货。
2. 车主账户：车辆注册、序列号、保修状态、维修记录、召回通知、被盗辅助信息。
3. 服务/备件：序列号查备件、爆炸图、服务伙伴预约、装箱/组装/维修知识库。
4. 经销商赋能：培训学院、认证、销售素材库、员工账号、门店任务分配。
5. B2B 交易深度：报价版本、合同价、信用额度联动、订单审批、发票付款、物流追踪 API。
6. 数据闭环：CRM 线索、门店库存同步、售后案例 SLA、NPS/评价、召回/合规推送。

## 模块覆盖矩阵

状态说明：✅ 已具备；◐ 半具备/静态展示；❌ 缺失；? 需要登录或真实系统验证

| 模块 | Trek | Specialized | Giant | Canyon | X-LAB 当前 | 缺口判断 |
|---|---:|---:|---:|---:|---:|---|
| 品牌故事/赛事背书 | ✅ | ✅ | ✅ | ✅ | ◐ | 需要更多真实赛事、测试、车队、证书证据 |
| 产品目录/分类 | ✅ | ✅ | ✅ | ✅ | ◐ | 当前只有 AD9 与定制路线，缺完整 catalog |
| 产品对比 | ✅ | ◐ | ◐ | ◐ | ❌ | 缺车型横向比较、规格差异、适用场景推荐 |
| Bike Finder/选车问答 | ✅ | ◐ | ◐ | ◐ | ❌ | 缺按用途、预算、身高、地形的问答式导购 |
| 尺码/fit 工具 | ✅ | ✅ | ◐ | ✅ | ◐ | 有身高滑杆，但缺模型级尺码表与推荐解释 |
| 门店查询 | ✅ | ✅ | ✅ | ✅ | ◐ | 当前是原型输入框，缺地图、库存、预约、服务能力 |
| 本地库存/到店取货 | ✅ | ✅ | ✅ | ◐ | ❌ | 缺门店 SKU/尺码库存与履约选项 |
| 在线购买/结账 | ✅ | ✅ | ✅ | ✅ | ❌ | 缺购物车、支付、税费、配送、退换货 |
| 融资/分期 | ✅ | ◐ | ◐ | ◐ | ❌ | 官网提到 finance，但没有真实模块 |
| 产品注册 | ✅ | ✅ | ✅ | ✅ | ❌ | 缺车架号注册、购买凭证上传、保修激活 |
| 保修政策/索赔入口 | ✅ | ✅ | ✅ | ✅ | ◐ | B2B 有 warranty case 静态项，官网缺清晰索赔入口 |
| Crash/Assisted Replacement | ◐ | ✅ | ◐ | ✅ | ❌ | 缺事故折扣换新、资格规则、经销商处理流 |
| 备件查询 | ✅ | ◐ | ◐ | ✅ | ❌ | 缺按序列号或零件号找备件 |
| 爆炸图/技术文档 | ✅ | ◐ | ◐ | ✅ | ❌ | 缺车型分解图、扭矩、兼容性、安装 PDF |
| 组装/装箱/退货指南 | ✅ | ◐ | ◐ | ✅ | ❌ | 缺售后自助内容和 DTC 支持 |
| 服务伙伴/维修预约 | ✅ | ✅ | ✅ | ✅ | ❌ | 缺服务点能力标签、预约、工单流 |
| 车主 Garage/车辆档案 | ✅ | ✅ | ◐ | ✅ | ❌ | 缺用户车库、维修历史、保修状态 |
| 经销商登录 | ✅ | ? | ? | ? | ✅ | 有入口，但当前是假登录/静态跳转 |
| B2B 订单/RFQ | ✅ | ? | ? | ? | ◐ | 有表格与任务，但缺创建、审批、版本、导出联动 |
| B2B 价格/合同价 | ✅ | ? | ? | ? | ◐ | 有价格 review 文案，缺价格表、阶梯价、有效期 |
| B2B 库存/预测 | ✅ | ? | ? | ? | ◐ | 有 KPI，缺 SKU/尺码/区域级数据与补货建议 |
| B2B 发票/付款/信用 | ✅ | ? | ? | ? | ◐ | 有财务卡片，缺发票下载、付款记录、信用额度占用 |
| B2B 物流追踪 | ✅ | ? | ? | ? | ◐ | 有 shipment queue，缺承运商、节点、ETA、异常通知 |
| B2B 保修/服务工单 | ✅ | ? | ? | ? | ◐ | 有 case 文案，缺上传证据、状态流转、SLA |
| 经销商培训/学院 | ✅ | ? | ? | ? | ❌ | 缺培训课程、认证、员工学习记录 |
| 营销素材/Launch assets | ✅ | ? | ? | ? | ◐ | 有下载任务文字，缺资产库、版本、市场语言包 |
| 供应商质量/文档 | ? | ? | ? | ? | ◐ | 有 COA/QC 任务，缺上传、审核、版本、追溯 |
| 管理员/角色权限 | ✅ | ? | ? | ? | ❌ | 缺员工账号、角色、权限、审计日志 |

## 缺口优先级图

分值：影响 x 紧急度，5 为最高。

| 优先级 | 模块 | 分值 | 图示 |
|---:|---|---:|---|
| P0 | 产品注册 + 保修索赔入口 | 5 | █████ |
| P0 | 门店库存 + 到店预约/试骑 | 5 | █████ |
| P0 | 经销商 RFQ/订单创建与审批 | 5 | █████ |
| P1 | 备件查询 + 技术文档/爆炸图 | 4 | ████ |
| P1 | 车主 Garage/车辆档案 | 4 | ████ |
| P1 | B2B 价格表/阶梯价/合同价 | 4 | ████ |
| P1 | 经销商培训与认证 | 4 | ████ |
| P2 | 在线购买/支付/退换货 | 3 | ███ |
| P2 | 融资/分期 | 3 | ███ |
| P2 | 营销素材库/市场语言包 | 3 | ███ |
| P3 | 评价/NPS/社区内容 | 2 | ██ |
| P3 | 高级数据分析/预测补货 | 2 | ██ |

## 官网模块缺失图

| 官网能力 | 当前状态 | 建议补齐 |
|---|---|---|
| 导购 | ◐ | 增加 Bike Finder、产品对比、模型级尺码推荐 |
| 购买 | ❌ | 增加价格、库存、购物车、门店取货、配送、退换货 |
| 门店 | ◐ | 增加地图、服务能力、库存、预约、试骑、门店详情页 |
| 车主服务 | ❌ | 增加注册、Garage、保修状态、维修记录、召回通知 |
| 技术支持 | ❌ | 增加手册、爆炸图、备件、装配视频、常见问题 |
| 售后 | ◐ | 增加索赔入口、事故换新、服务预约、工单追踪 |

## B2B 模块缺失图

| B2B 能力 | 当前状态 | 建议补齐 |
|---|---|---|
| 订单/RFQ | ◐ | 创建 RFQ、报价版本、审批、转 PO、导出 PDF |
| 价格 | ◐ | 合同价、阶梯价、促销价、币种、有效期 |
| 库存 | ◐ | SKU/尺码/颜色库存、区域分配、补货建议 |
| 物流 | ◐ | 承运商、追踪号、节点 ETA、异常提醒、单据下载 |
| 财务 | ◐ | 发票、付款、信用额度、账期、对账单 |
| 保修 | ◐ | 案例创建、图片上传、零件申请、SLA、处理记录 |
| 培训 | ❌ | 经销商学院、课程、认证、员工账号、考试 |
| 素材 | ◐ | Campaign asset library、价格单、产品图、门店物料 |
| 供应商 | ◐ | 资质申请、样品评审、COA/QC 上传、CAPA、追溯 |
| 权限 | ❌ | 公司账号、子账号、角色权限、审计日志 |

## 建议实施顺序

### Sprint 1：信任与售后底座

- 产品注册页：序列号、购买凭证、购买渠道、车型、车主信息。
- 保修/服务入口：索赔类型、图片上传、门店选择、状态查询。
- 官网服务中心：手册、FAQ、装配、保养、退换货规则。

### Sprint 2：门店与购车闭环

- Store detail 页面：地址、营业时间、服务能力、库存、试骑预约。
- Product detail 增强：尺码推荐、库存、门店取货、比较、推荐配件。
- 预约流：试骑、fitting、维修、取货。

### Sprint 3：经销商 B2B 深化

- RFQ Builder：选车型、尺码/颜色、数量、市场、价格层级、附件。
- Dealer Pricebook：合同价、阶梯价、促销价、有效期。
- Launch Assets：产品图、规格表、社媒素材、门店海报、语言包。
- Training：课程、认证、员工账号、学习状态。

### Sprint 4：供应链与运营深度

- Supplier onboarding：资质、品类、产能、认证文件。
- Quality docs：COA、Inspection report、CAPA、版本和审批。
- Logistics/Finance：单据下载、发票、付款、信用额度、追踪节点。

## 关键测试用例

| 用户角色 | 测试任务 | 当前结果 | 应达到结果 |
|---|---|---|---|
| 消费者 | 找到适合自己的 AD9 尺码 | 可在定制页粗略推荐 | 产品页可按车型、身高、inseam 给出解释性推荐 |
| 消费者 | 查询附近可试骑门店 | 只有原型输入框 | 地图 + 门店详情 + 试骑预约 |
| 车主 | 注册车辆并激活保修 | 缺失 | 序列号注册 + 凭证上传 + 保修状态 |
| 车主 | 查找 AD9 备件 | 缺失 | 按序列号/零件号匹配备件、爆炸图、兼容性 |
| 经销商 | 创建 RFQ | 入口存在但未形成工作流 | 配置单转 RFQ、报价版本、审批、PDF |
| 经销商 | 查看合同价和库存 | 只有 Dashboard 静态 KPI | SKU/尺码/颜色库存 + 价格有效期 |
| 经销商 | 提交保修案例 | 只有任务文字 | 图片上传、序列号、零件申请、SLA、状态流 |
| 经销商经理 | 给员工分配培训 | 缺失 | 员工账号、课程、认证、完成率 |
| 供应商 | 上传 COA/QC 文件 | 只有 checkbox | 上传、审核、退回、版本、批次追溯 |

## 证据来源

- Trek How to buy online: https://www.trekbikes.com/us/en_US/how-to-buy-a-bike/
- Trek Size Finder: https://www.trekbikes.com/us/en_US/size-finder/
- Trek Bike Registration: https://www.trekbikes.com/us/en_US/productRegistration/
- Trek U FAQ / B2B: https://help.trekbikes.com/en_US/trek-u-faqs
- Trek U Store Manager Guide: https://help.trekbikes.com/en_US/trek-u/trek-u-store-manager-guide
- Specialized Store Finder: https://www.specialized.com/us/en/store-finder
- Giant USA Warranty: https://www.giant-bicycles.com/us/giant-usa-warranty
- Canyon Repair, Spares and Warranty: https://www.canyon.com/en-us/customer-service/repair-spares-warranty/
- Canyon Warranty: https://www.canyon.com/en-us/customer-service/repair-spares-warranty/warranty-guarantee.html
- Canyon App / Bike Garage: https://www.canyon.com/en-us/app/
- Canyon Spare and Wear Parts: https://www.canyon.com/en-us/gear/components/spare-wear-parts/
