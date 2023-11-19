# Lösungsdokumentation

## HTML-Datei:

Die HTML-Datei definiert die Struktur der Webseite. Hier sind einige wichtige Punkte:

- **Meta-Tags:** Diese Tags enthalten Meta-Informationen über die Webseite, wie die Zeichencodierung und die Ansichtseinstellungen.

- **Title-Tag:** Definiert den Titel der Webseite.

- **Link-Tags:** Verweisen auf externe Ressourcen wie Stylesheets (CSS-Dateien).

- **Body-Tag:** Enthält den eigentlichen Inhalt der Webseite, einschließlich Überschriften, Anweisungen und Schaltflächen.

- **Script-Tags:** Verweisen auf JavaScript-Dateien, die für die Logik der Webseite verantwortlich sind.

## CSS-Datei (indexStyle.css):

Die CSS-Datei definiert das Layout und das Erscheinungsbild der Webseite. Hier sind einige wichtige Punkte:

- **Selektoren für Bausteine:** Jeder Baustein wird durch spezifische CSS-Stileigenschaften definiert, einschließlich Größe, Rand, Hintergrundbild und Abstand.

- **Stile für das Spielfeld:** Das Spielfeld und seine Zellen werden ebenfalls durch spezifische Stileigenschaften definiert, einschließlich der Anordnung der Zellen.

## JavaScript-Dateien (algorithmus.js, indexScript.js):

Die JavaScript-Dateien sind für die Funktionalität der Webseite verantwortlich. Hier sind einige wichtige Punkte:

- **Globale Variablen:** Verschiedene globale Variablen werden erstellt, um auf HTML-Elemente und Spielfelddaten zuzugreifen.

- **Event-Listener:** Event-Listener werden für Schaltflächen und Bausteine festgelegt, um auf Benutzerinteraktionen zu reagieren.

- **Funktionen zum Erstellen und Zurücksetzen des Spielfelds:** Die Funktion `createPlayground` erstellt das Spielfeld basierend auf den Benutzereingaben. Die Funktion `calculateLight` berechnet den Lichtweg basierend auf den platzierten Bausteinen und Lampen.

- **Klassen und Funktionen für Bausteine:** Es gibt verschiedene Klassen für Bausteine wie Rot, Blau, Weiß usw. Diese Klassen implementieren eine Methode `lichter`, die den Status der Lampen in der aktuellen Spalte basierend auf den Bausteinen berechnet.

- **Klassen für Spalte und Bausteinsegmente:** Die Klasse `Spalte` verwendet die Bausteinsegmente, um den Status der Lampen in der Spalte zu berechnen.

- **Enum für Bausteinsegmente:** Die Bausteinsegmente sind als Enumerationswerte definiert und repräsentieren die verschiedenen Bausteintypen.

## Funktionsweise der Webseite:

1. Der Benutzer gibt die gewünschte Länge und Höhe des Spielfelds ein und klickt auf die Schaltfläche "Erstelle das Spielfeld".

2. Das Spielfeld wird erstellt, und der Benutzer kann Bausteine auswählen und auf das Spielfeld setzen.

3. Die Lampen in der ersten Spalte können ein- und ausgeschaltet werden.

4. Die Funktion `calculateLight` wird aufgerufen, um den Lichtweg basierend auf den platzierten Bausteinen und Lampen zu berechnen und anzuzeigen.

5. Der Benutzer kann das Spielfeld zurücksetzen, um ein neues Spielfeld zu erstellen.

## Zusammenfassung:

Die Webseite ermöglicht es dem Benutzer, interaktive Spielfelder zu erstellen, Bausteine zu platzieren und den Lichtweg in Echtzeit zu berechnen. Der Code ist gut strukturiert und verwendet objektorientierte Programmierung für die Bausteine und die Berechnung des Lichtwegs. Die Nutzung von Klassen, Enums und gut kommentiertem Code erleichtert das Verständnis und die Wartung des Programms.
