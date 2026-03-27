# Zufallsgenerator – Aktueller Stand

Einzelne HTML-Datei, keine Abhängigkeiten, läuft direkt im Browser.

---

## Modi

### Einzelziehung

| Modus | Beschreibung |
|---|---|
| 🎱 **Lotto-Ziehung** | Kugeln werden nacheinander aus der Trommel gezogen |
| ⚔️ **Turnier** | K.O.-Turnier mit HP-Balken, zwei Duelle gleichzeitig |
| 🏃 **Hindernisparcours** | Teilnehmer kämpfen gegen Feuergraben, Blitzfeld und Tornado |

### Gruppen

| Modus | Beschreibung |
|---|---|
| ⚡ **Gruppen sofort** | Sofortige Zufallseinteilung, Anzahl frei wählbar (2–10) |
| 🎮 **Super Mario Gruppen** | Kugeln laufen durch ein Mario-Level und landen in Gruppen-Pipes |

---

## Super Mario Gruppen – Details

- Anzahl Gruppen wählbar (2–10)
- Blaues Mario-Level mit Wolken, schwebenden ?-Blöcken und grünem Boden
- Grüne Pipes am unteren Rand = je eine Gruppe
- Alle Kugeln starten links, laufen durch das Level, springen in ihre Pipe
- Münzen-Popup beim Einlanden
- Gruppen-Karten füllen sich live auf
- Konfetti nach Abschluss

---

## Technisches

- React 18 (via CDN, kein Build-Schritt)
- Tailwind CSS (via CDN)
- Listenverwaltung via `localStorage`
- Bis zu 30 Teilnehmer pro Liste
- Animationen per CSS-Keyframes (dynamisch injiziert)
