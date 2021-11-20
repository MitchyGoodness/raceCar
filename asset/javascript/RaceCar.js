import Debuggable from "./Debuggable.js";

export default class RaceCar extends Debuggable {
    constructor(ctx, x, y, graphic) {
        super(ctx);
        this.graphic = graphic;

        this.startPostition = {x: x, y: y};

        this.x = x;
        this.y = y;

        this.speed = 2;
        this.angle = 0;
    }

    reflectVertically() {
        const {xSpeed, ySpeed} = this.getSpeedVector()
        this.angle = Math.acos(-xSpeed);
    }

    reflectHorizontally() {
        const {xSpeed, ySpeed} = this.getSpeedVector()
        this.angle = Math.asin(-ySpeed);
    }

    reflectBackSameDirection() {
        this.reflectVertically();
        this.reflectHorizontally()
    }

    getSpeedVector() {
        return {x: this.speed * Math.cos(this.angle), y: this.speed * Math.sin(this.angle)};
    }

    reset() {
        this.x = this.startPostition.x;
        this.y = this.startPostition.y;
    }

    getPreviousPosition() {
        const {x, y} = this.getSpeedVector();
        return {x: this.x - x, y: this.y - y};
    }

    getNextPosition() {
        const {x, y} = this.getSpeedVector();
        return {x: this.x + x, y: this.y + y}
    }

    move() {
        const {x, y} = this.getNextPosition();
        this.x = x;
        this.y = y;

        this.angle += 0.02;
    }

    draw() {
        const width = this.graphic.width;
        const height = this.graphic.height;

        this.ctx.save();

        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);

        this.ctx.drawImage(this.graphic, width * -0.5, height * -0.5, width, height);

        this.ctx.restore();
    }

    getSpeedStats() {
        const {xSpeed, ySpeed} = this.getSpeedVector();
        return `vector: (${xSpeed.toFixed(2)}, ${ySpeed.toFixed(2)})`;
    }

    getCenterStats() {
        return `center: (${this.x}, ${this.y})`;
    }

    getDimensionStats() {
        return `w: ${this.graphic.width} h: ${this.graphic.height}`;
    }

    toString() {
        return `RaceCar: {${this.getSpeedStats()} ${this.getCenterStats()} ${this.getDimensionStats()}}`
    }
}