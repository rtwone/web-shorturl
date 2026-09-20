export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'iyanus';

const SESSION_KEY = 'shortly_admin_session';

export function validateLogin(username: string, password: string) {
    return username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function saveSession() {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(SESSION_KEY, 'true');
}

export function isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(SESSION_KEY) === 'true';
}

export function clearSession() {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(SESSION_KEY);
}