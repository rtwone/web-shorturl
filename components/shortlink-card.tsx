import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Eye, Globe } from 'lucide-react';
import { ShortlinkRecord, buildShortUrl } from '@/lib/shortlinks';

export function ShortlinkCard({ item }: { item: ShortlinkRecord }) {
    const url = buildShortUrl(item.slug);

    return (
        <article className="card-glass overflow-hidden rounded-2xl">
            <div className="relative h-40 w-full bg-slate-100 dark:bg-slate-800">
                {item.thumbnail_url ? (
                    <Image src={item.thumbnail_url} alt={item.title || item.slug} fill className="object-cover" unoptimized />
                ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                        <Globe size={36} />
                    </div>
                )}
            </div>
            <div className="space-y-3 p-4">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold">{item.title || item.slug}</h3>
                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${item.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <p className="line-clamp-2 text-sm text-muted dark:text-darkmuted">{item.description || 'No description provided.'}</p>
                <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-primary">
                    {url}
                    <ExternalLink size={14} />
                </a>
                <div className="flex items-center justify-between text-sm text-muted dark:text-darkmuted">
                    <span className="inline-flex items-center gap-1"><Eye size={14} /> {item.clicks} clicks</span>
                    <Link href={`/links/${item.id}/edit`} className="font-medium text-text dark:text-darktext">Edit</Link>
                </div>
            </div>
        </article>
    );
}
