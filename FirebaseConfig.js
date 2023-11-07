import firebase from 'firebase/compat';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDxT5fMvK5Ai9klPYEZElIy3kaHc4kd_mA',
  authDomain: 'e-citizen-portal-d5230.firebaseapp.com',
  databaseURL: 'https://e-citizen-portal-d5230-default-rtdb.firebaseio.com',
  projectId: 'e-citizen-portal-d5230',
  storageBucket: 'e-citizen-portal-d5230.appspot.com',
  messagingSenderId: '187456587043',
  appId: '1:187456587043:web:0e974c4f8cc70e7ab73896',
  measurementId: 'G-HLE50EGMD1',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = firebase.database();

export const roles = {
  citizen: 'Citizen',
  oic: 'OIC',
  policestation: 'Police HQ',
};
