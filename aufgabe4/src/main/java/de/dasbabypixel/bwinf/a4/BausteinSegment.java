package de.dasbabypixel.bwinf.a4;

public enum BausteinSegment {
    r("r"), R("R"), W("W"), B("B"), X("X"), INPUT("Qx"), OUTPUT("Lx");
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

    @Override
    public String toString() {
        return string;
    }
}
