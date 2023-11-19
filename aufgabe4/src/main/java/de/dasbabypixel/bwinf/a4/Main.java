package de.dasbabypixel.bwinf.a4;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;

public class Main {

    public static void main(String[] args) throws IOException {
        if (args.length == 0) {
            System.err.println("Bitte gib einen Pfad auf dem Dateisystem an");
            return;
        }

        var path = Path.of(String.join(" ", args));
        if (!Files.exists(path)) {
            System.err.println("Die Datei " + path.toAbsolutePath().normalize() + " existiert nicht");
            return;
        }
        var reader = Files.newBufferedReader(path, StandardCharsets.UTF_8);
        var output = new Main().work(reader);
        TableCreator.print(output);
    }

    @SuppressWarnings("DuplicatedCode")
    public Output work(BufferedReader reader) throws IOException {
        var line = reader.readLine(); // Einlesen der Größe des Bauplans.
        var split = line.split(" ", 2);
        if (split.length != 2) throw new IllegalArgumentException("No size in header");
        var sizeX = Integer.parseInt(split[0]); // Die Breite des Bauplans. Dieser Wert wird nie verwendet, da die Breite in den einzelnen Zeilen berechnet wird.
        var sizeY = Integer.parseInt(split[1]); // Die Höhe des Bauplans.
        // Einlesen aller Zeilen in die ArrayList.
        var zeilen = new ArrayList<Zeile>();
        while ((line = reader.readLine()) != null) {
            var zeile = Zeile.read(line);
            zeilen.add(zeile);
            // Sobald alle Zeilen eingelesen sind beenden wir die Schleife.
            if (zeilen.size() >= sizeY) break;
        }
        // Es wurden keine Zeilen gefunden, also ist der Input nicht gültig.
        if (zeilen.isEmpty()) throw new IllegalArgumentException("Bad input");

        // Vorbereiten des Outputs.
        var output = new Output(zeilen.get(0).idMap().length, zeilen.get(zeilen.size() - 1).idMap().length);

        for (int possibilityId = 0; possibilityId < output.possibilities(); possibilityId++) {
            var data = output.possibility(possibilityId); // Berechnen der Möglichkeit mit der ID "possibilityId".
            for (int i = 0; i < data.length; i++) {
                output.inputs()[possibilityId][i] = data[i];
            }
            // Stück für Stück alle Zeilen auf das "data" Array anwenden.
            // Danach haben wir den Output.
            for (var zeile : zeilen) {
                data = zeile.apply(data);
            }
            // Speichern des Outputs für diese Möglichkeit
            for (int i = 0; i < data.length; i++) {
                output.outputs()[possibilityId][i] = data[i];
            }
        }

        return output;
    }
}
