const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
	{
		formId: {
			type: String,
		},

		userId: {
			type: String,
		},

		response: [
			{
				question: String,
				answer: String,
			},
		],
	},
	{ timestamps: true }
);

const Response = mongoose.model("Response", ResponseSchema);

module.exports = Response;
