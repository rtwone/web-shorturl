'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';
import { ADMIN_PASSWORD, ADMIN_USERNAME, saveSession, validateLogin } from '@/lib/auth';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');

        if (!validateLogin(username, password)) {
            setError('Username atau password salah.');
            return;
        }

        setIsLoading(true);
        try {
            saveSession();
            router.push('/dashboard');
        } catch {
            setError('Login gagal, silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(124,185,255,0.22),_transparent_35%)] px-4 py-10 dark:bg-darkbg">
            <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-soft dark:border-white/10 dark:bg-darksurface lg:grid-cols-2">
                <div className="flex flex-col justify-between bg-[#111827] p-8 text-white dark:bg-[#0b0f19]">
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
                            <ShieldCheck size={14} />
                            Shortly
                        </div>
                        <h1 className="text-4xl font-black tracking-tight">Sign in to manage your links.</h1>
                        <p className="mt-4 max-w-sm text-sm text-slate-300">
                            Kelola shortlink, statistik klik, dan pengaturan dashboard secara lokal.
                        </p>
                    </div>

                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                        <p className="font-medium text-white">Akun admin</p>
                        <ul className="mt-3 space-y-2">
                            <li>• Username: <strong>{ADMIN_USERNAME}</strong></li>
                            <li>• Password: <strong>{ADMIN_PASSWORD}</strong></li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        <p className="text-sm uppercase tracking-[0.2em] text-muted dark:text-darkmuted">Welcome back</p>
                        <h2 className="mt-2 text-3xl font-black tracking-tight">Login admin</h2>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="username" className="mb-2 block text-sm font-medium">Username</label>
                                <input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="admin"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full"
                                />
                            </div>

                            {error && (
                                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black"
                            >
                                <LockKeyhole size={16} />
                                {isLoading ? 'Signing in...' : 'Login'}
                            </button>
                        </form>

                        <div className="mt-6 flex items-center gap-3 text-xs text-muted dark:text-darkmuted">
                            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                            local admin access
                            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                        </div>

                        <button
                            type="button"
                            onClick={() => router.push('/dashboard')}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-text dark:border-white/10 dark:bg-[#111827] dark:text-darktext"
                        >
                            Go to Dashboard
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
