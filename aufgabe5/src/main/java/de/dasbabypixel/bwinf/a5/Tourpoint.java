package de.dasbabypixel.bwinf.a5;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public record Tourpoint(String location, int year, boolean important, int distanceToStart) {
    /**
     * Diese Methode lädt ein Tourpunkt aus einer Zeile der Tour
     */
    public static Tourpoint parse(String line) {
        var split = line.split(",");
        var ort = split[0];
        var jahr = Integer.parseInt(split[1]);
        var essentiell = split[2].equals("X");
        var abstand = Integer.parseInt(split[3]);
        return new Tourpoint(ort, jahr, essentiell, abstand);
    }

    /**
     * Diese Methode lädt alle Tourpunkte aus einer Tour
     */
    public static List<Tourpoint> load(BufferedReader reader) throws IOException {
        var lastYear = Integer.MIN_VALUE;
        var count = Integer.parseInt(reader.readLine());
        var list = new ArrayList<Tourpoint>(count);
        for (int i = 0; i < count; i++) {
            var line = reader.readLine().trim(); // Leerzeichen am Anfang und Ende der Zeile ignorieren
            if (line.isBlank()) { // Ein wenig toleranz für leere Zeilen. Diese werden ignoriert.
                i--;
                continue;
            }
            // Die Zeile in ein Tourpunkt-Object laden
            var tourpunkt = parse(line);
            // Einfache Überprüfung, ob die Chronologie erhalten ist
            if (tourpunkt.year < lastYear) {
                throw new IllegalArgumentException("Badly formatted file: Wrong order at " + tourpunkt);
            }
            lastYear = tourpunkt.year;
            // Den Tourpunkt an das Ende der Tour anfügen
            list.add(tourpunkt);
        }
        return list;
    }

    @Override
    public String toString() {
        return String.format("%s,%s,%s,%s", location, year, important ? 'X' : ' ', distanceToStart);
    }
}
