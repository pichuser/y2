///<reference path="../../typings/tsd.d.ts"/>
///<reference path="../ts/main.ts"/>
///<reference path="../ts/Cell.ts"/>
var expect = chai.expect;
describe('labirint', ()=> {
    describe('map', () => {
        var struct = YA.map.getMap3x3();
        var map;
        var beforeFunc = () => {
            map = new YA.map(YA.map.getMap3x3());
            map.setInitCell(new YA.models.Cell(0, 0, 0));
            map.setLastCell(struct[2][2]);
        };
        it('should return all neighbour cell', () => {
            beforeFunc();
            expect(map.getNeighbor(struct[0][0], 'mur').length).to.equal(3);
            expect(map.getNeighbor(struct[0][0]), 'mur').to.contain(struct[0][1]);
        });
        it('only available neighbor', () => {
            beforeFunc();
            expect(map.getAvailableNeigbor(struct[0][0]).length).to.equal(3);
        });
        it('all available neighbor', () => {
            beforeFunc();
            expect(map.getNeighbor(struct[1][0]).length).to.equal(5);
            map.setInitCell(struct[1][0]);
            expect(map.getAvailableNeigbor(struct[1][0]).length).to.equal(4);
        });
        it('map to string', () => {
            beforeFunc();
            expect(map.toString()).to.equal("0 0 -1 0 0 0 -1 0 0 ");
        });
        it('map after color', () => {
            beforeFunc();
            map.colorNeighbor(struct[0][0]);
            expect(map.toString()).to.equal("0 1 -1 1 1 0 -1 0 0 ");
            map.colorNeighbor(new YA.models.Cell(1, 1, 1));
            expect(map.toString()).to.equal("0 1 -1 1 1 2 -1 2 2 ");
        });
        it('can get neigbors by array of Cell', () => {
            beforeFunc();
            expect(map.getNeighborByArray([struct[0][1], struct[1][1]]).length).to.equal(4);
        });
        it('yor can set color to cell', () => {
            map.setColor(struct[0][0], 2);
            expect(map.toString()).to.equal('2 0 -1 0 0 0 -1 0 0 ');
        });
        it('if you at corner', () => {
            beforeFunc();
            expect(map.getAvailableNeigbor(struct[2][2]).length).to.equal(3);
        });
        it('after solver map will be', () => {
            beforeFunc();
            map.solve();
            expect(map.toString()).to.equal('0 1 -1 1 1 2 -1 2 2 ');
        });
        it('test read map from string', () => {
            var init = "0 0 -1 0 0 0 -1 0 0 ";
            var arr = [
                [0, 0, -1],
                [0, 0, 0],
                [-1, 0, 0]
            ];
            map = YA.map.loadFromArray(arr);
            expect(map.toString()).to.equal(init);
        });
        it('test get map as array of array', () => {
            beforeFunc();
            expect(map.getAsArray()).to.eql([
                [0, 0, -1],
                [0, 0, 0],
                [-1, 0, 0]
            ]);
        });
    });
    describe('find solution', ()=> {
        var struct = YA.map.getMap3x3();
        var map;
        var beforeFunc = () => {
            map = new YA.map(YA.map.getMap3x3());
            map.setInitCell(new YA.models.Cell(0, 0, 0));
            map.setLastCell(struct[2][2]);
        };
        it('set last cell', ()=> {
            beforeFunc();
            expect(map.setLastCell(struct[2][2])).to.equal(true);
        });
        it('should return path from init to last cell', () => {
            beforeFunc();
            var path = map.solve();
            expect(path.length).to.equal(3);
        });
    });
    describe("Neuman", () => {
        var struct = YA.map.getMap3x3();
        var map;
        var beforeFunc = () => {
            map = new YA.map(YA.map.getMap3x3());
            map = new YA.map(YA.map.getMap3x3());
            map.setInitCell(new YA.models.Cell(0, 0, 0));
            map.setLastCell(struct[2][2]);
        };
        it('should return all neighbour cell', () => {
            beforeFunc();
            console.log('test');
            expect(map.getNeighbor(struct[0][0], 'neuman').length).to.equal(2);
            expect(map.getNeighbor(struct[0][0], 'neuman')).to.contain(struct[0][1]);
        });
        it('only available neighbor', () => {
            beforeFunc();
            expect(map.getAvailableNeigbor(struct[0][0]).length).to.equal(3);
        });
        it('all available neighbor', () => {
            beforeFunc();
            expect(map.getNeighbor(struct[1][0],'neuman').length).to.equal(3);
            map.setInitCell(struct[1][0]);
            expect(map.getAvailableNeigbor(struct[1][0],'neuman').length).to.equal(2);
        });
        it('map after color', () => {
            beforeFunc();
            map.colorNeighbor(struct[0][0], 'neuman');
            expect(map.toString()).to.equal("0 1 -1 1 0 0 -1 0 0 ");
            map.colorNeighbor(new YA.models.Cell(1, 0, 1), 'neuman');
            expect(map.toString()).to.equal("0 1 -1 1 2 0 -1 0 0 ");
        });
        it('can get neigbors by array of Cell', () => {
            beforeFunc();
            expect(map.getNeighborByArray([struct[0][1], struct[1][1]], 'neuman').length).to.equal(3);
        });
        it('if you at corner', () => {
            beforeFunc();
            expect(map.getAvailableNeigbor(struct[2][2], 'neuman').length).to.equal(2);
        });
        it('after solver map will be', () => {
            beforeFunc();
            map.solve('neuman');
            expect(map.toString()).to.equal('0 1 -1 1 2 3 -1 3 4 ');
        });
    });
});