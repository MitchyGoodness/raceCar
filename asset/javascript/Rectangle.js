import Debuggable from './Debuggable.js';

export default class Rectangle extends Debuggable {
    constructor(ctx, topLeftX, topLeftY, width, height, fillStyle) {
        super(ctx)

        this.topLeftX = topLeftX;
        this.topLeftY = topLeftY;
        this.width = width;
        this.height = height;

        this.fillStyle = fillStyle;
    }

    draw() {
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fillRect(this.topLeftX, this.topLeftY, this.width, this.height);
    }

    static draw(ctx, x, y, width, height, fillStyle){
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x,y, width,height);
    }
}