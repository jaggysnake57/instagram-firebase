import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import '../css/ImageUpload.css';
import { db, storage } from '../firebase';
import firebase from 'firebase';

function ImageUpload({ username }) {
	const [caption, setCaption] = useState('');
	const [url, setUrl] = useState('');
	const [progress, setProgress] = useState(0);
	const [image, setImage] = useState(null);

	const handleChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleUpload = (e) => {
		e.preventDefault();
		console.log('upload');
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress);
			},
			(error) => {
				console.log('error message', error);
			},
			() => {
				// upload complete
				storage
					.ref('images')
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						db.collection('posts').add({
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
							caption,
							imageUrl: url,
							username,
						});
					});
			}
		);
		setProgress(0);
		setCaption('');
		setImage(null);
		console.log('cleared');
	};

	return (
		<div className="imageUpload">
			<input
				type="text"
				placeholder="Enter a caption"
				onChange={(e) => setCaption(e.target.value)}
				value={caption}
			/>
			<input type="file" onChange={handleChange} />
			<progress className="progress" value={progress} max="100" />
			<Button onClick={handleUpload}>upload</Button>
		</div>
	);
}

export default ImageUpload;
