/*
  main.js
  -------
  Runs on index.html. Fills in the hero from PROFILE, renders project
  cards and the grouped experience list from PROJECTS/EXPERIENCE, and
  handles small UI behavior (mobile nav toggle, footer date).
  All data lives in js/data.js.
*/

document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderProjectCards();
  renderExperience();
  renderCertificates();
  setupNavToggle();
  setBottomBar();
});

/* ---------- Hero / profile ---------- */
function renderProfile() {
  document.getElementById("brandName").textContent = `${firstName(PROFILE.name)}'s Portfolio`;
  document.getElementById("heroName").textContent = PROFILE.name;
  document.getElementById("heroRole").textContent = PROFILE.title;
  document.getElementById("heroSchool").textContent = PROFILE.school;
  document.getElementById("heroHeadline").textContent = PROFILE.headline;

  const bio = document.getElementById("heroBio");
  bio.innerHTML = "";
  [].concat(PROFILE.bio).forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    bio.appendChild(p);
  });

  document.getElementById("heroStats").innerHTML = (PROFILE.stats || [])
    .map(
      (s) => `<li class="stat-tile">
        <span class="stat-value">${s.value}${s.suffix ? `<small>${s.suffix}</small>` : ""}</span>
        <span class="stat-label">${s.label}</span>
      </li>`
    )
    .join("");
  document.getElementById("fallbackInitials").textContent = initialsOf(PROFILE.name);
  document.getElementById("cvLink").href = PROFILE.cvUrl;

  const linkedin = document.getElementById("linkedinLink");
  linkedin.href = PROFILE.linkedin;
  linkedin.textContent = PROFILE.linkedin.replace(/^https?:\/\//, "");

  const email = document.getElementById("emailLink");
  email.href = `mailto:${PROFILE.email}`;
  email.textContent = PROFILE.email;

  const phone = document.getElementById("phoneLink");
  phone.href = `tel:${PROFILE.phone.replace(/\s+/g, "")}`;
  phone.textContent = PROFILE.phone;
}

function firstName(fullName) {
  return fullName.split(" ")[0];
}

function initialsOf(fullName) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

/* ---------- Projects grid ---------- */
function renderProjectCards() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((project) => {
    return `
      <a class="project-card" href="project.html?id=${encodeURIComponent(project.id)}">
        <div class="project-thumb">${
          project.image
            ? `<img src="${project.image}" alt="${project.title} preview" loading="lazy" />`
            : initialsOf(project.title)
        }</div>
        <div class="project-card-body">
          <p class="eyebrow-sm">${project.eyebrow}</p>
          <h3>${project.title}</h3>
          <p class="desc">${project.tagline}</p>
          <div class="tag-row">
            ${project.tags.map((tag) => `<span class="tag-chip">${tag}</span>`).join("")}
          </div>
          <div class="card-footer">
            <span>View Project</span>
            <span class="plus-icon">+</span>
          </div>
        </div>
      </a>
    `;
  }).join("");
}

/* ---------- Experience, grouped by company ---------- */
function renderExperience() {
  const list = document.getElementById("experienceList");
  if (!list) return;

  list.innerHTML = EXPERIENCE.map((group) => {
    const roles = group.roles
      .map(
        (role) => `
          <div class="exp-role">
            <p class="eyebrow-sm">${role.eyebrow}</p>
            <h3>${role.title}</h3>
            <p class="exp-meta">${role.meta}</p>
            <p class="desc">${role.description}</p>
          </div>
        `
      )
      .join("");

    const iconHtml = group.logo
  ? `<span class="exp-icon">
       <img src="${group.logo}" alt="${group.company} logo"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
       <span class="exp-icon-fallback" style="display:none;">${group.initials}</span>
     </span>`
  : `<span class="exp-icon"><span class="exp-icon-fallback">${group.initials}</span></span>`;

return `
  <div class="exp-group">
    <div class="exp-company">
      ${iconHtml}
      <span class="exp-company-name">${group.company}</span>
    </div>
    <hr />
    ${roles}
  </div>
`;
  }).join("");
}

/* ---------- Achievements & certifications ---------- */
const CERT_FILTERS = [
  { key: "all", label: "All" },
  { key: "Award", label: "Awards" },
  { key: "Competition", label: "Competitions" },
  { key: "Training", label: "Training" },
  { key: "Organization", label: "Organization" },
];

function renderCertificates() {
  const grid = document.getElementById("certGrid");
  const filterBar = document.getElementById("certFilters");
  if (!grid || typeof CERTIFICATES === "undefined") return;

  const countOf = (key) =>
    key === "all" ? CERTIFICATES.length : CERTIFICATES.filter((c) => c.type === key).length;

  if (filterBar) {
    filterBar.innerHTML = CERT_FILTERS.filter((f) => countOf(f.key) > 0)
      .map(
        (f, i) => `
        <button type="button" class="filter-chip${i === 0 ? " active" : ""}" data-filter="${f.key}" aria-pressed="${i === 0}">
          ${f.label} <span>${countOf(f.key)}</span>
        </button>`
      )
      .join("");

    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest(".filter-chip");
      if (!button) return;
      filterBar.querySelectorAll(".filter-chip").forEach((chip) => {
        const isActive = chip === button;
        chip.classList.toggle("active", isActive);
        chip.setAttribute("aria-pressed", String(isActive));
      });
      drawCards(button.dataset.filter);
    });
  }

  function drawCards(filter) {
    const list = filter === "all" ? CERTIFICATES : CERTIFICATES.filter((c) => c.type === filter);
    grid.innerHTML = list
      .map(
        (cert) => `
      <a class="project-card cert-card" href="certificate.html?id=${encodeURIComponent(cert.id)}">
        <div class="cert-thumb">
          ${cert.image
            ? `<img src="${cert.image}" alt="${cert.title} certificate" loading="lazy" />`
            : `<div class="cert-pending"><span class="cert-pending-mark">★</span><span>Certificate coming soon</span></div>`}
          <span class="cert-type">${cert.type}</span>
        </div>
        <div class="project-card-body">
          <p class="eyebrow-sm">${cert.issuer} · ${cert.year}</p>
          <h3>${cert.title}</h3>
          <p class="desc">${cert.summary}</p>
          <div class="card-footer">
            <span>View Certificate</span>
            <span class="plus-icon">+</span>
          </div>
        </div>
      </a>`
      )
      .join("");
  }

  drawCards("all");
}

/* ---------- Mobile nav toggle ---------- */
function setupNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Bottom bar date ---------- */
function setBottomBar() {
  const el = document.getElementById("bottomBar");
  if (!el) return;
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  el.textContent = `${month} ${now.getFullYear()}`;
}
