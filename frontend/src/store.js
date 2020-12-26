import { createStore, combineReducers } from "redux";
import { userReducer } from "./reducers/userReducers";
import { socketReducer } from "./reducers/socketReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
	user: userReducer,
	socket: socketReducer
});

const socketFromLocalStorage = localStorage.getItem("socket")
	? localStorage.getItem("socket")
	: {};
const userFromLocalStorage = localStorage.getItem("user")
	? localStorage.getItem("user")
	: {};

const initialState = {
	user: userFromLocalStorage,
	socket: socketFromLocalStorage
};

const store = createStore(reducers, initialState, composeWithDevTools());

export default store;
