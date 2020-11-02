import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyASynEmhdLm6xSDIrHBwVTy1UQnEOkddjk',
	authDomain: 'instagram-clone-2de17.firebaseapp.com',
	databaseURL: 'https://instagram-clone-2de17.firebaseio.com',
	projectId: 'instagram-clone-2de17',
	storageBucket: 'instagram-clone-2de17.appspot.com',
	messagingSenderId: '310034209323',
	appId: '1:310034209323:web:31e17e14328f58f497a86e',
	measurementId: 'G-QXS3WY6E93',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
