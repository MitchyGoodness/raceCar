// import adapter from 'webrtc-adapter';

import RaceCar from "./RaceCar.js";
import Easel from "./Easel.js";
import Grid from "./Grid.js";

let debuggingEnabled = false;

let raceCar = null;
let easel = null;
let grid = null;

const GRID_MAP = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

window.onload = function () {
    easel = new Easel();
    grid = new Grid(easel.ctx, 40, 40, 2, GRID_MAP)

    const {x, y} = grid.getRaceCarStartingCoordinates();
    raceCar = new RaceCar(easel.ctx, x, y, document.querySelector("#raceCar"));

    requestAnimationFrame(updateAll);
}

function moveAll() {
    raceCar.move();

    processRaceCarCollisionWithTiles();
}

function processRaceCarCollisionWithTiles() {
    const row = grid.getRow(raceCar.y);
    const column = grid.getColumn(raceCar.x);

    const {previousX, previousY} = raceCar.getPreviousPosition();
    const previousRow = grid.getRow(previousY);
    const previousColumn = grid.getColumn(previousX);

    if (grid.hasCollidedWithTile(row, column)) {
        let isBothCornerTilesInvisible = true;

        if (grid.isRowInGrid(previousRow) && grid.isWallTile(previousRow, column)) {
            isBothCornerTilesInvisible = false;
            raceCar.reflectVertically();
        }

        if (grid.isColumnInGrid(previousColumn) && grid.isWallTile(row, previousColumn)) {
            isBothCornerTilesInvisible = false;
            raceCar.reflectHorizontally();
        }

        if (isBothCornerTilesInvisible) {
            raceCar.reflectBackSameDirection();
        }
    }
}

function printDebuggingDetails() {
    console.log(`${raceCar.toString()}`);
}

function drawAllDebugging() {
    raceCar.drawDebugging();
}

function drawAll() {
    easel.draw();
    grid.draw();
    raceCar.draw();

    if (debuggingEnabled)
        drawAllDebugging();
}

function updateAll() {
    moveAll();
    drawAll();

    if (debuggingEnabled)
        printDebuggingDetails();

    requestAnimationFrame(updateAll);
}