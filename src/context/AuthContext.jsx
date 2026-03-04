
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { users } from '../mocks/users';
import { setApiUser } from '../api/mockApi';
import {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    storeTokens,
    clearTokens,
    getStoredTokens,
    getTokenExpiryInfo,
} from '../api/tokenService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tokenInfo, setTokenInfo] = useState(null);

    // Restore session from tokens on mount
    useEffect(() => {
        const { accessToken, refreshToken } = getStoredTokens();

        if (accessToken) {
            const decoded = verifyAccessToken(accessToken);
            if (decoded) {
                // Token still valid
                const user = users.find(u => u.id === decoded.sub);
                if (user) {
                    setCurrentUser(user);
                    setApiUser(user);
                    setTokenInfo(getTokenExpiryInfo(accessToken));
                }
            } else if (refreshToken) {
                // Access token expired, try refresh
                const refreshDecoded = verifyRefreshToken(refreshToken);
                if (refreshDecoded) {
                    const user = users.find(u => u.id === refreshDecoded.sub);
                    if (user) {
                        const newAccessToken = generateAccessToken(user);
                        const newRefreshToken = generateRefreshToken(user.id);
                        storeTokens(newAccessToken, newRefreshToken);
                        setCurrentUser(user);
                        setApiUser(user);
                        setTokenInfo(getTokenExpiryInfo(newAccessToken));
                    }
                } else {
                    clearTokens();
                }
            } else {
                clearTokens();
            }
        }
        setLoading(false);
    }, []);

    // 
    useEffect(() => {
        if (!currentUser) return;

        const { accessToken, refreshToken } = getStoredTokens();
        const info = getTokenExpiryInfo(accessToken);
        if (!info) return;

        // 
        const delay = Math.max(info.remaining - 2 * 60 * 1000, 0);

        const timer = setTimeout(() => {
            const refreshDecoded = verifyRefreshToken(refreshToken);
            if (refreshDecoded) {
                const newAccessToken = generateAccessToken(currentUser);
                const newRefreshToken = generateRefreshToken(currentUser.id);
                storeTokens(newAccessToken, newRefreshToken);
                setTokenInfo(getTokenExpiryInfo(newAccessToken));
            } else {
                logout();
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [currentUser]);

    // 
    useEffect(() => {
        if (!currentUser) return;
        const interval = setInterval(() => {
            const { accessToken } = getStoredTokens();
            setTokenInfo(getTokenExpiryInfo(accessToken));
        }, 1000);
        return () => clearInterval(interval);
    }, [currentUser]);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = users.find(u => u.email === email);
                if (!user || password !== 'password123') {
                    reject(new Error('Email ou mot de passe incorrect'));
                    return;
                }

                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user.id);
                storeTokens(accessToken, refreshToken);

                setCurrentUser(user);
                setApiUser(user);
                setTokenInfo(getTokenExpiryInfo(accessToken));
                resolve(user);
            }, 1500);
        });
    };

    const logout = useCallback(() => {
        setCurrentUser(null);
        setTokenInfo(null);
        clearTokens();
    }, []);

    const getAccessToken = () => getStoredTokens().accessToken;

    const isStudent = currentUser?.role === 'student';
    const isInstructor = currentUser?.role === 'instructor';

    return (
        <AuthContext.Provider value={{
            currentUser,
            loading,
            login,
            logout,
            isStudent,
            isInstructor,
            tokenInfo,
            getAccessToken,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
