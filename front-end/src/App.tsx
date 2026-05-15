import React, { useEffect, useState } from "react";
import PanelForm from "./components/PanelForm";
import LogsConsole from "./components/LogsConsole";
import { io } from "socket.io-client";
import NodeForm from "./components/NodeForm";
const socket = io("http://localhost:4000");

export default function App() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    socket.on("logs:panel", (msg: string) => {
      setLogs((prev: string[]) => [...prev, msg]);
    });
    socket.on("logs:node", (msg: string) => {
      setLogs((prev: string[]) => [...prev, msg]);
    });
    return () => {
      socket.off("logs:panel");
      socket.off("logs:node");
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 p-6 lg:grid-cols-[420px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Pterodactyl</p>
            <h1 className="mt-2 text-3xl font-semibold">Installer</h1>
            <p className="mt-2 text-sm text-slate-300">
              Lance l'installation du panel ou d'un node Wings et suis la sortie en direct.
            </p>
          </div>
          <div className="space-y-6">
            <PanelForm />
            <div className="border-t border-slate-800 pt-6">
              <NodeForm />
            </div>
          </div>
        </aside>
        <main className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Logs en direct</h2>
              <p className="text-sm text-slate-400">Les sorties du backend apparaissent ici pendant l'installation.</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.9)]" />
          </div>
          <LogsConsole logs={logs} />
        </main>
      </div>
    </div>
  );
}
