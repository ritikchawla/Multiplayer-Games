import React from "react";
import CheckersScreen from "./screens/CheckersScreen";
import Chessscreen from "./screens/Chessscreen";

function App() {
	let cellsClicked = { rows: [], cols: [] };

	/*
        Have to write a game class. Need to write a game class else everything will
        be all over the place. Without a game class to hold the cellsClicked, numClicks 
        variables, it's going to be extremely weird.
    */

	const updateCellsClicked = (row = null, col = null, reset) => {
		if (reset || cellsClicked.rows.length === 2) {
			cellsClicked = { rows: [], cols: [] };
		}

		console.log("cellsClicked = ", cellsClicked);

		cellsClicked.rows.push(row);
		cellsClicked.cols.push(col);
	};

	return (
		<div className="App">
			<Chessscreen updateCellsClicked={updateCellsClicked} cellsClicked={cellsClicked} />
		</div>
	);
}

export default App;
