# Zufallsgenerator - Interaktive Gewinner-Ermittlung

Ein spielerischer Zufallsgenerator, der aus bis zu 30 Teilnehmern einen Gewinner ermittelt - mit drei verschiedenen, animierten Spielmodi.

## Datei

| Datei | Beschreibung |
|---|---|
| `Zufallsgenerator.html` | Komplette App - einfach im Browser öffnen |

**Zum Teilen:** Die Datei `Zufallsgenerator.html` per E-Mail, USB-Stick oder Messenger verschicken. Der Empfänger muss die Datei nur doppelklicken - sie öffnet sich im Browser. Internetverbindung wird beim ersten Öffnen benötigt (für CSS/JS-Libraries via CDN).

---

## Funktionen

### Namenslisten-Verwaltung
- Mehrere Namenslisten erstellen, umbenennen und löschen
- Bis zu 30 Namen pro Liste
- Einzeln oder mehrere Namen gleichzeitig hinzufügen
- Checkbox pro Name: anwesend / abwesend (durchgestrichen)
- Buttons: "Alle an" / "Alle aus"
- Alle Listen werden automatisch im Browser gespeichert (localStorage)
- Doppelklick auf Listennamen zum Umbenennen

### Spielmodus 1: Lotto-Ziehung
- Visuelle Lottotrommel mit farbigen Kugeln
- Kugeln schweben sanft in der Trommel
- Scan-Effekt: Glow huscht über mehrere Kugeln
- Gezogene Kugel leuchtet golden auf und wird ausgeworfen
- Eliminierte Kugeln sammeln sich im Tablett
- Blinkende Lichter um die Trommel

### Spielmodus 2: Turnier (K.O.-System)
- Automatisches Bracket mit zufälligen Paarungen
- **Zwei Duelle gleichzeitig** - doppelt so schnell
- HP-Balken die bei Treffern sinken (grün → gelb → rot)
- Shake-Animation bei Schlägen
- VS-Einblendung bei jedem Duell
- Runden: Viertelfinale → Halbfinale → Finale
- Freilos bei ungerader Teilnehmerzahl
- Kampfprotokoll mit allen Ergebnissen

### Spielmodus 3: Hindernisparcours
- Teilnehmer als Kacheln in einem Raster (passt auf einen Bildschirm)
- 3-7 zufällige Hindernisse mit visuellen Animationen:
  - **Feuergraben** - Flammen lodern über das Spielfeld
  - **Wasserwand** - Welle schwappt von links nach rechts
  - **Blitzfeld** - Blitze zucken über das Raster
  - **Eisrutsche** - Frost breitet sich radial aus
  - **Tornado** - Wirbel fegt quer über das Spielfeld
  - **Minenfeld** - Explosionen an zufälligen Stellen
  - **Schneesturm** - Schneeflocken wirbeln herum
  - **Schleimgrube** - Grüner Schleim tropft herab
- Betroffene Teilnehmer werden mit Splat-Effekt eliminiert
- Fortschrittsanzeige zeigt bestandene/kommende Hindernisse

---

## Technische Details

- **Tech Stack:** React 18, Tailwind CSS, Babel (alles via CDN)
- **Keine Installation nötig** - eine einzige HTML-Datei
- **Browser:** Chrome, Firefox, Edge, Safari (aktuell)
- **Datenspeicherung:** localStorage (bleibt im Browser gespeichert, nicht geräteübergreifend)
- **Internetverbindung:** Wird beim Öffnen benötigt (CDN-Libraries)

## Anleitung

1. `Zufallsgenerator.html` im Browser öffnen
2. Neue Liste erstellen (Name eingeben + "+" klicken)
3. Namen hinzufügen (einzeln oder mehrere auf einmal)
4. Abwesende per Checkbox deaktivieren
5. Spielmodus wählen (Lotto / Turnier / Hindernisparcours)
6. Starten und zuschauen!
