import React from "react";

const DisplayPlayersInRoom = ({ allSockets }) => {
	const p = {
		height: 50,
		padding: "1rem",
		fontSize: "1.5rem",
		display: "flex"
	};

	const h = {
		marginLeft: "1rem"
	};

	const d = {
		margin: "2rem auto"
	};

	return (
		<div style={d}>
			<h2>Players in this room</h2>
			{allSockets.map((socket, index) => (
				<p key={`1-${socket.username}`} style={p}>
					<span>{index + 1}.</span>
					<h4 style={h}>{socket.username}</h4>
				</p>
			))}
		</div>
	);
};

export default DisplayPlayersInRoom;
