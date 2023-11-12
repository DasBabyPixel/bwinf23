package de.dasbabypixel.bwinf.a4;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;

public class Bauplan {

    private final Verbindung[][] verbindungen;

    public Bauplan(Verbindung[][] verbindungen) {
        this.verbindungen = verbindungen;
    }

    public static Bauplan read(String input) throws IOException {
        var reader = new BufferedReader(new StringReader(input));
        var line = reader.readLine();
        var split = line.split(" ", 2);
        if (split.length != 2) throw new IllegalArgumentException("No size in header");
        var sizeX = Integer.parseInt(split[0]);
        var sizeY = Integer.parseInt(split[1]);
        var counter = 0;
        var verbindungen = new Verbindung[sizeX][sizeY];
        while (counter < sizeY) {
            line = reader.readLine();
            if (line == null)
                throw new IllegalArgumentException("Invalid sizeY: " + sizeY + ", only found " + counter + " lines");
            split = line.split(" +");
            if (split.length != sizeX) throw new IllegalArgumentException("Bad line: " + line);

            for (var i = 0; i < split.length; i++) {
                var string = split[i];
                var segment = BausteinSegment.get(string);
                var id = BausteinSegment.id(segment, string);
                System.out.println(segment);
            }
            counter++;
        }
        return new Bauplan(verbindungen);
    }
}
