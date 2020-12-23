import Piece from "./ChessPiece";

class King extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.image = `images/chess/${this.color}King.png`;
		this.isKing = true;
	}
	validMoves = board => {
		// vertical
		if (this.row + 1 < 8) {
			// vertical down
			if (board[this.row + 1][this.col] === 0) {
				this.moves[String(this.row + 1) + "," + String(this.col)] = true;
				board[this.row + 1][this.col] = "dot";
			} else if (board[this.row + 1][this.col].color !== this.color) {
				this.moves[String(this.row + 1) + "," + String(this.col)] = true;
				board[this.row + 1][this.col].isBeingAttacked = true;
			}

			// lower right
			if (this.col + 1 < 8) {
				if (board[this.row + 1][this.col + 1] === 0) {
					this.moves[String(this.row + 1) + "," + String(this.col + 1)] = true;
					board[this.row + 1][this.col + 1] = "dot";
				} else if (board[this.row + 1][this.col + 1].color !== this.color) {
					this.moves[String(this.row + 1) + "," + String(this.col + 1)] = true;

					board[this.row + 1][this.col + 1].isBeingAttacked = true;
				}
			}

			// lower left
			if (this.col - 1 >= 0) {
				if (board[this.row + 1][this.col - 1] === 0) {
					this.moves[String(this.row + 1) + "," + String(this.col - 1)] = true;
					board[this.row + 1][this.col - 1] = "dot";
				} else if (board[this.row + 1][this.col - 1].color !== this.color) {
					this.moves[String(this.row + 1) + "," + String(this.col - 1)] = true;

					board[this.row + 1][this.col - 1].isBeingAttacked = true;
				}
			}
		}

		// vertical
		if (this.row - 1 >= 0) {
			// vertical up
			if (board[this.row - 1][this.col] === 0) {
				this.moves[String(this.row - 1) + "," + String(this.col)] = true;
				board[this.row - 1][this.col] = "dot";
			} else if (board[this.row - 1][this.col].color !== this.color) {
				this.moves[String(this.row - 1) + "," + String(this.col)] = true;
				board[this.row - 1][this.col].isBeingAttacked = true;
			}

			// upper right
			if (this.col + 1 < 8) {
				if (board[this.row - 1][this.col + 1] === 0) {
					this.moves[String(this.row - 1) + "," + String(this.col + 1)] = true;
					board[this.row - 1][this.col + 1] = "dot";
				} else if (board[this.row - 1][this.col + 1].color !== this.color) {
					this.moves[String(this.row - 1) + "," + String(this.col + 1)] = true;
					board[this.row - 1][this.col + 1].isBeingAttacked = true;
				}
			}

			// upper left
			if (this.col - 1 >= 0) {
				if (board[this.row - 1][this.col - 1] === 0) {
					this.moves[String(this.row - 1) + "," + String(this.col - 1)] = true;
					board[this.row - 1][this.col - 1] = "dot";
				} else if (board[this.row - 1][this.col - 1].color !== this.color) {
					this.moves[String(this.row - 1) + "," + String(this.col - 1)] = true;
					board[this.row - 1][this.col - 1].isBeingAttacked = true;
				}
			}
		}

		// horizontal
		if (this.col + 1 < 8) {
			if (board[this.row][this.col + 1] === 0) {
				this.moves[String(this.row) + "," + String(this.col + 1)] = true;
				board[this.row][this.col + 1] = "dot";
			} else if (board[this.row][this.col + 1].color !== this.color) {
				this.moves[String(this.row) + "," + String(this.col + 1)] = true;
				board[this.row][this.col + 1].isBeingAttacked = true;
			}
		}

		if (this.col - 1 >= 0) {
			if (board[this.row][this.col - 1] === 0) {
				this.moves[String(this.row) + "," + String(this.col - 1)] = true;
				board[this.row][this.col - 1] = "dot";
			} else if (board[this.row][this.col - 1].color !== this.color) {
				this.moves[String(this.row) + "," + String(this.col - 1)] = true;
				board[this.row][this.col - 1].isBeingAttacked = true;
			}
		}

		return this.moves;
	};

	display() {
		return this.color[0].toUpperCase() + "K";
	}
}

export default King;
