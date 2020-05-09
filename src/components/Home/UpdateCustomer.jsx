import React, { useState } from "react";
import {
	Drawer,
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
	IconButton,
	Divider,
	Grid,
	Button,
	Backdrop,
	CircularProgress,
	TextField,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
	modalTitle: {
		flex: 1,
		color: theme.palette.text.primary,
		fontWeight: 600,
	},
	modal: {
		width: 600,
		padding: theme.spacing(4),
		[theme.breakpoints.down("xs")]: {
			width: 360,
		},
	},
	title: {
		fontSize: 30,
		fontWeight: 500,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));
function UpdateCustomer({ customer, state, toggleState, updater }) {
	const classes = useStyles();
	const [backdrop, setBackdrop] = useState(false);
	const [values, setValues] = useState(customer);
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!values.name) {
			return;
		}
		setBackdrop(true);
		const jwt = localStorage.getItem("jwt");
		const updateCustomer = async () => {
			await Axios({
				method: "PUT",
				url: `customers/${values.id}`,
				data: values,
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
				validateStatus: (status) => {
					return true;
				},
			})
				.then((res) => {
					updater();
					setBackdrop(false);
				})
				.catch((err) => {
					console.log(err);
					setBackdrop(false);
				});
		};
		updateCustomer();
		toggleState();
	};
	return (
		<div>
			<Backdrop className={classes.backdrop} open={backdrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Drawer anchor='right' open={state} onClose={toggleState}>
				<AppBar
					position='static'
					style={{ background: "transparent", boxShadow: "none" }}>
					<Toolbar variant='dense'>
						<Typography className={classes.modalTitle}>
							Update customer details
						</Typography>
						<IconButton onClick={toggleState}>
							<Close />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Divider />
				<div className={classes.modal}>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									name='name'
									label='Name'
									value={values.name}
									fullWidth
									onChange={handleChange}
									variant='outlined'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									name='address'
									label='Address'
									value={values.address}
									fullWidth
									multiline
									rows='4'
									onChange={handleChange}
									variant='outlined'
								/>
							</Grid>
							<Grid item xs={12}>
								<Button
									onClick={handleSubmit}
									fullWidth
									variant='contained'
									color='primary'>
									Save
								</Button>
							</Grid>
							<Grid item xs={12}>
								<Button fullWidth variant='contained' onClick={toggleState}>
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

export default UpdateCustomer;
