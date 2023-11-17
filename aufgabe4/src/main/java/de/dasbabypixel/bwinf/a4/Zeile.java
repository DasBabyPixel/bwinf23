package de.dasbabypixel.bwinf.a4;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.function.BiConsumer;

public record Zeile(int breite, BausteinSegment[] segmente, int[] idMap) {

    public boolean[] apply(boolean[] input) {
        if (input.length != breite) {
            // Wir bearbeiten gerade die erste Linie/Möglichkeit
            var newInput = new boolean[breite];
            for (int i = 0; i < input.length; i++) {
                newInput[idMap[i]] = input[i];
            }
            input = newInput;
        }

        var output = new boolean[breite];
        BiConsumer<Integer, boolean[]> a = (id, data) -> {
            output[id] = data[0];
            output[id + 1] = data[1];
        };
        var outputIds = new ArrayList<Integer>();
        for (int id = 0; id < breite; id++) {
            var segment = segmente[id];
            if (segment == null) continue;
            switch (segment) {
                case r -> // Am nächsten ist der Lichtsensor
                        a.accept(id, Baustein.ROT_UNTEN.lichter(input[id++], input[id]));
                case R -> // Am nächsten ist kein Lichtsensor
                        a.accept(id, Baustein.ROT_OBEN.lichter(input[id++], input[id]));
                case W -> a.accept(id, Baustein.WEISS.lichter(input[id++], input[id]));
                case B -> a.accept(id, Baustein.BLAU.lichter(input[id++], input[id]));
                case X -> output[id] = false;
                case INPUT -> output[id] = input[id];
                case OUTPUT -> {
                    outputIds.add(id);
                    output[id] = input[id];
                }
            }
        }
        if (!outputIds.isEmpty()) { // Letzte linie
            var reducedOutput = new boolean[outputIds.size()];
            for (int i = 0; i < outputIds.size(); i++) {
                reducedOutput[i] = output[outputIds.get(i)];
            }
            return reducedOutput;
        }
        return output;
    }

    @Override
    public String toString() {
        return String.join("", Arrays.stream(segmente).map(BausteinSegment::toString).toList());
    }

    public static Zeile read(String line) {
        line = line.strip();
        var split = line.split(" +");
        var breite = split.length;
        var segmente = new BausteinSegment[breite];
        var idMap = new ArrayList<Integer>();
        for (int i = 0; i < breite; i++) {
            var string = split[i];
            var segment = BausteinSegment.get(string);
            segmente[i] = segment;
            var id = BausteinSegment.id(segment, string);
            if (id != Verbindung.NO_ID) {
                idMap.add(i);
            }
        }
        var idMapArray = idMap.stream().mapToInt(i -> i).toArray();
        return new Zeile(breite, segmente, idMapArray);
    }
}
