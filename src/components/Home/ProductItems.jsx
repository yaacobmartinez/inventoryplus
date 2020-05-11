import React from "react";
import { makeStyles, Grid, CircularProgress } from "@material-ui/core";
import ProductItem from "./ProductItem";
const useStyles = makeStyles((theme) => ({
	item: {
		borderRadius: 10,
		padding: theme.spacing(2),
		background: theme.palette.background.default,
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	progress: {
		marginLeft: theme.spacing(4),
		color: theme.palette.text.primary,
	},
}));
const ProductItems = ({ products, updater }) => {
	const classes = useStyles();
	return (
		<div>
			<Grid container alignItems='center' spacing={2}>
				{products ? (
					products.map((item) => (
						<Grid item xs={12} sm={6} md={4} key={item._id}>
							<ProductItem item={item} updater={updater} />
						</Grid>
					))
				) : (
					<CircularProgress className={classes.progress} />
				)}
			</Grid>
		</div>
	);
};

export default React.memo(ProductItems);
