package de.dasbabypixel.bwinf.a4;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

public class BausteinTests {

    @Test
    void test() {
        // Hier sind alle Tests für die einzelnen Bausteine, dass deren Korrektheit bewiesen ist.
        // Die Werte sind aus der Angabe abgelesen.
        var weiss = Baustein.WEISS;
        assertArrayEquals(weiss.lichter(false, false), new boolean[]{true, true});
        assertArrayEquals(weiss.lichter(false, true), new boolean[]{true, true});
        assertArrayEquals(weiss.lichter(true, false), new boolean[]{true, true});
        assertArrayEquals(weiss.lichter(true, true), new boolean[]{false, false});
        var rotOben = Baustein.ROT_OBEN;
        assertArrayEquals(rotOben.lichter(false, false), new boolean[]{true, true});
        assertArrayEquals(rotOben.lichter(false, true), new boolean[]{true, true});
        assertArrayEquals(rotOben.lichter(true, false), new boolean[]{false, false});
        assertArrayEquals(rotOben.lichter(true, true), new boolean[]{false, false});
        var rotUnten = Baustein.ROT_UNTEN;
        assertArrayEquals(rotUnten.lichter(false, false), new boolean[]{true, true});
        assertArrayEquals(rotUnten.lichter(true, false), new boolean[]{true, true});
        assertArrayEquals(rotUnten.lichter(false, true), new boolean[]{false, false});
        assertArrayEquals(rotUnten.lichter(true, true), new boolean[]{false, false});
        var blau = Baustein.BLAU;
        assertArrayEquals(blau.lichter(false, false), new boolean[]{false, false});
        assertArrayEquals(blau.lichter(false, true), new boolean[]{false, true});
        assertArrayEquals(blau.lichter(true, false), new boolean[]{true, false});
        assertArrayEquals(blau.lichter(true, true), new boolean[]{true, true});
    }
}
