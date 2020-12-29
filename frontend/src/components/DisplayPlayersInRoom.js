import React from "react";

const DisplayPlayersInRoom = ({ allSockets }) => {
	return (
		<div>
			{allSockets.map(socket => (
				<p>{socket.username}</p>
			))}
		</div>
	);
};

export default DisplayPlayersInRoom;
