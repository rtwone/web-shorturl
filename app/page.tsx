import Link from 'next/link';
import { ArrowRight, BarChart3, Copy, ExternalLink, Link2, Sparkles } from 'lucide-react';
import { listShortlinks } from '@/lib/shortlinks';
import { StatsCard } from '@/components/stats-card';
import { ShortlinkCard } from '@/components/shortlink-card';

export default async function HomePage() {
    const links = await listShortlinks().catch(() => []);

    const totalClicks = links.reduce((sum, item) => sum + Number(item.clicks || 0), 0);
    const activeLinks = links.filter((item) => item.is_active).length;
    const inactiveLinks = links.length - activeLinks;

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <section className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_top,_rgba(124,185,255,0.25),_transparent_40%)] p-6 shadow-soft sm:p-10 lg:grid-cols-[1.2fr_0.8fr] dark:border-white/10">
                <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-muted dark:border-white/10 dark:bg-white/5 dark:text-darkmuted">
                        <Sparkles size={14} />
                        New generation short links
                    </div>
                    <h1 className="max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
                        Short links.<br />
                        Simple. Fast. Yours.
                    </h1>
                    <p className="mt-4 max-w-xl text-base text-muted dark:text-darkmuted">
                        Create, manage, and share your links with a clean and powerful shortlink platform built for modern teams and creators.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/create" className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black">
                            Create Shortlink
                            <ArrowRight size={16} />
                        </Link>
                        <Link href="/links" className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-text dark:border-white/10 dark:bg-darksurface dark:text-darktext">
                            View Links
                        </Link>
                    </div>
                </div>

                <div className="card-glass rounded-[2rem] p-4">
                    <div className="rounded-[1.5rem] border border-black/10 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-darksurface">
                        <div className="flex items-center justify-between text-xs text-muted dark:text-darkmuted">
                            <span>Public URL</span>
                            <span className="rounded-full bg-primary/15 px-2 py-1 text-primary">Live</span>
                        </div>
                        <div className="mt-4 rounded-xl bg-slate-100 p-4 dark:bg-slate-900">
                            <div className="text-xs text-muted dark:text-darkmuted">yourdomain.com</div>
                            <div className="mt-2 flex items-center gap-2 text-xl font-black tracking-tight">
                                <span>portfolio</span>
                                <ExternalLink size={16} className="text-primary" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-black/10 p-3 text-sm text-muted dark:border-white/10 dark:text-darkmuted">
                            <Copy size={15} />
                            https://domain.com/portfolio
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatsCard label="Total Links" value={String(links.length)} icon={Link2} />
                <StatsCard label="Total Clicks" value={String(totalClicks)} icon={BarChart3} />
                <StatsCard label="Active Links" value={String(activeLinks)} icon={Sparkles} />
                <StatsCard label="Inactive Links" value={String(inactiveLinks)} icon={Copy} />
            </section>

            <section className="mt-10">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-black tracking-tight">Recent links</h2>
                    <Link href="/links" className="text-sm font-medium text-primary">View all</Link>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {links.slice(0, 3).map((link) => (
                        <ShortlinkCard key={link.id} item={link} />
                    ))}
                </div>
            </section>
        </div>
    );
}
