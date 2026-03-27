# Beneschgenerator - Session Summary

## Zusammenfassung

Die App "Beneschgenerator" (ehemals "Zufallsgenerator") ist eine Single-File React-App (`Zufallsgenerator.html`) fuer den Unterrichtseinsatz. Sie ermoeglicht zufaellige Auswahl und Gruppeneinteilung von Schuelern mit animierten, unterhaltsamen Modi.

### Durchgefuehrte Aenderungen (chronologisch)

1. **Umbenennung**: "Zufallsgenerator" -> "Beneschgenerator" (Titel, Header, Footer)
2. **Chaos Arena Modus** erstellt: Canvas-basierter Eliminierungsmodus mit 5 Mechaniken (Gefahrenzonen, Shockwaves, Magnetfelder, Cut Events, Gravity Flip), dramatischem 4-Phasen-Ablauf, Fake-Drama-Momenten und prozeduraler Musik
3. **Sound-Fix**: Browser blockierte AudioContext -> `ctx.resume()` hinzugefuegt
4. **Eliminierungs-Sichtbarkeit**: Burst-Effekte und Ursachen-Labels ("ZONE", "CUT", "MAGNET", "WELLE", "FLIP") bei Ausscheiden
5. **Scharfe Namen**: Canvas auf 2x-Aufloesung + strokeText statt shadowBlur
6. **Max 20 Sekunden**: Timeline komprimiert
7. **Freie Bewegung**: Gravity auf 0 gesetzt, Kugeln bewegen sich ueberall, nur bei echtem Treffer eliminiert
8. **Marble Maze Modus** erstellt: Labyrinth mit 4 nummerierten Loechern, ausgewogene Gruppenzuteilung, Pfad-Animation
9. **Musik fuer alle Modi**: Jeder Modus hat eigene prozedurale Web Audio API Musik:
   - Lotto: Spannungsgeladenes Ticken mit steigender Spannung
   - Battle/Turnier: Schwere Kicks, Power-Akkorde, aggressiver Bass
   - Hindernisparcours: Schneller Puls-Bass, Staccato-Action-Akkorde
   - Mario Gruppen: Chiptune Square-Wave-Melodie im Mario-Stil
   - Murmellabyrinth: Sanfte Ambient-Arpeggios
   - Chaos Arena: Dunkler Sawtooth-Drone mit Rhythmus (bereits vorhanden)
10. **Chaos Arena Verbesserungen**:
    - Garantiert max. 20 Sekunden (Phasen: P1 0-2.5s, P2 3-7s, P3 7-12s, P4 12-18s, Hard-Cap 19.5s)
    - Smartes Event-Targeting: `findCluster()` findet die dichteste Kugelgruppe, Events zielen darauf
    - Schnellere Event-Dauern und Fallback-Eliminierung

---

## Aktueller Stand

### Datei
- **Einzige Datei**: `Zufallsgenerator.html` (~2053 Zeilen)
- **Technologie**: React 18 (UMD), Babel Standalone, Tailwind CSS CDN, Canvas 2D API, Web Audio API

### 7 Modi (alle funktionsfaehig)

| Modus | Typ | Musik | Beschreibung |
|-------|-----|-------|-------------|
| Lotto-Ziehung | Elimination | Ja | Kugeln in Trommel, nacheinander gezogen |
| Turnier (Battle) | Elimination | Ja | K.O.-Turnier, 2 parallele Duelle, HP-Balken |
| Hindernisparcours | Elimination | Ja | Grid-Layout, visuelle Hindernisse (Feuer/Wasser/Blitz/Eis/Tornado/Mine/Schnee/Schleim) |
| Chaos Arena | Elimination | Ja | Canvas-Physik, 5 Mechaniken, Drama-Phasen, max 20s |
| Gruppen sofort | Gruppe | Nein | Sofortige Gruppenzuteilung (kein Animation noetig) |
| Super Mario Gruppen | Gruppe | Ja | Kugeln laufen durch Mario-Level in Gruppen-Pipes |
| Murmellabyrinth | Gruppe | Ja | Kugeln rollen durch Labyrinth, 4 Loecher = 4 Gruppen |

### Bekannte Limitierungen
- Maximal 30 Teilnehmer pro Liste
- Single-File-Architektur (kein Build-System)
- Prozedurale Musik (nicht aufgenommene Audio-Dateien)

---

## Naechste Schritte (Vorschlaege)

### Kursfristig
- [ ] Testen aller Modi mit verschiedenen Teilnehmerzahlen (2, 5, 10, 20, 30)
- [ ] Musik-Lautstaerke pro Modus feintunen
- [ ] Eventuell kurze Fanfare/Jingle fuer "Gruppen sofort" Modus
- [ ] Ueberpruefen ob Chaos Arena bei sehr kleinen Gruppen (2-3 Personen) korrekt funktioniert

### Mittelfristig
- [ ] Mute/Lautstaerke-Button fuer Musik
- [ ] Visuelle Verbesserungen (Partikeleffekte, bessere Animationen)
- [ ] Weitere Modi (z.B. Gluecksrad, Wuerfel)
- [ ] Dark/Light Mode Toggle

### Langfristig
- [ ] Mobile-Optimierung (Touch-Gesten)
- [ ] Export/Import von Listen
- [ ] Lehrer-Dashboard mit Statistiken
- [ ] PWA-Faehigkeit fuer Offline-Nutzung
