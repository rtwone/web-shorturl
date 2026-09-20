import { z } from 'zod';

export const urlSchema = z.string().trim().min(1, 'Original URL is required').url('Invalid URL').refine((value) => /^https?:\/\//i.test(value), 'Only HTTP and HTTPS URLs are allowed');

export const shortlinkFormSchema = z.object({
    original_url: urlSchema,
    slug: z.string().trim().optional().or(z.literal('')).refine((value) => !value || /^[a-zA-Z0-9-_]+$/.test(value), {
        message: 'Slug can only contain letters, numbers, hyphen, and underscore.'
    }),
    title: z.string().trim().optional(),
    description: z.string().trim().optional(),
    thumbnail_url: z.string().url().optional().or(z.literal(''))
});
