import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

import DisplayPlayersInRoom from "../components/DisplayPlayersInRoom";
import DisplayRoomId from "../components/DisplayRoomId";
import useWindowSize from "../hooks/useWindowSize";

let socket;

const InvitePlayersScreen = ({ match, history }) => {
	const { username } = useSelector(state => state.user);
	const sketchIOSockets = useSelector(state => state.sketchIOSockets);
	const checkersSockets = useSelector(state => state.checkersSockets);
	const chessSockets = useSelector(state => state.chessSockets);
	const dispatch = useDispatch();

	const windowSize = useWindowSize();

	useEffect(() => {
		let room = match.params.roomId;

		socket = io("localhost:3000");

		socket.emit("newConnection", { username, room });
		dispatch({ type: "SET_SOCKET", payload: socket });

		socket.on("sketchioPlayerUpdate", ({ allSocketsForRoom }) => {
			dispatch({ type: "UPDATE_PAINTERS", payload: allSocketsForRoom });
		});

		socket.on("checkersPlayerUpdate", ({ allSocketsForRoom }) => {
			dispatch({ type: "UPDATE_CHECKERS_PLAYERS", payload: allSocketsForRoom });
		});

		socket.on("chessPlayerUpdate", ({ allSocketsForRoom }) => {
			dispatch({ type: "UPDATE_CHESS_PLAYERS", payload: allSocketsForRoom });
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
				history.push("/sketchio"); // to the person who clicks on the button
				break;

			case "checkers":
				socket.emit("redirectToGame", { game });
				history.push("/checkers");
				break;

			case "chess":
				socket.emit("redirectToGame", { game });
				history.push("/chess");
				break;

			default:
				break;
		}
	};

	return (
		<div
			style={{
				width: windowSize[0] > 1000 ? "70%" : "100%",
				height: "100%",
				padding: "4rem"
			}}
		>
			<DisplayRoomId roomId={match.params.roomId} />
			<DisplayPlayersInRoom
				allSockets={
					sketchIOSockets.length > 0
						? sketchIOSockets
						: checkersSockets.length > 0
						? checkersSockets
						: chessSockets
				}
			/>
			<button onClick={startGame}>Start Game</button>
		</div>
	);
};

export default InvitePlayersScreen;
