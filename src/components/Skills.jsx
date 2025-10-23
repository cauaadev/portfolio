// components/Skills.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// Nível: 1 a 5 (1=iniciante, 3=intermediário, 5=avançado)
const levelLabel = (n) => (n >= 4 ? "Forte" : n === 3 ? "Intermediário" : "Iniciante/Explorando");
const levelColor = (n) =>
    n >= 4
        ? "from-emerald-400 to-emerald-500"
        : n === 3
            ? "from-amber-300 to-amber-400"
            : "from-sky-300 to-sky-400";

// Experiência total (em meses) quando informada
function getExpMonths(s) {
    if (typeof s.expMonths === "number") return s.expMonths;
    return 0;
}
function formatExp(months) {
    if (!months || months <= 0) return "";
    if (months < 12) return `${months} ${months === 1 ? "mês" : "meses"}`;
    const years = months / 12;
    const isInt = Number.isInteger(years);
    const str = isInt ? `${years}` : years.toFixed(1).replace(".", ",");
    return `${str} ${Number(str.replace(",", ".")) === 1 ? "ano" : "anos"}`;
}

// Dados fiéis ao que você informou (sem “último uso”)
const data = [
    {
        key: "backend",
        title: "Back-end",
        icon: "☕",
        items: [
            { name: "Java", level: 5, tags: ["OO"], verified: true },
            { name: "Spring Boot", level: 3, expMonths: 8, tags: ["REST"] },
            { name: "REST (APIs)", level: 3, expMonths: 8, tags: ["APIs"] },
            { name: "JPA/Hibernate", level: 3, expMonths: 8, tags: ["ORM"] },
            { name: "Maven", level: 3, expMonths: 6, tags: ["Build"] },
            { name: "Spring Security", level: 2, expMonths: 3, tags: ["Auth"], note: "Estudando" },
        ],
    },
    {
        key: "databases",
        title: "Bancos de Dados",
        icon: "🗄️",
        items: [
            { name: "SQL (modelagem/consultas)", level: 3, expMonths: 8, tags: ["SQL"] },
            { name: "MySQL", level: 3, expMonths: 8, tags: ["SQL"] },
        ],
    },
    {
        key: "frontend",
        title: "Front-end",
        icon: "⚛️",
        items: [
            { name: "JavaScript", level: 3, expMonths: 18, tags: ["ESNext"] },
            { name: "Tailwind", level: 3, tags: ["CSS"] },
        ],
    },
    {
        key: "realtime",
        title: "Tempo Real",
        icon: "💬",
        items: [{ name: "WebSocket", level: 2, expMonths: 1, tags: ["RT"] }],
    },
    {
        key: "devops",
        title: "DevOps & Cloud",
        icon: "⚙️",
        items: [
            { name: "Git & GitHub", level: 3, expMonths: 8, tags: ["VCS"], verified: true },
            { name: "Linux", level: 2, expMonths: 3, tags: ["CLI"] },
        ],
    },
    {
        key: "tools",
        title: "Ferramentas",
        icon: "🧰",
        items: [
            { name: "IntelliJ IDEA", level: 4, expMonths: 12, tags: ["IDE"] },
            { name: "VS Code", level: 3, expMonths: 18, tags: ["Editor"] },
            { name: "Postman", level: 3, expMonths: 7, tags: ["API"] },
        ],
    },
];

// Aprendendo/Explorando agora
const learning = [
    "AWS (estudando)",
    "CI/CD (explorando)",
    "Docker",
    "React",
    "Vite",
    "Framer Motion",
    "TypeScript",
    "Node.js",
    "Express",
    "Axios",
];

// Lê “stack atual” dos projetos já enriquecidos (sessionStorage)
function readRecentStackFromProjects() {
    const counts = new Map();
    for (let i = 0; i < sessionStorage.length; i++) {
        const k = sessionStorage.key(i);
        if (!k || !k.startsWith("repo:")) continue;
        try {
            const v = JSON.parse(sessionStorage.getItem(k));
            const tags = Array.isArray(v?.tags) ? v.tags : Array.isArray(v?.techs) ? v.techs : [];
            tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1));
        } catch {
            /* ignore */
        }
    }
    return Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([t]) => t);
}

export default function Skills() {
    const [view, setView] = useState("detailed"); // detailed | compact
    const [orderBy, setOrderBy] = useState("level"); // level | exp | az
    const [onlyStrong, setOnlyStrong] = useState(false); // nível >= 4
    const [search, setSearch] = useState("");
    const [collapsed, setCollapsed] = useState({});
    const [recentStack, setRecentStack] = useState([]);

    useEffect(() => {
        setRecentStack(readRecentStackFromProjects());
    }, []);

    const allItemsFlat = useMemo(() => {
        const out = [];
        data.forEach((g) =>
            g.items.forEach((s) =>
                out.push({
                    ...s,
                    _group: g.key,
                    _groupTitle: g.title,
                })
            )
        );
        return out;
    }, []);

    const metrics = useMemo(() => {
        const total = allItemsFlat.length;
        const strong = allItemsFlat.filter((s) => s.level >= 4).length;
        return { total, strong };
    }, [allItemsFlat]);

    const groups = useMemo(() => {
        const filterFn = (s) => {
            if (onlyStrong && s.level < 4) return false;
            if (search.trim()) {
                const q = search.trim().toLowerCase();
                const hay = `${s.name} ${levelLabel(s.level)} ${s.tags?.join(" ")} ${s.note || ""}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        };

        const sortFn = (a, b) => {
            if (orderBy === "az") return a.name.localeCompare(b.name, "pt-BR");
            if (orderBy === "exp") return getExpMonths(b) - getExpMonths(a) || b.level - a.level;
            return b.level - a.level || getExpMonths(b) - getExpMonths(a) || a.name.localeCompare(b.name, "pt-BR");
        };

        return data.map((g) => ({
            ...g,
            items: g.items.filter(filterFn).sort(sortFn),
        }));
    }, [onlyStrong, orderBy, search]);

    function exportJSON() {
        const payload = {
            generatedAt: new Date().toISOString(),
            viewConfig: { orderBy, onlyStrong },
            categories: data,
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "skills.json";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <section id="skills" className="scroll-mt-24 md:scroll-mt-28 py-24 px-6 bg-neutral-950/50 border-y border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
                Skills
              </span>
                        </h2>
                        <div className="mt-2 flex gap-2 text-xs text-neutral-300">
                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Total: {metrics.total}</span>
                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Forte: {metrics.strong}</span>
                        </div>
                    </div>

                    {/* Controles */}
                    <div className="flex flex-wrap gap-2 md:justify-end">
                        <div className="flex gap-1 p-1 rounded-xl bg-neutral-900/60 border border-white/10">
                            {["detailed", "compact"].map((v) => (
                                <button
                                    key={v}
                                    type="button"
                                    onClick={() => setView(v)}
                                    className={`text-xs px-3 py-1.5 rounded-lg ${
                                        view === v ? "bg-white/10 border border-white/10" : "text-neutral-300"
                                    }`}
                                >
                                    {v === "detailed" ? "Detalhado" : "Compacto"}
                                </button>
                            ))}
                        </div>

                        <select
                            value={orderBy}
                            onChange={(e) => setOrderBy(e.target.value)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900/60 border border-white/10"
                        >
                            <option value="level">Ordenar: Nível</option>
                            <option value="exp">Ordenar: Experiência</option>
                            <option value="az">Ordenar: A‑Z</option>
                        </select>

                        <label className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-neutral-900/60 border border-white/10 cursor-pointer">
                            <input type="checkbox" checked={onlyStrong} onChange={(e) => setOnlyStrong(e.target.checked)} />
                            Forte
                        </label>

                        <button
                            type="button"
                            onClick={exportJSON}
                            className="text-xs px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/10"
                            title="Exportar skills.json"
                        >
                            Exportar JSON
                        </button>
                    </div>
                </div>

                {/* Stack atual — detectada dos projetos */}
                {recentStack.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-sm text-neutral-300 mb-2">Stack atual (detectada dos projetos)</h3>
                        <div className="flex flex-wrap gap-2">
                            {recentStack.map((t) => (
                                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  {t}
                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Aprendendo agora */}
                <div className="mb-8">
                    <h3 className="text-sm text-neutral-300 mb-2">Aprendendo agora</h3>
                    <div className="flex flex-wrap gap-2">
                        {learning.map((t) => (
                            <span
                                key={t}
                                className="text-[11px] px-2.5 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-200"
                            >
                {t}
              </span>
                        ))}
                    </div>
                </div>

                {/* Busca */}
                <div className="mb-6">
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por skill, tag ou nível…"
                        className="w-full md:max-w-md px-4 py-2.5 rounded-xl bg-neutral-900/70 border border-white/10 text-sm outline-none focus:border-amber-400/60"
                    />
                </div>

                {/* Grupos */}
                <div className="grid gap-6">
                    {groups.map((g, gi) => (
                        <motion.div
                            key={g.key}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.4, delay: gi * 0.03 }}
                            className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 soft-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">
                                    <span className="mr-2">{g.icon}</span>
                                    {g.title}
                                    <span className="ml-2 text-xs text-neutral-400">({g.items.length})</span>
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setCollapsed((c) => ({ ...c, [g.key]: !c[g.key] }))}
                                    className="text-xs px-2 py-1 rounded-lg border border-white/10 hover:bg-white/10"
                                >
                                    {collapsed[g.key] ? "Expandir" : "Recolher"}
                                </button>
                            </div>

                            {!collapsed[g.key] && (
                                <>
                                    {view === "detailed" ? (
                                        <ul className="mt-4 grid md:grid-cols-2 gap-3">
                                            {g.items.map((s) => {
                                                const lvl = s.level;
                                                const exp = getExpMonths(s);
                                                const expText = formatExp(exp);
                                                return (
                                                    <li key={s.name} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <strong>{s.name}</strong>
                                                                    {s.verified && (
                                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-400/15 text-emerald-200 border border-emerald-400/30">
                                      verificado
                                    </span>
                                                                    )}
                                                                    {s.note && (
                                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-200 border border-amber-400/30">
                                      {s.note}
                                    </span>
                                                                    )}
                                                                </div>
                                                                <div className="text-xs text-neutral-400 mt-0.5">
                                                                    {expText ? `${expText} • ${levelLabel(lvl)}` : levelLabel(lvl)}
                                                                </div>
                                                            </div>
                                                            <div className="min-w-[120px]">
                                                                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                                                    <div
                                                                        className={`h-full bg-gradient-to-r ${levelColor(lvl)}`}
                                                                        style={{ width: `${(lvl / 5) * 100}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {s.tags?.length ? (
                                                            <div className="mt-3 flex flex-wrap gap-2">
                                                                {s.tags.map((t) => (
                                                                    <span
                                                                        key={`${s.name}-${t}`}
                                                                        className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10"
                                                                    >
                                    {t}
                                  </span>
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {g.items.map((s) => (
                                                <span
                                                    key={s.name}
                                                    className={`text-[11px] px-2.5 py-1 rounded-full border ${
                                                        s.level >= 4
                                                            ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-200"
                                                            : s.level === 3
                                                                ? "bg-amber-400/10 border-amber-400/30 text-amber-200"
                                                                : "bg-sky-400/10 border-sky-400/30 text-sky-200"
                                                    }`}
                                                    title={`${levelLabel(s.level)}${formatExp(getExpMonths(s)) ? " • " + formatExp(getExpMonths(s)) : ""}`}
                                                >
                          {s.name}
                        </span>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}