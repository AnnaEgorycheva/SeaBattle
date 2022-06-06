field = [...Array(10)].map(() => Array(10).fill(0));

getRandom = n => Math.floor(Math.random() * (n + 1));

function checkShipLocation(x, y, kx, ky, decks) {
    let fromX, toX, fromY, toY;

	fromX = (x == 0) ? x : x - 1;
	if (kx == 1 && x + kx * decks == 10) 
        toX = x + kx * decks;
	else if (kx == 1 && x + kx * decks < 10) 
        toX = x + kx * decks + 1;
	else if (kx == 0 && x == 9) 
        toX = x + 1;
	else if (kx == 0 && x < 9) 
        toX = x + 2;

    fromY = (y == 0) ? y : y - 1;
	if (y + ky * decks == 10 && ky == 1) toY = y + ky * decks;
	else if (y + ky * decks < 10 && ky == 1) toY = y + ky * decks + 1;
	else if (y == 9 && ky == 0) toY = y + 1;
	else if (y < 9 && ky == 0) toY = y + 2;
 
	if (toX === undefined || toY === undefined) return false;

    for (let i = fromX; i < toX; i++) {
        for (let j = fromY; j < toY; j++) {
            if (field[j][i] == 1)
                return false;
        }
    }

	return true;
}

function getStartDecksCoord(decks) {
    let kx = getRandom(1); 
    let ky = (kx == 0) ? 1 : 0;
    let x, y;

    if (kx == 0) {
		x = getRandom(9); 
        y = getRandom(10 - decks);
	} else {
		x = getRandom(10 - decks); 
        y = getRandom(9);
	}

    let obj = {x, y, kx, ky};
    result = checkShipLocation(x, y, kx, ky, decks);
	if (!result) 
        return getStartDecksCoord(decks);
    return obj;
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
			let options = getStartDecksCoord(decks);
            // console.log(results);
			let k = 0;
            while (k < decks) {
                let i_x = options.x + k * options.kx;
                let j_y = options.y + k * options.ky;
                field[j_y][i_x] = 1;
                k++;
            }
		}
	}
}

randomLocationShips();
console.log(field);