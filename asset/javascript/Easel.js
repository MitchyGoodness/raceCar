import Rectangle from "./Rectangle.js";

export default class Easel extends Rectangle {
    constructor() {
        const $canvas = document.querySelector("#gameCanvas");
        const ctx = $canvas.getContext("2d");

        super(ctx, 0, 0, $canvas.width, $canvas.height, "black");

        this.$canvas = $canvas
    }
}