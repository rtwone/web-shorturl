import { LucideIcon } from 'lucide-react';

export function StatsCard({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
    return (
        <div className="card-glass rounded-2xl p-4">
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
    );
}
