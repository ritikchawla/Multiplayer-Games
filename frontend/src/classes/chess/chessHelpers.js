// import King from "./King";

const displayBoard = board => {
	let string = "";

	for (let row = 0; row < board.length; row++) {
		process.stdout.write("\n");
		for (let col = 0; col < board.length; col++) {
			if (board[row][col] === 0) {
				process.stdout.write(String(board[row][col]));
			} else {
				process.stdout.write("\x1b[32m", board[row][col]);
			}
		}
	}
};

let b = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, "A", 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
];

displayBoard(b);
