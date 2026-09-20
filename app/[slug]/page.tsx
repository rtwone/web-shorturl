import { redirect } from 'next/navigation';
import { getShortlinkBySlug, incrementShortlinkClicks } from '@/lib/shortlinks';

export default async function RedirectPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const link = await getShortlinkBySlug(slug);

    if (!link) {
        return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-lg">404 - Shortlink not found</div>;
    }

    if (!link.is_active) {
        return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-lg">Shortlink is disabled</div>;
    }

    await incrementShortlinkClicks(slug).catch(() => undefined);
    redirect(link.original_url);
}
