package de.dasbabypixel.bwinf.a4;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.Objects;
import java.util.stream.Stream;

public class Output {
    private final int inputCount;
    private final int outputCount;
    // Die Anzahl der Input-Möglichkeiten
    private final int possibilities;
    // Zwei-Dimensionale Repräsentation der Inputs für eine Möglichkeit
    private final boolean[][] inputs;
    // Zwei-Dimensionale Repräsentation der Outputs für eine Möglichkeit
    private final boolean[][] outputs;

    public Output(int inputCount, int outputCount) {
        int possibilities = 0;
        for (int i = 0; i < inputCount; i++) {
            possibilities *= 2;
            if (possibilities == 0) possibilities = 2;
        }
        this.inputCount = inputCount;
        this.outputCount = outputCount;
        this.possibilities = possibilities;
        inputs = new boolean[possibilities][inputCount];
        outputs = new boolean[possibilities][outputCount];
    }

    public int possibilities() {
        return possibilities;
    }

    /**
     * Diese Methode generiert ein boolean[], welches das eingegeben int als bits repräsentiert.
     * Das ist eine einfache Möglichkeit alle Inputs für die Lampen zu berechnen, da ein neuer Input für jedes "id++" generiert wird.
     */
    public boolean[] possibility(int id) {
        var res = new boolean[inputCount];
        for (int i = 0; i < res.length; i++) {
            res[res.length - i - 1] = (id & (1 << i)) != 0;
        }
        return res;
    }

    public int inputCount() {
        return inputCount;
    }

    public int outputCount() {
        return outputCount;
    }

    public boolean[][] inputs() {
        return inputs;
    }

    public boolean[][] outputs() {
        return outputs;
    }
}
