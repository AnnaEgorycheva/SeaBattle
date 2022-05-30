const shipStatus = {Killed: 'killed', NotKilled: 'not killed', Injured: 'injured'}
const algorythms = {};

class Player{
    playerField;
    fieldSize;
    constructor(fieldSize){
        this.playerField = new Field(fieldSize);
    }
}

class User extends Player{
    #level;
    constructor(fieldSize, level){
        super(fieldSize);
        this.#level = level;
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
}

class Deck{
    #isKilled;
    #position;
    constructor(){
        this.#isKilled = false;
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
}