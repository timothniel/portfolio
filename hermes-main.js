/*
  hermes-main.js
  --------------
  Runs on index.html. All content comes from data.js and is
  rendered with the Hermes-style markup.
*/

document.addEventListener("DOMContentLoaded", () => {
  renderAbout();
  renderTerminal();
  renderSkills();
  renderProjects();
  renderExperience();
  renderCertificates();
  renderContact();
  initCommon();
});

const esc = (s = "") =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pad = (n) => String(n).padStart(2, "0");

/* ---------- About ---------- */
function renderAbout() {
  document.getElementById("heroName").innerHTML = PROFILE.name
    .split(" ")
    .map((w) => `<span>${esc(w)}</span>`)
    .join("");

  document.getElementById("heroMeta").innerHTML = `
    <span>${px("teach")}<b>${esc(PROFILE.title)}</b></span>
    <span>${px("building")}${esc(PROFILE.school)}</span>`;
  document.getElementById("heroHeadline").textContent = PROFILE.headline;
  document.getElementById("cvLink").href = PROFILE.cvUrl;

  const bio = document.getElementById("heroBio");
  bio.innerHTML = [].concat(PROFILE.bio).map((t) => `<p>${esc(t)}</p>`).join("");

  document.getElementById("heroStats").innerHTML = (PROFILE.stats || [])
    .map(
      (s) => `<li class="hx-stat">
        <span class="hx-stat-value">${esc(s.value)}${s.suffix ? `<small>${esc(s.suffix)}</small>` : ""}</span>
        <span class="hx-label">${esc(s.label)}</span>
      </li>`
    )
    .join("");

}

/* ---------- Terminal with tabs (reads SKILLS) ---------- */
const TERM_TABS = [
  { key: "analyst", label: "Analyst", category: "Business & Systems Analysis" },
  { key: "data", label: "Data", category: "Data & Databases" },
  { key: "design", label: "Design", category: "Design & Development" },
  { key: "leadership", label: "Leadership", category: "Project Management & Leadership" },
];

function renderTerminal() {
  const tabs = document.getElementById("termTabs");
  const body = document.getElementById("termBody");
  document.getElementById("termEmail").textContent = PROFILE.email;

  tabs.innerHTML = TERM_TABS.map(
    (t, i) =>
      `<button type="button" class="hx-term-tab" role="tab" aria-selected="${i === 0}" data-key="${t.key}">${t.label}</button>`
  ).join("");

  let typing;
  const show = (key) => {
    const tab = TERM_TABS.find((t) => t.key === key);
    const group = SKILLS.find((g) => g.category === tab.category);
    const items = group ? group.items.slice(0, 5) : [];
    clearTimeout(typing);
    body.innerHTML = `<div class="hx-term-cmd"><span class="p">~ %</span> timothy --skills ${tab.key}<span class="hx-cursor"></span></div>`;
    const lines = items.map(
      (it) => `<div class="hx-term-line"><span class="k">&gt; ${esc(it.name)}</span><span>${levelBlocks(it.level)}</span></div>`
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      body.querySelector(".hx-cursor").remove();
      body.insertAdjacentHTML("beforeend", lines.join(""));
      return;
    }
    let i = 0;
    const step = () => {
      if (i === 0) body.querySelector(".hx-cursor")?.remove();
      body.insertAdjacentHTML("beforeend", lines[i]);
      i += 1;
      if (i < lines.length) typing = setTimeout(step, 90);
    };
    typing = setTimeout(step, 260);
  };

  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".hx-term-tab");
    if (!btn) return;
    tabs.querySelectorAll(".hx-term-tab").forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
    show(btn.dataset.key);
  });
  show(TERM_TABS[0].key);

  const copy = document.getElementById("copyEmail");
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      copy.innerHTML = px("check");
      setTimeout(() => (copy.innerHTML = px("copy")), 1600);
    } catch (err) {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  });
}

/* ---------- Skills ---------- */
const SKILL_ICONS = {
  "Business & Systems Analysis": "chart",
  "Data & Databases": "server",
  "ERP & Enterprise Systems": "building",
  "Design & Development": "layout",
  "Project Management & Leadership": "kanban",
  "Soft Skills & Languages": "message",
};

function renderSkills() {
  if (typeof SKILLS === "undefined") return;
  if (typeof SKILL_SCALE !== "undefined") {
    document.getElementById("skillScale").innerHTML = SKILL_SCALE.map(
      (s) => `<div>${levelBlocks(s.level, false)}<span>${s.level}/5 ${esc(s.label)} <em>— ${esc(s.meaning)}</em></span></div>`
    ).join("");
  }
  document.getElementById("skillGrid").innerHTML = SKILLS.map(
    (g, i) => `
      <section class="hx-skill-card">
        <span class="hx-icon-box">${px(SKILL_ICONS[g.category] || "zap", "px--lg")}</span>
        <span class="hx-label">#${i + 1} · ${g.items.length} skills</span>
        <h3>${esc(g.category)}</h3>
        <ul>
          ${g.items.map((it) => `<li><span>${esc(it.name)}</span><span>${levelBlocks(it.level)}</span></li>`).join("")}
        </ul>
      </section>`
  ).join("");
}

/* ---------- Projects (feature cards) ---------- */
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = PROJECTS.map(
    (p, i) => `
      <a class="hx-card hx-reveal" href="${PAGES.project}?id=${encodeURIComponent(p.id)}">
        <p class="hx-label">#${pad(i + 1)} · ${esc(p.tags[0] || p.category)} · ${esc(p.year)}</p>
        <h3 class="hx-h3">${esc(p.title)}</h3>
        <p class="hx-desc">${esc(p.tagline)}</p>
        <div class="hx-panel${p.image ? "" : " hx-panel--blank"}">
          <span class="hx-fold"></span>
          ${p.image ? `<img src="${p.image}" alt="${esc(p.title)} preview" loading="lazy" />` : `<span class="hx-panel-empty">${esc(p.title)}</span>`}
        </div>
        <div class="hx-card-foot">
          <div class="hx-tags">
            ${p.tags.map((t) => `<span class="hx-tag${/finalist|winner|award/i.test(t) ? " hx-tag--blue" : ""}">${esc(t)}</span>`).join("")}
          </div>
          <span class="hx-more">View project ${px("arrow-right")}</span>
        </div>
      </a>`
  ).join("");
}

/* ---------- Experience (FAQ-style rows) ---------- */
function renderExperience() {
  const list = document.getElementById("experienceList");
  list.innerHTML = EXPERIENCE.map(
    (g) => `
      <div class="hx-exp-group hx-reveal">
        <div class="hx-exp-head">
          <span class="hx-badge">${
            g.logo
              ? `<img src="${g.logo}" alt="${esc(g.company)} logo" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${esc(g.initials)}'}))" />`
              : `<span>${esc(g.initials)}</span>`
          }</span>
          <div>
            <p class="hx-label">${g.roles.length} role${g.roles.length > 1 ? "s" : ""}</p>
            <h3>${esc(g.company)}</h3>
          </div>
        </div>
        ${g.roles
          .map(
            (r, i) => `
          <details class="hx-role"${i === 0 ? " open" : ""}>
            <summary>
              <div>
                <h4>${esc(r.title)}</h4>
                <span class="hx-label">${esc(r.eyebrow)}</span>
              </div>
              <span class="meta">${esc(r.meta)}</span>
              <span>${px("plus", "ico-closed")}${px("minus", "ico-open")}</span>
            </summary>
            <p>${esc(r.description)}</p>
          </details>`
          )
          .join("")}
      </div>`
  ).join("");
}

/* ---------- Achievements ---------- */
const CERT_FILTERS = [
  { key: "all", label: "All" },
  { key: "Award", label: "Awards" },
  { key: "Competition", label: "Competitions" },
  { key: "Training", label: "Training" },
  { key: "Organization", label: "Organization" },
];

function renderCertificates() {
  if (typeof CERTIFICATES === "undefined") return;
  const grid = document.getElementById("certGrid");
  const bar = document.getElementById("certFilters");
  const count = (k) => (k === "all" ? CERTIFICATES.length : CERTIFICATES.filter((c) => c.type === k).length);

  bar.innerHTML = CERT_FILTERS.filter((f) => count(f.key) > 0)
    .map(
      (f, i) =>
        `<button type="button" data-filter="${f.key}" aria-pressed="${i === 0}">${f.label}<sup>${count(f.key)}</sup></button>`
    )
    .join("");

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    bar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    draw(btn.dataset.filter);
  });

  function draw(filter) {
    const list = filter === "all" ? CERTIFICATES : CERTIFICATES.filter((c) => c.type === filter);
    grid.innerHTML = list
      .map(
        (c) => `
        <a class="hx-card hx-cert" href="${PAGES.certificate}?id=${encodeURIComponent(c.id)}">
          <div class="hx-panel${c.image ? "" : " hx-panel--blank"}">
            <span class="hx-fold"></span>
            <span class="hx-tag hx-tag--blue hx-cert-type">${esc(c.type)} · ${esc(c.year)}</span>
            ${c.image
              ? `<img src="${c.image}" alt="${esc(c.title)} certificate" loading="lazy" />`
              : `<div class="hx-cert-pending-card">${px("trophy", "px--xl")}<strong>Certificate coming soon</strong><span class="hx-label">${esc(c.issuer)}</span></div>`}
          </div>
          <div class="hx-cert-body">
            <span class="hx-label">${esc(c.issuer)}</span>
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.summary)}</p>
            <span class="hx-more">View certificate ${px("arrow-right")}</span>
          </div>
        </a>`
      )
      .join("");
  }
  draw("all");
}

/* ---------- Contact ---------- */
function renderContact() {
  const rows = [
    { icon: "mail", label: "E-mail", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: "link", label: "LinkedIn", value: PROFILE.linkedin.replace(/^https?:\/\//, ""), href: PROFILE.linkedin, ext: true },
    { icon: "message", label: "WhatsApp", value: PROFILE.phone, href: `https://wa.me/${PROFILE.phone.replace(/\D/g, "")}`, ext: true },
    { icon: "download", label: "Curriculum vitae", value: "Download CV (PDF)", href: PROFILE.cvUrl, dl: true },
  ];
  document.getElementById("contactList").innerHTML = rows
    .map(
      (r) => `
      <a href="${r.href}"${r.ext ? ' target="_blank" rel="noopener"' : ""}${r.dl ? " download" : ""}>
        <span class="hx-icon-box">${px(r.icon)}</span>
        <span><span class="hx-label">${r.label}</span><strong>${esc(r.value)}</strong></span>
        ${px(r.ext ? "external-link" : "arrow-right")}
      </a>`
    )
    .join("");
}
