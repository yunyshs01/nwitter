import { dbService, storageService } from 'fBase';
import React, {useState} from 'react'
import { v4 as uuidv4 } from "uuid";


const NweetFactory = ({userObj})=>{
    const [attachment, setAttachment] = useState("");
    const [nweet, setNweet] = useState("");

    //onSubmit : 
	const onSubmit = async (event) => {
		event.preventDefault();
		let attachmentUrl = "";
		if (attachment !== "") {
			const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
			const response = await fileRef.putString(attachment, "data_url");
			attachmentUrl = await response.ref.getDownloadURL();
		}
		const nweetObj = {
			nweet: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentUrl,
		};
		await dbService.collection("nweets").add(nweetObj);
		setNweet("");
		setAttachment("");
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNweet(value);
	};

	const onFileChange = (event) => {
		const {
			target: { files },
		} = event;

		const theFile = files[0];

		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const {
				currentTarget: { result },
			} = finishedEvent;
			setAttachment(result);
		};
		reader.readAsDataURL(theFile);
	};

	const onClearAttachment = () => {
		setAttachment(null);
	};

    return(
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
				{attachment && (
					<div>
						<img src={attachment} width="100px" height="100px" alt="it seems not loaded"></img>
						<button onClick={onClearAttachment}>Clear</button>
					</div>
				)}
			</form>
    )
}

export default NweetFactory;