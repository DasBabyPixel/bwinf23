package de.dasbabypixel.bwinf.a5;

import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.Arrays;

public class TourTests {
    @Test
    public void test() throws IOException {
        var localFiles = new String[]{"tour1.txt", "tour2.txt", "tour3.txt", "tour4.txt", "tour5.txt", "custom1.txt"};
        var entries = Arrays
                .stream(localFiles)
                .map(name -> new String[]{Utils.localURLString(name), Utils.localURLString("expected/".concat(name))})
                .map(entry -> new TestEntry(Utils.url(entry[0]), Utils.url(entry[1])))
                .toList();

        for (var entry : entries) {
            Utils.test(entry);
        }
    }
}
