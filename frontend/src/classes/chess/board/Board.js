class CellClass {
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.isUnderAttackByWhite = false;
		this.isUnderAttackByBlack = false;
		this.isNetural = true;
	}
}

class ChessBoard {
	constructor() {
		this.board = [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0]
		];

		this.setupBoard();
	}

	setupBoard = () => {
		for (let i = 0; i < this.board.length; i++) {
			for (let j = 0; j < this.board.length; j++) {
				this.board[i][j] = new CellClass(i, j);

				// whole row is under attack by pawns
				if (i === 2) {
					this.board[i][j].isUnderAttackByBlack = true;
				}

				if (i === 6) {
					this.board[i][j].isUnderAttackByWhite = true;
				}
			}
		}
	};

	updateAttackedCells = (movedPiece, board, kingParameters) => {
		this.setupBoard();

		const pieceMoves = movedPiece.validMoves(board, kingParameters);

		Object.keys(pieceMoves).forEach(key => {
			const [row, col] = key.split(",").map(k => Number(k));

			if (movedPiece.color === "white") {
				board[row][col].isUnderAttackByWhite = true;
			}
		});
	};
}

export default ChessBoard;
