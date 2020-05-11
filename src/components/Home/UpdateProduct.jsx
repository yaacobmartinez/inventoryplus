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
	InputBase,
	Button,
	Backdrop,
	CircularProgress,
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
	btn: {
		borderRadius: 100,
	},
}));
function UpdateProduct({ item, state, toggleState, updater }) {
	const classes = useStyles();
	const [backdrop, setBackdrop] = useState(false);
	const [values, setValues] = useState(item);
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const reComputeFinalPrice = () => {
		if (!values.original_price || !values.markup) {
			return;
		}
		const final_price =
			parseInt(values.original_price) + parseInt(values.markup);
		setValues({
			...values,
			original_price: parseInt(values.original_price),
			markup: parseInt(values.markup),
			final_price,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setBackdrop(true);
		const jwt = localStorage.getItem("jwt");
		const updateProduct = async () => {
			await Axios({
				method: "PUT",
				url: `products/${values.id}`,
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
		updateProduct();
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
							Update product details
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
								<InputBase
									name='product_name'
									onChange={handleChange}
									className={classes.title}
									value={values.product_name}
								/>
							</Grid>
							<Grid item xs={12} container>
								<Grid item xs={12} sm={6}>
									<Typography style={{ flex: 1, fontWeight: 600 }}>
										Remaining Stocks :
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<InputBase
										name='stock'
										onChange={handleChange}
										className={classes.item}
										value={values.stock}
									/>
								</Grid>
							</Grid>
							<Grid item xs={12} container>
								<Grid item xs={12} sm={6}>
									<Typography style={{ flex: 1, fontWeight: 600 }}>
										Original Price :
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<InputBase
										type='number'
										name='original_price'
										className={classes.item}
										value={values.original_price}
										onChange={handleChange}
										onBlur={reComputeFinalPrice}
									/>
								</Grid>
							</Grid>
							<Grid item xs={12} container>
								<Grid item xs={12} sm={6}>
									<Typography style={{ flex: 1, fontWeight: 600 }}>
										Mark Up :
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<InputBase
										type='number'
										name='markup'
										className={classes.item}
										value={values.markup}
										onChange={handleChange}
										onBlur={reComputeFinalPrice}
									/>
								</Grid>
							</Grid>
							<Grid item xs={12} container>
								<Grid item xs={12} sm={6}>
									<Typography style={{ flex: 1, fontWeight: 600 }}>
										Final Price :
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<InputBase
										name='final_price'
										className={classes.item}
										value={values.final_price}
										inputProps={{ readOnly: true }}
									/>
								</Grid>
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

export default UpdateProduct;
