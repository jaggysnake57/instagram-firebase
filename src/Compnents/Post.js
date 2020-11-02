import { Avatar } from '@material-ui/core';
import React from 'react';
import '../css/Post.css';

const Post = ({ username, caption, imageUrl }) => {
	return (
		<div className="post">
			<div className="post__header">
				<Avatar className="avatar" alt="Username" />
				<h3>{username}</h3>
			</div>

			<img className="image" src={imageUrl} alt="" />

			<p>
				<strong>{username}:</strong> {caption}
			</p>
		</div>
	);
};

export default Post;
