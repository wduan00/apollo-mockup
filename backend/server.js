const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const apolloURI = process.env.APOLLO_URI;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
	console.log(`Apollo app is running on port ${port}`);
	console.log(apolloURI);
});

// route handling
app.get("/api", async (req, res) => {
	try {
		const response = await axios.post(apolloURI, {
			api_key: process.env.APOLLO_API_KEY,
			person_titles: req.query?.person_titles,
			q_organizion_domains: req.query?.q_organizion_domains,
			page: req.query?.page,
		});
		console.log("Apollo API call success");
		res.status(200).send(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
});
