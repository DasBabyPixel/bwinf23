package de.dasbabypixel.bwinf.a4;

/**
 * Ein Interface um alle Bausteine gleich behandeln zu können.
 * <br>
 * Dies ist optimal, da alle Baustein gleich groß sind, zwei Inputs und zwei Outputs haben.
 * <br>
 * Im Fall des roten Bausteins ist dieser auch mit zwei Inputs implementiert, einer wird jedoch ignoriert.
 */
public sealed interface Baustein permits Baustein.Blau, Baustein.Rot, Baustein.Weiss {

    /**
     * Der rote Baustein, der den Lichtsensor oben hat.
     */
    Baustein ROT_OBEN = new Rot(true);
    /**
     * Der rote Baustein, der den Lichtsensor unten hat.
     */
    Baustein ROT_UNTEN = new Rot(false);
    /**
     * Der blaue Baustein
     */
    Baustein BLAU = new Blau();
    /**
     * Der weiße Baustein
     */
    Baustein WEISS = new Weiss();

    boolean[] lichter(boolean oben, boolean unten);

    final class Rot implements Baustein {

        public final boolean oben;

        private Rot(boolean oben) {
            this.oben = oben;
        }

        @Override
        public boolean[] lichter(boolean oben, boolean unten) {
            var b = !(this.oben ? oben : unten);
            return new boolean[]{b, b};
        }
    }

    final class Weiss implements Baustein {
        private Weiss() {
        }

        @Override
        public boolean[] lichter(boolean oben, boolean unten) {
            var b = !(oben && unten);
            return new boolean[]{b, b};
        }
    }

    final class Blau implements Baustein {
        private Blau() {
        }

        @Override
        public boolean[] lichter(boolean oben, boolean unten) {
            return new boolean[]{oben, unten};
        }
    }
}
