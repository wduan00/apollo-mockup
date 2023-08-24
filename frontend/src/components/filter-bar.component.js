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
	const [currTitleFilters, setCurrTitleFilters] = useState([]);
	const [currOrgFilters, setCurrOrgFilters] = useState([]);

	// handlers to rerender screen to show what is being typed
	function handleJobTitleChange(e) {
		e.preventDefault();
		setPersonTitle(e.target.value);
	}

	function handleEmployerChange(e) {
		e.preventDefault();
		setOrgDomain(e.target.value);
	}

	// use setPersonTitles function passed from parent, which will trigger rerender of main table
	function handleFilterSubmit(e) {
		e.preventDefault();
		if (
			e.target.titleSearch.value &&
			!personTitles.includes(e.target.titleSearch.value)
		) {
			const newTitles = personTitles.concat([e.target.titleSearch.value]);
			setPersonTitles(newTitles);
			setCurrTitleFilters(
				currTitleFilters.concat([e.target.titleSearch.value])
			);
			setPersonTitle("");
			setCurrentPage(1);
		}
		if (
			e.target.employerSearch.value &&
			!orgDomains.includes(e.target.employerSearch.value)
		) {
			const newOrgString = orgDomains
				? orgDomains + "\n" + e.target.employerSearch.value
				: e.target.employerSearch.value;
			setOrgDomains(newOrgString);
			setCurrOrgFilters(currOrgFilters.concat([e.target.employerSearch.value]));
			setOrgDomain("");
			setCurrentPage(1);
		}
	}

	function resetFilters(e) {
		e.preventDefault();
		setPersonTitle("");
		setOrgDomain("");
		setPersonTitles([]);
		setOrgDomains("");
		setCurrentPage(1);
		setCurrTitleFilters([]);
		setCurrOrgFilters([]);
	}

	return (
		<div className="col-lg-2 col-xs-12 bg-light p-3 border">
			<h4>Filters</h4>
			<form onSubmit={handleFilterSubmit}>
				<div className="form-group mb-3">
					<label for="titleSearch">Title:</label>
					<input
						className="form-control mb-1"
						id="titleSearch"
						value={personTitle}
						placeholder="e.g. software engineer"
						onChange={handleJobTitleChange}
					></input>
					<input type="submit" value="Enter"></input>
				</div>
				<div className="form-group mb-3">
					<label for="employerSearch">Company domain:</label>
					<input
						className="form-control mb-1"
						id="employerSearch"
						value={orgDomain}
						placeholder="e.g. google.com"
						onChange={handleEmployerChange}
					></input>
					<input type="submit" value="Enter"></input>
				</div>
			</form>
			<div className="mt-3 mb-1">
				<h5>Applied Filters</h5>
				<h6>Titles:</h6>
				<ul className="list-group mb-3">
					{currTitleFilters.map((f) => {
						return <li className="list-group-item">{f}</li>;
					})}
				</ul>
				<h6>Company domains:</h6>
				<ul className="list-group mb-3">
					{currOrgFilters.map((f) => {
						return <li className="list-group-item">{f}</li>;
					})}
				</ul>
			</div>
			<div className="form-group justify-content-right">
				<input type="reset" value="Reset All" onClick={resetFilters}></input>
			</div>
		</div>
	);
}
