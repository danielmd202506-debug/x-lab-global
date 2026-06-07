document.body.classList.add("js");

const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelector(".site-nav .nav-links");

if (siteNav && navLinks) {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  if (!navLinks.querySelector(".nav-tools")) {
    const navTools = document.createElement("span");
    navTools.className = "nav-tools";
    navTools.setAttribute("aria-label", "Shopping and account tools");
    navTools.innerHTML = `
      <a class="nav-tool-icon${currentPage === "cart.html" ? " is-current" : ""}" href="cart.html" aria-label="Shopping cart">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 6h4l3 15h15l3-11H10"/><path d="M13 25h1M24 25h1"/><path d="M12 21h15"/></svg>
        <span class="sr-only">Shopping cart</span>
      </a>
      <a class="nav-tool-icon${currentPage === "owner-garage.html" ? " is-current" : ""}" href="owner-garage.html" aria-label="User center">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/><path d="M6 28v-3c0-4 4-7 10-7s10 3 10 7v3"/><path d="M10 28h12"/></svg>
        <span class="sr-only">User center</span>
      </a>
    `;
    navLinks.appendChild(navTools);
  }

  const menuButton = document.createElement("button");
  menuButton.className = "mobile-menu-button";
  menuButton.type = "button";
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = "<span></span><span></span><span></span>";

  const menuBackdrop = document.createElement("button");
  menuBackdrop.className = "mobile-menu-backdrop";
  menuBackdrop.type = "button";
  menuBackdrop.setAttribute("aria-label", "Close navigation menu");

  siteNav.insertBefore(menuButton, navLinks);
  document.body.appendChild(menuBackdrop);

  const setMobileMenu = (open) => {
    document.body.classList.toggle("mobile-menu-open", open);
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  };

  menuButton.addEventListener("click", () => {
    setMobileMenu(!document.body.classList.contains("mobile-menu-open"));
  });
  menuBackdrop.addEventListener("click", () => setMobileMenu(false));
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMobileMenu(false));
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMobileMenu(false);
  });
}

const revealItems = document.querySelectorAll(".reveal, .card, .product-card, .role-link, .photo-grid img, .process div");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 5, 4) * 35}ms`;
  observer.observe(item);
});

const storeCity = document.querySelector("#storeCity");
const storeType = document.querySelector("#storeType");
const storeResult = document.querySelector("#storeResult");

function updateStoreResult() {
  if (!storeResult || !storeCity || !storeType) return;
  const city = storeCity.value.trim() || "your city";
  const type = storeType.options[storeType.selectedIndex].text;
  storeResult.innerHTML = `<span class="kicker">Recommended route</span><strong>${type}</strong><p class="lead">Start with an authorized X-LAB ${type.toLowerCase()} search near ${city}. Ask for sizing, test ride availability, warranty registration, and AD9 build lead time.</p>`;
}

[storeCity, storeType].forEach((field) => {
  if (field) field.addEventListener("input", updateStoreResult);
});
updateStoreResult();

const portalSignIn = document.querySelector("#portalSignIn");
const accountType = document.querySelector("#accountType");

if (portalSignIn && accountType) {
  const params = new URLSearchParams(window.location.search);
  const requestedRole = params.get("role");
  if (requestedRole === "apply") window.location.href = "become-partner.html";
  if (requestedRole === "dealer") accountType.value = "Agent / Distributor";
  if (requestedRole === "supplier") accountType.value = "Supplier";

  portalSignIn.addEventListener("click", () => {
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const message = document.querySelector("#loginMessage");
    if (!email?.value || !password?.value) {
      if (message) message.textContent = "Enter your business email and password.";
      return;
    }
    const value = accountType.value.toLowerCase().includes("supplier") ? "supplier" : "dealer";
    sessionStorage.setItem("xlabB2BRole", value);
    sessionStorage.setItem("xlabB2BEmail", email.value);
    window.location.href = `b2b-dashboard.html?role=${value}`;
  });
}

const roleTabs = document.querySelectorAll(".role-tab");
const rolePanels = document.querySelectorAll("[data-panel]");
const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
const legacyModuleHashes = new Set(["leads", "inventory", "quotes", "orders", "demo", "warranty", "parts", "training", "assets", "programs", "notices", "user-center"]);

if (document.body.classList.contains("dashboard-body") && !document.body.classList.contains("module-body")) {
  const legacyHash = window.location.hash.replace("#", "");
  if (legacyModuleHashes.has(legacyHash)) {
    window.location.href = `b2b-module.html?module=${legacyHash === "notices" ? "messages" : legacyHash}`;
  }
}

if (sidebarToggle) {
  const storageKey = "xlabSidebarCollapsed";
  document.querySelectorAll(".app-sidebar .side-menu a").forEach((link) => {
    if (link.dataset.short) return;
    const label = link.querySelector("span")?.textContent?.trim() || link.textContent.trim();
    const words = label.split(/\s+/).filter(Boolean);
    link.dataset.short = words.length > 1 ? words.map((word) => word[0]).join("").slice(0, 3).toUpperCase() : label.slice(0, 3).toUpperCase();
  });
  const applySidebarState = (collapsed) => {
    document.body.classList.toggle("sidebar-collapsed", collapsed);
    sidebarToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
    sidebarToggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
    sidebarToggle.setAttribute("title", collapsed ? "Expand sidebar" : "Collapse sidebar");
  };

  applySidebarState(localStorage.getItem(storageKey) === "true");
  sidebarToggle.addEventListener("click", () => {
    const collapsed = !document.body.classList.contains("sidebar-collapsed");
    localStorage.setItem(storageKey, String(collapsed));
    applySidebarState(collapsed);
  });
}

function setDashboardRole(role) {
  roleTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.role === role));
  rolePanels.forEach((panel) => panel.classList.toggle("muted-panel", panel.dataset.panel !== role));
  const accountRole = document.querySelector("#accountRole");
  const accountName = document.querySelector("#accountName");
  const userCenterRole = document.querySelector("#userCenterRole");
  const userCenterName = document.querySelector("#userCenterName");
  const roleName = role === "dealer" ? "Agent / Dealer" : "Supplier";
  const accountEmail = sessionStorage.getItem("xlabB2BEmail") || (role === "dealer" ? "dealer@x-lab.global" : "supplier@x-lab.global");
  if (accountRole) accountRole.textContent = roleName;
  if (accountName) accountName.textContent = accountEmail;
  if (userCenterRole) userCenterRole.textContent = roleName;
  if (userCenterName) userCenterName.textContent = accountEmail;
}

if (roleTabs.length) {
  const params = new URLSearchParams(window.location.search);
  const storedRole = sessionStorage.getItem("xlabB2BRole");
  setDashboardRole(params.get("role") === "dealer" || storedRole === "dealer" ? "dealer" : "supplier");
  roleTabs.forEach((tab) => tab.addEventListener("click", () => setDashboardRole(tab.dataset.role)));
  document.querySelector("#dashboardSignOut")?.addEventListener("click", () => {
    sessionStorage.removeItem("xlabB2BRole");
    sessionStorage.removeItem("xlabB2BEmail");
  });
} else if (document.querySelector(".dashboard-body")) {
  const params = new URLSearchParams(window.location.search);
  const storedRole = sessionStorage.getItem("xlabB2BRole");
  setDashboardRole(params.get("role") === "supplier" || storedRole === "supplier" ? "supplier" : "dealer");
  document.querySelector("#dashboardSignOut")?.addEventListener("click", () => {
    sessionStorage.removeItem("xlabB2BRole");
    sessionStorage.removeItem("xlabB2BEmail");
  });
}

const moduleTable = document.querySelector("#moduleTable");

if (moduleTable) {
  const moduleParams = new URLSearchParams(window.location.search);
  const moduleKey = moduleParams.get("module") || "leads";
  const moduleCatalog = {
    leads: {
      kicker: "Sales intake",
      title: "Customer Leads",
      topbar: "Retail inquiries and test-ride routing",
      description: "Manage website inquiries, dealer locator requests, test-ride bookings and customer follow-up SLA.",
      primaryAction: "Create customer lead",
      sideCopy: "Prioritize response time, assign store owner and convert qualified retail shoppers into customer quotes.",
      statuses: ["All status", "New", "Assigned", "Contacted", "Overdue"],
      summary: [["New today", "17", "3 overdue"], ["Median response", "46m", "Target under 2h"], ["Test rides", "8", "This week"], ["Quote-ready", "5", "Qualified leads"]],
      columns: ["Customer Lead ID", "Customer", "Assigned store", "Interest", "Source", "Status", "SLA", "Owner", "Next action"],
      rows: [
        ["L-8842", "H. Miller", "Denver", "RT9 Astana Blue / M", "Website", "Overdue", "3h 18m", "Unassigned", "Assign sales rep"],
        ["L-8837", "J. Chen", "Toronto", "AD9 Force AXS / M", "Dealer locator", "New", "41m", "Mia", "Call customer"],
        ["L-8829", "A. Brooks", "Seattle", "RT9 frameset / L", "Test ride", "Assigned", "1h 05m", "Evan", "Confirm demo slot"],
        ["L-8818", "N. Patel", "Seattle", "Road lineup", "Chat", "Contacted", "Closed", "Mia", "Send comparison card"],
        ["L-8814", "S. Walker", "Denver", "AD9 Carbon Black / L", "Website", "Assigned", "1h 42m", "Evan", "Check inventory"],
        ["L-8809", "M. Garcia", "Toronto", "RT9 complete / S", "Instagram", "New", "22m", "Noah", "Send first reply"],
        ["L-8802", "R. Nguyen", "Seattle", "AD9 Force AXS / M", "Dealer locator", "Contacted", "Closed", "Mia", "Create quote"],
        ["L-8798", "P. Wilson", "Denver", "Gravel GT / M", "Website", "Assigned", "58m", "Evan", "Confirm use case"],
        ["L-8791", "K. Singh", "Toronto", "RT9 frameset / M", "Test ride", "Overdue", "2h 36m", "Unassigned", "Assign store owner"],
        ["L-8786", "T. Robinson", "Seattle", "Road lineup", "Chat", "Contacted", "Closed", "Mia", "Schedule store visit"],
        ["L-8782", "B. Lee", "North America HQ", "AD9 / RT9 comparison", "Email", "New", "34m", "Sales", "Route to dealer"],
        ["L-8776", "C. Martin", "Denver", "AD9 Carbon Black / S", "Dealer locator", "Assigned", "1h 12m", "Evan", "Offer demo slot"],
        ["L-8771", "D. Young", "Toronto", "RT9 Astana Blue / L", "Website", "Contacted", "Closed", "Noah", "Send finance option"],
        ["L-8765", "A. Thompson", "Seattle", "RS9 complete / M", "Website", "Overdue", "4h 04m", "Unassigned", "Escalate follow-up"],
        ["L-8759", "G. Anderson", "North America HQ", "Dealer partnership", "Partner form", "New", "18m", "Sales", "Qualify account"],
        ["L-8754", "V. Brown", "Denver", "RT9 frameset / XL", "Chat", "Assigned", "1h 55m", "Evan", "Confirm sizing"],
        ["L-8748", "O. Davis", "Toronto", "AD9 Force AXS / M", "Website", "Contacted", "Closed", "Noah", "Reserve stock"],
        ["L-8743", "L. Moore", "Seattle", "RT9 Astana Blue / M", "Test ride", "New", "27m", "Mia", "Confirm availability"],
        ["L-8736", "I. Clark", "Denver", "Road lineup", "Dealer locator", "Assigned", "1h 21m", "Evan", "Send comparison card"],
        ["L-8730", "F. Hall", "Toronto", "Gravel GT / L", "Website", "Contacted", "Closed", "Noah", "Follow quote"],
        ["L-8724", "E. Allen", "North America HQ", "AD9 team edition", "Email", "Overdue", "2h 18m", "Sales", "Escalate to distributor"],
        ["L-8719", "Y. Kim", "Seattle", "RT9 complete / S", "Instagram", "Assigned", "1h 08m", "Mia", "Confirm test ride"],
        ["L-8713", "W. Scott", "Denver", "AD9 / M", "Website", "New", "12m", "Evan", "Send intro email"]
      ],
      detail: [["Selected SLA", "3h 18m"], ["Priority", "High"], ["Conversion path", "Lead to quote"], ["Required data", "Size, color, test-ride time"]],
      alerts: [["danger", "Overdue customer lead", "Customer Lead L-8842 is older than the North America 2-hour response target."], ["warn", "Missing owner", "Assign store owner before creating a customer quote."]]
    },
    inventory: {
      kicker: "Stock control",
      title: "Inventory",
      topbar: "Availability, ETA and reservations",
      description: "Check available bicycles, size and color coverage, incoming ETA, reserve holds and regional warehouse allocation.",
      primaryAction: "Reserve stock",
      sideCopy: "Use this list before quoting. Dealer should know what can be sold now, what is incoming and what is at risk.",
      statuses: ["All status", "Available", "Reserved", "Incoming", "Low stock"],
      summary: [["Sellable units", "118", "34 high-demand sizes"], ["Reserved", "26", "7 expire today"], ["Incoming", "42", "Next ETA Jun 18"], ["Low stock", "6", "XS / XL road sizes"]],
      columns: ["SKU", "Model", "Size", "Color", "Warehouse", "Available", "Reserved", "ETA", "Status"],
      rows: [
        ["RT9-AB-M", "RT9", "M", "Astana Blue", "Denver", "7", "4", "In stock", "Available"],
        ["RT9-AB-L", "RT9", "L", "Astana Blue", "Seattle", "5", "8", "Jun 18", "Reserved"],
        ["AD9-BK-M", "AD9", "M", "Carbon Black", "Toronto", "11", "2", "In stock", "Available"],
        ["RS9-WH-XL", "RS9", "XL", "White", "Regional", "1", "0", "Jul 02", "Low stock"]
      ],
      detail: [["Reservation window", "72 hours"], ["Best sellers", "RT9 M/L"], ["Warehouse rule", "FIFO by store priority"], ["Risk", "Low XL coverage"]],
      alerts: [["warn", "Reservation expiry", "Seven reserved units expire today."], ["danger", "Low-stock size", "RS9 XL has one unit available across region."]]
    },
    quotes: {
      kicker: "Sales conversion",
      title: "Customer Quotes",
      topbar: "Customer quotes, margin and reservations",
      description: "Build and track customer quotes with MSRP, dealer cost, margin guardrails, reserve status and expiry.",
      primaryAction: "Create customer quote",
      sideCopy: "Customer quote screens should help dealers protect margin while moving fast for online shoppers.",
      statuses: ["All status", "Draft", "Customer review", "Margin approval", "Expired"],
      summary: [["Active quotes", "14", "$186K pipeline"], ["Expire soon", "7", "Within 72h"], ["Avg margin", "31.8%", "On target"], ["Reserved units", "9", "Attached to quotes"]],
      columns: ["Customer Quote", "Customer", "Model", "MSRP", "Dealer cost", "Margin", "Status", "Expiry", "Next action"],
      rows: [
        ["Q-US-119", "H. Miller", "RT9 Astana Blue", "$7,899", "$5,360", "32.1%", "Customer review", "Jun 09", "Confirm financing"],
        ["Q-CA-088", "J. Chen", "AD9 Force AXS", "$6,499", "$4,510", "30.6%", "Margin approval", "Jun 10", "Approve promo"],
        ["Q-US-104", "A. Brooks", "RT9 frameset", "$4,199", "$2,690", "35.9%", "Draft", "Jun 12", "Send quote"],
        ["Q-US-092", "N. Patel", "RS9 complete", "$5,899", "$4,080", "30.8%", "Expired", "Jun 05", "Requote"]
      ],
      detail: [["Margin guardrail", "28% minimum"], ["Price book", "Q3 NA"], ["Reserve tie", "Optional"], ["Approval", "Required below target"]],
      alerts: [["warn", "Customer quote expiry", "Seven customer quotes expire within 72 hours."], ["warn", "Approval needed", "Q-CA-088 uses launch promo discount."]]
    },
    orders: {
      kicker: "Fulfillment",
      title: "Dealer Orders",
      topbar: "Purchase orders and fulfillment",
      description: "Track dealer purchase orders, deposits, warehouse pick, shipment status and customer delivery promises.",
      primaryAction: "Create dealer order",
      sideCopy: "Dealer order screens need immediate visibility into what is paid, picked, shipped and blocked.",
      statuses: ["All status", "Deposit hold", "Picking", "Ready to ship", "Delivered"],
      summary: [["Open orders", "23", "$412K value"], ["Deposit holds", "2", "Release blocked"], ["Ready to ship", "6", "Carrier needed"], ["Delivered", "41", "This month"]],
      columns: ["Dealer Order", "Customer / store", "Model", "Value", "Stage", "Payment", "Ship ETA", "Owner", "Next action"],
      rows: [
        ["PO-US-771", "Seattle Performance", "RT9 frameset", "$24,600", "Deposit hold", "Pending", "Blocked", "Finance", "Verify deposit"],
        ["PO-US-714", "Denver store", "RT9 complete", "$31,820", "Picking", "Paid", "Jun 13", "Ops", "Confirm pick"],
        ["PO-CA-026", "North Shore Cycling", "RS9 complete", "$9,870", "Ready to ship", "Paid", "Jun 12", "Logistics", "Book carrier"],
        ["PO-US-689", "Seattle store", "AD9 Force AXS", "$18,940", "Delivered", "Paid", "Closed", "Ops", "Archive"]
      ],
      detail: [["Fulfillment rule", "Payment before release"], ["Carrier SLA", "48h pickup"], ["Customer update", "Required at each stage"], ["Risk", "Deposit hold blocks pick"]],
      alerts: [["danger", "Payment hold", "PO-US-771 cannot move to fulfillment until deposit is verified."], ["warn", "Pickup needed", "PO-CA-026 is ready to ship."]]
    },
    demo: {
      kicker: "Store fleet",
      title: "Demo Fleet",
      topbar: "Demo fleet availability",
      description: "Manage test-ride bicycles, service readiness, booking calendar and store allocation.",
      primaryAction: "Add demo unit",
      sideCopy: "The dealer needs to know which bicycles can be booked today and which need service before a test ride.",
      statuses: ["All status", "Available", "Booked", "Service due", "Retired"],
      summary: [["Available", "11", "Across 3 stores"], ["Booked", "18", "This week"], ["Service due", "3", "Before next ride"], ["Utilization", "72%", "Last 14 days"]],
      columns: ["Demo ID", "Model", "Size", "Store", "Status", "Next booking", "Service item", "Mileage", "Owner"],
      rows: [
        ["D-RT9-04", "RT9 Astana Blue", "M", "Denver", "Booked", "Sat 10:00", "None", "318 mi", "Evan"],
        ["D-AD9-02", "AD9 Force AXS", "M", "Seattle", "Available", "Open", "Firmware check", "244 mi", "Mia"],
        ["D-RS9-01", "RS9 complete", "S", "Toronto", "Service due", "Blocked", "Brake check", "392 mi", "Noah"],
        ["D-RT9-07", "RT9 frameset", "L", "Seattle", "Available", "Fri 16:00", "None", "126 mi", "Mia"]
      ],
      detail: [["Booking rule", "30 minute buffer"], ["Service threshold", "300 mi check"], ["Customer waiver", "Required"], ["Sales link", "Attach to lead"]],
      alerts: [["warn", "Service due", "D-RS9-01 is blocked until brake check is complete."]]
    },
    warranty: {
      kicker: "Service",
      title: "Warranty Claims",
      topbar: "Claims, evidence and SLA",
      description: "Review warranty claims, evidence, technical review, parts decision and customer update status.",
      primaryAction: "Create warranty claim",
      sideCopy: "Warranty claim screens must make evidence and SLA status obvious, otherwise service teams lose time.",
      statuses: ["All status", "Evidence missing", "Technical review", "Parts decision", "Closed"],
      summary: [["Open claims", "13", "5 SLA risks"], ["Evidence missing", "3", "Photos or serial"], ["Parts decision", "4", "Pending"], ["Closed", "22", "This month"]],
      columns: ["Claim", "Customer", "Model", "Issue", "Evidence", "Stage", "SLA", "Owner", "Next action"],
      rows: [
        ["WTY-521", "H. Miller", "RT9", "Paint chip", "Missing serial", "Evidence missing", "At risk", "Service", "Request photos"],
        ["WTY-508", "A. Brooks", "AD9", "Hanger damage", "Complete", "Parts decision", "On track", "Service", "Approve hanger"],
        ["WTY-497", "J. Chen", "RS9", "Noise under load", "Complete", "Technical review", "On track", "Factory tech", "Update customer"],
        ["WTY-492", "N. Patel", "RT9", "Bar tape", "Complete", "Closed", "Closed", "Service", "Archive"]
      ],
      detail: [["Evidence required", "Frame, serial, failure close-up"], ["SLA", "2 business days"], ["Parts source", "Local first"], ["Customer update", "Every status change"]],
      alerts: [["danger", "Evidence missing", "WTY-521 needs serial number and close-up photos."], ["warn", "Parts decision", "Four claims wait for service parts approval."]]
    },
    parts: {
      kicker: "Service inventory",
      title: "Parts",
      topbar: "Service parts and backorder list",
      description: "Manage dealer service parts inventory, critical stock coverage, replenishment and warranty-linked backorders.",
      primaryAction: "Create parts PO",
      sideCopy: "Parts should behave like a real service inventory module: stock, reorder point, backorder and warranty link.",
      statuses: ["All status", "In stock", "Low stock", "Backorder", "Warranty hold"],
      summary: [["Coverage", "92%", "Critical parts in stock"], ["Backorders", "4", "2 warranty-linked"], ["Low stock", "6", "Below reorder point"], ["Next PO", "Jun 12", "Recommended"]],
      columns: ["Part", "Category", "Compatible models", "Store stock", "Reorder point", "Backorder", "Status", "Linked case", "Next action"],
      rows: [
        ["HGR-RT9", "Derailleur hanger", "RT9 / AD9", "18", "10", "0", "In stock", "-", "Maintain"],
        ["BRN-CPT-M", "Cockpit", "RT9", "3", "5", "2", "Low stock", "WTY-508", "Reorder"],
        ["BB-386", "Bottom bracket", "Road lineup", "7", "6", "0", "In stock", "-", "Maintain"],
        ["AXL-RD-12", "Rear axle", "RS9", "0", "4", "2", "Backorder", "WTY-521", "Escalate ETA"]
      ],
      detail: [["Reorder method", "Min / max"], ["Warranty priority", "Open claims first"], ["Critical category", "Hanger, axle, cockpit"], ["PO cadence", "Weekly"]],
      alerts: [["danger", "Backorder risk", "AXL-RD-12 has zero store stock and two open warranty needs."], ["warn", "Low stock", "BRN-CPT-M is below reorder point."]]
    },
    training: {
      kicker: "Enablement",
      title: "Training",
      topbar: "Course and certification list",
      description: "Assign staff courses, track certification and keep product knowledge current for online shoppers.",
      primaryAction: "Assign course",
      sideCopy: "Training is operational: which rep is certified, which store is behind and what blocks sales readiness.",
      statuses: ["All status", "Not started", "In progress", "Certified", "Overdue"],
      summary: [["Certified reps", "18", "72% coverage"], ["Overdue", "2", "RT9 fit course"], ["In progress", "6", "This week"], ["Store gaps", "1", "Toronto"]],
      columns: ["Course", "Audience", "Store", "Assigned", "Completion", "Status", "Due", "Owner", "Next action"],
      rows: [
        ["RT9 fit and geometry", "Sales reps", "Denver", "4", "50%", "Overdue", "Jun 09", "Store manager", "Remind reps"],
        ["Branta cockpit service", "Service techs", "Seattle", "3", "67%", "In progress", "Jun 14", "Service lead", "Complete course"],
        ["Online purchase handoff", "Sales reps", "All stores", "12", "100%", "Certified", "Jun 01", "Sales ops", "Maintain"],
        ["Warranty evidence rules", "Service techs", "Toronto", "2", "0%", "Not started", "Jun 16", "Service lead", "Assign"]
      ],
      detail: [["Certification rule", "Required before launch"], ["Refresh cycle", "Quarterly"], ["Manager view", "By store"], ["Sales impact", "Quote confidence"]],
      alerts: [["warn", "Course overdue", "Two Denver reps have not completed RT9 fit and geometry."]]
    },
    assets: {
      kicker: "Enablement",
      title: "Dealer Sales Assets",
      topbar: "Approved dealer asset library",
      description: "Download product images, spec sheets, comparison cards, launch materials and store campaign files.",
      primaryAction: "Upload asset",
      sideCopy: "Dealer teams need approved files that can be used in quotes, email, store displays and local web pages.",
      statuses: ["All status", "Ready", "Review", "Expired", "Localized"],
      summary: [["Ready files", "31", "Approved for dealer use"], ["Review", "3", "Pending brand check"], ["Localized", "8", "US / Canada"], ["Downloads", "126", "This month"]],
      columns: ["Asset", "Model", "Use", "Format", "Locale", "Updated", "Status", "Owner", "Action"],
      rows: [
        ["RT9 image pack", "RT9", "Website, quote, email", "ZIP", "NA", "Jun 06", "Ready", "Brand", "Download"],
        ["Geometry sheet", "RT9 / AD9", "Fit consult", "PDF", "NA", "Jun 05", "Ready", "Product", "Download"],
        ["Astana Blue launch kit", "RT9", "Store campaign", "ZIP", "US", "Jun 03", "Review", "Brand", "Review"],
        ["Road comparison card", "Road lineup", "Sales floor", "PDF", "CA", "May 31", "Localized", "Sales ops", "Download"]
      ],
      detail: [["Approval", "Brand approved only"], ["Usage", "Quote, local web, email"], ["Localization", "US / Canada"], ["Expiry", "Promo files need date check"]],
      alerts: [["warn", "Review pending", "Astana Blue launch kit needs final brand approval."]]
    },
    programs: {
      kicker: "Commercial policy",
      title: "Pricing & Programs",
      topbar: "Dealer pricing and program terms",
      description: "Review MSRP books, dealer cost, promo programs, demo fleet terms and discount guardrails.",
      primaryAction: "Request approval",
      sideCopy: "This is the commercial control center: prices, programs, eligibility and margin rules.",
      statuses: ["All status", "Active", "Approval needed", "Ending soon", "Expired"],
      summary: [["Active programs", "6", "Q3 NA"], ["Ending soon", "2", "Within 14 days"], ["Approvals", "3", "Discount requests"], ["Avg margin", "31.8%", "On target"]],
      columns: ["Program", "Applies to", "Dealer rule", "MSRP impact", "Start", "End", "Status", "Owner", "Next action"],
      rows: [
        ["Q3 NA MSRP book", "All road models", "Standard dealer tier", "Baseline", "Jun 01", "Sep 30", "Active", "Sales ops", "Use"],
        ["RT9 launch promo", "RT9 complete", "Manager approval", "-5% max", "Jun 06", "Jun 30", "Approval needed", "Sales ops", "Approve"],
        ["Demo fleet terms", "Demo Fleet", "Store allocation", "Net 60", "May 15", "Jul 15", "Active", "Finance", "Review"],
        ["Staff purchase", "Dealer staff", "One unit per year", "-15%", "Apr 01", "Jun 20", "Ending soon", "Finance", "Renew"]
      ],
      detail: [["Guardrail", "Do not drop below 28% margin"], ["Approval", "Required for promo stack"], ["Currency", "USD / CAD"], ["Audit", "Every quote logs price source"]],
      alerts: [["warn", "Program ending", "Staff purchase window ends Jun 20."], ["warn", "Approval queue", "Three promo discount requests need manager approval."]]
    },
    messages: {
      kicker: "Notifications",
      title: "Messages",
      topbar: "Alerts and account updates",
      description: "View operational notices, customer lead SLA alerts, allocation updates, warranty claim reminders and account messages.",
      primaryAction: "Create message",
      sideCopy: "Messages need a list view, not a loose notice feed, so dealers can filter and close operational alerts.",
      statuses: ["All status", "Unread", "Action required", "Read", "Archived"],
      summary: [["Unread", "7", "2 action required"], ["Customer Lead SLA", "3", "Over 2 hours"], ["Allocation", "1", "Lock date"], ["Archived", "24", "This month"]],
      columns: ["Message", "Category", "Priority", "Status", "Related record", "Received", "Owner", "Action"],
      rows: [
        ["Three customer leads over SLA", "Customer Lead SLA", "High", "Action required", "Customer Leads", "09:42", "Sales", "Open customer leads"],
        ["RT9 size split closes Jun 18", "Allocation", "Medium", "Unread", "Inventory", "08:20", "Sales ops", "Review"],
        ["Warranty claim evidence rule updated", "Warranty Claims", "Medium", "Read", "WTY-521", "Yesterday", "Service", "Review"],
        ["Q3 MSRP book published", "Program", "Low", "Archived", "Programs", "Jun 06", "Sales ops", "View"]
      ],
      detail: [["Notification types", "SLA, allocation, warranty claims, pricing"], ["Action tracking", "Required"], ["Badge rule", "Unread count"], ["Archive", "Manual"]],
      alerts: [["danger", "Action required", "Customer lead SLA alert has three records waiting for reply."]]
    },
    "user-center": {
      kicker: "Account",
      title: "User Center",
      topbar: "Profile, role and access",
      description: "Manage dealer account identity, role scope, notification preferences and security settings.",
      primaryAction: "Save changes",
      sideCopy: "Account center should expose who is logged in, what they can access and how alerts are delivered.",
      statuses: ["All status", "Active", "Pending", "Disabled"],
      summary: [["Account", sessionStorage.getItem("xlabB2BEmail") || "dealer@x-lab.global", "North America"], ["Role", "Agent / Dealer", "Price and order access"], ["MFA", "Enabled", "Recommended"], ["Notifications", "7", "Unread"]],
      columns: ["Setting", "Scope", "Value", "Status", "Owner", "Last updated", "Next action"],
      rows: [
        ["Business profile", "Account", sessionStorage.getItem("xlabB2BEmail") || "dealer@x-lab.global", "Active", "Dealer admin", "Today", "Review"],
        ["Role access", "Permissions", "Agent / Dealer", "Active", "X-LAB ops", "Jun 06", "Request change"],
        ["Customer lead alerts", "Notifications", "Email and badge", "Active", "Dealer admin", "Today", "Edit"],
        ["Discount approval", "Controls", "Manager approval required", "Active", "Store manager", "Jun 05", "Review"]
      ],
      detail: [["Market", "North America"], ["Default store", "All locations"], ["Data access", "Dealer records only"], ["Logout", "Account menu"]],
      alerts: [["warn", "Access policy", "Discounts below target margin require manager approval."]]
    }
  };

  const moduleData = moduleCatalog[moduleKey] || moduleCatalog.leads;
  document.querySelectorAll("[data-module-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.moduleLink === moduleKey);
  });
  const title = `${moduleData.title} | X-LAB Dealer Operations`;
  document.title = title;
  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };
  setText("#moduleTopbarTitle", moduleData.topbar);
  setText("#moduleKicker", moduleData.kicker);
  setText("#moduleTitle", moduleData.title);
  setText("#moduleDescription", moduleData.description);
  setText("#moduleSideKicker", moduleData.kicker);
  setText("#moduleSideTitle", moduleData.title);
  setText("#moduleSideCopy", moduleData.sideCopy);
  setText("#modulePrimaryAction", moduleData.primaryAction);
  setText("#moduleTableKicker", moduleData.kicker);
  setText("#moduleTableTitle", `${moduleData.title} list`);
  const globalSearch = document.querySelector("#moduleGlobalSearch");
  if (globalSearch) globalSearch.placeholder = `Search ${moduleData.title.toLowerCase()}`;
  const tableSearch = document.querySelector("#moduleTableSearch");
  if (tableSearch) tableSearch.placeholder = `Search ${moduleData.title.toLowerCase()} by ID, customer, model`;
  const statusFilter = document.querySelector("#moduleStatusFilter");
  const storeFilter = document.querySelector("#moduleStoreFilter");
  const ownerFilter = document.querySelector("#moduleOwnerFilter");
  const resetFilters = document.querySelector("#moduleResetFilters");
  const resultCount = document.querySelector("#moduleResultCount");
  const pageInfo = document.querySelector("#modulePageInfo");
  const prevPage = document.querySelector("#modulePrevPage");
  const nextPage = document.querySelector("#moduleNextPage");
  const drawer = document.querySelector("#moduleDetailDrawer");
  const drawerBackdrop = document.querySelector("#moduleDrawerBackdrop");
  const closeDrawer = document.querySelector("#moduleCloseDrawer");
  const detailTitle = document.querySelector("#detailTitle");
  const detailMetrics = document.querySelector("#detailMetrics");
  const detailAlerts = document.querySelector("#detailAlerts");
  const pageSize = moduleKey === "leads" ? 10 : 8;
  const statusIndex = moduleData.columns.findIndex((column) => /status|stage/i.test(column));
  const storeIndex = moduleData.columns.findIndex((column) => /store|warehouse|location/i.test(column));
  const ownerIndex = moduleData.columns.findIndex((column) => /owner/i.test(column));
  let currentPage = 1;
  const optionList = (label, values) => {
    const unique = [...new Set(values.filter(Boolean))].sort();
    return [`<option value="">${label}</option>`, ...unique.map((value) => `<option value="${value}">${value}</option>`)].join("");
  };
  if (statusFilter) statusFilter.innerHTML = moduleData.statuses.map((status, index) => `<option value="${index === 0 ? "" : status}">${status}</option>`).join("");
  if (storeFilter) {
    storeFilter.closest(".field").hidden = storeIndex < 0;
    storeFilter.innerHTML = storeIndex >= 0 ? optionList("All locations", moduleData.rows.map((row) => row[storeIndex])) : "";
  }
  if (ownerFilter) {
    ownerFilter.closest(".field").hidden = ownerIndex < 0;
    ownerFilter.innerHTML = ownerIndex >= 0 ? optionList("All owners", moduleData.rows.map((row) => row[ownerIndex])) : "";
  }
  const summary = document.querySelector("#moduleSummary");
  if (summary) {
    summary.innerHTML = moduleData.summary.map(([label, value, note], index) => `
      <article class="dash-card kpi-card ${index === 3 ? "danger" : ""}">
        <span class="num">${label}</span>
        <strong>${value}</strong>
        <p>${note}</p>
      </article>
    `).join("");
  }
  const thead = moduleTable.querySelector("thead");
  const tbody = moduleTable.querySelector("tbody");
  if (thead) thead.innerHTML = `<tr>${moduleData.columns.map((column) => `<th>${column}</th>`).join("")}<th>Detail</th></tr>`;
  const pillClassFor = (cell) => /overdue|hold|missing|low stock|backorder|approval|risk|high|action required|unassigned/i.test(cell) ? "high" : /review|pending|incoming|reserved|medium|booked|service due|in progress|ending soon|unread|assigned/i.test(cell) ? "med" : /ready|available|active|certified|closed|delivered|in stock|paid|complete|contacted/i.test(cell) ? "low" : "";
  const filteredRows = () => {
    const query = `${tableSearch?.value || globalSearch?.value || ""}`.trim().toLowerCase();
    return moduleData.rows.filter((row) => {
      if (statusFilter?.value && statusIndex >= 0 && row[statusIndex] !== statusFilter.value) return false;
      if (storeFilter?.value && storeIndex >= 0 && row[storeIndex] !== storeFilter.value) return false;
      if (ownerFilter?.value && ownerIndex >= 0 && row[ownerIndex] !== ownerFilter.value) return false;
      if (query && !row.join(" ").toLowerCase().includes(query)) return false;
      return true;
    });
  };
  const openDetail = (row) => {
    if (!drawer || !detailTitle || !detailMetrics || !detailAlerts) return;
    detailTitle.textContent = `${row[0]} - ${row[1]}`;
    detailMetrics.innerHTML = moduleData.columns.slice(2).map((label, index) => {
      const value = row[index + 2] || "-";
      return `<div><span>${label}</span><strong>${value}</strong><small>${moduleData.title}</small></div>`;
    }).join("");
    const alerts = statusIndex >= 0 && row[statusIndex] === "Overdue"
      ? [["danger", "SLA overdue", `${row[0]} has been waiting ${row[6] || "past target"}. Assign or contact the customer now.`]]
      : ownerIndex >= 0 && row[ownerIndex] === "Unassigned"
        ? [["warn", "Owner missing", "Assign a store owner before the lead can move to quote."]]
        : moduleData.alerts.slice(0, 1);
    detailAlerts.innerHTML = alerts.map(([type, label, message]) => `<div class="alert ${type}"><strong>${label}</strong><span>${message}</span></div>`).join("");
    drawer.removeAttribute("aria-hidden");
    drawer.classList.add("open");
    if (drawerBackdrop) drawerBackdrop.hidden = false;
  };
  const closeDetail = () => {
    drawer?.classList.remove("open");
    drawer?.setAttribute("aria-hidden", "true");
    if (drawerBackdrop) drawerBackdrop.hidden = true;
  };
  const renderTable = () => {
    const rows = filteredRows();
    const pages = Math.max(1, Math.ceil(rows.length / pageSize));
    currentPage = Math.min(currentPage, pages);
    const start = (currentPage - 1) * pageSize;
    const pageRows = rows.slice(start, start + pageSize);
    if (resultCount) resultCount.textContent = `${rows.length} ${moduleData.title.toLowerCase()} found`;
    if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${pages} - Showing ${pageRows.length} of ${rows.length}`;
    if (prevPage) prevPage.disabled = currentPage <= 1;
    if (nextPage) nextPage.disabled = currentPage >= pages;
    if (!tbody) return;
    tbody.innerHTML = pageRows.map((row, rowIndex) => `
      <tr data-row-index="${start + rowIndex}">
        ${row.map((cell) => {
          const pillClass = pillClassFor(cell);
          return pillClass ? `<td><span class="status-pill ${pillClass}">${cell}</span></td>` : `<td>${cell}</td>`;
        }).join("")}
        <td><button class="mini-link row-detail" type="button">Open</button></td>
      </tr>
    `).join("");
    tbody.querySelectorAll("tr").forEach((tr) => {
      tr.addEventListener("click", () => openDetail(rows[Number(tr.dataset.rowIndex) - start]));
    });
  };
  [tableSearch, globalSearch, statusFilter, storeFilter, ownerFilter].forEach((control) => {
    control?.addEventListener("input", () => {
      currentPage = 1;
      renderTable();
    });
  });
  resetFilters?.addEventListener("click", () => {
    if (tableSearch) tableSearch.value = "";
    if (globalSearch) globalSearch.value = "";
    if (statusFilter) statusFilter.value = "";
    if (storeFilter) storeFilter.value = "";
    if (ownerFilter) ownerFilter.value = "";
    currentPage = 1;
    renderTable();
  });
  prevPage?.addEventListener("click", () => {
    currentPage = Math.max(1, currentPage - 1);
    renderTable();
  });
  nextPage?.addEventListener("click", () => {
    currentPage += 1;
    renderTable();
  });
  closeDrawer?.addEventListener("click", closeDetail);
  drawerBackdrop?.addEventListener("click", closeDetail);
  document.querySelector("#moduleExport")?.addEventListener("click", () => {
    const rows = filteredRows();
    if (resultCount) resultCount.textContent = `${rows.length} ${moduleData.title.toLowerCase()} ready to export`;
  });
  document.querySelector("#modulePrimaryAction")?.addEventListener("click", () => {
    if (resultCount) resultCount.textContent = `${moduleData.primaryAction} started`;
  });
  renderTable();
}

const previewPane = document.querySelector("#previewPane");

if (previewPane) {
  const sceneData = {
    race: {
      bike: "ad9",
      model: "AD9 Aero Road",
      scene: "Race Day",
      photo: "assets/bike-ad9-aero.png",
      platform: "Stock aero race mold",
      mold: "AD9 aero carbon frameset",
      kit: "Integrated cockpit, carbon wheels, race drivetrain",
      fitBase: "M / 545 stack"
    },
    climb: {
      bike: "rt9",
      model: "RT9 Lightweight",
      scene: "Climbing",
      photo: "assets/bike-rt9-lightweight.png",
      platform: "Stock lightweight climbing mold",
      mold: "RT9 lightweight carbon frameset",
      kit: "Compact cockpit, shallow carbon wheels, climbing drivetrain",
      fitBase: "M / 538 stack"
    },
    endurance: {
      bike: "gt",
      model: "GT All-Road",
      scene: "Endurance",
      photo: "assets/bike-gt-allroad.png",
      platform: "Stock all-road endurance mold",
      mold: "GT all-road carbon frameset",
      kit: "Flared cockpit, tubeless wheels, endurance drivetrain",
      fitBase: "M / 568 stack"
    },
    dealer: {
      bike: "cm",
      model: "CM Urban Alloy",
      scene: "Dealer Demo",
      photo: "assets/bike-cm-urban.png",
      platform: "Stock urban demo mold",
      mold: "CM urban alloy frameset",
      kit: "Serviceable cockpit, alloy demo wheels, city drivetrain",
      fitBase: "M / 560 stack"
    }
  };

  const modelBadge = document.querySelector("#modelBadge");
  const sceneReadout = document.querySelector("#sceneReadout");
  const platformReadout = document.querySelector("#platformReadout");
  const fitReadout = document.querySelector("#fitReadout");
  const stockMold = document.querySelector("#stockMold");
  const stockKit = document.querySelector("#stockKit");
  const bikePhoto = document.querySelector("#bikePhoto");
  const height = document.querySelector("#riderHeight");
  const inseam = document.querySelector("#inseam");
  const heightValue = document.querySelector("#heightValue");
  const inseamValue = document.querySelector("#inseamValue");
  const reachPref = document.querySelector("#reachPref");
  const bodyColors = document.querySelectorAll("input[name='bodyColor']");
  const accentColor = document.querySelector("#accentColor");
  const accentZone = document.querySelector("#accentZone");

  function sizeFromHeight(value) {
    if (value < 166) return "XS";
    if (value < 174) return "S";
    if (value < 182) return "M";
    if (value < 190) return "L";
    return "XL";
  }

  function currentScene() {
    return document.querySelector("input[name='scene']:checked")?.value || "race";
  }

  function syncCustomBike() {
    const data = sceneData[currentScene()];
    const riderHeight = Number(height?.value || 176);
    const riderInseam = Number(inseam?.value || 82);
    const stackAdjust = Math.round((riderInseam - 82) * 2.2);
    const baseStack = Number(data.fitBase.match(/\d+/)?.[0] || 545);
    const fitLabel = `${sizeFromHeight(riderHeight)} / ${baseStack + stackAdjust} stack / ${reachPref?.value || "balanced"}`;
    const selectedBody = document.querySelector("input[name='bodyColor']:checked")?.value || "#d91f2d";
    const accent = accentColor?.value || "#53c7df";

    previewPane.dataset.scene = currentScene();
    previewPane.dataset.bike = data.bike;
    previewPane.style.setProperty("--body-color", selectedBody);
    previewPane.style.setProperty("--accent-color", accent);
    previewPane.dataset.accentZone = accentZone?.value || "top";

    if (modelBadge) modelBadge.textContent = data.model;
    if (bikePhoto) bikePhoto.src = data.photo;
    if (bikePhoto) bikePhoto.alt = `${data.model} configured bike preview`;
    if (sceneReadout) sceneReadout.textContent = data.scene;
    if (platformReadout) platformReadout.textContent = data.platform;
    if (fitReadout) fitReadout.textContent = fitLabel;
    if (stockMold) stockMold.textContent = data.mold;
    if (stockKit) stockKit.textContent = data.kit;
    if (heightValue) heightValue.textContent = `${riderHeight} cm`;
    if (inseamValue) inseamValue.textContent = `${riderInseam} cm`;
  }

  document.querySelectorAll(".config-form input, .config-form select").forEach((control) => {
    control.addEventListener("input", syncCustomBike);
    control.addEventListener("change", syncCustomBike);
  });

  bodyColors.forEach((control) => control.addEventListener("change", syncCustomBike));
  syncCustomBike();
}

const requirementsTable = document.querySelector("#requirementsTable");
const requirementsTableBody = document.querySelector("#requirementsTableBody");

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function linkChips(ids, type) {
  const values = Array.isArray(ids) ? ids : [];
  if (!values.length) return "";
  return `<span class="relation-list">${values.map((id) => {
    const href = type === "voc"
      ? `voc-list.html#${id}`
      : type === "issue"
        ? `issue-list.html#${id}`
        : type === "ia"
          ? `information-architecture.html#${id}`
          : `requirements-board.html#${id}`;
    return `<a class="record-link" href="${href}">${escapeHtml(id)}</a>`;
  }).join("")}</span>`;
}

function findVOCById(id) {
  return (window.xlabVOC || []).find((item) => item.id === id);
}

function vocDemandClass(item) {
  return item?.demandClass || (item?.sentiment === "Directive" ? "Boss requirement" : "Market VOC");
}

function requirementDemandClass(item) {
  const hasBossVOC = (item.vocIds || []).some((id) => vocDemandClass(findVOCById(id)) === "Boss requirement");
  return item.demandClass || (hasBossVOC ? "Boss requirement" : "VOC-derived");
}

function demandClassSortValue(value) {
  return value === "Boss requirement" ? "0 Boss requirement" : `1 ${value || ""}`;
}

function demandClassPill(value) {
  const isBoss = value === "Boss requirement";
  return `<span class="class-pill ${isBoss ? "boss" : "market"}">${escapeHtml(value)}</span>`;
}

if (requirementsTable && requirementsTableBody && Array.isArray(window.xlabRequirements)) {
  const reqSearch = document.querySelector("#reqSearch");
  const reqPriorityFilter = document.querySelector("#reqPriorityFilter");
  const reqModuleFilter = document.querySelector("#reqModuleFilter");
  const reqStatusFilter = document.querySelector("#reqStatusFilter");
  const reqResetFilters = document.querySelector("#reqResetFilters");
  const reqVisibleCount = document.querySelector("#reqVisibleCount");
  const reqStatTotal = document.querySelector("#reqStatTotal");
  const reqStatP0 = document.querySelector("#reqStatP0");
  const reqStatReady = document.querySelector("#reqStatReady");
  const reqStatValidation = document.querySelector("#reqStatValidation");
  let sortKey = "id";
  let sortDir = "asc";

  const priorityClass = { P0: "high", P1: "med", P2: "low" };
  const terminalStatus = new Set(["Ready", "Active", "Released"]);
  const mvpCoreIds = new Set(["FR-001","FR-004","FR-008","FR-009","FR-016","FR-017","FR-020","FR-026","FR-033","FR-034","FR-041","FR-042","FR-043","FR-044","FR-045","FR-046","FR-047","FR-048","FR-049","FR-050","FR-051"]);

  function fillRequirementOptions(select, values) {
    if (!select) return;
    [...new Set(values)].sort().forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  fillRequirementOptions(reqModuleFilter, window.xlabRequirements.map((item) => item.module));
  fillRequirementOptions(reqStatusFilter, window.xlabRequirements.map((item) => item.status));

  function deliveryMonth(item) {
    return item.deliveryMonth || String(item.plannedDate || "").slice(0, 7) || "Unplanned";
  }

  function deadlineDate(item) {
    if (item.deadlineDate) return item.deadlineDate;
    const match = String(item.plannedDate || "").match(/^(\d{4})-(\d{2})-\d{2}$/);
    if (!match) return "Unplanned";
    const year = Number(match[1]);
    const month = Number(match[2]);
    return new Date(Date.UTC(year, month, 0)).toISOString().slice(0, 10);
  }

  function mvpPhase(item) {
    if (item.mvpPhase) return item.mvpPhase;
    if (mvpCoreIds.has(item.id)) return "MVP Core";
    if (item.priority === "P0" || item.priority === "P1") return "MVP Extension";
    return "Phase 2";
  }

  function requirementText(item) {
    return [
      ...Object.values(item),
      requirementDemandClass(item),
      deliveryMonth(item),
      deadlineDate(item),
      mvpPhase(item),
      ...(item.vocIds || [])
    ].join(" ").toLowerCase();
  }

  function filteredRequirements() {
    const search = reqSearch?.value.trim().toLowerCase() || "";
    return window.xlabRequirements.filter((item) => {
      if (reqPriorityFilter?.value && item.priority !== reqPriorityFilter.value) return false;
      if (reqModuleFilter?.value && item.module !== reqModuleFilter.value) return false;
      if (reqStatusFilter?.value && item.status !== reqStatusFilter.value) return false;
      return !search || requirementText(item).includes(search);
    });
  }

  function sortRequirements(rows) {
    return [...rows].sort((a, b) => {
      const aValue = sortKey === "vocText" ? (a.vocIds || []).join(" ") : sortKey === "demandClass" ? demandClassSortValue(requirementDemandClass(a)) : sortKey === "deliveryMonth" ? deliveryMonth(a) : sortKey === "deadlineDate" ? deadlineDate(a) : sortKey === "mvpPhase" ? mvpPhase(a) : String(a[sortKey] || "");
      const bValue = sortKey === "vocText" ? (b.vocIds || []).join(" ") : sortKey === "demandClass" ? demandClassSortValue(requirementDemandClass(b)) : sortKey === "deliveryMonth" ? deliveryMonth(b) : sortKey === "deadlineDate" ? deadlineDate(b) : sortKey === "mvpPhase" ? mvpPhase(b) : String(b[sortKey] || "");
      const result = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: "base" });
      return sortDir === "asc" ? result : -result;
    });
  }

  function updateRequirementStats(rows) {
    const all = window.xlabRequirements;
    if (reqStatTotal) reqStatTotal.textContent = String(all.length);
    if (reqStatP0) reqStatP0.textContent = String(all.filter((item) => item.priority === "P0").length);
    if (reqStatReady) reqStatReady.textContent = String(all.filter((item) => terminalStatus.has(item.status)).length);
    if (reqStatValidation) reqStatValidation.textContent = String(all.filter((item) => !item.validation.toLowerCase().includes("verified")).length);
    if (reqVisibleCount) reqVisibleCount.textContent = `${rows.length} visible`;
  }

  function renderRequirements() {
    const rows = sortRequirements(filteredRequirements());
    updateRequirementStats(rows);
    requirementsTableBody.innerHTML = rows.map((item) => `
      <tr id="${escapeHtml(item.id)}">
        <td><a class="record-link" href="#${escapeHtml(item.id)}">${escapeHtml(item.id)}</a></td>
        <td><span class="status-pill ${priorityClass[item.priority] || "low"}">${item.priority}</span></td>
        <td>${demandClassPill(requirementDemandClass(item))}</td>
        <td>${escapeHtml(item.module)}</td>
        <td>${escapeHtml(item.requirement)}</td>
        <td>${linkChips(item.vocIds, "voc")}</td>
        <td>${escapeHtml(item.requestDate)}</td>
        <td>${escapeHtml(item.plannedDate)}</td>
        <td>${escapeHtml(deliveryMonth(item))}</td>
        <td>${escapeHtml(deadlineDate(item))}</td>
        <td><span class="phase-pill">${escapeHtml(mvpPhase(item))}</span></td>
        <td>${escapeHtml(item.status)}</td>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.scope)}</td>
        <td>${escapeHtml(item.acceptance)}</td>
        <td>${escapeHtml(item.validation)}</td>
        <td>${escapeHtml(item.files)}</td>
      </tr>
    `).join("");

    requirementsTable.querySelectorAll("th button[data-sort]").forEach((button) => {
      const active = button.dataset.sort === sortKey;
      button.dataset.active = active ? sortDir : "";
      button.setAttribute("aria-sort", active ? (sortDir === "asc" ? "ascending" : "descending") : "none");
    });
  }

  [reqSearch, reqPriorityFilter, reqModuleFilter, reqStatusFilter].forEach((control) => {
    if (control) control.addEventListener("input", renderRequirements);
    if (control) control.addEventListener("change", renderRequirements);
  });

  reqResetFilters?.addEventListener("click", () => {
    if (reqSearch) reqSearch.value = "";
    if (reqPriorityFilter) reqPriorityFilter.value = "";
    if (reqModuleFilter) reqModuleFilter.value = "";
    if (reqStatusFilter) reqStatusFilter.value = "";
    sortKey = "id";
    sortDir = "asc";
    renderRequirements();
  });

  requirementsTable.querySelectorAll("th button[data-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextKey = button.dataset.sort || "id";
      sortDir = sortKey === nextKey && sortDir === "asc" ? "desc" : "asc";
      sortKey = nextKey;
      renderRequirements();
    });
  });

  renderRequirements();
}

const vocTable = document.querySelector("#vocTable");
const vocTableBody = document.querySelector("#vocTableBody");

if (vocTable && vocTableBody && Array.isArray(window.xlabVOC)) {
  const vocSearch = document.querySelector("#vocSearch");
  const vocCategoryFilter = document.querySelector("#vocCategoryFilter");
  const vocSeverityFilter = document.querySelector("#vocSeverityFilter");
  const vocStatusFilter = document.querySelector("#vocStatusFilter");
  const vocResetFilters = document.querySelector("#vocResetFilters");
  const vocVisibleCount = document.querySelector("#vocVisibleCount");
  const vocStatTotal = document.querySelector("#vocStatTotal");
  const vocStatPass = document.querySelector("#vocStatPass");
  const vocStatAverage = document.querySelector("#vocStatAverage");
  const vocStatHold = document.querySelector("#vocStatHold");
  let vocSortKey = "id";
  let vocSortDir = "asc";

  function fillVocOptions(select, values) {
    if (!select) return;
    [...new Set(values)].sort().forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  fillVocOptions(vocCategoryFilter, window.xlabVOC.map((item) => item.category));
  fillVocOptions(vocSeverityFilter, window.xlabVOC.map((item) => item.severity));
  fillVocOptions(vocStatusFilter, window.xlabVOC.map((item) => item.status));

  function vocText(item) {
    return [
      ...Object.values(item),
      vocDemandClass(item),
      ...(item.linkedRequirements || []),
      item.review?.gate,
      item.review?.decision,
      ...(window.xlabVOCReviewDimensions || []).map((dimension) => `${dimension.label} ${item.review?.dimensions?.[dimension.key]}`)
    ].join(" ").toLowerCase();
  }

  function filteredVOC() {
    const search = vocSearch?.value.trim().toLowerCase() || "";
    return window.xlabVOC.filter((item) => {
      if (vocCategoryFilter?.value && item.category !== vocCategoryFilter.value) return false;
      if (vocSeverityFilter?.value && item.severity !== vocSeverityFilter.value) return false;
      if (vocStatusFilter?.value && item.status !== vocStatusFilter.value) return false;
      return !search || vocText(item).includes(search);
    });
  }

  function sortVOC(rows) {
    return [...rows].sort((a, b) => {
      const aValue = vocSortKey === "reviewScore" ? Number(a.review?.score || 0) : vocSortKey === "reviewGate" ? String(a.review?.gate || "") : vocSortKey === "demandClass" ? demandClassSortValue(vocDemandClass(a)) : String(a[vocSortKey] || "");
      const bValue = vocSortKey === "reviewScore" ? Number(b.review?.score || 0) : vocSortKey === "reviewGate" ? String(b.review?.gate || "") : vocSortKey === "demandClass" ? demandClassSortValue(vocDemandClass(b)) : String(b[vocSortKey] || "");
      const result = typeof aValue === "number" && typeof bValue === "number"
        ? aValue - bValue
        : String(aValue).localeCompare(String(bValue), undefined, { numeric: true, sensitivity: "base" });
      return vocSortDir === "asc" ? result : -result;
    });
  }

  function updateVOCStats(rows) {
    const all = window.xlabVOC;
    if (vocStatTotal) vocStatTotal.textContent = String(all.length);
    if (vocStatPass) vocStatPass.textContent = String(all.filter((item) => item.review?.gate === "Pass").length);
    if (vocStatAverage) vocStatAverage.textContent = String(Math.round(all.reduce((sum, item) => sum + Number(item.review?.score || 0), 0) / all.length));
    if (vocStatHold) vocStatHold.textContent = String(all.filter((item) => item.review?.gate !== "Pass").length);
    if (vocVisibleCount) vocVisibleCount.textContent = `${rows.length} visible`;
  }

  function renderReviewDimensions(item) {
    return `<span class="score-breakdown">${(window.xlabVOCReviewDimensions || []).map((dimension) => {
      const value = item.review?.dimensions?.[dimension.key] ?? 0;
      return `<span>${escapeHtml(dimension.label)} <b>${value}/${dimension.weight}</b></span>`;
    }).join("")}</span>`;
  }

  function renderVOC() {
    const rows = sortVOC(filteredVOC());
    updateVOCStats(rows);
    vocTableBody.innerHTML = rows.map((item) => `
      <tr id="${escapeHtml(item.id)}">
        <td><a class="record-link" href="#${escapeHtml(item.id)}">${escapeHtml(item.id)}</a></td>
        <td>${demandClassPill(vocDemandClass(item))}</td>
        <td>${escapeHtml(item.category)}</td>
        <td>${escapeHtml(item.theme)}</td>
        <td>${escapeHtml(item.summary)}</td>
        <td>${escapeHtml(item.persona)}</td>
        <td>${escapeHtml(item.source)}</td>
        <td>${escapeHtml(item.observedDate)}</td>
        <td>${escapeHtml(item.severity)}</td>
        <td>${escapeHtml(item.confidence)}</td>
        <td><span class="score-pill ${item.review?.gate === "Pass" ? "pass" : "hold"}">${escapeHtml(item.review?.score || 0)}</span></td>
        <td><span class="score-pill ${item.review?.gate === "Pass" ? "pass" : "hold"}">${escapeHtml(item.review?.gate || "Hold")}</span><small class="gate-note">${escapeHtml(item.review?.decision || "")}</small></td>
        <td>${renderReviewDimensions(item)}</td>
        <td>${escapeHtml(item.status)}</td>
        <td>${linkChips(item.linkedRequirements, "requirement")}</td>
        <td>${escapeHtml(item.evidence)}</td>
      </tr>
    `).join("");

    vocTable.querySelectorAll("th button[data-sort]").forEach((button) => {
      const active = button.dataset.sort === vocSortKey;
      button.dataset.active = active ? vocSortDir : "";
      button.setAttribute("aria-sort", active ? (vocSortDir === "asc" ? "ascending" : "descending") : "none");
    });
  }

  [vocSearch, vocCategoryFilter, vocSeverityFilter, vocStatusFilter].forEach((control) => {
    if (control) control.addEventListener("input", renderVOC);
    if (control) control.addEventListener("change", renderVOC);
  });

  vocResetFilters?.addEventListener("click", () => {
    if (vocSearch) vocSearch.value = "";
    if (vocCategoryFilter) vocCategoryFilter.value = "";
    if (vocSeverityFilter) vocSeverityFilter.value = "";
    if (vocStatusFilter) vocStatusFilter.value = "";
    vocSortKey = "id";
    vocSortDir = "asc";
    renderVOC();
  });

  vocTable.querySelectorAll("th button[data-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextKey = button.dataset.sort || "id";
      vocSortDir = vocSortKey === nextKey && vocSortDir === "asc" ? "desc" : "asc";
      vocSortKey = nextKey;
      renderVOC();
    });
  });

  renderVOC();
}

const issueTable = document.querySelector("#issueTable");
const issueTableBody = document.querySelector("#issueTableBody");

if (issueTable && issueTableBody && Array.isArray(window.xlabIssues)) {
  const issueSearch = document.querySelector("#issueSearch");
  const issuePriorityFilter = document.querySelector("#issuePriorityFilter");
  const issueSeverityFilter = document.querySelector("#issueSeverityFilter");
  const issueStatusFilter = document.querySelector("#issueStatusFilter");
  const issueResetFilters = document.querySelector("#issueResetFilters");
  const issueVisibleCount = document.querySelector("#issueVisibleCount");
  const issueStatTotal = document.querySelector("#issueStatTotal");
  const issueStatOpen = document.querySelector("#issueStatOpen");
  const issueStatClosed = document.querySelector("#issueStatClosed");
  const issueStatHigh = document.querySelector("#issueStatHigh");
  let issueSortKey = "id";
  let issueSortDir = "asc";

  const issuePriorityClass = { P0: "high", P1: "med", P2: "low" };

  function fillIssueOptions(select, values) {
    if (!select) return;
    [...new Set(values)].sort().forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  fillIssueOptions(issueSeverityFilter, window.xlabIssues.map((item) => item.severity));
  fillIssueOptions(issueStatusFilter, window.xlabIssues.map((item) => item.status));

  function issueText(item) {
    return [
      ...Object.values(item),
      ...(item.relatedVOC || []),
      ...(item.relatedRequirements || [])
    ].join(" ").toLowerCase();
  }

  function filteredIssues() {
    const search = issueSearch?.value.trim().toLowerCase() || "";
    return window.xlabIssues.filter((item) => {
      if (issuePriorityFilter?.value && item.priority !== issuePriorityFilter.value) return false;
      if (issueSeverityFilter?.value && item.severity !== issueSeverityFilter.value) return false;
      if (issueStatusFilter?.value && item.status !== issueStatusFilter.value) return false;
      return !search || issueText(item).includes(search);
    });
  }

  function sortIssues(rows) {
    return [...rows].sort((a, b) => {
      const aValue = String(a[issueSortKey] || "");
      const bValue = String(b[issueSortKey] || "");
      const result = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: "base" });
      return issueSortDir === "asc" ? result : -result;
    });
  }

  function issueStatusPill(value) {
    const status = String(value || "");
    const statusClass = status === "Closed" ? "closed" : status === "Ready" ? "ready" : "open";
    return `<span class="issue-status ${statusClass}">${escapeHtml(status)}</span>`;
  }

  function updateIssueStats(rows) {
    const all = window.xlabIssues;
    if (issueStatTotal) issueStatTotal.textContent = String(all.length);
    if (issueStatOpen) issueStatOpen.textContent = String(all.filter((item) => item.status !== "Closed").length);
    if (issueStatClosed) issueStatClosed.textContent = String(all.filter((item) => item.status === "Closed").length);
    if (issueStatHigh) issueStatHigh.textContent = String(all.filter((item) => item.severity === "High").length);
    if (issueVisibleCount) issueVisibleCount.textContent = `${rows.length} visible`;
  }

  function renderIssues() {
    const rows = sortIssues(filteredIssues());
    updateIssueStats(rows);
    issueTableBody.innerHTML = rows.map((item) => `
      <tr id="${escapeHtml(item.id)}">
        <td><a class="record-link" href="#${escapeHtml(item.id)}">${escapeHtml(item.id)}</a></td>
        <td><span class="status-pill ${issuePriorityClass[item.priority] || "low"}">${escapeHtml(item.priority)}</span></td>
        <td>${escapeHtml(item.severity)}</td>
        <td>${escapeHtml(item.type)}</td>
        <td>${escapeHtml(item.title)}</td>
        <td>${escapeHtml(item.source)}</td>
        <td>${linkChips(item.relatedVOC, "voc")}</td>
        <td>${linkChips(item.relatedRequirements, "requirement")}</td>
        <td>${escapeHtml(item.reportedDate)}</td>
        <td>${escapeHtml(item.plannedDate)}</td>
        <td>${escapeHtml(item.owner)}</td>
        <td>${issueStatusPill(item.status)}</td>
        <td>${escapeHtml(item.rootCause)}</td>
        <td>${escapeHtml(item.resolution)}</td>
        <td>${escapeHtml(item.validation)}</td>
        <td>${escapeHtml(item.closedDate || "-")}</td>
        <td>${escapeHtml(item.files)}</td>
      </tr>
    `).join("");

    issueTable.querySelectorAll("th button[data-sort]").forEach((button) => {
      const active = button.dataset.sort === issueSortKey;
      button.dataset.active = active ? issueSortDir : "";
      button.setAttribute("aria-sort", active ? (issueSortDir === "asc" ? "ascending" : "descending") : "none");
    });
  }

  [issueSearch, issuePriorityFilter, issueSeverityFilter, issueStatusFilter].forEach((control) => {
    if (control) control.addEventListener("input", renderIssues);
    if (control) control.addEventListener("change", renderIssues);
  });

  issueResetFilters?.addEventListener("click", () => {
    if (issueSearch) issueSearch.value = "";
    if (issuePriorityFilter) issuePriorityFilter.value = "";
    if (issueSeverityFilter) issueSeverityFilter.value = "";
    if (issueStatusFilter) issueStatusFilter.value = "";
    issueSortKey = "id";
    issueSortDir = "asc";
    renderIssues();
  });

  issueTable.querySelectorAll("th button[data-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextKey = button.dataset.sort || "id";
      issueSortDir = issueSortKey === nextKey && issueSortDir === "asc" ? "desc" : "asc";
      issueSortKey = nextKey;
      renderIssues();
    });
  });

  renderIssues();
}

const snapshotTable = document.querySelector("#snapshotTable");
const snapshotTableBody = document.querySelector("#snapshotTableBody");

if (snapshotTable && snapshotTableBody && Array.isArray(window.xlabSnapshots)) {
  const snapshotSearch = document.querySelector("#snapshotSearch");
  const snapshotPageFilter = document.querySelector("#snapshotPageFilter");
  const snapshotStatusFilter = document.querySelector("#snapshotStatusFilter");
  const snapshotViewportFilter = document.querySelector("#snapshotViewportFilter");
  const snapshotResetFilters = document.querySelector("#snapshotResetFilters");
  const snapshotVisibleCount = document.querySelector("#snapshotVisibleCount");
  const snapshotStatTotal = document.querySelector("#snapshotStatTotal");
  const snapshotStatCaptured = document.querySelector("#snapshotStatCaptured");
  const snapshotStatPending = document.querySelector("#snapshotStatPending");
  const snapshotStatPages = document.querySelector("#snapshotStatPages");
  let snapshotSortKey = "capturedAt";
  let snapshotSortDir = "desc";

  function fillSnapshotOptions(select, values) {
    if (!select) return;
    [...new Set(values)].sort().forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  fillSnapshotOptions(snapshotPageFilter, window.xlabSnapshots.map((item) => item.page));
  fillSnapshotOptions(snapshotStatusFilter, window.xlabSnapshots.map((item) => item.status));
  fillSnapshotOptions(snapshotViewportFilter, window.xlabSnapshots.map((item) => item.viewport));

  function snapshotText(item) {
    return [
      ...Object.values(item),
      ...(item.relatedRequirements || []),
      ...(item.relatedIssues || [])
    ].join(" ").toLowerCase();
  }

  function filteredSnapshots() {
    const search = snapshotSearch?.value.trim().toLowerCase() || "";
    return window.xlabSnapshots.filter((item) => {
      if (snapshotPageFilter?.value && item.page !== snapshotPageFilter.value) return false;
      if (snapshotStatusFilter?.value && item.status !== snapshotStatusFilter.value) return false;
      if (snapshotViewportFilter?.value && item.viewport !== snapshotViewportFilter.value) return false;
      return !search || snapshotText(item).includes(search);
    });
  }

  function sortSnapshots(rows) {
    return [...rows].sort((a, b) => {
      const aValue = String(a[snapshotSortKey] || "");
      const bValue = String(b[snapshotSortKey] || "");
      const result = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: "base" });
      return snapshotSortDir === "asc" ? result : -result;
    });
  }

  function snapshotStatus(value) {
    const status = String(value || "");
    const statusClass = status === "Captured" ? "closed" : status === "Planned" ? "ready" : "open";
    return `<span class="issue-status ${statusClass}">${escapeHtml(status)}</span>`;
  }

  function updateSnapshotStats(rows) {
    const all = window.xlabSnapshots;
    if (snapshotStatTotal) snapshotStatTotal.textContent = String(all.length);
    if (snapshotStatCaptured) snapshotStatCaptured.textContent = String(all.filter((item) => item.status === "Captured").length);
    if (snapshotStatPending) snapshotStatPending.textContent = String(all.filter((item) => item.status !== "Captured").length);
    if (snapshotStatPages) snapshotStatPages.textContent = String(new Set(all.map((item) => item.page)).size);
    if (snapshotVisibleCount) snapshotVisibleCount.textContent = `${rows.length} visible`;
  }

  function imagePathLink(path) {
    const value = String(path || "");
    if (!value) return "-";
    return `<a class="record-link snapshot-path" href="${escapeHtml(value)}">${escapeHtml(value)}</a>`;
  }

  function renderSnapshots() {
    const rows = sortSnapshots(filteredSnapshots());
    updateSnapshotStats(rows);
    snapshotTableBody.innerHTML = rows.map((item) => `
      <tr id="${escapeHtml(item.id)}">
        <td><a class="record-link" href="#${escapeHtml(item.id)}">${escapeHtml(item.id)}</a></td>
        <td>${escapeHtml(item.page)}</td>
        <td>${escapeHtml(item.version)}</td>
        <td>${escapeHtml(item.capturedAt)}</td>
        <td>${escapeHtml(item.viewport)}</td>
        <td>${linkChips(item.relatedRequirements, "requirement")}</td>
        <td>${linkChips(item.relatedIssues, "issue")}</td>
        <td>${snapshotStatus(item.status)}</td>
        <td>${imagePathLink(item.imagePath)}</td>
        <td>${escapeHtml(item.changeSummary)}</td>
        <td>${escapeHtml(item.validation)}</td>
        <td>${escapeHtml(item.owner)}</td>
      </tr>
    `).join("");

    snapshotTable.querySelectorAll("th button[data-sort]").forEach((button) => {
      const active = button.dataset.sort === snapshotSortKey;
      button.dataset.active = active ? snapshotSortDir : "";
      button.setAttribute("aria-sort", active ? (snapshotSortDir === "asc" ? "ascending" : "descending") : "none");
    });
  }

  [snapshotSearch, snapshotPageFilter, snapshotStatusFilter, snapshotViewportFilter].forEach((control) => {
    if (control) control.addEventListener("input", renderSnapshots);
    if (control) control.addEventListener("change", renderSnapshots);
  });

  snapshotResetFilters?.addEventListener("click", () => {
    if (snapshotSearch) snapshotSearch.value = "";
    if (snapshotPageFilter) snapshotPageFilter.value = "";
    if (snapshotStatusFilter) snapshotStatusFilter.value = "";
    if (snapshotViewportFilter) snapshotViewportFilter.value = "";
    snapshotSortKey = "capturedAt";
    snapshotSortDir = "desc";
    renderSnapshots();
  });

  snapshotTable.querySelectorAll("th button[data-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextKey = button.dataset.sort || "capturedAt";
      snapshotSortDir = snapshotSortKey === nextKey && snapshotSortDir === "asc" ? "desc" : "asc";
      snapshotSortKey = nextKey;
      renderSnapshots();
    });
  });

  renderSnapshots();
}

const iaTable = document.querySelector("#iaTable");
const iaTableBody = document.querySelector("#iaTableBody");

if (iaTable && iaTableBody && Array.isArray(window.xlabInformationArchitecture)) {
  const iaSearch = document.querySelector("#iaSearch");
  const iaLevelFilter = document.querySelector("#iaLevelFilter");
  const iaOwnerFilter = document.querySelector("#iaOwnerFilter");
  const iaStatusFilter = document.querySelector("#iaStatusFilter");
  const iaResetFilters = document.querySelector("#iaResetFilters");
  const iaVisibleCount = document.querySelector("#iaVisibleCount");
  const iaStatNodes = document.querySelector("#iaStatNodes");
  const iaStatPages = document.querySelector("#iaStatPages");
  const iaStatReq = document.querySelector("#iaStatReq");
  const iaStatOpenIssues = document.querySelector("#iaStatOpenIssues");
  const iaTreeBody = document.querySelector("#iaTreeBody");
  let iaSortKey = "id";
  let iaSortDir = "asc";

  function fillIAOptions(select, values) {
    if (!select) return;
    [...new Set(values)].filter(Boolean).sort().forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  fillIAOptions(iaLevelFilter, window.xlabInformationArchitecture.map((item) => item.level));
  fillIAOptions(iaOwnerFilter, window.xlabInformationArchitecture.map((item) => item.owner));
  fillIAOptions(iaStatusFilter, window.xlabInformationArchitecture.map((item) => item.status));

  function iaPages(item) {
    return String(item.page || "").split(",").map((page) => page.trim()).filter(Boolean);
  }

  function uniqueIds(ids) {
    return [...new Set((ids || []).filter(Boolean))];
  }

  function iaRequirementIds(item) {
    const pages = iaPages(item);
    const direct = item.requirementIds || [];
    const matched = (window.xlabRequirements || [])
      .filter((req) => pages.some((page) => String(req.files || "").includes(page)))
      .map((req) => req.id);
    return uniqueIds([...direct, ...matched]);
  }

  function iaVOCIds(item) {
    const reqIds = new Set(iaRequirementIds(item));
    const direct = item.vocIds || [];
    const matched = (window.xlabVOC || [])
      .filter((voc) => (voc.linkedRequirements || []).some((id) => reqIds.has(id)))
      .map((voc) => voc.id);
    return uniqueIds([...direct, ...matched]);
  }

  function iaIssueIds(item) {
    const reqIds = new Set(iaRequirementIds(item));
    const vocIds = new Set(iaVOCIds(item));
    const direct = item.issueIds || [];
    const matched = (window.xlabIssues || [])
      .filter((issue) =>
        (issue.relatedRequirements || []).some((id) => reqIds.has(id)) ||
        (issue.relatedVOC || []).some((id) => vocIds.has(id)) ||
        iaPages(item).some((page) => String(issue.files || "").includes(page))
      )
      .map((issue) => issue.id);
    return uniqueIds([...direct, ...matched]);
  }

  function iaText(item) {
    return [
      ...Object.values(item),
      iaRequirementIds(item).join(" "),
      iaVOCIds(item).join(" "),
      iaIssueIds(item).join(" ")
    ].flat().join(" ").toLowerCase();
  }

  function filteredIA() {
    const search = iaSearch?.value.trim().toLowerCase() || "";
    return window.xlabInformationArchitecture.filter((item) => {
      if (iaLevelFilter?.value && item.level !== iaLevelFilter.value) return false;
      if (iaOwnerFilter?.value && item.owner !== iaOwnerFilter.value) return false;
      if (iaStatusFilter?.value && item.status !== iaStatusFilter.value) return false;
      return !search || iaText(item).includes(search);
    });
  }

  function iaSortValue(item, key) {
    if (key === "requirements") return iaRequirementIds(item).length;
    if (key === "voc") return iaVOCIds(item).length;
    if (key === "issues") return iaIssueIds(item).length;
    return String(item[key] || "");
  }

  function sortIA(rows) {
    return [...rows].sort((a, b) => {
      const aValue = iaSortValue(a, iaSortKey);
      const bValue = iaSortValue(b, iaSortKey);
      const result = typeof aValue === "number" && typeof bValue === "number"
        ? aValue - bValue
        : String(aValue).localeCompare(String(bValue), undefined, { numeric: true, sensitivity: "base" });
      return iaSortDir === "asc" ? result : -result;
    });
  }

  function updateIAStats(rows) {
    const all = window.xlabInformationArchitecture;
    const allReq = uniqueIds(all.flatMap((item) => iaRequirementIds(item)));
    const allIssues = uniqueIds(all.flatMap((item) => iaIssueIds(item)));
    const openIssueCount = allIssues
      .map((id) => (window.xlabIssues || []).find((issue) => issue.id === id))
      .filter((issue) => issue && issue.status !== "Closed").length;
    if (iaStatNodes) iaStatNodes.textContent = String(all.length);
    if (iaStatPages) iaStatPages.textContent = String(uniqueIds(all.flatMap((item) => iaPages(item))).length);
    if (iaStatReq) iaStatReq.textContent = String(allReq.length);
    if (iaStatOpenIssues) iaStatOpenIssues.textContent = String(openIssueCount);
    if (iaVisibleCount) iaVisibleCount.textContent = `${rows.length} visible`;
  }

  function renderIATree(rows) {
    if (!iaTreeBody) return;
    iaTreeBody.innerHTML = rows.map((item) => {
      const depth = item.level === "L0" ? 0 : 1;
      const marker = depth ? "└" : "●";
      return `<tr>
        <td><a class="record-link" href="#${escapeHtml(item.id)}">${escapeHtml(item.id)}</a></td>
        <td><span class="ia-tree-node depth-${depth}">${escapeHtml(marker)} ${escapeHtml(item.section)}</span></td>
        <td>${escapeHtml(item.parent || "Root / 根节点")}</td>
        <td>${escapeHtml(item.page)}</td>
      </tr>`;
    }).join("");
  }

  function renderIA() {
    const rows = sortIA(filteredIA());
    updateIAStats(rows);
    renderIATree(window.xlabInformationArchitecture);
    iaTableBody.innerHTML = rows.map((item) => {
      const reqIds = iaRequirementIds(item);
      const vocIds = iaVOCIds(item);
      const issueIds = iaIssueIds(item);
      return `
        <tr id="${escapeHtml(item.id)}">
          <td><a class="record-link" href="#${escapeHtml(item.id)}">${escapeHtml(item.id)}</a></td>
          <td>${escapeHtml(item.parent || "Root")}</td>
          <td>${escapeHtml(item.level)}</td>
          <td>${escapeHtml(item.section)}</td>
          <td>${escapeHtml(item.page)}</td>
          <td>${escapeHtml(item.route)}</td>
          <td>${escapeHtml(item.audience)}</td>
          <td>${escapeHtml(item.purpose)}</td>
          <td>${escapeHtml(item.owner)}</td>
          <td>${escapeHtml(item.status)}</td>
          <td>${escapeHtml(item.syncCadence)}</td>
          <td>${linkChips(reqIds, "requirement")}</td>
          <td>${linkChips(vocIds, "voc")}</td>
          <td>${linkChips(issueIds, "issue")}</td>
        </tr>
      `;
    }).join("");

    iaTable.querySelectorAll("th button[data-sort]").forEach((button) => {
      const active = button.dataset.sort === iaSortKey;
      button.dataset.active = active ? iaSortDir : "";
      button.setAttribute("aria-sort", active ? (iaSortDir === "asc" ? "ascending" : "descending") : "none");
    });
  }

  [iaSearch, iaLevelFilter, iaOwnerFilter, iaStatusFilter].forEach((control) => {
    if (control) control.addEventListener("input", renderIA);
    if (control) control.addEventListener("change", renderIA);
  });

  iaResetFilters?.addEventListener("click", () => {
    if (iaSearch) iaSearch.value = "";
    if (iaLevelFilter) iaLevelFilter.value = "";
    if (iaOwnerFilter) iaOwnerFilter.value = "";
    if (iaStatusFilter) iaStatusFilter.value = "";
    iaSortKey = "id";
    iaSortDir = "asc";
    renderIA();
  });

  iaTable.querySelectorAll("th button[data-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextKey = button.dataset.sort || "id";
      iaSortDir = iaSortKey === nextKey && iaSortDir === "asc" ? "desc" : "asc";
      iaSortKey = nextKey;
      renderIA();
    });
  });

  renderIA();
}
