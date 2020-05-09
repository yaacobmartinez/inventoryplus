import React, { useState } from "react";
import { Close } from "@material-ui/icons";
import {
	makeStyles,
	Backdrop,
	CircularProgress,
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
}));
function NewCustomer({ state, handleClose, updater }) {
	const classes = useStyles();
	const [backdrop, setBackdrop] = useState(false);
	const initialValues = {
		name: "",
		address: "",
	};
	const errorInitial = {};
	const [values, setValues] = useState(initialValues);
	const [error, setError] = useState(errorInitial);
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setBackdrop(true);
		setError(errorInitial);
		const name = !values.name ? true : false;
		const address = !values.address ? true : false;
		setError({ ...error, name, address });
		const hasError = name || address ? true : false;
		if (!hasError) {
			const jwt = localStorage.getItem("jwt");
			const addCustomer = async () => {
				await Axios({
					method: "POST",
					url: "customers",
					data: values,
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
					validateStatus: (status) => {
						return true;
					},
				})
					.then((res) => {
						if (res.status === 403) {
							localStorage.clear();
							window.location.reload();
							setBackdrop(false);
							return;
						}
						updater();
						setBackdrop(false);
					})
					.catch((err) => {
						console.log(err);
						setBackdrop(false);
					});
			};
			addCustomer();
			handleClose();
		}
	};
	return (
		<div>
			<Backdrop className={classes.backdrop} open={backdrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
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
									onClick={handleSubmit}
									variant='contained'
									fullWidth
									size='large'
									color='primary'>
									Submit
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
