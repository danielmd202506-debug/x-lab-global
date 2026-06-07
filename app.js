document.body.classList.add("js");

const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelector(".site-nav .nav-links");

if (siteNav && navLinks) {
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

if (sidebarToggle) {
  const storageKey = "xlabSidebarCollapsed";
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
  if (!roleTabs.length) return;
  roleTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.role === role));
  rolePanels.forEach((panel) => panel.classList.toggle("muted-panel", panel.dataset.panel !== role));
  const accountRole = document.querySelector("#accountRole");
  const accountName = document.querySelector("#accountName");
  if (accountRole) accountRole.textContent = role === "dealer" ? "Agent / dealer account" : "Supplier account";
  if (accountName) accountName.textContent = sessionStorage.getItem("xlabB2BEmail") || "X-LAB Partner";
}

if (roleTabs.length) {
  const params = new URLSearchParams(window.location.search);
  const storedRole = sessionStorage.getItem("xlabB2BRole");
  setDashboardRole(params.get("role") === "dealer" || storedRole === "dealer" ? "dealer" : "supplier");
  roleTabs.forEach((tab) => tab.addEventListener("click", () => setDashboardRole(tab.dataset.role)));
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
