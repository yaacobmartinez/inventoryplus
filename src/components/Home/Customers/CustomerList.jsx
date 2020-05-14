import React from "react";
import { Grid, makeStyles, CircularProgress } from "@material-ui/core";
import Customer from "./Customer";
import useSWR from "swr";
const useStyles = makeStyles((theme) => ({
	item: {
		textAlign: "center",
		borderRadius: 10,
		padding: theme.spacing(2),
		background: theme.palette.background.default,
	},
	progress: {
		marginLeft: theme.spacing(4),
		color: theme.palette.text.primary,
	},
}));
function CustomerList() {
	const classes = useStyles();
	const { data: customers } = useSWR("/customers");
	return (
		<div>
			<Grid container alignItems='center' spacing={2}>
				{customers ? (
					customers?.map((customer) => (
						<Grid item xs={12} sm={4} md={2} key={customer.id}>
							<Customer customer={customer} key={customer.id} />
						</Grid>
					))
				) : (
					<CircularProgress className={classes.progress} />
				)}
			</Grid>
		</div>
	);
}

export default CustomerList;
