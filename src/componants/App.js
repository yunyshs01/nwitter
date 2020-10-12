import React, { useState, useEffect } from "react";
import {authService} from 'fBase';
import AppRouter from "componants/Router"


function App() {

  
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }
      else{
        setIsLoggedIn(false);
      }

      setInit(true);
    })
    
  }, [])

	return (
		<>
			{init?<AppRouter isLoggedIn={isLoggedIn} userObj={userObj}></AppRouter>:"Initializing...."}
      <footer>&copy;  {new Date().getFullYear()} Nwitter</footer>
		</>
	);
}

export default App;
