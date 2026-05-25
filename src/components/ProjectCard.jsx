// components/ProjectCard.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const statusStyle = {
    "Em desenvolvimento": "bg-amber-400/15 text-amber-300 border-amber-400/30",
    "Estável": "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
    "Arquivado": "bg-neutral-500/15 text-neutral-300 border-neutral-400/30",
};

function formatDate(iso) {
    try {
        return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(iso));
    } catch {
        return "";
    }
}

export default function ProjectCard({
                                        title,
                                        description,
                                        tags = [],
                                        repo,
                                        demo,
                                        image,
                                        status = "Estável",
                                        stars = 0,
                                        updatedAt = "",
                                    }) {
    const LIMIT = 220;
    const [expanded, setExpanded] = useState(false);
    const isLong = (description || "").length > LIMIT;
    const shortText = useMemo(() => {
        if (!description) return "";
        return isLong ? description.slice(0, LIMIT).trimEnd() + "…" : description;
    }, [description, isLong]);

    return (
        <motion.article
            className="group rounded-2xl overflow-hidden bg-neutral-900/60 border border-white/10 soft-shadow"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -6 }}
            transition={{ type: "tween" }}
        >
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={image}
                    alt={`Capa do projeto ${title}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-[var(--ease-standard)] group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <span className={`text-[11px] px-2 py-1 rounded-full border ${statusStyle[status] || statusStyle["Estável"]}`}>
            {status}
          </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-300/90 mb-3">
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10">★ {stars}</span>
                    {updatedAt ? (
                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10">
              Atualizado em {formatDate(updatedAt)}
            </span>
                    ) : null}
                </div>

                <p className="text-sm text-neutral-300 mb-3">{expanded ? description : shortText}</p>
                {isLong && (
                    <button
                        type="button"
                        onClick={() => setExpanded((s) => !s)}
                        className="text-xs text-amber-300 hover:underline"
                    >
                        {expanded ? "ver menos" : "ver mais"}
                    </button>
                )}

                {tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 mb-4">
                        {tags.map((t) => (
                            <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10">
                {t}
              </span>
                        ))}
                    </div>
                )}

                <div className="flex gap-2">
                    <a
                        href={repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/10 transition text-sm"
                    >
                        Repositório
                    </a>
                    {demo ? (
                        <a
                            href={demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400 text-black hover:shadow-[0_0_24px_rgba(251,191,36,0.5)] transition text-sm"
                        >
                            Demo
                        </a>
                    ) : null}
                </div>
            </div>
        </motion.article>
    );
}