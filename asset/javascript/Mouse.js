import Debuggable from "./Debuggable.js";

export default class Mouse extends Debuggable {
    constructor(ctx, $canvas) {
        super(ctx)
        this.$canvas = $canvas;

        this.x = 0;
        this.y = 0;

        this.registerMoveListener();
    }

    registerMoveListener() {
        this.$canvas.addEventListener("mousemove", this.getUpdatePositionListenerForUnlocked());
    }

    getUpdatePositionListenerForUnlocked() {
        const thisMouse = this;

        return function (event) {
            let rect = thisMouse.$canvas.getBoundingClientRect();
            let root = document.documentElement;

            thisMouse.x = event.clientX - rect.left - root.scrollLeft;
            thisMouse.y = event.clientY - rect.top - root.scrollTop;
        }
    }

    toString() {
        return `(${parseInt(this.x)}, ${parseInt(this.y)})`;
    }
}