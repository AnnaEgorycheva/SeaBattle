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
        this.#shipStatus = val;
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
}