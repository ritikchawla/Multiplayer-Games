import React, { useEffect } from "react";
import Chat from "../components/Chat";
import CheckersBoard from "../components/CheckersBoard";
import { useDispatch, useSelector } from "react-redux";

const CheckersScreen = () => {
	const dispatch = useDispatch();
	const { socket } = useSelector(state => state.socket);

	const mainDivStyles = {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		minHeight: "100vh",
		minWidth: "85vw",
		flexWrap: "wrap"
	};

	useEffect(() => {
		document.title = "Games.IO | Checkers";
	}, []);

	useEffect(() => {
		socket.emit("getCheckersPieceColor");

		socket.on("setCheckersPieceColor", ({ checkersPieceColor }) => {
			console.log(checkersPieceColor);
			// do this somewhere else when you have more games
			dispatch({
				type: "SET_CHECKERS_PIECE_COLOR",
				payload: checkersPieceColor
			});
		});
	}, [socket, dispatch]);

	return (
		<div style={mainDivStyles}>
			<CheckersBoard />
			<Chat />
		</div>
	);
};

export default CheckersScreen;
