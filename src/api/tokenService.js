/* eslint-disable no-undef */
// Simulated JWT-like token service (client-side only, for demo purposes)

const SECRET_KEY = 'edtech_secret_key_2025';
const ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000; // 15 minutes
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

// Simple base64url encode/decode
const base64url = {
    encode: (str) => btoa(unescape(encodeURIComponent(str)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ''),
    decode: (str) => {
        const padded = str.replace(/-/g, '+').replace(/_/g, '/');
        const pad = padded.length % 4;
        const padded2 = pad ? padded + '='.repeat(4 - pad) : padded;
        return decodeURIComponent(escape(atob(padded2)));
    }
};

// Simple HMAC-like signature (not cryptographically secure, for demo only)
const sign = (data) => {
    let hash = 0;
    const str = data + SECRET_KEY;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
};

// Generate a JWT-like access token
export const generateAccessToken = (user) => {
    const header = base64url.encode(JSON.stringify({
        alg: 'HS256',
        typ: 'JWT'
    }));
    const payload = base64url.encode(JSON.stringify({
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        iat: Date.now(),
        exp: Date.now() + ACCESS_TOKEN_EXPIRY,
    }));
    const signature = sign(`${header}.${payload}`);
    return `${header}.${payload}.${signature}`;
};

// Generate a refresh token (opaque token)
export const generateRefreshToken = (userId) => {
    const data = base64url.encode(JSON.stringify({
        sub: userId,
        iat: Date.now(),
        exp: Date.now() + REFRESH_TOKEN_EXPIRY,
        jti: Math.random().toString(36).substring(2),
    }));
    const signature = sign(data);
    return `${data}.${signature}`;
};

// Decode and verify an access token
export const verifyAccessToken = (token) => {
    if (!token) return null;
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const [header, payload, signature] = parts;
        const expectedSig = sign(`${header}.${payload}`);
        if (signature !== expectedSig) return null;

        const decoded = JSON.parse(base64url.decode(payload));
        if (decoded.exp < Date.now()) return null; // expired

        return decoded;
    } catch {
        return null;
    }
};

// Decode and verify a refresh token
export const verifyRefreshToken = (token) => {
    if (!token) return null;
    try {
        const parts = token.split('.');
        if (parts.length !== 2) return null;

        const [data, signature] = parts;
        const expectedSig = sign(data);
        if (signature !== expectedSig) return null;

        const decoded = JSON.parse(base64url.decode(data));
        if (decoded.exp < Date.now()) return null; // expired

        return decoded;
    } catch {
        return null;
    }
};

// Storage helpers
export const storeTokens = (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
};

export const clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const getStoredTokens = () => ({
    accessToken: localStorage.getItem('access_token'),
    refreshToken: localStorage.getItem('refresh_token'),
});

export const getTokenExpiryInfo = (token) => {
    const decoded = verifyAccessToken(token);
    if (!decoded) return null;
    const remaining = decoded.exp - Date.now();
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return {
        exp: decoded.exp,
        remaining,
        minutes,
        seconds,
        isExpired: remaining <= 0
    };
};