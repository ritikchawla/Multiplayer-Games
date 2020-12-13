import React from "react";
import ChessGame from "./classes/chess/ChessGame";
import ChessScreen from "./screens/ChessScreen";

const App = () => {
	const getChessGameObj = () => {
		const game = new ChessGame();
		return game;
	};

	return (
		<div className="App">
			<ChessScreen getChessGameObj={getChessGameObj} />
		</div>
	);
};

export default App;
