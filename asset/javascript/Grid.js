import Rectangle from "./Rectangle.js";

export default class Grid {
    constructor(ctx, tileWidth, tileHeight, tilePadding, gridMap) {
        this.ctx = ctx;

        this.gridMap = gridMap;

        this.unit = {
            width: tileWidth,
            height: tileHeight,
            padding: tilePadding
        };

        this.columnCount = gridMap[0].length;
        this.rowCount = gridMap.length;
    }


    getColumn(posX) {
        return Math.floor(posX / this.unit.width);
    }

    getRow(positionY) {
        return Math.floor(positionY / this.unit.height);
    }

    isColumnInGrid(column) {
        return 0 <= column && column < this.columnCount;
    }

    isRowInGrid(row) {
        return 0 <= row && row < this.rowCount;
    }

    isWallTile(row, column) {
        return this.gridMap[row][column] === 1;
    }

    hasCollidedWithTile(row, column) {
        return this.isColumnInGrid(column) && this.isRowInGrid(row) && this.isWallTile(row, column);
    }

    getRaceCarStartingCoordinates() {
        const ballIndex = {};

        nestedForLoop:{
            for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
                for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {

                    if (this.gridMap[rowIndex][columnIndex] === 2) {
                        ballIndex.row = rowIndex;
                        ballIndex.column = columnIndex;
                        break nestedForLoop;
                    }
                }
            }
        }

        return {
            x: (ballIndex.column + .5) * this.unit.width,
            y: (ballIndex.row + .5) * this.unit.height
        }

    }

    draw() {
        for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {

                if (this.gridMap[rowIndex][columnIndex] === 1) {
                    Rectangle.draw(
                        this.ctx,
                        this.unit.width * columnIndex + this.unit.padding / 2,
                        this.unit.height * rowIndex + this.unit.padding / 2,
                        this.unit.width - this.unit.padding,
                        this.unit.height - this.unit.padding,
                        "blue"
                    );
                }
            }
        }
    }
}