import { dbService } from 'fBase';
import React, {useState, useEffect} from 'react'

var Home =  ()=>{

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async()=>{
        const nw = await dbService.collection("nweets").get();
        nw.forEach((res=>{
            const nweetObject = {
                ...res.data(),
                id:res.id,
            };
            setNweets((prev)=>[nweetObject,...prev]);
        }));
        
    };
    useEffect(()=>{
        getNweets();
    },[]);
    const onSubmit= async (event)=>{
        event.preventDefault();
        await dbService.collection("nweets").add({
            nweet,
            createdAt:Date.now(),

        })
        setNweet("");
    }

    const onChange= (event) =>{
        const {target:{value}} = event;
        setNweet((value));
    }

    console.log(nweets);
    
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's on your mind?" onChange={onChange} value={nweet} maxLength={120}></input>
                <input type="submit" value="Nweet"></input>
            </form>
            <div>
                {nweets.map((nweet)=>(
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;