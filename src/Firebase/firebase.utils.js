import "firebase/firestore";
import "firebase/auth";

import firebase from "firebase/app";

const Config = {
  apiKey: "AIzaSyDQLVvq6gJb7xuU-gk0GXdWcitJE2fnVsI",
  authDomain: "netflix-clone-b5368.firebaseapp.com",
  databaseURL: "https://netflix-clone-b5368.firebaseio.com",
  projectId: "netflix-clone-b5368",
  storageBucket: "netflix-clone-b5368.appspot.com",
  messagingSenderId: "99047867093",
  appId: "1:99047867093:web:e45cd6c9dfd20abf48185c",
  measurementId: "G-2BQ61ZYGCM"
};

export const CreateUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log(`${error} User Can't be registered`);
    }
  }
  return userRef;
};

firebase.initializeApp(Config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
