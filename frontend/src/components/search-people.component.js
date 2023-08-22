import { useState, useEffect } from "react";
import PersonRow from "./person-row.component";
import axios from "axios";

// const data = axios.get("http://localhost:5000/api/");

export default function SearchPeople() {
	const [data, setData] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api")
			.then((response) => {
				setData(response.data);
				console.log(response.data);
			})
			.catch((error) => console.log(error));
	}, []);

	if (!data) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h3>Search People:</h3>
			<table class="table">
				<thead className="thead-light">
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
								name={p.name}
								title={p.title}
								org_name={p.employment_history[0].organization_name}
								city={p.city}
								state={p.state}
								email={p.email}
							/>
						);
					})}
					{/* <td>{data.people["name"]}</td> */}
				</tbody>
			</table>
		</div>
	);
}
