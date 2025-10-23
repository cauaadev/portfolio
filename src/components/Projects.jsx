import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const USERNAME = "cauaadev";
const EXCLUDED = new Set([USERNAME.toLowerCase(), "portfolio"]);
const PREFERRED = ["biblioteca-springboot", "sistemaBancarioSimples", "TimerJS", "echo"];

// Cache local de lista e itens enriquecidos
const CACHE_ITEMS = "projects:items:v2";
const CACHE_ETAG = "projects:repos:etag:v1";
const CACHE_BODY = "projects:repos:body:v1";

// Curadoria
const CURATED = {
  "biblioteca-springboot": {
    title: "📚 Biblioteca Spring Boot",
    status: "Estável",
    tags: ["Spring Boot", "Java", "REST", "PostgreSQL"],
    demo: "",
  },
  sistemaBancarioSimples: {
    title: "🏦 Sistema Bancário",
    status: "Estável",
    tags: ["Java", "JUnit", "OO"],
    demo: "",
  },
  TimerJS: {
    title: "⏲️ TimerJS",
    status: "Estável",
    tags: ["JavaScript", "HTML", "CSS"],
    demo: "",
  },
  echo: {
    title: "💬 Chat ao vivo (Echo)",
    status: "Em desenvolvimento",
    tags: ["WebSocket/Socket.IO", "Node.js", "Express", "React", "Vite", "Tailwind"],
    demo: "",
  },
};

function buildHeaders() {
  const token = (localStorage.getItem("GH_TOKEN") || "").trim();
  const headers = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

// Corrige acentuação: decodifica Base64 em UTF‑8 corretamente
function b64ToUtf8(b64) {
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (ch) => ch.charCodeAt(0));
  try {
    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    // Fallback para navegadores muito antigos
    let esc = "";
    for (let i = 0; i < bin.length; i++) esc += "%" + ("00" + bin.charCodeAt(i).toString(16)).slice(-2);
    try {
      return decodeURIComponent(esc);
    } catch {
      return bin;
    }
  }
}

function coverFromTitle(title = "Projeto", slug = "") {
  const safeTitle = String(title).slice(0, 48);
  const lower = safeTitle.toLowerCase();
  const hash = [...(safeTitle + slug)].reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
  const idx = Math.abs(hash) % 6;
  const palettes = [
    ["#0ea5e9", "#22d3ee"],
    ["#a78bfa", "#f472b6"],
    ["#f59e0b", "#ef4444"],
    ["#34d399", "#06b6d4"],
    ["#f97316", "#f43f5e"],
    ["#84cc16", "#22c55e"],
  ];
  const [c1, c2] = palettes[idx];

  let emoji = "🧩";
  if (lower.match(/biblio|livr/)) emoji = "📚";
  else if (lower.match(/bank|banco|finan/)) emoji = "🏦";
  else if (lower.match(/timer|cron|tempo|clock/)) emoji = "⏲️";
  else if (lower.match(/spring/)) emoji = "🌱";
  else if (lower.match(/java/)) emoji = "☕";
  else if (lower.match(/api/)) emoji = "🛠️";
  else if (lower.match(/chat|echo/)) emoji = "💬";

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#g)"/>
      <circle cx="1250" cy="150" r="260" fill="rgba(255,255,255,0.08)"/>
      <circle cx="300" cy="700" r="220" fill="rgba(0,0,0,0.15)"/>
      <text x="50%" y="46%" dominant-baseline="middle" text-anchor="middle" font-size="320"> ${emoji} </text>
      <g opacity="0.95">
        <rect x="40" y="760" width="1520" height="120" rx="16" fill="rgba(0,0,0,0.22)"/>
        <text x="70" y="835" font-size="64" fill="#fff" font-family="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif">
          ${safeTitle.replace(/&/g, "&amp;")}
        </text>
      </g>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// NOVA ordenação: mais recentes primeiro (pushed/updated), depois estrelas, depois “destaques”
function sortProjects(a, b) {
  const dateDiff = new Date(b.updatedAt) - new Date(a.updatedAt);
  if (dateDiff !== 0) return dateDiff;

  const starDiff = (b.stars || 0) - (a.stars || 0);
  if (starDiff !== 0) return starDiff;

  const ai = PREFERRED.indexOf(a.slug);
  const bi = PREFERRED.indexOf(b.slug);
  if (ai !== -1 || bi !== -1) {
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  }
  return a.slug.localeCompare(b.slug, "pt-BR");
}

function statusFromRepo(slug, repo) {
  if (CURATED[slug]?.status) return CURATED[slug].status;
  if (repo.archived) return "Arquivado";
  const days = (Date.now() - new Date(repo.pushed_at || repo.updated_at || repo.created_at).getTime()) / 86400000;
  if (days <= 30) return "Em desenvolvimento";
  return "Estável";
}

function parseTechsFromReadme(md = "") {
  const text = (md || "").toLowerCase();
  const list = new Set();
  if (/\bjava\b/.test(text) && !/\bjavascript\b/.test(text)) list.add("Java");
  const rules = [
    [/spring\s*boot|spring-boot/, "Spring Boot"],
    [/jpa|hibernate/, "JPA/Hibernate"],
    [/postgres|postgresql/, "PostgreSQL"],
    [/mysql/, "MySQL"],
    [/mariadb/, "MariaDB"],
    [/mongodb/, "MongoDB"],
    [/jwt|json web token/, "JWT"],
    [/junit/, "JUnit"],
    [/maven/, "Maven"],
    [/gradle/, "Gradle"],
    [/docker/, "Docker"],
    [/kubernetes|k8s/, "Kubernetes"],
    [/aws|amazon web services/, "AWS"],
    [/react\b/, "React"],
    [/next\.?js/, "Next.js"],
    [/vite\b/, "Vite"],
    [/tailwind/, "Tailwind"],
    [/typescript|ts\b/, "TypeScript"],
    [/\bjavascript|js\b/, "JavaScript"],
    [/node\.?js|nodejs/, "Node.js"],
    [/express\b/, "Express"],
    [/socket\.io|websocket|ws\b/, "WebSocket/Socket.IO"],
    [/axios\b/, "Axios"],
    [/prisma\b/, "Prisma"],
    [/sequelize\b/, "Sequelize"],
    [/swagger|openapi/, "OpenAPI/Swagger"],
    [/redis\b/, "Redis"],
    [/zod\b/, "Zod"],
    [/jest|vitest/, "Tests"],
  ];
  for (const [re, label] of rules) if (re.test(text)) list.add(label);
  return Array.from(list);
}

function extractDescriptionFromReadme(md = "") {
  if (!md) return "";
  let txt = md
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`[^`]*`/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/!\[[^\]]*]\([^)]+\)/g, " ");
  txt = txt.replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1");
  txt = txt.replace(/^\s*#+\s.*$/gm, " ");
  txt = txt.replace(/shields\.io|badge|ci\/cd|build/i, " ");

  const paras = txt
      .split(/\n{2,}/g)
      .map((p) => p.replace(/\s+/g, " ").trim())
      .filter((p) => p.length > 30);

  if (!paras.length) return "";
  const keywords = [
    "spring",
    "java",
    "api",
    "rest",
    "banco",
    "finance",
    "postgres",
    "mysql",
    "jpa",
    "hibernate",
    "jwt",
    "timer",
    "javascript",
    "node",
    "socket",
    "websocket",
    "react",
  ];
  const score = (p) => keywords.reduce((acc, k) => acc + (p.toLowerCase().includes(k) ? 1 : 0), 0);
  let chosen = paras
      .map((p) => ({ p, s: score(p) }))
      .sort((a, b) => b.s - a.s || b.p.length - a.p.length)[0].p;

  if (chosen.length > 240) chosen = chosen.slice(0, 236).trimEnd() + "…";
  return chosen;
}

async function fetchRepoFile(username, slug, path) {
  const headers = buildHeaders();
  const res = await fetch(`https://api.github.com/repos/${username}/${slug}/contents/${path}`, { headers });
  if (!res.ok) throw new Error("no-file");
  const data = await res.json();
  const b64 = String(data.content || "").replace(/\n/g, "");
  return b64ToUtf8(b64);
}

async function detectTechsFromFiles(username, repo) {
  const slug = repo.name;
  const lang = (repo.language || "").toLowerCase();
  const set = new Set();
  try {
    if (lang.includes("javascript") || lang.includes("typescript")) {
      const pkg = await fetchRepoFile(username, slug, "package.json");
      const json = JSON.parse(pkg);
      const deps = { ...(json.dependencies || {}), ...(json.devDependencies || {}) };
      const has = (k) => Object.prototype.hasOwnProperty.call(deps, k);
      if (has("react")) set.add("React");
      if (has("next")) set.add("Next.js");
      if (has("vite")) set.add("Vite");
      if (has("typescript")) set.add("TypeScript");
      if (has("tailwindcss")) set.add("Tailwind");
      if (has("framer-motion")) set.add("Framer Motion");
      if (has("express")) set.add("Express");
      if (has("socket.io") || has("ws")) set.add("WebSocket/Socket.IO");
      if (has("axios")) set.add("Axios");
      if (has("prisma")) set.add("Prisma");
      if (has("sequelize")) set.add("Sequelize");
      if (has("zod")) set.add("Zod");
      if (has("jest") || has("vitest")) set.add("Tests");
      set.add("Node.js");
    } else if (lang.includes("java")) {
      let text = "";
      try {
        text = await fetchRepoFile(username, slug, "pom.xml");
      } catch {
        try {
          text = await fetchRepoFile(username, slug, "build.gradle");
        } catch {
          text = await fetchRepoFile(username, slug, "build.gradle.kts");
        }
      }
      const addIf = (re, label) => {
        if (re.test(text)) set.add(label);
      };
      addIf(/spring-boot/i, "Spring Boot");
      addIf(/hibernate|jpa/i, "JPA/Hibernate");
      addIf(/postgresql/i, "PostgreSQL");
      addIf(/mysql/i, "MySQL");
      addIf(/mariadb/i, "MariaDB");
      addIf(/mongodb/i, "MongoDB");
      addIf(/jjwt|jwt/i, "JWT");
      addIf(/lombok/i, "Lombok");
      addIf(/springdoc|swagger|openapi/i, "OpenAPI/Swagger");
      addIf(/maven/i, "Maven");
      addIf(/gradle/i, "Gradle");
      set.add("Java");
    }
  } catch {
    /* ignore */
  }
  return Array.from(set);
}

async function enrich(items, username) {
  const token = (localStorage.getItem("GH_TOKEN") || "").trim();
  const MAX = token ? 12 : 6; // menos chamadas extra sem token
  const head = items.slice(0, MAX);
  const tail = items.slice(MAX);

  const headers = buildHeaders();

  const enriched = await Promise.all(
      head.map(async (it) => {
        const cacheKey = `repo:${username}:${it.slug}:${it.updatedAt}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          return { ...it, ...parsed };
        }
        let description = it.description;
        let techs = new Set(it.tags || []);
        try {
          const res = await fetch(`https://api.github.com/repos/${username}/${it.slug}/readme`, { headers });
          if (res.ok) {
            const data = await res.json();
            const md = b64ToUtf8(String(data.content || "").replace(/\n/g, ""));
            const fromMd = extractDescriptionFromReadme(md);
            const mdTechs = parseTechsFromReadme(md);
            if (fromMd) description = fromMd;
            mdTechs.forEach((t) => techs.add(t));
          }
        } catch {}
        try {
          const fileTechs = await detectTechsFromFiles(username, it._rawRepo);
          fileTechs.forEach((t) => techs.add(t));
        } catch {}
        const merged = {
          ...it,
          description,
          tags: Array.from(techs).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 10),
        };
        sessionStorage.setItem(cacheKey, JSON.stringify({ description: merged.description, tags: merged.tags }));
        return merged;
      })
  );
  return [...enriched, ...tail];
}

export default function Projects() {
  const [items, setItems] = useState([]);
  const [state, setState] = useState({ loading: true, error: "" });
  const [query, setQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState([]);

  // Mostra cache imediatamente, atualiza em background
  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_ITEMS) || "null");
      if (cached?.items?.length) {
        setItems(cached.items);
        setState({ loading: true, error: "" });
      }
    } catch {}
  }, []);

  async function fetchReposWithETag() {
    const headers = buildHeaders();
    const url = `https://api.github.com/users/${USERNAME}/repos?per_page=100`;

    const h = new Headers(headers);
    const etag = localStorage.getItem(CACHE_ETAG);
    if (etag) h.set("If-None-Match", etag);

    const res = await fetch(url, { headers: h });

    if (res.status === 304) {
      const body = localStorage.getItem(CACHE_BODY);
      if (!body) throw new Error("Sem cache local");
      return JSON.parse(body);
    }
    if (res.status === 403) {
      const remaining = res.headers.get("x-ratelimit-remaining");
      const reset = res.headers.get("x-ratelimit-reset");
      const resetIn = reset ? Math.max(0, Number(reset) * 1000 - Date.now()) : 0;
      const mins = Math.ceil(resetIn / 60000);
      throw new Error(remaining === "0" ? `Limite de requisições atingido. Tente novamente em ~${mins} min.` : "Acesso negado pela API do GitHub.");
    }
    if (!res.ok) throw new Error(`GitHub API: ${res.status}`);

    const text = await res.text();
    const newEtag = res.headers.get("etag");
    if (newEtag) localStorage.setItem(CACHE_ETAG, newEtag);
    localStorage.setItem(CACHE_BODY, text);
    return JSON.parse(text);
  }

  async function loadRepos() {
    try {
      setState((s) => ({ ...s, error: "" }));
      const repos = await fetchReposWithETag();

      const normalized = repos
          .filter((r) => !r.fork && !r.archived && !EXCLUDED.has(r.name.toLowerCase()))
          .map((r) => {
            const slug = r.name;
            const curated = CURATED[slug] || {};
            const title = curated.title || r.name;
            return {
              slug,
              title,
              status: curated.status || statusFromRepo(slug, r),
              description: r.description || "Projeto sem descrição informada.",
              tags: curated.tags || [],
              repo: r.html_url,
              demo: curated.demo || r.homepage || "",
              image: curated.image || coverFromTitle(title, slug),
              stars: r.stargazers_count || 0,
              updatedAt: r.pushed_at || r.updated_at || r.created_at,
              _rawRepo: r,
            };
          })
          .sort(sortProjects); // já garante "mais recentes primeiro"

      const enriched = await enrich(normalized, USERNAME);
      setItems(enriched);
      setState({ loading: false, error: "" });
      localStorage.setItem(CACHE_ITEMS, JSON.stringify({ items: enriched, savedAt: Date.now() }));
    } catch (err) {
      const cached = JSON.parse(localStorage.getItem(CACHE_ITEMS) || "null");
      if (cached?.items?.length) {
        setItems(cached.items);
      }
      setState({
        loading: false,
        error: (err && err.message) || "Não foi possível carregar agora. Exibindo dados em cache (se disponíveis).",
      });
    }
  }

  useEffect(() => {
    let mounted = true;
    loadRepos().finally(() => {
      if (mounted) setState((s) => ({ ...s, loading: false }));
    });
    return () => {
      mounted = false;
    };
  }, []);

  function setToken() {
    const t = prompt("Cole seu token do GitHub (PAT) para aumentar o limite de requisições:");
    if (t) {
      localStorage.setItem("GH_TOKEN", t.trim());
      loadRepos();
    }
  }

  const availableTechs = useMemo(() => {
    const set = new Set();
    items.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((p) => {
      const matchesQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchesTechs =
          selectedTechs.length === 0 || selectedTechs.every((t) => (p.tags || []).includes(t));
      return matchesQuery && matchesTechs;
    });
  }, [items, query, selectedTechs]);

  const toggleTech = (t) =>
      setSelectedTechs((curr) => (curr.includes(t) ? curr.filter((x) => x !== t) : [...curr, t]));

  return (
      <section id="projetos" className="scroll-mt-24 md:scroll-mt-28 py-28 px-6 bg-black/30 backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">Projetos</span>
        </h2>

        {state.error && (
            <div className="max-w-6xl mx-auto mb-6">
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between px-4 py-3 rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-200">
                <p className="text-sm">{state.error}</p>
                <div className="flex gap-2">
                  <button
                      type="button"
                      onClick={loadRepos}
                      className="text-sm px-3 py-1.5 rounded-lg border border-amber-400/40 hover:bg-amber-400/20"
                  >
                    Tentar novamente
                  </button>
                  <button
                      type="button"
                      onClick={setToken}
                      className="text-sm px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10"
                      title="Aumente o limite de requisições com um token pessoal (PAT)"
                  >
                    Definir token
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* Busca e filtros */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <input
                type="search"
                placeholder="Buscar por nome, descrição ou tecnologia…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full md:max-w-md px-4 py-2.5 rounded-xl bg-neutral-900/70 border border-white/10 text-sm outline-none focus:border-amber-400/60"
            />
            <div className="flex flex-wrap gap-2">
              {availableTechs.slice(0, 16).map((t) => (
                  <button
                      key={t}
                      type="button"
                      onClick={() => toggleTech(t)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border ${
                          selectedTechs.includes(t)
                              ? "bg-amber-400/20 border-amber-400/40 text-amber-200"
                              : "bg-white/5 border-white/10 text-neutral-200"
                      }`}
                  >
                    {t}
                  </button>
              ))}
              {availableTechs.length > 16 ? (
                  <span className="text-xs text-neutral-400">+{availableTechs.length - 16} mais</span>
              ) : null}
            </div>
            {selectedTechs.length > 0 && (
                <button
                    type="button"
                    onClick={() => setSelectedTechs([])}
                    className="text-sm ml-auto px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/10"
                >
                  Limpar filtros
                </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {state.loading && items.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                      key={`s-${i}`}
                      className="animate-pulse bg-neutral-900/60 border border-white/10 rounded-2xl overflow-hidden"
                  >
                    <div className="aspect-video bg-neutral-800" />
                    <div className="p-5 space-y-3">
                      <div className="h-5 w-2/3 bg-white/10 rounded" />
                      <div className="h-4 w-11/12 bg-white/10 rounded" />
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-white/10 rounded-full" />
                        <div className="h-6 w-20 bg-white/10 rounded-full" />
                      </div>
                    </div>
                  </div>
              ))
              : filtered.map((p, i) => (
                  <motion.div
                      key={p.slug}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: i * 0.04 }}
                  >
                    <ProjectCard
                        title={p.title}
                        description={p.description}
                        tags={p.tags}
                        repo={p.repo}
                        demo={p.demo}
                        image={p.image}
                        status={p.status}
                        stars={p.stars}
                        updatedAt={p.updatedAt}
                    />
                  </motion.div>
              ))}
        </div>

        {!state.loading && filtered.length === 0 && (
            <p className="text-center text-neutral-300 mt-8">
              Nenhum projeto encontrado para os filtros/busca atuais.
            </p>
        )}
      </section>
  );
}