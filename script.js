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

    const subject = encodeURIComponent("Contato pelo site | IDVLabs");
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
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `
    )
    .join("");
}

function paintHeader() {
  header.classList.toggle("scrolled", window.scrollY > 16);
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
  renderEventsGallery();
  renderIcons();
});
