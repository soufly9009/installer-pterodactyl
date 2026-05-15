type Props = { logs: string[] };

export default function LogsConsole({ logs }: Props) {
  return (
    <div className="h-[calc(100vh-10rem)] overflow-y-auto rounded-2xl border border-slate-800 bg-black/80 p-4 text-sm font-mono text-slate-200">
      {logs.length === 0 ? (
        <p className="text-slate-500">Aucun log pour le moment. Lance une installation pour voir la sortie ici.</p>
      ) : (
        logs.map((log, index) => (
          <div key={`${index}-${log.slice(0, 24)}`} className="whitespace-pre-wrap break-words leading-6 text-slate-200">
            {log}
          </div>
        ))
      )}
    </div>
  );
}
