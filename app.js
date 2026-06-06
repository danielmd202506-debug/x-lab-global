document.body.classList.add("js");

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
      platform: "Stock aero race mold",
      mold: "AD9 aero carbon frameset",
      kit: "Integrated cockpit, carbon wheels, race drivetrain",
      fitBase: "M / 545 stack"
    },
    climb: {
      bike: "rt9",
      model: "RT9 Lightweight",
      scene: "Climbing",
      platform: "Stock lightweight climbing mold",
      mold: "RT9 lightweight carbon frameset",
      kit: "Compact cockpit, shallow carbon wheels, climbing drivetrain",
      fitBase: "M / 538 stack"
    },
    endurance: {
      bike: "gt",
      model: "GT All-Road",
      scene: "Endurance",
      platform: "Stock all-road endurance mold",
      mold: "GT all-road carbon frameset",
      kit: "Flared cockpit, tubeless wheels, endurance drivetrain",
      fitBase: "M / 568 stack"
    },
    dealer: {
      bike: "cm",
      model: "CM Urban Alloy",
      scene: "Dealer Demo",
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
  const height = document.querySelector("#riderHeight");
  const inseam = document.querySelector("#inseam");
  const heightValue = document.querySelector("#heightValue");
  const inseamValue = document.querySelector("#inseamValue");
  const reachPref = document.querySelector("#reachPref");
  const bodyColors = document.querySelectorAll("input[name='bodyColor']");
  const accentColor = document.querySelector("#accentColor");
  const accentZone = document.querySelector("#accentZone");
  const lettering = document.querySelector("#lettering");
  const letteringPos = document.querySelector("#letteringPos");
  const decalPack = document.querySelector("#decalPack");
  const decalPos = document.querySelector("#decalPos");
  const decalTop = document.querySelector("#decalTop");
  const decalDown = document.querySelector("#decalDown");

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
    const customText = (lettering?.value || "X-LAB").trim().slice(0, 12).toUpperCase() || "X-LAB";

    previewPane.dataset.scene = currentScene();
    previewPane.dataset.bike = data.bike;
    previewPane.style.setProperty("--body-color", selectedBody);
    previewPane.style.setProperty("--accent-color", accent);
    previewPane.dataset.accentZone = accentZone?.value || "top";

    if (modelBadge) modelBadge.textContent = data.model;
    if (sceneReadout) sceneReadout.textContent = data.scene;
    if (platformReadout) platformReadout.textContent = data.platform;
    if (fitReadout) fitReadout.textContent = fitLabel;
    if (stockMold) stockMold.textContent = data.mold;
    if (stockKit) stockKit.textContent = data.kit;
    if (heightValue) heightValue.textContent = `${riderHeight} cm`;
    if (inseamValue) inseamValue.textContent = `${riderInseam} cm`;

    if (decalTop && decalDown) {
      decalTop.textContent = letteringPos?.value === "top" ? customText : decalPack?.value || "RACE";
      decalDown.textContent = letteringPos?.value === "down" ? customText : data.model.split(" ")[0];
      decalTop.style.opacity = decalPos?.value === "top" || letteringPos?.value === "top" ? "1" : ".42";
      decalDown.style.opacity = decalPos?.value === "down" || letteringPos?.value === "down" ? "1" : ".42";
    }
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
    const href = type === "voc" ? `voc-list.html#${id}` : `requirements-board.html#${id}`;
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

  function requirementText(item) {
    return [
      ...Object.values(item),
      requirementDemandClass(item),
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
      const aValue = sortKey === "vocText" ? (a.vocIds || []).join(" ") : sortKey === "demandClass" ? demandClassSortValue(requirementDemandClass(a)) : String(a[sortKey] || "");
      const bValue = sortKey === "vocText" ? (b.vocIds || []).join(" ") : sortKey === "demandClass" ? demandClassSortValue(requirementDemandClass(b)) : String(b[sortKey] || "");
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
