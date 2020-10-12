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

const AppRouter = ({ isLoggedIn }) => {
	return (
		<Router>
			{isLoggedIn && <Navigation></Navigation>}
			<Switch>
				{isLoggedIn ? (
					<>
						<Route exact path="/Home">
							<Home></Home>
						</Route>
						<Route exact path="/Profile">
							<Profile></Profile>
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