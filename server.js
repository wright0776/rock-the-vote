// DEPENDENCIES
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");

// ROUTERS
const issuesRouter = require('./routes/issues');

// CONSTS
const app = express();
const port = process.env.PORT || 8080;
const db = process.env.MONGODB_URI || "mongodb://localhost:27017/rock-the-vote";

// MIDDLEWARE
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "client", "build")));

// ROUTES
app.use('/api/issues', issuesRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

mongoose.connect(db), (err) => {
    if(err) console.log(`Sorry, can't connect to the database right now. ${err}`);
    console.log('Connected to MongoDB');
};

app.listen(port, () => console.log(`server running on port ${port}`));