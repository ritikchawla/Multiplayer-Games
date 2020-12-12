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
				board[this.row + 1][this.col] = "dot";
			} else if (board[this.row + 1][this.col].color !== this.color) {
				this.moves[String(this.row + 1) + "," + String(this.col)] = true;

				// don't do this here
				board[this.row + 1][this.col] = "dot";
			}

			// lower right
			if (this.col + 1 < 8) {
				if (board[this.row + 1][this.col + 1] === 0) {
					this.moves[String(this.row + 1) + "," + String(this.col + 1)] = true;
					board[this.row + 1][this.col + 1] = "dot";
				} else if (board[this.row + 1][this.col + 1].color !== this.color) {
					this.moves[String(this.row + 1) + "," + String(this.col + 1)] = true;

					// don't do this here
					board[this.row + 1][this.col + 1] = "dot";
				}
			}

			// lower left
			if (this.col - 1 >= 0) {
				if (board[this.row + 1][this.col - 1] === 0) {
					this.moves[String(this.row + 1) + "," + String(this.col - 1)] = true;
					board[this.row + 1][this.col - 1] = "dot";
				} else if (board[this.row + 1][this.col - 1].color !== this.color) {
					this.moves[String(this.row + 1) + "," + String(this.col - 1)] = true;

					// don't do this here
					board[this.row + 1][this.col - 1] = "dot";
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

				// don't do this here
				board[this.row + 1][this.col] = "dot";
			}

			// upper right
			if (this.col + 1 < 8) {
				if (board[this.row - 1][this.col + 1] === 0) {
					this.moves[String(this.row - 1) + "," + String(this.col + 1)] = true;
					board[this.row - 1][this.col + 1] = "dot";
				} else if (board[this.row - 1][this.col].color !== this.color) {
					this.moves[String(this.row - 1) + "," + String(this.col + 1)] = true;

					// don't do this here
					board[this.row + 1][this.col + 1] = "dot";
				}
			}

			// upper left
			if (this.col - 1 >= 0) {
				if (board[this.row - 1][this.col - 1] === 0) {
					this.moves[String(this.row - 1) + "," + String(this.col - 1)] = true;
					board[this.row - 1][this.col - 1] = "dot";
				} else if (board[this.row - 1][this.col].color !== this.color) {
					this.moves[String(this.row - 1) + "," + String(this.col - 1)] = true;

					// don't do this here
					board[this.row + 1][this.col - 1] = "dot";
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
				board[this.row][this.col + 1] = "dot";
			}
		}

		if (this.col - 1 >= 0) {
			if (board[this.row][this.col - 1] === 0) {
				this.moves[String(this.row) + "," + String(this.col - 1)] = true;
				board[this.row][this.col - 1] = "dot";
			} else if (board[this.row][this.col - 1].color !== this.color) {
				this.moves[String(this.row) + "," + String(this.col - 1)] = true;
				board[this.row][this.col - 1] = "dot";
			}
		}

		return this.moves;
	};

	display() {
		return this.color[0].toUpperCase() + "K";
	}
}

export default King;
