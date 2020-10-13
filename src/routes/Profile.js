import { authService, dbService } from "fBase";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({refreshUser, userObj }) => {
	const history = useHistory();
	const [newName, setNewName] = useState(userObj.displayName);
	const onLogOutClick = async () => {
		await authService.signOut();
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

	const onRenameSubmit = async (event) => {
		event.preventDefault();
		
		if (newName !== userObj.displayName) {
			await userObj;
			await userObj.updateProfile({
				displayName: newName,
			});
			
			refreshUser();
		}
	};

	const onChange= (event)=>{
		const {target : {value}} = event;
		setNewName(value);
	}

	return (
		<>
			{Boolean(userObj) ? (
				<>
					<form onSubmit={onRenameSubmit}>
						<input
							type="text"
							placeholder="Profile rename"
							value={newName}
							onChange={onChange}
							name="newProfile"
						></input>
						<input type="submit"></input>
					</form>
					<button onClick={onLogOutClick}>log out</button>
				</>
			) : (
				history.push("/")
			)}
		</>
	);
};

export default Profile;
