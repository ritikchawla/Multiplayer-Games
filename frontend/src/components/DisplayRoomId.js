import React, { useState } from "react";

const DisplayRoomId = ({ roomId }) => {
	const [copy, setCopy] = useState("Copy");

	const copyRoomId = () => {
		let roomIdToCopy = document.getElementById("roomIdToCopy");
		roomIdToCopy.select();

		document.execCommand("copy");
		setCopy("Copied");
	};

	return (
		<div>
			<input id="roomIdToCopy" value={roomId} readOnly />
			<button onClick={copyRoomId}>{copy}</button>
		</div>
	);
};

export default DisplayRoomId;
