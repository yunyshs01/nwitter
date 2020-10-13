import React, { useState, useEffect } from "react";
import {authService} from 'fBase';
import AppRouter from "componants/Router"


function App() {

  
  const [init, setInit] = useState(false);
  
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile : (args)=>user.updateProfile(args)
        });
      }
      else{
        setUserObj(null);
      }
      

      setInit(true);
    })
    
  }, [])


  const refreshUser = ()=>{
    const user = authService.currentUser;
    setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile : (args)=>user.updateProfile(args)
        });
  }
	return (
		<>
			{init?<AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}></AppRouter>:"Initializing...."}
      <footer>&copy;  {new Date().getFullYear()} Nwitter</footer>
		</>
	);
}

export default App;
