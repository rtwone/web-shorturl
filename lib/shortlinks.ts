import { supabase } from '@/lib/supabase/client';
import { getBaseUrl, generateSlug } from '@/lib/utils';

export type ShortlinkRecord = {
    id: string;
    slug: string;
    original_url: string;
    title?: string | null;
    description?: string | null;
    thumbnail_url?: string | null;
    clicks: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export async function listShortlinks() {
    if (!supabase) return [] as ShortlinkRecord[];
    const { data, error } = await supabase.from('shortlinks').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as ShortlinkRecord[];
}

export async function getShortlinkBySlug(slug: string) {
    if (!supabase) return null;
    const { data, error } = await supabase.from('shortlinks').select('*').eq('slug', slug).maybeSingle();
    if (error) throw new Error(error.message);
    return data as ShortlinkRecord | null;
}

export async function getShortlinkById(id: string) {
    if (!supabase) return null;
    const { data, error } = await supabase.from('shortlinks').select('*').eq('id', id).maybeSingle();
    if (error) throw new Error(error.message);
    return data as ShortlinkRecord | null;
}

export async function createShortlink(input: { original_url: string; slug?: string; title?: string; description?: string; thumbnail_url?: string | null }) {
    if (!supabase) {
        throw new Error('Supabase is not configured.');
    }

    const slug = input.slug && input.slug.trim() ? input.slug.trim() : generateSlug();

    const { data, error } = await supabase.from('shortlinks').insert({
        slug,
        original_url: input.original_url,
        title: input.title || null,
        description: input.description || null,
        thumbnail_url: input.thumbnail_url || null,
        is_active: true
    }).select().single();

    if (error) {
        if (error.code === '23505') {
            throw new Error('Slug already exists. Please choose another one.');
        }
        throw new Error(error.message || 'Failed to create shortlink');
    }

    return data as ShortlinkRecord;
}

export async function updateShortlink(id: string, input: Partial<ShortlinkRecord>) {
    if (!supabase) {
        throw new Error('Supabase is not configured.');
    }

    const { data, error } = await supabase.from('shortlinks').update({
        ...input,
        updated_at: new Date().toISOString()
    }).eq('id', id).select().single();

    if (error) {
        if (error.code === '23505') {
            throw new Error('Slug already exists. Please choose another one.');
        }
        throw new Error(error.message || 'Failed to update shortlink');
    }

    return data as ShortlinkRecord;
}

export async function deleteShortlink(id: string) {
    if (!supabase) {
        throw new Error('Supabase is not configured.');
    }

    const { error } = await supabase.from('shortlinks').delete().eq('id', id);
    if (error) throw new Error(error.message || 'Failed to delete shortlink');
}

export async function incrementShortlinkClicks(slug: string) {
    if (!supabase) return null;
    const { data, error } = await supabase.rpc('increment_shortlink_clicks', { p_slug: slug });
    if (error) throw new Error(error.message || 'Failed to update clicks');
    return data as ShortlinkRecord | null;
}

export function buildShortUrl(slug: string) {
    return `${getBaseUrl().replace(/\/$/, '')}/${slug}`;
}
