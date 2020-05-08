import React, { useEffect, useState, createContext } from "react";
import jwt from "jsonwebtoken";
export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
	const checkToken = () => localStorage.getItem("jwt") || "";
	const [token, setToken] = useState(checkToken);
	useEffect(() => {
		localStorage.setItem("jwt", token);
	}, [token]);
	const currentUser = () => localStorage.getItem("currentUser");
	const [user] = useState(currentUser);
	useEffect(() => {
		const decoded = jwt.decode(token, { complete: true });
		if (decoded) {
			localStorage.setItem("currentUser", decoded.payload.id);
		}
	});
	return (
		<AuthContext.Provider value={[token, setToken, user]}>
			{props.children}
		</AuthContext.Provider>
	);
};
