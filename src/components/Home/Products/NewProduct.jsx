import React, { useState } from "react";
import {
	Drawer,
	makeStyles,
	Typography,
	AppBar,
	Toolbar,
	IconButton,
	Button,
	Divider,
	Grid,
	TextField,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
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
function NewProduct({ state, handleClose, updater }) {
	const classes = useStyles();
	const initialValues = {
		product_name: "",
		stock: "",
		product_description: "",
		original_price: "",
		markup: "",
		final_price: "",
	};
	const { data } = useSWR("/products");
	const errorInitial = {};
	const [values, setValues] = useState(initialValues);
	const [error, setError] = useState(errorInitial);
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setError(errorInitial);
		const product_name = !values.product_name ? true : false;
		const stock = !values.stock ? true : false;
		const original_price = !values.original_price ? true : false;
		const markup = !values.markup ? true : false;
		setError({ ...error, product_name, stock, original_price, markup });
		const hasError =
			product_name || stock || original_price || markup ? true : false;
		if (!hasError) {
			// insert logic
			const jwt = localStorage.getItem("jwt");
			const headers = { Authorization: `Bearer ${jwt}` };
			const addProduct = async () => {
				mutate("/products", [...data, values], false);
				await Axios.post("products", values, { headers });
				trigger("/products");
			};
			addProduct();
			handleClose();
		}
	};
	const computeFinalPrice = () => {
		if (values.original_price && values.markup) {
			const final_price =
				parseInt(values.original_price) + parseInt(values.markup);
			setValues({ ...values, final_price });
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
							Create a new product
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
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									autoFocus
									name='product_name'
									label='Name'
									variant='outlined'
									value={values.product_name}
									onChange={handleChange}
									error={error.product_name}
									helperText={error.product_name ? "This is required" : null}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									name='stock'
									label='Remaining Stock'
									variant='outlined'
									type='number'
									value={values.stock}
									onChange={handleChange}
									error={error.stock}
									helperText={error.stock ? "This is required" : null}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									name='product_description'
									label='Description'
									variant='outlined'
									value={values.product_description}
									onChange={handleChange}
									rows={4}
									multiline
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									name='original_price'
									label='Original Price'
									variant='outlined'
									type='number'
									style={{ textAlign: "right" }}
									value={values.original_price}
									onChange={handleChange}
									error={error.original_price}
									helperText={error.original_price ? "This is required" : null}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									name='markup'
									label='Mark Up'
									variant='outlined'
									type='number'
									value={values.markup}
									onChange={handleChange}
									onBlur={computeFinalPrice}
									error={error.markup}
									helperText={error.markup ? "This is required" : null}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									name='final_price'
									label='Final Price'
									variant='outlined'
									type='number'
									// onFocus={computeFinalPrice}
									value={values.final_price}
									InputProps={{
										readOnly: true,
									}}
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

export default NewProduct;
