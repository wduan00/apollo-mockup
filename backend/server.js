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

const uri = process.env.MONGO_URI;
// open MongoDB connection prior to running the server
mongoose
	.connect(uri)
	.then(() => {
		// only run app if DB is connected
		app.listen(port, () => {
			console.log("Apollo app is running on port 5000");
		});
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log(error);
	});

// route handling
app.get("/api", async (req, res) => {
	try {
		const response = await axios.post(apolloURI, {
			person_titles: req.body?.person_titles,
			q_organizion_domains: req.body?.q_organizion_domains,
			page: req.body?.page,
		});
		console.log("Apollo API call success");
		res.status(200).send(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
});
