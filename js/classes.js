const shipStatus = {Killed: 'killed', NotKilled: 'not killed', Injured: 'injured'}
const algorythms = {};

class Player{
    playerField;
    fieldSize;
    ships = [];
    constructor(fieldSize){
        this.playerField = new Field(fieldSize);
        let ship;
        for (let i = 1; i<=4; i++){
            switch (i){
                case 1:
                    for (let j = 0; j < 4; j++){
                        ship = new Ship(1);
                        this.ships.push(ship);
                    }
                    break;
                case 2:
                    for (let j = 0; j < 3; j++){
                        ship = new Ship(2);
                        this.ships.push(ship);
                    }
                    break;
                case 3:
                    for (let j = 0; j < 2; j++){
                        ship = new Ship(3);
                        this.ships.push(ship);
                    }
                    break;
                case 4:
                    ship = new Ship(4);
                    this.ships.push(ship);
                    break;
            }
        
        }
    }

    getUnsinkableShips(){
        const ships = [];
        for (let i = 0; i < this.ships.length(); i++){

            if (this.ships[i].shipStatus != shipStatus.Killed){
                ships.push(this.ships[i]);
            }
        }
    }

    shoot(x, y, enemy){
        const res = enemy.playerField.toBeShooted(x,y);
        return res;
    }
}

class User extends Player{
    #level;
    constructor(fieldSize, level){
        super(fieldSize);
        this.#level = level;
    }

    get level(){
        return this.level;
    }
}

class Enemy extends Player{
    #cells = [];
    #chosenAlgorythm;
    #finishingMode;
    constructor(fieldSize){
        super(fieldSize,level);
        this.#finishingMode = false;
    }
}

class Ship{
    #shipStatus;
    #decks;
    constructor(numOfDecks){
        this.#decks = []
        for (let i = 0; i < numOfDecks; i++){
            this.#decks[i] = new Deck();
        }
    }

    get shipStatus(){
        return this.#shipStatus;
    }
    set shipStatus(val){
        if (val == shipStatus.Injured || val == shipStatus.Killed || val == shipStatus.NotKilled){
            this.#shipStatus = val;
        }
    }

    getNotKilledDecks(){
        const decks = [];
        for (let i = 0; i < this.#decks.length(); i++){
            if(this.#decks[i].isKilled==false){
                decks.push(this.#decks[i]);
            }
        }
        return decks;
    }

}

class Deck{
    #isKilled;
    #position;
    constructor(){
        this.#isKilled = false;
    }

    get isKilled(){
        return this.#isKilled;
    }
    set isKilled(val){
        if(typeof(val)==Boolean){
            this.#isKilled = val;
        }
    }

    

}

class Field{
    #size;
    #cells;
    constructor(size){
        this.#size = size
        this.#cells = [];
        this.#cells[0] = [];
        for(let i = 0; i < this.#size; i++){
            for(let j = 0; j < this.#size; j++){
                this.#cells[i][j] = new Cell(j,i);
            }
        }
    }
    
    getUnhitedCells(){
        const unhitedCells = [];
        for (let i = 0; i < this.#size; i++){
            for (let j = 0; j < this.#size; j++){
                if(this.#cells[i][j].isHited == false){
                    unhitedCells.push(this.#cells[i][j]);
                }
            }
            
        }
        return(unhitedCells);
    }

    getUnoccupiedCells(){
        const unoccupiedCells = [];
        for (let i = 0; i < this.#size; i++){
            for (let j = 0; j < this.#size; j++){
                if(this.#cells[i][j].canShipStandHere == true){
                    unhitedCells.push(this.#cells[i][j]);
                }
            }
            
        }
        return(unoccupiedCells);
    }

    toBeShooted(x,y){
        this.#cells[y][x].isHited = true;
        if (this.#cells[y][x].isOccupied){
            return true;
        }
        else{
            return false;
        }
        //Нужно добавить проверку занятости клетки палубой. В случае если на клетке есть палуба, поменять поле палубы isKilled на true.
    }
}

class Cell{
    #x;
    #y;
    #isHited;
    #isOccupied;
    #canShipStandHere;
    constructor(x, y){
        this.#x = x
        this.#y = y
        this.#isHited = false
        this.#isOccupied = false
        this.#canShipStandHere = true
    }

    get x(){
        return this.x;
    }
    get y(){
        return this.y;
    }

    get isHited(){
        return this.#isHited
    }
    set isHited(val){
        if(typeof(val)==Boolean){
            this.#isHited = val;
        }
    }
    
    get isOccupied(){
        return this.#isOccupied;
    }
    set isOccupied(val){
        if(typeof(val)==Boolean){
            this.#isOccupied = val;
        }
    }

    get canShipStandHere(){
        return this.#canShipStandHere;
    }

    set canShipStandHere(val){
        if(typeof(val)==Boolean){
            this.#canShipStandHere = val;
        }
    }

    placeDeck(){
        this.#canShipStandHere = false;
        this.#isOccupied = true;
        //Нужно добавить привязку клетки к конкретной палубе.
    }
}