import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./components/Login/Login";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { AuthContextProvider } from "./components/contexts/AuthContext";
import Home from "./components/Home";
import axios from "axios";
axios.defaults.baseURL = "https://api-iplus.herokuapp.com/";

const theme = createMuiTheme({
	typography: {
		fontFamily: "Poppins, sans-serif",
	},
	palette: {
		// type: "dark",
		type: "light",
		background: {
			default: "#F3F4FB",
		},
	},
});

function App() {
	return (
		<div className='App'>
			<ThemeProvider theme={theme}>
				<Router>
					<AuthContextProvider>
						<Switch>
							<Route exact path='/login' component={Login} />
							<ProtectedRoute exact path='/' component={Home} />
						</Switch>
					</AuthContextProvider>
				</Router>
			</ThemeProvider>
		</div>
	);
}

export default App;
