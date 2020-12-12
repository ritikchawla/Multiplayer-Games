import Piece from "./ChessPiece";

class Rook extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.image = `images/chess/${this.color}Rook.png`;
	}
	validMoves = board => {
		// go outwards from the current row, i.e iterate through columns
		for (let c = this.col - 1; c >= 0; c--) {
			if (board[this.row][c] !== 0) {
				if (board[this.row][c].color === this.color) {
					break;
				} else {
					this.moves[String(this.row) + "," + String(c)] = true;
					board[this.row][c] = "1";
					break;
				}
			}

			this.moves[String(this.row) + "," + String(c)] = true;
			board[this.row][c] = "1";
		}

		for (let c = this.col + 1; c < 8; c++) {
			if (board[this.row][c] !== 0) {
				if (board[this.row][c].color === this.color) {
					break;
				} else {
					this.moves[String(this.row) + "," + String(c)] = true;
					board[this.row][c] = "1";
					break;
				}
			}

			this.moves[String(this.row) + "," + String(c)] = true;
			board[this.row][c] = "1";
		}

		// go outwards from the current column, i.e iterate through rows
		for (let r = this.row - 1; r >= 0; r--) {
			if (board[r][this.col] !== 0) {
				if (board[r][this.col].color === this.color) {
					break;
				} else {
					this.moves[String(r) + "," + String(this.col)] = true;
					board[r][this.col] = "1";
					break;
				}
			}

			this.moves[String(r) + "," + String(this.col)] = true;
			board[r][this.col] = "1";
		}

		for (let r = this.row + 1; r < 8; r++) {
			if (board[r][this.col] !== 0) {
				if (board[r][this.col].color === this.color) {
					break;
				} else {
					this.moves[String(r) + "," + String(this.col)] = true;
					board[r][this.col] = "1";
					break;
				}
			}

			this.moves[String(r) + "," + String(this.col)] = true;
			board[r][this.col] = "1";
		}

		return this.moves;
	};
}

export default Rook;
