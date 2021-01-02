import Piece from "./ChessPiece";

class Rook extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.pieceName = "rook";

		this.image = `images/chess/${this.color}Rook.png`;
	}

	getCellsBetweenPieces = kingPos => {
		let rowAdder = 0,
			colAdder = 0;

		let kingRow = kingPos[0],
			kingCol = kingPos[1];

		let cellsBetweenPieces = {};

		// up
		if (kingRow < this.row && kingCol === this.col) {
			rowAdder = -1;
			colAdder = 0;
		} else if (kingRow > this.row && kingCol === this.col) {
			//down
			rowAdder = 1;
			colAdder = 0;
		} else if (kingRow === this.row && kingCol < this.col) {
			// left
			rowAdder = 0;
			colAdder = -1;
		} else if (kingRow === this.row && kingCol > this.col) {
			// right
			rowAdder = 0;
			colAdder = 1;
		}

		for (let row = this.row + rowAdder; row !== kingRow; row += rowAdder) {
			for (let col = this.col + colAdder; col !== kingCol; col += colAdder) {
				cellsBetweenPieces[this.getStr(row, col)] = "valid";
			}
		}

		console.log(cellsBetweenPieces);

		return cellsBetweenPieces;
	};

	validMoves = (board, kingParameters) => {
		this.resetMoves();

		// go outwards from the current row, i.e iterate through columns
		for (let c = this.col - 1; c >= 0; c--) {
			if (board[this.row][c] !== 0) {
				if (board[this.row][c].color === this.color) {
					break;
				} else {
					this.moves[String(this.row) + "," + String(c)] = "capturing";
					break;
				}
			}

			this.moves[String(this.row) + "," + String(c)] = "valid";
		}

		for (let c = this.col + 1; c < 8; c++) {
			if (board[this.row][c] !== 0) {
				if (board[this.row][c].color === this.color) {
					break;
				} else {
					this.moves[String(this.row) + "," + String(c)] = "capturing";
					break;
				}
			}

			this.moves[String(this.row) + "," + String(c)] = "valid";
		}

		// go outwards from the current column, i.e iterate through rows
		for (let r = this.row - 1; r >= 0; r--) {
			if (board[r][this.col] !== 0) {
				if (board[r][this.col].color === this.color) {
					break;
				} else {
					this.moves[String(r) + "," + String(this.col)] = "capturing";
					break;
				}
			}

			this.moves[String(r) + "," + String(this.col)] = "valid";
		}

		for (let r = this.row + 1; r < 8; r++) {
			if (board[r][this.col] !== 0) {
				if (board[r][this.col].color === this.color) {
					break;
				} else if (board[r][this.col].color !== this.color) {
					this.moves[String(r) + "," + String(this.col)] = "capturing";
					break;
				}
			}

			this.moves[String(r) + "," + String(this.col)] = "valid";
		}

		this.checkIfKingInCheck(kingParameters);

		return this.moves;
	};
}

export default Rook;
