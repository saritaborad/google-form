const Form = require("../models/Form");
const Response = require("../models/Response");

exports.addQuestion = async (req, res, next) => {
	const { id } = req.body;
	const update = await Form.findOneAndUpdate(
		{ id },
		{ ...req.body },
		{ new: true, upsert: true }
	);

	return res
		.status(200)
		.json({ success: true, message: "Question added success" });
};

exports.getForm = async (req, res, next) => {
	const { id } = req.body;
	const form = await Form.findOne({ id });
	return res
		.status(200)
		.json({ success: true, message: "Data get success", form });
};

exports.getAllForms = async (req, res, next) => {
	const forms = await Form.find();
	return res
		.status(200)
		.json({ success: true, message: "form get success", forms });
};

exports.submitResponse = async (req, res) => {
	try {
		var data = {
			formId: req.body.formId,
			userId: req.body.userId,
			response: req.body.response,
		};

		const update = await Response.findOneAndUpdate(
			{ formId: data.formId },
			{ ...data },
			{ new: true, upsert: true }
		);

		return res
			.status(200)
			.json({ success: true, message: "response added successfully" });
	} catch (error) {
		return res.send(error);
	}
};

exports.allResponses = async (req, res) => {
	try {
		var result = await Response.find().lean();
		return res.json(result);
	} catch (e) {
		return res.send(e);
	}
};

exports.getResponse = async (req, res) => {
	try {
		var formId = req.body.formId;
		//   console.log(formId);

		await Response.find({ formId: formId }).then(async (responses) => {
			return res.status(200).json(responses);
		});
	} catch (error) {
		return res.send(error);
	}
};
