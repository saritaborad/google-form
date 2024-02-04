import React, { useEffect, useState } from "react";
import "./Mainbody.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import formimage from "../images/google-forms.png";

const MainLayout = () => {
	const [forms, setForms] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getForms();
	}, []);

	const getForms = async () => {
		const res = await axios.post("http://localhost:3014/getAllForms");
		const form = res.data.forms;
		setForms(form);
	};

	return (
		<div className="main_body">
			<div className="mainbody_top">
				<div
					className="mainbody_top_left"
					style={{
						fontSize: "20px",
						paddingBottom: "10px",
						fontWeight: "500",
						marginLeft: "100px",
					}}
				>
					Recent Forms
				</div>
			</div>
			<div
				className="mainbody_docs"
				style={{ marginLeft: "100px", display: "flex" }}
			>
				{forms.map((ele) => (
					<div className="doc_card" onClick={() => navigate(`/form/${ele.id}`)}>
						<img src={formimage} className="doc_image" alt="form" />
						<div className="doc_card_content">
							<h5 style={{ overflow: "ellipsis" }}>
								{ele?.document_name ? ele?.document_name : "Untitled Doc"}
							</h5>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MainLayout;
