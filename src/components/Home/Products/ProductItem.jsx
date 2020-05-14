import React, { useState } from "react";
import {
	makeStyles,
	CardActionArea,
	CardContent,
	Typography,
	CardActions,
} from "@material-ui/core";
import UpdateProduct from "./UpdateProduct";

const useStyles = makeStyles((theme) => ({
	item: {
		borderRadius: 10,
		padding: theme.spacing(2),
		background: theme.palette.background.default,
	},
}));
function ProductItem({ item, updater }) {
	const classes = useStyles();
	const [expand, setExpand] = useState(false);
	const handleExpandClick = (e) => {
		setExpand(true);
	};
	const handleClose = () => {
		setExpand(false);
	};
	return (
		<div>
			<CardActionArea className={classes.item} onClick={handleExpandClick}>
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{item.product_name}
					</Typography>
				</CardContent>
				<CardActions>
					<div style={{ flex: 1 }}></div>
					<Typography>Remaining Stocks: {item.stock}</Typography>
				</CardActions>
			</CardActionArea>
			<UpdateProduct
				item={item}
				state={expand}
				toggleState={handleClose}
				updater={updater}
			/>
		</div>
	);
}

export default ProductItem;
