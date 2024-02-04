const express = require("express");
const {
	getAllForms,
	getForm,
	addQuestion,
	submitResponse,
	allResponses,
	getResponse,
} = require("../controllers/Form");
const router = express.Router();

router.post("/addQuestion", addQuestion);
router.post("/getForm", getForm);
router.post("/getAllForms", getAllForms);
router.post("/saveResponse", submitResponse);
router.post("/allResponses", allResponses);
router.post("/getResponse", getResponse);

module.exports = router;
