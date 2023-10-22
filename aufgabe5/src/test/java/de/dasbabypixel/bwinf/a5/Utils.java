package de.dasbabypixel.bwinf.a5;

import org.junit.jupiter.api.Assertions;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;

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
                var expected = Tourpoint.load(outputReader);
                if (!expected.equals(output)) {
                    System.err.println(Path.of(entry.input().toURI()).getFileName());
                    System.err.printf("Expected(%s) not matching output(%s)%n", expected.size(), output.size());
                    for (var i = 0; i < Math.max(expected.size(), output.size()); i++) {
                        var e = i >= expected.size() ? null : expected.get(i);
                        var o = i >= output.size() ? null : output.get(i);
                        if (e == null || !e.equals(o)) System.err.printf("%2s: %40s|%40s%n", i + 1, e, o);
                    }
                    Assertions.fail();
                }
            } catch (URISyntaxException e) {
                Assertions.fail(e);
            }
        }
    }

    public static String localURLString(String path) {
        return Utils.class.getClassLoader().getResource(path).toString();
    }

    public static URL url(String url) {
        try {
            return new URL(url);
        } catch (MalformedURLException e) {
            return Assertions.fail(e);
        }
    }
}
