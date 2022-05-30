const shipStatus = {Killed: 'killed', NotKilled: 'not killed', Injured: 'injured'}
const algorythms = {};

class Player{
    playerField;
}

class User extends Player{
    level;
}

class Enemy extends Player{
    cells = [];
    chosenAlgorythm;
    finishingMode;
}

class Ship{
    shipStatus;
}

class Deck{
    isKilled;
}

class Field{
    #size;
    
}

class Cell{
    #x;
    #y;
    #isHited;
    #isOccupied;
    #canShipStandHere;

}