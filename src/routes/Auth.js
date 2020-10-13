import { authService, fbAuthInstance } from "fBase";
import React, { useState } from "react";
import AuthForm from 'componants/AuthForm';
var Auth = () => {
	

	

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
			<AuthForm></AuthForm>
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
