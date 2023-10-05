import firebase from 'firebase/compat';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA7m11CxjZ_PoY9F25uOk_WHp3xENfrwHQ',
  authDomain: 'crime-report-32be4.firebaseapp.com',
  databaseURL: 'https://crime-report-32be4-default-rtdb.firebaseio.com',
  projectId: 'crime-report-32be4',
  storageBucket: 'crime-report-32be4.appspot.com',
  messagingSenderId: '238545625209',
  appId: '1:238545625209:web:7e44c20cb94f14089774a8',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = firebase.database();

export const roles = {
  citizen: 'Citizen',
  oic: 'OIC',
  policestation: 'Police HQ',
};
