import React, { useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";

const HomeScreen = ({ history }) => {
	const dispatch = useDispatch();
	let socket;

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

		console.log("username = ", username);

		dispatch({ type: "SET_USERNAME", payload: username });

		socket = io("localhost:3000");
		socket.emit("newConnection", { username });

		dispatch({ type: "SET_SOCKET", payload: socket });

		setUsername("");

		history.push("/games");
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
