'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, ExternalLink, Link2, LogOut, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { clearSession, isAuthenticated } from '@/lib/auth';

const stats = [
    { label: 'Total Links', value: '24', icon: Link2 },
    { label: 'Total Clicks', value: '2,481', icon: TrendingUp },
    { label: 'Active Links', value: '21', icon: Sparkles },
    { label: 'Inactive Links', value: '3', icon: BarChart3 }
];

const recentLinks = [
    { title: 'Portfolio', slug: 'portfolio', destination: 'https://irfanhariyanto.my.id', clicks: 128, status: 'Active' },
    { title: 'GitHub', slug: 'github', destination: 'https://github.com', clicks: 84, status: 'Active' },
    { title: 'Event 2026', slug: 'event2026', destination: 'https://example.com/event', clicks: 42, status: 'Inactive' }
];

export default function DashboardPage() {
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
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-muted dark:text-darkmuted">Dashboard</p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight">Overview</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/create" className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-black">
                        + Create Shortlink
                    </Link>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-text dark:border-white/10 dark:bg-darksurface dark:text-darktext"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="card-glass rounded-2xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted dark:text-darkmuted">{label}</p>
                                <h3 className="mt-3 text-3xl font-black tracking-tight">{value}</h3>
                            </div>
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                <Icon size={22} />
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="card-glass rounded-2xl p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-black tracking-tight">Clicks Overview</h2>
                        <span className="text-sm text-muted dark:text-darkmuted">Last 30 days</span>
                    </div>
                    <div className="flex h-52 items-end gap-3">
                        {[26, 42, 36, 58, 48, 70, 75].map((height, index) => (
                            <div key={index} className="flex-1 rounded-t-xl bg-gradient-to-t from-primary to-sky-300" style={{ height: `${height}%` }} />
                        ))}
                    </div>
                </div>

                <div className="card-glass rounded-2xl p-5">
                    <h2 className="text-xl font-black tracking-tight">Recent links</h2>
                    <div className="mt-4 space-y-3">
                        {recentLinks.map((link) => (
                            <div key={link.slug} className="rounded-xl border border-black/10 p-3 dark:border-white/10">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="font-semibold">{link.title}</p>
                                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${link.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                        {link.status}
                                    </span>
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-xs text-muted dark:text-darkmuted">
                                    <ExternalLink size={12} />
                                    /{link.slug}
                                </div>
                                <p className="mt-2 text-xs text-muted dark:text-darkmuted">{link.clicks} clicks</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
