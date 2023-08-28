import React from "react";

export default function PersonRow({ name, title, org_name, location, email }) {
	return (
		<tr>
			<td>{name}</td>
			<td>{title}</td>
			<td>{org_name}</td>
			<td>{location}</td>
			<td>{email}</td>
		</tr>
	);
}
