# X-LAB Design System & Product UI Guidelines

Last updated: 2026-06-06
Status: Living guideline
Primary source files: `styles.css`, public HTML pages, B2B dashboard pages, `app.js`

This document is the design source of truth for X-LAB. It records the shared brand foundation and the two independent UI specifications used across the product:

- Global official website: public brand, product, route, store, and custom-bike experiences.
- B2B operations: supplier, agent, dealer, order, document, logistics, warranty, RFQ, and partner-operation workspaces.

New pages, modules, and reusable patterns must follow this document. If a reusable design rule changes, update this file in the same work cycle.

## 1. Design System Model

X-LAB has three user categories and two UI specifications.

User categories:

- Global public users: riders, stores, brand visitors, product researchers, and public channel prospects.
- Suppliers: upstream material, component, tooling, QA, logistics, and factory-collaboration partners.
- Agents and dealers: distributors, regional agents, authorized dealers, and channel sales teams.

UI specifications:

- Global official website specification: expressive, visual, brand-led, product-led, and route-led.
- B2B operations specification: dense, practical, workflow-led, data-led, and role-led.

Shared foundation:

- Brand logo, core palette, font families, language tone, focus states, accessibility floor, realistic imagery, and controlled motion stay consistent across both specifications.
- Type scale, line height, spacing rhythm, layout density, and component usage are intentionally different between Global and B2B.
- Every new screen must identify its user category before selecting layout and components.

## 2. Brand Foundations

Brand personality:

- Technical.
- Direct.
- High-pressure.
- Operational.
- Built from race-road proof and factory-floor discipline.

Core impression:

- Race proven.
- Factory controlled.
- Channel ready.
- Full-chain, not brochure-only.

Brand promise:

X-LAB connects product confidence to operational confidence. The site must help visitors move from brand proof to factory capability, then into the right supplier, dealer, store, custom-bike, or B2B route.

North America VOC direction:

- Treat dealer-backed delivery as a trust signal, not a footnote.
- Answer new-brand hesitation with fit review, warranty path, service parts, model comparison, and local store or dealer handoff.
- Product and custom-bike routes should start with riding intent before technical specification.
- B2B entrances should explain portal capability before asking users to sign in.
- Public pages may show B2B portal previews only when the preview clarifies RFQ, inventory, warranty, training, or dealer support.

Design principles:

- Map the chain: each page must show where it sits from brand to factory to supplier to dealer to store to rider.
- Prove before selling: racing, manufacturing, testing, logistics, warranty, and channel evidence should appear before major calls to action.
- Separate user intent: suppliers, agents/dealers, stores, riders, and public visitors need distinct routes and components.
- Keep the experience operational: links, cards, dashboards, and forms should lead to real next steps.
- Preserve brand intensity: use bold type, strong contrast, real imagery, and restrained accent color.
- Keep design synchronized: accepted PPT recommendations must be reflected in the matching high-fidelity screens, `design.md`, `design-system.html`, and related requirement or implementation documents in the same work cycle.

Avoid:

- Soft lifestyle layouts that hide the business route.
- Vague luxury copy without manufacturing or service proof.
- Generic "Learn More" actions when a specific route action exists.
- Public hero patterns inside B2B operations screens.
- B2B tables and task flows inside public brand storytelling unless the page is explicitly a portal preview.

## 3. Product Architecture

Current route architecture:

- Bikes: product catalog, product detail, bike finder, model comparison, and custom configurator.
- Technology: aerodynamics, carbon fiber, wheelsets, components, testing, and technical proof.
- WorldTour: race validation, team proof, performance claims, and confidence story.
- Manufacturing: vertical integration, carbon, wheels, assembly, QA, logistics, and supplier handoff.
- Partners: distributor, supplier, strategic partner recruitment, application, and B2B entry.
- Dealers: dealer success, margin, supply, training, warranty, launch assets, and RFQ tools.
- Support: stores, local inventory, pickup, registration, warranty, technical documents, and owner garage.
- B2B Login: partner operating entrance.
- Home remains in the public top navigation as the return point for the strategic narrative.

Global official website pages:

- `index.html`
- `factory.html`
- `technology.html`
- `race-validation.html`
- `products.html`
- `custom-bike.html`
- `partners.html`
- `supplier.html`
- `dealers.html`
- `support.html`
- `stores.html`
- `b2b-login.html`

B2B operations pages:

- `supplier-login.html`
- `b2b-dashboard.html`
- Future supplier modules
- Future agent/dealer modules
- Future RFQ, document, logistics, service, warranty, pricing, and training modules

Route selection rule:

- Public visitor, product visitor, store visitor, or brand visitor: use Global specification.
- Supplier login, supplier task, QC, document, batch, or delivery workflow: use B2B specification.
- Agent/dealer login, RFQ, allocation, price, warranty, training, or launch workflow: use B2B specification.

## 4. Design Tokens

Current CSS tokens live in `styles.css` under `:root`.

Color tokens:

- `--bg: #050607`
- `--ink: #f7f8f8`
- `--muted: #aeb7bd`
- `--dim: #6f7a82`
- `--panel: #11161a`
- `--panel-2: #171d22`
- `--line: rgba(255,255,255,.14)`
- `--red: #d91f2d`
- `--cyan: #53c7df`
- `--gold: #d8b15f`
- `--green: #67c98f`
- `--paper: #f5f6f4`
- `--paper-ink: #080b0d`
- `--paper-muted: #4d5961`
- `--max: 1180px`

Typography tokens:

- `--display: "Barlow Condensed", "Arial Narrow", Impact, sans-serif`
- `--body: "Source Sans 3", "Segoe UI", Arial, sans-serif`

Recommended role tokens for future CSS extension:

- `--text-xs`
- `--text-sm`
- `--text-base`
- `--text-lead`
- `--text-hero`
- `--lh-tight`
- `--lh-solid`
- `--lh-body`
- `--lh-relaxed`
- `--space-2xs`
- `--space-xs`
- `--space-sm`
- `--space-md`
- `--space-lg`
- `--space-xl`
- `--space-2xl`
- `--space-3xl`

Color usage:

- Dark industrial backgrounds are the default for Global brand, route, custom, product, and hero pages.
- Light operational backgrounds are the default for B2B supplier and agent/dealer workspaces.
- Red is the primary CTA color and also marks urgent or dangerous states.
- Cyan marks route labels, technical emphasis, focus rings, arrows, process signals, and active route cues.
- Gold is reserved for warning or pending states.
- Green is reserved for success or released states.
- Do not add new accent colors unless a new semantic state is required.

Global versus B2B color behavior:

- Global may use large dark fields, cinematic image overlays, red/cyan strips, and image-led cards.
- B2B uses the same palette meanings on light-gray and white content surfaces for faster scanning.
- Supplier and agent/dealer modules may use dark topbars and sidebars, but content panels should remain mostly light.

## 5. Typography System

Shared font families:

- Display: `Barlow Condensed`
- Body: `Source Sans 3`

Shared behavior:

- Headings use the display family, uppercase, heavy weight, compact line height.
- Body copy uses the body family, clear sentence rhythm, no decorative letter spacing.
- Letter spacing stays `0` for normal text.
- Wider tracking is reserved for small uppercase labels, table headers, tags, and kickers.

Global official website scale:

- `h1`: `clamp(4.1rem, 10.6vw, 5.75rem)`, line-height `.9`
- `h2`: `clamp(2.65rem, 5.8vw, 4.25rem)`, line-height `.98`
- `h3`: `clamp(1.55rem, 2.4vw, 2.05rem)`, line-height about `1.05`
- Hero copy: `clamp(1.12rem, 1.25vw + .62rem, 1.34rem)`, line-height about `1.58`
- Lead copy: `clamp(1.06rem, .35vw + .98rem, 1.18rem)`, line-height about `1.72`
- Body: `16px`, line-height about `1.64`
- Card copy: concise, usually one short paragraph.

Global typography intent:

- Expressive.
- Large.
- Fast to understand.
- Strong hierarchy before detail.
- More vertical breathing room.
- High-pressure but not cramped: display headings should feel fast and mechanical without crushing ascenders, wrapping awkwardly, or dominating operational proof.

B2B operations scale:

- Dashboard body: `15px` to `16px`, line-height `1.45` to `1.56`
- Dashboard `h1`: around `clamp(2.35rem, 3.6vw, 3.35rem)` for dense workspaces; high-fidelity concept pages may go larger only when the panel density remains readable.
- Dashboard `h2`: around `clamp(1.55rem, 2.55vw, 2.15rem)` inside panels, with line-height about `1.06`
- KPI numbers: around `clamp(2.1rem, 3.3vw, 3.05rem)` inside dashboards; larger values are reserved for concept or showcase screens.
- Table text: `14px` to `15px`
- Labels, metadata, table headers: `12px` to `13px`

B2B typography intent:

- Compact.
- Repeated-action friendly.
- Clear labels over drama.
- Strong numeric hierarchy.
- Less campaign language inside panels.
- Module lanes should favor scan rhythm over maximum column count. Three readable portal lanes beat six cramped lanes on desktop.

## 6. Spacing, Layout, And Density

Shared foundation:

- Max content width: `--max: 1180px`
- Public wrapper: `.wrap`
- Default public wrapper width: `min(var(--max), calc(100% - 40px))`
- Mobile public wrapper width: `min(100% - 28px, var(--max))`

Global spacing:

- Major sections use `.section`.
- Section padding should stay around `clamp(88px, 9vw, 136px) 0` on desktop and `clamp(64px, 16vw, 88px) 0` on mobile.
- Section heads use a two-column layout: heading first, lead copy second.
- Cards and grids use generous vertical breathing room.
- Hero pages should keep a hint of the next section visible where possible.
- Public cards and proof panels should align content from the top with clear internal rhythm. Avoid forcing short cards to stretch content to top and bottom just to fill height.

Global layout patterns:

- Sticky public navigation.
- Full-width photographic hero.
- Two-column section heads.
- 2, 3, or 4 column grids.
- Route maps.
- Process strips.
- Product image cards.
- Custom-bike preview plus control panel when public-facing.

B2B spacing:

- Use `.dashboard-body`, `.app-topbar`, `.app-layout`, `.app-sidebar`, and `.app-content`.
- Topbar height should stay around `64px` to `68px`.
- Sidebar width should stay around `252px` on desktop.
- Content padding should stay around `22px` to `24px` desktop and `16px 14px` mobile.
- Toolbar, table, task, KPI, and alert gaps should remain compact.
- B2B controls should generally reach at least `38px` height; primary actions and inputs should be closer to `44px` to `48px` where space allows.

B2B layout patterns:

- Topbar plus sidebar app shell.
- Content header instead of hero.
- KPI row.
- Toolbar filters.
- Data table.
- Status list.
- Alert list.
- Task queue.
- Role switch.
- Detail panels.

Do not introduce floating decorative page-section cards. Cards should represent repeated content, products, dashboard panels, forms, or real workflow objects.

## 7. Component Guidelines

### Global Navigation

Class: `.site-nav`

Rules:

- Sticky, dark, blurred, bordered.
- Logo left at about `132px x 30px`, shrinking on mobile.
- Links are compact and bold.
- `B2B Login` uses `.nav-cta`.
- Current page state uses `.is-current` with a cyan/red underline cue only; do not add visible status text such as `Current`, `Page`, or `Section` inside the global navigation.
- On tablet/mobile, non-CTA nav links can hide to keep the header usable.
- Breadcrumbs are required on second-level and deeper public pages. Top-level pages do not show breadcrumbs.
- Breadcrumb format is `Home / Parent section / Current page`; current page is plain text with `aria-current="page"`.

Current public nav order:

- `Home`
- `Bicycles`
- `Technology`
- `WorldTour`
- `Manufacturing`
- `Partners`
- `Dealers`
- `Support`
- `B2B Login`

`Custom`, `Suppliers`, `Stores`, warranty, technical documents, registration, inventory and RFQ routes are subordinate entry points. They should remain easy to reach from page CTAs and footer maps, but they should not crowd the public top-level IA.

### B2B Navigation

Classes: `.app-topbar`, `.app-sidebar`, `.side-menu`

Rules:

- Topbar carries logo, workspace title, global actions, account identity, and sign out.
- Sidebar carries module navigation and role-specific module order.
- Mobile sidebar becomes a sticky horizontal module nav.
- Supplier and agent/dealer modules share the model but not necessarily the same labels or priority.

### Hero

Classes: `.hero`, `.page-hero`

Applies to Global pages only.

Required elements:

- `.kicker`
- `h1`
- `.hero-copy`
- Primary route action near the hero or first section

Rules:

- Use real or realistic cycling, factory, product, store, or route imagery.
- Use dark overlays for contrast.
- H1 should be short, concrete, and route-specific.
- Kicker identifies route, role, or system position.
- First viewport must include the core message and at least one primary CTA. Do not place the first actionable route only in the next section.
- Internal `.page-hero` sections should stay around 55-60svh with compact copy and CTA buttons inside the hero.
- B2B screens must not use cinematic heroes.

### Content Header

Class: `.content-header`

Applies to B2B pages.

Rules:

- Use practical heading, role/location kicker, short lead, and immediate controls.
- Pair with toolbar, KPI row, table, or task queue.
- Keep copy shorter than public hero copy.

### Buttons

Global classes:

- `.btn`
- `.btn.primary`
- `.btn.dark`
- `.btn.light`
- `.nav-cta`

Global rules:

- Minimum height around `48px`.
- Primary CTA uses red.
- Hover can lift slightly.
- Labels must be action-oriented and route-specific.

B2B classes:

- `.icon-btn`
- `.mini-link`
- `.role-tab`
- Compact `.btn` when needed

B2B rules:

- Use compact controls for repeated actions.
- Avoid large marketing-style buttons inside dense panels.
- Use export, download, view, approve, release, upload, filter, and open as direct action language.

### Cards And Panels

Global classes:

- `.card`
- `.product-card`
- `.role-link`
- `.chain-step`
- `.process`

Global rules:

- `.card` uses `.num`, heading, short paragraph.
- `.product-card` uses image background, gradient overlay, `.tag`, and bottom-aligned content.
- `.role-link` uses cyan marker, bold title, muted description, and action word.
- `.chain-strip` and `.process` show chain stages.

B2B classes:

- `.dash-card`
- `.kpi-card`
- `.toolbar`
- `.status-list`
- `.task-list`
- `.alert-list`
- `.table-wrap`

B2B rules:

- `.dash-card` is the primary content panel.
- `.kpi-card` is for numeric summaries.
- `.toolbar` is for filters and batch actions.
- `.status-list`, `.task-list`, and `.alert-list` are for work queues.
- Tables are preferred for orders, RFQs, logistics, documents, warranty, and pricing.
- Avoid image-backed product cards inside supplier/agent/dealer workspaces unless the module is an asset library.

### Forms

Classes: `.field`, `.field.compact`, `.form-note`

Rules:

- Labels sit above inputs.
- Inputs/selects are at least `46px` high in public and login contexts.
- B2B filters may be compact but must remain readable.
- Error/help text uses `.form-note`.
- Global forms may be more spacious and explanatory.
- B2B forms should be grouped by workflow and paired with tables, uploads, or task states where useful.

### Tables

Classes: `.table-wrap`, `table`

Rules:

- Use `.table-wrap` for horizontal overflow.
- Keep practical table minimum width, currently around `660px`.
- Headers are small, uppercase, and muted.
- Use tables for comparison, status, order, RFQ, document, warranty, pricing, and shipment data.

### Custom Bicycle Configurator

Current page: `custom-bike.html`

Specification: Global official website.

Purpose:

- Public custom-bike route.
- Bridge between product interest, dealer consultation, and B2B RFQ.

Required logic:

- Scene selection changes environment, stock platform, model badge, `data-bike`, and model visual state.
- Required scenes: Race Day, Climbing, Endurance, Dealer Demo.
- Required model mapping: Race Day to AD9 Aero Road, Climbing to RT9 Lightweight, Endurance to GT All-Road, Dealer Demo to CM Urban Alloy.
- Required customization layers: Layer 1 Stock Platform and Layer 2 Micro Custom.
- Required controls: rider geometry, split components, semi-custom paint, lettering, decal position, and modular scene packages.

Component rules:

- `.custom-shell` is a two-panel page: immersive preview left, configuration controls right.
- `.review-strip` summarizes fit, lead-time, warranty, or dealer-review checkpoints before the detailed controls.
- `.bike-preview` owns scene state through `data-scene`, model state through `data-bike`, and accent placement through `data-accent-zone`.
- `.model-stage` and `.model-part` create the current product visual when no transparent side-view bike asset exists.
- Replace the CSS-built bike visual with real transparent side-view model images when production assets are available.
- RFQ actions should send users to dealer or B2B routes.
- Scene imagery must not show a rider; use empty road, mountain road, open endurance road, or dealer showroom/store contexts.

## 8. Page Templates

### Global Home Template

Required structure:

- Sticky public navigation.
- Full hero with route-oriented value proposition.
- Primary actions.
- North America trust signals when the page is aimed at riders, dealers, or stores.
- Chain strip.
- Brand/factory/channel proof sections.
- Partner-ready proof modules for fit, warranty, service parts, dealer tools, and model clarity when VOC risk is part of the objective.
- Role or route map.
- Product/store/dealer/custom entry points.
- Footer sitemap follows the public IA matrix with Home, Bicycles, Proof, Partners, Support, and B2B groups. It may expose subordinate routes such as Custom, Supplier, Stores, Warranty, Registration, Owner Garage, RFQ, and Quality Documents.
- Public footer must include newsletter signup, social media links, contact email, and contact phone.
- Footer or sitemap must use real user-facing page routes only; do not expose internal IA notes, test conclusions, or planning labels on the public homepage.

### Global Route Page Template

Use for factory, supplier public route, dealer public route, store, and product pages.

Required structure:

- `.site-nav`
- `.page-hero`
- First proof section
- Role-specific cards or process strip
- Route actions
- Footer with next route or related route

### Custom Bike Template

Required structure:

- Public nav with `Custom`
- Custom hero or page intro
- Immersive preview
- Stock platform controls
- Micro custom controls
- Compatibility or RFQ summary
- Dealer/B2B route action

### Supplier B2B Template

Required structure:

- `.dashboard-body`
- `.app-topbar`
- `.app-sidebar`
- `.content-header`
- Supplier KPI or status summary
- Compact toolbar
- Task queue
- Document or batch table
- Alerts for missing QC, COA, deviation, release, shipment, or corrective action

Supplier module priority:

- Qualification
- Material batches
- Sample review
- QA documents
- Shipment readiness
- Engineering deviation requests
- Corrective actions

### Agent/Dealer B2B Template

Required structure:

- `.dashboard-body`
- `.app-topbar`
- `.app-sidebar`
- `.content-header`
- Dealer KPI or commercial summary
- Compact toolbar
- RFQ/order table
- Allocation or inventory panel
- Warranty/service queue
- Launch assets or training panel

Agent/dealer module priority:

- RFQ
- Open orders
- Price/tier views
- Inventory allocation
- Launch assets
- Warranty cases
- Training
- Store support

B2B portal preview modules:

- `portal-grid` is used on public B2B entry pages to explain what partners can do after login.
- `portal-lanes` is used inside B2B dashboards for compact access to RFQ, inventory, price tier, warranty, academy, and launch asset workstreams.
- These modules should describe executable jobs, not brand claims.

## 9. User Flows

Global user flow:

- Hero declaration: Race Proven. Business Ready.
- Partner confidence: WorldTour, vertical integration, dealer first model, global scale.
- Manufacturing proof: built from raw carbon fiber to complete bicycles.
- WorldTour proof: race validation that sells trust.
- Bike solutions: AERO, LIGHTWEIGHT, GRAVEL, URBAN.
- Dealer growth: margin, supply, marketing support, training, warranty, global exposure.
- Find or apply CTA: find a dealer, become a partner, or open B2B Login.

Supplier flow:

- Login
- Dashboard overview
- Required actions
- Qualification or batch detail
- Upload or review documents
- Resolve QA/release/shipment issue
- Confirm state change

Agent/dealer flow:

- Login
- Dashboard overview
- RFQ/order/action queue
- Review allocation, price, warranty, or launch asset
- Export/download/approve/upload
- Route to store support or service workflow

Cross-system flow:

- Global pages may invite suppliers, agents, or dealers into B2B.
- B2B may reference public product pages as sales or training context.
- B2B workspaces should not become public marketing pages.

## 10. Imagery And Media

Global imagery:

- Use imagery as first-level storytelling.
- Hero images must show product, factory, road, store, route, or operational context.
- Product cards must reveal the actual product or business context.
- Custom-bike scene images must show environments without riders.
- Image-to-copy match is mandatory. Every hero, card, technical module, route proof, and CTA block image must visibly support the exact claim beside it.
- Do not use generic race, road, factory, document, or stock imagery when the copy is about a specific technology, workflow, material, product part, or user role.
- Technical modules require technical imagery: aerodynamics needs airflow, wind-tunnel, drag, or aero product validation; carbon layup needs carbon material, layup, fiber, or inspection; wheelset copy needs rim, spoke, hub, or wheel structure validation.
- If no matching asset exists, source or create one before shipping. Do not hide a weak match inside polished styling.
- Avoid abstract decoration as the primary visual.

Current generated visual assets:

- `assets/visuals/hero-race-peloton.png`: homepage and race-validation hero only. Use when the message is race proof, speed, launch energy, or brand intensity.
- `assets/visuals/card-custom-fit-studio.png`: product catalog, bike finder, model comparison, and custom configurator entry points. Use when the message is product choice, fit, configuration, or model review.
- `assets/visuals/card-store-test-ride.png`: stores, local inventory, store pickup, fit, test ride, and authorized purchase routes.
- `assets/visuals/card-dealer-operations.png`: dealer cooperation, dealer training, launch assets, RFQ/orders, B2B login, and partner operations.
- `assets/visuals/card-factory-qc.png`: factory, supplier, quality documents, carbon inspection, batch validation, and production proof.
- `assets/visuals/card-service-docs.png`: technical documents, warranty claims, product registration, owner garage, spare parts, and service support.
- `assets/visuals/tech-aerodynamics-ad9.png`: AD9 aerodynamics, wind resistance, drag reduction, aero validation, and race-frame technology modules.
- `assets/visuals/tech-carbon-layup-ad9.png`: AD9 Toray T1100 carbon fiber, carbon layup, frame structure, material stiffness, and carbon technology modules.
- `assets/visuals/tech-wheelset-ad9.png`: AD9 Branta C50 carbon wheelset, rim profile, wheel structure, rolling efficiency, and lateral stiffness modules.

Do not reuse one cycling road image for every module. Each page hero, `.product-card`, and technical card image must match the specific user task described by its heading and CTA.

B2B imagery:

- Use sparingly.
- Supplier images: factory, material, QC, logistics, document context.
- Agent/dealer images: launch assets, product training, store demos, campaign previews.
- Operational state must be communicated by data, labels, status, and actions, not by large images.

Logo:

- Use `assets/x-lab-logo.webp` unless the brand asset is intentionally updated.

## 11. Motion And Interaction

Current motion:

- `app.js` adds `body.js`.
- IntersectionObserver reveals `.reveal`, `.card`, `.product-card`, `.role-link`, `.photo-grid img`, and `.process div`.
- Reveal motion uses fade plus `translateY(18px)`.
- Transition delays are staggered up to four steps.

Motion rules:

- Motion should feel fast, controlled, and functional.
- Do not add playful bounce, heavy parallax, or slow ornamental motion.
- Keep `prefers-reduced-motion: reduce` support intact.
- Interactive states must remain visible without relying only on motion.
- Global can use reveal motion to build visual momentum.
- B2B should keep motion minimal: hover, active, loading, reveal, and state transitions only when they help orientation.

## 12. Responsive Behavior

Current breakpoints:

- `max-width: 980px`: tablet/dashboard collapse.
- `max-width: 640px`: mobile layout.

Global responsive rules:

- Preserve visual impact while collapsing to one-column sections.
- Hide secondary nav links before mobile if needed.
- Grids reduce to two columns at tablet and one column on mobile.
- Hero text must wrap cleanly.
- Product cards and photo grids reduce height on mobile.

B2B responsive rules:

- Preserve task completion over visual drama.
- Topbar can wrap tools to a second row.
- Sidebar becomes sticky horizontal module nav.
- Filters stack.
- Tables scroll inside `.table-wrap`.
- Buttons and primary controls remain reachable.
- Avoid page-level horizontal scroll.

Test widths:

- 375px
- 414px
- 768px
- 1024px
- 1440px

## 13. Accessibility And Inclusion

Accessibility floor:

- Visible focus ring: `:focus-visible` uses cyan outline.
- Selection uses red background with white text.
- Semantic navigation uses `aria-label`.
- Reduced-motion media query is present.
- Links and buttons have clear labels.
- Meaningful inline images need alt text.
- Decorative CSS backgrounds do not need inline alt text.

New module rules:

- Use real buttons for actions.
- Use links for navigation.
- Keep heading order logical.
- Make form labels visible.
- Keep dark-overlay text high contrast.
- Do not remove keyboard focus states.
- Do not rely on color alone for urgent, warning, success, or disabled states.

## 14. Content And UX Writing

Shared voice:

- Concise.
- Concrete.
- Operational.
- Proof-led.

Preferred terms:

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

Global voice:

- Public-facing and directional.
- Explains brand proof, product confidence, route clarity, and store/dealer handoff.
- Can use sharper campaign-like headings when proof follows quickly.

Supplier voice:

- Precise, procedural, and evidence-led.
- Use terms like qualification, intake, inspection, batch, COA, corrective action, deviation, release, traceability.

Agent/dealer voice:

- Commercial, enablement-focused, and action-oriented.
- Use terms like allocation, tier, RFQ, sell-in, stock, training, launch assets, warranty, service, market support.

Copy pattern:

- Kicker: identify role or system location.
- Heading: state the operational point.
- Lead: explain why it matters.
- Card label: proof, stage, or role.
- CTA: role-specific action.

Avoid:

- Empty claims like "premium experience" without proof.
- Generic "Learn More" when a specific route action exists.
- Long paragraphs inside cards.
- Marketing slogans inside supplier and agent/dealer task panels.

## 15. Governance And Maintenance

Design governance:

- `design.md` is the design memory for the project.
- Reusable visual, interaction, or layout changes must update this document.
- Accepted strategy or PPT optimization recommendations must not remain presentation-only. Once confirmed, mirror them into the high-fidelity page, design-system visual page, and relevant requirement or implementation document before the work is considered synced.
- One-off page content changes do not require a design-system update unless they create a new reusable pattern.
- New colors, new type scales, new spacing rhythms, and new component classes must be justified here.

Change process:

1. Classify the user category.
2. Choose Global or B2B specification.
3. Reuse existing tokens and components.
4. Extend only when the current system cannot express the required workflow or page.
5. Update `design.md` in the same work cycle.
6. Verify mobile, focus, contrast, and role-specific clarity.

Definition of done for new pages:

- User category is explicit.
- Correct UI specification is used.
- Shared brand foundation is preserved.
- Typography scale matches Global or B2B.
- Spacing density matches Global or B2B.
- Components match the selected specification.
- The next route or workflow action is clear.
- Mobile behavior is checked.
- Accessibility floor is preserved.

## 16. New Page And Module Checklist

Before adding a new page or module, confirm:

- The user category is one of: Global public user, supplier, agent/dealer.
- The correct specification is selected: Global official website or B2B operations.
- The page has a clear route from the previous and next business step.
- It reuses existing tokens, fonts, spacing, cards, buttons, and navigation patterns.
- Global pages use `.page-hero`, `.hero`, product/custom layouts, route sections, or public grids.
- Supplier and agent/dealer pages use B2B topbar/sidebar/content layouts.
- Proof appears before cooperation, login, purchase, or contact requests.
- Global CTAs use existing `.btn` variants.
- B2B actions use `.icon-btn`, `.mini-link`, `.role-tab`, compact `.btn`, forms, tables, and task states.
- Global cards follow the `.num` plus `h3` plus concise paragraph pattern.
- B2B panels use `.dash-card`, KPI, toolbar, alert, task-list, status-list, and table patterns.
- Images reveal product, factory, store, route, or operational context.
- Mobile layout works at 640px and below.
- Focus, reduced motion, labels, and contrast are preserved.
- If a reusable pattern changes, this file is updated.

## 淇敼璁板綍 / Change Log

| Date | Change | Reason | Affected Scope |
| --- | --- | --- | --- |
| 2026-06-07 | Added newsletter, social links, email, and phone to the homepage footer. | User requested footer conversion and contact entries. | `index.html`, `styles.css`, `design.md`. |
| 2026-06-07 | Added breadcrumbs to second-level public pages only. | User requested breadcrumb navigation while keeping first-level pages clean. | Child public pages, `styles.css`, `design.md`. |
| 2026-06-07 | Refreshed homepage footer sitemap for the new IA. | User requested the bottom sitemap to match the updated public navigation and narrative structure. | `index.html`, `styles.css`, `design.md`. |
| 2026-06-07 | Restored Home as the first public navigation item. | User pointed out the PPT IA implementation still needs a clear homepage return route in the top menu. | Public `.site-nav`, `PRODUCT.md`, `design.md`, `design-system.html`. |
| 2026-06-07 | Applied PPT V2.0 narrative IA to the public website. | User approved the shift from product catalog logic to a global strategic platform narrative: trust, manufacturing, WorldTour, bicycle solutions, dealer growth, and partner conversion. | `index.html`, `technology.html`, `partners.html`, `factory.html`, `race-validation.html`, `dealers.html`, `products.html`, global navigation, `PRODUCT.md`, `design-system.html`. |
| 2026-06-07 | Added design synchronization principle for accepted PPT recommendations. | User requested PPT optimization opinions to be synchronized into high-fidelity screens and project documents as a common rule. | `PRODUCT.md`, `design.md`, `design-system.html`, high-fidelity pages, common requirements. |
| 2026-06-07 | Refined global typography and spacing scale for the full website. | User requested a whole-site typography and layout review; headings, lead copy, public cards, B2B lanes, dashboard hierarchy, footer rhythm, and mobile type scale were adjusted for clearer North American B2B/performance-brand reading. | `styles.css`, `design.md`, public pages, high-fidelity pages, B2B dashboard pages. |
| 2026-06-06 | Added visual design system page sync rule. | User requested a visual Design System page in the left menu, periodic sync with `design.md`, and an edit log. | `design-system.html`, `design.md`, management menu, design governance. |

## Visual Sync Page

Source of truth: `design.md`.

Visual page: `design-system.html`.

Sync rule: whenever `design.md` changes, update `design-system.html` in the same work cycle. A weekly sync check also reviews whether the visual page has drifted from this source file.

PPT-to-design sync rule: accepted recommendations from the visual strategy PPT must be applied to the matching high-fidelity screens, this design source file, the visual design-system page, and related requirement or implementation documents in the same work cycle.
