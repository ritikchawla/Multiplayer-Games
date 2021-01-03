import { createStore, combineReducers } from "redux";
import { userReducer } from "./reducers/userReducers";
import {
	checkersSocketsReducer,
	chessSocketsReducer,
	sketchIOSocketsReducer,
	socketReducer
} from "./reducers/socketReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
	user: userReducer,
	socket: socketReducer,
	sketchIOSockets: sketchIOSocketsReducer,
	checkersSockets: checkersSocketsReducer,
	chessSockets: chessSocketsReducer
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
