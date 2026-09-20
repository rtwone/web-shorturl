import Link from 'next/link';
import { Copy, ExternalLink, Pencil, Search, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { listShortlinks } from '@/lib/shortlinks';

export default async function LinksPage({ searchParams }: { searchParams?: { q?: string } }) {
    const q = (searchParams?.q || '').toLowerCase();
    const items = await listShortlinks().catch(() => []);
    const filtered = items.filter((item) => {
        const haystack = `${item.slug} ${item.title || ''} ${item.original_url}`.toLowerCase();
        return haystack.includes(q);
    });

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-muted dark:text-darkmuted">Overview</p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight">Links</h1>
                </div>
                <Link href="/create" className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-black">
                    + Create Shortlink
                </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-darksurface">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input name="q" defaultValue={searchParams?.q || ''} placeholder="Search links..." className="w-full pl-9" />
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-soft dark:border-white/10 dark:bg-darksurface">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-muted dark:bg-slate-900 dark:text-darkmuted">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Title</th>
                                <th className="px-4 py-3 font-semibold">Short URL</th>
                                <th className="px-4 py-3 font-semibold">Destination</th>
                                <th className="px-4 py-3 font-semibold">Clicks</th>
                                <th className="px-4 py-3 font-semibold">Status</th>
                                <th className="px-4 py-3 font-semibold">Created</th>
                                <th className="px-4 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item) => (
                                <tr key={item.id} className="border-t border-black/10 dark:border-white/10">
                                    <td className="px-4 py-3 font-semibold">{item.title || item.slug}</td>
                                    <td className="px-4 py-3 text-primary">/{item.slug}</td>
                                    <td className="px-4 py-3 text-muted dark:text-darkmuted">{item.original_url}</td>
                                    <td className="px-4 py-3">{item.clicks}</td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${item.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                            {item.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-muted dark:text-darkmuted">{new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button className="rounded-lg border border-black/10 p-2 dark:border-white/10" aria-label="Copy"><Copy size={14} /></button>
                                            <a href={`/${item.slug}`} target="_blank" rel="noreferrer" className="rounded-lg border border-black/10 p-2 dark:border-white/10"><ExternalLink size={14} /></a>
                                            <Link href={`/links/${item.id}/edit`} className="rounded-lg border border-black/10 p-2 dark:border-white/10"><Pencil size={14} /></Link>
                                            <button className="rounded-lg border border-black/10 p-2 dark:border-white/10" aria-label="Delete"><Trash2 size={14} /></button>
                                            <button className="rounded-lg border border-black/10 p-2 dark:border-white/10" aria-label="Toggle status">{item.is_active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
