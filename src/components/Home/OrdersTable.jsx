import React, { useEffect, useState } from "react";
import Order from "./Order";
function OrdersTable({ updater, orders }) {
	const [allOrders, setAllOrders] = useState(orders);
	useEffect(() => {
		setAllOrders(orders);
	}, [orders]);

	return (
		<div>
			{allOrders.map((order) => (
				<Order order={order} updater={updater} key={order._id} />
			))}
		</div>
	);
}

export default OrdersTable;
