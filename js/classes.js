const shipStatus = {Killed: 'killed', NotKilled: 'not killed', Injured: 'injured'}
const algorythms = {RandomGame: 'random game'};
let level, isGameEnded = false;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

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

    
}

class User extends Player{
   
}

class Enemy extends Player{
    #cells = [];
    #chosenAlgorythm;
    #finishingMode;
    #finishingCells = [];
    #currentShip
    #didEnemyHitDeck = false;
    constructor(fieldSize){
        super(fieldSize,level);
        this.#finishingMode = false;;
    }
    
    toPlay(userField){
        if (this.#finishingMode){
            this.finishShip(userField)
            if (this.#finishingMode){
                this.randomPlay(userField);
                this.shoot(this.#cells.shift().x,this.#cells.shift().y);
            }
        }
        else {
            let cell = this.#cells.shift();
            let res = this.shoot(cell.x,cell.y, userField);
            if(res){
                this.#finishingMode = true;
                this.#finishingCells.push(userField.getCell(this.#cells.shift().x,this.#cells.shift().y));
            }
        }
    }

    finishShip(userField){
        let x, y, res;
        if(this.#currentShip.length() == 1){
            
            x = this.#finishingCells[0].x;
            y = this.#finishingCells[0].y;
            if(userField.getCell(x+1, y).isHited == false && (x + 1)<this.fieldSize){
                res = this.shoot(x+1, y, userField);
                if(res ==true){
                    this.#finishingCells.push(userField.getCell(x+1, y));
                }
                   
            }
            else if(userFieldgetCell(x-1, y).isHited == false && (x - 1)>=0){
                res = this.shoot(x-1, y, userField);
                if(res ==true){
                    this.#finishingCells.push(userField.getCell(x-1, y));
                }
                    
            }
            else if(userField.getCell(x, y+1).isHited == false && (y + 1)<this.fieldSize){
                res = this.shoot(x, y+1, userField);
                if(res ==true){
                    this.#finishingCells.push(userField.getCell(x, y+1));
                }
                
            }
            else if(userField.getCell(x, y-1).isHited == false && (y - 1)>=0){
                res = this.shoot(x, y-1, userField);
                if(res ==true){
                    this.#finishingCells.push(userField.getCell(x, y-1));
                }
                    
            }
            
        }
        else{
            for (let i = 0; i<this.#finishingCells.length(); i++){
                x = this.#finishingCells[i].x;
                y = this.#finishingCells[i].y;
                if ((userField.getCell(x+1,y).isHited == false) && (userField.getCell(x-1,y).isHited == true && userField.getCell(x-1,y).isOccupied == true)&& ((x + 1)<this.fieldSize)){
                    res = this.shoot(x+1, y, userField);
                    if(res ==true){
                        this.#finishingCells.push(userField.getCell(x+1, y));
                    }
                    break;
                }
                else if ((userField.getCell(x-1,y).isHited == false) && (userField.getCell(x+1,y).isHited == true && userField.getCell(x+1,y).isOccupied == true)&& ((x - 1)>=0)){
                    res = this.shoot(x-1, y, userField);
                    if(res ==true){
                        this.#finishingCells.push(userField.getCell(x-1, y));
                    }
                    break;
                }
                else if ((userField.getCell(x,y+1).isHited == false) && (userField.getCell(x,y-1).isHited == true && userField.getCell(x,y-1).isOccupied == true)&& ((y + 1)<this.fieldSize)){
                    res = this.shoot(x, y+1, userField);
                    if(res ==true){
                        this.#finishingCells.push(userField.getCell(x, y+1));
                    }
                    break;
                }
                else if ((userField.getCell(x,y-1).isHited == false) && (userField.getCell(x,y+1).isHited == true && userField.getCell(x,y+1).isOccupied == true)&& ((y - 1)>=0)){
                    res = this.shoot(x, y-1, userField);
                    if(res ==true){
                        this.#finishingCells.push(userField.getCell(x, y-1));
                    }
                    break;
                }
            }


        }
        if (this.#finishingCells[0].deck.ship.shipStatus = shipStatus.Killed){
            this.#finishingMode = false;
        }
    }

    changeAlgorythm(){

    }

    startGame(userField){
        this.#chosenAlgorythm = algorythms.RandomGame;
        this.randomPlay(userField);
    }

    randomPlay(userField){
        let cellsLeft = userField.getUnhitedCells().length;
        let unhitedCells = userField.getUnhitedCells();
        let indexes = [], index;
        for (let i = 0; i < cellsLeft; i++){
            indexes[i] = i;
        }
        indexes = shuffle(indexes);
        for (let i = 0; i < cellsLeft; i ++){
            index = indexes[i];
            this.#cells.push(unhitedCells[index]);
        }
    }
    
    shoot(x, y, userField){
        const res = userField.toBeShooted(x,y);
        return res;
    }

}

class Ship{
    #shipStatus;
    #decks;
    #numOfDecks;
    constructor(numOfDecks){
        this.#numOfDecks = numOfDecks;
        this.#decks = []
        for (let i = 0; i < numOfDecks; i++){
            this.#decks[i] = new Deck(this);
        }
    }

    get decks(){
        return this.#decks;
    }

    get shipStatus(){
        return this.#shipStatus;
    }
    set shipStatus(val){
        if (val == shipStatus.Injured || val == shipStatus.Killed || val == shipStatus.NotKilled){
            this.#shipStatus = val;
        }
    }

    get numOfDecks(){
        return this.#numOfDecks;
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
    #ship;
    constructor(ship){
        this.#isKilled = false;
        this.#ship = ship;
    }

    get isKilled(){
        return this.#isKilled;
    }
    set isKilled(val){
        if(typeof(val)==Boolean){
            this.#isKilled = val;
        }
    }

    get ship(){
        return this.#ship;
    }

    setPosition(cell){
        cell.placeDeck(this);
        this.#position = cell;
    }
    

}

class Field{
    #size;
    #cells;
    constructor(size){
        this.#size = size
        this.#cells = [];
        for (let i = 0; i < this.#size; i++) {
            this.#cells[i] = []
            for (let j = 0; j < this.#size; j++) {
                this.#cells[i][j] = new Cell(j,i);
            }
          }
    }

    getCell(x,y){
        return this.#cells[y][x];
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
    x;
    y;
    isHited;
    #isOccupied;
    #deck;
    constructor(x, y){
        this.x = x
        this.y = y
        this.isHited = false
        this.#isOccupied = false
    }
    
    get isOccupied(){
        return this.#isOccupied;
    }
    set isOccupied(val){
        if(typeof(val)==Boolean){
            this.#isOccupied = val;
        }
    }

    get deck(){
        return this.#deck;
    }

    placeDeck(deck){
        this.#isOccupied = true;
        this.#deck = deck;
        //Нужно добавить привязку клетки к конкретной палубе.
    }
}


