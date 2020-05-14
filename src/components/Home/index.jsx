import React, { useState, useCallback } from "react";
import Appbar from "./Appbar";
import Drawer from "./Drawer";
import Landing from "./Landing";
function Home() {
	const handleComponentChange = useCallback(
		(component) => setComponent(component),
		[]
	);
	const [component, setComponent] = useState(
		<Landing handleChanger={handleComponentChange} />
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
