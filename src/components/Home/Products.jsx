import React, { useState } from "react";
import {
	Slide,
	makeStyles,
	Typography,
	Paper,
	Button,
	Toolbar,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import ProductItems from "./ProductItems";
import NewProduct from "./NewProduct";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(8, 2, 2, 8),
	},
	paper: {
		marginTop: theme.spacing(2),
		padding: theme.spacing(1),
		paddingBottom: theme.spacing(4),
		borderRadius: 10,
	},
	addBtn: {
		borderRadius: 20,
		textTransform: "none",
	},
	item: {
		borderRadius: 10,
		padding: theme.spacing(2),
		background: theme.palette.background.default,
	},
}));
function Products() {
	const classes = useStyles();
	const [newProduct, setNewProduct] = useState(false);
	const toggleNewProduct = () => {
		setNewProduct(!newProduct);
	};
	const [update, setUpdater] = useState(false);
	const handleUpdate = () => {
		setUpdater(!update);
	};
	return (
		<Slide in={true}>
			<div className={classes.root}>
				<Typography variant='h5'>Products</Typography>
				<Paper elevation={0} className={classes.paper}>
					<Toolbar>
						<Typography style={{ flex: 1 }} />
						<Button
							edge='end'
							variant='contained'
							color='primary'
							startIcon={<Add />}
							className={classes.addBtn}
							onClick={toggleNewProduct}>
							New Product
						</Button>
					</Toolbar>
					<ProductItems update={update} updater={handleUpdate} />
				</Paper>
				<NewProduct
					state={newProduct}
					handleClose={toggleNewProduct}
					updater={handleUpdate}
				/>
			</div>
		</Slide>
	);
}

export default Products;
