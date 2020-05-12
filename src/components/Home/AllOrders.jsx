import React, { useState } from "react";
import { Tabs, Tab, makeStyles, Slide } from "@material-ui/core";
import {
	ListTwoTone,
	PostAddTwoTone,
	LibraryAddCheckTwoTone,
	LocalShippingTwoTone,
	DoneAllTwoTone,
} from "@material-ui/icons";
import OrderTabPanel from "./OrderTabPanel";
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

	const confirmed = orders.filter((order) => {
		return order.items[0].status === "Confirmed";
	});
	const reserved = orders.filter((order) => {
		return order.items[0].status === "Reserved";
	});
	const shipping = orders.filter((order) => {
		return order.items[0].status === "ToShip";
	});
	const fulfilled = orders.filter((order) => {
		return order.items[0].status === "Fulfilled";
	});

	const tabPanelProps = {
		toggleNewOrder: toggleNewOrder,
		updater: updater,
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
				<TabPanel value={value} index={0}>
					<OrderTabPanel orders={orders} {...tabPanelProps} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<OrderTabPanel orders={reserved} {...tabPanelProps} />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<OrderTabPanel orders={confirmed} {...tabPanelProps} />
				</TabPanel>
				<TabPanel value={value} index={3}>
					<OrderTabPanel orders={shipping} {...tabPanelProps} />
				</TabPanel>
				<TabPanel value={value} index={4}>
					<OrderTabPanel orders={fulfilled} {...tabPanelProps} />
				</TabPanel>
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

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div role='tabpanel' hidden={value !== index} {...other}>
			{value === index && children}
		</div>
	);
}

export default AllOrders;
