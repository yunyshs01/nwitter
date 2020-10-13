import Nweet from "componants/Nweet";
import NweetFactory from "componants/NweetFactory";
import { dbService } from "fBase";
import React, { useState, useEffect } from "react";

var Home = ({ userObj }) => {
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

	return (
		<div>
			<NweetFactory userObj={userObj}></NweetFactory>
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
