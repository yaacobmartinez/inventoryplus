import React, { useState } from "react";
import {
	Tabs,
	Tab,
	makeStyles,
	Paper,
	Toolbar,
	Button,
	Slide,
} from "@material-ui/core";
import {
	ListTwoTone,
	PostAddTwoTone,
	LibraryAddCheckTwoTone,
	LocalShippingTwoTone,
	DoneAllTwoTone,
	Add,
} from "@material-ui/icons";
import OrdersTable from "./OrdersTable";
import NewOrder from "./NewOrder";

const useStyles = makeStyles((theme) => ({
	tabs: {
		margin: theme.spacing(8, 2, 0, 8),
		flexDirection: "row",
		background: theme.palette.background.default,
		"& .Mui-selected": {
			background: theme.palette.background.paper,
			borderTopRightRadius: 10,
			borderTopLeftRadius: 10,
		},
	},
	tab: {
		textTransform: "none",
		color: theme.palette.text.primary,
	},
	tabIcon: {
		verticalAlign: "middle",
		marginRight: theme.spacing(2),
	},
	underBar: {
		margin: theme.spacing(0, 2, 0, 8),
		padding: theme.spacing(1),
		borderTopLeftRadius: 0,
	},
	addBtn: {
		borderRadius: 20,
		textTransform: "none",
	},
	tableHeader: { background: theme.palette.background.default },
	tableHeaderCell: { fontWeight: 600 },
}));
function AllOrders({ customers, products, orders, updater }) {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [newOrder, setNewOrder] = useState(false);
	const toggleNewOrder = () => {
		setNewOrder(!newOrder);
	};
	return (
		<Slide in={true}>
			<div>
				<Tabs
					value={value}
					className={classes.tabs}
					variant='scrollable'
					onChange={handleChange}
					TabIndicatorProps={{ style: { background: "transparent" } }}>
					<Tab
						className={classes.tab}
						label={
							<div>
								<ListTwoTone className={classes.tabIcon} /> All Orders
							</div>
						}
					/>
					<Tab
						className={classes.tab}
						label={
							<div>
								<PostAddTwoTone className={classes.tabIcon} />
								Reserved
							</div>
						}
					/>
					<Tab
						className={classes.tab}
						label={
							<div>
								<LibraryAddCheckTwoTone className={classes.tabIcon} />
								Confirmed
							</div>
						}
					/>
					<Tab
						className={classes.tab}
						label={
							<div>
								<LocalShippingTwoTone className={classes.tabIcon} />
								Shipping
							</div>
						}
					/>
					<Tab
						className={classes.tab}
						label={
							<div>
								<DoneAllTwoTone className={classes.tabIcon} />
								Fulfilled
							</div>
						}
					/>
				</Tabs>
				<Paper elevation={0} className={classes.underBar}>
					<Toolbar>
						<div style={{ flex: 1 }}></div>
						<Button
							onClick={toggleNewOrder}
							edge='end'
							variant='contained'
							color='primary'
							startIcon={<Add />}
							className={classes.addBtn}>
							New Sales Order
						</Button>
					</Toolbar>
					<OrdersTable updater={updater} orders={orders} />
				</Paper>
				{customers && products ? (
					<NewOrder
						state={newOrder}
						handleClose={toggleNewOrder}
						updater={updater}
						customers={customers}
						products={products}
					/>
				) : null}
			</div>
		</Slide>
	);
}

export default AllOrders;
