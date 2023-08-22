import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
				<Link to="/" className="navbar-brand">
					Apollo Mock
				</Link>
				<div className="collpase navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<li className="navbar-item">
							<Link to="/" className="nav-link">
								Search People
							</Link>
						</li>
						<li className="navbar-item">
							<Link to="/savedlists" className="nav-link">
								Saved Lists
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
