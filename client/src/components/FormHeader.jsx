import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { IconButton } from "@material-ui/core";
import avatarimage from "../images/p5.jpg";
import Avatar from "@material-ui/core/Avatar";
import "./FormHeader.css";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";

const FormHeader = () => {
	const navigate = useNavigate();
	const [{ doc_name }] = useStateValue();
	return (
		<div className="form_header">
			<div className="form_header_left">
				<input type="text" className="form_name" value={doc_name} disabled />
			</div>
			<h2>Question Paper</h2>
			<div className="form_header_right">
				<IconButton onClick={() => navigate("/response")}>
					<AiOutlineEye className="form_header_icon" />
				</IconButton>

				<IconButton>
					<Avatar style={{ height: "30px", width: "30px" }} src={avatarimage} />
				</IconButton>
			</div>
		</div>
	);
};

export default FormHeader;
