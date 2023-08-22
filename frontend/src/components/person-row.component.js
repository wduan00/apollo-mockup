import React from "react";

export default function PersonRow({
	name,
	title,
	org_name,
	city,
	state,
	email,
}) {
	return (
		<tr>
			<td>{name}</td>
			<td>{title}</td>
			<td>{org_name}</td>
			<td>{city + ", " + state}</td>
			<td>{email}</td>
		</tr>
	);
}
