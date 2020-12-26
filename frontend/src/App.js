import React from "react";
import ChessScreen from "./screens/ChessScreen";

import { Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import GamesScreen from "./screens/GamesScreen";

const App = () => {
	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Switch>
				<Route
					exact
					path="/"
					render={routeProps => <HomeScreen {...routeProps} />}
				/>

				<Route
					exact
					path="/games"
					render={routeProps => <GamesScreen {...routeProps} />}
				/>

				<Route
					exact
					path="/chess"
					render={routeProps => <ChessScreen {...routeProps} />}
				/>
			</Switch>
		</div>
	);
};

export default App;
