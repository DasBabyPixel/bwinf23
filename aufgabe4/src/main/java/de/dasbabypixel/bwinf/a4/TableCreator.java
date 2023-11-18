package de.dasbabypixel.bwinf.a4;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Hilfsklasse zum Erstellen einer einheitlich formatierten Tabelle
 */
public class TableCreator {
    private static final String TRUE = "An";
    private static final String FALSE = "Aus";
    private static final int MAX_WIDTH = Math.max(TRUE.length(), FALSE.length());
    private static final String FORMAT = "%1$-" + MAX_WIDTH + "s";

    public static void print(Output output) {
        var builder = new StringBuilder();
        for (int i = 1; i <= output.inputCount(); i++) {
            builder.append(String.format(FORMAT, "Q" + i));
            if (i != output.inputCount()) builder.append('|');
        }
        builder.append("    ");
        for (int i = 1; i <= output.outputCount(); i++) {
            builder.append(String.format(FORMAT, "L" + i));
            if (i != output.outputCount()) builder.append('|');
        }
        builder.append('\n');
        for (int i = 0; i < output.possibilities(); i++) {
            var inputs = output.inputs()[i];
            var outputs = output.outputs()[i];

            for (int j = 0; j < inputs.length; j++) {
                builder.append(String.format(FORMAT, inputs[j] ? TRUE : FALSE));
                if (j == inputs.length - 1) break;
                builder.append('|');
            }

            builder.append(" -> ");

            for (int j = 0; j < outputs.length; j++) {
                builder.append(String.format(FORMAT, outputs[j] ? TRUE : FALSE));
                if (j == outputs.length - 1) break;
                builder.append('|');
            }
            if (i != output.possibilities() - 1) builder.append('\n');
        }
        System.out.println(builder);
    }
}
