import React from "react";

const PROJECT = {
  title: "Sistema de Gestão para Clínicas e Terapeutas",
  description: "Sistema desktop que substitui papel e planilha. Guarda sessões, histórico dos pacientes, e gera laudo em PDF ou Word com um clique. Feito pra clínicas e psicólogos autônomos.",
  benefits: [
    "Laudo pronto em segundos",
    "Histórico do paciente num lugar só",
    "Documento sai pronto em PDF ou Word",
  ],
  repo: "https://github.com/cauaadev/geradorDeRelatorios",
};

export default function Projects() {
  return (
    <section id="projetos" style={{ scrollMarginTop:"6rem", padding:"6rem 1.5rem", background:"var(--section-alt)" }}>
      <div style={{ maxWidth:"72rem", margin:"0 auto" }}>
        <div style={{ marginBottom:"3rem" }}>
          <p style={{ color:"var(--accent)", fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.875rem" }}>Projeto</p>
          <h2 style={{ fontSize:"clamp(2rem, 4vw, 3rem)", fontWeight:700, lineHeight:1.15, letterSpacing:"-0.02em" }}>O que já entreguei</h2>
        </div>

        <article style={{ borderRadius:"12px", border:"1px solid var(--border)", background:"var(--card-bg)", maxWidth:"640px", padding:"2rem" }}>
          <h3 style={{ fontWeight:600, fontSize:"1.15rem", color:"var(--text)", marginBottom:"1rem", lineHeight:1.3 }}>{PROJECT.title}</h3>
          <p style={{ fontSize:"0.95rem", color:"var(--text-muted)", marginBottom:"1.5rem" }}>{PROJECT.description}</p>
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"0.625rem", marginBottom:"2rem" }}>
            {PROJECT.benefits.map(b => (
              <li key={b} style={{ display:"flex", alignItems:"center", gap:"0.625rem", fontSize:"0.9rem", color:"var(--text-muted)" }}>
                <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"var(--accent)", flexShrink:0 }} />
                {b}
              </li>
            ))}
          </ul>
          <a href={PROJECT.repo} target="_blank" rel="noreferrer"
            style={{ padding:"0.6rem 1.25rem", borderRadius:"8px", border:"1px solid var(--border-strong)", color:"var(--text-muted)", fontSize:"0.85rem", textDecoration:"none", transition:"all 0.2s", display:"inline-block" }}
            onMouseEnter={e => { e.target.style.borderColor="var(--accent)"; e.target.style.color="var(--accent)"; }}
            onMouseLeave={e => { e.target.style.borderColor="var(--border-strong)"; e.target.style.color="var(--text-muted)"; }}>
            Ver no GitHub →
          </a>
        </article>
      </div>
    </section>
  );
}
