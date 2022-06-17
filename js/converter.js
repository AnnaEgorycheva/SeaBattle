class LightShip {
    decksNum;
    direction;
    x;
    y;
    constructor(decksNum, direction){
        this.decksNum = decksNum;
        this.direction = direction;
        this.x = [];
        this.y = [];
    }
}

function convertPlayerInfoToLightShipInfo(player) {
    let allLightShips = [];
    for(let ship of player.ships) {
        let lightShip = new LightShip(ship.numOfDecks, ship.direction);
        for(let deck of ship.decks) {
            lightShip.x.push(deck.position.x);
            lightShip.y.push(deck.position.y);
        }
        allLightShips.push(lightShip);
    }
    return allLightShips;
}

function convertLightShipInfoToPlayerInfo(allLightShips, role) {
    let player = role == 'user' ? new User(10) : new Enemy(10);
    for(let i = 0; i < 10; i++) {
        let lightShip = allLightShips[i];
        let playerShip = player.ships[i];

        playerShip.direction = lightShip.direction;

        for(let d = 0; d < lightShip.decksNum; d++) {
            let deck = playerShip.decks[d];
            let curCell = player.playerField.getCell(lightShip.x[d], lightShip.y[d]);

            deck.setPosition(curCell);
        }
    }
    return player;
}
