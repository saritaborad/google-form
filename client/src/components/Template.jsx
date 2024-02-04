import React from "react";
import plus from "../images/plus.svg";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import "./Template.css";
import axios from "axios";

const Template = () => {
	const navigate = useNavigate();
	const createForm = () => {
		const id = uuid();
		const questions_list = [
			{
				questionText: "Question",
				questionType: "radio",
				options: [{ optionText: "Option 1" }],
				open: true,
				required: false,
			},
		];
		axios.post(`http://localhost:3014/addQuestion`, {
			document_name: "Untitled form",
			doc_desc: "Add Description",
			questions: questions_list,
			id,
		});
		navigate(`/form/${id}`);
	};

	return (
		<div className="template_section">
			<div className="template_top">
				<div className="template_left">
					<span style={{ fontSize: "16px", color: "#202124" }}>Start New Form </span>
				</div>
			</div>
			<div className="template_body">
				<div className="card" onClick={createForm}>
					<img src={plus} alt="" className="card_image" />
					<p className="card_title">Blank</p>
				</div>
			</div>
		</div>
	);
};

export default Template;
