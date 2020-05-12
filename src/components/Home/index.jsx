import React, { useState, useCallback, useEffect } from "react";
import Appbar from "./Appbar";
import Drawer from "./Drawer";
import Axios from "axios";
import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import Landing from "./Landing";
const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));
function Home() {
	const classes = useStyles();
	const [backdrop, setBackdrop] = useState(false);
	const [updater, setUpdater] = useState(false);
	const handleUpdater = () => {
		setUpdater(!updater);
	};
	const [customers, setCustomers] = useState();
	const [products, setProducts] = useState();
	const [orders, setOrders] = useState();
	useEffect(() => {
		setBackdrop(true);

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
					setCustomers(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		const getProducts = async () => {
			await Axios({
				method: "GET",
				url: "products",
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
				validateStatus: (status) => {
					return true;
				},
			})
				.then((res) => {
					setProducts(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		const getOrders = async () => {
			await Axios({
				method: "GET",
				url: "orders?_sort=createdAt:DESC",
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
				validateStatus: (status) => {
					return true;
				},
			})
				.then((res) => {
					setOrders(res.data);
					setBackdrop(false);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getCustomers();
		getProducts();
		getOrders();
	}, [updater]);

	// add use effects here and updater
	const handleComponentChange = useCallback(
		(component) => setComponent(component),
		[]
	);
	const [component, setComponent] = useState(
		<Landing handleChanger={handleComponentChange} />
	);

	return (
		<div>
			<Backdrop className={classes.backdrop} open={backdrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Appbar />

			<Drawer
				products={products}
				customers={customers}
				orders={orders}
				updater={handleUpdater}
				handleChange={handleComponentChange}
			/>
			{orders ? component : null}
		</div>
	);
}

export default Home;
