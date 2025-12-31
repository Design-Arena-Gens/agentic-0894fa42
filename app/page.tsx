'use client';

import { useMemo, useState } from 'react';
import TrendCard from '@/components/TrendCard';
import AgentPanel from '@/components/agents/AgentPanel';
import type { AgentInsight, TrendInsight } from '@/lib/types';

const defaultAgentInsights: AgentInsight[] = [
  {
    id: 'algorithmic-eye',
    label: 'Algorithmic Eye',
    description: 'Detects fast-rising search interest and velocity anomalies across topics.'
  },
  {
    id: 'creator-whisperer',
    label: 'Creator Whisperer',
    description: 'Highlights collaboration angles and format shifts top creators are testing.'
  },
  {
    id: 'monetization-maven',
    label: 'Monetization Maven',
    description: 'Surfaces niche trends with high RPM potential and sponsor demand.'
  }
];

export default function HomePage() {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([
    defaultAgentInsights[0].id,
    defaultAgentInsights[1].id
  ]);
  const [keyword, setKeyword] = useState('ai tools');
  const [region, setRegion] = useState('US');
  const [category, setCategory] = useState('28');
  const [daysBack, setDaysBack] = useState(7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<TrendInsight[] | null>(null);
  const [summary, setSummary] = useState('');

  const agentConfig = useMemo(
    () =>
      defaultAgentInsights.map((agent) => ({
        ...agent,
        active: selectedAgents.includes(agent.id)
      })),
    [selectedAgents]
  );

  const toggleAgent = (agentId: string) => {
    setSelectedAgents((prev) =>
      prev.includes(agentId) ? prev.filter((id) => id !== agentId) : [...prev, agentId]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword,
          region,
          category,
          daysBack,
          agents: selectedAgents
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? 'Failed to retrieve insights');
      }

      const data = (await response.json()) as { summary: string; insights: TrendInsight[] };
      setSummary(data.summary);
      setInsights(data.insights);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
      setInsights(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-24">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-16">
        <header className="space-y-6 rounded-3xl bg-slate-900/70 p-10 shadow-2xl ring-1 ring-white/10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Agentic YouTube Trend Scout
          </h1>
          <p className="max-w-3xl text-lg text-slate-300">
            Spin up specialized AI agents that watch emerging signals, cross-reference rapid view
            velocity, and translate the noise into clear opportunities you can act on before they go
            mainstream.
          </p>
          <AgentPanel agents={agentConfig} onToggle={toggleAgent} />
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 rounded-3xl bg-slate-900/70 p-8 shadow-2xl ring-1 ring-white/10 lg:grid-cols-3"
        >
          <div className="lg:col-span-2 grid gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wide text-slate-400">Focus keyword</span>
              <input
                className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-base text-white placeholder:text-slate-500"
                placeholder="ai tools, generative ai"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                required
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm uppercase tracking-wide text-slate-400">Region</span>
                <input
                  className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-base text-white placeholder:text-slate-500"
                  value={region}
                  onChange={(event) => setRegion(event.target.value.toUpperCase())}
                  maxLength={2}
                  required
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm uppercase tracking-wide text-slate-400">Category</span>
                <select
                  className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-base text-white"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="0">All</option>
                  <option value="1">Film &amp; Animation</option>
                  <option value="2">Autos &amp; Vehicles</option>
                  <option value="10">Music</option>
                  <option value="17">Sports</option>
                  <option value="20">Gaming</option>
                  <option value="22">People &amp; Blogs</option>
                  <option value="23">Comedy</option>
                  <option value="24">Entertainment</option>
                  <option value="25">News &amp; Politics</option>
                  <option value="26">Howto &amp; Style</option>
                  <option value="27">Education</option>
                  <option value="28">Science &amp; Technology</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wide text-slate-400">Lookback window</span>
              <input
                type="number"
                min={1}
                max={30}
                className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-base text-white placeholder:text-slate-500"
                value={daysBack}
                onChange={(event) => setDaysBack(Number(event.target.value))}
              />
            </label>
          </div>

          <aside className="flex flex-col gap-4 rounded-2xl bg-slate-950/60 p-6 ring-1 ring-white/5">
            <div className="space-y-3 text-sm text-slate-300">
              <h2 className="font-semibold text-white">Agent brief</h2>
              <p>
                Feed the swarm your target keyword, region, and timeframe. Agents will synthesize
                YouTube search interest, view velocity, and high-leverage opportunities.
              </p>
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-center text-base font-semibold text-slate-950 shadow-lg shadow-primary/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Generating intelligence…' : 'Deploy agent collective'}
            </button>
            {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          </aside>
        </form>

        {summary ? (
          <section className="grid gap-4 rounded-3xl bg-slate-900/70 p-8 shadow-2xl ring-1 ring-white/10">
            <h2 className="text-2xl font-semibold">Strategic Pulse</h2>
            <p className="text-slate-300 leading-relaxed">{summary}</p>
          </section>
        ) : null}

        {insights ? (
          <section className="grid gap-6 rounded-3xl bg-slate-900/70 p-8 shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Top Opportunities</h2>
              <span className="text-sm uppercase tracking-[0.2em] text-slate-400">
                {insights.length} signals
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {insights.map((item) => (
                <TrendCard key={item.videoId} insight={item} />
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
