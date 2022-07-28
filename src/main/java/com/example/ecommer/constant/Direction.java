package com.example.ecommer.constant;

public enum Direction {
    ASC("ASC"),
    DESC("DESC");

    Direction() {
    }

    Direction(String direction) {
    }

    private String direction;

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }


}
