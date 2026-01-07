import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config'
import AuthContext from './AuthContext';   
import axios from "axios";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] =  useState(true);

    const googleProvider = new GoogleAuthProvider();

    const passwordReset = (email) =>{
       return sendPasswordResetEmail(auth, email)
    }

    const signInWithGoogle = () =>{
         return signInWithPopup(auth, googleProvider);
    }

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        signOut(auth);
    }

    const userLogin = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (updatedData) => {
         return updateProfile(auth.currentUser, updatedData)
    }

    const authInfo = {
        user,
        setUser,
        signInWithGoogle,
        userLogin,
        passwordReset,
        loading,
        updateUserProfile,
        createNewUser,
        logOut,
        setLoading
        
    }

    useEffect(() =>{
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser?.email) {
                 setUser(currentUser);
                // axios.post('http://localhost:5001/jwt', { email: currentUser.email })   
                // .then(() => {
                    // console.log(data.data.token);
                    setLoading(false);
                // })
            }
            else {
                axios.post(`http://localhost:5001/logout`, {}, { withCredentials: true })
                    .then( () => {
                        setLoading(false);
                        setUser(null);
                    })

                    }

        })
        return () => {
            unsubcribe();
        }

    },[])

        return <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
};

export default AuthProvider;