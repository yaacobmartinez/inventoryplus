import React from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	makeStyles,
	Tooltip,
} from "@material-ui/core";
import {
	HomeTwoTone,
	BookTwoTone,
	AllInboxTwoTone,
	AccountCircleTwoTone,
} from "@material-ui/icons";
import Landing from "./Landing";
import AllOrders from "./AllOrders";
import Products from "./Products";
import Customers from "./Customers";
const useStyles = makeStyles((theme) => ({
	drawer: {
		"& .MuiDrawer-paper": {
			zIndex: theme.zIndex.mobileStepper - 1,
			top: theme.spacing(6),
			background: theme.palette.background.paper,
			width: theme.spacing(7),
			paddingTop: theme.spacing(2),
			border: 0,
		},
	},
	listItem: {
		margin: theme.spacing(2, 0),
	},
}));
function CustomDrawer({ handleChange, products, customers, orders, updater }) {
	const classes = useStyles();
	let menuItems = [
		{
			name: "Home",
			icon: <HomeTwoTone />,
			component: <Landing />,
		},
		{
			name: "Orders",
			icon: <AllInboxTwoTone />,
			component: (
				<AllOrders
					products={products}
					customers={customers}
					orders={orders}
					updater={updater}
				/>
			),
		},
		{
			name: "Products",
			icon: <BookTwoTone />,
			component: (
				<Products products={products} customers={customers} updater={updater} />
			),
		},
		{
			name: "Customers",
			icon: <AccountCircleTwoTone />,
			component: (
				<Customers
					products={products}
					customers={customers}
					updater={updater}
				/>
			),
		},
	];
	const handleClick = (component) => (e) => {
		handleChange(component);
	};

	return (
		<div>
			<Drawer variant='permanent' elevation={0} className={classes.drawer}>
				<List>
					{menuItems.map((item) => (
						<Tooltip title={item.name} placement='right' key={item.name}>
							<ListItem
								className={classes.listItem}
								button
								onClick={handleClick(item.component)}>
								<ListItemIcon>{item.icon}</ListItemIcon>
							</ListItem>
						</Tooltip>
					))}
				</List>
			</Drawer>
		</div>
	);
}

export default CustomDrawer;
