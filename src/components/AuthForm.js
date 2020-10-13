import { authService } from 'fBase';
import React, { useState } from 'react';
const AuthForm = ()=>{

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

    return(
        <>
        <div>
				<form target="/" method="POST" onSubmit={onSubmit} className="container">
					<input
						name="email"
						type="email"
						placeholder="Email"
						required
						value={Email}
                        onChange={onChange}
                        className="authInput"
					></input>
					<input
						name="password"
						type="password"
						placeholder="Password"
						required
						value={Password}
                        onChange={onChange}
                        className="authInput"
					></input>
					<input
						type="submit"
                        value={newAccount ? "Create Account" : "Log in"}
                        className="authInput authSubmit"
					></input>
				</form>
				{error && <span className="authError">{error}</span>}
                <span onClick={toggleAccount} className="authSwitch">
					{newAccount ? "Sign in" : "Create Account"}
				</span>
			</div>
        </>
    )
}

export default AuthForm;