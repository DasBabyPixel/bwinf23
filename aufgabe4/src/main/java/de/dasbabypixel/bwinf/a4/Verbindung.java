package de.dasbabypixel.bwinf.a4;

import java.util.function.BooleanSupplier;

public record Verbindung(BooleanSupplier supplier, int id) {

    public static final int NO_ID = -1;

    public static final Verbindung FALSE = new Verbindung(() -> false, NO_ID), TRUE = new Verbindung(() -> true, NO_ID);

}
