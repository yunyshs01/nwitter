import React, { useState } from "react";
import { dbService } from "fBase";

const Nweet = ({ nweetObj, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.nweet);

	const onDeleteClick = async () => {
		const ok = window.confirm("Are you Sure you want to delete this nweet?");
		if (ok) {
			//delete Nweet
			await dbService.doc(`nweets/${nweetObj.id}`).delete();
		}
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;

		setNewNweet(value);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({ nweet: newNweet });
        
        setEditing(false);
	};

	const toggleEditing = () => setEditing((prev) => !prev);

	return (
		<div>
			{editing ? (
				<>
					<form onSubmit={onSubmit}>
						<input
							onChange={onChange}
							value={newNweet}
							placeholder="Edit your Nweet"
							required
						></input>
						<input type="submit" value="Edit it!"></input>
						<button onClick={toggleEditing}>Cancel</button>
					</form>
				</>
			) : (
				<>
					<h4>{nweetObj.nweet}</h4>
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>Delete Nweet</button>
							<button onClick={toggleEditing}>Edit Nweet</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
