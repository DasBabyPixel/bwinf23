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
    public static final boolean LOGGING = false;

    public static void main(String[] args) throws IOException {
        try {
            Thread.sleep(1000000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        var path = Path.of(args[0], Arrays.copyOfRange(args, 1, args.length));
        var main = new Main();
        main.work(path);
    }

    public List<Tourpoint> work(BufferedReader reader) throws IOException {
        var tour = Tourpoint.load(reader);
        var startEntries = collectStartEntries(tour);
        var graph = new TourGraph(tour);

        List<Tourpoint> bestTour = null;
        for (var entry : startEntries) {
            var entryTour = graph.search(entry.beginning(), entry.end());
            if (bestTour == null) bestTour = entryTour;
            else {
                var distBestTour = bestTour.get(bestTour.size() - 1).distanceToStart();
                var distEntryTour = entryTour.get(entryTour.size() - 1).distanceToStart();
                if (distBestTour > distEntryTour) {
                    bestTour = entryTour;
                } else if (distBestTour == distEntryTour) {
                    // Wenn die touren gleich lang sind, die mit weniger Zwischenstopps aussuchen,
                    // da reden auch Zeit braucht und der extra Stopp nicht wichtig ist.
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

    public void work(Path path) throws IOException {
        var reader = Files.newBufferedReader(path, StandardCharsets.UTF_8);
        work(reader);
        reader.close();
    }

    private List<StartEntry> collectStartEntries(List<Tourpoint> tour) {
        var beginning = new ArrayList<Tourpoint>();
        for (var tourpunkt : tour) {
            beginning.add(tourpunkt);
            if (tourpunkt.important()) break;
        }
        var end = new ArrayList<Tourpoint>();
        for (var i = tour.size() - 1; i >= 0; i--) {
            var tourpunkt = tour.get(i);
            end.add(tourpunkt);
            if (tourpunkt.important()) break;
        }
        var entries = new ArrayList<StartEntry>();
        for (var b : beginning) {
            for (var e : end) {
                if (e.location().equals(b.location())) {
                    entries.add(new StartEntry(b, e));
                }
            }
        }
        if (LOGGING) {
            System.out.println("Start Entries: " + entries.size());
            entries
                    .stream()
                    .map(e -> e.beginning().location() + " -> " + e.end().location())
                    .forEach(System.out::println);
        }
        return entries;
    }
}
