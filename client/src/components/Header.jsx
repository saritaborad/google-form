import React from "react";
import "./Header.css";
import { Avatar, IconButton } from "@material-ui/core";
import formimage from "../images/google-forms.png";
import avatarImg from "../images/p5.jpg";

const Header = () => {
	return (
		<div className="header">
			<div className="header_info">
				<img src={formimage} alt="" width={40} height={40} className="form_image" />
				<div className="info">Forms</div>
			</div>

			<div className="header_right">
				<IconButton>
					<Avatar src={avatarImg} />
				</IconButton>
			</div>
		</div>
	);
};

export default Header;
