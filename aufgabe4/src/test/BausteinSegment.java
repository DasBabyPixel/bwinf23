package de.dasbabypixel.bwinf.a4;

public enum BausteinSegment {
    r("r"), R("R"), W("W"), B("B"), X("X"), INPUT("Q"), OUTPUT("L");
    private final String string;

    BausteinSegment(String string) {
        this.string = string;
    }

    public static BausteinSegment get(String name) {
        for (var value : values()) {
            if (value.string.equals(name)) return value;
        }
        if (name.startsWith("Q")) return INPUT;
        if (name.startsWith("L")) return OUTPUT;
        return null;
    }

    public static int id(BausteinSegment segment, String name) {
        if (segment == null) return Verbindung.NO_ID;
        return switch (segment) {
            case INPUT, OUTPUT -> Integer.parseInt(name.substring(INPUT.toString().length()));
            default -> Verbindung.NO_ID;
        };
    }

    @Override
    public String toString() {
        return string;
    }
}
