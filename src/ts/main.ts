module YA {
    let mod = YA.models;
    export class map {
        initCell:YA.models.Cell;
        lastcell:YA.models.Cell;

        getNeighbor(cell:YA.models.Cell, method):YA.models.Cell[] {
            console.log(method);
            var check = (x1, y1) => {
                return x1 >= 0 && y1 >= 0 && x1 < this.map[0].length && y1 < this.map.length;
            };
            var x = cell.X;
            var y = cell.Y;
            var ans = [];
            if (method == undefined || method == 'mur') {
                for (let i = -1; i < 2; i++) {
                    for (let z = -1; z < 2; z++) {
                        if (i == 0 && z == 0) continue;
                        var x1 = x + i;
                        var y1 = y + z;
                        if (x1 >= 0 && y1 >= 0 && x1 < this.map[0].length && y1 < this.map.length) {
                            ans.push(this.map[y1][x1]);
                        }
                    }
                }
            } else if (method == 'neuman') {
                var x1 = x + -1;
                console.log(x1);
                if (check(x1, y)) {
                    ans.push(this.map[y][x1]);
                }
                x1 = x + 1;
                if (check(x1, y)) {
                    ans.push(this.map[y][x1])
                }
                var y1 = y - 1;
                if (check(x, y1)) {
                    ans.push(this.map[y1][x]);
                }
                y1 = y + 1;
                if (check(x, y1)) {
                    ans.push(this.map[y1][x]);
                }
            }
            return ans;
        }

        getAvailableNeigbor(cell:YA.models.Cell, method):YA.models.Cell[] {
            var ans = this.getNeighbor(cell, method);
            for (var i = 0; i < ans.length;) {
                let item = ans[i];
                if (item.Color == -1 || (item.Color <= cell.Color && item.Color != 0) || item.equal(this.initCell)) {
                    ans.splice(i, 1);
                } else {
                    i++;
                }
            }
            return ans;
        }

        constructor(private map:any[]) {

        }

        toString() {
            var ans = "";
            for (let y = 0; y < this.map.length; y++) {
                let row = this.map[y];
                for (let x = 0; x < row.length; x++) {
                    ans += row[x].Color + ' ';
                }
            }
            return ans;
        }

        colorNeighbor(cell, method) {
            var cells = this.getAvailableNeigbor(cell, method);
            cells.forEach(i => {
                i.Color = cell.Color + 1;
            });
        }

        static
        getMap3x3() {
            return [
                [new mod.Cell(0, 0, 0), new mod.Cell(1, 0, 0), new mod.Cell(2, 0, -1)],
                [new mod.Cell(0, 1, 0), new mod.Cell(1, 1, 0), new mod.Cell(2, 1, 0)],
                [new mod.Cell(0, 2, -1), new mod.Cell(1, 2, 0), new mod.Cell(2, 2, 0)],
            ]
        }

        static
        loadFromArray(arr) {
            let map = new YA.map([]);
            for (let y = 0; y < arr.length; y++) {
                let row = arr[y];
                let newRow = [];
                map.map.push(newRow);
                for (let x = 0; x < row.length; x++) {
                    newRow.push(new YA.models.Cell(x, y, row[x]));
                }
            }
            return map;
        }

        setInitCell(cell) {
            this.initCell = cell;
        }

        getNeighborByArray(array:YA.models.Cell[], method):YA.models.Cell[] {
            let temp = {};
            for (var i = 0; i < array.length; i++) {
                let item = array[i];
                var neigb = this.getAvailableNeigbor(item, method);
                for (var c = 0; c < neigb.length; c++) {
                    temp[neigb[c].toString()] = neigb[c];
                }
            }
            let ans = [];
            for (var i = 0; i < array.length; i++) {
                delete temp[array[i].toString()];
            }
            for (var k in temp) {
                ans.push(temp[k]);
            }
            return ans;
        }

        solve(method) {
            let initColor = this.initCell.Color;
            let next = this.getAvailableNeigbor(this.initCell, method);
            while (next.length != 0) {
                initColor++;
                for (let i = 0; i < next.length; i++) {
                    this.setColor(next[i], initColor);
                }
                next = this.getNeighborByArray(next, method);
            }
            var path = [];
            var currentCell;
            let min = Infinity;
            //поиск самой ближней по пути ячейки, находящейся на последней строке лабиринта
            if (!this.lastcell) {
                let curMap: Array<Array<YA.models.Cell>> = this.map;
                curMap[this.map.length - 1].forEach(s => {
                    if(s.Color < min && s.Color != -1){
                        min = s.Color;
                        this.lastcell = s;
                    }
                });
            }
            currentCell = this.map[this.lastcell.Y][this.lastcell.X];
            let neighbor = this.getNeighbor(this.lastcell, method);
            let inProcess = true;
            while (inProcess) {
                path.push([currentCell.X, currentCell.Y]);
                inProcess = false;
                for (let i = 0; i < neighbor.length; i++) {
                    let nextCell = neighbor[i];
                    if (nextCell.Color == currentCell.Color - 1 && nextCell.Color != -1) {
                        currentCell = nextCell;
                        neighbor = this.getNeighbor(currentCell, method);
                        inProcess = true;
                        break;
                    }
                }
            }
            return path.reverse();
        }

        setColor(cell:YA.models.Cell, color) {
            this.map[cell.Y][cell.X].Color = color;
        }

        getAsArray() {
            var ans = [];
            for (let y = 0; y < this.map.length; y++) {
                let row = this.map[y];
                let newRow = [];
                ans.push(newRow);
                for (let x = 0; x < row.length; x++) {
                    newRow.push(this.map[y][x].Color);
                }
            }
            return ans;
        }

        setLastCell(cell) {
            this.lastcell = cell;
            return true;
        }
    }
}