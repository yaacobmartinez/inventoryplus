import React, { useState, useCallback } from "react";
import Appbar from "./Appbar";
import Drawer from "./Drawer";
import AllOrders from "./AllOrders";
function Home() {
	const [component, setComponent] = useState(<AllOrders />);
	const handleComponentChange = useCallback(
		(component) => setComponent(component),
		[]
	);
	return (
		<div>
			<Appbar />
			<Drawer handleChange={handleComponentChange} />
			{component}
		</div>
	);
}

export default Home;
