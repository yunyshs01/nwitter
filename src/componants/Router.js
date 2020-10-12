import React, { useState } from "react";

import {
	HashRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "componants/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
	return (
		<Router>
			{isLoggedIn && <Navigation userObj={userObj}></Navigation>}
			<Switch>
				{isLoggedIn ? (
					<>
						<Route exact path="/Home">
							<Home userObj={userObj}></Home>
						</Route>
						<Route exact path="/Profile">
							<Profile refreshUser={refreshUser} userObj={userObj}></Profile>
						</Route>
						
					</>
				) : (
					<>
						<Route exact path="/">
							<Auth></Auth>
						</Route>
						
					</>
				)}
			</Switch>
		</Router>
	);
};

export default AppRouter;
