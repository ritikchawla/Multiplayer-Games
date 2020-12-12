import Piece from "./ChessPiece";

class King extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.image = `images/chess/${this.color}King.png`;
	}
	validMoves = board => {
		// vertical
		if (this.row + 1 < 8) {
			// vertical down
			if (board[this.row + 1][this.col] === 0) {
				this.moves[String(this.row + 1) + "," + String(this.col)] = true;
				board[this.row + 1][this.col] = "1";
			} else if (board[this.row + 1][this.col].color !== this.color) {
				this.moves[String(this.row + 1) + "," + String(this.col)] = true;

				// don't do this here
				board[this.row + 1][this.col] = "1";
			}

			// lower right
			if (this.col + 1 < 8) {
				this.moves[String(this.row + 1) + "," + String(this.col + 1)] = true;
				board[this.row + 1][this.col + 1] = "1";
			}

			// lower left
			if (this.col - 1 >= 0) {
				this.moves[String(this.row + 1) + "," + String(this.col - 1)] = true;
				board[this.row + 1][this.col - 1] = "1";
			}
		}

		// vertical
		if (this.row - 1 >= 0) {
			// vertical up
			this.moves[String(this.row - 1) + "," + String(this.col)] = true;
			board[this.row - 1][this.col] = "1";

			// upper right
			if (this.col + 1 < 8) {
				this.moves[String(this.row - 1) + "," + String(this.col + 1)] = true;
				board[this.row - 1][this.col + 1] = "1";
			}

			// upper left
			if (this.col - 1 >= 0) {
				this.moves[String(this.row - 1) + "," + String(this.col - 1)] = true;
				board[this.row - 1][this.col - 1] = "1";
			}
		}

		// horizontal
		if (this.col + 1 < 8) {
			if (board[this.row][this.col + 1] === 0) {
				this.moves[String(this.row) + "," + String(this.col + 1)] = true;
				board[this.row][this.col + 1] = "1";
			} else if (board[this.row][this.col + 1].color !== this.color) {
				this.moves[String(this.row) + "," + String(this.col + 1)] = true;
				board[this.row][this.col + 1] = "1";
			}
		}

		if (this.col - 1 >= 0) {
			if (board[this.row][this.col - 1] === 0) {
				this.moves[String(this.row) + "," + String(this.col - 1)] = true;
				board[this.row][this.col - 1] = "1";
			} else if (board[this.row][this.col - 1].color !== this.color) {
				this.moves[String(this.row) + "," + String(this.col - 1)] = true;
				board[this.row][this.col - 1] = "1";
			}
		}

		return this.moves;
	};

	display() {
		return this.color[0].toUpperCase() + "K";
	}
}

export default King;
