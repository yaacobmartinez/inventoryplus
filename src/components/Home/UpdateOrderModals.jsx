import React, { useState } from "react";
import {
	Slide,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	makeStyles,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Backdrop,
	CircularProgress,
} from "@material-ui/core";
import Axios from "axios";
import { ArrowForward, ArrowBack } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	btn: {
		borderRadius: 100,
		textTransform: "none",
	},
	formField: {
		margin: theme.spacing(2, 0, 2, 0),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export const DeleteOrderModal = ({
	state,
	toggler,
	order,
	disabler,
	updater,
}) => {
	const classes = useStyles();
	const [backdrop, setBackdrop] = useState(false);
	const [product, setProduct] = useState(order.items[0].product);
	const handleChange = () => {
		setProduct({ ...product, stock: product.stock + order.items[0].quantity });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setBackdrop(true);
		const jwt = localStorage.getItem("jwt");
		const updateProduct = async () => {
			await Axios({
				method: "PUT",
				url: `products/${product.id}`,
				data: product,
				headers: {
					"content-type": "application/json ",
					Authorization: `Bearer ${jwt}`,
				},
				validateStatus: (status) => {
					return true;
				},
			});
		};
		const cancelOrder = async () => {
			await Axios({
				method: "DELETE",
				url: `orders/${order.id}`,
				headers: {
					"content-type": "application/json ",
					Authorization: `Bearer ${jwt}`,
				},
				validateStatus: (status) => {
					return true;
				},
			})
				.then((res) => {
					disabler();
					updater();
					setBackdrop(false);
				})
				.catch((err) => {
					console.log(err);
					setBackdrop(false);
				});
		};
		updateProduct();
		cancelOrder();
		toggler();
	};
	return (
		<div>
			<Backdrop className={classes.backdrop} open={backdrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Dialog
				open={state}
				TransitionComponent={Transition}
				keepMounted
				onClose={toggler}>
				<DialogTitle>Cancel Order?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{product.product_name} ({order.items[0].quantity}) <br />
						Cancelling the order would release the number of stocks allocated
						for this order.
					</DialogContentText>
				</DialogContent>
				<DialogActions style={{ paddingBottom: 15 }}>
					<Button
						onClick={toggler}
						className={classes.btn}
						size='small'
						variant='contained'
						startIcon={<ArrowBack />}
						color='primary'>
						Cancel
					</Button>
					<Button
						onFocus={handleChange}
						onClick={handleSubmit}
						size='small'
						className={classes.btn}
						variant='contained'
						endIcon={<ArrowForward />}
						color='secondary'>
						Proceed
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export const UpdateOrderModal = ({
	state,
	toggler,
	order,
	updater,
	orderUpdater,
}) => {
	const classes = useStyles();
	const [backdrop, setBackdrop] = useState(false);
	const [originalOrder, setOriginalOrder] = useState(order);
	const [updatedOrder, setUpdatedOrder] = useState(order.items[0]);
	const handleStatusChange = (e) => {
		setUpdatedOrder({ ...updatedOrder, status: e.target.value });
	};
	const handleQuantityChange = (e) => {
		setUpdatedOrder({ ...updatedOrder, quantity: e.target.value });
	};
	const [error, setError] = useState(false);
	const handleCheck = () => {
		const newQuantity = order.items[0].quantity - updatedOrder.quantity;
		const checkStock = order.items[0].product.stock + newQuantity;
		if (checkStock < 0) {
			setError(true);
			return;
		}
		setError(false);
		setUpdatedOrder({
			...updatedOrder,
			product: { ...updatedOrder.product, stock: checkStock },
		});
	};
	const handlePreSubmit = () => {
		if (!error) {
			setOriginalOrder({ ...originalOrder, items: [updatedOrder] });
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setBackdrop(true);
		if (!error) {
			const jwt = localStorage.getItem("jwt");
			const updateStock = async () => {
				await Axios({
					method: "PUT",
					url: `products/${updatedOrder.product.id}`,
					data: updatedOrder.product,
					headers: {
						"content-type": "application/json ",
						Authorization: `Bearer ${jwt}`,
					},
					validateStatus: (status) => {
						return true;
					},
				});
			};
			const updateOrder = async () => {
				await Axios({
					method: "PUT",
					url: `orders/${originalOrder.id}`,
					data: originalOrder,
					headers: {
						"content-type": "application/json ",
						Authorization: `Bearer ${jwt}`,
					},
					validateStatus: (status) => {
						return true;
					},
				})
					.then((res) => {
						orderUpdater(originalOrder);
						updater();
						setBackdrop(false);
					})
					.catch((err) => {
						console.log(err);
						setBackdrop(false);
					});
			};
			updateStock();
			updateOrder();
			toggler();
		}
	};
	return (
		<div>
			<Backdrop className={classes.backdrop} open={backdrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Dialog
				fullWidth
				maxWidth='sm'
				open={state}
				TransitionComponent={Transition}
				keepMounted
				onClose={toggler}>
				<DialogTitle>Update Order</DialogTitle>
				<DialogContent spacing={2}>
					<TextField
						autoFocus
						value={updatedOrder.quantity}
						onChange={handleQuantityChange}
						onBlur={handleCheck}
						className={classes.formField}
						label='Quantity'
						name='quantity'
						fullWidth
						error={error}
						helperText={error ? "Insufficient Stocks" : null}
						type='number'
						variant='outlined'
						InputProps={{
							inputProps: { min: 1 },
						}}
					/>
					<FormControl
						variant='outlined'
						fullWidth
						className={classes.formField}>
						<InputLabel id='status'>Status</InputLabel>
						<Select
							onChange={handleStatusChange}
							value={updatedOrder.status}
							labelId='status'
							label='Status'>
							<MenuItem value='Reserved'>Reserved</MenuItem>
							<MenuItem value='Confirmed'>Confirmed</MenuItem>
							<MenuItem value='ToShip'>For Shipping</MenuItem>
							<MenuItem value='Fulfilled'>Fulfilled</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={toggler}
						className={classes.btn}
						variant='contained'
						size='small'
						color='primary'
						startIcon={<ArrowBack />}>
						Cancel
					</Button>
					<Button
						onFocus={handlePreSubmit}
						onClick={handleSubmit}
						className={classes.btn}
						variant='contained'
						size='small'
						color='secondary'
						endIcon={<ArrowForward />}>
						Proceed
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
