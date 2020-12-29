import React from "react";
import ShowGame from "../components/ShowGame";
import useWindowSize from "../hooks/useWindowSize";

const GamesScreen = () => {
	const windowSize = useWindowSize();

	const divStyles = {
		width: windowSize[0] > 1000 ? "70%" : "90%",
		display: "flex",
		justifyContent: "space-between"
	};

	return (
		<div style={divStyles}>
			{["chess", "checkers", "sketchio"].map(g => (
				<ShowGame game={g} />
			))}
		</div>
	);
};

export default GamesScreen;
