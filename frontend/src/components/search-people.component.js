import { useState, useEffect } from "react";
import axios from "axios";
import PersonRow from "./person-row.component";
import FilterBar from "./filter-bar.component";
import PageNav from "./page-nav.component";

export default function SearchPeople() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [personTitles, setPersonTitles] = useState([]);
	const [orgDomains, setOrgDomains] = useState("");

	const backendEndpoint = () => {
		if (process.env.NODE_ENV === "development") {
			console.log("Dev environment");
			return "http://localhost:5000/api";
		} else if (process.env.NODE_ENV === "production") {
			return "https://apollo-mockup-backend.onrender.com/api";
		}
	};

	// render table with data from Apollo API on initial load and page change
	useEffect(() => {
		axios
			.get(backendEndpoint(), {
				params: {
					person_titles: personTitles,
					q_organization_domains: orgDomains,
					page: currentPage,
				},
			})
			.then((response) => {
				setData(response.data);
				setLoading(false);
				console.log(response.data);
			})
			.catch((error) => console.log(error));
	}, [personTitles, orgDomains, currentPage]);

	// basic loading screen while useEffect() hook is still running
	if (loading) {
		return (
			<div className="container-fluid col-11">
				<h3>Search People</h3>
				<div className="table-responsive col-lg-10 col-xs-12">
					<table className="table table-striped">
						<thead className="table-light"></thead>
					</table>
				</div>
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<div className="container-fluid col-11">
			<h3>Search People</h3>
			<div className="row">
				<FilterBar
					setPersonTitles={setPersonTitles}
					setOrgDomains={setOrgDomains}
					personTitles={personTitles}
					orgDomains={orgDomains}
					setCurrentPage={setCurrentPage}
				></FilterBar>
				<div className="table-responsive col-lg-10 col-xs-12">
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
										location={
											p.city && p.state ? p.city + ", " + p.state : "N/A"
										}
										email={p.email ? p.email : "N/A"}
									/>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			<PageNav
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				numPages={3}
			></PageNav>
		</div>
	);
}
