package de.dasbabypixel.bwinf.a4;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Stream;

public class Main {
    public Output work(BufferedReader reader) throws IOException {
        var line = reader.readLine();
        var split = line.split(" ", 2);
        if (split.length != 2) throw new IllegalArgumentException("No size in header");
        var sizeX = Integer.parseInt(split[0]);
        var sizeY = Integer.parseInt(split[1]);
        var zeilen = new ArrayList<Zeile>();
        while ((line = reader.readLine()) != null) {
            var zeile = Zeile.read(line);
            zeilen.add(zeile);
            if (zeilen.size() >= sizeY) break;
        }
        if (zeilen.isEmpty()) throw new IllegalArgumentException("Bad input");
        var output = new Output(zeilen.get(0).idMap().length, zeilen.get(zeilen.size() - 1).idMap().length);

        for (int possibilityId = 0; possibilityId < output.possibilities(); possibilityId++) {
            System.out.println("Possibility: " + possibilityId);
            var data = output.possibility(possibilityId);
            for (int i = 0; i < data.length; i++) {
                output.inputs()[i][possibilityId] = data[i];
            }
            for (var zeile : zeilen) {
                data = zeile.apply(data);
                for (boolean b : data) {
                    System.out.print(b ? "1" : "0");
                }
                System.out.println();
            }
            for (int i = 0; i < data.length; i++) {
                output.outputs()[i][possibilityId] = data[i];
            }
        }

        return output;
    }
}
