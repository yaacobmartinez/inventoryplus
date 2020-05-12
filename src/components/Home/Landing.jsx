import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Slide } from "@material-ui/core";
import Axios from "axios";
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(8, 2, 0, 10),
	},
}));
function Landing({ handleChanger }) {
	const classes = useStyles();
	const [profile, setProfile] = useState();
	useEffect(() => {
		let source = Axios.CancelToken.source();
		const jwt = localStorage.getItem("jwt");
		const getProfile = async () => {
			await Axios({
				method: "GET",
				url: "users/me",
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
				validateStatus: (status) => {
					return true;
				},
				cancelToken: source.token,
			})
				.then((res) => {
					setProfile(res.data);
				})
				.catch((err) => {
					// console.log(err);
				});
		};
		getProfile();

		return () => {
			source.cancel();
		};
	}, []);
	return (
		<Slide in={true}>
			<div className={classes.root}>
				<Typography variant='h6'>Welcome back,</Typography>
				<Typography variant='h4' gutterBottom>
					{profile ? `${profile.username} !` : null}
				</Typography>
			</div>
		</Slide>
	);
}

export default Landing;
