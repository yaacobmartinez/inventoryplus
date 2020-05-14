import React, { useState } from "react";
import { Close } from "@material-ui/icons";
import {
	makeStyles,
	Drawer,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Divider,
	Grid,
	TextField,
	Button,
} from "@material-ui/core";
import Axios from "axios";
import useSWR, { mutate, trigger } from "swr";
const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiCardActions-root": {
			position: "fixed",
			bottom: 0,
		},
	},
	modal: {
		width: 600,
		padding: theme.spacing(4),
		[theme.breakpoints.down("xs")]: {
			width: 360,
		},
	},
	modalTitle: {
		flex: 1,
		color: theme.palette.text.primary,
		fontWeight: 600,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
	btn: {
		borderRadius: 100,
	},
}));
function NewCustomer({ state, handleClose, updater }) {
	const classes = useStyles();
	const initialValues = {
		name: "",
		address: "",
	};
	const { data } = useSWR("/customers");
	const errorInitial = {};
	const [values, setValues] = useState(initialValues);
	const [error, setError] = useState(errorInitial);
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setError(errorInitial);
		const name = !values.name ? true : false;
		const address = !values.address ? true : false;
		setError({ ...error, name, address });
		const hasError = name || address ? true : false;
		if (!hasError) {
			const jwt = localStorage.getItem("jwt");
			const headers = { Authorization: `Bearer ${jwt}` };
			const addCustomer = async () => {
				mutate("/customers", [...data, values], false);
				await Axios.post("customers", values, { headers });
				trigger("/customers");
			};
			addCustomer();
			handleClose();
		}
	};
	return (
		<div>
			<Drawer
				className={classes.root}
				anchor='right'
				open={state}
				onClose={handleClose}>
				<AppBar
					position='static'
					style={{ background: "transparent", boxShadow: "none" }}>
					<Toolbar variant='dense'>
						<Typography className={classes.modalTitle}>
							Create new customer
						</Typography>
						<IconButton onClick={handleClose}>
							<Close />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Divider />
				<div className={classes.modal}>
					<form noValidate onSubmit={handleSubmit}>
						<Grid container alignItems='center' spacing={2}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									autoFocus
									name='name'
									label='Name'
									variant='outlined'
									value={values.name}
									onChange={handleChange}
									error={error.name}
									helperText={error.name ? "Name is required" : null}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									name='address'
									label='Address'
									variant='outlined'
									multiline
									rows='4'
									value={values.address}
									onChange={handleChange}
									error={error.address}
									helperText={error.address ? "Name is required" : null}
								/>
							</Grid>
							<Grid item xs={12}>
								<Button
									className={classes.btn}
									onClick={handleSubmit}
									variant='contained'
									fullWidth
									size='large'
									color='primary'>
									Submit
								</Button>
							</Grid>
							<Grid item xs={12}>
								<Button
									className={classes.btn}
									onClick={handleClose}
									variant='contained'
									fullWidth
									size='large'>
									Cancel
								</Button>
							</Grid>
						</Grid>
					</form>
				</div>
			</Drawer>
		</div>
	);
}

export default NewCustomer;
