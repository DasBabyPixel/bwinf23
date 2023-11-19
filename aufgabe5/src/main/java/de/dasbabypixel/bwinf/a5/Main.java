package de.dasbabypixel.bwinf.a5;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        if (args.length == 0) {
            System.err.println("Bitte gib einen Pfad auf dem Dateisystem an");
            return;
        }

        var path = Path.of(args[0], Arrays.copyOfRange(args, 1, args.length));
        if (!Files.exists(path)) {
            System.err.println("Die Datei " + path.toAbsolutePath().normalize() + " existiert nicht");
            return;
        }
        var list = new Main().work(path);
        System.out.println(list.size());
        list.forEach(System.out::println);
    }

    /**
     * Berechnet eine gekürzte Tour
     */
    public List<Tourpoint> work(BufferedReader reader) throws IOException {
        // Die lange Version der Tour zunächst laden
        var tour = Tourpoint.load(reader);
        // Alle möglichen Start-End Kombinationen berechnen
        var startEntries = collectStartEntries(tour);
        // Einen Graph für die Tour erstellen, der alle möglichen Verbindungen enthält.
        var graph = new TourGraph(tour);

        List<Tourpoint> bestTour = null;
        // Die Strategie ist hier für jede Start-End Kombination den Dijkstra-Algorithmus anzuwenden. Dann wird aus allen Ergebnissen die beste Tour gewählt.
        for (var entry : startEntries) {
            // Dijkstra auf die Start-End Kombination anwenden.
            var entryTour = graph.search(entry.beginning(), entry.end());
            if (bestTour == null) bestTour = entryTour;
            else {
                var distBestTour = bestTour.getLast().distanceToStart(); // Länge der aktuell besten Tour
                var distEntryTour = entryTour.getLast().distanceToStart(); // Länge der aktuellen Tour
                if (distBestTour > distEntryTour) { // Die aktuelle Tour ist schneller als die bisher schnellste, deswegen nehmen wir lieber die aktuelle
                    bestTour = entryTour;
                } else if (distBestTour == distEntryTour) { // Der Fußweg der beiden Touren ist gleich lang
                    // Wenn die Touren gleich lang sind, die mit weniger Zwischenstopps aussuchen, da reden auch Zeit braucht.
                    // Alle wichtigen Stops sind ja in beiden Touren enthalten.
                    if (bestTour.size() > entryTour.size()) {
                        bestTour = entryTour;
                    } else if (bestTour.size() == entryTour.size()) {
                        // Zwei unterschiedliche Touren mit genau gleich vielen Stopps gefunden
                        System.err.println("2 genau gleichwertige Touren gefunden!");
                    }
                }
            }
        }
        return bestTour;
    }

    /**
     * Berechnet die gekürzte Tour mit einer Datei {@code path} als Input
     */
    public List<Tourpoint> work(Path path) throws IOException {
        try (var reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
            return work(reader);
        }
    }

    /**
     * Diese Methode berechnet alle möglichen Start-End Kombinationen der Tour.
     * Dies ist möglich, da der Startpunkt der Tour versetzt werden darf.
     */
    private List<StartEntry> collectStartEntries(List<Tourpoint> tour) {
        var beginning = new ArrayList<Tourpoint>();
        // Zunächst alle Tour Stops vor dem ersten wichtigen sammeln, einschließlich des ersten wichtigen.
        for (var tourpunkt : tour) {
            beginning.add(tourpunkt);
            if (tourpunkt.important()) break;
        }
        // Dann alle nach dem letzten wichtigen, einschließlich des letzten wichtigen.
        var end = new ArrayList<Tourpoint>();
        for (var i = tour.size() - 1; i >= 0; i--) { // For-Schleife rückwärts
            var tourpunkt = tour.get(i);
            end.add(tourpunkt);
            if (tourpunkt.important()) break;
        }
        // Alle möglichen Paare in eine Liste schreiben
        var entries = new ArrayList<StartEntry>();
        for (var b : beginning) {
            for (var e : end) {
                if (e.location().equals(b.location())) {
                    // Die Orte sind gleich, also ist es eine mögliche Kombination
                    entries.add(new StartEntry(b, e));
                }
            }
        }
        return entries;
    }
}
