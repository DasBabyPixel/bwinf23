package de.dasbabypixel.bwinf.a4;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.BiConsumer;

public record Zeile(int breite, BausteinSegment[] segmente, int[] idMap) {

    /**
     * Diese Methode ergänzt fehlende "false" Werte, falls wir in der ersten Zeile sind.
     * Das Boolean-Array, welches von dieser Methode zurückgegeben wird, hat (bei gültigem Input) immer die Länge dieser {@link Zeile}.
     */
    private boolean[] padIfNecessary(boolean[] input) {
        // Die Länge ist bereits passend.
        if (input.length == breite) return input;

        var newInput = new boolean[breite];
        for (int i = 0; i < input.length; i++) {
            newInput[idMap[i]] = input[i];
        }
        return newInput;
    }

    /**
     * Diese Methode entfernt alle Werte aus dem Array, welche keinem Output zugeordnet sind.
     * Dadurch wird überflüssige Information in Form von "false" Werten entfernt.
     * <br><br>
     * <p>Beispiel:</p>
     * Aufbau:
     * <p>X L1 X L2 X X L3</p>
     * Original:
     * <p>0100001</p>
     * Wird zu
     * <p>101</p>
     */
    private boolean[] trimIfNecessary(List<Integer> outputIds, boolean[] output) {
        // Es gibt keine Outputs in dieser Zeile, also müssen wir nichts bearbeiten.
        if (outputIds.isEmpty()) return output;

        // Es gibt einen Output (Wir sind also in der letzten Zeile).
        // Deswegen müssen wir unnötige "false" Werte, welche von "X" kommen, entfernen.
        var reducedOutput = new boolean[outputIds.size()];
        for (int i = 0; i < outputIds.size(); i++) {
            reducedOutput[i] = output[outputIds.get(i)];
        }
        return reducedOutput;
    }

    public boolean[] apply(boolean[] input) {
        input = padIfNecessary(input);

        var output = new boolean[breite];
        // Schreibt "data" (Boolean Array von Länge 2) an die Stelle "id" (und "id"+1) im "output" Array.
        BiConsumer<Integer, boolean[]> outputBuilder = (id, data) -> {
            output[id] = data[0];
            output[id + 1] = data[1];
        };
        var outputIds = new ArrayList<Integer>();
        for (int id = 0; id < breite; id++) {
            // Wir analysieren im switch Statement den Baustein, welcher an dem Index "id" ist.
            var segment = segmente[id];
            if (segment == null)
                continue; // Kein Baustein ist definiert. Das sollte nicht passieren, aber wenn doch, dann ignorieren wir den Baustein.
            switch (segment) {
                /*
                Strategie bei den Bausteinen ist es zuerst den Baustein zu analysieren.
                Wenn er ein größerer Baustein ist (2x1), also Rot, Weiß oder Blau, dann zählen wir den Index "id" direkt zweimal hoch.
                Dadurch wird unnötige Komplexität vermieden.
                 */
                case r -> // Am nächsten Index ist der Lichtsensor.
                        outputBuilder.accept(id, Baustein.ROT_UNTEN.lichter(input[id++], input[id]));
                case R -> // Am nächsten Index ist kein Lichtsensor.
                        outputBuilder.accept(id, Baustein.ROT_OBEN.lichter(input[id++], input[id]));
                case W -> outputBuilder.accept(id, Baustein.WEISS.lichter(input[id++], input[id]));
                case B -> outputBuilder.accept(id, Baustein.BLAU.lichter(input[id++], input[id]));

                case X -> // "X" bedeutet kein Baustein, also ist der Output an dieser Stelle "false".
                        output[id] = false;
                case INPUT -> // Ein Input wird weitergegeben.
                        output[id] = input[id];
                case OUTPUT -> {
                    // Wenn wir auf einen Output treffen, dann merken wir uns den Index des Outputs und geben den Output weiter.
                    // Mit dem Index können wir dann in der trimIfNecessary Methode die überflüssigen "false" Werte, welche von "X" kommen, entfernen.
                    outputIds.add(id);
                    output[id] = input[id];
                }
            }
        }
        return trimIfNecessary(outputIds, output);
    }

    @Override
    public String toString() {
        return String.join("", Arrays.stream(segmente).map(BausteinSegment::toString).toList());
    }

    public static Zeile read(String line) {
        // Überflüssige Leerzeichen und Tabs entfernen.
        line = line.strip();
        // "line" in die einzelnen Teile teilen. Hier wird " +" als Regular Expression verwendet, um bei mehreren Leerzeichen nur einmal zu teilen.
        var split = line.split(" +");
        // Die Länge des Arrays ist die Breite der Zeile.
        var breite = split.length;
        // Vorbereitung um die einzelnen Teile als BausteinSegment einzulesen.
        var segmente = new BausteinSegment[breite];
        // Vorbereitung einer (in der Größe veränderbaren) Liste um die Indizes von Inputs und Outputs zu speichern.
        var idMap = new ArrayList<Integer>();
        for (int i = 0; i < breite; i++) {
            var string = split[i];
            var segment = BausteinSegment.get(string);
            // Einspeichern des BausteinSegments in die Zeile
            segmente[i] = segment;
            var id = BausteinSegment.id(segment, string);
            if (id != BausteinSegment.NO_ID) {
                // Der Baustein hat eine ID, also ist er ein Input oder ein Output
                // L[1-9] oder Q[1-9]
                idMap.add(i);
            }
        }
        // Konvertieren der Liste (ArrayList<Integer>) in ein Array (int[])
        var idMapArray = idMap.stream().mapToInt(i -> i).toArray();
        return new Zeile(breite, segmente, idMapArray);
    }
}
