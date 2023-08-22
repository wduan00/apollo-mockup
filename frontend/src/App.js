// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./components/navbar.component";
import SearchPeople from "./components/search-people.component";
import SavedLists from "./components/saved-lists.component";

export default function App() {
	return (
		<Router>
			<div className="container">
				<Navbar />
				<br />
				<Routes>
					<Route path="/" element={<SearchPeople />} />
					<Route path="/savedlists" element={<SavedLists />} />
				</Routes>
			</div>
		</Router>
	);
}
