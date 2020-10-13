import { authService, dbService } from "fBase";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
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

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewName(value);
	};

	return (
		<div className="container">
			{Boolean(userObj) ? (
				<>
					<form onSubmit={onRenameSubmit} className="profileForm">
						<input
							type="text"
							placeholder="Profile rename"
							value={newName}
							onChange={onChange}
							name="newProfile"
							autoFocus
							className="formInput"
						></input>
						<input
							type="submit"
							value="Update Profile"
							className="formBtn"
							style={{
								marginTop: 10,
							}}
						/>
					</form>
					<span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
						Log Out
					</span>
				</>
			) : (
				history.push("/")
			)}
		</div>
	);
};

export default Profile;
