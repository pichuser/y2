(function (root) {
    var map = root.maze.labirints.MAZE_Y;
    var path = root.maze.solution(map, 1, 0);


    /**
     * Создает HTML select с заданными опциями
     *
     * @param {string[]} options опции селекта
     * @param {string} selectedValue выбранная по умолчанию опция
     * @returns {HTMLElement} HTML элемент
     */
    function createSelect(options, selectedValue){
        var select = document.createElement('select');
        for (var i in options){
            var option = document.createElement('option');
            option.value = options[i];
            option.innerHTML = options[i];
            if(options[i] == selectedValue){
                option.selected = "selected";
            }
            select.appendChild(option);
        }
        return select;
    }
    var mazePlace = document.querySelector('.outer');
    mazePlace.appendChild(
        root.maze.render(map, path)
    );

    /**
     * Перерисовывает лабиринт
     *
     */
    window.restart = function(){
        map = root.maze.labirints[maze.selectedLabirint];
        path = root.maze.solution(map, 1, 0);
        mazePlace.innerHTML = "";
        mazePlace.appendChild(
            root.maze.render(map, path)
        );
    };
    var select = createSelect(['neuman', 'mur']);
    select.onchange = function(){
        root.maze.type = this.options[this.selectedIndex].value;
        window.restart();
    };
    document.body.querySelector('.type').appendChild(select);
    var selectLabirint = createSelect(Object.keys(root.maze.labirints), "MAZE_Y");
    selectLabirint.onchange = function(){
        root.maze.selectedLabirint = this.options[this.selectedIndex].value;
        window.restart();
    };
    document.body.querySelector('.select_labirint').appendChild(selectLabirint);
})(this);
