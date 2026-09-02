const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const clientTrack = document.querySelector("[data-client-track]");
const metricsSection = document.querySelector("[data-metrics]");
const timelineSection = document.querySelector("[data-timeline]");
const missionSection = document.querySelector("[data-mission-section]");
const servicePillarsSection = document.querySelector("[data-service-pillars]");
const contactRevealItems = [...document.querySelectorAll("[data-contact-reveal]")];
const copyTemplateButton = document.querySelector("[data-copy-template]");
const contactModal = document.querySelector("[data-contact-modal]");
const openContactInstructionsButtons = [...document.querySelectorAll("[data-open-contact-instructions]")];
const closeContactInstructionsButtons = [...document.querySelectorAll("[data-close-contact-instructions]")];
const contactForms = [...document.querySelectorAll("[data-contact-form]")];
const eventsGalleryRoot = document.querySelector("[data-events-gallery]");
const governanceRevealItems = [...document.querySelectorAll("[data-governance-reveal]")];
const governanceJumpLinks = [...document.querySelectorAll(".governance-jump-nav a[href^='#']")];
const governanceJumpShell = document.querySelector(".governance-jump-shell");
const GOVERNANCE_CONTACTS = Object.freeze({
  dpoEmail: "encarregado_dpo@idvlabs.com.br"
});
const COOKIE_CONSENT_KEY = "dvgenesis_cookie_consent";
const COOKIE_POLICY_VERSION = "1.0";
const COOKIE_CATEGORIES = Object.freeze(["analytics", "functional", "marketing"]);

/*
 * Technology map (audit 2026-08-28):
 * - script.js and local visual assets -> essential -> always available; no cookies.
 * - localStorage preference record -> essential -> written only after an explicit choice.
 * - outbound social, WhatsApp and product links -> external navigation -> contacted only after a click.
 * - analytics, optional functional embeds and marketing -> not configured.
 * Future non-essential scripts must use type="text/plain", data-cookie-category and data-cookie-src.
 * Future embeds must omit src and use data-cookie-embed, data-cookie-category and data-cookie-src.
 */

let cookieConsentState = null;
let cookieConsentReturnFocus = null;

document.documentElement.classList.add("js-enabled");

const updateActiveNavigation = () => {
  if (!nav) return;

  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  const isHome = currentFile === "index.html";
  const activeTarget = isHome
    ? window.location.hash === "#comunicacao"
      ? "#comunicacao"
      : "#inicio"
    : currentFile;

  nav.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkFile = href.split("#")[0] || "index.html";
    const isActive =
      (isHome && href === activeTarget) ||
      (!isHome && linkFile === currentFile);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

updateActiveNavigation();
window.addEventListener("hashchange", updateActiveNavigation);

const eventsGalleryItems = [
  {
    title: "Palestras Executivas",
    description: "Registros de palestras executivas e conversas com especialistas.",
    image: "assets/eventos/palestras-governanca-ia.jpg",
    type: "palestras",
    icon: "presentation"
  },
  {
    title: "Painel Executivo",
    description: "Encontros pensados para gerar conversas relevantes e conexões de valor.",
    image: "assets/eventos/ambiente-executivo-inovabra.jfif",
    type: "experiência",
    icon: "briefcase-business"
  },
  {
    title: "Networking Qualificado",
    description: "Conexões entre lideranças, empresas e profissionais.",
    image: "assets/eventos/networking-inovabra.jfif",
    type: "conexões",
    icon: "network"
  },
  {
    title: "Conexões Estratégicas",
    description: "Interações que fortalecem parcerias e oportunidades.",
    image: "assets/eventos/conexoes-relacionamento-inovabra.jpg",
    type: "relacionamento",
    icon: "heart-handshake"
  },
  {
    title: "Especialistas",
    description: "Trocas práticas com quem lidera transformação digital.",
    image: "assets/eventos/momentos-especialistas-inovabra.jpg",
    type: "especialistas",
    icon: "user-round-check"
  }
];

const clients = [
  ["Grupo Fleury", "fleury", "<small>Grupo</small><strong>Fleury</strong>"],
  ["Exata Brasil", "exata", "<strong>EXATA</strong><small>Brasil</small>"],
  ["Mozaiko", "mozaiko", "<strong>mozaiko</strong>"],
  ["LWSA", "lwsa", "<strong>lwsa</strong>"],
  ["Sodexo", "sodexo", "<strong>sodexo</strong>"],
  ["Cidade Ágil Consultoria", "agil", "<small>Cidade</small><strong>ÁGIL</strong>"],
  ["VINCI", "vinci", "<strong>VINCI</strong>"],
  ["FIA Business School", "fia", "<strong>FIA</strong><small>Business School</small>"],
  ["Agrex do Brasil", "agrex", "<strong>AGREX</strong><small>do Brasil</small>"],
  ["Trademaster", "trademaster", "<strong>TN</strong><em>trademaster</em>"],
  ["CNH Industrial Capital", "cnh", "<strong>CNH</strong><small>Industrial Capital</small>"],
  ["Lindt", "lindt", "<strong>Lindt</strong>"],
  ["GGN", "ggn", "<strong>GGN</strong><small>Jornal de todos os Brasis</small>"],
  ["Send.Knowledge", "send", "<strong>Send</strong><em>.Knowledge</em>"],
  ["Banco BV", "bv", "<small>banco</small><strong>BV</strong>"],
  ["Instituto Butantan", "butantan", "<strong>Instituto</strong><small>Butantan</small>"],
  ["Grupo Editorial Nacional", "gen", "<strong>gen</strong><small>Grupo Editorial Nacional</small>"],
  ["Grupo Mulheres do Brasil", "mulheres", "<strong>Grupo Mulheres</strong><small>do Brasil</small>"],
  ["MEDMEP", "medmep", "<strong>MED</strong><em>MEP</em>"],
  ["TMG", "tmg", "<strong>TMG</strong>"],
  ["Grupo A", "grupo-a", "<strong>Grupo A</strong><small>Soluções em energia</small>"],
  ["São Martinho", "martinho", "<strong>São Martinho</strong>"],
  ["Grupo Taking", "taking", "<small>Grupo</small><strong>Taking</strong>"],
  ["Agrivalle", "agrivalle", "<strong>Agrivalle</strong>"],
  ["AIKNOW", "aiknow", "<strong>AIKNOW</strong>"],
  ["Uniodonto", "uniodonto", "<strong>uniodonto</strong>"],
  ["Embrapa", "embrapa", "<strong>Embrapa</strong>"],
  ["Aqua Capital", "aqua", "<strong>AQUA</strong><small>CAPITAL</small>"],
  ["iCoLab", "icolab", "<strong>iCoLab</strong>"],
  ["Demarest", "demarest", "<strong>Demarest</strong><small>Advogados</small>"],
  ["MCIO Brasil", "mcio", "<strong>MCIO</strong><small>Brasil</small>"],
  ["Craft", "craft", "<strong>Craft</strong>"],
  ["Eureciclo", "eureciclo", "<strong>eureciclo</strong>"],
  ["Veritas", "veritas", "<strong>VERITAS</strong>"],
  ["TO Brasil", "tobrasil", "<strong>TO Brasil</strong>"],
  ["PwC", "pwc", "<strong>pwc</strong>"],
  ["Zapppts", "zapppts", "<strong>zapppts</strong>"],
  ["iProcess", "iprocess", "<strong>i</strong><em>process</em>"],
  ["Trisul", "trisul", "<strong>TRISUL</strong>"],
  ["PGE Bahia", "pge", "<strong>PGE</strong><small>Procuradoria Geral do Estado da Bahia</small>"],
  ["Bunge", "bunge", "<strong>BUNGE</strong>"],
  ["ABINC", "abinc", "<strong>ABINC</strong><small>Internet das coisas</small>"],
  ["Ibmec", "ibmec", "<strong>Ibmec</strong>"],
  ["PUC-SP", "puc", "<strong>PUC-SP</strong>"]
];

const clientDomains = {
  fleury: "grupofleury.com.br",
  exata: "exatabrasil.com.br",
  mozaiko: "mozaiko.io",
  lwsa: "lwsa.com.br",
  sodexo: "sodexo.com.br",
  agil: "cidadeagil.com.br",
  vinci: "vinci.com",
  fia: "fia.com.br",
  agrex: "agrex.com.br",
  trademaster: "trademaster.com.br",
  cnh: "cnhindustrial.com",
  lindt: "lindt.com.br",
  ggn: "jornalggn.com.br",
  send: "sendknowledge.com.br",
  bv: "bv.com.br",
  butantan: "butantan.gov.br",
  gen: "grupogen.com.br",
  mulheres: "grupomulheresdobrasil.org.br",
  medmep: "medmep.com",
  tmg: "tmg.agr.br",
  "grupo-a": "grupo-a.com.br",
  martinho: "saomartinho.com.br",
  taking: "grupotaking.com.br",
  agrivalle: "agrivalle.com.br",
  aiknow: "aiknow.ai",
  uniodonto: "uniodonto.coop.br",
  embrapa: "embrapa.br",
  aqua: "aqua.capital",
  icolab: "icolab.com.br",
  demarest: "demarest.com.br",
  mcio: "mciobrasil.org.br",
  craft: "craft.com.br",
  eureciclo: "eureciclo.com.br",
  veritas: "veritas.com",
  tobrasil: "tobrasil.com.br",
  pwc: "pwc.com",
  zapppts: "zapppts.com.br",
  iprocess: "iprocess.com.br",
  trisul: "trisul-sa.com.br",
  pge: "pge.ba.gov.br",
  bunge: "bunge.com.br",
  abinc: "abinc.org.br",
  ibmec: "ibmec.br",
  puc: "pucsp.br"
};

const clientLogoAssets = {
  fleury: "assets/clientes/grupo-fleury.svg",
  exata: "assets/clientes/exata-brasil.png",
  mozaiko: "assets/clientes/mozaiko.webp",
  lwsa: "assets/clientes/lwsa.svg",
  sodexo: "assets/clientes/sodexo.png",
  agil: "assets/clientes/cidade-agil.png",
  vinci: "assets/clientes/vinci.jpg",
  fia: "assets/clientes/fia-business-school.png",
  agrex: "assets/clientes/agrex-do-brasil.svg",
  trademaster: "assets/clientes/trademaster-mark.png",
  cnh: "assets/clientes/cnh-industrial.svg",
  lindt: "assets/clientes/lindt.png",
  ggn: "assets/clientes/ggn.png",
  bv: "assets/clientes/bv.png",
  butantan: "assets/clientes/instituto-butantan.png",
  gen: "assets/clientes/gen-mark.png",
  mulheres: "assets/clientes/grupo-mulheres-do-brasil.png",
  medmep: "assets/clientes/medmep-linkedin.jpg",
  tmg: "assets/clientes/tmg.png",
  martinho: "assets/clientes/sao-martinho.png",
  taking: "assets/clientes/taking-mark.png",
  agrivalle: "assets/clientes/agrivalle-offwhite.png",
  aiknow: "assets/clientes/aiknow.ico",
  uniodonto: "assets/clientes/uniodonto.png",
  embrapa: "assets/clientes/embrapa.png",
  aqua: "assets/clientes/aqua-capital.png",
  icolab: "assets/clientes/icolab-mark.png",
  demarest: "assets/clientes/demarest.svg",
  mcio: "assets/clientes/mcio-brasil.png",
  craft: "assets/clientes/craft-linkedin.jpg",
  eureciclo: "assets/clientes/eureciclo.svg",
  veritas: "assets/clientes/veritas.png",
  tobrasil: "assets/clientes/to-brasil.jpg",
  pwc: "assets/clientes/pwc.svg",
  iprocess: "assets/clientes/iprocess.png",
  trisul: "assets/clientes/trisul.svg",
  bunge: "assets/clientes/bunge.svg",
  abinc: "assets/clientes/abinc-mark.png",
  ibmec: "assets/clientes/ibmec.svg",
  puc: "assets/clientes/puc-sp.png"
};

const clientLogosWithLabel = new Set([
  "mozaiko",
  "trademaster",
  "send",
  "gen",
  "grupo-a",
  "taking",
  "aiknow",
  "icolab",
  "craft",
  "zapppts",
  "pge",
  "abinc"
]);

clients.splice(
  0,
  clients.length,
  ["Exata Brasil", "exata"],
  ["LWSA", "lwsa"],
  ["Sodexo", "sodexo"],
  ["FIA Business School", "fia"],
  ["Agrex do Brasil", "agrex"],
  ["Lindt", "lindt"],
  ["Instituto Butantan", "butantan"],
  ["MedMep", "medmep"],
  ["Gimi", "gimi"],
  ["Aqua Capital", "aqua"],
  ["Demarest", "demarest"],
  ["eureciclo", "eureciclo"],
  ["VR", "vr"],
  ["Cyrela", "cyrela"],
  ["Luckscolor", "luckscolor"],
  ["Poliedro", "poliedro"]
);

Object.keys(clientDomains).forEach((slug) => delete clientDomains[slug]);
Object.assign(clientDomains, {
  exata: "exatabrasil.com.br",
  lwsa: "lwsa.com.br",
  sodexo: "sodexo.com.br",
  fia: "fia.com.br",
  agrex: "agrex.com.br",
  lindt: "lindt.com.br",
  butantan: "butantan.gov.br",
  medmep: "medmep.com",
  gimi: "gimi.com.br",
  aqua: "aqua.capital",
  demarest: "demarest.com.br",
  eureciclo: "eureciclo.com.br",
  vr: "vr.com.br",
  cyrela: "cyrela.com.br",
  luckscolor: "luckscolor.com.br",
  poliedro: "sistemapoliedro.com.br"
});

Object.keys(clientLogoAssets).forEach((slug) => delete clientLogoAssets[slug]);
Object.assign(clientLogoAssets, {
  exata: "assets/clientes/exata-brasil.png",
  lwsa: "assets/clientes/lwsa.svg",
  sodexo: "assets/clientes/sodexo.png",
  fia: "assets/clientes/fia-business-school.png",
  agrex: "assets/clientes/agrex-do-brasil.svg",
  lindt: "assets/clientes/lindt.png",
  butantan: "assets/clientes/instituto-butantan.png",
  medmep: "assets/clientes/medmep-linkedin.jpg",
  gimi: "assets/clientes/gimi.png",
  aqua: "assets/clientes/aqua-capital.png",
  demarest: "assets/clientes/demarest.svg",
  eureciclo: "assets/clientes/eureciclo.svg",
  vr: "assets/clientes/vr.png",
  cyrela: "assets/clientes/cyrela.svg",
  luckscolor: "assets/clientes/luckscolor.png",
  poliedro: "assets/clientes/poliedro.svg"
});

clientLogosWithLabel.clear();

const fallbackIcons = {
  "arrow-right": '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  "badge-check": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 4 4 0 0 1 0-6.75z"/><path d="m9 12 2 2 4-4"/>',
  "brain-circuit": '<path d="M12 5a3 3 0 1 0-5.5 1.7A3 3 0 0 0 5 12a3 3 0 0 0 1.5 5.3A3 3 0 1 0 12 19"/><path d="M12 5a3 3 0 1 1 5.5 1.7A3 3 0 0 1 19 12a3 3 0 0 1-1.5 5.3A3 3 0 1 1 12 19"/><path d="M12 5v14"/><path d="M8 9h2"/><path d="M14 9h2"/><path d="M8 15h2"/><path d="M14 15h2"/>',
  "building-2": '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M6 12H4a2 2 0 0 0-2 2v8"/><path d="M18 9h2a2 2 0 0 1 2 2v11"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  "calendar-days": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>',
  "chart-line": '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  "chart-no-axes-combined": '<path d="M12 16v5"/><path d="M16 14v7"/><path d="M20 10v11"/><path d="m22 3-8.5 8.5-5-5L2 13"/>',
  "check-circle-2": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  "clipboard-check": '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  "cloud-cog": '<path d="M12 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/><path d="M12 10v2"/><path d="M12 20v2"/><path d="m4.9 19.1 1.4-1.4"/><path d="m17.7 12.3 1.4-1.4"/><path d="M2 13.5A5.5 5.5 0 0 1 7.5 8H8a6 6 0 0 1 11.2 2.9A4.5 4.5 0 0 1 19.5 20H18"/>',
  "database": '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
  "graduation-cap": '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  "eye": '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  "handshake": '<path d="m11 17 2 2a2.8 2.8 0 0 0 4-4"/><path d="m14 14 2.5 2.5a2.8 2.8 0 0 0 4-4L13 5l-2.5 2.5a2.8 2.8 0 0 1-4-4L8 2"/><path d="m7 11-2 2a2.8 2.8 0 0 0 4 4l2-2"/><path d="M2 7l5-5"/><path d="m22 7-5-5"/>',
  "heart-handshake": '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 12 5a5.5 5.5 0 0 0-10 3.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.07 1.9"/>',
  "instagram": '<rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  "leaf": '<path d="M11 20A7 7 0 0 1 4 13c0-7 7-10 16-10 0 9-3 16-10 16Z"/><path d="M4 13c5 0 8-2 10-6"/>',
  "linkedin": '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  "lock-keyhole": '<circle cx="12" cy="16" r="1"/><rect width="18" height="12" x="3" y="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/>',
  "map-pin": '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  "menu": '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  "message-circle": '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/>',
  "mic-2": '<path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/>',
  "network": '<circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M10.4 7.6 6.6 16.4"/><path d="m13.6 7.6 3.8 8.8"/><path d="M8 19h8"/>',
  "play": '<path d="m5 3 14 9-14 9V3z"/>',
  "play-circle": '<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/>',
  "rocket": '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-5 12.9 12.9 0 0 1 8-5 12.9 12.9 0 0 1-5 8 22 22 0 0 1-5 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  "settings": '<path d="M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.2a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4a2 2 0 0 0 .7 2.7l.2.1a2 2 0 0 1 1 1.7v.6a2 2 0 0 1-1 1.7l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.2a2 2 0 0 1 1 1.7v.2a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.2a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.7v-.6a2 2 0 0 1 1-1.7l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.2a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/>',
  "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.5a1.3 1.3 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="m9 12 2 2 4-4"/>',
  "sparkles": '<path d="m12 3-1.9 5.8L4 11l6.1 2.2L12 19l1.9-5.8L20 11l-6.1-2.2Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>',
  "target": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  "trending-up": '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  "triangle-alert": '<path d="m21.7 18.4-8.9-15a1 1 0 0 0-1.7 0l-8.9 15A1 1 0 0 0 3 20h18a1 1 0 0 0 .7-1.6Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  "user-round-check": '<path d="M2 21a8 8 0 0 1 13.3-6"/><circle cx="10" cy="8" r="5"/><path d="m16 19 2 2 4-4"/>',
  "users-round": '<path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 21a8 8 0 0 0-6-7.7"/><path d="M16 3.1a5 5 0 0 1 0 9.8"/>',
  "accessibility": '<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.4 3.4"/><path d="M4.2 14.3A7 7 0 1 0 15 18"/>',
  "activity": '<path d="M3 12h4l3-9 4 18 3-9h4"/>',
  "arrow-down": '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  "book-open-check": '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2h5a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3Z"/><path d="M21 15V5a2 2 0 0 0-2-2h-5a3 3 0 0 0-3 3"/><path d="m16 10 1.5 1.5L20 9"/>',
  "brain": '<path d="M9.5 4A3.5 3.5 0 0 0 6 7.5v.3A3.5 3.5 0 0 0 4 14a3.5 3.5 0 0 0 5.5 4.2"/><path d="M14.5 4A3.5 3.5 0 0 1 18 7.5v.3A3.5 3.5 0 0 1 20 14a3.5 3.5 0 0 1-5.5 4.2"/><path d="M12 3v18"/>',
  "briefcase-business": '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M2 13h20"/><path d="M10 13v2h4v-2"/>',
  "calendar-clock": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><circle cx="15" cy="16" r="4"/><path d="M15 14v2l1.5 1"/>',
  "check": '<path d="m20 6-11 11-5-5"/>',
  "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  "contact-round": '<path d="M16 2v2"/><path d="M8 2v2"/><rect width="18" height="18" x="3" y="4" rx="2"/><circle cx="12" cy="10" r="2"/><path d="M8 17a4 4 0 0 1 8 0"/>',
  "copy": '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  "earth": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
  "eraser": '<path d="m7 21-4-4a2 2 0 0 1 0-3L13 4a2 2 0 0 1 3 0l4 4a2 2 0 0 1 0 3L10 21Z"/><path d="m6 11 7 7"/><path d="M7 21h13"/>',
  "file-chart-column": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 18v-3"/><path d="M12 18v-6"/><path d="M16 18v-4"/>',
  "file-pen-line": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="m9 17 1.5-.3 6-6-1.2-1.2-6 6Z"/>',
  "folder-search-2": '<path d="M3 19V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v4"/><circle cx="15" cy="17" r="4"/><path d="m18 20 3 3"/>',
  "gauge": '<path d="M20.5 19a9 9 0 1 0-17 0"/><path d="M12 12 16 8"/><path d="M8 19h8"/>',
  "help-circle": '<circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.7 2.7 0 1 1 4.6 2c-1.1.9-2.1 1.4-2.1 3"/><path d="M12 18h.01"/>',
  "key-round": '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m12 12 8-8"/><path d="m15 9 3 3"/><path d="m17 7 3 3"/>',
  "landmark": '<path d="m3 10 9-6 9 6"/><path d="M5 10v8"/><path d="M9 10v8"/><path d="M15 10v8"/><path d="M19 10v8"/><path d="M3 18h18"/><path d="M2 22h20"/>',
  "lightbulb": '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M8.5 14.5a7 7 0 1 1 7 0c-.9.7-1.5 1.8-1.5 3.5h-4c0-1.7-.6-2.8-1.5-3.5Z"/>',
  "list-filter": '<path d="M3 6h18"/><path d="M6 12h12"/><path d="M10 18h4"/>',
  "mail": '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 6L2 7"/>',
  "megaphone": '<path d="m3 11 18-5v12L3 14Z"/><path d="M11.6 16.6 13 21H7l-1.2-6"/><path d="M3 11v3"/>',
  "message-square-more": '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 11h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/>',
  "messages-square": '<path d="M14 17H7l-4 3V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3Z"/><path d="M17 8h1a3 3 0 0 1 3 3v10l-4-3"/>',
  "presentation": '<path d="M2 3h20"/><path d="M4 3v13h16V3"/><path d="M8 21l4-5 4 5"/><path d="M8 11l3-3 2 2 3-3"/>',
  "recycle": '<path d="m7.3 7.3 2.4-4 2.3 4"/><path d="M9.7 3.3 6 9.5"/><path d="m16.7 7.3 4.6.1-2.3 4"/><path d="M21.3 7.4 17.7 14"/><path d="m15 18.5-2.3 4-2.4-4"/><path d="M12.7 22.5h-7l-3.5-6 2.3-4"/><path d="M18.9 11.5 22 17l-2 3.5h-5"/>',
  "route": '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6 16c0-5 12-3 12-8"/>',
  "scale": '<path d="m16 16 3-8 3 8a5 5 0 0 1-6 0Z"/><path d="m2 16 3-8 3 8a5 5 0 0 1-6 0Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/>',
  "scan-eye": '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M6 12s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4Z"/><circle cx="12" cy="12" r="2"/>',
  "scan-search": '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="11" cy="11" r="4"/><path d="m14 14 3 3"/>',
  "shield": '<path d="M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.5a1.3 1.3 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z"/>',
  "shield-cog": '<path d="M12 22c4-1.4 8-4 8-9V6c-3.5 0-6-1.5-8-3-2 1.5-4.5 3-8 3v7c0 5 4 7.6 8 9Z"/><circle cx="12" cy="12" r="2"/><path d="M12 8v2M12 14v2M8 12h2M14 12h2"/>',
  "sliders-horizontal": '<path d="M21 4h-7"/><path d="M10 4H3"/><path d="M21 12h-9"/><path d="M8 12H3"/><path d="M21 20h-5"/><path d="M12 20H3"/><circle cx="12" cy="4" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="14" cy="20" r="2"/>',
  "undo-2": '<path d="M9 7 4 12l5 5"/><path d="M20 17a7 7 0 0 0-7-7H4"/>',
  "user-round": '<circle cx="12" cy="8" r="5"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  "x": '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  "youtube": '<path d="M2.5 17a24.7 24.7 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.7 24.7 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>'
};

function renderIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  document.querySelectorAll("i[data-lucide]").forEach((node) => {
    const name = node.getAttribute("data-lucide");
    const paths = fallbackIcons[name];
    if (!paths) return;
    node.outerHTML = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  });
}

function renderClientCarousel() {
  if (!clientTrack) return;

  const marqueeClients = [...clients, ...clients];
  clientTrack.innerHTML = marqueeClients
    .map(([label, slug], index) => {
      const sources = getClientLogoSources(slug);
      const hidden = index >= clients.length ? ' aria-hidden="true"' : "";
      const labeled = clientLogosWithLabel.has(slug) ? " client-labeled" : "";
      const image = sources.length
        ? `<img class="client-image" src="${sources[0]}" data-sources="${sources.join("|")}" data-source-index="0" alt="Logo ${label}" loading="eager" decoding="async" />`
        : "";
      return `<span class="client-logo client-${slug}${labeled}" role="img" aria-label="${label}"${hidden}>${image}<span class="client-name">${label}</span></span>`;
    })
    .join("");

  attachClientLogoFallbacks();
}

function getClientLogoSources(slug) {
  const sources = [];
  const localLogo = clientLogoAssets[slug];

  if (localLogo) sources.push(localLogo);

  return sources;
}

function attachClientLogoFallbacks() {
  clientTrack.querySelectorAll(".client-logo").forEach((card) => {
    const image = card.querySelector(".client-image");

    if (!image) {
      card.classList.add("logo-missing");
      return;
    }

    const showLogo = () => card.classList.add("has-logo");
    const showName = () => {
      image.remove();
      card.classList.add("logo-missing");
    };
    const tryNextSource = () => {
      const sources = (image.dataset.sources || "").split("|").filter(Boolean);
      const currentIndex = Number(image.dataset.sourceIndex || 0);
      const nextIndex = currentIndex + 1;

      if (nextIndex < sources.length) {
        image.dataset.sourceIndex = String(nextIndex);
        image.src = sources[nextIndex];
        return;
      }

      showName();
    };

    image.addEventListener("load", showLogo, { once: true });
    image.addEventListener("error", tryNextSource);

    if (image.complete) {
      if (image.naturalWidth > 0) showLogo();
      else tryNextSource();
    }
  });
}

function initClientMarqueePause() {
  const carousel = document.querySelector("[data-client-carousel]");
  if (!carousel || !clientTrack) return;

  const pause = () => {
    clientTrack.style.animationPlayState = "paused";
  };
  const resume = () => {
    clientTrack.style.animationPlayState = "";
  };

  carousel.addEventListener("mouseenter", pause);
  carousel.addEventListener("mouseleave", resume);
  carousel.addEventListener("focusin", pause);
  carousel.addEventListener("focusout", resume);
  carousel.addEventListener("touchstart", pause, { passive: true });
}

function formatMetric(value, prefix = "", suffix = "") {
  return `${prefix}${value}${suffix}`;
}

function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3);
}

function setMetricFinalValues(root) {
  root.querySelectorAll("[data-count-to]").forEach((counter) => {
    const target = Number(counter.dataset.countTo || 0);
    counter.textContent = formatMetric(target, counter.dataset.prefix, counter.dataset.suffix);
  });
}

function animateMetricValue(counter, duration) {
  const target = Number(counter.dataset.countTo || 0);
  const prefix = counter.dataset.prefix || "";
  const suffix = counter.dataset.suffix || "";
  const start = performance.now();

  counter.textContent = formatMetric(0, prefix, suffix);

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const currentValue =
      progress < 1 ? Math.min(target - 1, Math.floor(target * easedProgress)) : target;

    counter.textContent = formatMetric(currentValue, prefix, suffix);

    if (progress < 1) {
      window.requestAnimationFrame(update);
      return;
    }

    counter.textContent = formatMetric(target, prefix, suffix);
  }

  window.requestAnimationFrame(update);
}

function initMetricsAnimation() {
  if (!metricsSection) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const metricItems = metricsSection.querySelectorAll("[data-metric-item]");
  const counters = metricsSection.querySelectorAll("[data-count-to]");
  let hasAnimated = false;

  metricItems.forEach((item, index) => {
    item.style.setProperty("--metric-delay", `${index * 140}ms`);
  });

  function startAnimation() {
    if (hasAnimated) return;
    hasAnimated = true;

    metricsSection.classList.add("is-visible");

    if (reducedMotion) {
      metricsSection.classList.add("is-reduced-motion");
      setMetricFinalValues(metricsSection);
      return;
    }

    counters.forEach((counter, index) => {
      animateMetricValue(counter, 3000 + index * 90);
    });
  }

  if (reducedMotion || !("IntersectionObserver" in window)) {
    startAnimation();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      startAnimation();
      observer.disconnect();
    },
    { threshold: 0.32 }
  );

  observer.observe(metricsSection);
}

function initTimelineAnimation() {
  if (!timelineSection) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const timelineHead = timelineSection.querySelector("[data-timeline-head]");
  const timelineItems = [...timelineSection.querySelectorAll("[data-timeline-item]")];
  const timelineTargets = [timelineHead, ...timelineItems].filter(Boolean);

  if (reducedMotion || !("IntersectionObserver" in window)) {
    timelineTargets.forEach((target) => target.classList.add("is-visible"));
    timelineSection.classList.add("timeline-line-visible");
    return;
  }

  timelineSection.classList.add("timeline-animated");

  const lineObserver = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      timelineSection.classList.add("timeline-line-visible");
      lineObserver.disconnect();
    },
    {
      rootMargin: "0px 0px -18% 0px",
      threshold: 0.22
    }
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16
    }
  );

  lineObserver.observe(timelineSection);
  timelineTargets.forEach((target) => observer.observe(target));
}

function initMissionAnimation() {
  if (!missionSection) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const missionHead = missionSection.querySelector("[data-mission-head]");
  const missionCards = [...missionSection.querySelectorAll("[data-mission-card]")];
  const missionTargets = [missionHead, ...missionCards].filter(Boolean);

  if (reducedMotion || !("IntersectionObserver" in window)) {
    missionTargets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  missionSection.classList.add("is-animated");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16
    }
  );

  missionTargets.forEach((target) => observer.observe(target));
}

function initServicePillarsAnimation() {
  if (!servicePillarsSection) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const items = [...servicePillarsSection.querySelectorAll("[data-service-pillar-item]")];
  let hasAnimated = false;
  let observer;
  servicePillarsSection.classList.add("is-animating");

  const reveal = () => {
    if (hasAnimated) return;
    hasAnimated = true;
    servicePillarsSection.classList.add("is-visible");

    items.forEach((item, index) => {
      window.setTimeout(() => {
        item.classList.add("is-visible");
      }, reducedMotion ? 0 : index * 220);
    });

    if (observer) observer.disconnect();
    window.removeEventListener("scroll", checkVisibility);
    window.removeEventListener("resize", checkVisibility);
  };

  const isSectionInViewport = () => {
    const sectionRect = servicePillarsSection.getBoundingClientRect();
    return sectionRect.top < window.innerHeight * 0.92 && sectionRect.bottom > 80;
  };

  const revealAfterPaint = () => {
    let prepared = false;
    const prepare = () => {
      if (prepared) return;
      prepared = true;
      servicePillarsSection.classList.add("is-ready");
      window.requestAnimationFrame(reveal);
      window.setTimeout(reveal, 80);
    };

    window.requestAnimationFrame(prepare);
    window.setTimeout(prepare, 80);
  };

  if (reducedMotion || !("IntersectionObserver" in window)) {
    reveal();
    return;
  }

  if (isSectionInViewport()) {
    revealAfterPaint();
    return;
  }

  function checkVisibility() {
    if (hasAnimated || !isSectionInViewport()) return;
    revealAfterPaint();
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      revealAfterPaint();
    },
    {
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.12
    }
  );

  servicePillarsSection.classList.add("is-ready");
  observer.observe(servicePillarsSection);
  window.addEventListener("scroll", checkVisibility, { passive: true });
  window.addEventListener("resize", checkVisibility);
  window.setTimeout(checkVisibility, 120);
  window.setTimeout(checkVisibility, 900);
}

function initContactReveals() {
  if (!contactRevealItems.length) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    contactRevealItems.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16
    }
  );

  contactRevealItems.forEach((target) => observer.observe(target));
}

function initEmailTemplateCopy() {
  if (!copyTemplateButton) return;

  const template = document.querySelector("[data-email-template]");
  const feedback = document.querySelector("[data-copy-feedback]");

  copyTemplateButton.addEventListener("click", async () => {
    const text = template?.textContent?.trim();
    if (!text) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      if (feedback) {
        feedback.textContent = "Modelo copiado!";
        window.setTimeout(() => {
          feedback.textContent = "";
        }, 2200);
      }
    } catch {
      if (feedback) {
        feedback.textContent = "Não foi possível copiar agora.";
      }
    }
  });
}

function initContactInstructionsModal() {
  if (!contactModal || !openContactInstructionsButtons.length) return;

  const panel = contactModal.querySelector(".contact-modal-panel");
  let lastFocusedElement = null;

  const openModal = () => {
    lastFocusedElement = document.activeElement;
    contactModal.hidden = false;
    document.body.classList.add("modal-open");
    window.requestAnimationFrame(() => {
      contactModal.classList.add("is-open");
      panel?.focus();
    });
  };

  const closeModal = () => {
    contactModal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    window.setTimeout(() => {
      contactModal.hidden = true;
      lastFocusedElement?.focus?.();
    }, 220);
  };

  openContactInstructionsButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeContactInstructionsButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (contactModal.hidden || event.key !== "Escape") return;
    closeModal();
  });
}

function initContactForms() {
  if (!contactForms.length) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fieldLabels = {
    name: "Nome",
    email: "E-mail",
    phone: "Telefone/WhatsApp",
    company: "Empresa",
    interest: "Área de interesse",
    message: "Mensagem"
  };

  const getValue = (form, name) => form.elements[name]?.value?.trim() || "";

  const setFieldError = (form, name, message = "") => {
    const field = form.elements[name];
    const error = form.querySelector(`[data-error-for="${name}"]`);
    const wrapper = field?.closest(".contact-field");

    wrapper?.classList.toggle("has-error", Boolean(message));
    field?.setAttribute("aria-invalid", String(Boolean(message)));
    if (error) error.textContent = message;
  };

  const clearErrors = (form) => {
    ["name", "email", "phone", "company", "interest", "message"].forEach((name) => setFieldError(form, name));
  };

  const validateForm = (form) => {
    clearErrors(form);
    const errors = {};

    if (!getValue(form, "name")) errors.name = "Informe seu nome.";
    if (!emailPattern.test(getValue(form, "email"))) errors.email = "Informe um e-mail válido.";
    if (!getValue(form, "phone")) errors.phone = "Informe seu telefone ou WhatsApp.";
    if (!getValue(form, "interest")) errors.interest = "Selecione uma área de interesse.";
    if (!getValue(form, "message")) errors.message = "Escreva uma breve mensagem.";

    Object.entries(errors).forEach(([name, message]) => setFieldError(form, name, message));
    return Object.keys(errors).length === 0;
  };

  const buildMailto = (form) => {
    const body = ["name", "email", "phone", "company", "interest", "message"]
      .map((name) => `${fieldLabels[name]}:\n${getValue(form, name) || "-"}`)
      .join("\n\n");

    const subject = encodeURIComponent("Contato pelo site | DVGenesis");
    return `mailto:comercial@idvlabs.com.br?subject=${subject}&body=${encodeURIComponent(body)}`;
  };

  contactForms.forEach((form) => {
    const success = form.querySelector("[data-contact-form-success]");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (success) success.hidden = true;

      if (!validateForm(form)) {
        const firstInvalid = form.querySelector("[aria-invalid='true']");
        firstInvalid?.focus();
        return;
      }

      if (success) success.hidden = false;
      window.location.href = buildMailto(form);
      form.reset();
    });

    form.addEventListener("input", (event) => {
      const field = event.target.closest("input, select, textarea");
      if (!field?.name) return;
      if (success) success.hidden = true;
      setFieldError(form, field.name);
    });

    form.addEventListener("change", (event) => {
      const field = event.target.closest("select");
      if (!field?.name) return;
      if (success) success.hidden = true;
      setFieldError(form, field.name);
    });
  });
}

function renderEventsGallery() {
  if (!eventsGalleryRoot) return;

  eventsGalleryRoot.innerHTML = eventsGalleryItems
    .map(
      (item, index) => `
        <article class="${index === 0 ? "events-gallery-feature" : ""} ${item.image ? "has-image" : ""}">
          <div class="events-gallery-thumb"${item.image ? ` style="background-image: linear-gradient(180deg, rgba(7, 18, 60, 0.12), rgba(7, 18, 60, 0.32)), url('${item.image}')"` : ""}>
            ${item.image ? "" : `<i data-lucide="${item.icon}"></i><span>${item.type}</span>`}
          </div>
          <div class="events-gallery-copy">
            ${
              index === 0
                ? `<div class="events-gallery-feature-content"><div class="events-gallery-feature-heading"><span class="events-gallery-feature-icon"><i data-lucide="mic-2"></i></span><div><h3>${item.title}</h3><span class="events-gallery-feature-line"></span></div></div><p>${item.description}</p><a class="events-gallery-feature-link" href="#experiencias">Explorar experiências <i data-lucide="arrow-right"></i></a></div>`
                : `<h3>${item.title}</h3><p>${item.description}</p>`
            }
          </div>
        </article>
      `
    )
    .join("");
}

function hasCookieTechnology(category) {
  return Boolean(
    document.querySelector(
      `[data-cookie-category="${category}"][data-cookie-src], ` +
        `[data-cookie-category="${category}"][data-cookie-embed], ` +
        `script[type="text/plain"][data-cookie-category="${category}"]`
    )
  );
}

function getCookieCategoryAvailability() {
  return Object.fromEntries(COOKIE_CATEGORIES.map((category) => [category, hasCookieTechnology(category)]));
}

function normalizeCookieConsent(value) {
  if (!value || value.version !== COOKIE_POLICY_VERSION || value.essential !== true) return null;

  return {
    version: COOKIE_POLICY_VERSION,
    timestamp: typeof value.timestamp === "string" ? value.timestamp : null,
    essential: true,
    analytics: value.analytics === true,
    functional: value.functional === true,
    marketing: value.marketing === true
  };
}

function readCookieConsent() {
  try {
    return normalizeCookieConsent(JSON.parse(window.localStorage.getItem(COOKIE_CONSENT_KEY)));
  } catch {
    return null;
  }
}

function persistCookieConsent(selection) {
  const availability = getCookieCategoryAvailability();
  const consent = {
    version: COOKIE_POLICY_VERSION,
    timestamp: new Date().toISOString(),
    essential: true,
    analytics: availability.analytics && selection.analytics === true,
    functional: availability.functional && selection.functional === true,
    marketing: availability.marketing && selection.marketing === true
  };

  cookieConsentState = consent;

  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // The preference still applies to this page when storage is unavailable.
  }

  document.documentElement.dataset.cookieConsent = "saved";
  return consent;
}

function copyAllowedScriptAttributes(source, target) {
  [...source.attributes].forEach((attribute) => {
    if (
      attribute.name === "type" ||
      attribute.name === "src" ||
      attribute.name.startsWith("data-cookie-")
    ) {
      return;
    }
    target.setAttribute(attribute.name, attribute.value);
  });
}

function activateCookieScripts(category) {
  document
    .querySelectorAll(`script[type="text/plain"][data-cookie-category="${category}"]:not([data-cookie-activated])`)
    .forEach((placeholder) => {
      const script = document.createElement("script");
      const source = placeholder.dataset.cookieSrc;

      copyAllowedScriptAttributes(placeholder, script);
      script.dataset.cookieLoaded = category;

      if (source) {
        script.src = source;
      } else {
        script.textContent = placeholder.textContent;
      }

      placeholder.dataset.cookieActivated = "true";
      placeholder.after(script);
    });
}

function activateCookieEmbeds(category) {
  document
    .querySelectorAll(`[data-cookie-embed][data-cookie-category="${category}"]:not([data-cookie-activated])`)
    .forEach((placeholder) => {
      const source = placeholder.dataset.cookieSrc;
      if (!source) return;

      const frame = document.createElement("iframe");
      frame.src = source;
      frame.title = placeholder.dataset.cookieTitle || "Conteúdo externo";
      frame.loading = "lazy";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.allowFullscreen = placeholder.dataset.cookieAllowFullscreen === "true";
      frame.dataset.cookieLoaded = category;

      if (placeholder.dataset.cookieAllow) {
        frame.setAttribute("allow", placeholder.dataset.cookieAllow);
      }

      placeholder.dataset.cookieActivated = "true";
      placeholder.classList.add("is-cookie-content-enabled");
      placeholder.append(frame);
    });
}

function activateCookieCategory(category) {
  activateCookieScripts(category);
  activateCookieEmbeds(category);
}

function clearConfiguredCookies(category) {
  const names = new Set();

  document.querySelectorAll(`[data-cookie-category="${category}"][data-cookie-clear]`).forEach((element) => {
    element.dataset.cookieClear
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean)
      .forEach((name) => names.add(name));
  });

  names.forEach((name) => {
    document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; path=/; SameSite=Lax`;
  });
}

function deactivateCookieCategory(category) {
  const hadRegisteredTechnology = hasCookieTechnology(category);

  document.querySelectorAll(`[data-cookie-loaded="${category}"]`).forEach((element) => element.remove());
  document.querySelectorAll(`[data-cookie-category="${category}"][data-cookie-activated]`).forEach((element) => {
    element.removeAttribute("data-cookie-activated");
    element.classList.remove("is-cookie-content-enabled");
  });
  clearConfiguredCookies(category);

  return hadRegisteredTechnology;
}

function applyCookieConsent(consent) {
  COOKIE_CATEGORIES.forEach((category) => {
    if (consent?.[category] === true) {
      activateCookieCategory(category);
    }
  });
}

function cookieCategoryMarkup({ id, title, description, required = false, available = true }) {
  const control = required
    ? '<span class="cookie-category-required">Sempre ativo</span>'
    : `<label class="cookie-switch">
        <span class="sr-only">Permitir ${title}</span>
        <input type="checkbox" data-cookie-toggle="${id}"${available ? "" : " disabled"} />
        <span class="cookie-switch-track" aria-hidden="true"><span></span></span>
      </label>`;
  const status = !required && !available
    ? '<p class="cookie-category-status">Nenhum serviço desta categoria está configurado atualmente.</p>'
    : "";

  return `
    <article class="cookie-category${available || required ? "" : " is-unavailable"}" data-cookie-panel-category="${id}">
      <div class="cookie-category-copy">
        <h3>${title}</h3>
        <p>${description}</p>
        ${status}
      </div>
      ${control}
    </article>
  `;
}

function buildCookieConsentInterface() {
  if (document.querySelector("[data-cookie-consent-root]")) return;

  const availability = getCookieCategoryAvailability();
  const root = document.createElement("div");
  root.className = "cookie-consent-root";
  root.dataset.cookieConsentRoot = "";
  root.innerHTML = `
    <section class="cookie-banner" data-cookie-banner hidden role="region" aria-labelledby="cookie-banner-title">
      <div class="cookie-banner-accent" aria-hidden="true"></div>
      <p class="cookie-banner-kicker">Privacidade e transparência</p>
      <h2 id="cookie-banner-title">Sua privacidade importa</h2>
      <p>
        Utilizamos cookies necessários para o funcionamento do site e, com sua autorização, cookies de análise e
        outras tecnologias para entender como nosso site é utilizado e melhorar sua experiência. Você pode aceitar
        todos, recusar os cookies não essenciais ou gerenciar suas preferências.
      </p>
      <p class="cookie-banner-links">
        <a href="politica-de-privacidade.html">Política de Privacidade</a>
        <a href="politica-de-cookies.html">Política de Cookies</a>
      </p>
      <div class="cookie-banner-actions">
        <button class="cookie-button cookie-button--primary" type="button" data-cookie-accept-all>Aceitar todos</button>
        <button class="cookie-button cookie-button--secondary" type="button" data-cookie-reject>Recusar não essenciais</button>
        <button class="cookie-button cookie-button--ghost" type="button" data-cookie-manage>Gerenciar preferências</button>
      </div>
    </section>

    <div class="cookie-modal-backdrop" data-cookie-modal hidden>
      <section
        class="cookie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
        aria-describedby="cookie-modal-description"
        tabindex="-1"
      >
        <button class="cookie-modal-close" type="button" data-cookie-close aria-label="Fechar preferências de cookies">×</button>
        <div class="cookie-modal-header">
          <p class="cookie-modal-kicker">Controle e transparência</p>
          <h2 id="cookie-modal-title">Preferências de Cookies</h2>
          <p id="cookie-modal-description">
            Você controla como seus dados são utilizados. Escolha abaixo quais categorias de cookies deseja permitir.
          </p>
        </div>
        <div class="cookie-categories">
          ${cookieCategoryMarkup({
            id: "essential",
            title: "Cookies Essenciais",
            description: "São necessários para o funcionamento adequado e seguro do site e não podem ser desativados através deste painel.",
            required: true
          })}
          ${cookieCategoryMarkup({
            id: "analytics",
            title: "Cookies de Análise e Desempenho",
            description: "Nos ajudam a entender como os visitantes utilizam o site, permitindo analisar desempenho, navegação e oportunidades de melhoria.",
            available: availability.analytics
          })}
          ${cookieCategoryMarkup({
            id: "functional",
            title: "Cookies Funcionais",
            description: "Permitem recursos adicionais e podem lembrar determinadas preferências do visitante.",
            available: availability.functional
          })}
          ${availability.marketing
            ? cookieCategoryMarkup({
                id: "marketing",
                title: "Cookies de Marketing",
                description: "Podem ser utilizados para medir campanhas, compreender interações com conteúdos e tornar comunicações mais relevantes.",
                available: true
              })
            : ""}
        </div>
        <p class="cookie-modal-audit-note"${availability.analytics || availability.functional || availability.marketing ? " hidden" : ""}>
          A auditoria atual do site não identificou serviços não essenciais ativos. Suas escolhas ficarão preparadas para
          futuras integrações e poderão ser alteradas a qualquer momento.
        </p>
        <div class="cookie-modal-actions">
          <button class="cookie-button cookie-button--primary" type="button" data-cookie-save>Salvar preferências</button>
          <button class="cookie-button cookie-button--secondary" type="button" data-cookie-modal-accept-all>Aceitar todos</button>
          <button class="cookie-button cookie-button--ghost" type="button" data-cookie-modal-reject>Recusar não essenciais</button>
        </div>
      </section>
    </div>
  `;

  document.body.append(root);
}

function setCookieBannerVisibility(visible) {
  const banner = document.querySelector("[data-cookie-banner]");
  if (!banner) return;

  if (visible) {
    banner.hidden = false;
    window.requestAnimationFrame(() => banner.classList.add("is-visible"));
    return;
  }

  banner.classList.remove("is-visible");
  window.setTimeout(() => {
    banner.hidden = true;
  }, 260);
}

function updateCookieModalControls() {
  const availability = getCookieCategoryAvailability();
  const base = cookieConsentState || {
    essential: true,
    analytics: false,
    functional: false,
    marketing: false
  };

  COOKIE_CATEGORIES.forEach((category) => {
    const input = document.querySelector(`[data-cookie-toggle="${category}"]`);
    if (!input) return;
    input.disabled = !availability[category];
    input.checked = availability[category] && base[category] === true;
  });
}

function getCookieModalFocusables() {
  const modal = document.querySelector("[data-cookie-modal]");
  if (!modal || modal.hidden) return [];

  return [...modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter((element) => !element.hidden && element.getClientRects().length > 0);
}

function openCookiePreferences(trigger = document.activeElement) {
  const modal = document.querySelector("[data-cookie-modal]");
  if (!modal) return;

  cookieConsentReturnFocus = trigger instanceof HTMLElement ? trigger : null;
  updateCookieModalControls();
  modal.hidden = false;
  document.body.classList.add("cookie-modal-open");
  window.requestAnimationFrame(() => {
    modal.classList.add("is-visible");
    modal.querySelector(".cookie-modal")?.focus();
  });
}

function closeCookiePreferences({ restoreFocus = true } = {}) {
  const modal = document.querySelector("[data-cookie-modal]");
  if (!modal || modal.hidden) return;

  modal.classList.remove("is-visible");
  document.body.classList.remove("cookie-modal-open");
  window.setTimeout(() => {
    modal.hidden = true;
    if (restoreFocus && cookieConsentReturnFocus?.isConnected) {
      cookieConsentReturnFocus.focus();
    }
  }, 220);
}

function saveCookieChoice(selection) {
  const previous = cookieConsentState;
  let requiresReload = false;

  COOKIE_CATEGORIES.forEach((category) => {
    if (previous?.[category] === true && selection[category] !== true) {
      requiresReload = deactivateCookieCategory(category) || requiresReload;
    }
  });

  const consent = persistCookieConsent(selection);
  applyCookieConsent(consent);
  setCookieBannerVisibility(false);
  closeCookiePreferences();

  window.dispatchEvent(new CustomEvent("dvgenesis:consentchange", { detail: { ...consent } }));

  if (requiresReload) {
    window.setTimeout(() => window.location.reload(), 260);
  }
}

function acceptAllCookies() {
  const availability = getCookieCategoryAvailability();
  saveCookieChoice({
    essential: true,
    analytics: availability.analytics,
    functional: availability.functional,
    marketing: availability.marketing
  });
}

function rejectNonEssentialCookies() {
  saveCookieChoice({ essential: true, analytics: false, functional: false, marketing: false });
}

function saveCookieModalPreferences() {
  const availability = getCookieCategoryAvailability();
  const selection = { essential: true };

  COOKIE_CATEGORIES.forEach((category) => {
    const input = document.querySelector(`[data-cookie-toggle="${category}"]`);
    selection[category] = Boolean(availability[category] && input?.checked);
  });

  saveCookieChoice(selection);
}

function handleCookieModalKeyboard(event) {
  const modal = document.querySelector("[data-cookie-modal]");
  if (!modal || modal.hidden) return;

  if (event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    closeCookiePreferences();
    return;
  }

  if (event.key !== "Tab") return;

  const focusable = getCookieModalFocusables();
  if (!focusable.length) {
    event.preventDefault();
    modal.querySelector(".cookie-modal")?.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function initCookieConsent() {
  buildCookieConsentInterface();
  cookieConsentState = readCookieConsent();

  if (cookieConsentState) {
    document.documentElement.dataset.cookieConsent = "saved";
    applyCookieConsent(cookieConsentState);
  } else {
    document.documentElement.dataset.cookieConsent = "pending";
    setCookieBannerVisibility(true);
  }

  document.querySelectorAll("[data-cookie-accept-all], [data-cookie-modal-accept-all]").forEach((button) => {
    button.addEventListener("click", acceptAllCookies);
  });
  document.querySelectorAll("[data-cookie-reject], [data-cookie-modal-reject]").forEach((button) => {
    button.addEventListener("click", rejectNonEssentialCookies);
  });
  document.querySelector("[data-cookie-save]")?.addEventListener("click", saveCookieModalPreferences);
  document.querySelector("[data-cookie-close]")?.addEventListener("click", () => closeCookiePreferences());
  document.querySelector("[data-cookie-manage]")?.addEventListener("click", (event) => {
    openCookiePreferences(event.currentTarget);
  });
  document.querySelectorAll("[data-cookie-preferences]").forEach((button) => {
    button.addEventListener("click", (event) => openCookiePreferences(event.currentTarget));
  });
  document.querySelector("[data-cookie-modal]")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeCookiePreferences();
  });
  document.addEventListener("keydown", handleCookieModalKeyboard, true);
  document.addEventListener("click", (event) => {
    const allowButton = event.target.closest("[data-cookie-allow]");
    if (!allowButton) return;

    const category = allowButton.dataset.cookieAllow;
    if (!COOKIE_CATEGORIES.includes(category) || !hasCookieTechnology(category)) return;

    saveCookieChoice({
      essential: true,
      analytics: category === "analytics" || cookieConsentState?.analytics === true,
      functional: category === "functional" || cookieConsentState?.functional === true,
      marketing: category === "marketing" || cookieConsentState?.marketing === true
    });
  });

  window.DVGenesisConsent = Object.freeze({
    openPreferences: () => openCookiePreferences(),
    getPreferences: () => (cookieConsentState ? { ...cookieConsentState } : null),
    isAllowed: (category) => category === "essential" || cookieConsentState?.[category] === true
  });
}

function paintHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 16);
}

function initGovernanceContact() {
  document.querySelectorAll("[data-dpo-email]").forEach((link) => {
    link.textContent = GOVERNANCE_CONTACTS.dpoEmail;
    link.setAttribute("href", `mailto:${GOVERNANCE_CONTACTS.dpoEmail}`);
  });
}

function initGovernanceReveals() {
  if (!governanceRevealItems.length) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    governanceRevealItems.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1
    }
  );

  governanceRevealItems.forEach((target) => observer.observe(target));
}

function initGovernanceJumpNavigation() {
  if (!governanceJumpLinks.length || !("IntersectionObserver" in window)) return;

  const sections = governanceJumpLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const linkById = new Map(
    governanceJumpLinks.map((link) => [link.getAttribute("href").slice(1), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;

      governanceJumpLinks.forEach((link) => link.classList.remove("is-active"));
      linkById.get(visibleEntry.target.id)?.classList.add("is-active");
    },
    {
      rootMargin: "-28% 0px -60% 0px",
      threshold: [0, 0.1, 0.5]
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function initGovernanceStickyNavigation() {
  if (!governanceJumpShell) return;

  let pinStart = governanceJumpShell.getBoundingClientRect().top + window.scrollY;

  const updatePinnedState = () => {
    const headerOffset = window.innerWidth <= 720 ? 80 : 92;
    const shouldPin = window.scrollY + headerOffset >= pinStart;
    governanceJumpShell.classList.toggle("is-fixed", shouldPin);
    document.body.classList.toggle("has-fixed-governance-nav", shouldPin);
  };

  const measurePinStart = () => {
    governanceJumpShell.classList.remove("is-fixed");
    document.body.classList.remove("has-fixed-governance-nav");
    pinStart = governanceJumpShell.getBoundingClientRect().top + window.scrollY;
    updatePinnedState();
  };

  window.addEventListener("scroll", updatePinnedState, { passive: true });
  window.addEventListener("resize", measurePinStart);
  updatePinnedState();
}

window.addEventListener("scroll", paintHeader, { passive: true });
paintHeader();

menuButton?.addEventListener("click", () => {
  const open = header.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  renderIcons();
});

nav?.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  header.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  if (menuButton) {
    menuButton.innerHTML = '<i data-lucide="menu"></i>';
  }
  renderIcons();
});

window.addEventListener("DOMContentLoaded", () => {
  initCookieConsent();
  renderClientCarousel();
  initClientMarqueePause();
  renderIcons();
  initMetricsAnimation();
  initMissionAnimation();
  initTimelineAnimation();
  initServicePillarsAnimation();
  initContactReveals();
  initEmailTemplateCopy();
  initContactInstructionsModal();
  initContactForms();
  initGovernanceContact();
  initGovernanceReveals();
  initGovernanceJumpNavigation();
  initGovernanceStickyNavigation();
  renderEventsGallery();
  renderIcons();
});
