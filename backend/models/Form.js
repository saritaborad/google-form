const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
	id: { type: String },
	document_name: { type: String },
	doc_desc: { type: String },
	questions: [
		{
			questionText: { type: String },
			questionType: { type: String },
			options: [{ optionText: { type: String } }],
			open: { type: Boolean },
			required: { type: Boolean },
			answer: { type: Boolean },
			answerKey: { type: String },
			points: { type: Number },
		},
	],
});

const FormModel = mongoose.model("Form", FormSchema);
module.exports = FormModel;
