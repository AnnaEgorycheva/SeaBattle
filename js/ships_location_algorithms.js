//let field = [...Array(10)].map(() => Array(10).fill(0));

function getRandomNumber(n) {
    return Math.floor(Math.random() * (n + 1));
} 

function checkShipLocation(x, y, kx, ky, decks, playerField) {
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

function getStartDeckCoord(decksNum, playerField) {
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

    let result = checkShipLocation(x, y, kx, ky, decksNum, playerField);

	if (!result) 
        return getStartDeckCoord(decksNum, playerField);
    return {x, y, kx, ky}; // координаты первой палубы корабля, а также информацию о направлении
}

function randomLocationShips(playerField, playerShips) {
    for (let ship of playerShips) {
		let decks = ship.numOfDecks;

		let shipInfo = getStartDeckCoord(decks, playerField);
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

let enemy = new Enemy(10);
randomLocationShips(enemy.playerField, enemy.ships);
// for(let i = 0; i<10;i++){
//     for(let j = 0;j<10;j++){
//         let cur = enemy.playerField.getCell(i,j);
//         if(cur.isOccupied == true)
//             field[j][i] = 1;
//     }
// }
// console.log(field);

