import { NextResponse } from 'next/server';
import { shortlinkFormSchema } from '@/lib/validation';
import { createShortlink } from '@/lib/shortlinks';

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const validated = shortlinkFormSchema.parse(json);

        const result = await createShortlink({
            original_url: validated.original_url,
            slug: validated.slug,
            title: validated.title,
            description: validated.description,
            thumbnail_url: validated.thumbnail_url || null
        });

        return NextResponse.json({
            success: true,
            slug: result.slug,
            short_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${result.slug}`
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create shortlink';
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
