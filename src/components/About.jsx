import React, { useState } from "react";

const projects = [
  {
    id: "gerador",
    name: "Gerador de Relatórios",
    status: "em uso na Hori Consultoria",
    description: "Sistema desktop pra clínicas e psicólogos autônomos. Gera laudo em PDF ou Word a partir das sessões.",
    repos: [
      { label: "Código", url: "https://github.com/cauaadev/geradorDeRelatorios" },
    ],
    shots: [
      { src: "/screenshots/gerar-relatorio.jpeg", caption: "Tela de gerar laudo a partir dos dados da sessão." },
      { src: "/screenshots/historico.jpeg", caption: "Histórico dos relatórios já emitidos, com filtros." },
      { src: "/screenshots/pacientes.jpeg", caption: "Cadastro de paciente com diagnóstico e CID." },
    ],
  },
  {
    id: "barbearia",
    name: "Sistema de Barbearia",
    status: "em desenvolvimento",
    description: "Painel web pra barbearia. Gerencia agenda, serviços, equipe e clientes. Frontend em React, backend em Java/Spring.",
    repos: [
      { label: "Frontend", url: "https://github.com/cauaadev/frontEndBarberShop" },
      { label: "Backend", url: "https://github.com/cauaadev/backendBarberShop" },
    ],
    shots: [
      { src: "/screenshots/barbearia-dashboard.jpeg", caption: "Dashboard com agendamentos, clientes e serviços do dia." },
      { src: "/screenshots/barbearia-agenda.jpeg", caption: "Lista de agendamentos com status e ações rápidas." },
      { src: "/screenshots/barbearia-servicos.jpeg", caption: "Catálogo de serviços com preço e descrição." },
    ],
  },
];

export default function About() {
  const [activeId, setActiveId] = useState("gerador");
  const active = projects.find(p => p.id === activeId);

  return (
    <section id="sobre" style={{ scrollMarginTop:"6rem", padding:"6rem 1.5rem" }}>
      <div style={{ maxWidth:"72rem", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"4rem", alignItems:"start" }}>
          <div>
            <p style={{ color:"var(--accent)", fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.875rem" }}>Sobre</p>
            <h2 style={{ fontSize:"clamp(2rem, 4vw, 3rem)", fontWeight:700, lineHeight:1.15, letterSpacing:"-0.02em", marginBottom:"2rem" }}>
              Desenvolvedor de software.<br />
              <em style={{ color:"var(--accent)", fontStyle:"italic", fontWeight:400 }}>Você descreve, eu construo.</em>
            </h2>
            <p style={{ color:"var(--text-muted)", fontSize:"1rem", marginBottom:"1.5rem" }}>
              Trabalho com empresas pequenas e médias, de qualquer ramo. Faço sistema pra controlar agenda, organizar cadastro, gerar documento, ou automatizar tarefa que toma seu tempo toda semana.
            </p>
            <p style={{ color:"var(--text-muted)", fontSize:"1rem", marginBottom:"2.5rem" }}>
              Você não precisa entender de tecnologia. Só precisa saber o que quer resolver.
            </p>
            <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
              {[["LinkedIn","https://www.linkedin.com/in/cauadiniz/"],["GitHub","https://github.com/cauaadev"],["Currículo","/src/assets/Curriculo_Caua_Diniz.pdf"]].map(([label,href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  style={{ padding:"0.6rem 1.25rem", borderRadius:"8px", border:"1px solid var(--border-strong)", color:"var(--text-muted)", textDecoration:"none", fontSize:"0.85rem", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.target.style.borderColor="var(--accent)"; e.target.style.color="var(--accent)"; }}
                  onMouseLeave={e => { e.target.style.borderColor="var(--border-strong)"; e.target.style.color="var(--text-muted)"; }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
            <div role="tablist" style={{ display:"flex", gap:"0.5rem", padding:"0.25rem", border:"1px solid var(--border)", borderRadius:"10px", background:"var(--card-bg)", width:"fit-content" }}>
              {projects.map(p => {
                const isActive = p.id === activeId;
                return (
                  <button key={p.id} role="tab" aria-selected={isActive} onClick={() => setActiveId(p.id)}
                    style={{
                      padding:"0.5rem 1rem", borderRadius:"7px", border:"none", cursor:"pointer",
                      fontSize:"0.82rem", fontWeight:500, transition:"all 0.15s",
                      background: isActive ? "var(--accent)" : "transparent",
                      color: isActive ? "white" : "var(--text-muted)",
                    }}>
                    {p.name}
                  </button>
                );
              })}
            </div>

            <p style={{ fontSize:"0.78rem", color:"var(--text-subtle)", letterSpacing:"0.04em" }}>
              {active.name} · {active.status}
            </p>

            <p style={{ fontSize:"0.95rem", color:"var(--text-muted)" }}>
              {active.description}
            </p>

            {active.shots.length > 0 ? (
              <>
                <a href={active.repos[0].url} target="_blank" rel="noreferrer"
                  style={{ display:"block", borderRadius:"12px", overflow:"hidden", border:"1px solid var(--border)", background:"var(--card-bg)", transition:"border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor="var(--accent)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor="var(--border)"}>
                  <img src={active.shots[0].src} alt={active.shots[0].caption} loading="lazy"
                    style={{ width:"100%", height:"auto", display:"block" }} />
                  <div style={{ padding:"0.75rem 1rem", fontSize:"0.78rem", color:"var(--text-muted)", borderTop:"1px solid var(--border)" }}>
                    {active.shots[0].caption}
                  </div>
                </a>

                {active.shots.length > 1 && (
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                    {active.shots.slice(1).map(s => (
                      <a key={s.src} href={active.repos[0].url} target="_blank" rel="noreferrer"
                        style={{ display:"block", borderRadius:"12px", overflow:"hidden", border:"1px solid var(--border)", background:"var(--card-bg)", transition:"border-color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor="var(--accent)"}
                        onMouseLeave={e => e.currentTarget.style.borderColor="var(--border)"}>
                        <img src={s.src} alt={s.caption} loading="lazy"
                          style={{ width:"100%", height:"auto", display:"block" }} />
                        <div style={{ padding:"0.6rem 0.75rem", fontSize:"0.72rem", color:"var(--text-muted)", borderTop:"1px solid var(--border)", lineHeight:1.4 }}>
                          {s.caption}
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div style={{ padding:"3rem 2rem", textAlign:"center", border:"1px dashed var(--border-strong)", borderRadius:"12px", color:"var(--text-subtle)", fontSize:"0.9rem" }}>
                Screenshots em breve. Por enquanto, dá pra olhar o código.
              </div>
            )}

            <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
              {active.repos.map(r => (
                <a key={r.url} href={r.url} target="_blank" rel="noreferrer"
                  style={{ padding:"0.5rem 1rem", borderRadius:"8px", border:"1px solid var(--border-strong)", color:"var(--text-muted)", fontSize:"0.82rem", textDecoration:"none", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.target.style.borderColor="var(--accent)"; e.target.style.color="var(--accent)"; }}
                  onMouseLeave={e => { e.target.style.borderColor="var(--border-strong)"; e.target.style.color="var(--text-muted)"; }}>
                  {r.label} →
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
