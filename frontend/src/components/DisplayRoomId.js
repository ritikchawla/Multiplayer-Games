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
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center"
	};

	return (
		<div style={styles}>
			<input id="roomIdToCopy" value={roomId} readOnly />
			<button onClick={copyRoomId}>{copy}</button>
		</div>
	);
};

export default DisplayRoomId;
