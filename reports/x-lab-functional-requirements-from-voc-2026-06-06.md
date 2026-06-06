# X-LAB Functional Requirements From VOC

Date: 2026-06-06

Source: `reports/x-lab-voc-demand-intelligence-2026-06-06.md`

Purpose: Convert public VOC findings into an actionable functional requirements list for product, website, dealer portal, service operations, and demand management.

## Priority Definitions

- P0: Directly blocks trust, purchase conversion, or dealer enablement.
- P1: Strongly improves conversion, support efficiency, or product confidence.
- P2: Useful optimization or later-stage growth requirement.

## Functional Requirements

| ID | Module | Priority | Requirement | VOC / pain point | Key acceptance criteria |
|---|---|---:|---|---|---|
| <a id="fr-001"></a>FR-001 | Product discovery | P0 | Model comparison matrix | Buyers cannot easily understand RS / AD / RT / GT / SP / ST model hierarchy. | Users can compare all active models by use case, price, weight, frame, groupset, wheelset, tire clearance, warranty, and channel availability. Matrix supports road, gravel, urban, and e-bike filtering. |
| FR-002 | Product discovery | P0 | Plain-language model selector | New riders need guidance before reading detailed specs. | User can answer riding type, budget, terrain, fit priority, and performance goals, then receive 2-3 recommended models with reasons and tradeoffs. |
| FR-003 | Product detail | P0 | Spec transparency block | Low price creates suspicion about hidden compromises. | Every product page shows complete component list, frame material, wheel details, drivetrain, cockpit, power meter, tire clearance, weight claim basis, and included accessories. |
| <a id="fr-004"></a>FR-004 | Product detail | P0 | Geometry and fit explainer | Users and dealers emphasize fit uncertainty before purchase. | Product page includes geometry chart, recommended rider height/inseam, size calculator, fit notes by riding style, and a clear prompt to confirm fit with dealer. |
| FR-005 | Product detail | P1 | Integrated cockpit configuration guide | Cockpit width, stem length, spacers, and proprietary systems create hesitation. | Product page explains available cockpit sizes, adjustment range, replacement process, and whether size changes can be requested at purchase. |
| FR-006 | Product detail | P1 | Build variant comparison | Users compare mechanical 105, Di2, GRX, Astana builds and price jumps. | Product page lets users compare variants side by side with price, groupset, wheels, power meter, weight, and intended rider profile. |
| <a id="fr-007"></a>FR-007 | Product detail | P1 | "Why this price" FAQ | Value pricing creates excitement and suspicion. | Product and brand pages explain XDS vertical integration, dealer model, OEM/manufacturing background, warranty, and service commitments without sounding defensive. |
| <a id="fr-008"></a>FR-008 | Dealer channel | P0 | Dealer locator with inventory status | Buyers want to know where they can test, buy, reserve, or service bikes. | Dealer locator shows location, contact, service capability, available models/sizes, test ride availability, order/reserve status, and last inventory update timestamp. |
| <a id="fr-009"></a>FR-009 | Dealer channel | P0 | Reserve / request test ride flow | Local shop availability is a key trust driver. | User can request a test ride or reserve a bike from a selected dealer; dealer receives model, size, preferred time, contact info, and notes. |
| <a id="fr-010"></a>FR-010 | Dealer channel | P0 | Allocation and lead-time visibility | Allocation-based ordering may frustrate buyers if unclear. | Product and dealer pages show estimated lead time, preorder status, allocation batch, deposit requirement, cancellation rules, and dealer contact path. |
| FR-011 | Dealer channel | P1 | Dealer detail page | Dealer pages are part of trust-building but currently fragmented across the web. | Each dealer page shows address, service offerings, supported categories, X-LAB certified status, appointment options, and warranty handling capability. |
| <a id="fr-012"></a>FR-012 | Dealer portal | P0 | Dealer inventory management | Public inventory visibility requires dealer-side update tools. | Dealers can update stock by model, size, color, test-bike status, preorder quantity, and lead time. Updates sync to public locator. |
| <a id="fr-013"></a>FR-013 | Dealer portal | P1 | Dealer service playbook library | Shops need confidence servicing Branta/proprietary systems. | Dealer portal contains service manuals, compatibility docs, warranty workflow, escalation contacts, training videos, and downloadable customer explainers. |
| <a id="fr-014"></a>FR-014 | Dealer portal | P1 | Dealer objection-handling sheet | Dealers need answers on warranty, price, parts, sizing, and service. | Dealer can download or share a one-page sales support sheet covering the top customer objections and approved answers. |
| FR-015 | Dealer portal | P1 | Lead inbox for RFQ/test rides | Dealer conversion depends on fast response to web leads. | Dealer portal shows incoming leads, source page, requested model/size, status, owner, response due date, and next action. |
| <a id="fr-016"></a>FR-016 | Warranty / after-sales | P0 | Warranty registration flow | Lifetime warranty depends on authorized purchase and timely registration. | User can register bike within 90 days using serial number, proof of purchase, dealer, model, size, and contact info. Confirmation explains covered components and claim path. |
| <a id="fr-017"></a>FR-017 | Warranty / after-sales | P0 | Warranty explainer page | Warranty rules are a major trust signal and possible confusion point. | Page clearly explains frame, wheel, original-owner, authorization, registration deadline, exclusions, claim steps, and expected response timeline. |
| <a id="fr-018"></a>FR-018 | Warranty / after-sales | P1 | Warranty claim status tracking | After-sales certainty is a conversion blocker. | User/dealer can submit claim, upload photos/documents, receive case ID, track status, and see next required action. |
| FR-019 | Warranty / after-sales | P1 | Return policy decision guide | Online return policy is short and may create purchase anxiety. | User can understand return window, restocking fees, ridden-bike rules, shipping responsibility, and dealer-vs-online purchase differences before checkout. |
| <a id="fr-020"></a>FR-020 | Parts / compatibility | P0 | Compatibility and spare-parts database | Proprietary crank, chainring, cockpit, seatpost, spacers, wheels, and power meter create hesitation. | User/dealer can search by model/year/component and see compatible part numbers, alternatives, availability, service notes, and replacement route. |
| <a id="fr-021"></a>FR-021 | Parts / compatibility | P1 | Proprietary component transparency badges | Buyers need to know which components are standard vs proprietary. | Product pages label standard, semi-proprietary, and proprietary components with service implications and replacement availability. |
| <a id="fr-022"></a>FR-022 | Parts / compatibility | P1 | Chainring / drivetrain compatibility guide | Gravel buyers specifically question 40T chainring suitability and swap options. | GT and other drivetrain pages show supported chainring sizes, BCD/interface, drivetrain limits, terrain recommendations, and dealer service guidance. |
| <a id="fr-023"></a>FR-023 | Reviews / social proof | P1 | Verified owner review system | Authentic post-purchase feedback is sparse because launch is recent. | Owners can submit verified reviews tied to serial/order/dealer; reviews can be filtered by model, size, terrain, rider height, and ownership duration. |
| FR-024 | Reviews / social proof | P1 | Media review hub | Media reviews are currently dispersed across external sources. | Brand site aggregates third-party reviews with date, model, publication, key takeaway, and outbound link. |
| <a id="fr-025"></a>FR-025 | Reviews / social proof | P2 | Real owner follow-up survey | Early owner feedback should become structured VOC. | System sends post-purchase surveys at 14, 60, and 180 days; responses feed a VOC database tagged by model, issue, sentiment, and severity. |
| FR-026 | Brand trust | P0 | XDS manufacturing credibility page | Western brand awareness is low despite XDS scale. | Site explains XDS history, manufacturing scale, vertical integration, quality controls, race partnerships, and dealer-backed support. |
| FR-027 | Brand trust | P1 | WorldTour / race proof page | XDS-Astana legitimacy drives interest for road buyers. | Site shows race program, bikes used, athlete/team proof points, technology transfer, and relevant media coverage. |
| <a id="fr-028"></a>FR-028 | Brand trust | P1 | Brand comparison narrative | Premium buyers compare against Trek, Giant, Canyon, Specialized, and custom builds. | Page explains X-LAB positioning by value, dealer support, warranty, specs, and use case without direct unsupported performance claims. |
| <a id="fr-029"></a>FR-029 | Checkout / online purchase | P1 | Pre-purchase confidence checklist | Buyers want to avoid fit, warranty, return, and service mistakes. | Before online checkout, user confirms size confidence, local service path, warranty registration requirement, return terms, and component configuration. |
| <a id="fr-030"></a>FR-030 | Checkout / online purchase | P1 | Dealer-assisted checkout option | Authorized dealer purchase reinforces warranty and fit trust. | User can choose ship-to-dealer, dealer pickup, dealer assembly, or dealer consultation during checkout where available. |
| <a id="fr-031"></a>FR-031 | E-bike support | P2 | E-bike service and compliance center | Urban/e-bike buyers care about motor, battery, app, class rules, and service. | E-bike pages show motor/battery specs, range basis, charging, replacement path, app support, class compliance, and local service requirements. |
| FR-032 | E-bike support | P2 | Battery / motor support ticket type | E-bike after-sales needs different triage than acoustic bikes. | Support form includes e-bike-specific fields: motor, battery serial, firmware/app version, range issue, error code, charger status, and safety notes. |
| FR-033 | Demand management | P0 | VOC evidence database | Requirements need source URL, date, persona, severity, and confidence. | Team can log VOC item, source, date observed, user type, product line, sentiment, severity, confidence, owner, and linked requirement. |
| FR-034 | Demand management | P0 | Requirement intake board | VOC must become trackable demand items. | Demand board supports categories: Product Info, Brand Trust, Purchase Channel, Dealer Enablement, Supplier/Parts, Warranty/After-sales, Reviews, E-bike Support. |
| FR-035 | Demand management | P1 | Monthly VOC refresh workflow | Launch wave is fresh and market sentiment may shift quickly. | System stores monthly refresh notes, new sources, sentiment changes, new risks, resolved concerns, and priority changes. |
| FR-036 | Demand management | P1 | Evidence-to-feature traceability | Product decisions need to preserve why each feature exists. | Each feature requirement links to one or more VOC evidence items and shows confidence, source type, and last verified date. |
| FR-037 | Supplier / distributor | P1 | Distributor directory and inquiry flow | Global distributors exist but partner contact paths need clarity. | Site lists distributor by country/region, contact method, supported categories, dealer application path, and escalation contact. |
| FR-038 | Supplier / distributor | P1 | Supplier capability intake form | Supplier/parts ecosystem needs structured onboarding. | Potential suppliers can submit company profile, category, certifications, capacity, region, sample availability, compliance docs, and contact owner. |
| <a id="fr-039"></a>FR-039 | Supplier / distributor | P2 | Parts availability dashboard | Spare-parts confidence matters to dealers and premium buyers. | Internal users can view availability, lead time, region stock, open backorders, and critical part alerts for proprietary parts. |
| FR-040 | Analytics | P1 | Conversion friction analytics | Product info gaps and channel friction should be measured. | Analytics track comparison usage, size calculator completion, dealer locator clicks, test ride requests, warranty page visits, compatibility searches, and checkout abandonment reasons. |

## MVP Cut

Recommended first release scope:

1. FR-001 Model comparison matrix.
2. FR-004 Geometry and fit explainer.
3. FR-008 Dealer locator with inventory status.
4. FR-009 Reserve / request test ride flow.
5. FR-016 Warranty registration flow.
6. FR-017 Warranty explainer page.
7. FR-020 Compatibility and spare-parts database.
8. FR-026 XDS manufacturing credibility page.
9. FR-033 VOC evidence database.
10. FR-034 Requirement intake board.

## Suggested Demand Board Fields

| Field | Type | Purpose |
|---|---|---|
| Requirement ID | Text | Stable tracking ID, e.g. FR-001. |
| Title | Text | Short requirement name. |
| Module | Select | Product Discovery, Dealer Channel, Warranty, Parts, etc. |
| Priority | Select | P0, P1, P2. |
| Persona | Multi-select | End user, dealer, distributor, supplier, service team, internal product team. |
| VOC source | URL / relation | Link to Reddit, media, official page, dealer page, or internal note. |
| Evidence strength | Select | High, Medium-high, Medium, Low. |
| Problem statement | Text | User pain point or business risk. |
| Functional description | Text | What the product must enable. |
| Acceptance criteria | Text | Observable conditions for done. |
| Owner | Person | Responsible product/business owner. |
| Status | Select | New, Triage, Planned, In design, In development, Launched, Deferred. |
| Last verified | Date | When the VOC or market fact was last checked. |

## Notes

- Requirements above are derived from public web VOC and market evidence available on 2026-06-06.
- Closed/private channels such as dealer groups, customer support tickets, private communities, and CRM records should be added as new evidence before final prioritization.
- Any requirement involving current inventory, warranty operations, or parts availability should be validated with internal operations data before engineering commitment.
