class Piece {
	constructor(color, row, col) {
		this.color = color;
		this.row = row;
		this.col = col;
		this.moves = {};
	}
}

class Rook extends Piece {
	validRookMoves = board => {
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

		return [this.moves, board];
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
		let c = this.col - 1;
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
			else c--;
		}
	};

	validBishopMoves = board => {
		this.upperRight(board);
		this.lowerRight(board);
		this.upperLeft(board);
		this.lowerLeft(board);
		return [this.moves, board];
	};
}

class Queen extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.rook = new Rook(this.color, this.row, this.col);
		this.bishop = new Bishop(this.color, this.row, this.col);
	}

	validQueenMoves = board => {
		const [rm, b1] = this.rook.validRookMoves(board);
		const [bm, b2] = this.bishop.validBishopMoves(board);

		this.moves = Object.assign({}, rm, bm);

		return [this.moves, board];
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
const queen = new Queen("B", 4, 5);

let [moves, board] = queen.validQueenMoves(b);
// let [moves, board] = rook.validRookMoves(b);
// let [moves, board] = bishop.validBishopMoves(b);

console.log(moves);
console.table(board);
