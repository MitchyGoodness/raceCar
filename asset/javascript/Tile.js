import Rectangle from "./Rectangle.js";

class Tile {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    draw(topLeftX, topLeftY) {
        Rectangle.draw(this.ctx, topLeftX, topLeftY, this.width, this.height, "blue")
    }
}