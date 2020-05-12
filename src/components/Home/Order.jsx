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
} from "@material-ui/core";
// import UpdateOrder from "./UpdateOrder";
import {
	ExpandMoreRounded,
	FiberSmartRecordRounded,
	Update,
	Cancel,
} from "@material-ui/icons";
import { DeleteOrderModal, UpdateOrderModal } from "./UpdateOrderModals";

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
		textTransform: "none",
	},
	formField: {
		margin: theme.spacing(2, 0, 2, 0),
	},
}));

function Order({ order, updater }) {
	const classes = useStyles();
	const [currentOrder, setCurrentOrder] = useState(order);
	const [modal, setModal] = useState(false);
	const toggleModal = () => {
		setModal(!modal);
	};
	const orderUpdater = (order) => {
		setCurrentOrder(order);
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
	const [disable, setDisabled] = useState(false);
	const disabler = () => {
		setDisabled(true);
	};

	return (
		<div>
			<ExpansionPanel hidden={disable} elevation={0} className={classes.panel}>
				<ExpansionPanelSummary
					className={classes.panelSummary}
					expandIcon={<ExpandMoreRounded />}>
					<div className={classes.column}>
						<Typography className={classes.primaryText}>
							{currentOrder.items[0].product.product_name} (
							{currentOrder.items[0].quantity})
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography className={classes.secondaryText}>
							{currentOrder.customer.name}
						</Typography>
					</div>
					<div className={classes.column}>
						<Chip
							size='small'
							color='primary'
							icon={<FiberSmartRecordRounded />}
							label={currentOrder.items[0].status}
						/>
					</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className={classes.panelDetails}>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Ship to : </Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							{currentOrder.customer.address}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Per Item Cost </Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							({currentOrder.items[0].quantity}) x
							{parseInt(currentOrder.items[0].product.final_price).toFixed(2)}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Total Order Cost </Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							{(
								parseInt(currentOrder.items[0].quantity) *
								parseInt(currentOrder.items[0].product.final_price)
							).toFixed(2)}
						</Typography>
					</div>
				</ExpansionPanelDetails>
				<ExpansionPanelDetails className={classes.panelDetails}>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Date Ordered: </Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							{toDate(currentOrder.createdAt)}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Capital </Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							{(
								parseInt(currentOrder.items[0].quantity) *
								parseInt(currentOrder.items[0].product.original_price)
							).toFixed(2)}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Expected Profit </Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							{(
								parseInt(currentOrder.items[0].quantity) *
								parseInt(currentOrder.items[0].product.markup)
							).toFixed(2)}
						</Typography>
					</div>
				</ExpansionPanelDetails>
				{currentOrder.items[0].status !== "Fulfilled" && (
					<ExpansionPanelActions>
						<Button
							size='small'
							onClick={toggleModal}
							className={classes.btn}
							variant='contained'
							startIcon={<Cancel />}
							color='secondary'>
							Cancel Order
						</Button>
						<div style={{ flex: 1 }} />
						<Button
							onClick={toggleUpdateModal}
							size='small'
							className={classes.btn}
							variant='contained'
							color='primary'
							startIcon={<Update />}>
							Update Order
						</Button>
					</ExpansionPanelActions>
				)}
			</ExpansionPanel>

			<DeleteOrderModal
				state={modal}
				toggler={toggleModal}
				order={currentOrder}
				disabler={disabler}
				updater={updater}
			/>
			<UpdateOrderModal
				state={updateModal}
				toggler={toggleUpdateModal}
				order={currentOrder}
				updater={updater}
				orderUpdater={orderUpdater}
			/>
		</div>
	);
}

export default Order;
