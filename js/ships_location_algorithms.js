field = [...Array(10)].map(() => Array(10).fill(0));

getRandomNumber = n => Math.floor(Math.random() * (n + 1));

function checkShipLocation(x, y, kx, ky, decks) {
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
            if (field[j][i] == 1)
                return false;
        }
    }
	return true;
}

function getStartDeckCoord(decksNum) {
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

    result = checkShipLocation(x, y, kx, ky, decksNum);

	if (!result) 
        return getStartDeckCoord(decksNum);
    return {x, y, kx, ky}; // координаты первой палубы корабля, а также информацию о направлении
}

function randomLocationShips() {
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
			let shipInfo = getStartDeckCoord(decks);
            while (k < decks) {
                let i_x = shipInfo.x + k * shipInfo.kx;
                let j_y = shipInfo.y + k * shipInfo.ky;
                field[j_y][i_x] = 1;
                k++;
            }
		}
	}
}

randomLocationShips();
console.log(field);