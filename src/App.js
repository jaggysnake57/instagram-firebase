import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Header from './Compnents/Header';
import ImageUpload from './Compnents/ImageUpload';
import Post from './Compnents/Post';
import './css/App.css';
import { auth, db } from './firebase';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function App() {
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	const signUp = (e) => {
		e.preventDefault();
		auth.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				authUser.user.updateProfile({
					displayName: username,
				});
				setOpen(false);
			})
			.catch((err) => alert(err.message));
	};
	const signIn = (e) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password)
			.then((authUser) => {
				setUser(authUser.user);
				setOpenSignIn(false);
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//user logged in
				console.log(authUser);
				setUser(authUser);
			} else {
				// user logged in
				setUser(null);
			}
		});
		return () => {
			unsubscribe();
		};
	}, [user, username]);

	useEffect(() => {
		db.collection('posts')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => ({
						postId: doc.id,
						postData: doc.data(),
					}))
				);
			});
	}, []);
	return (
		<div className="app">
			<Modal open={open} onClose={() => setOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<img
						className="logo"
						src="https://www.virtualstacks.com/wp-content/uploads/2019/11/instagram-logo-name.png"
						alt="logo"
					/>
					<form action="">
						<Input
							placeholder="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							placeholder="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button onClick={signUp}>Sign Up</Button>
					</form>
				</div>
			</Modal>

			<Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
				<div style={modalStyle} className={classes.paper}>
					<img
						className="logo"
						src="https://www.virtualstacks.com/wp-content/uploads/2019/11/instagram-logo-name.png"
						alt="logo"
					/>
					<form action="">
						<Input
							placeholder="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button onClick={signIn}>Sign In</Button>
					</form>
				</div>
			</Modal>

			<Header
				setOpen={setOpen}
				setOpenSignIn={setOpenSignIn}
				user={user}
			/>
			{user?.displayName ? (
				<ImageUpload username={user.displayName} />
			) : (
				<h3>Sorry you need to login to upload</h3>
			)}

			{/* posts */}
			{posts.map(({ postId, postData }) => (
				<Post
					key={postId}
					username={postData.username}
					caption={postData.caption}
					imageUrl={postData.imageUrl}
				/>
			))}
		</div>
	);
}

export default App;
