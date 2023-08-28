import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
				<div className="d-flex ps-4">
					<Link to="/" className="navbar-brand">
						Apollo Mockup
					</Link>
				</div>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<li className="navbar-item">
							<Link to="/" className="nav-link">
								Search People
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
