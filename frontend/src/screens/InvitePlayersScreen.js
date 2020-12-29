import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { io } from "socket.io-client";
import DisplayPlayersInRoom from "../components/DisplayPlayersInRoom";
import DisplayRoomId from "../components/DisplayRoomId";

const InvitePlayersScreen = ({ match }) => {
	const { username } = useSelector(state => state.user);
	const sketchIOSockets = useSelector(state => state.sketchIOSockets);
	const dispatch = useDispatch();

	useEffect(() => {
		let room = match.params.roomId;
		let socket = io("localhost:3000");
		socket.emit("newConnection", { username, room });
		dispatch({ type: "SET_SOCKET", payload: socket });

		socket.on("sketchioPlayerUpdate", ({ allSketchIOSockets }) => {
			dispatch({ type: "UPDATE_PAINTERS", payload: allSketchIOSockets });
		});

		socket.on("sketchioPlayerLeaveUpdate", ({ allSketchIOSockets }) => {
			console.log("sketchioPlayerLeaveUpdate ", allSketchIOSockets);
			dispatch({ type: "UPDATE_PAINTERS", payload: allSketchIOSockets });
		});
	}, [dispatch, match]);

	return (
		<div style={{ width: "70%" }}>
			<DisplayRoomId roomId={match.params.roomId} />
			<DisplayPlayersInRoom allSockets={sketchIOSockets} />
		</div>
	);
};

export default InvitePlayersScreen;
