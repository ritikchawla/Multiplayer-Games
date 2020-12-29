import React from "react";
import { v4 as uuid } from "uuid";
import { io } from "socket.io-client";

const GamesScreen = ({ history }) => {
	const s = { margin: "1rem" };

	const initSocket = _room => {
		let room = `${_room}_${uuid()}`;
		history.push(`/inviteplayers/${room}`);
	};

	return (
		<div>
			<div style={s} onClick={() => initSocket("chess")}>
				Chess
			</div>
			<div style={s} onClick={() => initSocket("checkers")}>
				Checkers
			</div>
			<div style={s} onClick={() => initSocket("sketchio")}>
				SketchIO
			</div>
		</div>
	);
};

export default GamesScreen;
