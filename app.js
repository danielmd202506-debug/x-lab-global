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
