import Nweet from "componants/Nweet";
import { dbService } from "fBase";
import React, { useState, useEffect } from "react";

var Home = ({ userObj }) => {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);

	useEffect(() => {
		dbService.collection("nweets").onSnapshot((snapshot) => {
			const nweetArray = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			setNweets(nweetArray);
		});
	}, []);
	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.collection("nweets").add({
			nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
		});
		setNweet("");
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNweet(value);
	};

	const onFileChange = (event)=>{
		const{target:{files}} = event;

		const theFile = files[0];
		console.log(theFile)
		const reader = new FileReader();
		reader.onloadend = (finishedEvent)=>{
			console.log(finishedEvent);
		}
		reader.readAsDataURL(theFile);
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="What's on your mind?"
					onChange={onChange}
					value={nweet}
					maxLength={120}
				></input>
				<input type="file" onChange={onFileChange} accept="image/*"></input>
				<input type="submit" value="Nweet"></input>
			</form>
			<div>
				{nweets.map((nweet) => (
					<Nweet
						key={nweet.id}
						nweetObj={nweet}
						isOwner={userObj.uid === nweet.creatorId}
					></Nweet>
				))}
			</div>
		</div>
	);
};

export default Home;
