import { authService } from "fBase";

import React from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
	console.log(userObj);
	const history = useHistory();
	const onLogOutClick = () => {
		authService.signOut();
		history.push("/");
	};
	return (
		<>
			{Boolean(userObj) ? (
				<>
					<p>{userObj.displayName}</p>
					<p>{userObj.email}</p>
					<button onClick={onLogOutClick}>log out</button>
				</>
			):history.push("/")}
		</>
	);
};

export default Profile;
