import Piece from "./ChessPiece";

class King extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.pieceName = "king";
		this.image = `images/chess/${this.color}King.png`;
		this.isKing = true;
	}
	validMoves = board => {
		this.resetMoves();

		// vertical
		if (this.row + 1 < 8) {
			// vertical down
			if (board[this.row + 1][this.col] === 0) {
				this.moves[String(this.row + 1) + "," + String(this.col)] = "valid";
			} else if (board[this.row + 1][this.col].color !== this.color) {
				this.moves[String(this.row + 1) + "," + String(this.col)] = "capturing";
			}

			// lower right
			if (this.col + 1 < 8) {
				if (board[this.row + 1][this.col + 1] === 0) {
					this.moves[String(this.row + 1) + "," + String(this.col + 1)] =
						"valid";
				} else if (board[this.row + 1][this.col + 1].color !== this.color) {
					this.moves[String(this.row + 1) + "," + String(this.col + 1)] =
						"capturing";
				}
			}

			// lower left
			if (this.col - 1 >= 0) {
				if (board[this.row + 1][this.col - 1] === 0) {
					this.moves[String(this.row + 1) + "," + String(this.col - 1)] =
						"valid";
				} else if (board[this.row + 1][this.col - 1].color !== this.color) {
					this.moves[String(this.row + 1) + "," + String(this.col - 1)] =
						"capturing";
				}
			}
		}

		// vertical
		if (this.row - 1 >= 0) {
			// vertical up
			if (board[this.row - 1][this.col] === 0) {
				this.moves[String(this.row - 1) + "," + String(this.col)] = "valid";
			} else if (board[this.row - 1][this.col].color !== this.color) {
				this.moves[String(this.row - 1) + "," + String(this.col)] = "capturing";
			}

			// upper right
			if (this.col + 1 < 8) {
				if (board[this.row - 1][this.col + 1] === 0) {
					this.moves[String(this.row - 1) + "," + String(this.col + 1)] =
						"valid";
				} else if (board[this.row - 1][this.col + 1].color !== this.color) {
					this.moves[String(this.row - 1) + "," + String(this.col + 1)] =
						"capturing";
				}
			}

			// upper left
			if (this.col - 1 >= 0) {
				if (board[this.row - 1][this.col - 1] === 0) {
					this.moves[String(this.row - 1) + "," + String(this.col - 1)] =
						"valid";
				} else if (board[this.row - 1][this.col - 1].color !== this.color) {
					this.moves[String(this.row - 1) + "," + String(this.col - 1)] =
						"capturing";
				}
			}
		}

		// horizontal
		if (this.col + 1 < 8) {
			if (board[this.row][this.col + 1] === 0) {
				this.moves[String(this.row) + "," + String(this.col + 1)] = "valid";
			} else if (board[this.row][this.col + 1].color !== this.color) {
				this.moves[String(this.row) + "," + String(this.col + 1)] = "capturing";
			}
		}

		if (this.col - 1 >= 0) {
			if (board[this.row][this.col - 1] === 0) {
				this.moves[String(this.row) + "," + String(this.col - 1)] = "valid";
			} else if (board[this.row][this.col - 1].color !== this.color) {
				this.moves[String(this.row) + "," + String(this.col - 1)] = "capturing";
			}
		}

		return this.moves;
	};

	display() {
		return this.color[0].toUpperCase() + "K";
	}
}

export default King;
