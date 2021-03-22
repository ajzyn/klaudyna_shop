import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCxCtAOmdVMe2jrrDU7hFphVslTw7MKaPI',
  authDomain: 'gallery-8e838.firebaseapp.com',
  projectId: 'gallery-8e838',
  storageBucket: 'gallery-8e838.appspot.com',
  messagingSenderId: '950157382',
  appId: '1:950157382:web:b9aa3d7cdd8fbb4b55ca47'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectStorage = firebase.storage()
const proejctFirestore = firebase.firestore()

export { projectStorage, proejctFirestore }
