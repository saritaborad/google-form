import { Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Userform.css";
import { useStateValue } from "./StateProvider";
import axios from "axios";

function Userform() {
	const navigate = useNavigate();
	var [answers, setAnswers] = useState([]);
	var [{ questions, doc_name, doc_desc, id }] = useStateValue();

	function handleCheckboxChange(checked, que, option) {
		if (checked) {
			const ans = updateAnswers(que, option);
			console.log(ans);
			setAnswers(ans);
		}
	}

	function handleRadioChange(que, option) {
		const ans = updateAnswers(que, option);
		setAnswers(ans);
	}

	function handleTextChange(que, text) {
		const ans = updateAnswers(que, text);
		setAnswers(ans);
	}

	function updateAnswers(que, answer) {
		const ans = [...answers];
		const existingAnswerIndex = ans.findIndex((a) => a.question === que);

		if (existingAnswerIndex !== -1) {
			ans[existingAnswerIndex].answer = answer;
		} else {
			ans.push({
				question: que,
				answer: answer,
			});
		}

		return ans;
	}

	async function submit() {
		const { data } = await axios.post(`http://localhost:3014/saveResponse`, {
			response: answers,
			formId: id,
			userId: "Sarita",
		});

		navigate(`/`);
	}
	return (
		<div className="submit">
			<div className="user_form">
				<div className="user_form_section">
					<div className="user_title_section">
						<Typography style={{ fontSize: "26px" }}>{doc_name}</Typography>
						<Typography style={{ fontSize: "15px" }}>{doc_desc}</Typography>
					</div>

					{questions.map((question, qindex) => (
						<div className="user_form_questions" key={qindex}>
							<Typography
								style={{
									fontSize: "15px",
									fontWeight: "400",
									letterSpacing: ".1px",
									lineHeight: "24px",
									paddingBottom: "8px",
									fontSize: "14px",
								}}
							>
								{qindex + 1}. {question.questionText}
							</Typography>
							{question.options.map((ques, index) => (
								<div key={index} style={{ marginBottom: "5px" }}>
									<div style={{ display: "flex" }}>
										<div className="form-check">
											{question.questionType != "radio" ? (
												question.questionType != "text" ? (
													<label>
														<input
															type={question.questionType}
															name={qindex}
															value={ques.optionText}
															className="form-check-input"
															required={question.required}
															style={{ margnLeft: "5px", marginRight: "5px" }}
															onChange={(e) => {
																handleCheckboxChange(
																	e.target.checked,
																	question.questionText,
																	ques.optionText
																);
															}}
														/>
														{ques.optionText}
													</label>
												) : (
													<label>
														<input
															type={question.questionType}
															name={qindex}
															value={ques.optionText}
															className="form-check-input"
															required={question.required}
															style={{ margnLeft: "5px", marginRight: "5px" }}
															onChange={(e) => {
																handleRadioChange(question.questionText, e.target.value);
															}}
														/>{" "}
														{ques.optionText}
													</label>
												)
											) : (
												<label>
													<input
														type={question.questionType}
														name={qindex}
														value={ques.optionText}
														className="form-check-input"
														required={question.required}
														style={{ margnLeft: "5px", marginRight: "5px" }}
														onChange={() => {
															handleTextChange(question.questionText, ques.optionText);
														}}
													/>
													{ques.optionText}
												</label>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					))}

					<div className="user_form_submit">
						<Button
							variant="contained"
							color="primary"
							onClick={submit}
							style={{ fontSize: "14px" }}
						>
							Submit
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Userform;
