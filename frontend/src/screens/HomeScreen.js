import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "../styles/HomeScreenStyles.css";

const HomeScreen = ({ history }) => {
	const dispatch = useDispatch();
	const homeDivStyles = {
		backgroundColor: "white",
		padding: "3rem 2rem",
		borderRadius: "0.5rem",
		boxShadow: "0 0 80px black",
		display: "flex",
		flexDirection: "column",
		alignSelf: "center"
	};

	const [username, setUsername] = useState("");
	const [roomId, setRoomId] = useState("");

	const handleSubmit = e => {
		e.preventDefault();

		if (!username.length > 0 || username === " ") {
			return;
		}

		dispatch({ type: "SET_USERNAME", payload: username });

		setUsername("");

		if (roomId.length === 0) history.push("/games");
		else history.push(`/inviteplayers/${roomId}`);
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "100%"
			}}
		>
			<div style={homeDivStyles}>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={username}
						onChange={e => setUsername(e.target.value)}
						placeholder="Enter Your Username"
					/>

					<input
						type="text"
						value={roomId}
						onChange={e => setRoomId(e.target.value)}
						placeholder="Enter Room Id (Leave empty to create new room)"
					/>

					<button>{roomId ? "Join Room" : "Create Room"}</button>
				</form>
			</div>
		</div>
	);
};

export default HomeScreen;
