'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearSession, isAuthenticated } from '@/lib/auth';

const settings = [
    { label: 'Site URL', value: 'https://irfanhariyanto.my.id', description: 'Public domain used for short links.' },
    { label: 'Theme', value: 'System / Light / Dark', description: 'Appearance setting for the dashboard.' },
    { label: 'Storage', value: 'Supabase Storage', description: 'Bucket: thumbnails' },
    { label: 'Rate Limit', value: 'Enabled', description: 'Basic protections for create and redirect methods.' }
];

export default function SettingsPage() {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace('/login');
        }
    }, [router]);

    function handleLogout() {
        clearSession();
        router.replace('/login');
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-muted dark:text-darkmuted">Settings</p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight">Application settings</h1>
                </div>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-text dark:border-white/10 dark:bg-darksurface dark:text-darktext"
                >
                    Logout
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {settings.map((item) => (
                    <div key={item.label} className="card-glass rounded-2xl p-5">
                        <p className="text-sm text-muted dark:text-darkmuted">{item.label}</p>
                        <h3 className="mt-2 text-xl font-black">{item.value}</h3>
                        <p className="mt-2 text-sm text-muted dark:text-darkmuted">{item.description}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 card-glass rounded-2xl p-5">
                <h2 className="text-xl font-black tracking-tight">Supabase configuration</h2>
                <div className="mt-4 grid gap-3 text-sm text-muted dark:text-darkmuted md:grid-cols-2">
                    <div className="rounded-xl border border-black/10 p-3 dark:border-white/10">
                        <p className="font-semibold text-text dark:text-darktext">Project URL</p>
                        <p className="mt-1 break-all">{process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not configured yet'}</p>
                    </div>
                    <div className="rounded-xl border border-black/10 p-3 dark:border-white/10">
                        <p className="font-semibold text-text dark:text-darktext">Anonymous key</p>
                        <p className="mt-1 break-all">{process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Configured' : 'Not configured yet'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
