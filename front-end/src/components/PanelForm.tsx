import React, { useState } from "react";
import { installPanel } from "../api";

export default function PanelForm() {
  const [domain, setDomain] = useState("");
  const [ssl, setSsl] = useState("yes");
  const [cfToken, setCfToken] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await installPanel({ domain, ssl, cloudflareToken: cfToken });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Installer le panel</h2>
        <p className="mt-1 text-sm text-slate-400">Renseigne le domaine si tu veux configurer le proxy Cloudflare ou le SSL.</p>
      </div>
      <input
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
        placeholder="Domaine (optionnel)"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <select
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
        value={ssl}
        onChange={(e) => setSsl(e.target.value)}
      >
        <option value="yes">SSL Let's Encrypt</option>
        <option value="no">Sans SSL</option>
      </select>
      <input
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
        placeholder="Cloudflare Tunnel Token (optionnel)"
        value={cfToken}
        onChange={(e) => setCfToken(e.target.value)}
      />
      <button
        type="submit"
        className="inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-emerald-400"
      >
        Lancer l'installation
      </button>
    </form>
  );
}
