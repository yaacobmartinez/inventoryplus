import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	makeStyles,
	Tooltip,
} from "@material-ui/core";
import {
	AccountCircleTwoTone,
	AllInboxTwoTone,
	BookTwoTone,
	HomeTwoTone,
} from "@material-ui/icons";
import React from "react";
import AllOrders from "./Orders/AllOrders";
import Customers from "./Customers/Customers";
import Landing from "./Landing";
import Products from "./Products/Products";

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
function CustomDrawer({ handleChange }) {
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
			component: <AllOrders />,
		},
		{
			name: "Products",
			icon: <BookTwoTone />,
			component: <Products />,
		},
		{
			name: "Customers",
			icon: <AccountCircleTwoTone />,
			component: <Customers />,
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
