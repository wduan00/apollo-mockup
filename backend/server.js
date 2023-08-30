const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const apolloURI = process.env.APOLLO_URI;

let filterList = [];
// filterList is a list of the following struct:
// {
// 	"name": "List 1"
// 	"all_other_filters": [],
// 	"companies": []
// }

// all_other_filters is a list of the following struct:
// const all_other_filters = {
// 	"titles": []
// 	.
//  .
//  .
// }

app.use(cors());
app.use(express.json());

app.listen(port, () => {
	console.log(`Apollo app is running on port ${port}`);
});

// route handling
app.get("/api", async (req, res) => {
	try {
		const response = await axios.post(apolloURI, {
			api_key: process.env.APOLLO_API_KEY,
			person_titles: req.query?.person_titles,
			q_organization_domains: req.query?.q_organization_domains,
			page: req.query?.page,
		});
		console.log("Apollo API call success");
		res.status(200).send(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error: " + error.message });
	}
});

app.get("/searches", async (req, res) => {
	try {
		res.send({ filterList: filterList });
	} catch {
		res.status(500).json({ message: "Error: " + error.message });
	}
});

app.post("/searches", async (req, res) => {
	try {
		filterList.push({
			name: req.body.name,
			all_other_filters: req.body.all_other_filters,
			companies: req.body.companies,
		});
		console.log(req.body);
		console.log(filterList);
		res.status(200).send("Filter lists updated");
	} catch (error) {
		res.status(500).json({ message: "Error: " + error.message });
	}
});

app.delete("/searches", async (req, res) => {
	try {
		filterList = [];
		res.status(200).send("Filter lists cleared");
	} catch (error) {
		res.status(500).json({ message: "Error: " + error.message });
	}
});
