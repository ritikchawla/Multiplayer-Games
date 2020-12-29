import React from "react";

const DisplayPlayersInRoom = ({ allSockets }) => {
	return (
		<div>
			{allSockets.map(socket => (
				<p key={`1-${socket.username}`}>{socket.username}</p>
			))}
		</div>
	);
};

export default DisplayPlayersInRoom;
