import { useState } from "react";
import "./App.css";

import img from "./assets/underconstruction.png";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<img src={img} alt="" />
		</div>
	);
}

export default App;
