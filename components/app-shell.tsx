'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, Plus, Link as LinkIcon, LayoutDashboard, Settings, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/create', label: 'Create Shortlink', icon: Plus },
    { href: '/links', label: 'Links', icon: LinkIcon },
    { href: '/settings', label: 'Settings', icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    const isPublicRedirectRoute = pathname && !pathname.startsWith('/dashboard') && !pathname.startsWith('/links') && !pathname.startsWith('/create') && !pathname.startsWith('/settings') && !pathname.startsWith('/login') && !pathname.startsWith('/api') && !pathname.startsWith('/_next');

    return (
        <div className="min-h-screen bg-background text-text dark:bg-darkbg dark:text-darktext">
            {!isPublicRedirectRoute && (
                <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-darkbg/70">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm text-black shadow-neo">S</span>
                            <span>Shortly</span>
                        </Link>

                        <nav className="hidden items-center gap-2 md:flex">
                            {navItems.map(({ href, label, icon: Icon }) => {
                                const active = pathname === href;
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium ${active
                                            ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                                            : 'border-transparent bg-transparent text-muted hover:border-black/10 hover:bg-black/5 dark:hover:border-white/10 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        <Icon size={16} />
                                        {label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-text dark:border-white/10 dark:bg-darksurface dark:text-darktext"
                                aria-label="Toggle theme"
                            >
                                {mounted && theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            <button
                                type="button"
                                onClick={() => setMobileOpen((v) => !v)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-text md:hidden dark:border-white/10 dark:bg-darksurface dark:text-darktext"
                                aria-label="Toggle mobile menu"
                            >
                                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                            </button>
                        </div>
                    </div>

                    {mobileOpen && (
                        <div className="border-t border-black/10 bg-white p-3 md:hidden dark:border-white/10 dark:bg-darkbg">
                            <nav className="flex flex-col gap-2">
                                {navItems.map(({ href, label, icon: Icon }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${pathname === href ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-muted'
                                            }`}
                                    >
                                        <Icon size={16} />
                                        {label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    )}
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
