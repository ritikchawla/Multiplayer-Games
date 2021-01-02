getCellsBetweenPieces = (kingPos, piece) => {
	let rowAdder = 0,
		colAdder = 0;
	let kingRow = kingPos[0],
		kingCol = kingPos[1];
	let cellsBetweenPieces = {};

	// upper left
	if (kingRow < piece.row && kingCol < piece.col) {
		rowAdder = -1;
		colAdder = -1;
	} else if (kingRow < piece.row && kingCol > piece.col) {
		// upper right
		rowAdder = -1;
		colAdder = 1;
	} else if (kingRow > piece.row && kingCol < piece.col) {
		// lower left
		rowAdder = 1;
		colAdder = -1;
	} else if (kingRow > piece.row && kingCol > piece.col) {
		// lower right
		rowAdder = 1;
		colAdder = 1;
	}

	let row = piece.row + rowAdder,
		col = piece.col + colAdder;

	while (row !== kingRow && col != kingCol) {
		cellsBetweenPieces[String(row) + "," + String(col)] = "valid";
		row += rowAdder;
		col += colAdder;
	}

	console.log(cellsBetweenPieces);

	return cellsBetweenPieces;
};

getCellsBetweenPieces([7, 3], { row: 4, col: 6 });
