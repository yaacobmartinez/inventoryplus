import React from "react";
import Order from "./Order";
function OrdersTable({ updater, orders }) {
	return (
		<div>
			{orders.map((order) => (
				<Order order={order} key={order._id} />
			))}
		</div>
	);
}

export default OrdersTable;
