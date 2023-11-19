package de.dasbabypixel.bwinf.a4;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

public class OutputTests {

    @Test
    void test() {
        var output = new Output(6, 4);
        assertArrayEquals(new boolean[]{false, false, false, true, false, false}, output.possibility(0b000100));
        assertArrayEquals(new boolean[]{true, true, false, true, false, false}, output.possibility(0b110100));
        assertArrayEquals(new boolean[]{false, true, false, true, false, false}, output.possibility(0b010100));
        assertArrayEquals(new boolean[]{false, false, false, false, true, true}, output.possibility(3));
    }
}
