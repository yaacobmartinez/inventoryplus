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
	TextField,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Axios from "axios";
import useSWR, { mutate, trigger } from "swr";

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
	btn: {
		borderRadius: 100,
	},
}));
function UpdateCustomer({ customer, state, toggleState, updater }) {
	const classes = useStyles();
	const { data } = useSWR("/customers");
	const [values, setValues] = useState(customer);
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!values.name) {
			return;
		}
		const jwt = localStorage.getItem("jwt");
		const headers = { Authorization: `Bearer ${jwt}` };
		const updateCustomer = async () => {
			mutate(
				"/customers",
				data.filter((c) => c.id !== values.id),
				false
			);
			mutate("/customers", [...data, values], false);

			await Axios.put(`customers/${values.id}`, values, { headers });

			trigger("/customers");
		};
		updateCustomer();
		toggleState();
	};
	return (
		<div>
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
									className={classes.btn}
									onClick={handleSubmit}
									fullWidth
									variant='contained'
									color='primary'>
									Save
								</Button>
							</Grid>
							<Grid item xs={12}>
								<Button
									className={classes.btn}
									fullWidth
									variant='contained'
									onClick={toggleState}>
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
