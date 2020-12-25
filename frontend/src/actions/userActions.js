export const setUsernameAction = username => dispatch => {
	dispatch({ type: "SET_USERNAME", payload: username });
};
