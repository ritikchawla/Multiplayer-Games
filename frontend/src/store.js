import { createStore, combineReducers } from "redux";
import { userReducer } from "./reducers/userReducers";
import { socketReducer } from "./reducers/socketReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
	user: userReducer,
	socket: socketReducer
});

const initialState = {
	user: {},
	socket: {}
};

const store = createStore(reducers, initialState, composeWithDevTools());

export default store;
