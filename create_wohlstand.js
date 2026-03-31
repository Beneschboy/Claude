const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3" x 7.5"
pres.author = "Julian – GeoWiKu";
pres.title = "Wohlstandsmaße – BIP, HDI & Glücksindex";

// ── Farbpalette: Ocean + Warm Accents ─────────────────────────────────────
const C = {
  navy:      "0A2540",
  blue:      "0070C0",
  teal:      "0891B2",
  green:     "047857",
  amber:     "D97706",
  red:       "B91C1C",
  purple:    "7C3AED",
  bg:        "F8FAFC",
  card:      "FFFFFF",
  border:    "E2E8F0",
  muted:     "64748B",
  body:      "1E293B",
  light:     "CBD5E1",
  white:     "FFFFFF",
};

const F = { title: "Georgia", body: "Calibri" };

// ── Helpers ───────────────────────────────────────────────────────────────
const makeShadow = () => ({
  type: "outer", blur: 6, offset: 2, angle: 135,
  color: "000000", opacity: 0.10,
});

function addCard(slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.fill || C.card },
    line: { color: C.border, width: 0.75 },
    shadow: makeShadow(),
  });
  if (opts.accentTop) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h: 0.06,
      fill: { color: opts.accentTop },
    });
  }
  if (opts.accentLeft) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.06, h,
      fill: { color: opts.accentLeft },
    });
  }
}

function addBullets(slide, items, x, y, w, h, opts = {}) {
  const textItems = items.map((item, i) => ({
    text: item,
    options: {
      bullet: true,
      fontSize: opts.fontSize || 13,
      fontFace: F.body,
      color: opts.color || C.body,
      breakLine: i < items.length - 1,
      paraSpaceAfter: 4,
    },
  }));
  slide.addText(textItems, { x, y, w, h, valign: "top", margin: 0 });
}

function addFooter(slide, text) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 7.15, w: 13.33, h: 0.35,
    fill: { color: C.white },
    shadow: { type: "outer", blur: 4, offset: 1, angle: 270, color: "000000", opacity: 0.06 },
  });
  slide.addText(text || "Quellen: Weltbank | UNDP | World Happiness Report 2024", {
    x: 0.5, y: 7.18, w: 12.3, h: 0.28,
    fontSize: 9, fontFace: F.body, color: C.muted, margin: 0,
  });
}

function addDataCard(slide, x, y, w, h, title, val, unit, accent, sub) {
  addCard(slide, x, y, w, h, { accentLeft: accent });
  slide.addText(title, {
    x: x + 0.2, y: y + 0.1, w: w - 0.35, h: 0.25,
    fontSize: 11, fontFace: F.body, color: C.muted, margin: 0,
  });
  slide.addText(val, {
    x: x + 0.2, y: y + 0.33, w: w - 0.35, h: 0.5,
    fontSize: 28, fontFace: F.title, bold: true, color: accent, margin: 0,
  });
  slide.addText(unit, {
    x: x + 0.2, y: y + 0.82, w: w - 0.35, h: 0.22,
    fontSize: 11, fontFace: F.body, color: C.body, margin: 0,
  });
  if (sub) {
    slide.addText(sub, {
      x: x + 0.2, y: y + 1.05, w: w - 0.35, h: 0.22,
      fontSize: 10, fontFace: F.body, italic: true, color: C.muted, margin: 0,
    });
  }
}


// ════════════════════════════════════════════════════════════════════════════
// FOLIE 1 – Titelfolie
// ════════════════════════════════════════════════════════════════════════════
let s = pres.addSlide();
s.background = { color: C.navy };

// Drei Kreise
const circles = [
  { x: 1.8, label: "BIP", sub: "Wirtschaft", color: C.blue },
  { x: 5.25, label: "HDI", sub: "Entwicklung", color: C.green },
  { x: 8.7, label: "WHR", sub: "Glück", color: C.amber },
];
circles.forEach(c => {
  s.addShape(pres.shapes.OVAL, {
    x: c.x, y: 1.2, w: 2.8, h: 2.8,
    fill: { color: c.color, transparency: 15 },
  });
  s.addText(c.label, {
    x: c.x, y: 1.8, w: 2.8, h: 1.2,
    fontSize: 36, fontFace: F.title, bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText(c.sub, {
    x: c.x, y: 3.0, w: 2.8, h: 0.5,
    fontSize: 13, fontFace: F.body, color: C.light,
    align: "center", margin: 0,
  });
});

s.addText("WOHLSTANDSMASSE", {
  x: 0.5, y: 4.4, w: 12.3, h: 1.0,
  fontSize: 48, fontFace: F.title, bold: true, color: C.white,
  align: "center", charSpacing: 6, margin: 0,
});
s.addText("Wie messen wir den Wohlstand einer Gesellschaft?", {
  x: 0.5, y: 5.4, w: 12.3, h: 0.6,
  fontSize: 18, fontFace: F.body, italic: true, color: C.light,
  align: "center", margin: 0,
});
s.addText("GW-Oberstufe  |  Österreich im Fokus", {
  x: 0.5, y: 6.1, w: 12.3, h: 0.5,
  fontSize: 14, fontFace: F.body, color: C.muted,
  align: "center", margin: 0,
});


// ════════════════════════════════════════════════════════════════════════════
// FOLIE 2 – Was ist Wohlstand?
// ════════════════════════════════════════════════════════════════════════════
s = pres.addSlide();
s.background = { color: C.bg };

s.addText("Was ist Wohlstand?", {
  x: 0.5, y: 0.3, w: 12.3, h: 0.7,
  fontSize: 36, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
s.addText("Verschiedene Perspektiven auf gesellschaftliches Wohlergehen", {
  x: 0.5, y: 1.0, w: 12.3, h: 0.4,
  fontSize: 14, fontFace: F.body, color: C.muted, margin: 0,
});

const perspectives = [
  { icon: "$", accent: C.blue, title: "Materieller Wohlstand",
    bullets: ["Einkommen & Konsum", "Güter & Dienstleistungen", "Wirtschaftswachstum", "Lebensstandard"] },
  { icon: "H", accent: C.green, title: "Menschliche Entwicklung",
    bullets: ["Gesundheit & Lebenserwartung", "Bildung & Wissen", "Würdiger Lebensstandard", "Chancengleichheit"] },
  { icon: "\u263A", accent: C.amber, title: "Subjektives Wohlbefinden",
    bullets: ["Lebenszufriedenheit", "Soziale Unterstützung", "Freiheit & Selbstbestimmung", "Vertrauen in Institutionen"] },
];

perspectives.forEach((p, i) => {
  const x = 0.5 + i * 4.2;
  s.addShape(pres.shapes.OVAL, {
    x: x + 1.3, y: 1.7, w: 1.0, h: 1.0,
    fill: { color: p.accent },
  });
  s.addText(p.icon, {
    x: x + 1.3, y: 1.8, w: 1.0, h: 0.8,
    fontSize: 28, fontFace: F.title, bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0,
  });
  addCard(s, x, 2.95, 3.9, 3.8, { accentTop: p.accent });
  s.addText(p.title, {
    x: x + 0.2, y: 3.15, w: 3.5, h: 0.45,
    fontSize: 18, fontFace: F.title, bold: true, color: C.navy, margin: 0,
  });
  addBullets(s, p.bullets, x + 0.2, 3.65, 3.5, 2.8, { fontSize: 14 });
});

s.addText("Kein einzelner Indikator kann Wohlstand vollständig erfassen – deshalb gibt es verschiedene Messansätze.", {
  x: 0.5, y: 6.9, w: 12.3, h: 0.2,
  fontSize: 12, fontFace: F.body, italic: true, color: C.muted,
  align: "center", margin: 0,
});
addFooter(s);


// ════════════════════════════════════════════════════════════════════════════
// FOLIE 3 – BIP: Das Bruttoinlandsprodukt
// ════════════════════════════════════════════════════════════════════════════
s = pres.addSlide();
s.background = { color: C.bg };

s.addText("BIP: Das Bruttoinlandsprodukt", {
  x: 0.5, y: 0.3, w: 12.3, h: 0.7,
  fontSize: 36, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
s.addText("Der meistverwendete Indikator für wirtschaftliche Leistung", {
  x: 0.5, y: 1.0, w: 12.3, h: 0.4,
  fontSize: 14, fontFace: F.body, color: C.muted, margin: 0,
});

// Definition
addCard(s, 0.5, 1.6, 7.8, 1.1, { accentLeft: C.blue });
s.addText([
  { text: "Definition", options: { fontSize: 12, bold: true, color: C.blue, fontFace: F.body, breakLine: true } },
  { text: "Das BIP misst den Gesamtwert aller Waren und Dienstleistungen, die innerhalb eines Landes in einem bestimmten Zeitraum produziert werden. In Österreich wird es von der Statistik Austria berechnet.",
    options: { fontSize: 13, color: C.body, fontFace: F.body } },
], { x: 0.75, y: 1.68, w: 7.3, h: 0.9, valign: "top", margin: 0 });

// Formel
s.addShape(pres.shapes.RECTANGLE, {
  x: 8.6, y: 1.6, w: 4.25, h: 1.1,
  fill: { color: C.navy }, shadow: makeShadow(),
});
s.addText([
  { text: "BIP = C + I + G + (X \u2013 M)", options: { fontSize: 20, bold: true, color: C.white, fontFace: F.title, breakLine: true, align: "center" } },
  { text: "Konsum + Investitionen + Staat + Nettoexporte", options: { fontSize: 11, color: C.light, fontFace: F.body, align: "center" } },
], { x: 8.6, y: 1.7, w: 4.25, h: 0.9, align: "center", valign: "middle", margin: 0 });

// Datenkarten: AT – EU – Welt Vergleich
addDataCard(s, 0.5, 3.0, 3.0, 1.5,
  "BIP Österreich 2023", "471", "Mrd. EUR", C.blue,
  "Platz 28 weltweit");
addDataCard(s, 3.7, 3.0, 3.0, 1.5,
  "BIP/Kopf Österreich", "52.130", "EUR pro Person", C.blue,
  "EU-Schnitt: 38.200 EUR");
addDataCard(s, 6.9, 3.0, 3.0, 1.5,
  "BIP/Kopf EU-27", "38.200", "EUR pro Person", C.teal,
  "Österreich +36 % darüber");
addDataCard(s, 10.1, 3.0, 2.75, 1.5,
  "BIP/Kopf weltweit", "12.740", "USD (Weltbank 2023)", C.muted,
  "Große Unterschiede");

// Stärken & Schwächen
addCard(s, 0.5, 4.8, 6.05, 2.15, { accentTop: C.green });
s.addText("Stärken des BIP", {
  x: 0.7, y: 5.0, w: 5.65, h: 0.4,
  fontSize: 16, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
addBullets(s, [
  "International vergleichbar & standardisiert",
  "Einfach, transparent & gut dokumentiert",
  "Lange Zeitreihen verfügbar (AT seit 1950er)",
  "Guter Konjunkturindikator",
], 0.7, 5.4, 5.65, 1.4);

addCard(s, 6.8, 4.8, 6.05, 2.15, { accentTop: C.red });
s.addText("Schwächen des BIP", {
  x: 7.0, y: 5.0, w: 5.65, h: 0.4,
  fontSize: 16, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
addBullets(s, [
  "Ignoriert Verteilung (arm vs. reich)",
  "Unbezahlte Arbeit (Pflege, Haushalt) nicht erfasst",
  "Umweltschäden nicht berücksichtigt",
  "Sagt nichts über Lebensqualität",
], 7.0, 5.4, 5.65, 1.4);

addFooter(s, "Quellen: Statistik Austria (statistik.at), Daten 2023 | Weltbank (data.worldbank.org), Daten 2023");


// ════════════════════════════════════════════════════════════════════════════
// FOLIE 4 – BIP: Österreich im europäischen Vergleich
// ════════════════════════════════════════════════════════════════════════════
s = pres.addSlide();
s.background = { color: C.bg };

s.addText("BIP pro Kopf: Österreich im Vergleich", {
  x: 0.5, y: 0.3, w: 12.3, h: 0.7,
  fontSize: 36, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
s.addText("Kaufkraftstandards (KKS) im europäischen und globalen Vergleich, 2023", {
  x: 0.5, y: 1.0, w: 12.3, h: 0.4,
  fontSize: 14, fontFace: F.body, color: C.muted, margin: 0,
});

// Horizontale Balken – AT im Kontext
const bipRanking = [
  { land: "Luxemburg", val: 131, kks: "79.640", color: C.muted },
  { land: "Irland", val: 119, kks: "72.250", color: C.muted },
  { land: "Schweiz", val: 109, kks: "66.100", color: C.muted },
  { land: "Niederlande", val: 97, kks: "58.860", color: C.teal },
  { land: "Österreich", val: 93, kks: "56.430", color: C.blue },
  { land: "Deutschland", val: 88, kks: "53.390", color: C.teal },
  { land: "EU-27 Schnitt", val: 78, kks: "38.200", color: C.muted },
  { land: "Ungarn", val: 53, kks: "32.150", color: C.muted },
  { land: "Bulgarien", val: 40, kks: "24.270", color: C.muted },
  { land: "Welt-Schnitt", val: 30, kks: "12.740", color: C.amber },
];

s.addText("Land", {
  x: 0.5, y: 1.55, w: 1.6, h: 0.35,
  fontSize: 11, fontFace: F.body, bold: true, color: C.muted, margin: 0,
});
s.addText("BIP/Kopf (KKS in EUR)", {
  x: 2.3, y: 1.55, w: 4, h: 0.35,
  fontSize: 11, fontFace: F.body, bold: true, color: C.muted, margin: 0,
});

bipRanking.forEach((r, i) => {
  const y = 1.95 + i * 0.47;
  const bg = i % 2 === 0 ? C.card : C.bg;
  const isAT = r.land === "Österreich";
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y, w: 7.7, h: 0.45,
    fill: { color: isAT ? "EFF6FF" : bg },
    line: { color: C.border, width: 0.5 },
  });
  s.addText(r.land, {
    x: 0.6, y: y + 0.05, w: 1.6, h: 0.35,
    fontSize: 12, fontFace: F.body, bold: isAT, color: isAT ? C.blue : C.body, margin: 0,
  });
  const barW = (r.val / 135) * 4.0;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 2.3, y: y + 0.08, w: barW, h: 0.28,
    fill: { color: r.color },
  });
  s.addText(r.kks, {
    x: 2.35 + barW + 0.1, y: y + 0.05, w: 1.0, h: 0.35,
    fontSize: 11, fontFace: F.body, bold: isAT, color: r.color, margin: 0,
  });
});

// Infobox rechts
addCard(s, 8.5, 1.55, 4.35, 2.8, { accentTop: C.blue });
s.addText("Österreich im Fokus", {
  x: 8.7, y: 1.75, w: 3.95, h: 0.4,
  fontSize: 16, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
addBullets(s, [
  "BIP/Kopf ca. 36 % über EU-Schnitt",
  "Platz 5 in der EU (KKS-bereinigt)",
  "Starker Dienstleistungssektor (71 %)",
  "Tourismus = ca. 7 % des BIP",
  "Wichtigster Handelspartner: Deutschland",
], 8.7, 2.2, 3.95, 2.0, { fontSize: 12 });

addCard(s, 8.5, 4.6, 4.35, 2.35, { accentTop: C.amber });
s.addText("Wusstest du?", {
  x: 8.7, y: 4.8, w: 3.95, h: 0.4,
  fontSize: 16, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
addBullets(s, [
  "Katar hat das höchste BIP/Kopf weltweit – aber nur Platz 35 im Glücksindex",
  "Österreichs BIP wuchs 2023 nur +0,1 % (Energiekrise, Inflation)",
  "Wien allein erwirtschaftet ca. 26 % des österreichischen BIP",
], 8.7, 5.25, 3.95, 1.5, { fontSize: 12 });

addFooter(s, "Quellen: Eurostat (ec.europa.eu/eurostat), KKS-Daten 2023 | Statistik Austria, VGR 2023");


// ════════════════════════════════════════════════════════════════════════════
// FOLIE 5 – HDI: Human Development Index
// ════════════════════════════════════════════════════════════════════════════
s = pres.addSlide();
s.background = { color: C.bg };

s.addText("HDI: Human Development Index", {
  x: 0.5, y: 0.3, w: 12.3, h: 0.7,
  fontSize: 36, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
s.addText("Mehrdimensionales Maß der menschlichen Entwicklung (UNDP, seit 1990)", {
  x: 0.5, y: 1.0, w: 12.3, h: 0.4,
  fontSize: 14, fontFace: F.body, color: C.muted, margin: 0,
});

// Drei Dimensionen
const dims = [
  { num: "1", title: "Gesundheit", sub: "Langes, gesundes Leben",
    measure: "Lebenserwartung\nbei Geburt",
    at: "AT: 82,0 J.", eu: "EU: 80,1 J.", world: "Welt: 73,4 J.", color: C.blue },
  { num: "2", title: "Bildung", sub: "Zugang zu Wissen",
    measure: "Erwartete & mittlere\nSchuljahre",
    at: "AT: 16,2 / 12,4", eu: "EU: 16,0 / 12,1", world: "Welt: 12,7 / 8,7", color: C.green },
  { num: "3", title: "Lebensstandard", sub: "Würdiges Leben",
    measure: "BNE pro Kopf\n(Kaufkraftparität)",
    at: "AT: 58.530 $", eu: "EU: ~48.000 $", world: "Welt: 16.150 $", color: C.amber },
];

dims.forEach((d, i) => {
  const x = 0.5 + i * 4.2;
  addCard(s, x, 1.55, 3.9, 3.35, { accentTop: d.color });
  s.addShape(pres.shapes.OVAL, {
    x: x + 1.45, y: 1.8, w: 0.9, h: 0.9,
    fill: { color: d.color },
  });
  s.addText(d.num, {
    x: x + 1.45, y: 1.85, w: 0.9, h: 0.8,
    fontSize: 26, fontFace: F.title, bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText(d.title, {
    x: x + 0.15, y: 2.85, w: 3.6, h: 0.35,
    fontSize: 20, fontFace: F.title, bold: true, color: C.navy,
    align: "center", margin: 0,
  });
  s.addText(d.sub, {
    x: x + 0.15, y: 3.2, w: 3.6, h: 0.25,
    fontSize: 12, fontFace: F.body, italic: true, color: C.muted,
    align: "center", margin: 0,
  });
  s.addText(d.measure, {
    x: x + 0.15, y: 3.5, w: 3.6, h: 0.4,
    fontSize: 12, fontFace: F.body, color: C.body, align: "center", margin: 0,
  });
  // AT / EU / Welt Mini-Karten
  const miniW = 1.15;
  [{ label: d.at, clr: d.color, bold: true }, { label: d.eu, clr: C.teal, bold: false }, { label: d.world, clr: C.body, bold: false }].forEach((m, j) => {
    const mx = x + 0.12 + j * 1.22;
    s.addShape(pres.shapes.RECTANGLE, {
      x: mx, y: 4.0, w: miniW, h: 0.55,
      fill: { color: C.bg }, line: { color: C.border, width: 0.5 },
    });
    s.addText(m.label, {
      x: mx, y: 4.07, w: miniW, h: 0.4,
      fontSize: 10, fontFace: F.body, bold: m.bold, color: m.clr,
      align: "center", valign: "middle", margin: 0,
    });
  });
});

// Formel
s.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 5.15, w: 12.35, h: 0.6,
  fill: { color: C.navy }, shadow: makeShadow(),
});
s.addText("HDI  =  \u00B3\u221A( Gesundheitsindex  \u00D7  Bildungsindex  \u00D7  Einkommensindex )", {
  x: 0.5, y: 5.2, w: 12.35, h: 0.5,
  fontSize: 20, fontFace: F.title, bold: true, color: C.white,
  align: "center", valign: "middle", margin: 0,
});

// HDI Datenkarten
addDataCard(s, 0.5, 6.0, 3.0, 0.9,
  "HDI Österreich", "0,926", "Rang 18 von 193", C.blue);
addDataCard(s, 3.7, 6.0, 3.0, 0.9,
  "HDI Schweiz (#1)", "0,967", "Höchster HDI", C.green);
addDataCard(s, 6.9, 6.0, 3.0, 0.9,
  "HDI Süd-Sudan (letzter)", "0,285", "Niedrigster HDI", C.red);
addDataCard(s, 10.1, 6.0, 2.75, 0.9,
  "HDI Welt-Schnitt", "0,741", "Mittelwert", C.muted);

addFooter(s, "Quellen: UNDP Human Development Report 2024 (hdr.undp.org), Daten 2023");


// ════════════════════════════════════════════════════════════════════════════
// FOLIE 6 – Glücksindex (World Happiness Report)
// ════════════════════════════════════════════════════════════════════════════
s = pres.addSlide();
s.background = { color: C.bg };

s.addText("World Happiness Report", {
  x: 0.5, y: 0.3, w: 12.3, h: 0.7,
  fontSize: 36, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
s.addText("Subjektives Wohlbefinden im internationalen Vergleich (seit 2012)", {
  x: 0.5, y: 1.0, w: 12.3, h: 0.4,
  fontSize: 14, fontFace: F.body, color: C.muted, margin: 0,
});

// Methode
addCard(s, 0.5, 1.55, 12.35, 0.85, { accentLeft: C.amber });
s.addText([
  { text: "Methode: ", options: { fontSize: 13, bold: true, color: C.amber, fontFace: F.body } },
  { text: "Menschen bewerten ihr Leben auf der Cantril-Leiter (0 = schlechtestes, 10 = bestmögliches Leben). Der Länderdurchschnitt ergibt den Happiness Score.",
    options: { fontSize: 13, color: C.body, fontFace: F.body } },
], { x: 0.75, y: 1.65, w: 11.9, h: 0.65, valign: "middle", margin: 0 });

// 6 Faktoren
s.addText("Die 6 Erklärungsfaktoren", {
  x: 0.5, y: 2.6, w: 6, h: 0.35,
  fontSize: 15, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});

const factors = [
  { name: "BIP pro Kopf", desc: "Wirtschaftliche\nGrundlage", color: C.blue },
  { name: "Soziale\nUnterstützung", desc: "Familie &\nFreunde", color: C.green },
  { name: "Lebens-\nerwartung", desc: "Gesunde\nLebensjahre", color: C.teal },
  { name: "Freiheit", desc: "Eigene Entschei-\ndungen treffen", color: C.amber },
  { name: "Großzügigkeit", desc: "Spenden &\nHelfen", color: C.purple },
  { name: "Korruptions-\nfreiheit", desc: "Vertrauen in\nInstitutionen", color: C.red },
];

factors.forEach((f, i) => {
  const x = 0.5 + i * 2.1;
  addCard(s, x, 3.0, 1.9, 1.6, { accentTop: f.color });
  s.addText(f.name, {
    x: x + 0.1, y: 3.2, w: 1.7, h: 0.6,
    fontSize: 12, fontFace: F.body, bold: true, color: C.navy,
    align: "center", valign: "top", margin: 0,
  });
  s.addText(f.desc, {
    x: x + 0.1, y: 3.8, w: 1.7, h: 0.5,
    fontSize: 10, fontFace: F.body, color: C.muted,
    align: "center", margin: 0,
  });
});

// Ranking
s.addText("Top 5 & Österreich", {
  x: 0.5, y: 4.85, w: 5, h: 0.35,
  fontSize: 15, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});

const ranking = [
  { rank: "1.", country: "Finnland", score: 7.74, color: C.amber },
  { rank: "2.", country: "Dänemark", score: 7.58, color: C.amber },
  { rank: "3.", country: "Island", score: 7.53, color: C.amber },
  { rank: "4.", country: "Schweiz", score: 7.49, color: C.green },
  { rank: "5.", country: "Niederlande", score: 7.42, color: C.green },
  { rank: "14.", country: "Österreich", score: 7.08, color: C.blue },
];

ranking.forEach((r, i) => {
  const y = 5.25 + i * 0.3;
  const isAT = r.country === "Österreich";
  const bg = isAT ? "EFF6FF" : (i % 2 === 0 ? C.card : C.bg);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y, w: 5.8, h: 0.3,
    fill: { color: bg }, line: { color: C.border, width: 0.5 },
  });
  s.addText(r.rank, {
    x: 0.6, y: y + 0.02, w: 0.5, h: 0.26,
    fontSize: 12, fontFace: F.body, bold: true, color: r.color, margin: 0,
  });
  s.addText(r.country, {
    x: 1.15, y: y + 0.02, w: 1.8, h: 0.26,
    fontSize: 12, fontFace: F.body, bold: isAT, color: C.body, margin: 0,
  });
  const barW = (r.score / 10.0) * 2.2;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.1, y: y + 0.06, w: barW, h: 0.18,
    fill: { color: r.color },
  });
  s.addText(r.score.toFixed(2).replace(".", ","), {
    x: 3.1 + barW + 0.08, y: y + 0.02, w: 0.6, h: 0.26,
    fontSize: 11, fontFace: F.body, bold: true, color: r.color, margin: 0,
  });
});

// Besonderheiten + AT-Fokus
addCard(s, 6.6, 4.85, 6.25, 2.0, { accentTop: C.amber });
s.addText("Österreich im Glücksindex", {
  x: 6.8, y: 5.05, w: 5.85, h: 0.4,
  fontSize: 16, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
addBullets(s, [
  "Platz 14 von 143 Ländern (Score: 7,08)",
  "Stärken: soziale Sicherheit, Gesundheitssystem",
  "Schwäche: Vertrauen in Politik unter EU-Schnitt",
  "Kultureller Faktor: Österreicher antworten eher zurückhaltend",
], 6.8, 5.5, 5.85, 1.2, { fontSize: 12 });

addFooter(s, "Quellen: World Happiness Report 2024 (worldhappiness.report) | Gallup World Poll, Daten 2021–2023");


// ════════════════════════════════════════════════════════════════════════════
// FOLIE 7 – Vergleichstabelle
// ════════════════════════════════════════════════════════════════════════════
s = pres.addSlide();
s.background = { color: C.bg };

s.addText("Vergleich: BIP vs. HDI vs. Glücksindex", {
  x: 0.5, y: 0.3, w: 12.3, h: 0.7,
  fontSize: 36, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
s.addText("Jeder Indikator hat Stärken und blinde Flecken", {
  x: 0.5, y: 1.0, w: 12.3, h: 0.4,
  fontSize: 14, fontFace: F.body, color: C.muted, margin: 0,
});

const colX = [0.5, 3.65, 6.65, 9.95];
const colW = [3.0, 2.85, 3.15, 2.9];

// Header
s.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.55, w: 12.35, h: 0.5,
  fill: { color: C.navy },
});
["Kriterium", "BIP", "HDI", "Glücksindex"].forEach((h, j) => {
  s.addText(h, {
    x: colX[j], y: 1.57, w: colW[j], h: 0.46,
    fontSize: 13, fontFace: F.body, bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0,
  });
});

[C.blue, C.green, C.amber].forEach((c, j) => {
  s.addShape(pres.shapes.RECTANGLE, {
    x: colX[j + 1], y: 2.05, w: colW[j + 1], h: 0.04,
    fill: { color: c },
  });
});

const rows = [
  ["Was wird gemessen?", "Wirtschaftsleistung\n(Geldwert)", "Menschl. Entwicklung\n(Gesundh., Bild., Eink.)", "Subjektives Wohlbefinden\n(Lebenszufriedenheit)"],
  ["Datentyp", "Objektiv / monetär", "Objektiv / mehrdimensional", "Subjektiv / Befragung"],
  ["Erfasst Verteilung?", "Nein", "Teilweise (IHDI)", "Indirekt"],
  ["Erfasst Umwelt?", "Nein", "Nein", "Nein"],
  ["Erfasst Gesundheit?", "Nein", "Ja (Lebenserwartung)", "Ja (als Faktor)"],
  ["Erfasst Bildung?", "Nein", "Ja (Schuljahre)", "Indirekt"],
  ["Kulturelle Verzerrung?", "Gering", "Gering", "Hoch"],
  ["Rang Österreich", "Platz ~28", "Platz 18", "Platz 14"],
];

rows.forEach((row, i) => {
  const y = 2.12 + i * 0.6;
  const bg = i % 2 === 0 ? C.card : C.bg;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y, w: 12.35, h: 0.6,
    fill: { color: bg }, line: { color: C.border, width: 0.5 },
  });
  row.forEach((cell, j) => {
    s.addText(cell, {
      x: colX[j] + 0.1, y: y + 0.03, w: colW[j] - 0.2, h: 0.54,
      fontSize: 11, fontFace: F.body,
      bold: j === 0, color: j === 0 ? C.navy : C.body,
      align: j === 0 ? "left" : "center", valign: "middle", margin: 0,
    });
  });
});

addFooter(s);


// ════════════════════════════════════════════════════════════════════════════
// FOLIE 8 – Länderbeispiele
// ════════════════════════════════════════════════════════════════════════════
s = pres.addSlide();
s.background = { color: C.bg };

s.addText("Gleiches Land – verschiedene Ränge", {
  x: 0.5, y: 0.3, w: 12.3, h: 0.7,
  fontSize: 36, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
s.addText("Warum die Wahl des Indikators entscheidend ist", {
  x: 0.5, y: 1.0, w: 12.3, h: 0.4,
  fontSize: 14, fontFace: F.body, color: C.muted, margin: 0,
});

const countries = [
  { name: "Österreich", accent: C.blue,
    metrics: [
      { label: "BIP/Kopf", value: "52.130 EUR", rank: "Platz ~28" },
      { label: "HDI", value: "0,926", rank: "Platz 18" },
      { label: "Happiness", value: "7,08", rank: "Platz 14" },
    ] },
  { name: "USA", accent: C.teal,
    metrics: [
      { label: "BIP/Kopf", value: "76.330 USD", rank: "Platz 7" },
      { label: "HDI", value: "0,927", rank: "Platz 17" },
      { label: "Happiness", value: "6,73", rank: "Platz 23" },
    ] },
  { name: "Costa Rica", accent: C.green,
    metrics: [
      { label: "BIP/Kopf", value: "13.670 USD", rank: "Platz 80" },
      { label: "HDI", value: "0,806", rank: "Platz 58" },
      { label: "Happiness", value: "7,13", rank: "Platz 12" },
    ] },
  { name: "Katar", accent: C.amber,
    metrics: [
      { label: "BIP/Kopf", value: "87.660 USD", rank: "Platz 4" },
      { label: "HDI", value: "0,875", rank: "Platz 42" },
      { label: "Happiness", value: "6,32", rank: "Platz 35" },
    ] },
];

countries.forEach((co, i) => {
  const x = 0.5 + i * 3.15;
  addCard(s, x, 1.55, 2.95, 4.5, { accentTop: co.accent });
  s.addText(co.name, {
    x: x + 0.1, y: 1.75, w: 2.75, h: 0.5,
    fontSize: 22, fontFace: F.title, bold: true, color: C.navy,
    align: "center", margin: 0,
  });

  co.metrics.forEach((m, j) => {
    const y = 2.4 + j * 1.15;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15, y, w: 2.65, h: 1.0,
      fill: { color: C.bg }, line: { color: C.border, width: 0.5 },
    });
    s.addText(m.label, {
      x: x + 0.25, y: y + 0.05, w: 2.45, h: 0.22,
      fontSize: 10, fontFace: F.body, color: C.muted, margin: 0,
    });
    s.addText(m.value, {
      x: x + 0.25, y: y + 0.25, w: 2.45, h: 0.4,
      fontSize: 22, fontFace: F.title, bold: true, color: co.accent,
      align: "center", margin: 0,
    });
    s.addText(m.rank, {
      x: x + 0.25, y: y + 0.68, w: 2.45, h: 0.25,
      fontSize: 11, fontFace: F.body, italic: true, color: C.body,
      align: "center", margin: 0,
    });
  });
});

// Erkenntnis
s.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 6.25, w: 12.35, h: 0.7,
  fill: { color: C.navy }, shadow: makeShadow(),
});
s.addText("Erkenntnis: Ein hohes BIP garantiert weder hohe Lebenszufriedenheit noch gute menschliche Entwicklung. Costa Rica zeigt: auch mit weniger Wirtschaftskraft ist ein hoher Happiness-Score möglich.", {
  x: 0.7, y: 6.3, w: 11.95, h: 0.6,
  fontSize: 13, fontFace: F.body, color: C.white,
  align: "center", valign: "middle", margin: 0,
});

addFooter(s, "Quellen: Weltbank (data.worldbank.org) 2023 | UNDP (hdr.undp.org) 2024 | WHR (worldhappiness.report) 2024");


// ════════════════════════════════════════════════════════════════════════════
// FOLIE 9 – Fazit & Diskussion
// ════════════════════════════════════════════════════════════════════════════
s = pres.addSlide();
s.background = { color: C.bg };

s.addText("Fazit & Diskussion", {
  x: 0.5, y: 0.3, w: 12.3, h: 0.7,
  fontSize: 36, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
s.addText("Wohlstand ist mehr als Geld – aber wie messen wir ihn am besten?", {
  x: 0.5, y: 1.0, w: 12.3, h: 0.4,
  fontSize: 14, fontFace: F.body, color: C.muted, margin: 0,
});

const fazit = [
  { icon: "$", accent: C.blue, title: "BIP",
    bullets: ["Unverzichtbar für Wirtschaftspolitik", "Aber: kein Maß für Lebensqualität", "Allein nicht aussagekräftig genug"] },
  { icon: "H", accent: C.green, title: "HDI",
    bullets: ["Breiterer Blick als das BIP", "Erfasst Gesundheit & Bildung", "Aber: keine Umwelt- oder Verteilungsdaten"] },
  { icon: "\u263A", accent: C.amber, title: "Glücksindex",
    bullets: ["Erfasst was Menschen wirklich fühlen", "Zeigt: Geld allein ist nicht alles", "Aber: kulturell verzerrt & subjektiv"] },
];

fazit.forEach((f, i) => {
  const x = 0.5 + i * 4.2;
  s.addShape(pres.shapes.OVAL, {
    x: x + 1.45, y: 1.6, w: 0.9, h: 0.9,
    fill: { color: f.accent },
  });
  s.addText(f.icon, {
    x: x + 1.45, y: 1.65, w: 0.9, h: 0.8,
    fontSize: 24, fontFace: F.title, bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0,
  });
  addCard(s, x, 2.7, 3.9, 2.3, { accentTop: f.accent });
  s.addText(f.title, {
    x: x + 0.2, y: 2.9, w: 3.5, h: 0.4,
    fontSize: 18, fontFace: F.title, bold: true, color: C.navy, margin: 0,
  });
  addBullets(s, f.bullets, x + 0.2, 3.35, 3.5, 1.5, { fontSize: 13 });
});

// Kernaussage
s.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 5.25, w: 12.35, h: 1.0,
  fill: { color: C.navy }, shadow: makeShadow(),
});
s.addText([
  { text: "Kein einzelner Indikator kann Wohlstand vollständig messen.",
    options: { fontSize: 22, bold: true, color: C.white, fontFace: F.title, breakLine: true, align: "center" } },
  { text: "Eine Kombination verschiedener Maße liefert das beste Bild einer Gesellschaft.",
    options: { fontSize: 15, color: C.light, fontFace: F.body, align: "center" } },
], { x: 0.7, y: 5.35, w: 11.95, h: 0.8, align: "center", valign: "middle", margin: 0 });

// Diskussion
addCard(s, 0.5, 6.45, 12.35, 0.5, { accentLeft: C.amber });
s.addText("Diskussion:  Welches Maß findest du am aussagekräftigsten?  Welche Aspekte fehlen bei allen drei Indikatoren?", {
  x: 0.75, y: 6.5, w: 11.9, h: 0.4,
  fontSize: 14, fontFace: F.body, bold: true, color: C.navy,
  align: "center", valign: "middle", margin: 0,
});

addFooter(s);


// ════════════════════════════════════════════════════════════════════════════
// FOLIE 10 – Aufgaben & Weiterführendes
// ════════════════════════════════════════════════════════════════════════════
s = pres.addSlide();
s.background = { color: C.bg };

s.addText("Aufgaben & Weiterführendes", {
  x: 0.5, y: 0.3, w: 12.3, h: 0.7,
  fontSize: 36, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
s.addText("Vertiefung und eigenständiges Arbeiten", {
  x: 0.5, y: 1.0, w: 12.3, h: 0.4,
  fontSize: 14, fontFace: F.body, color: C.muted, margin: 0,
});

// Aufgabe 1
addCard(s, 0.5, 1.6, 6.0, 1.7, { accentTop: C.blue });
s.addText("Aufgabe 1: Ländervergleich", {
  x: 0.7, y: 1.8, w: 5.6, h: 0.35,
  fontSize: 15, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
addBullets(s, [
  "Wähle zwei Länder und vergleiche BIP/Kopf, HDI und Happiness-Score.",
  "Erstelle eine Tabelle und erkläre die Unterschiede.",
  "Nutze: data.worldbank.org und hdr.undp.org",
], 0.7, 2.2, 5.6, 0.9, { fontSize: 12 });

// Aufgabe 2
addCard(s, 6.8, 1.6, 6.05, 1.7, { accentTop: C.green });
s.addText("Aufgabe 2: Kritische Reflexion", {
  x: 7.0, y: 1.8, w: 5.65, h: 0.35,
  fontSize: 15, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
addBullets(s, [
  "Warum liegt Costa Rica im Glücksindex vor Österreich, obwohl das BIP/Kopf viel niedriger ist?",
  "Nenne mindestens drei mögliche Gründe.",
  "Diskutiert eure Ergebnisse in der Gruppe.",
], 7.0, 2.2, 5.65, 0.9, { fontSize: 12 });

// Aufgabe 3
addCard(s, 0.5, 3.55, 6.0, 1.7, { accentTop: C.amber });
s.addText("Aufgabe 3: Eigener Wohlstandsindex", {
  x: 0.7, y: 3.75, w: 5.6, h: 0.35,
  fontSize: 15, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
addBullets(s, [
  "Entwirf einen eigenen Wohlstandsindex mit 5 Kriterien.",
  "Gewichte die Kriterien (z. B. Umwelt 30 %, Bildung 20 %, ...).",
  "Begründe, warum du diese Kriterien gewählt hast.",
], 0.7, 4.15, 5.6, 0.9, { fontSize: 12 });

// Aufgabe 4
addCard(s, 6.8, 3.55, 6.05, 1.7, { accentTop: C.purple });
s.addText("Aufgabe 4: Österreich-Recherche", {
  x: 7.0, y: 3.75, w: 5.65, h: 0.35,
  fontSize: 15, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
addBullets(s, [
  "Recherchiere auf statistik.at die BIP-Entwicklung Österreichs der letzten 10 Jahre.",
  "Erstelle ein Liniendiagramm und beschreibe Trends.",
  "Welche Ereignisse erklären Einbrüche oder Anstiege?",
], 7.0, 4.15, 5.65, 0.9, { fontSize: 12 });

// Quellen-Box
addCard(s, 0.5, 5.5, 12.35, 1.4, { accentLeft: C.teal });
s.addText("Weiterführende Quellen", {
  x: 0.7, y: 5.6, w: 11.95, h: 0.35,
  fontSize: 15, fontFace: F.title, bold: true, color: C.navy, margin: 0,
});
s.addText([
  { text: "Statistik Austria: ", options: { bold: true, fontSize: 12, fontFace: F.body, color: C.body } },
  { text: "statistik.at – BIP, VGR, Wirtschaftsdaten Österreich", options: { fontSize: 12, fontFace: F.body, color: C.muted, breakLine: true } },
  { text: "Weltbank Open Data: ", options: { bold: true, fontSize: 12, fontFace: F.body, color: C.body } },
  { text: "data.worldbank.org – BIP aller Länder (Daten 2023)", options: { fontSize: 12, fontFace: F.body, color: C.muted, breakLine: true } },
  { text: "UNDP Human Development: ", options: { bold: true, fontSize: 12, fontFace: F.body, color: C.body } },
  { text: "hdr.undp.org – HDI-Bericht und Länderdaten (Daten 2024)", options: { fontSize: 12, fontFace: F.body, color: C.muted, breakLine: true } },
  { text: "World Happiness Report: ", options: { bold: true, fontSize: 12, fontFace: F.body, color: C.body } },
  { text: "worldhappiness.report – Jährlicher Bericht und Datendownload (Daten 2024)", options: { fontSize: 12, fontFace: F.body, color: C.muted, breakLine: true } },
  { text: "Eurostat: ", options: { bold: true, fontSize: 12, fontFace: F.body, color: C.body } },
  { text: "ec.europa.eu/eurostat – EU-Vergleichsdaten BIP, Kaufkraftstandards (Daten 2023)", options: { fontSize: 12, fontFace: F.body, color: C.muted } },
], { x: 0.75, y: 5.95, w: 11.8, h: 0.85, valign: "top", margin: 0 });

addFooter(s);


// ════════════════════════════════════════════════════════════════════════════
// Speichern
// ════════════════════════════════════════════════════════════════════════════
pres.writeFile({ fileName: "Wohlstandsmasse_BIP_HDI_Gluecksindex.pptx" })
  .then(() => console.log("Fertig: Wohlstandsmasse_BIP_HDI_Gluecksindex.pptx"))
  .catch(err => console.error("Fehler:", err));
