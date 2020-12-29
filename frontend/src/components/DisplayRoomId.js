import React, { useState } from "react";

const DisplayRoomId = ({ roomId }) => {
	const [copy, setCopy] = useState("Copy");

	const copyRoomId = () => {
		let roomIdToCopy = document.getElementById("roomIdToCopy");
		roomIdToCopy.select();

		document.execCommand("copy");
		setCopy("Copied");
	};

	const styles = {
		maxWidth: "500px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap"
	};

	return (
		<div style={styles}>
			<p>Send the code to invite players to this room</p>
			<input id="roomIdToCopy" value={roomId} readOnly />
			<button onClick={copyRoomId} style={{ backgroundColor: "#0984e3" }}>
				{copy}
			</button>
		</div>
	);
};

export default DisplayRoomId;
