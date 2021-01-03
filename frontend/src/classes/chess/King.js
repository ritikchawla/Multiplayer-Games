import Piece from "./ChessPiece";

class King extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.pieceName = "king";
		this.image = `images/chess/${this.color}King.png`;
		this.isKing = true;
	}

	notAllowKingToMoveToAttackedCell = kingParameters => {
		// not allow king to capture a protected piece
		let newValidMoves = {};
		const { cellsUnderAttackByWhite, cellsUnderAttackByBlack } = kingParameters;
		console.log(kingParameters);
		const cellsUnderAttack =
			this.color === "white" ? cellsUnderAttackByBlack : cellsUnderAttackByWhite;

		console.log("-----------------------------------------------");
		console.log("this.moves king = ", this.moves);
		console.log(cellsUnderAttack);

		const moveKeys = Object.keys(this.moves);
		const otherKeys = Object.keys(cellsUnderAttack);

		for (let i = 0; i < moveKeys.length; i++) {
			let moveAllowed = true;
			for (let j = 0; j < otherKeys.length; j++) {
				if (moveKeys[i] in cellsUnderAttack[otherKeys[j]]) {
					moveAllowed = false;
					break;
				}
			}
			if (moveAllowed) {
				newValidMoves[moveKeys[i]] = this.moves[moveKeys[i]];
			}
		}

		console.log("valid moves king = ", newValidMoves);

		return newValidMoves;
	};

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
		this.moves = this.notAllowKingToMoveToAttackedCell(kingParameters);

		return this.moves;
	};

	display() {
		return this.color[0].toUpperCase() + "K";
	}
}

export default King;
