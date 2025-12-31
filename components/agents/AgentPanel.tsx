import clsx from 'clsx';

interface AgentPanelProps {
  agents: { id: string; label: string; description: string; active: boolean }[];
  onToggle: (id: string) => void;
}

export default function AgentPanel({ agents, onToggle }: AgentPanelProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {agents.map((agent) => (
        <button
          key={agent.id}
          type="button"
          onClick={() => onToggle(agent.id)}
          className={clsx(
            'group h-full rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-left transition hover:border-primary/80 hover:shadow-lg hover:shadow-primary/20',
            agent.active && 'border-primary/60 bg-slate-950/90 shadow-lg shadow-primary/30'
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-[0.2rem] text-slate-400">
              {agent.label}
            </span>
            <span
              className={clsx(
                'inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-xs font-semibold transition',
                agent.active
                  ? 'bg-primary text-slate-950 border-primary'
                  : 'bg-slate-900 text-slate-400 group-hover:text-white'
              )}
            >
              {agent.active ? 'ON' : 'OFF'}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{agent.description}</p>
        </button>
      ))}
    </div>
  );
}
