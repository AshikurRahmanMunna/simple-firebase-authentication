import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);


function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      console.log(user)
      setUser(user);
    })
    .catch(error => {
      console.error(error)
    })
  }
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      console.log('Signed out successfully')
      setUser({})
    })
    .catch(error => {
      setUser({})
    })
  }
  const handleGitHubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user)
    })
    .catch(error => {
      console.error(error)
    })
  }
  return (
    <div className="App">
      {
        user.uid ? <button onClick={handleSignOut}>Sign Out</button>
         : 
        <>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGitHubSignIn}>Github sign in</button>
        </>
      }
      <h1>Name: {user.displayName}</h1>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
