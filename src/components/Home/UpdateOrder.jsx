import React, { useState } from "react";
import {
	makeStyles,
	Backdrop,
	CircularProgress,
	Drawer,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Divider,
	Grid,
	InputBase,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
	modalTitle: {
		flex: 1,
		color: theme.palette.text.primary,
		fontWeight: 600,
	},
	modal: {
		width: 600,
		padding: theme.spacing(4),
		[theme.breakpoints.down("xs")]: {
			width: 360,
		},
	},
	title: {
		fontSize: 30,
		fontWeight: 500,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));
function UpdateOrder({ order, state, toggleState, updater }) {
	const classes = useStyles();
	const [backdrop, setBackdrop] = useState(false);
	const [values, setValues] = useState(order);
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e);
	};
	return (
		<div>
			<Backdrop className={classes.backdrop} open={backdrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Drawer anchor='right' open={state} onClose={toggleState}>
				<AppBar
					position='static'
					style={{ background: "transparent", boxShadow: "none" }}>
					<Toolbar variant='dense'>
						<Typography className={classes.modalTitle}>
							Update product details
						</Typography>
						<IconButton onClick={toggleState}>
							<Close />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Divider />
				<div className={classes.modal}>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<InputBase
									name='product_name'
									inputProps={{ readOnly: true }}
									className={classes.title}
									value={values.items[0].product.product_name}
								/>
							</Grid>
						</Grid>
					</form>
				</div>
			</Drawer>
		</div>
	);
}

export default UpdateOrder;
