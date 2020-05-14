import {
	AppBar,
	Button,
	Divider,
	Drawer,
	Grid,
	IconButton,
	InputBase,
	makeStyles,
	Toolbar,
	Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Axios from "axios";
import React, { useState } from "react";
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
	btn: {
		borderRadius: 100,
	},
}));
function UpdateProduct({ item, state, toggleState, updater }) {
	const classes = useStyles();
	const { data } = useSWR("/products");
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
		const jwt = localStorage.getItem("jwt");
		const headers = { Authorization: `Bearer ${jwt}` };
		const updateProduct = async () => {
			mutate("/products", [...data, values], false);
			await Axios.put(`products/${values.id}`, values, { headers });
			trigger("/products");
		};
		updateProduct();
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
										type='number'
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
