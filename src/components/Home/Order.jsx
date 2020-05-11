import React, { useState } from "react";
import {
	ExpansionPanel,
	ExpansionPanelSummary,
	Typography,
	makeStyles,
	ExpansionPanelDetails,
	Chip,
	ExpansionPanelActions,
	Button,
	Slide,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";
// import UpdateOrder from "./UpdateOrder";
import { ExpandMoreRounded, FiberSmartRecordRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	column: {
		flexBasis: "33.33%",
	},
	extendedColumn: {
		flexBasis: "66.66%",
	},
	panel: {
		margin: theme.spacing(2),
		background: theme.palette.background.default,
	},
	panelSummary: {
		"& .MuiExpansionPanelSummary-content": {
			[theme.breakpoints.down("xs")]: {
				display: "block",
			},
		},
	},
	panelDetails: {
		[theme.breakpoints.down("xs")]: {
			display: "block",
		},
	},
	primaryText: {
		fontWeight: 600,
		fontSize: 18,
	},
	secondaryText: {
		fontSize: 13,
		color: theme.palette.text.secondary,
	},
	btn: {
		borderRadius: 100,
	},
	formField: {
		margin: theme.spacing(2, 0, 2, 0),
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function Order({ order, updater }) {
	const classes = useStyles();
	const [modal, setModal] = useState(false);
	const toggleModal = () => {
		setModal(!modal);
	};
	const [updateModal, setUpdateModal] = useState(false);
	const toggleUpdateModal = () => {
		setUpdateModal(!updateModal);
	};
	const toDate = (date) => {
		let newDate = new Date(date);
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return newDate.toLocaleDateString("en-US", options);
	};
	return (
		<div>
			<ExpansionPanel elevation={0} className={classes.panel}>
				<ExpansionPanelSummary
					className={classes.panelSummary}
					expandIcon={<ExpandMoreRounded />}>
					<div className={classes.column}>
						<Typography className={classes.primaryText}>
							{order.items[0].product.product_name} ({order.items[0].quantity})
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography className={classes.secondaryText}>
							{order.customer.name}
						</Typography>
					</div>
					<div className={classes.column}>
						<Chip
							size='small'
							color='primary'
							icon={<FiberSmartRecordRounded />}
							label={order.items[0].status}
						/>
					</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className={classes.panelDetails}>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Ship to : </Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							{order.customer.address}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Per Item Cost </Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							({order.items[0].quantity}) x
							{parseInt(order.items[0].product.final_price).toFixed(2)}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Total Order Cost </Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							{(
								parseInt(order.items[0].quantity) *
								parseInt(order.items[0].product.final_price)
							).toFixed(2)}
						</Typography>
					</div>
				</ExpansionPanelDetails>
				<ExpansionPanelDetails className={classes.panelDetails}>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Date Ordered: </Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							{toDate(order.createdAt)}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Capital </Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							{(
								parseInt(order.items[0].quantity) *
								parseInt(order.items[0].product.original_price)
							).toFixed(2)}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Expected Profit </Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							{(
								parseInt(order.items[0].quantity) *
								parseInt(order.items[0].product.markup)
							).toFixed(2)}
						</Typography>
					</div>
				</ExpansionPanelDetails>
				<ExpansionPanelActions>
					<Button
						size='small'
						onClick={toggleModal}
						className={classes.btn}
						variant='contained'
						color='secondary'>
						Cancel Order
					</Button>
					<div style={{ flex: 1 }} />
					<Button
						onClick={toggleUpdateModal}
						size='small'
						className={classes.btn}
						variant='contained'
						color='primary'>
						Update Order
					</Button>
				</ExpansionPanelActions>
			</ExpansionPanel>
			<Dialog
				open={modal}
				TransitionComponent={Transition}
				keepMounted
				onClose={toggleModal}>
				<DialogTitle>Cancel Order?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{order.items[0].product.product_name} ({order.items[0].quantity}){" "}
						<br />
						Cancelling the order would release the number of stocks allocated
						for this order.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={toggleModal}
						className={classes.btn}
						variant='contained'
						color='primary'>
						Cancel
					</Button>
					<Button className={classes.btn} variant='contained' color='secondary'>
						Proceed
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				fullWidth
				maxWidth='sm'
				open={updateModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={toggleUpdateModal}>
				<DialogTitle>Update Order</DialogTitle>
				<DialogContent spacing={2}>
					<TextField
						autoFocus
						value={order.items[0].quantity}
						className={classes.formField}
						label='Quantity'
						name='quantity'
						fullWidth
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
							value={order.items[0].status}
							labelId='status'
							label='Status'>
							<MenuItem value=''>
								<em>{""}</em>
							</MenuItem>
							<MenuItem value='Reserved'>Reserved</MenuItem>
							<MenuItem value='Confirmed'>Confirmed</MenuItem>
							<MenuItem value='ToShip'>For Shipping</MenuItem>
							<MenuItem value='Fulfilled'>Fulfilled</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={toggleUpdateModal}
						className={classes.btn}
						variant='contained'
						color='primary'>
						Cancel
					</Button>
					<Button className={classes.btn} variant='contained' color='secondary'>
						Proceed
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Order;
