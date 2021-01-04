import Bishop from "./Bishop";
import Piece from "./ChessPiece";
import King from "./King";
import Knight from "./Knight";
import Pawn from "./Pawn";
import Queen from "./Queen";
import Rook from "./Rook";

class ChessGame {
	constructor() {
		this.cellsClicked = { rows: [], cols: [] };
		this.numClicks = 0;
		this.turn = "white";
		this.selected = null;
		this.whiteKingPos = [7, 4];
		this.blackKingPos = [0, 4];
		this.whiteKingInCheck = false;
		this.blackKingInCheck = false;
		this.pieceCheckingWhiteKing = null;
		this.pieceCheckingBlackKing = null;
		this.kingParams = {};
		this.gameOver = false;
		this.winner = null;

		// key = row,col of the piece
		// value = piece.validMoves()
		this.cellsUnderAttackByWhite = {};
		this.cellsUnderAttackByBlack = {};

		this.setKingParams();
	}

	getStr = (row, col) => String(row) + "," + String(col);

	/*
    parameters to pass to validmoves function
    0. Board
    1. need to pass if kings are in check.
    2. position of the kings.
    3. piece that is chekcing the king.
    */

	setKingParams = () => {
		this.kingParams = {
			whiteKingInCheck: this.whiteKingInCheck,
			blackKingInCheck: this.blackKingInCheck,
			whiteKingPos: this.whiteKingPos,
			blackKingPos: this.blackKingPos,
			pieceCheckingWhiteKing: this.pieceCheckingWhiteKing,
			pieceCheckingBlackKing: this.pieceCheckingBlackKing,
			cellsUnderAttackByWhite: this.cellsUnderAttackByWhite,
			cellsUnderAttackByBlack: this.cellsUnderAttackByBlack
		};
	};

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

	showDots = (board, moves) => {
		//	console.log(moves);
		Object.keys(moves).forEach(key => {
			// key = row,col
			const [row, col] = key.split(",").map(k => Number(k));

			if (moves[key] === "valid") {
				board[row][col] = "dot";
			} else if (moves[key] === "capturing") {
				board[row][col].isBeingAttacked = true;
			} else if (moves[key] === "castling") {
				board[row][col] = "dot";
			}
		});
	};

	showValidMoves = (userColor, board, row, col) => {
		if (
			board[row][col] instanceof Piece &&
			this.numClicks === 0 &&
			board[row][col].color !== userColor
		)
			return;

		this.clearDots(board);

		if (board[row][col] !== 0 && board[row][col] !== "dot") {
			if (board[row][col].color === this.turn) {
				// console.log("calculating piece moves");

				let piece = board[row][col];

				this.showDots(board, piece.validMoves(board, this.kingParams));

				piece.isClicked = true;
			}
		}
		let tempCellsClicked = this.select(board, row, col);

		return tempCellsClicked;
	};

	handlePawnPromotion = pawn => {
		// use DOM Manupulation to show the component to choose
		// the piece to promote the pawn to
		if (pawn.row === 0 || pawn.row === 7) return true;

		return false;
	};

	changePawnToPiece = (board, promoteTo, color, rowf, colf) => {
		console.log("changePawnToPiece color = ", color);
		switch (promoteTo) {
			case "queen":
				board[rowf][colf] = new Queen(color, rowf, colf);
				break;

			case "rook":
				board[rowf][colf] = new Rook(color, rowf, colf);
				break;

			case "bishop":
				board[rowf][colf] = new Bishop(color, rowf, colf);
				break;

			case "knight":
				board[rowf][colf] = new Knight(color, rowf, colf);
				break;

			default:
				break;
		}
	};

	promotePawn = (board, promoteTo, cellsClicked) => {
		// pawn has already been moved but the opponent hasn't seen it

		const { rows, cols } = cellsClicked;
		const [rowi, rowf] = rows;
		const [coli, colf] = cols;

		if (board[rowf][colf] instanceof Pawn) {
			let pawn = board[rowf][colf];
			board[rowf][colf] = 0;
			this.changePawnToPiece(board, promoteTo, pawn.color, rowf, colf);
		} else {
			// move the pawn for the opponent to see
			let pawn = board[rowi][coli];
			board[rowi][coli] = 0;
			this.changePawnToPiece(board, promoteTo, pawn.color, rowf, colf);
		}

		// if the king was already in check, then set it to false as the current
		// move must've blocked the check
		if (this.whiteKingInCheck) {
			this.whiteKingInCheck = false;
			this.pieceCheckingWhiteKing = null;
		}

		if (this.blackKingInCheck) {
			this.blackKingInCheck = false;
			this.pieceCheckingBlackKing = null;
		}

		this.setKingParams();

		// get moves and protecting moves of the piece after it has moved
		// in order to set the 'attacked' squares
		this.setInitiallyAttackedCells(board);

		this.clearDots(board);
		this.changeTurn();

		this.setKingInCheck(board, this.turn, board[rowf][colf]);
	};

	setKingInCheck = (board, kingColor, lastMovedPiece) => {
		if (kingColor === "white") {
			let kingPos = this.getStr(this.whiteKingPos[0], this.whiteKingPos[1]);

			if (kingPos in lastMovedPiece.validMoves(board, this.kingParams)) {
				this.whiteKingInCheck = true;
				this.pieceCheckingWhiteKing = lastMovedPiece;
			}
		} else if (kingColor === "black") {
			let kingPos = this.getStr(this.blackKingPos[0], this.blackKingPos[1]);

			if (kingPos in lastMovedPiece.validMoves(board, this.kingParams)) {
				// need to set this to false somewhere
				this.blackKingInCheck = true;
				this.pieceCheckingBlackKing = lastMovedPiece;
			}
		}

		if (this.whiteKingInCheck) {
			let [r, c] = this.whiteKingPos;
			board[r][c].isBeingAttacked = true;
		}

		if (this.blackKingInCheck) {
			let [r, c] = this.blackKingPos;
			board[r][c].isBeingAttacked = true;
		}

		this.setKingParams();
	};

	setInitiallyAttackedCells = board => {
		this.cellsUnderAttackByBlack = {};
		this.cellsUnderAttackByWhite = {};

		for (let row = 0; row < board.length; row++) {
			for (let col = 0; col < board.length; col++) {
				if (board[row][col] instanceof Piece) {
					let piece = board[row][col];
					let str = this.getStr(piece.row, piece.col);
					let attackedCells = {};

					// this will set piece.moves and piece.protectingMoves
					if (piece.pieceName !== "pawn")
						piece.validMoves(board, this.kingParams);
					else piece.validMoves(board, this.kingParams, true);

					let totalMoves = { ...piece.moves, ...piece.protectingMoves };

					Object.keys(totalMoves).forEach(key => {
						if (board[row][col].pieceName === "pawn") {
							// as pawn's valid moves aren't its capturing moves
							if (totalMoves[key] !== "valid") {
								attackedCells[key] = totalMoves[key];
							}
						} else {
							attackedCells[key] = totalMoves[key];
						}
					});

					if (piece.color === "white") {
						this.cellsUnderAttackByWhite[str] = attackedCells;
					} else {
						this.cellsUnderAttackByBlack[str] = attackedCells;
					}
				}
			}
		}
	};

	setAttackedCellsByPiece = (board, piece) => {
		let movesToReplace = {};
		const str = this.getStr(piece.row, piece.col);

		if (piece.pieceName === "pawn") {
			piece.validMoves(board, this.kingParams, true);
			let newMoves = { ...piece.moves, ...piece.protectingMoves };

			Object.keys(newMoves).forEach(key => {
				if (newMoves[key] !== "valid") {
					movesToReplace[key] = newMoves[key];
				}
			});
		} else {
			console.log("setting new moves for piece = ", piece);
			piece.validMoves(board, this.kingParams);
			movesToReplace = { ...piece.moves, ...piece.protectingMoves };
		}

		if (piece.color === "white") {
			this.cellsUnderAttackByWhite[str] = movesToReplace;
		} else {
			this.cellsUnderAttackByBlack[str] = movesToReplace;
		}
	};

	select = (board, row, col) => {
		// console.log("select called");
		if (this.numClicks === 0) {
			if (board[row][col] === 0) return;
			else if (board[row][col] === "dot") return;
			else if (board[row][col].color !== this.turn) return;
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

			let str = this.getStr(row, col);
			let piece = board[this.cellsClicked.rows[0]][this.cellsClicked.cols[0]];

			if (!(str in piece.validMoves(board, this.kingParams))) {
				return;
			}

			// update this.cellsClicked for socket connection
			this.cellsClicked.rows.push(row);
			this.cellsClicked.cols.push(col);

			let tempCellsClicked = this.movePiece(board, this.cellsClicked);

			console.log(
				board[this.blackKingPos[0]][this.blackKingPos[1]].validMoves(
					board,
					this.kingParams
				)
			);

			console.log(this.cellsUnderAttackByWhite);

			return tempCellsClicked;
		}
	};

	movePiece = (board, clickedCells) => {
		// clicked cells is basically this.cellsClicked, but we take it as a
		// parameter so that we can also use it for sockets
		let castlingDone = false,
			pawnPromoted = false;

		let { rows, cols } = clickedCells;

		const [rowi, rowf] = rows;
		const [coli, colf] = cols;

		let piece = board[rowi][coli];

		if (piece instanceof King && (colf === coli + 2 || colf === coli - 2)) {
			// castling move played
			this.castleKing(board, clickedCells);
			castlingDone = true;
		} else {
			// clicked cell is a valid move
			board[rowi][coli] = 0;
			board[rowf][colf] = piece;
		}

		piece.setRowCol(rowf, colf);

		// set the king positions in order to help with checking for 'checks'
		if (piece instanceof King) {
			if (piece.color === "white") {
				this.whiteKingPos = [piece.row, piece.col];
			} else if (piece.color === "black") {
				this.blackKingPos = [piece.row, piece.col];
			}
		}

		// if the king was already in check, then set it to false as the current
		// move must've blocked the check
		if (this.whiteKingInCheck) {
			this.whiteKingInCheck = false;
			this.pieceCheckingWhiteKing = null;
		}

		if (this.blackKingInCheck) {
			this.blackKingInCheck = false;
			this.pieceCheckingBlackKing = null;
		}

		this.setKingParams();

		if (piece instanceof Pawn) {
			pawnPromoted = this.handlePawnPromotion(piece);

			if (pawnPromoted) {
				return { cellsClicked: this.cellsClicked, castlingDone, pawnPromoted };
			}
		}

		// get moves and protecting moves of the piece after it has moved
		// in order to set the 'attacked' squares
		this.setInitiallyAttackedCells(board);

		let tcc = this.cellsClicked;

		this.clearDots(board);
		this.changeTurn();

		// check if king is in check
		// as the previous move might have been by white, and after movePiece()
		// changes the turn, now it's black's turn and we need to check if
		// black king is in check
		// the piece has moved and it's row and columns have been changed so there
		// is no point in passing the previously calculated moves to this function
		this.setKingInCheck(board, this.turn, piece);

		return { cellsClicked: tcc, castlingDone, pawnPromoted };
	};

	castleKing = (board, clickedCells) => {
		let { rows, cols } = clickedCells;

		const [rowi, rowf] = rows;
		const [coli, colf] = cols;

		const king = board[rowi][coli];

		// if colf < coli, then king was moved left
		// colf > coli = king side castling, i.e castling right
		// colf < coli = queen side castling, i.e. castling left
		const rookCol = colf < coli ? 0 : 7;
		const colAdder = colf < coli ? 1 : -1;

		let rook = board[rowi][rookCol];

		// move the king
		board[rowf][colf] = king;
		board[rowi][coli] = 0;

		// move the rook to the right of the king
		board[rowf][colf + colAdder] = rook;
		board[rowi][rookCol] = 0;

		rook.setRowCol(rowf, colf + colAdder);
	};

	colorHasMovesLeft = (board, color) => {
		for (let row = 0; row < board.length; row++) {
			for (let col = 0; col < board.length; col++) {
				if (board[row][col] instanceof Piece && board[row][col].color === color) {
					if (
						Object.keys(board[row][col].validMoves(board, this.kingParams))
							.length > 0
					) {
						return true;
					}
				}
			}
		}

		return false;
	};

	blackWins = () => {
		this.gameOver = true;
		this.winner = "black";
		return this.gameOver;
	};

	whiteWins = () => {
		this.gameOver = true;
		this.winner = "white";
		return this.gameOver;
	};

	isGameOver = board => {
		if (!this.colorHasMovesLeft(board, "white")) {
			return this.blackWins();
		}

		if (!this.colorHasMovesLeft(board, "black")) {
			return this.whiteWins();
		}

		return false;
	};

	changeTurn = () => {
		this.cellsClicked = { rows: [], cols: [] };
		this.numClicks = 0;

		this.turn = this.turn === "white" ? "black" : "white";
	};
}

export default ChessGame;
