import React from "react";
import { makeStyles, Typography, Slide } from "@material-ui/core";
import useSWR from "swr";
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(8, 2, 0, 10),
	},
}));
function Landing({ handleChanger }) {
	const classes = useStyles();
	const { data: profile } = useSWR("/users/me");
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
