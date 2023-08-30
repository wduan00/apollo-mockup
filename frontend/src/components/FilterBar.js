import { useEffect, useState } from "react";
import axios from "axios";

export default function FilterBar({
	setPersonTitles,
	setOrgDomains,
	personTitles,
	orgDomains,
	setCurrentPage,
}) {
	// strings to reflect current value in each text box
	const [personTitle, setPersonTitle] = useState("");
	const [orgDomain, setOrgDomain] = useState("");

	// lists to display currently applied filters
	const [currTitleFilters, setCurrTitleFilters] = useState([]);
	const [currOrgFilters, setCurrOrgFilters] = useState([]);

	// fields to create a list
	const [listName, setListName] = useState("");
	const [allOtherFilters, setAllOtherFilters] = useState({ titles: [] });
	const [companies, setCompanies] = useState([]);

	// data from GET request
	const [listData, setListData] = useState([]);
	const [selectedList, setSelectedList] = useState("");

	// GET saved filter lists from the backend
	useEffect(() => {
		axios
			.get("http://localhost:5000/searches")
			.then((response) => {
				setListData(response.data.filterList);
				console.log("GET request sent");
			})
			.catch((error) => console.log("Error: ", error));
	}, []);

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
				// currTitleFilters.concat([e.target.titleSearch.value])
				newTitles
			);
			setAllOtherFilters({
				titles: newTitles,
			});
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
			setCompanies(companies.concat([e.target.employerSearch.value]));
			setOrgDomain("");
			setCurrentPage(1);
		}
	}

	// Applies filters that correspond to the selected filter list
	function handleListChange(e) {
		setSelectedList(e.target.value);
		setCurrOrgFilters([]);
		if (e.target.value === "Select...") {
			setOrgDomains("");
			setCurrOrgFilters([]);
			setPersonTitles([]);
			setCurrTitleFilters([]);
		}
		listData.forEach((f) => {
			if (f.name === e.target.value) {
				if (f.companies.length !== 0) {
					const companyStr = f.companies[0];
					f.companies.forEach((c) => {
						companyStr.concat("\n" + c);
						setCurrOrgFilters(currOrgFilters.concat([c]));
					});
					setOrgDomains(companyStr);
				} else {
					setOrgDomains("");
				}
				setPersonTitles(f.all_other_filters.titles);
				setCurrTitleFilters(f.all_other_filters.titles);
			}
		});
	}

	// POSTs current filters and name to save list
	function handleSaveSearch(e) {
		e.preventDefault();
		console.log("post to backend triggered");
		axios
			.post("http://localhost:5000/searches", {
				name: listName,
				all_other_filters: allOtherFilters,
				companies: companies,
			})
			.catch((error) => console.log("Error: ", error));
		setListData(
			listData.concat([
				{
					name: listName,
					all_other_filters: allOtherFilters,
					companies: companies,
				},
			])
		);
		setListName("");
	}

	function handleClearLists(e) {
		e.preventDefault();
		axios
			.delete("http://localhost:5000/searches")
			.catch((error) => console.log("Error: ", error));
		setListData([]);
	}

	// Clears all fields, rerenders main table to no filters, page 1
	function handleResetFilters(e) {
		e.preventDefault();
		setPersonTitle("");
		setOrgDomain("");
		setPersonTitles([]);
		setOrgDomains("");
		setCurrentPage(1);
		setCurrTitleFilters([]);
		setCurrOrgFilters([]);
		setSelectedList("Select...");
	}

	return (
		<div className="col-lg-2 col-xs-12 bg-light p-3 border">
			<h4>Filters</h4>
			<form onSubmit={handleFilterSubmit}>
				<div className="form-group mb-1">
					<label for="titleSearch">Title:</label>
					<input
						className="form-control mb-1"
						id="titleSearch"
						value={personTitle}
						placeholder="e.g. software engineer"
						onChange={handleJobTitleChange}
					></input>
				</div>
				<div className="form-group mb-1">
					<label for="employerSearch">Company domain:</label>
					<input
						className="form-control mb-2"
						id="employerSearch"
						value={orgDomain}
						placeholder="e.g. google.com"
						onChange={handleEmployerChange}
					></input>
					<div className="d-flex justify-content-end">
						<input type="submit" value="Enter"></input>
					</div>
				</div>
			</form>
			<div className="mt-3 mb-1">
				<h5 className="mb-2">Applied Filters</h5>
				<h6 className="mb-1">Titles:</h6>
				<ul className="list-group mb-2">
					{currTitleFilters.map((f) => {
						return <li className="list-group-item">{f}</li>;
					})}
				</ul>
				<h6>Company domains:</h6>
				<ul className="list-group mb-2">
					{currOrgFilters.map((f) => {
						return <li className="list-group-item">{f}</li>;
					})}
				</ul>
			</div>
			<div className="d-flex justify-content-end mb-3">
				<input
					type="reset"
					value="Reset All"
					onClick={handleResetFilters}
				></input>
			</div>
			<form onSubmit={handleSaveSearch}>
				<label for="searchName">Save Search:</label>
				<input
					className="form-control mb-2"
					id="searchName"
					type="text"
					placeholder="List name"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					required
				></input>
				<div className="d-flex justify-content-end">
					<input type="submit" value="Save"></input>
				</div>
			</form>
			<div class="dropdown mb-2">
				<label for="savedSearches">Saved Searches</label>
				<br></br>
				<select
					value={selectedList}
					onChange={handleListChange}
					name="Saved Searches"
					id="savedSearches"
				>
					<option>Select...</option>
					{listData.map((f) => {
						return <option>{f.name}</option>;
					})}
				</select>
			</div>
			<div className="d-flex justify-content-end mb-3">
				<input
					type="reset"
					value="Clear Saved Searches"
					onClick={handleClearLists}
				></input>
			</div>
		</div>
	);
}
