import React, { useState } from "react";
import { makeStyles, CardActionArea, Typography } from "@material-ui/core";
import UpdateCustomer from "./UpdateCustomer";
const useStyles = makeStyles((theme) => ({
	item: {
		textAlign: "center",
		borderRadius: 10,
		padding: theme.spacing(2),
		background: theme.palette.background.default,
	},
}));
function Customer({ customer, updater }) {
	const classes = useStyles();
	const [expand, setExpand] = useState(false);
	const handleExpandClick = (e) => {
		setExpand(true);
	};
	const handleClose = () => {
		setExpand(false);
	};
	return (
		<div>
			<CardActionArea
				className={classes.item}
				elevation={0}
				onClick={handleExpandClick}>
				<div>
					<Typography style={{ flex: 1 }}>{customer.name}</Typography>
				</div>
			</CardActionArea>
			<UpdateCustomer
				customer={customer}
				state={expand}
				toggleState={handleClose}
				updater={updater}
			/>
		</div>
	);
}

export default Customer;
