import React from "react";
import {
	makeStyles,
	CssBaseline,
	AppBar,
	IconButton,
	Typography,
	Toolbar,
	Menu,
	MenuItem,
	Divider,
	ListItemIcon,
	Fade
} from "@material-ui/core";
import { ArrowDropDownOutlined, AccountCircleTwoTone, ExitToAppTwoTone } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	title: {
		flexGrow: 1,
		fontWeight: 600,
		color: theme.palette.text.primary,
	},
	appBar: {
		background: theme.palette.background.paper,
		boxShadow: "none",
	},
}));
function Appbar() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		localStorage.clear()
		window.location.reload()
	}
	return (
		<div className={classes.root}>
			<CssBaseline>
				<AppBar className={classes.appBar}>
					<Toolbar variant='dense'>
						<Typography className={classes.title}>inventoryPlus</Typography>
						<IconButton edge='end' onClick={handleClick}>
							<ArrowDropDownOutlined color='inherit' />
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							TransitionComponent={Fade}
							onClose={handleClose}>
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<AccountCircleTwoTone />
								</ListItemIcon>
								My Account
							</MenuItem>
							<Divider />
							<MenuItem onClick={handleLogout}>
								<ListItemIcon>
									<ExitToAppTwoTone />
								</ListItemIcon>
								Logout
							</MenuItem>
						</Menu>
					</Toolbar>
				</AppBar>
			</CssBaseline>
		</div>
	);
}

export default Appbar;
