getStr = (a, b) => String(a) + "," + String(b);
getCellsBetweenPieces = (piece, kingPos) => {
	let rowAdder = 0,
		colAdder = 0;

	let kingRow = kingPos[0],
		kingCol = kingPos[1];

	let cellsBetweenPieces = {};

	// up
	if (kingRow < piece.row && kingCol === piece.col) {
		rowAdder = -1;
		colAdder = 0;
	} else if (kingRow > piece.row && kingCol === piece.col) {
		//down
		rowAdder = 1;
		colAdder = 0;
	} else if (kingRow === piece.row && kingCol < piece.col) {
		// left
		rowAdder = 0;
		colAdder = -1;
	} else if (kingRow === piece.row && kingCol > piece.col) {
		// right
		rowAdder = 0;
		colAdder = 1;
	}

	if (rowAdder !== 0) {
		for (let row = this.row + rowAdder; row !== kingRow; row += rowAdder) {
			cellsBetweenPieces[this.getStr(row, col)] = "valid";
		}
	}
	if (colAdder !== 0) {
		for (let col = this.col + colAdder; col !== kingCol; col += colAdder) {
			cellsBetweenPieces[this.getStr(row, col)] = "valid";
		}
	}

	console.log("rook cellsBetweenPieces = ", cellsBetweenPieces);

	return cellsBetweenPieces;
};

getCellsBetweenPieces({ row: 3, col: 0 }, [0, 3]);
