import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword, GoogleAuthProvider,onAuthStateChanged, signInWithEmailAndPassword,signInWithPopup,signOut,
  updateProfile
} from 'firebase/auth';
import { AuthContext } from './../AuthContext/AuthContext';
import { auth } from './../../Firebase/Firebase.init';

const googleProvider=new GoogleAuthProvider();
const AuthProvider = ({children}) => {
     const [user,setUser]=useState(null);
     const [loading,setLoading]=useState(true);
    //SignUp
   const createUser = async (email, password, displayName, photoURL) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, {
        displayName: displayName,
        photoURL: photoURL
      });
      await result.user.reload();
      setUser({ ...auth.currentUser }); 
    } finally {
      setLoading(false);
    }
  };
    //singin
    const SingInUser=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }
    //Google SignIn
    const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

   
    //singout
    const singOutUser=()=>{
        return signOut(auth)
    }
    
    useEffect(()=>{
     const unsubcribe=onAuthStateChanged(auth,(currentUser)=>{
            console.log('Current user',currentUser)
            setUser(currentUser);
            setLoading(false)

        })
        return ()=>{
            unsubcribe();
        }
    },[]
    )
    const authInfo={
        user,
        loading,
        setUser,
        createUser,
        SingInUser,
        signInWithGoogle,
        singOutUser,
        
    }
    return (
        <div>
            <AuthContext value={authInfo}>
                {
                    children
                }
            </AuthContext>
        </div>
    );
};
export default AuthProvider;