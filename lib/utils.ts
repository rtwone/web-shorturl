export function generateSlug(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i += 1) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

export function slugPattern() {
    return /^[a-zA-Z0-9-_]+$/;
}

export function getBaseUrl() {
    return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

export function formatClicks(value: number | null | undefined) {
    return new Intl.NumberFormat('en-US').format(Number(value ?? 0));
}

export function sanitizeSlug(value: string) {
    return value.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
}
