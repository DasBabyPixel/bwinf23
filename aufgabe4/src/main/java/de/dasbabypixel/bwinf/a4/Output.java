package de.dasbabypixel.bwinf.a4;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.Objects;
import java.util.stream.Stream;

public class Output {
    private final int possibilities;
    private final boolean[][] inputs;
    private final boolean[][] outputs;

    public Output(int inputCount, int outputCount) {
        int possibilities = 0;
        for (int i = 0; i < inputCount; i++) {
            possibilities *= 2;
            if (possibilities == 0) possibilities = 2;
        }
        this.possibilities = possibilities;
        inputs = new boolean[inputCount][possibilities];
        outputs = new boolean[outputCount][possibilities];
    }

    public int possibilities() {
        return possibilities;
    }

    public boolean[] possibility(int id) {
        var res = new boolean[inputs.length];
        for (int i = 0; i < res.length; i++) {
            res[res.length - i - 1] = (id & (1 << i)) != 0;
        }
        return res;
    }

    public boolean[][] inputs() {
        return inputs;
    }

    public boolean[][] outputs() {
        return outputs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Output output = (Output) o;
        return possibilities == output.possibilities && Arrays.deepEquals(inputs, output.inputs) && Arrays.deepEquals(outputs, output.outputs);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(possibilities);
        result = 31 * result + Arrays.deepHashCode(inputs);
        result = 31 * result + Arrays.deepHashCode(outputs);
        return result;
    }

    public static Output load(BufferedReader reader) throws IOException {
        var line = reader.readLine().strip();
        var split = line.split(" ");
        var inputCount = Integer.parseInt(split[0]);
        var outputCount = Integer.parseInt(split[1]);
        var output = new Output(inputCount, outputCount);
        var possibilities = output.possibilities();
        line = reader.readLine().strip();
        int i = 0;
        for (var c : line.toCharArray()) {
            var b = c == '1';
            output.inputs[i / possibilities][i++ % possibilities] = b;
        }
        line = reader.readLine().strip();
        i = 0;
        for (var c : line.toCharArray()) {
            var b = c == '1';
            output.outputs[i / possibilities][i++ % possibilities] = b;
        }
        return output;
    }

    @Override
    public String toString() {
        var sb = new StringBuilder();
        sb.append(inputs.length).append(' ').append(outputs.length).append('\n');
        for (boolean[] inputA : inputs) {
            for (boolean b : inputA) {
                sb.append(b ? 1 : 0);
            }
        }
        sb.append('\n');
        for (boolean[] outputA : outputs) {
            for (boolean b : outputA) {
                sb.append(b ? 1 : 0);
            }
        }
        return sb.toString();
    }

    public String toPretty() {
        var sb = new StringBuilder();
        for (int i = 0; i < possibilities; i++) {
            for (boolean[] input : inputs) sb.append(input[i] ? 1 : 0);
            sb.append(" -> ");
            for (boolean[] output : outputs) sb.append(output[i] ? 1 : 0);
            sb.append('\n');
        }
        return sb.toString();
    }
}
