class Piece {
	constructor(color, row, col) {
		this.color = color;
		this.row = row;
		this.col = col;
		this.moves = {};
		this.isBeingAttacked = false;
		this.isClicked = false;
	}

	setRowCol = (row, col) => {
		this.row = row;
		this.col = col;
	};

	resetMoves = () => {
		this.moves = {};
	};
}

export default Piece;

// let b = [
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0]
// ];

// // const rook = new Rook("B", 3, 4);
// // const bishop = new Bishop("B", 4, 4);
// // const queen = new Queen("B", 4, 5);
// const obj = new Pawn("B", 1, 3);

// // let [moves, board] = queen.validQueenMoves(b);
// // let [moves, board] = rook.validRookMoves(b);
// // let [moves, board] = bishop.validBishopMoves(b);
// let moves = obj.validMoves(b);

// console.log(moves);
// console.table(b);
