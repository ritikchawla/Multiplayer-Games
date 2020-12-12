class ChessGame {
	constructor() {
		this.cellsClicked = { rows: [], cols: [] };
		this.numClicks = 0;
		this.turn = "white";
		this.selected = null;
	}

	select = (board, row, col) => {
		if (this.numClicks === 0) {
			if (board[row][col] === 0) return false;
			else if (board[row][col].color !== this.turn) return false;
			else {
				this.cellsClicked.rows.push(row);
				this.cellsClicked.cols.push(col);
				this.numClicks++;
				return true;
			}
		} else if (this.numClicks === 1) {
			// a piece has already been clicked
			str = String(row) + "," + String(col);
			piece = board[this.cellsClicked.rows[0]][this.cellsClicked.cols[0]];

			if (!(str in piece.validMoves(board))) {
				return false;
			}

			// clicked cell is a valid move
			board[this.cellsClicked.rows[0]][this.cellsClicked.cols[0]] = 0;
			board[row][col] = piece;

			this.changeTurn();
		}
	};

	changeTurn = () => {
		this.cellsClicked = { rows: [], cols: [] };
		this.numClicks = 0;

		if (this.turn === "white") this.turn = "black";
		else this.turn = "white";
	};
}
