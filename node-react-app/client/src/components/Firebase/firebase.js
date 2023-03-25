import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAxvoOYI41pvvi7Vdye2CuivU-4tL2Gm-M",
  authDomain: "clunhouse-msci342.firebaseapp.com",
  projectId: "clunhouse-msci342",
  storageBucket: "clunhouse-msci342.appspot.com",
  messagingSenderId: "36409040893",
  appId: "1:36409040893:web:4f9d4dcfd272c19aac0394"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage(app)

export { auth, app, storage }