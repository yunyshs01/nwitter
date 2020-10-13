import React, { useState } from "react";
import { dbService, storageService } from "fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
const Nweet = ({ nweetObj, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.nweet);

	const onDeleteClick = async () => {
		const ok = window.confirm("Are you Sure you want to delete this nweet?");
		if (ok) {
			//delete Nweet
			await dbService.doc(`nweets/${nweetObj.id}`).delete();
			if (nweetObj.attachmentUrl !== "") {
				await storageService.refFromURL(nweetObj.attachmentUrl).delete();
			}
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
		<div className="nweet">
			{editing ? (
				<>
					<form onSubmit={onSubmit} className="container nweetEdit">
						<input
							onChange={onChange}
							value={newNweet}
							placeholder="Edit your Nweet"
							required
							autoFocus
							className="formInput"
						></input>
						<input type="submit" value="Edit it!" className="formBtn"></input>
						<span onClick={toggleEditing} className="formBtn cancelBtn">
							Cancel
						</span>
					</form>
				</>
			) : (
				<>
					<h4>{nweetObj.nweet}</h4>
					{nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
					{isOwner && (
						<div class="nweet__actions">
							<span onClick={onDeleteClick}>
								<FontAwesomeIcon icon={faTrash} />
							</span>
							<span onClick={toggleEditing}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
