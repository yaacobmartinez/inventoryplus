import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Slide,
	TextField,
} from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import Axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate, trigger } from "swr";

const useStyles = makeStyles((theme) => ({
	btn: {
		borderRadius: 100,
		textTransform: "none",
	},
	formField: {
		margin: theme.spacing(2, 0, 2, 0),
	},
}));
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const jwt = localStorage.getItem("jwt");
const headers = {
	"content-type": "application/json ",
	Authorization: `Bearer ${jwt}`,
};

export const DeleteOrderModal = ({ state, toggler, order }) => {
	const classes = useStyles();
	const { data } = useSWR("/orders");
	const [product, setProduct] = useState(order.items[0].product);
	const handleChange = () => {
		setProduct({ ...product, stock: product.stock + order.items[0].quantity });
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		const cancelOrder = async () => {
			mutate(
				"/orders",
				data.filter((o) => o.id !== order.id),
				false
			);
			await Axios.all([
				Axios.put(`products/${product.id}`, product, { headers }),
				Axios.delete(`orders/${order.id}`, { headers }),
			]);
			trigger("/orders");
			trigger("/products");
		};
		cancelOrder();
		toggler();
	};
	return (
		<div>
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

export const UpdateOrderModal = ({ state, toggler, order }) => {
	const classes = useStyles();
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
	const { data } = useSWR("/orders");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!error) {
			const updateOrder = async () => {
				mutate(
					"/orders",
					data.filter((o) => o.id !== originalOrder.id)
				);
				mutate("/orders", [...data, originalOrder], false);
				await Axios.all([
					Axios.put(
						`products/${updatedOrder.product.id}`,
						updatedOrder.product,
						{ headers }
					),
					Axios.put(`orders/${originalOrder.id}`, originalOrder, { headers }),
				]);
				trigger("/orders");
				trigger("/products");
				
			};
			updateOrder();
			toggler();
		}
	};
	return (
		<div>
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
