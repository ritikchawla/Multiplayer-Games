class Piece {
	constructor(color, row, col) {
		this.color = color;
		this.row = row;
		this.col = col;
		this.moves = {};
	}
}

class Rook extends Piece {
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

class Bishop extends Piece {
	upperRight = board => {
		let c = this.col + 1;
		for (let r = this.row - 1; r >= 0; r--) {
			if (board[r][c] !== 0) {
				if (board[r][c].color === this.color) {
					return;
				} else {
					this.moves[String(r) + "," + String(c)] = true;
					board[r][c] = "1";
					return;
				}
			}

			this.moves[String(r) + "," + String(c)] = true;
			board[r][c] = "1";

			if (c === 7) break;
			else c++;
		}
	};

	lowerRight = board => {
		let c = this.col + 1;
		for (let r = this.row + 1; r < 8; r++) {
			if (board[r][c] !== 0) {
				if (board[r][c].color === this.color) {
					return;
				} else {
					this.moves[String(r) + "," + String(c)] = true;
					board[r][c] = "1";
					return;
				}
			}

			this.moves[String(r) + "," + String(c)] = true;
			board[r][c] = "1";

			if (c === 7) break;
			else c++;
		}
	};

	upperLeft = board => {
		let c = this.col - 1;
		for (let r = this.row - 1; r >= 0; r--) {
			if (board[r][c] !== 0) {
				if (board[r][c].color === this.color) {
					return;
				} else {
					this.moves[String(r) + "," + String(c)] = true;
					board[r][c] = "1";
					return;
				}
			}

			this.moves[String(r) + "," + String(c)] = true;
			board[r][c] = "1";

			if (c === 0) break;
			else c--;
		}
	};

	lowerLeft = board => {
		let c = this.col;
		for (let r = this.row + 1; r < 8; r++) {
			if (c === 0) break;
			else c--;

			if (board[r][c] !== 0) {
				if (board[r][c].color === this.color) {
					return;
				} else {
					this.moves[String(r) + "," + String(c)] = true;
					board[r][c] = "1";
					return;
				}
			}

			this.moves[String(r) + "," + String(c)] = true;
			board[r][c] = "1";
		}
	};

	validMoves = board => {
		this.upperRight(board);
		this.lowerRight(board);
		this.upperLeft(board);
		this.lowerLeft(board);
		return this.moves;
	};
}

class Queen extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.rook = new Rook(this.color, this.row, this.col);
		this.bishop = new Bishop(this.color, this.row, this.col);
	}

	validMoves = board => {
		const rm = this.rook.validMoves(board);
		const bm = this.bishop.validMoves(board);

		this.moves = Object.assign({}, rm, bm);

		return this.moves;
	};
}

class King extends Piece {
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
}

class Knight extends Piece {
	validMoves = board => {
		let arrC = [-2, -1, 1, 2];
		let arrR = [1, 2, 2, 1];
		// -2 and 2 at -1 and 1
		// -1 and 1 at -2 and 2

		for (let i = 0; i < 4; i++) {
			if (this.col + arrC[i] >= 0 && this.col + arrC[i] < 7) {
				// ---

				if (this.row - arrR[i] >= 0) {
					if (board[this.row - arrR[i]][this.col + arrC[i]] === 0) {
						this.moves[
							String(this.row - arrR[i]) + "," + String(this.col + arrC[i])
						] = true;
						board[this.row - arrR[i]][this.col + arrC[i]] = "1";
					} else if (board[this.row - arrR[i]][this.col + arrC[i]].color !== this.color) {
						this.moves[
							String(this.row - arrR[i]) + "," + String(this.col + arrC[i])
						] = true;
						board[this.row - arrR[i]][this.col + arrC[i]] = "1";
					}
				}

				if (this.row + arrR[i] < 8) {
					if (board[this.row + arrR[i]][this.col + arrC[i]] === 0) {
						this.moves[
							String(this.row + arrR[i]) + "," + String(this.col + arrC[i])
						] = true;
						board[this.row + arrR[i]][this.col + arrC[i]] = "1";
					} else if (board[this.row + arrR[i]][this.col + arrC[i]].color !== this.color) {
						this.moves[
							String(this.row + arrR[i]) + "," + String(this.col + arrC[i])
						] = true;
						board[this.row + arrR[i]][this.col + arrC[i]] = "1";
					}
				}
			}
		}

		return this.moves;
	};
}

let b = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
];

// const rook = new Rook("B", 3, 4);
// const bishop = new Bishop("B", 4, 4);
// const queen = new Queen("B", 4, 5);
const obj = new Knight("B", 4, 3);

// let [moves, board] = queen.validQueenMoves(b);
// let [moves, board] = rook.validRookMoves(b);
// let [moves, board] = bishop.validBishopMoves(b);
let moves = obj.validMoves(b);

console.log(moves);
console.table(b);
