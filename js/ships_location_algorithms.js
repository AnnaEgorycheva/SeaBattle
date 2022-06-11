let SHIP_LOCATION_ALGORITHMS = {
    random_ship_location_algoritm: 0,
    diagonals_ship_location_algorithm: 1
}
let chosenAlgorithm; 
let field = [...Array(10)].map(() => Array(10).fill(0));

function getRandomNumber(n) {
    return Math.floor(Math.random() * (n + 1));
} 

function checkShipLocationForRandomAlgoritm(x, y, kx, ky, decks, playerField) {
    let fromX, toX, fromY, toY;

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
        return false;

    for (let i = fromX; i < toX; i++) {
        for (let j = fromY; j < toY; j++) {
            let currentCell = playerField.getCell(j, i);
            if (currentCell.isOccupied == true)
                return false;
        }
    }
	return true;
}

function getStartDeckCoordForRandomAlgoritm(decksNum, playerField) {
    let x, y;
    let kx = getRandomNumber(1); 
    let ky = (kx == 0) ? 1 : 0;

    if (kx == 0) {
		x = getRandomNumber(9); 
        y = getRandomNumber(10 - decksNum);
	} else {
		x = getRandomNumber(10 - decksNum); 
        y = getRandomNumber(9);
	}

    let result = checkShipLocationForRandomAlgoritm(x, y, kx, ky, decksNum, playerField);

	if (!result) 
        return getStartDeckCoordForRandomAlgoritm(decksNum, playerField);
    return {x, y, kx, ky}; // координаты первой палубы корабля, а также информацию о направлении
}

function randomLocationShips(playerField, playerShips) {
    for (let ship of playerShips) {
		let decks = ship.numOfDecks;

		let shipInfo = getStartDeckCoordForRandomAlgoritm(decks, playerField);
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







function checkShipLocationForDiagonalAlgoritm(x, y, kx, ky, decks, locationAlgorithm) {
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
        res = false;

    switch(SHIP_LOCATION_ALGORITHMS[locationAlgorithm]){
        case 1:
            let k = 0;
            while (k < decks) {
                let i_x = x + k * kx;
                let j_y = y + k * ky;
                if(i_x == j_y || i_x == (9 - j_y)){
                    res = false
                }
                k++;
            }
            break;
    }
    
    // let k = 0;
    // while (k < decks) {
    //     let i_x = x + k * kx;
    //     let j_y = y + k * ky;
    //     if(i_x == j_y || i_x == (9 - j_y)){
    //         return false
    //     }
    //     k++;
    // }
    for (let i = fromX; i < toX; i++) {
        for (let j = fromY; j < toY; j++) {
            if (field[j][i] == 1)
                res = false;
        }
    }
	return res;
}

function getStartDeckCoordForDiagonalAlgoritm(decksNum, locationAlgorithm) {
    let x, y;
    let kx = getRandomNumber(1); 
    let ky = (kx == 0) ? 1 : 0;

    if (kx == 0) {
		x = getRandomNumber(9); 
        y = getRandomNumber(10 - decksNum);
	} else {
		x = getRandomNumber(10 - decksNum); 
        y = getRandomNumber(9);
	}

    // let result;
    // switch(SHIP_LOCATION_ALGORITHMS[locationAlgorithm]){
    //     case 0:
    //         result = checkShipLocationForRandomAlgoritm(x, y, kx, ky, decksNum);
    //         break;
    //     case 1:
    //         result = checkShipLocationForDiagonalAlgoritm(x, y, kx, ky, decksNum);
    //         break;
    // }
    let result = checkShipLocationForDiagonalAlgoritm(x, y, kx, ky, decksNum, locationAlgorithm);

	if (!result) 
        return getStartDeckCoordForDiagonalAlgoritm(decksNum, locationAlgorithm);
    return {x, y, kx, ky}; // координаты первой палубы корабля, а также информацию о направлении
}

function getShipsLocation(locationAlgorithm) {
    let SHIP_DATA = {
		fourdeck: [1, 4],
		tripledeck: [2, 3],
		doubledeck: [3, 2],
		singledeck: [4, 1]
	};
    for (let type in SHIP_DATA) {
        let count = SHIP_DATA[type][0];
		let decks = SHIP_DATA[type][1];
        for (let i = 0; i < count; i++) {
            let k = 0;
			let shipInfo = getStartDeckCoordForDiagonalAlgoritm(decks, locationAlgorithm);
            while (k < decks) {
                let i_x = shipInfo.x + k * shipInfo.kx;
                let j_y = shipInfo.y + k * shipInfo.ky;
                field[j_y][i_x] = 1;
                k++;
            }
        }
    }
}

chosenAlgorithm = 'diagonals_ship_location_algorithm';
getShipsLocation(chosenAlgorithm);
console.log(field);

//let enemy = new Enemy(10);
//randomLocationShips(enemy.playerField, enemy.ships);
// for(let i = 0; i<10;i++){
//     for(let j = 0;j<10;j++){
//         let cur = enemy.playerField.getCell(i,j);
//         if(cur.isOccupied == true)
//             field[j][i] = 1;
//     }
// }
// console.log(field);