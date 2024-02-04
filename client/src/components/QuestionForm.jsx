import React, { useEffect, useState } from "react";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import { Select, Typography } from "@material-ui/core";
import CheckboxIcon from "@material-ui/core/Checkbox";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SubjectIcon from "@material-ui/icons/Subject";
import { BsTrash } from "react-icons/bs";
import { IconButton } from "@material-ui/core";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import { FcRightUp } from "react-icons/fc";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./Question_form.css";
import DragIndicator from "@material-ui/icons/DragIndicator";
import axios from "axios";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { useNavigate, useParams } from "react-router-dom";

const QuestionForm = () => {
	const { id } = useParams();
	const [{}, dispatch] = useStateValue();
	const navigate = useNavigate();
	const [questions, setQuestions] = useState([
		{
			questionText: "which is capital city",
			questionType: "radio",
			options: [
				{ optionText: "bengluru" },
				{ optionText: "belgavi" },
				{ optionText: "Hubli" },
				{ optionText: "Manyu" },
			],
			open: true,
			required: true,
			answer: false,
			answerKey: "",
			points: 0,
		},
	]);

	const [docName, setDocName] = useState("Untitiled document");
	const [docDesc, setDocDesc] = useState("Add Description");

	useEffect(() => {
		async function getForm() {
			const res = await axios.post(`http://localhost:3014/getForm`, {
				id,
			});
			const { form } = res.data;
			const question_data = form.questions;
			const doc_name = form.document_name;
			const doc_descip = form.doc_desc;
			setDocName(doc_name);
			setDocDesc(doc_descip);
			setQuestions(question_data);
			dispatch({ type: actionTypes.SET_DOC_NAME, doc_name: doc_name });
			dispatch({ type: actionTypes.SET_DOC_ID, id: form.id });
			dispatch({ type: actionTypes.SET_DOC_DESC, doc_desc: doc_descip });
			dispatch({ type: actionTypes.SET_QUESTIONS, questions: question_data });
		}
		getForm();
	}, []);

	function changeQuestion(text, i) {
		var newQuestion = [...questions];
		newQuestion[i].questionText = text;
		setQuestions(newQuestion);
	}

	function changeOptionValue(text, i, j) {
		var optionsQuestion = [...questions];
		optionsQuestion[i].options[j].optionText = text;
		setQuestions(optionsQuestion);
	}

	function addQuestionType(i, type) {
		let qs = [...questions];
		qs[i].questionType = type;
		setQuestions(qs);
	}

	function removeOption(i, j) {
		var RemoveOptionQuestion = [...questions];
		if (RemoveOptionQuestion[i].options.length > 1) {
			RemoveOptionQuestion[i].options.splice(j, i);
			setQuestions(RemoveOptionQuestion);
		}
	}

	function addOption(i) {
		var optionsOfQuestion = [...questions];
		if (optionsOfQuestion[i].options.length < 5) {
			optionsOfQuestion[i].options.push({
				optionText: "Option " + (optionsOfQuestion[i].options.length + 1),
			});
		}
		setQuestions(optionsOfQuestion);
	}

	function copyQuestion(i) {
		expandCloseAll();
		let qs = [...questions];
		let newQuestion = { ...qs[i] };
		setQuestions([...questions, newQuestion]);
	}

	function deleteQuestion(i) {
		let qs = [...questions];
		if (questions.length > 1) {
			qs.slice(i, 1);
		}
		setQuestions(qs);
	}

	function requiredQuestion(i) {
		var reqQuestion = [...questions];
		reqQuestion[i].required = !reqQuestion[i].required;
		setQuestions(reqQuestion);
	}

	function addMoreQuestionField() {
		expandCloseAll();
		setQuestions([
			...questions,
			{
				questionText: "Question...",
				questionType: "radio",
				options: [{ optionText: "Option 1" }],
				open: true,
				required: false,
			},
		]);
	}

	function setOptionAnswer(ans, qno) {
		var Question = [...questions];
		Question[qno].answerKey = ans;
		setQuestions(Question);
	}

	function doneAnswer(i) {
		var answerOfQuestion = [...questions];
		answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
		setQuestions(answerOfQuestion);
	}

	function addAnswer(i) {
		var answerOfQuestion = [...questions];
		answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
		setQuestions(answerOfQuestion);
	}

	function onDragEnd(result) {
		if (!result.destination) {
			return;
		}
		var itemgg = [...questions];
		const itemF = reorder(itemgg, result.source.index, result.destination.index);
		setQuestions(itemF);
	}

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.spice(endIndex, 0, removed);
		return result;
	};

	function expandCloseAll() {
		let qs = [...questions];
		for (let j = 0; j < qs.length; j++) {
			qs[j].open = false;
		}
		setQuestions(qs);
	}

	function handleExpand(i) {
		let qs = [...questions];
		for (let j = 0; j < qs.length; j++) {
			if (i == j) {
				qs[i].open = true;
			} else {
				qs[j].open = false;
			}
			setQuestions(qs);
		}
	}

	async function commitToDB() {
		dispatch({
			type: actionTypes.SET_QUESTIONS,
			questions: questions,
		});

		const { data } = await axios.post(`http://localhost:3014/addQuestion`, {
			document_name: docName,
			doc_desc: docDesc,
			questions: questions,
			id,
		});
		if (data.status === 200) {
			navigate("/");
		}
	}

	function questionsUI() {
		return questions.map((ques, i) => (
			<div key={i}>
				<div style={{ marginBottom: "0px" }}>
					<div style={{ width: "100%", marginBottom: "0px" }}>
						<DragIndicator
							style={{
								transform: "rotate(-90eg)",
								color: "#DAE0E2",
								position: "relative",
								left: "300px",
							}}
							fontSize="small"
						/>
					</div>
					<div>
						<Accordion
							expanded={questions[i].open}
							onChange={() => handleExpand(i)}
							className={questions[i].open ? "add border" : ""}
						>
							<AccordionSummary
								aria-controls="panel1a-content"
								id="panel1a-header"
								elevation={1}
								style={{ width: "100%" }}
							>
								{!questions[i].open ? (
									<div className="saved_questions">
										<Typography
											style={{
												fontSize: "15px",
												fontWeight: "400",
												letterSpacing: ".1px",
												lineHeight: "24px",
												paddingBottom: "8px",
											}}
										>
											{i + 1}. {questions[i].questionText}
										</Typography>
										{ques.options.map((op, j) => (
											<div key={j}>
												<div style={{ display: "flex" }}>
													<FormControlLabel
														style={{ marginLeft: "5px", marginBottom: "5px" }}
														disabled
														control={
															<input
																type={ques.questionType}
																color="primary"
																style={{ marginRight: "3px" }}
																required={ques.type}
															/>
														}
														label={
															<Typography
																style={{
																	fontFamily: "Roboto,Arial,sans-serif",
																	fontSize: "13px",
																	fontWeight: "400",
																	letterSpacing: ".2px",
																	lineHeight: "20px",
																	color: "#202124",
																}}
															>
																{ques.options[j].optionText}
															</Typography>
														}
													/>
												</div>
											</div>
										))}
									</div>
								) : (
									""
								)}
							</AccordionSummary>

							<div className="question_boxes">
								{!questions[i].answer ? (
									<AccordionDetails className="add_question">
										<div className="add_question_top">
											<label style={{ marginTop: "8px" }}>{i + 1}.</label>
											<input
												type="text"
												className="question"
												value={ques.questionText}
												onChange={(e) => changeQuestion(e.target.value, i)}
											/>
											<CropOriginalIcon style={{ color: "#5f6368", fontSize: "13px" }} />
											<Select
												className="select"
												style={{ color: "#5f6368", fontSize: "13px" }}
											>
												<MenuItem
													id="text"
													value="Text"
													onClick={() => {
														addQuestionType(i, "text");
													}}
												>
													<SubjectIcon style={{ marginRight: "10px" }} />
													Paragraph
												</MenuItem>
												<MenuItem
													id="checkbox"
													value="Checkbox"
													onClick={() => {
														addQuestionType(i, "checkbox");
													}}
												>
													<CheckboxIcon
														style={{ marginRight: "10px", color: "#70757a" }}
														checked
													/>
													Checkbox
												</MenuItem>
												<MenuItem
													id="radio"
													value="Radio"
													onClick={() => {
														addQuestionType(i, "radio");
													}}
												>
													<Radio style={{ marginRight: "10px", color: "#70757a" }} checked />
													Multiple Choice
												</MenuItem>
											</Select>
										</div>
										{ques.options.map((op, j) => (
											<div className="add_question_body" key={j}>
												{ques.questionType != "text" ? (
													<input type={ques.questionType} style={{ marginRight: "10px" }} />
												) : (
													<ShortTextIcon style={{ marginRight: "10px" }} />
												)}
												<div>
													<input
														type="text"
														className="text_input"
														value={ques.options[j].optionText}
														onChange={(e) => {
															changeOptionValue(e.target.value, i, j);
														}}
													/>
												</div>
												<CropOriginalIcon style={{ color: "#5f6368" }} />
												<IconButton aria-label="delete">
													<CloseIcon
														onClick={() => {
															removeOption(i, j);
														}}
													/>
												</IconButton>
											</div>
										))}

										{ques.options.length < 5 ? (
											<div className="add_question_body">
												<FormControlLabel
													disabled
													control={
														ques.questionType != "text" ? (
															<input
																type={ques.questionType}
																color="primary"
																inputProps={{ "aria-label": "secondary checkbox" }}
																style={{ marginLeft: "10px", marginRight: "10px" }}
																disabled
															/>
														) : (
															<ShortTextIcon style={{ marginRight: "10px" }} />
														)
													}
													label={
														<div>
															<input
																type="text"
																className="text_input"
																style={{ fontSize: "13px", width: "60px" }}
															/>
															<Button
																size="small"
																onClick={() => {
																	addOption(i);
																}}
																style={{
																	textTransform: "none",
																	color: "#4285f4",
																	fontSize: "13px",
																	fontWeight: "600",
																}}
															>
																Add option
															</Button>
														</div>
													}
												/>
											</div>
										) : (
											""
										)}

										<div className="add_footer">
											<div className="add_question_bottom_left">
												<Button
													size="small"
													style={{
														textTransform: "none",
														color: "#4285f4",
														fontSize: "13px",
														fontWeight: "600",
													}}
													onClick={() => addAnswer(i)}
												>
													<FcRightUp
														style={{
															border: "2px solid #4285f4",
															padding: "2px",
															marginRight: "8px",
														}}
													/>
													Answer key
												</Button>
												<div className="add_question_bottom">
													<IconButton
														aria-label="Copy"
														onClick={() => {
															copyQuestion(i);
														}}
													>
														<FilterNoneIcon />
													</IconButton>

													<IconButton
														aria-label="delete"
														onClick={() => {
															deleteQuestion(i);
														}}
													>
														<BsTrash />
													</IconButton>
													<span style={{ color: "#5f6368", fontSize: "13px" }}>
														Required
													</span>
													<Switch
														name="checkedA"
														color="primary"
														checked={ques.required}
														onClick={() => {
															requiredQuestion(i);
														}}
													/>
												</div>
											</div>
										</div>
									</AccordionDetails>
								) : (
									<AccordionDetails className="add_question">
										<div className="top_header">Choose Correct Answer</div>
										<div>
											<div className="add_question_top">
												<input
													type="text"
													className="question"
													value={ques.questionText}
													disabled
												/>
											</div>
											{ques.options.map((op, j) => (
												<div
													className="add_question_body"
													key={j}
													style={{
														marginLeft: "8px",
														marginBottom: "10px",
														marginTop: "5px",
													}}
												>
													<div key={j}>
														<div style={{ display: "flex" }} className="">
															<div className="form-check">
																<label
																	style={{ fontSize: "13px" }}
																	onClick={() => setOptionAnswer(ques.options[j].optionText, i)}
																>
																	{ques.questionType != "text" ? (
																		<input
																			type={ques.questionType}
																			name={ques.questionText}
																			value="option3"
																			className="form-check-input"
																			required={ques.required}
																			style={{
																				marginRight: "10px",
																				marginBottom: "10px",
																				marginTop: "5px",
																			}}
																		/>
																	) : (
																		<ShortTextIcon style={{ marginRight: "10px" }} />
																	)}
																	{ques.options[j].optionText}
																</label>
															</div>
														</div>
													</div>
												</div>
											))}

											<div className="add_question_bottom">
												<Button
													variant="outlined"
													color="primary"
													style={{
														textTransform: "none",
														color: "#4285f4",
														fontSize: "12px",
														marginTop: "12px",
														fontWeight: "",
													}}
													onClick={() => doneAnswer(i)}
												>
													Done
												</Button>
											</div>
										</div>
									</AccordionDetails>
								)}

								{!questions[i].answer ? (
									<div className="question_edit">
										<AddCircleOutlineIcon
											onClick={addMoreQuestionField}
											className="edit"
										/>
									</div>
								) : (
									""
								)}
							</div>
						</Accordion>
					</div>
				</div>
			</div>
		));
	}

	return (
		<div>
			<div className="question_form">
				<br></br>
				<div className="section">
					<div className="question_title_section">
						<div className="question_form_top">
							<input
								type="text"
								className="question_form_top_name"
								style={{ color: "black" }}
								placeholder={docName || "Untitled document"}
								onChange={(e) => {
									setDocName(e.target.value);
								}}
							/>
							<input
								type="text"
								className="question_form_top_desc"
								placeholder={docDesc || "form description"}
								onChange={(e) => {
									setDocDesc(e.target.value);
								}}
							/>
						</div>
					</div>

					{questionsUI()}

					<div className="save_form">
						<Button
							variant="contained"
							color="primary"
							onClick={commitToDB}
							style={{ fontSize: "14px" }}
						>
							Save
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionForm;
