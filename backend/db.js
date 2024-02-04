const mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1/form";

const connDB = () => {
	mongoose.connect(mongoDB).then(() => {
		console.log("database connected");
	});
};

module.exports = connDB;
