import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
export const useLoginForm = (initialState, callback) => {
	let { push } = useHistory();
	const [token, setToken] = useContext(AuthContext);
	if (token) {
		push("/app");
	}
	const [values, setValues] = useState(initialState);
	return [
		values,
		// OnChange
		(e) => {
			setValues({
				...values,
				[e.target.name]: e.target.value,
			});
		},
		// OnSubmit
		(e) => {
			e.preventDefault();
			callback(setToken);
		},
	];
};
