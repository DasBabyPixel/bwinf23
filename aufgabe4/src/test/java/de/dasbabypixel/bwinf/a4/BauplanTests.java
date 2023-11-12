package de.dasbabypixel.bwinf.a4;

import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.Arrays;

public class BauplanTests {
    @Test
    void test() throws IOException {
        var localFiles = new String[]{"nandu1.txt", "nandu2.txt", "nandu3.txt", "nandu4.txt", "nandu5.txt"};
        var entries = Arrays
                .stream(localFiles)
                .map(name -> new String[]{Utils.localURLString(name), Utils.localURLString("expected/" + name)})
                .map(entry -> new TestEntry(Utils.url(entry[0]), Utils.url(entry[1]))).toList();
        for (var entry : entries) {
            Utils.test(entry);
        }
    }
}
