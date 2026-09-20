'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { CheckCircle2, Loader2, UploadCloud } from 'lucide-react';
import { shortlinkFormSchema } from '@/lib/validation';
import { buildShortUrl } from '@/lib/shortlinks';

type FormValues = {
    original_url: string;
    slug: string;
    title: string;
    description: string;
    thumbnail_url: string;
};

export default function CreatePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successUrl, setSuccessUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
        resolver: zodResolver(shortlinkFormSchema),
        defaultValues: {
            original_url: '',
            slug: '',
            title: '',
            description: '',
            thumbnail_url: ''
        }
    });

    async function onSubmit(values: FormValues) {
        setErrorMessage(null);
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/short', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            const payload = await res.json();
            if (!res.ok) {
                throw new Error(payload.error || 'Failed to create shortlink');
            }
            const fullUrl = buildShortUrl(payload.slug);
            setSuccessUrl(fullUrl);
            setPreview(null);
            setValue('slug', '');
            setValue('title', '');
            setValue('description', '');
            setValue('original_url', '');
            setValue('thumbnail_url', '');
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Failed to create shortlink');
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const allowed = ['image/png', 'image/jpeg', 'image/webp'];
        if (!allowed.includes(file.type)) {
            setErrorMessage('Only PNG, JPG, JPEG, and WEBP images are allowed.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setErrorMessage('Thumbnail must be under 5MB.');
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        setValue('thumbnail_url', url);
    };

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.2em] text-muted dark:text-darkmuted">Create</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight">Create Shortlink</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-[2rem] border border-black/10 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-darksurface sm:p-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label htmlFor="original_url">Original URL</label>
                        <input id="original_url" placeholder="https://example.com/very-long-url" {...register('original_url')} />
                        {errors.original_url && <p className="mt-2 text-sm text-red-600">{errors.original_url.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="slug">Custom Slug</label>
                        <input id="slug" placeholder="portfolio" {...register('slug')} />
                        {errors.slug && <p className="mt-2 text-sm text-red-600">{errors.slug.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="title">Title</label>
                        <input id="title" placeholder="Portfolio Irfan" {...register('title')} />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" rows={4} placeholder="Website portfolio dan project saya." {...register('description')} />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="thumbnail">Thumbnail</label>
                        <div className="flex items-center gap-4 rounded-xl border border-dashed border-black/15 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary shadow-soft dark:bg-darksurface">
                                <UploadCloud size={22} />
                            </div>
                            <input id="thumbnail" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} className="w-full border-0 bg-transparent p-0 text-sm" />
                        </div>
                        {preview && (
                            <div className="relative mt-4 h-40 w-full overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
                                <Image src={preview} alt="Thumbnail preview" fill className="object-cover" unoptimized />
                            </div>
                        )}
                    </div>
                </div>

                {errorMessage && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorMessage}</div>}

                {successUrl && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                        <div className="flex items-center gap-2 font-semibold"><CheckCircle2 size={17} /> Shortlink berhasil dibuat!</div>
                        <div className="mt-2 break-all">{successUrl}</div>
                    </div>
                )}

                <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black">
                    {isSubmitting ? <><Loader2 className="animate-spin" size={16} /> Creating...</> : 'Create Shortlink'}
                </button>
            </form>
        </div>
    );
}
