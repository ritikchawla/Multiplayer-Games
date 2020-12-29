import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { io } from "socket.io-client";
import DisplayRoomId from "../components/DisplayRoomId";

const InvitePlayersScreen = ({ match }) => {
	const { username } = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (username) {
			let room = match.params.roomId;
			let socket = io("localhost:3000");
			socket.emit("newConnection", { username, room });
			dispatch({ type: "SET_SOCKET", payload: socket });
		}
	}, [dispatch, match, username]);

	return (
		<div>
			<DisplayRoomId roomId={match.params.roomId} />
		</div>
	);
};

export default InvitePlayersScreen;
