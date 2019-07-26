import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyBFR2wpTMp3VmTNg9JNpmCzF6RtM1U6DFI",
  authDomain: "crwn-db-8a87f.firebaseapp.com",
  databaseURL: "https://crwn-db-8a87f.firebaseio.com",
  projectId: "crwn-db-8a87f",
  storageBucket: "",
  messagingSenderId: "645780465361",
  appId: "1:645780465361:web:67456b81b9b0e498"
};

export const createUserProfileDocument = async (userAuth, additionalData ) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // const collectionRef = firestore.collection('users');
  // const collectionSnapshot = await collectionRef.get();
  // const allDocs = collectionSnapshot.docs;
  // console.log('createUserProfileDocument, collectionSnapshot is:');
  // console.log(collectionSnapshot);
  // console.log(allDocs.map(doc => doc.data()));

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    // console.log(newDocRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    }
  });

  // console.log('transformedCollection');
  // console.log(transformedCollection);

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


firebase.initializeApp(config);

export const getCurrentUser = () => {
  console.log('getCurrentUser called')
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;