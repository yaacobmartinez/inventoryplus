import React, { useState, useEffect } from "react";
import { Grid, makeStyles, CircularProgress } from "@material-ui/core";
import Axios from "axios";
import Customer from "./Customer";
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
function CustomerList({ update, updater }) {
	const classes = useStyles();
	const [customers, setCustomers] = useState();
	useEffect(() => {
		const jwt = localStorage.getItem("jwt");
		const getCustomers = async () => {
			await Axios({
				method: "GET",
				url: "customers",
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
				validateStatus: (status) => {
					return true;
				},
			})
				.then((res) => {
					if (res.status === 403) {
						localStorage.clear();
						window.location.reload();
						return;
					}
					setCustomers(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getCustomers();
	}, [update]);
	return (
		<div>
			<Grid container alignItems='center' spacing={2}>
				{customers ? (
					customers.map((customer) => (
						<Grid item xs={12} sm={4} md={2} key={customer.id}>
							<Customer customer={customer} updater={updater} />
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
