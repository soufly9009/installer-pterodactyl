import React, { useState } from "react";
import { installNode } from "../api";

export default function NodeForm() {
  const [nodeName, setNodeName] = useState("");
  const [cfToken, setCfToken] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nodeName) return;
    await installNode({ nodeName, cloudflareToken: cfToken });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Installer un node Wings</h2>
        <p className="mt-1 text-sm text-slate-400">Le nom du node sert aussi à générer les services systemd.</p>
      </div>
      <input
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
        placeholder="Nom du node (ex: node-1)"
        value={nodeName}
        onChange={(e) => setNodeName(e.target.value)}
      />
      <input
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
        placeholder="Cloudflare Tunnel Token (optionnel)"
        value={cfToken}
        onChange={(e) => setCfToken(e.target.value)}
      />
      <button
        type="submit"
        className="inline-flex items-center rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white transition hover:bg-indigo-400"
      >
        Installer le node
      </button>
    </form>
  );
}
