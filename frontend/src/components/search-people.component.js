import { useState, useEffect } from "react";
import axios from "axios";
import PersonRow from "./person-row.component";

export default function SearchPeople({ numPages = 3 }) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	// array of ints from 1 to numPages e.g. [1, 2, 3, . . ., numPages]
	// default to 3 due to Apollo API limitations for free users
	const pageNumbers = Array.from(Array(numPages), (_, i) => i + 1);

	const nextPage = () => {
		if (currentPage !== numPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const backendEndpoint = () => {
		if (process.env.NODE_ENV === "development") {
			console.log("Dev environment");
			return "http://localhost:5000/api";
		} else if (process.NODE_ENV === "production") {
			console.log("Prod environment");
			return "https://apollo-mockup-backend.onrender.com/api";
		}
	};
	// render table with data from Apollo API on initial load and page change
	useEffect(() => {
		axios
			.get(backendEndpoint(), {
				params: {
					// person_titles: ["software engineer"],
					page: currentPage,
				},
			})
			.then((response) => {
				setData(response.data);
				setLoading(false);
				console.log(response.data);
			})
			.catch((error) => console.log(error));
	}, [currentPage]);

	// basic loading screen while useEffect() hook is running
	if (loading) {
		return (
			<div>
				<h3>Search People</h3>
				<table className="table table-striped">
					<thead className="table-light"></thead>
				</table>
				<div>Loading...</div>
			</div>
		);
	}

	return (
		// main table
		<div>
			<h3>Search People</h3>
			<table className="table table-striped">
				<thead className="table-light">
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Title</th>
						<th scope="col">Company</th>
						<th scope="col">Location</th>
						<th scope="col">Email</th>
					</tr>
				</thead>
				<tbody>
					{data.people.map((p) => {
						return (
							<PersonRow
								name={p.name ? p.name : "N/A"}
								title={p.title ? p.title : "N/A"}
								org_name={
									p.employment_history[0].organization_name
										? p.employment_history[0].organization_name
										: "N/A"
								}
								location={p.city && p.state ? p.city + ", " + p.state : "N/A"}
								email={p.email ? p.email : "N/A"}
							/>
						);
					})}
				</tbody>
			</table>
			{/* page navbar */}
			<nav>
				<ul className="pagination justify-content-center">
					<li className="page-item">
						<a
							className="page-link"
							href="/#"
							aria-label="Previous"
							onClick={prevPage}
						>
							<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					{pageNumbers.map((pageNum) => {
						return (
							<li
								key={pageNum}
								className={`page-item ${
									currentPage === pageNum ? "active" : ""
								}`}
							>
								<a
									className="page-link"
									href="/#"
									onClick={() => {
										setCurrentPage(pageNum);
									}}
								>
									{pageNum}
								</a>
							</li>
						);
					})}
					<li className="page-item">
						<a
							className="page-link"
							href="/#"
							aria-label="Next"
							onClick={nextPage}
						>
							<span aria-hidden="true">&raquo;</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
}
