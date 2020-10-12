import { authService, dbService } from "fBase";

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
	const history = useHistory();

	const onLogOutClick = () => {
		authService.signOut();
		history.push("/");
	};

	const getMyNweets = async () => {
		const nweets = await dbService
			.collection("nweets")
			.where("creatorId", "==", userObj.uid)
			.orderBy("createdAt", "desc")
			.get();
		console.log(nweets.docs.map((doc) => doc.data));
	};
	useEffect(() => {
		getMyNweets();
	}, []);

	return (
		<>
			{Boolean(userObj) ? (
				<>
					<p>{userObj.displayName}</p>
					<p>{userObj.email}</p>
					<button onClick={onLogOutClick}>log out</button>
				</>
			) : (
				history.push("/")
			)}
		</>
	);
};

export default Profile;
