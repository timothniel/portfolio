/*
  hermes-project.js
  -----------------
  Runs on project.html?id=<project id>. Same data and case-study
  loading as project.js, in the Hermes-style layout.
*/

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const project = PROJECTS.find((p) => p.id === id);
  document.title = project
    ? `${project.title} — Timothy Othniel Wahyudi`
    : "Project not found — Timothy Othniel Wahyudi";

  const container = document.getElementById("projectContent");
  container.innerHTML = project ? renderProject(project) : renderNotFound();
  initCommon();
  if (project && project.caseStudy) loadCaseStudy(project.caseStudy);
});

const esc = (s = "") =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pad = (n) => String(n).padStart(2, "0");

/* Case-study scripts listed in data.js load in order and render into #caseStudy */
function loadCaseStudy(scripts) {
  scripts
    .reduce(
      (chain, src) =>
        chain.then(
          () =>
            new Promise((resolve, reject) => {
              const s = document.createElement("script");
              s.src = src;
              s.onload = resolve;
              s.onerror = () => reject(new Error(`Could not load ${src}`));
              document.body.appendChild(s);
            })
        ),
      Promise.resolve()
    )
    .catch((err) => console.error(err));
}

function renderProject(p) {
  const index = PROJECTS.indexOf(p);
  const spec = [
    ["Category", p.category],
    ["Role", p.role],
    ["Year", p.year],
    ["Team", p.team],
    ["Tools & methods", p.stack],
  ].filter(([, v]) => v);

  const blocks = [
    ["Overview", p.description],
    ["The problem", p.problem],
    ["Approach", p.approach],
  ].filter(([, v]) => v);

  let n = 0;
  const label = (t) => `<p class="hx-label">#${pad(++n)} ${t}</p>`;

  return `
    <a href="${PAGES.home}#projects" class="hx-back hx-link">${px("arrow-left")}Back to projects</a>

    <p class="hx-label">Project ${pad(index + 1)} / ${pad(PROJECTS.length)} · ${esc(p.eyebrow || p.category)}</p>
    <h1 class="hx-display hx-detail-title${p.title.length > 40 ? " is-long" : ""}">${esc(p.title)}</h1>
    <p class="hx-detail-tagline">${esc(p.tagline)}</p>
    <div class="hx-tags" style="margin-top:22px">
      ${p.tags.map((t) => `<span class="hx-tag${/finalist|winner|award/i.test(t) ? " hx-tag--blue" : ""}">${esc(t)}</span>`).join("")}
    </div>

    ${p.image ? `<div class="hx-detail-hero-img"><img src="${p.image}" alt="${esc(p.title)} thumbnail" /></div>` : ""}

    <dl class="hx-spec">
      ${spec.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}
    </dl>

    <div class="hx-detail-body">
      ${blocks
        .map(
          ([title, text]) => `
        <section class="hx-block">
          ${label(title)}
          <div><h2>${title}</h2><p>${esc(text)}</p></div>
        </section>`
        )
        .join("")}

      ${p.highlights && p.highlights.length ? `
        <section class="hx-block">
          ${label("Highlights")}
          <div>
            <h2>Highlights</h2>
            <ul class="hx-list">${p.highlights.map((h) => `<li>${px("check")}<span>${esc(h)}</span></li>`).join("")}</ul>
          </div>
        </section>` : ""}

      ${renderSkillsApplied(p, label)}

      ${renderActions(p)}
    </div>

    ${p.caseStudy ? '<div id="caseStudy"></div>' : ""}

    ${renderScreenshots(p)}

    ${renderPager(index)}
  `;
}

function renderSkillsApplied(p, label) {
  const names = p.skills || [];
  if (!names.length || typeof SKILLS === "undefined") return "";
  const levels = new Map(SKILLS.flatMap((g) => g.items.map((i) => [i.name, i.level])));
  const known = names.filter((n) => levels.has(n));
  if (!known.length) return "";
  return `
    <section class="hx-block">
      ${label("Skills applied")}
      <div>
        <h2>Skills applied</h2>
        <p class="hx-note">Level out of 5, matching the <a href="${PAGES.home}#skills">Skills &amp; Tools</a> ratings</p>
        <ul class="hx-chips">
          ${known.map((n) => `<li class="hx-chip">${esc(n)}${levelBlocks(levels.get(n))}</li>`).join("")}
        </ul>
      </div>
    </section>`;
}

function renderActions(p) {
  const buttons = [];
  if (p.liveUrl) buttons.push(`<a class="hx-btn" href="${p.liveUrl}" target="_blank" rel="noopener">${px("external-link")}View live</a>`);
  if (p.repoUrl) buttons.push(`<a class="hx-btn hx-btn--ghost" href="${p.repoUrl}" target="_blank" rel="noopener">${px("code")}View code</a>`);
  (p.links || []).forEach((l, i) =>
    buttons.push(
      `<a class="hx-btn ${i === 0 && !p.liveUrl ? "" : "hx-btn--ghost"}" href="${l.url}" target="_blank" rel="noopener">${px("external-link")}${esc(l.label)}</a>`
    )
  );
  if (!buttons.length) return "";
  return `<section class="hx-block"><p class="hx-label">Links</p><div class="hx-actions">${buttons.join("")}</div></section>`;
}

function renderScreenshots(p) {
  const shots = (p.screenshots || []).filter((s) => s.src);
  if (!shots.length) return "";
  const layout = ["mobile", "desktop", "mockup"].includes(p.screenshotLayout) ? p.screenshotLayout : "desktop";
  return `
    <section class="hx-gallery">
      <p class="hx-label">${shots.length} images</p>
      <h2 class="hx-h2">${esc(p.screenshotsTitle || "Screenshots")}</h2>
      <div class="hx-shots hx-shots--${layout}">
        ${shots
          .map(
            (s, i) => `
          <figure class="hx-shot">
            <a href="${s.src}" target="_blank" rel="noopener">
              <img src="${s.src}" alt="${esc(s.caption || `${p.title} screenshot ${i + 1}`)}" loading="lazy" />
            </a>
            ${s.caption ? `<figcaption><span class="hx-label">Fig. ${pad(i + 1)}</span><span>${esc(s.caption)}</span></figcaption>` : ""}
          </figure>`
          )
          .join("")}
      </div>
    </section>`;
}

function renderPager(index) {
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  return `
    <nav class="hx-pager" aria-label="Other projects">
      <a href="${PAGES.project}?id=${encodeURIComponent(prev.id)}">
        <span class="hx-label">${px("arrow-left")} Previous project</span>
        <strong>${esc(prev.title)}</strong>
      </a>
      <a class="next" href="${PAGES.project}?id=${encodeURIComponent(next.id)}">
        <span class="hx-label">Next project ${px("arrow-right")}</span>
        <strong>${esc(next.title)}</strong>
      </a>
    </nav>`;
}

function renderNotFound() {
  return `
    <a href="${PAGES.home}#projects" class="hx-back hx-link">${px("arrow-left")}Back to projects</a>
    <h1 class="hx-display hx-detail-title">Project not found</h1>
    <p class="hx-detail-tagline">There's no project matching that link. Head back and pick one from the list.</p>`;
}
