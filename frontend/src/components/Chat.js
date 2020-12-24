import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Chat = ({ socket }) => {
	// console.log(window.socket);
	// window.socket is already initialized
	// react use effect has a call to setMessage, so I'm using setInputMessage
	const [inputMessage, setInputMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	const sendMessage = e => {
		e.preventDefault();
		window.socket.emit("newMessage", { inputMessage });
		setInputMessage("");
	};

	useEffect(() => {
		console.log("chat use effect called");

		window.socket = io("localhost:3000");
		window.socket.emit("nc");
	}, []);

	useEffect(() => {
		if (window.socket) {
			window.socket.on("newMessageReceived", data => {
				console.log("newMessageReceived, data = ", data);
				let { newMessage } = data;
				setMessageList([...messageList, newMessage]);
			});
		}
	}, [messageList]);

	console.log(inputMessage);

	return (
		<div>
			<div>
				{messageList.map((m, i) => (
					<p key={i}>{("message: ", m)}</p>
				))}
			</div>
			<form onSubmit={sendMessage}>
				<input
					type="text"
					value={inputMessage}
					onChange={e => {
						e.preventDefault();
						setInputMessage(e.target.value);
					}}
				/>
			</form>
		</div>
	);
};

export default Chat;
