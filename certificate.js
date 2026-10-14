/*
  certificate.js
  --------------
  Runs on certificate.html. Reads the "id" query parameter from the URL
  (e.g. certificate.html?id=deans-list-2025), looks that certificate up in
  the CERTIFICATES array from data.js, and renders its details.
*/

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const index = CERTIFICATES.findIndex((c) => c.id === id);
  const cert = CERTIFICATES[index];

  document.title = cert
    ? `${cert.title} — Timothy's Portfolio`
    : "Certificate not found — Timothy's Portfolio";

  setBottomBar();
  const container = document.getElementById("certContent");
  if (!container) return;

  container.innerHTML = cert ? renderCertificate(cert, index) : renderNotFound();
});

function renderCertificate(cert, index) {
  const project = cert.relatedProject
    ? PROJECTS.find((p) => p.id === cert.relatedProject)
    : null;
  const prev = CERTIFICATES[(index - 1 + CERTIFICATES.length) % CERTIFICATES.length];
  const next = CERTIFICATES[(index + 1) % CERTIFICATES.length];

  return `
    <a href="index.html#achievements" class="detail-back">← Back to achievements</a>

    <p class="detail-eyebrow">${cert.type} · ${cert.date}</p>
    <h1 class="detail-title cert-title">${cert.title}</h1>
    <p class="detail-tagline">${cert.summary}</p>

    ${cert.image
      ? `<a class="cert-frame" href="${cert.image}" target="_blank" rel="noopener" title="Open full-size certificate">
          <img src="${cert.image}" alt="${cert.title} certificate" />
          <span class="cert-frame-hint">Open full size ↗</span>
        </a>`
      : `<div class="cert-frame cert-frame-pending">
          <div class="cert-pending">
            <span class="cert-pending-mark">★</span>
            <span>Certificate coming soon</span>
            <small>This award has been confirmed and the certificate will be added once it’s issued.</small>
          </div>
        </div>`}

    <dl class="detail-meta">
      <div>
        <dt>Issued by</dt>
        <dd>${cert.issuer}</dd>
      </div>
      <div>
        <dt>Date</dt>
        <dd>${cert.date}</dd>
      </div>
      <div>
        <dt>Type</dt>
        <dd>${cert.type}</dd>
      </div>
      ${cert.credentialId ? `<div>
        <dt>Certificate no.</dt>
        <dd>${cert.credentialId}</dd>
      </div>` : ""}
    </dl>

    <div class="detail-body">
      <div>
        <h2>About this certificate</h2>
        <p>${cert.description}</p>
      </div>
      <div>
        <h2>Why it matters</h2>
        <p>${cert.significance}</p>
      </div>
      ${cert.skills && cert.skills.length ? `<div>
        <h2>Skills demonstrated</h2>
        <div class="tag-row">
          ${cert.skills.map((s) => `<span class="tag-chip">${s}</span>`).join("")}
        </div>
      </div>` : ""}
      <div class="detail-actions">
        ${project ? `<a class="btn-solid" href="project.html?id=${encodeURIComponent(project.id)}">View related project: ${project.title}</a>` : ""}
        ${cert.verifyUrl ? `<a class="btn-outline" href="${cert.verifyUrl}" target="_blank" rel="noopener">Verify certificate</a>` : ""}
        ${cert.image ? `<a class="btn-outline" href="${cert.image}" target="_blank" rel="noopener">Open full certificate</a>` : ""}
      </div>
    </div>

    <nav class="cert-pager" aria-label="Other certificates">
      <a href="certificate.html?id=${encodeURIComponent(prev.id)}">
        <span>← Previous</span>
        ${prev.title}
      </a>
      <a href="certificate.html?id=${encodeURIComponent(next.id)}" class="next">
        <span>Next →</span>
        ${next.title}
      </a>
    </nav>
  `;
}

function renderNotFound() {
  return `
    <a href="index.html#achievements" class="detail-back">← Back to achievements</a>
    <div class="not-found">
      <h1 class="detail-title">Certificate not found</h1>
      <p class="detail-tagline">There's no certificate matching that link. Head back and pick one from the list.</p>
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
