package de.dasbabypixel.bwinf.a4;

public interface Baustein {

    Baustein ROT_OBEN = new Rot(true);
    Baustein ROT_UNTEN = new Rot(false);
    Baustein BLAU = new Blau();
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

    class Weiss implements Baustein {
        private Weiss() {
        }

        @Override
        public boolean[] lichter(boolean oben, boolean unten) {
            var b = !(oben && unten);
            return new boolean[]{b, b};
        }
    }

    class Blau implements Baustein {
        private Blau() {
        }

        @Override
        public boolean[] lichter(boolean oben, boolean unten) {
            return new boolean[]{oben, unten};
        }
    }
}
