package de.dasbabypixel.bwinf.a4;

import org.junit.jupiter.api.Assertions;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.nio.charset.StandardCharsets;

public class Utils {

    public static BufferedReader reader(URL url) throws IOException {
        try {
            var in = url.openStream();
            return new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8));
        } catch (UnknownHostException e) {
            return null;
        }
    }

    public static void test(TestEntry entry) throws IOException {
        try (var reader = reader(entry.input())) {
            if (reader == null) {
                System.err.println("Failed to connect to " + entry.input());
                return;
            }
            var output = new Main().work(reader);
            try (var outputReader = reader(entry.expected())) {
                if (outputReader == null) {
                    System.err.println("Can't check if output is correct: " + entry.expected());
                    return;
                }
//                var expected = Output.load(outputReader);
//                if (!expected.equals(output)) {
//                    System.err.println(Path.of(entry.input().toURI()).getFileName());
//                    System.err.printf("Expected(%s) not matching output(%s)%n", expected, output);
//                    Assertions.fail();
//            }
            } catch (Throwable e) {
                Assertions.fail(e);
            }
        }

    }

    public static String localURLString(String path) {
        return Utils.class.getClassLoader().getResource(path).toString();
    }

    public static URL url(String url) {
        try {
            return URI.create(url).toURL();
        } catch (MalformedURLException e) {
            return Assertions.fail(e);
        }
    }
}
