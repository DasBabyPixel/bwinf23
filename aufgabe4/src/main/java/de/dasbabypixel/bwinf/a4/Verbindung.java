package de.dasbabypixel.bwinf.a4;

import java.util.function.BooleanSupplier;

public record Verbindung(BooleanSupplier supplier) {

    public static final Verbindung FALSE = new Verbindung(() -> false), TRUE = new Verbindung(() -> true);

}
