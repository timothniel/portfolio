/*
  hermes-certificate.js
  ---------------------
  Runs on certificate.html?id=<certificate id>. Replaces the old
  certificate.js, in the Hermes-style layout.
*/

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const index = CERTIFICATES.findIndex((c) => c.id === id);
  const cert = CERTIFICATES[index];
  document.title = cert
    ? `${cert.title} — Timothy Othniel Wahyudi`
    : "Certificate not found — Timothy Othniel Wahyudi";

  document.getElementById("certContent").innerHTML = cert ? renderCertificate(cert, index) : renderNotFound();
  initCommon();
});

const esc = (s = "") =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pad = (n) => String(n).padStart(2, "0");

function renderCertificate(c, index) {
  const project = c.relatedProject ? PROJECTS.find((p) => p.id === c.relatedProject) : null;
  const prev = CERTIFICATES[(index - 1 + CERTIFICATES.length) % CERTIFICATES.length];
  const next = CERTIFICATES[(index + 1) % CERTIFICATES.length];
  const spec = [
    ["Issued by", c.issuer],
    ["Date", c.date],
    ["Type", c.type],
    ["Certificate no.", c.credentialId],
  ].filter(([, v]) => v);

  const actions = [];
  if (project) actions.push(`<a class="hx-btn" href="${PAGES.project}?id=${encodeURIComponent(project.id)}">${px("briefcase")}Related project: ${esc(project.title)}</a>`);
  if (c.verifyUrl) actions.push(`<a class="hx-btn hx-btn--ghost" href="${c.verifyUrl}" target="_blank" rel="noopener">${px("check")}Verify certificate</a>`);
  if (c.image) actions.push(`<a class="hx-btn hx-btn--ghost" href="${c.image}" target="_blank" rel="noopener">${px("external-link")}Open full certificate</a>`);

  return `
    <a href="${PAGES.home}#achievements" class="hx-back hx-link">${px("arrow-left")}Back to achievements</a>

    <p class="hx-label">Certificate ${pad(index + 1)} / ${pad(CERTIFICATES.length)} · ${esc(c.type)} · ${esc(c.date)}</p>
    <h1 class="hx-display hx-detail-title${c.title.length > 40 ? " is-long" : ""}">${esc(c.title)}</h1>
    <p class="hx-detail-tagline">${esc(c.summary)}</p>

    ${c.image
      ? `<a class="hx-cert-frame" href="${c.image}" target="_blank" rel="noopener" title="Open full-size certificate">
           <img src="${c.image}" alt="${esc(c.title)} certificate" />
           <span class="hx-btn hx-btn--sm hint">${px("external-link")}Open full size</span>
         </a>`
      : `<div class="hx-panel hx-panel--blank hx-cert-pending" style="margin-top:48px">
           <div class="hx-panel-empty">${px("trophy", "px--xl")}<span>Certificate coming soon</span><span class="hx-label">${esc(c.issuer)} · ${esc(c.date)}</span></div>
         </div>`}

    <dl class="hx-spec">
      ${spec.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}
    </dl>

    <div class="hx-detail-body">
      <section class="hx-block">
        <p class="hx-label">#01 About</p>
        <div><h2>About this certificate</h2><p>${esc(c.description)}</p></div>
      </section>
      <section class="hx-block">
        <p class="hx-label">#02 Why it matters</p>
        <div><h2>Why it matters</h2><p>${esc(c.significance)}</p></div>
      </section>
      ${c.skills && c.skills.length ? `
      <section class="hx-block">
        <p class="hx-label">#03 Skills</p>
        <div><h2>Skills demonstrated</h2>
          <div class="hx-tags">${c.skills.map((s) => `<span class="hx-tag">${esc(s)}</span>`).join("")}</div>
        </div>
      </section>` : ""}
      ${actions.length ? `<section class="hx-block"><p class="hx-label">Links</p><div class="hx-actions">${actions.join("")}</div></section>` : ""}
    </div>

    <nav class="hx-pager" aria-label="Other certificates">
      <a href="${PAGES.certificate}?id=${encodeURIComponent(prev.id)}">
        <span class="hx-label">${px("arrow-left")} Previous</span>
        <strong>${esc(prev.title)}</strong>
      </a>
      <a class="next" href="${PAGES.certificate}?id=${encodeURIComponent(next.id)}">
        <span class="hx-label">Next ${px("arrow-right")}</span>
        <strong>${esc(next.title)}</strong>
      </a>
    </nav>`;
}

function renderNotFound() {
  return `
    <a href="${PAGES.home}#achievements" class="hx-back hx-link">${px("arrow-left")}Back to achievements</a>
    <h1 class="hx-display hx-detail-title">Certificate not found</h1>
    <p class="hx-detail-tagline">There's no certificate matching that link. Head back and pick one from the list.</p>`;
}
