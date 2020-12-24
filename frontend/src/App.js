import React from "react";
import ChessScreen from "./screens/ChessScreen";

import { Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Switch>
				<Route
					exact
					path="/"
					render={routeProps => <HomeScreen {...routeProps} />}
				/>

				<Route exact path="/chess" render={() => <ChessScreen />} />
			</Switch>
		</div>
	);
};

export default App;
