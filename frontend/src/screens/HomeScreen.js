import React, { useState } from "react";
import { io } from "socket.io-client";

const HomeScreen = ({ history }) => {
	const homeDivStyles = {
		backgroundColor: "white",
		padding: "3rem 2rem",
		borderRadius: "0.5rem",
		boxShadow: "0 0 80px black"
	};

	const [username, setUsername] = useState("");

	const handleSubmit = e => {
		e.preventDefault();

		if (!username.length > 0 && username !== " ") {
			return;
		}

		window.socket = io("localhost:3000");
		window.socket.emit("newConnection", { username });

		setUsername("");

		history.push("/chess");
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
				</form>
			</div>
		</div>
	);
};

export default HomeScreen;
