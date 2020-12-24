import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import "../styles/Chat.css";

const Chat = () => {
	// console.log(window.socket);
	// window.socket is already initialized
	// react use effect has a call to setMessage, so I'm using setInputMessage
	const [inputMessage, setInputMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	const sendMessage = e => {
		e.preventDefault();
		window.socket.emit("newMessage", { inputMessage });
		setMessageList([...messageList, { username: "You", newMessage: inputMessage }]);
		setInputMessage("");
	};

	useEffect(() => {
		if (window.socket) {
			window.socket.on("newMessageReceived", data => {
				let { newMessage, username } = data;

				setMessageList([...messageList, { username, newMessage }]);
			});
		}
	}, [messageList]);

	return (
		<div id="chat-form-container">
			<div id="chat-container">
				{messageList.map((m, i) => (
					<p key={i} className="message">
						<p
							className="username"
							style={{
								color: m.username === "You" ? "black" : "#0984e3"
							}}
						>
							{m.username}
						</p>
						<p>{m.newMessage}</p>
					</p>
				))}
			</div>
			<form onSubmit={sendMessage}>
				<input
					type="text"
					placeholder="Type your message"
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
