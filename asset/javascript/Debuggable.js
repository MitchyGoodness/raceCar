export default class Debuggable {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawDebugging(text, positionX, positionY, fillStyle) {
        this.ctx.font = "15px Sans-serif";
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 3;
        this.ctx.strokeText(text, positionX, positionY);

        this.ctx.fillStyle = fillStyle;
        this.ctx.fillText(text, positionX, positionY);
    }
}