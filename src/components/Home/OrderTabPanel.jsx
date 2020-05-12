import React from "react";
import {
	Paper,
	Toolbar,
	Typography,
	Button,
	makeStyles,
} from "@material-ui/core";
import OrdersTable from "./OrdersTable";
import { AddCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	underBar: {
		margin: theme.spacing(0, 2, 0, 8),
		padding: theme.spacing(1),
		borderTopLeftRadius: 0,
	},
	addBtn: {
		borderRadius: 20,
		textTransform: "none",
		[theme.breakpoints.down("xs")]: {
			width: "100%",
		},
	},
	toolbar: {
		[theme.breakpoints.down("xs")]: {
			display: "block",
		},
	},
	column: {
		flexBasis: "33.33%",
		[theme.breakpoints.down("xs")]: {
			textAlign: "right",
			margin: theme.spacing(2, 0),
		},
	},
}));

function OrderTabPanel(props) {
	const { orders, toggleNewOrder, updater } = props;
	const totalOrderCost = orders.reduce(function (a, b) {
		a += b.items[0].product.final_price * b.items[0].quantity;
		return a;
	}, 0);
	const expectedProfit = orders.reduce(function (a, b) {
		a += b.items[0].product.markup * b.items[0].quantity;
		return a;
	}, 0);
	const classes = useStyles();
	return (
		<div>
			<Paper elevation={0} className={classes.underBar}>
				<Toolbar className={classes.toolbar}>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>Total Order Cost</Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							Php {totalOrderCost.toFixed(2)}
						</Typography>
					</div>
					<div className={classes.column}>
						<Typography style={{ fontSize: 13 }}>
							Total Expected Profit
						</Typography>
						<Typography style={{ fontSize: 15, fontWeight: 600 }}>
							Php {expectedProfit.toFixed(2)}
						</Typography>
					</div>
					<div style={{ flex: 1 }} />
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
				<OrdersTable updater={updater} orders={orders} />
			</Paper>
		</div>
	);
}

export default OrderTabPanel;
