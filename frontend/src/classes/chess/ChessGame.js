import Piece from "./ChessPiece";
class ChessGame {
	constructor() {
		this.cellsClicked = { rows: [], cols: [] };
		this.numClicks = 0;
		this.turn = "white";
		this.selected = null;
		this.whiteKingPos = [7, 3];
		this.blackKingPos = [0, 3];
		this.whiteKingInCheck = false;
		this.blackKingInCheck = false;
	}

	clearDots = board => {
		for (let row = 0; row < board.length; row++) {
			for (let col = 0; col < board.length; col++) {
				if (board[row][col] === "dot") {
					board[row][col] = 0;
				}

				if (board[row][col] !== 0) {
					if (board[row][col].isBeingAttacked) {
						board[row][col].isBeingAttacked = false;
					}

					if (board[row][col].isClicked) {
						board[row][col].isClicked = false;
					}
				}
			}
		}
	};

	showValidMoves = (board, row, col) => {
		this.clearDots(board);

		if (board[row][col] !== 0 && board[row][col] !== "dot") {
			if (board[row][col].color === this.turn) {
				let piece = board[row][col];

				// this will actually put 'dot' on the board
				piece.validMoves(board);

				piece.isClicked = true;

				// console.log(moves);
			}
		}
		let tempCellsClicked = this.select(board, row, col);

		return tempCellsClicked;
	};

	select = (board, row, col) => {
		// console.log("select called");
		if (this.numClicks === 0) {
			if (board[row][col] === 0) return false;
			else if (board[row][col] === "dot") return false;
			else if (board[row][col].color !== this.turn) return false;
			else {
				this.cellsClicked.rows.push(row);
				this.cellsClicked.cols.push(col);
				this.numClicks++;
				return this.cellsClicked;
			}
		} else if (this.numClicks === 1) {
			// a piece has already been clicked

			if (board[row][col] instanceof Piece) {
				// if player clicked on another piece of his color, do not changeTurn

				if (board[row][col].color === this.turn) {
					this.cellsClicked.rows[0] = row;
					this.cellsClicked.cols[0] = col;
					return this.cellsClicked;
				}
			}

			let str = String(row) + "," + String(col);
			let piece = board[this.cellsClicked.rows[0]][this.cellsClicked.cols[0]];
			// console.log("str = ", str);
			// console.log("piece = ", piece);

			if (!(str in piece.validMoves(board))) {
				return false;
			}

			// update this.cellsClicked for socket connection
			this.cellsClicked.rows.push(row);
			this.cellsClicked.cols.push(col);

			let tempCellsClicked = this.movePiece(board, this.cellsClicked);

			// this.clearDots(board);
			// this.changeTurn();

			return tempCellsClicked;

			// console.log("white King = ", this.whiteKingPos);
			// console.log("black King = ", this.blackKingPos);
		}
	};

	movePiece = (board, clickedCells) => {
		// clicked cells is basically this.cellsClicked, but we take it as a
		// parameter so that we can also use it for sockets

		let { rows, cols } = clickedCells;

		const [rowi, rowf] = rows;
		const [coli, colf] = cols;

		let piece = board[rowi][coli];

		console.log(piece);

		piece.setRowCol(rowf, colf);

		// clicked cell is a valid move
		board[rowi][coli] = 0;
		board[rowf][colf] = piece;

		// set the king positions in order to help with checking for 'checks'
		if (piece.isKing) {
			if (piece.color === "white") {
				this.whiteKingPos = [piece.row, piece.col];
			} else {
				this.blackKingPos = [piece.row, piece.col];
			}
		}

		let tcc = this.cellsClicked;

		this.clearDots(board);
		this.changeTurn();

		return tcc;
	};

	changeTurn = () => {
		this.cellsClicked = { rows: [], cols: [] };
		this.numClicks = 0;

		this.turn = this.turn === "white" ? "black" : "white";
	};
}

export default ChessGame;
