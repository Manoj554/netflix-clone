import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';

interface formData {
    email: string;
    password: string;
}

interface IAuth {
    user: User | null
    signUp: (user: formData) => Promise<void>
    signIn: (user: formData) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
}

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => { },
    signIn: async () => { },
    logout: async () => { },
    error: null,
    loading: false

})

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // Logged in...
                    setUser(user)
                    setLoading(false)
                } else {
                    // Not logged in...
                    setUser(null)
                    setLoading(true)
                    router.push('/login')
                }

                setInitialLoading(false)
            }),
        [auth]
    )

    const signUp = async (user: formData) => {
        setLoading(true);

        await createUserWithEmailAndPassword(auth, user.email, user.password).then((userCredential) => {
            setUser(userCredential.user);
            router.push('/');
            setLoading(false);
        }).catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }

    const signIn = async (user: formData) => {
        setLoading(true);

        await signInWithEmailAndPassword(auth, user.email, user.password).then((userCredential) => {
            setUser(userCredential.user);
            router.push('/');
            setLoading(false);
        }).catch(err => alert(err.message)).finally(() => setLoading(false));
    }

    const logout = async () => {
        setLoading(true);

        signOut(auth).then(() => setUser(null))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }

    const memoedValue = useMemo(() => ({
        user, loading, error, signIn, signUp, logout
    }), [user, loading, error]);

    return <AuthContext.Provider value={memoedValue}>{!initialLoading && children}</AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext);
};