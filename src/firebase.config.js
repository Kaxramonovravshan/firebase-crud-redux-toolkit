import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSz6cYupH529b3-XEgreUg9SkzzYEHKoI",
  authDomain: "g44lesson.firebaseapp.com",
  projectId: "g44lesson",
  storageBucket: "g44lesson.appspot.com",
  messagingSenderId: "136841111736",
  appId: "1:136841111736:web:5f0bb8994cddca5cb42c4d"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
