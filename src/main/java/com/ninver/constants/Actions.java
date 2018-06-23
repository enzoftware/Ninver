package com.ninver.constants;

public enum Actions {
    SING_IN(1),
    SING_UP(2),
    CALCULATE(3),
    RECALCULATE(4),
    PDF(5);

    private final int levelCode;

    Actions(int levelCode) {
        this.levelCode = levelCode;
    }

    public int getLevelCode() {
        return this.levelCode;
    }

}
