import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { io } from "socket.io-client";
import DisplayPlayersInRoom from "../components/DisplayPlayersInRoom";
import DisplayRoomId from "../components/DisplayRoomId";

let socket;

const InvitePlayersScreen = ({ match, history }) => {
	const { username } = useSelector(state => state.user);
	const sketchIOSockets = useSelector(state => state.sketchIOSockets);
	const dispatch = useDispatch();

	useEffect(() => {
		let room = match.params.roomId;

		socket = io("localhost:3000");

		socket.emit("newConnection", { username, room });
		dispatch({ type: "SET_SOCKET", payload: socket });

		socket.on("sketchioPlayerUpdate", ({ allSketchIOSockets }) => {
			dispatch({ type: "UPDATE_PAINTERS", payload: allSketchIOSockets });
		});

		socket.on("playerLeaveUpdate", ({ allRoomSockets }) => {
			dispatch({ type: "UPDATE_PAINTERS", payload: allRoomSockets });
		});

		socket.on("redirectedToGame", ({ game }) => {
			history.push(`/${game}`);
		});
	}, [dispatch, match, history, username]);

	const startGame = () => {
		const game = match.params.roomId.split("_")[0];
		switch (game) {
			case "sketchio":
				socket.emit("redirectToGame", { game });
				history.push("/sketchio");
				break;

			default:
				break;
		}
	};

	return (
		<div style={{ width: "70%" }}>
			<DisplayRoomId roomId={match.params.roomId} />
			<DisplayPlayersInRoom allSockets={sketchIOSockets} />
			<button onClick={startGame}>Start Game</button>
		</div>
	);
};

export default InvitePlayersScreen;
