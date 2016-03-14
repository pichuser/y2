module YA.models{
    export class Cell{
        X: number;
        Y: number;
        Color: number;
        constructor(X:number ,Y:number, Color: number){
            this.X = X;
            this.Y = Y;
            this.Color = Color;
        }
        equal(cell){
            return this.X == cell.X && this.Y == cell.Y;
        }
        toString(){
            return '' + this.Y + '_' + this.X;
        }

    }
}