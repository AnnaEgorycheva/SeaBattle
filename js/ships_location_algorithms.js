let SHIP_LOCATION_ALGORITHMS = {
    random_ship_location_algoritm: 0,
    diagonals_ship_location_algorithm: 1,
    shores_ship_location_algorithm: 2
}
let chosenAlgorithm; 
let field = [...Array(10)].map(() => Array(10).fill(0));

// function getRandomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// } 

function getRandomNumber(boundInfo) {
    let randomNumber, randomIndex;
    switch(boundInfo.type) {
        case 'range':
            randomNumber = Math.floor(Math.random() * (boundInfo.max - boundInfo.min + 1)) + boundInfo.min;
            break;
        case 'enum':
            randomIndex = Math.floor(Math.random() * boundInfo.arr.length);
            randomNumber = boundInfo.arr[randomIndex];
            break;
    }
    return randomNumber;
}

function checkShipLocation(x, y, kx, ky, decks, playerField, algorithm) {
    let fromX, toX, fromY, toY;
    let res = true;

	fromX = (x == 0) ? x : x - 1;
    if (kx == 1)
        toX = (x + kx * decks == 10) ? x + kx * decks : x + kx * decks + 1;
    else 
        toX = (x == 9) ? x + 1 : x + 2;

    fromY = (y == 0) ? y : y - 1;
    if (ky == 1)
        toY = (y + ky * decks == 10) ? y + ky * decks : y + ky * decks + 1;
    else
        toY = (y == 9) ? y + 1 : y + 2;

	if (toX === undefined || toY === undefined) 
        res =  false;

    switch(SHIP_LOCATION_ALGORITHMS[algorithm]) {
        case 1:
            let k = 0;
            while (k < decks) {
                let i_x = x + k * kx;
                let j_y = y + k * ky;
                if (i_x == j_y || i_x == (9 - j_y)) 
                    res = false;
                k++;
            }
            break;
    }
    for (let i = fromX; i < toX; i++) {
        for (let j = fromY; j < toY; j++) {
            let currentCell = playerField.getCell(j, i);
            if (currentCell.isOccupied == true)
                res = false;
        }
    }
	return res;
}

function getStartDeckCoord(decksNum, playerField, algorithm) {
    let x, y, x_possible, y_possible;
    let kx = getRandomNumber({type: "range", min: 0, max: 1}); 
    let ky = (kx == 0) ? 1 : 0;

    switch(SHIP_LOCATION_ALGORITHMS[algorithm]) {
        case 0:
        case 1:
            if (kx == 0) {
                x_possible = {type: "range", min: 0, max: 9};
                y_possible = {type: "range", min: 0, max: (10 - decksNum)};
            }
            else {
                x_possible = {type: "range", min: 0, max: (10 - decksNum)};
                y_possible = {type: "range", min: 0, max: 9};
            }
            break;
        case 2:
            if (kx == 0) {
                x_possible = {type: "enum", arr: [0, 9]};
                y_possible = {type: "range", min: 0, max: (10 - decksNum)};
            }
            else {
                x_possible = {type: "range", min: 0, max: (10 - decksNum)};
                y_possible = {type: "enum", arr: [0, 9]};
            }
            break;
    }

    x = getRandomNumber(x_possible);
    y = getRandomNumber(y_possible);

    let result = checkShipLocation(x, y, kx, ky, decksNum, playerField, algorithm);

	if (!result) 
        return getStartDeckCoord(decksNum, playerField, algorithm);
    return {x, y, kx, ky}; // координаты первой палубы корабля, а также информацию о направлении
}

function getShipsLocation(playerField, playerShips, algorithm) {
    for (let ship of playerShips) {
		let decks = ship.numOfDecks;

		let shipInfo = getStartDeckCoord(decks, playerField, algorithm);
        let k = 0;
        for (let deck of ship.decks) {
            let x = shipInfo.x + k * shipInfo.kx;
            let y = shipInfo.y + k * shipInfo.ky;
            let curCell = playerField.getCell(y, x);

            deck.setPosition(curCell);
            k++;
        }
    }
}


chosenAlgorithm = 'shores_ship_location_algorithm';
let enemy = new Enemy(10);
getShipsLocation(enemy.playerField, enemy.ships, chosenAlgorithm);
for(let i = 0; i<10;i++){
    for(let j = 0;j<10;j++){
        let cur = enemy.playerField.getCell(i,j);
        if(cur.isOccupied == true)
            field[j][i] = 1;
    }
}
console.log(enemy);
console.log(field);