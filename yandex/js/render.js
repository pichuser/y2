(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Создает HTML элемент заданного типа с заданным CSS классом
     *
     * @param {string} type тип создаваемого HTML элемента
     * @param {string} className CSS класс
     * @returns {HTMLElement} HTML элемент
     */
    function element(type, className) {
        var elem = document.createElement(type);
        elem.className = className;
        return elem;
    }

    /**
     * Создает визуализацию лабиринта по его схеме с возможностью наложения маршрута
     *
     * @param {number[][]} maze схема лабиринта
     * @param {[number, number][]} [path] маршрут
     * @returns {HTMLElement} HTML элемент
     */
    function render(maze, path) {

        var containerElem = element('div', 'maze'),
            rowElem,
            type,
            row,
            cell,
            x,
            y;

        for (y = 0; y < maze.length; y++) {
            row = maze[y];
            rowElem = element('div', 'maze__row');

            for (x = 0; x < row.length; x++) {
                cell = row[x];

                switch (cell) {
                    case WALL:
                        type = 'wall';
                        break;

                    case PATH:
                        type = 'path';
                        break;

                    case CURRENT:
                        type = 'current';
                        break;

                    default:
                        type = undefined;
                }

                rowElem.appendChild(
                    element('div', 'maze__cell' + (type ? ' maze__cell_' + type : ''))
                );
            }
            containerElem.appendChild(rowElem);
        }
        if (path && path.length) {
            var point,
                i;
            i = -1;
            function drawCurrentStep () {
                console.log('drawCurrentStep');
                if (i < path.length) {
                    point = path[i];
                    if (point) {
                        var row = containerElem.children[point[1]];
                        var cell = row.children[point[0]];
                        cell.className = 'maze__cell maze__cell_path';
                    }
                    point = path[i + 1];
                    if (point) {
                        var rowCurrent = containerElem.children[point[1]];
                        var cellCurrent = rowCurrent.children[point[0]];
                        cellCurrent.className = 'maze__cell maze__cell_current';
                    }
                    setTimeout(drawCurrentStep, document.getElementById('temp').value);
                }
                i++;
            };
            drawCurrentStep();
        }
        return containerElem;
    }

    root.maze.render = render;
})(this);
