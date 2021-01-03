import Piece from "./ChessPiece";

class King extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.pieceName = "king";
		this.image = `images/chess/${this.color}King.png`;
		this.isKing = true;
	}

	notAllowKingToMoveToAttackedCell = () => {};

	validMoves = (board, kingParameters) => {
		this.resetMoves();

		// vertical
		if (this.row + 1 < 8) {
			// vertical down
			if (board[this.row + 1][this.col] === 0) {
				this.moves[this.getStr(this.row + 1, this.col)] = "valid";
			} else if (board[this.row + 1][this.col].color !== this.color) {
				this.moves[this.getStr(this.row + 1, this.col)] = "capturing";
			} else if (board[this.row + 1][this.col].color === this.color) {
				this.protectingMoves[this.getStr(this.row + 1, this.col)] = "protecting";
			}

			// lower right
			if (this.col + 1 < 8) {
				if (board[this.row + 1][this.col + 1] === 0) {
					this.moves[this.getStr(this.row + 1, this.col + 1)] = "valid";
				} else if (board[this.row + 1][this.col + 1].color !== this.color) {
					this.moves[this.getStr(this.row + 1, this.col + 1)] = "capturing";
				} else if (board[this.row + 1][this.col + 1].color === this.color) {
					this.protectingMoves[this.getStr(this.row + 1, this.col + 1)] =
						"protecting";
				}
			}

			// lower left
			if (this.col - 1 >= 0) {
				if (board[this.row + 1][this.col - 1] === 0) {
					this.moves[this.getStr(this.row + 1, this.col - 1)] = "valid";
				} else if (board[this.row + 1][this.col - 1].color !== this.color) {
					this.moves[this.getStr(this.row + 1, this.col - 1)] = "capturing";
				} else if (board[this.row + 1][this.col - 1].color === this.color) {
					this.protectingMoves[this.getStr(this.row + 1, this.col - 1)] =
						"protecting";
				}
			}
		}

		// vertical
		if (this.row - 1 >= 0) {
			// vertical up
			if (board[this.row - 1][this.col] === 0) {
				this.moves[this.getStr(this.row - 1, this.col)] = "valid";
			} else if (board[this.row - 1][this.col].color !== this.color) {
				this.moves[this.getStr(this.row - 1, this.col)] = "capturing";
			} else if (board[this.row - 1][this.col].color === this.color) {
				this.protectingMoves[this.getStr(this.row - 1, this.col)] = "protecting";
			}

			// upper right
			if (this.col + 1 < 8) {
				if (board[this.row - 1][this.col + 1] === 0) {
					this.moves[this.getStr(this.row - 1, this.col + 1)] = "valid";
				} else if (board[this.row - 1][this.col + 1].color !== this.color) {
					this.moves[this.getStr(this.row - 1, this.col + 1)] = "capturing";
				} else if (board[this.row - 1][this.col + 1].color === this.color) {
					this.protectingMoves[this.getStr(this.row - 1, this.col + 1)] =
						"protecting";
				}
			}

			// upper left
			if (this.col - 1 >= 0) {
				if (board[this.row - 1][this.col - 1] === 0) {
					this.moves[this.getStr(this.row - 1, this.col - 1)] = "valid";
				} else if (board[this.row - 1][this.col - 1].color !== this.color) {
					this.moves[this.getStr(this.row - 1, this.col - 1)] = "capturing";
				} else if (board[this.row - 1][this.col - 1].color === this.color) {
					this.protectingMoves[this.getStr(this.row - 1, this.col - 1)] =
						"protecting";
				}
			}
		}

		// horizontal
		if (this.col + 1 < 8) {
			if (board[this.row][this.col + 1] === 0) {
				this.moves[this.getStr(this.row, this.col + 1)] = "valid";
			} else if (board[this.row][this.col + 1].color !== this.color) {
				this.moves[this.getStr(this.row, this.col + 1)] = "capturing";
			} else if (board[this.row][this.col + 1].color === this.color) {
				this.protectingMoves[this.getStr(this.row, this.col + 1)] = "protecting";
			}
		}

		if (this.col - 1 >= 0) {
			if (board[this.row][this.col - 1] === 0) {
				this.moves[this.getStr(this.row, this.col - 1)] = "valid";
			} else if (board[this.row][this.col - 1].color !== this.color) {
				this.moves[this.getStr(this.row, this.col - 1)] = "capturing";
			} else if (board[this.row][this.col - 1].color === this.color) {
				this.protectingMoves[this.getStr(this.row, this.col - 1)] = "protecting";
			}
		}

		this.checkIfKingInCheck(kingParameters);
		this.notAllowKingToMoveToAttackedCell();

		return this.moves;
	};

	display() {
		return this.color[0].toUpperCase() + "K";
	}
}

export default King;
