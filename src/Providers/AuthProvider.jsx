import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import axios from 'axios';
import auth from '../Firebase/firebase.config';
import { Toaster } from 'react-hot-toast';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const signInWithGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    };

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    const logOut = async () => {
        setLoading(true);
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
                withCredentials: true,
            });
            return signOut(auth);
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = (name, role) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            role: role,
        });
    };

    const getToken = async (email) => {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email },
            { withCredentials: true }
        );
        return data;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await getToken(currentUser.email);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        signInWithGithub,
        resetPassword,
        logOut,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            <Toaster position="top-center" />
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
