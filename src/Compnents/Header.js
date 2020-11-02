import { Button } from '@material-ui/core';
import React from 'react';
import '../css/Header.css';
import { auth } from '../firebase';

const Header = ({ setOpen, user, setOpenSignIn }) => {
	return (
		<div className="header">
			<img
				className="logo"
				src="https://www.virtualstacks.com/wp-content/uploads/2019/11/instagram-logo-name.png"
				alt="logo"
			/>
			{user ? (
				<Button onClick={() => auth.signOut()}>Sign out</Button>
			) : (
				<div className="userButtons">
					<Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
					<Button onClick={() => setOpen(true)}>Sign up</Button>
				</div>
			)}
		</div>
	);
};

export default Header;
