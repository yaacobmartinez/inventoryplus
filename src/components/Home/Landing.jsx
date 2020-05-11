import React from "react";
import { makeStyles, Typography, Slide } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(8, 2, 0, 10),
	},
}));
function Landing({ handleChanger }) {
	const classes = useStyles();
	return (
		<Slide in={true}>
			<div className={classes.root}>
				<Typography variant='h6'>Welcome back,</Typography>
				<Typography variant='h4' gutterBottom>
					jacobmartinez!
				</Typography>
			</div>
		</Slide>
	);
}

export default Landing;
