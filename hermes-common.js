/*
  hermes-common.js
  ----------------
  Shared by the three Hermes-style pages: page links, pixel icons,
  nav behaviour, scroll reveal and the footer.
  PAGES holds the file names the pages link to.
*/
const PAGES = {
  home: "index.html",
  project: "project.html",
  certificate: "certificate.html",
};

/* Pixel level blocks, e.g. ■■■■□ 4/5 */
function levelBlocks(level, withScore = true) {
  // Whole levels fill a block; a .5 level fills half of the next one
  const blocks = Array.from({ length: 5 }, (_, i) =>
    `<i class="${i + 1 <= level ? "on" : i < level ? "half" : ""}"></i>`
  ).join("");
  return `<span class="hx-level" role="img" aria-label="Level ${level} of 5">${blocks}</span>${
    withScore ? `<span class="hx-score">${level}/5</span>` : ""
  }`;
}

/* Any element with data-icon="name" gets that pixel icon placed in front of its text */
function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    if (el.dataset.iconDone) return;
    el.insertAdjacentHTML("afterbegin", px(el.dataset.icon));
    el.dataset.iconDone = "1";
  });
}

function setupNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  const onScroll = () => nav && nav.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.innerHTML = px(open ? "close" : "menu");
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = px("menu");
      })
    );
  }

  // Highlight the section in view
  const anchors = links ? [...links.querySelectorAll('a[href^="#"]')] : [];
  if (anchors.length && "IntersectionObserver" in window) {
    const byId = new Map(anchors.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          anchors.forEach((a) => a.classList.remove("is-active"));
          const a = byId.get(e.target.id);
          if (a) a.classList.add("is-active");
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    byId.forEach((_, id) => {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }
}

function setupReveal() {
  const items = document.querySelectorAll(".hx-reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
}

function renderFooter() {
  const badges = document.getElementById("footerBadges");
  if (badges && typeof EXPERIENCE !== "undefined") {
    badges.innerHTML = EXPERIENCE.filter((g) => g.logo)
      .slice(0, 3)
      .map((g) => `<span class="hx-badge" title="${g.company}"><img src="${g.logo}" alt="${g.company} logo" /></span>`)
      .join("");
  }
  const links = document.getElementById("footerLinks");
  if (links && typeof PROFILE !== "undefined") {
    links.innerHTML = [
      `<a href="${PROFILE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`,
      `<a href="mailto:${PROFILE.email}">Email</a>`,
      `<a href="https://wa.me/${PROFILE.phone.replace(/\D/g, "")}" target="_blank" rel="noopener">WhatsApp</a>`,
    ].join('<span class="sep">|</span>');
  }
  const now = new Date();
  document.querySelectorAll(".yr").forEach((el) => (el.textContent = now.getFullYear()));
  const date = document.getElementById("footerDate");
  if (date) date.textContent = `${now.toLocaleString("en-US", { month: "long" })} ${now.getFullYear()}`;
}

function initCommon() {
  hydrateIcons();
  setupNav();
  renderFooter();
  setupReveal();
}
