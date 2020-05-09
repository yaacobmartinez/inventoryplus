import React, { useState } from "react";
import {
	Slide,
	makeStyles,
	Typography,
	Paper,
	Toolbar,
	Button,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import CustomerList from "./CustomerList";
import NewCustomer from "./NewCustomer";
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(8, 2, 0, 8),
	},
	paper: {
		marginTop: theme.spacing(2),
		padding: theme.spacing(1),
		paddingBottom: theme.spacing(4),
		borderRadius: 10,
	},
	addBtn: {
		borderRadius: 20,
		textTransform: "none",
	},
}));
function Customers() {
	const classes = useStyles();
	const [updater, setUpdater] = useState(false);
	const handleUpdate = () => {
		setUpdater(!updater);
	};
	const [newCustomer, setNewCustomer] = useState(false);
	const toggleNewCustomer = () => {
		setNewCustomer(!newCustomer);
	};
	return (
		<Slide in={true}>
			<div className={classes.root}>
				<Typography variant='h5'>Customers</Typography>
				<Paper elevation={0} className={classes.paper}>
					<Toolbar>
						<Typography style={{ flex: 1 }} />
						<Button
							onClick={toggleNewCustomer}
							edge='end'
							variant='contained'
							color='primary'
							startIcon={<Add />}
							className={classes.addBtn}>
							New Customer
						</Button>
					</Toolbar>
					<CustomerList update={updater} updater={handleUpdate} />
				</Paper>
				<NewCustomer
					state={newCustomer}
					handleClose={toggleNewCustomer}
					updater={handleUpdate}
				/>
			</div>
		</Slide>
	);
}

export default Customers;
