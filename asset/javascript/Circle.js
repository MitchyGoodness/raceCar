import Debuggable from "./Debuggable.js";

export default class Circle extends Debuggable {
    constructor(ctx, centerX, centerY, radius, fillStyle) {
        super(ctx)

        this.x = centerX;
        this.y = centerY;
        this.r = radius;

        this.fillStyle = fillStyle;
    }

    convertRadToDeg(radians) {
        return radians * 180 / Math.PI;
    }

    convertDegToRad(degrees) {
        return degrees * Math.PI / 180;
    }

    draw() {
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        this.ctx.fill();
    }

    drawDebugging() {
        super.drawDebugging(this.toString(), this.x, this.y, "yellow");
    }

    toString() {
        return `pos: (${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
}