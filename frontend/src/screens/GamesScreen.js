import React from "react";
import { Link } from "react-router-dom";

const GamesScreen = () => {
	const s = { margin: "1rem" };
	return (
		<div>
			<Link style={s} to="/chess">
				Chess
			</Link>
			<Link style={s} to="/checkers">
				Checkers
			</Link>
			<Link style={s} to="/sketchio">
				SketchIO
			</Link>
		</div>
	);
};

export default GamesScreen;
