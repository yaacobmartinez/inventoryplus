import React, { useState } from "react";
import {
	Paper,
	Toolbar,
	Typography,
	Button,
	makeStyles,
	Chip,
} from "@material-ui/core";
import OrdersTable from "./OrdersTable";
import {
	AddCircle,
	Whatshot,
	Toll,
	RadioButtonUnchecked,
	RadioButtonChecked,
} from "@material-ui/icons";

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
	const { orders, toggleNewOrder, updater } = props;
	const [currentOrders, setCurrentOrders] = useState(orders);
	const totalOrderCost = orders.reduce(function (a, b) {
		a += b.items[0].product.final_price * b.items[0].quantity;
		return a;
	}, 0);
	const expectedProfit = currentOrders.reduce(function (a, b) {
		a += b.items[0].product.markup * b.items[0].quantity;
		return a;
	}, 0);
	const today = currentOrders.filter((order) => {
		const dateToday = new Date();
		const orderDate = new Date(order.createdAt);
		const dT = dateToday.getMonth() + "" + dateToday.getDate();
		const oD = orderDate.getMonth() + "" + orderDate.getDate();
		return oD === dT;
	});
	const month = currentOrders.filter((order) => {
		const dateToday = new Date();
		const orderDate = new Date(order.createdAt);
		const dT = dateToday.getMonth();
		const oD = orderDate.getMonth();
		return oD === dT;
	});
	const classes = useStyles();
	const [selectedTag, setSelectedTag] = useState("all");
	const handleTagChange = (tag) => (e) => {
		setSelectedTag(tag);
		if (tag === "all") {
			setCurrentOrders(orders);
			return;
		}
		if (tag === "today") {
			setCurrentOrders(today);
			return;
		}
		if (tag === "month") {
			setCurrentOrders(month);
			return;
		}
	};

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
					<div style={{ flex: 1, paddingBottom: 10 }}>
						<Chip
							label='All'
							className={classes.chip}
							onClick={handleTagChange("all")}
							color={selectedTag === "all" ? "primary" : "default"}
							icon={<Whatshot />}
						/>
						<Chip
							label='Today'
							onClick={handleTagChange("today")}
							color={selectedTag === "today" ? "primary" : "default"}
							className={classes.chip}
							icon={<Toll />}
						/>
						<Chip
							label='This Week'
							className={classes.chip}
							onClick={handleTagChange("week")}
							color={selectedTag === "week" ? "primary" : "default"}
							icon={<RadioButtonUnchecked />}
						/>
						<Chip
							label='This Month'
							className={classes.chip}
							onClick={handleTagChange("month")}
							color={selectedTag === "month" ? "primary" : "default"}
							icon={<RadioButtonChecked />}
						/>
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
				<OrdersTable updater={updater} orders={currentOrders} />
			</Paper>
		</div>
	);
}

export default OrderTabPanel;
