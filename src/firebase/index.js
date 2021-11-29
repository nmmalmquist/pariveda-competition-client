import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDxNj31az2vFXXGWDRWrHevifDTGXpKiks",
    authDomain: "paridevacompetition-1b2fc.firebaseapp.com",
    projectId: "paridevacompetition-1b2fc",
    storageBucket: "paridevacompetition-1b2fc.appspot.com",
    messagingSenderId: "937198784233",
    appId: "1:937198784233:web:f4fb8e1d3cf0e7426a6a78",
    measurementId: "G-XDG75PK4MH"
  };

  const app = initializeApp(firebaseConfig);

  const storage = getStorage(app);

  export {storage}
