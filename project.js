/*
  project.js
  ----------
  Runs on project.html. Reads the "id" query parameter from the URL
  (e.g. project.html?id=project-one), looks that project up in the
  PROJECTS array from data.js, and renders its details.
*/

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const project = PROJECTS.find((p) => p.id === id);

  document.title = project ? `${project.title} — Timothy's Portfolio` : "Project not found — Timothy's Portfolio";

  const container = document.getElementById("projectContent");
  setBottomBar();
  if (!container) return;

  container.innerHTML = project ? renderProject(project) : renderNotFound();
});

function renderProject(project) {
  return `
    <a href="index.html#projects" class="detail-back">← Back to projects</a>

    <p class="detail-eyebrow">${project.category} · ${project.year}</p>
    <h1 class="detail-title">${project.title}</h1>
    <p class="detail-tagline">${project.tagline}</p>

    <div class="detail-thumb">
      ${project.image
        ? `<img src="${project.image}" alt="${project.title} thumbnail" />`
        : placeholder("Project thumbnail", project.title)}
    </div>

    <dl class="detail-meta">
      <div>
        <dt>Category</dt>
        <dd>${project.category}</dd>
      </div>
      <div>
        <dt>Role</dt>
        <dd>${project.role}</dd>
      </div>
      <div>
        <dt>Year</dt>
        <dd>${project.year}</dd>
      </div>
      ${project.team ? `<div>
        <dt>Team</dt>
        <dd>${project.team}</dd>
      </div>` : ""}
    </dl>

    ${project.stack ? `<p class="detail-stack"><span>Tools &amp; methods</span>${project.stack}</p>` : ""}

    <div class="detail-body">
      <div>
        <h2>Overview</h2>
        <p>${project.description}</p>
      </div>
      <div>
        <h2>The problem</h2>
        <p>${project.problem}</p>
      </div>
      <div>
        <h2>Approach</h2>
        <p>${project.approach}</p>
      </div>
      <div>
        <h2>Highlights</h2>
        <ul class="detail-highlights">
          ${project.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>
      </div>
      ${renderSkillsApplied(project)}
      <div class="detail-actions">
        ${project.liveUrl ? `<a class="btn-solid" href="${project.liveUrl}" target="_blank" rel="noopener">View live</a>` : ""}
        ${project.repoUrl ? `<a class="btn-outline" href="${project.repoUrl}" target="_blank" rel="noopener">View code</a>` : ""}
        ${(project.links || []).map((link) => `<a class="btn-outline" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`).join("")}
      </div>
    </div>

    ${renderScreenshots(project)}
  `;
}

/* Skills used on this project, with the same 1–5 level as the Skills section */
function renderSkillsApplied(project) {
  const names = project.skills || [];
  if (!names.length || typeof SKILLS === "undefined") return "";
  const levels = new Map(SKILLS.flatMap((g) => g.items.map((i) => [i.name, i.level])));

  return `
      <div>
        <h2>Skills applied</h2>
        <p class="skills-note">Level out of 5, matching the <a href="index.html#skills">Skills &amp; Tools</a> ratings</p>
        <ul class="skill-chips">
          ${names
            .filter((n) => levels.has(n))
            .map((n) => {
              const level = levels.get(n);
              const dots = Array.from({ length: 5 }, (_, i) => `<i class="${i < level ? "on" : ""}"></i>`).join("");
              return `<li>${n}<span class="dots" role="img" aria-label="Level ${level} of 5">${dots}</span><span class="skill-score">${level}/5</span></li>`;
            })
            .join("")}
        </ul>
      </div>`;
}

function renderScreenshots(project) {
  const shots = project.screenshots || [];
  if (!shots.length) return "";
  const layout = ["mobile", "desktop", "mockup"].includes(project.screenshotLayout)
    ? project.screenshotLayout
    : "desktop";

  return `
    <div class="detail-gallery-block">
      <h2>Screenshots</h2>
      <div class="shot-grid shot-grid--${layout}">
        ${shots
          .map(
            (shot, i) => `
          <figure class="shot">
            ${shot.src
              ? `<a class="shot-frame" href="${shot.src}" target="_blank" rel="noopener">
                   <img src="${shot.src}" alt="${shot.caption || `${project.title} screenshot ${i + 1}`}" loading="lazy" />
                 </a>`
              : `<div class="shot-frame">${placeholder(`Screenshot ${i + 1}`)}</div>`}
            ${shot.caption ? `<figcaption>${shot.caption}</figcaption>` : ""}
          </figure>`
          )
          .join("")}
      </div>
    </div>
  `;
}

/* Grey placeholder shown until a real image is added in data.js */
function placeholder(label, title = "") {
  return `
    <div class="img-placeholder">
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 17l-5.5-5.5L5 20"/></svg>
      ${title ? `<strong>${title}</strong>` : ""}
      <span>${label} coming soon</span>
    </div>`;
}

function renderNotFound() {
  return `
    <a href="index.html#projects" class="detail-back">← Back to projects</a>
    <div class="not-found">
      <h1 class="detail-title">Project not found</h1>
      <p class="detail-tagline">There's no project matching that link. Head back and pick one from the list.</p>
    </div>
  `;
}

function setBottomBar() {
  const el = document.getElementById("bottomBar");
  if (!el) return;
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  el.textContent = `${month} ${now.getFullYear()}`;
}
