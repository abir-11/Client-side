import React, { useEffect } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { AuthContext } from './../AuthContext/AuthContext';
import { auth } from './../../Firebase/Firebase.init';

const googleProvider=new GoogleAuthProvider();
const AuthProvider = ({children}) => {
     const [user,setUser]=useState(null);
     const [loading,setLoading]=useState(true);
    //SignUp
    const createUser=(email,password,name,photoURL)=>{
        return createUserWithEmailAndPassword(auth,email,password,name,photoURL)
    }
    //singin
    const SingInUser=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }
    //Google SignIn
    const signInWithGoogle=()=>{
        return signInWithPopup(auth,googleProvider)
    }
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
    }
    )
    const authInfo={
        user,
        loading,
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