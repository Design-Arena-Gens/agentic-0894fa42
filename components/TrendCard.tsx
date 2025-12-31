import Image from 'next/image';
import type { TrendInsight } from '@/lib/types';

interface TrendCardProps {
  insight: TrendInsight;
}

export default function TrendCard({ insight }: TrendCardProps) {
  return (
    <article className="group grid grid-cols-[120px,1fr] gap-4 rounded-2xl bg-slate-950/70 p-4 ring-1 ring-white/5 transition hover:-translate-y-1 hover:ring-primary/50 sm:grid-cols-[160px,1fr]">
      <div className="relative h-24 w-full overflow-hidden rounded-xl sm:h-32">
        {insight.thumbnail ? (
          <Image
            src={insight.thumbnail}
            alt={insight.title}
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-400">
            no thumbnail
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-primary">
          {insight.agentLabel}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <header className="space-y-1">
          <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
          <p className="text-sm text-slate-400">{insight.channelTitle}</p>
        </header>

        <p className="text-sm leading-relaxed text-slate-300">{insight.narrative}</p>

        <dl className="grid grid-cols-2 gap-2 text-xs text-slate-400">
          <div className="rounded-lg bg-slate-900/80 px-3 py-2">
            <dt className="uppercase tracking-wide text-[0.65rem] text-slate-500">Velocity</dt>
            <dd className="font-semibold text-white">{insight.viewVelocity}</dd>
          </div>
          <div className="rounded-lg bg-slate-900/80 px-3 py-2">
            <dt className="uppercase tracking-wide text-[0.65rem] text-slate-500">Projected RPM</dt>
            <dd className="font-semibold text-white">{insight.monetizationPotential}</dd>
          </div>
          <div className="rounded-lg bg-slate-900/80 px-3 py-2">
            <dt className="uppercase tracking-wide text-[0.65rem] text-slate-500">Search Surge</dt>
            <dd className="font-semibold text-white">{insight.searchDifferential}</dd>
          </div>
          <div className="rounded-lg bg-slate-900/80 px-3 py-2">
            <dt className="uppercase tracking-wide text-[0.65rem] text-slate-500">Suggested Action</dt>
            <dd className="font-semibold text-primary">{insight.actionStep}</dd>
          </div>
        </dl>

        <footer className="flex items-center justify-between text-xs text-slate-400">
          <span>Published {insight.publishedAt}</span>
          {insight.videoUrl ? (
            <a
              href={insight.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold transition hover:border-primary hover:text-primary"
            >
              View video
            </a>
          ) : null}
        </footer>
      </div>
    </article>
  );
}
