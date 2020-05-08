import React, { useState } from "react";
import {
	makeStyles,
	CardActionArea,
	CardContent,
	Typography,
	CardActions,
	Collapse,
	Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	item: {
		borderRadius: 10,
		padding: theme.spacing(2),
		background: theme.palette.background.default,
	},
}));
function ProductItem({ item }) {
	const classes = useStyles();
	const [expand, setExpand] = useState(false);
	const handleExpandClick = () => {
		setExpand(!expand);
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
				<Collapse in={expand} timeout='auto' unmountOnExit>
					<CardContent>
						<div style={{ display: "flex" }}>
							<Typography style={{ flex: 1 }}>Original Price:</Typography>
							<Typography> Php {item.original_price}.00</Typography>
						</div>
						<div style={{ display: "flex" }}>
							<Typography style={{ flex: 1 }}>Mark Up:</Typography>
							<Typography> Php {item.markup}.00</Typography>
						</div>
						<Divider />
						<div style={{ display: "flex" }}>
							<Typography style={{ flex: 1 }}>Selling Price:</Typography>
							<Typography> Php {item.final_price}.00</Typography>
						</div>
					</CardContent>
				</Collapse>
			</CardActionArea>
		</div>
	);
}

export default ProductItem;
