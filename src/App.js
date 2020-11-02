import { useState } from 'react';
import Header from './Compnents/Header';
import Post from './Compnents/Post';
import './css/App.css';

function App() {
	const [posts, setPosts] = useState([
		{
			username: 'jaggysnake',
			caption: 'this is a caption',
			imageUrl:
				'https://i.pinimg.com/originals/04/28/3e/04283e1a751ead27a75b13895119d6bc.jpg',
		},
		{
			username: 'bobsmith',
			caption: 'this is a caption',
			imageUrl:
				'https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg',
		},
		{
			username: 'crasp',
			caption: 'this is a caption',
			imageUrl: 'https://i.ytimg.com/vi/7PXLPzcIydw/maxresdefault.jpg',
		},
	]);
	return (
		<div className="app">
			<Header />
			{/* posts */}
			{posts.map((post) => (
				<Post
					username={post.username}
					caption={post.caption}
					imageUrl={post.imageUrl}
				/>
			))}
		</div>
	);
}

export default App;
