import { authService, fbAuthInstance } from "fBase";
import React, { useState } from "react";

var Auth = () => {
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	const toggleAccount = () => {
		return setNewAccount((prev) => !prev);
	};

	const onChange = (e) => {
		const {
			target: { name, value },
		} = e;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			let data;
			if (newAccount) {
				//create account
				data = await authService.createUserWithEmailAndPassword(
					Email,
					Password
				);
			} else {
				// signin
				data = await authService.signInWithEmailAndPassword(Email, Password);
			}
			console.log(data);
		} catch (err) {
			setError(err.message);
		}
	};

	const onSocialClick = async (event) => {
		const {
			target: { name },
        } = event;
        
        let provider;

        if(name==="google"){
            provider = new fbAuthInstance.GoogleAuthProvider();
        }
        else if(name==="github"){
            provider = new fbAuthInstance.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
        console.log(data);
	};

	return (
		<div>
			<div>
				<form target="/" method="POST" onSubmit={onSubmit}>
					<input
						name="email"
						type="email"
						placeholder="Email"
						required
						value={Email}
						onChange={onChange}
					></input>
					<input
						name="password"
						type="password"
						placeholder="Password"
						required
						value={Password}
						onChange={onChange}
					></input>
					<input
						type="submit"
						value={newAccount ? "Create Account" : "Log in"}
					></input>
				</form>
				{error}
				<span onClick={toggleAccount}>
					{newAccount ? "Sign in" : "Create Account"}
				</span>
			</div>
			<div>
				<button onClick={onSocialClick} name="google">
					Continue with Google
				</button>
				<button onClick={onSocialClick} name="github">
					Continue with Github
				</button>
			</div>
		</div>
	);
};

export default Auth;
