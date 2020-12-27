import React from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

import { useSelector, useDispatch } from "react-redux";

const GamesScreen = () => {
	const { username } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const s = { margin: "1rem" };

	const initSocket = room => {
		let socket = io("localhost:3000");
		socket.emit("newConnection", { username, room });

		dispatch({ type: "SET_SOCKET", payload: socket });
	};

	return (
		<div>
			<Link style={s} to="/chess" onClick={() => initSocket("chess")}>
				Chess
			</Link>
			<Link style={s} to="/checkers" onClick={() => initSocket("checkers")}>
				Checkers
			</Link>
			<Link style={s} to="/sketchio" onClick={() => initSocket("sketchio")}>
				SketchIO
			</Link>
		</div>
	);
};

export default GamesScreen;
