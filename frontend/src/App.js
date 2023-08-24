import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./components/navbar.component";
import SearchPeople from "./components/search-people.component";

export default function App() {
	return (
		<Router>
			<Navbar />
			<br />
			<Routes>
				<Route path="/" element={<SearchPeople />} />
			</Routes>
		</Router>
	);
}
