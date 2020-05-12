import React, { useState } from "react";
import {
	makeStyles,
	Drawer,
	AppBar,
	Toolbar,
	Divider,
	Grid,
	Typography,
	IconButton,
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	Backdrop,
	CircularProgress,
} from "@material-ui/core";
// import Axios from "axios";
import { Close } from "@material-ui/icons";
import Autocomplete, {
	createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import Axios from "axios";
const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
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
function NewOrder({ state, handleClose, updater, customers, products }) {
	const classes = useStyles();
	const [order, setOrder] = useState({});
	const [error, setError] = useState({
		customer: false,
		product: false,
		quantity: false,
		status: false,
	});
	const [backdrop, setBackdrop] = useState(false);
	const [item, setItem] = useState([]);
	const handleSubmit = (e) => {
		e.preventDefault();

		setOrder({ ...order, items: [item] });

		const customer = !order.customer ? true : false;
		const product = !item.product ? true : false;
		let quantity = !item.quantity ? true : false;
		const status = !item.status ? true : false;
		let insufficient = false;
		const remainingStock = item.product.stock - item.quantity;
		if (remainingStock < 0) {
			insufficient = true;
		}
		setError({ ...error, customer, product, quantity, status, insufficient });
		const hasError =
			customer || product || quantity || status || insufficient ? true : false;
		if (!hasError) {
			setBackdrop(true);
			const jwt = localStorage.getItem("jwt");
			const updateStocks = async () => {
				await Axios({
					method: "PUT",
					url: `products/${item.product._id}`,
					data: JSON.stringify({ stock: remainingStock }),
					headers: {
						"content-type": "application/json ",
						Authorization: `Bearer ${jwt}`,
					},
					validateStatus: (status) => {
						return true;
					},
				}).then((res) => {
					setBackdrop(false);
					updater();
				});
			};
			const insertOrder = async () => {
				await Axios({
					method: "POST",
					url: "orders",
					data: order,
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
					validateStatus: (status) => {
						return true;
					},
				}).then((res) => {
					updateStocks();
					setCustomer({});
					setItem({});
				});
			};

			insertOrder();
			handleClose();
		}
	};
	const initialNewCustomer = {
		name: "",
		address: "",
	};
	const [open, toggleOpen] = useState(false);

	const [newCustomer, setNewCustomer] = useState(initialNewCustomer);
	const handleNewCustomerClose = () => {
		setNewCustomer(initialNewCustomer);
		toggleOpen(false);
	};
	const [customer, setCustomer] = useState(initialNewCustomer);
	const handleNewCustomerSubmit = (e) => {
		e.preventDefault();
		toggleOpen(false);
		const jwt = localStorage.getItem("jwt");
		const insertCustomer = async () => {
			await Axios({
				method: "POST",
				url: "customers",
				data: newCustomer,
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
				validateStatus: (status) => {
					return true;
				},
			})
				.then((res) => {
					setCustomer(res.data);
					setOrder({ ...order, customer: res.data });
				})
				.catch((err) => {
					console.log(err);
				});
		};
		insertCustomer();
	};
	return (
		<div>
			<Backdrop className={classes.backdrop} open={backdrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Drawer anchor='right' open={state} onClose={handleClose}>
				<AppBar
					position='static'
					style={{ background: "transparent", boxShadow: "none" }}>
					<Toolbar variant='dense'>
						<Typography className={classes.modalTitle}>
							Create a new order
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
								<Autocomplete
									fullWidth
									value={customer.name}
									onChange={(e, newValue) => {
										if (newValue) {
											if (typeof newValue === "string") {
												setTimeout(() => {
													toggleOpen(true);
													setNewCustomer({
														name: newValue,
														address: "",
													});
												});
												return;
											}
											if (newValue && newValue.inputValue) {
												toggleOpen(true);
												setNewCustomer({
													name: newValue.inputValue,
													address: "",
												});
												return;
											}
											setCustomer(newValue);
											setOrder({ ...order, customer: newValue });
										}
									}}
									filterOptions={(options, params) => {
										const filtered = filter(options, params);
										if (params.inputValue !== "") {
											filtered.push({
												inputValue: params.inputValue,
												name: `Add "${params.inputValue}"`,
											});
										}
										return filtered;
									}}
									options={customers}
									getOptionLabel={(option) => {
										if (typeof option === "string") {
											return option;
										}
										if (option.inputValue) {
											return option.inputValue;
										}
										return option.name;
									}}
									selectOnFocus
									clearOnBlur
									renderOption={(option) => option.name}
									freeSolo
									renderInput={(params) => (
										<TextField
											{...params}
											autoFocus
											error={error.customer}
											helperText={
												error.customer ? "Customer is required." : null
											}
											label='Customer'
											variant='outlined'
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={8}>
								{products ? (
									<Autocomplete
										onChange={(e, newValue) => {
											setItem({
												...item,
												product: newValue,
											});
										}}
										onBlur={(e) => {
											setOrder({ ...order, items: [item] });
										}}
										options={products}
										getOptionLabel={(option) => option.product_name}
										fullWidth
										renderInput={(params) => (
											<TextField
												{...params}
												error={error.product}
												helperText={
													error.product ? "Product is required." : null
												}
												label='Products'
												variant='outlined'
											/>
										)}
									/>
								) : null}
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									label='Quantity'
									name='quantity'
									fullWidth
									type='number'
									variant='outlined'
									error={error.quantity}
									helperText={error.quantity ? "Qty is required." : null}
									InputProps={{
										inputProps: { min: 1 },
									}}
									onChange={(e) => {
										setItem({
											...item,
											quantity: e.target.value,
										});
									}}
									onBlur={(e) => {
										setOrder({ ...order, items: [item] });
									}}
								/>
								{error.insufficient ? (
									<FormHelperText style={{ color: "red" }}>
										Stock Insufficient
									</FormHelperText>
								) : null}
							</Grid>
							<Grid item xs={12}>
								<FormControl variant='outlined' fullWidth>
									<InputLabel id='status'>Status</InputLabel>
									<Select
										value={item.status ? item.status : ""}
										labelId='status'
										error={error.status}
										onChange={(e) => {
											setItem({
												...item,
												status: e.target.value,
											});
										}}
										onBlur={(e) => {
											setOrder({ ...order, items: [item] });
										}}
										label='Status'>
										<MenuItem value=''>
											<em>{""}</em>
										</MenuItem>
										<MenuItem value='Reserved'>Reserved</MenuItem>
										<MenuItem value='Confirmed'>Confirmed</MenuItem>
										<MenuItem value='ToShip'>For Shipping</MenuItem>
										<MenuItem value='Fulfilled'>Fulfilled</MenuItem>
									</Select>
									{error.status ? (
										<FormHelperText style={{ color: "red" }}>
											Status is required.
										</FormHelperText>
									) : null}
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<Button
									fullWidth
									style={{ borderRadius: 20 }}
									size='large'
									variant='contained'
									color='primary'
									type='submit'>
									Save Order
								</Button>
							</Grid>
							<Grid item xs={12}>
								<Button
									onClick={handleClose}
									fullWidth
									style={{ borderRadius: 20 }}
									size='large'
									variant='contained'>
									Cancel
								</Button>
							</Grid>
						</Grid>
					</form>
				</div>
				<Dialog open={open} onClose={handleNewCustomerClose}>
					<form onSubmit={handleNewCustomerSubmit}>
						<DialogTitle>Add a new customer</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Customer not on the list? Please, add it!
							</DialogContentText>
							<TextField
								fullWidth
								autoFocus
								variant='outlined'
								margin='dense'
								value={newCustomer.name}
								onChange={(e) =>
									setNewCustomer({ ...newCustomer, name: e.target.value })
								}
								label='Name'
								type='text'
							/>
							<TextField
								fullWidth
								variant='outlined'
								margin='dense'
								value={newCustomer.address}
								multiline
								rows='4'
								onChange={(e) =>
									setNewCustomer({
										...newCustomer,
										address: e.target.value,
									})
								}
								label='Address'
								type='text'
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleNewCustomerClose}>Cancel</Button>
							<Button type='submit' color='primary'>
								Add
							</Button>
						</DialogActions>
					</form>
				</Dialog>
			</Drawer>
		</div>
	);
}

export default NewOrder;
