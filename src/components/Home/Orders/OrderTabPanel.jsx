import React from "react";
import {
	Paper,
	Toolbar,
	Typography,
	Button,
	makeStyles,
	// Chip,
} from "@material-ui/core";
import OrdersTable from "./OrdersTable";
import {
	AddCircle,
	// Whatshot,
	// Toll,
	// RadioButtonUnchecked,
	// RadioButtonChecked,
} from "@material-ui/icons";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
	underBar: {
		margin: theme.spacing(0, 2, 0, 8),
		padding: theme.spacing(1),
		borderTopLeftRadius: 0,
	},
	addBtn: {
		borderRadius: 20,
		textTransform: "none",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	toolbar: {
		[theme.breakpoints.down("sm")]: {
			display: "block",
		},
	},
	column: {
		flexBasis: "20%",
		[theme.breakpoints.down("sm")]: {
			textAlign: "right",
			margin: theme.spacing(2, 0),
		},
	},
	searchBar: {
		background: theme.palette.background.default,
		width: "100%",
		color: theme.palette.text.primary,
		borderRadius: 100,
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}));

function OrderTabPanel(props) {
	const classes = useStyles();
	const { data: orders } = useSWR("/orders");
	const { toggleNewOrder, filter } = props;
	const filteredOrders = !filter ? orders : orders?.filter(order=>order.items[0].status === filter)	
	const totalOrderCost = filteredOrders
		? filteredOrders.reduce(function (a, b) {
				a += b.items[0].product.final_price * b.items[0].quantity;
				return a;
		  }, 0)
		: 0.0;
	const expectedProfit = filteredOrders
		? filteredOrders.reduce(function (a, b) {
				a += b.items[0].product.markup * b.items[0].quantity;
				return a;
		  }, 0)
		: 0.0;


	return (
		<div>
			<Paper elevation={0} className={classes.underBar}>
				<Toolbar className={classes.toolbar}>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Total Order Cost</Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							Php { orders ? totalOrderCost.toFixed(2) : 0.00}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>
							Total Expected Profit
						</Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							Php {orders? expectedProfit.toFixed(2): 0.00}
						</Typography>
					</div>
					<div style={{ flex: 1, paddingBottom: 10 }}>
					</div>
					<Button
						onClick={toggleNewOrder}
						edge='end'
						variant='contained'
						color='primary'
						startIcon={<AddCircle />}
						className={classes.addBtn}>
						New Sales Order
					</Button>
				</Toolbar>
				{filteredOrders ? <OrdersTable orders={filteredOrders}/> : null}
			</Paper>
		</div>
	);
}

export default OrderTabPanel;
