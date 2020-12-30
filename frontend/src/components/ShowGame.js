import React from "react";
import { withRouter } from "react-router-dom";
import { v4 as uuid } from "uuid";

import "../styles/ShowGame.css";

const ShowGame = ({ game, history }) => {
	let image;

	if (game === "chess") image = "/images/chess.jpg";
	else if (game === "sketchio") image = "/images/sketchio.jpg";
	else if (game === "checkers") image = "/images/checkers.jpg";

	const initSocket = () => {
		// initialization of socket occurs in inviteplayersScreen
		let room = `${game}_${uuid()}`;
		history.push(`/inviteplayers/${room}`);
	};

	return (
		<div id="showGameContainer">
			<div id="showGameImageContainer">
				<img id="gameImg" src={image} />
			</div>
			<div id="showGameButtonsContainer">
				<button onClick={initSocket}>Create Room</button>
			</div>
		</div>
	);
};

export default withRouter(ShowGame);
