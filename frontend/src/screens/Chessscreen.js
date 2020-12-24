import React, { useEffect } from "react";
import ChessBoard from "../components/ChessBoard";

import { io } from "socket.io-client";
import Chat from "../components/Chat";

// putting this outside the fucntion so that child components' re-render won't affect this
let socket;

const ChessScreen = () => {
	// let socket;
	const mainDivStyles = {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		minHeight: "100vh",
		minWidth: "85vw"
	};

	// useEffect(() => {
	// 	console.log("use effect called");

	// 	window.socket = io("localhost:3000");
	// 	window.socket.emit("nc");
	// }, []);

	return (
		<div style={mainDivStyles}>
			<ChessBoard />
			<Chat socket={socket} />
		</div>
	);
};

export default ChessScreen;
