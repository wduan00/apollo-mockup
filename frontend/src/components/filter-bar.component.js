import { useState } from "react";

export default function FilterBar({
	setPersonTitles,
	setOrgDomains,
	personTitles,
	orgDomains,
	setCurrentPage,
}) {
	const [personTitle, setPersonTitle] = useState("");
	const [orgDomain, setOrgDomain] = useState(""); // local to filter bar, this is just what is shown while typing

	// rerender screen to show what is being typed
	function handleJobTitleChange(e) {
		e.preventDefault();
		setPersonTitle(e.target.value);
	}

	function handleEmployerChange(e) {
		e.preventDefault();
		setOrgDomain(e.target.value);
	}

	// use setPersonTitles function passed from parent, which will trigger rerender of main table
	function handleJobTitleSubmit(e) {
		e.preventDefault();
		if (
			e.target.titleSearch.value &&
			!personTitles.includes(e.target.titleSearch.value)
		) {
			const newTitles = personTitles.concat([e.target.titleSearch.value]);
			setPersonTitles(newTitles);
			console.log("New title arr: ", newTitles);
		}
		if (
			e.target.employerSearch.value &&
			!orgDomains.includes(e.target.employerSearch.value)
		) {
			const newOrgString = orgDomains
				? orgDomains + "\n" + e.target.employerSearch.value
				: e.target.employerSearch.value;
			setOrgDomains(newOrgString);
			console.log("New employer str: ", newOrgString);
		}
	}

	function resetFilters(e) {
		e.preventDefault();
		setPersonTitle("");
		setOrgDomain("");
		setPersonTitles([]);
		setOrgDomains("");
		setCurrentPage(1);
	}

	return (
		<div className="col-lg-2 col-xs-12 bg-light p-3 border">
			<h4>Filters</h4>
			<form onSubmit={handleJobTitleSubmit}>
				<div className="form-group mb-3">
					<label for="titleSearch">Job titles:</label>
					<input
						className="form-control mb-1"
						id="titleSearch"
						value={personTitle}
						placeholder="'software engineer'"
						onChange={handleJobTitleChange}
					></input>
					<input type="submit" value="Enter"></input>
				</div>
				<div className="form-group mb-3">
					<label for="employerSearch">Company domains:</label>
					<input
						className="form-control mb-1"
						id="employerSearch"
						value={orgDomain}
						placeholder="'google.com'"
						onChange={handleEmployerChange}
					></input>
					<input type="submit" value="Enter"></input>
				</div>
				<div className="form-group justify-content-right">
					<input type="reset" value="Reset All" onClick={resetFilters}></input>
				</div>
			</form>
		</div>
	);
}
