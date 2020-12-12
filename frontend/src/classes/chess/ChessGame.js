class ChessGame {
	constructor() {
		this.cellsClicked = { rows: [], cols: [] };
		this.numClicks = 0;
		this.turn = "white";
		this.selected = null;
	}

	showValidMoves = (board, row, col) => {
		for (let row = 0; row < board.length; row++) {
			for (let col = 0; col < board.length; col++) {
				if (board[row][col] === "dot") {
					board[row][col] = 0;
				}
			}
		}

		if (board[row][col] !== 0) {
			let piece = board[row][col];

			let moves = piece.validMoves(board);

			console.log(moves);
		}
		return board;
	};

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
			let str = String(row) + "," + String(col);
			let piece = board[this.cellsClicked.rows[0]][this.cellsClicked.cols[0]];

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

export default ChessGame;
