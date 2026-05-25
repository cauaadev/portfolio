import React from "react";

export default function Hero() {
  return (
    <section id="home" style={{ minHeight:"94vh", display:"flex", alignItems:"center" }}>
      <div style={{ maxWidth:"72rem", margin:"0 auto", padding:"6rem 1.5rem", width:"100%" }}>

        <div style={{ marginBottom:"1.5rem" }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.35rem 1rem", borderRadius:"6px", border:"1px solid var(--border-strong)", background:"var(--surface)", color:"var(--accent)", fontSize:"0.78rem", fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"var(--accent)", display:"inline-block" }} />
            Aceitando projetos novos
          </span>
        </div>

        <p style={{ color:"var(--accent)", fontSize:"1rem", fontWeight:500, letterSpacing:"0.02em", marginBottom:"1rem" }}>
          Desenvolvedor Web e Desktop
        </p>

        <h1 style={{ fontSize:"clamp(2.5rem, 6vw, 5rem)", fontWeight:700, lineHeight:1.1, letterSpacing:"-0.03em", color:"var(--text)", maxWidth:"16ch" }}>
          Software feito<br />
          <em style={{ color:"var(--accent)", fontStyle:"italic", fontWeight:400 }}>sob medida.</em>
        </h1>

        <p style={{ marginTop:"2rem", color:"var(--text-muted)", fontSize:"1.05rem", maxWidth:"52ch", fontWeight:400 }}>
          Sou desenvolvedor há 2 anos. Trabalho com pequenas e médias empresas, de qualquer setor. Você me conta o problema, eu construo o que resolve.
        </p>

        <div style={{ marginTop:"2.5rem", display:"flex", gap:"1rem", flexWrap:"wrap", alignItems:"center" }}>
          <a href="#contato"
            style={{ padding:"0.9rem 2.25rem", borderRadius:"8px", background:"var(--accent)", color:"white", fontWeight:500, textDecoration:"none", fontSize:"0.95rem", transition:"background 0.2s" }}
            onMouseEnter={e => { e.target.style.background="var(--accent-hover)"; }}
            onMouseLeave={e => { e.target.style.background="var(--accent)"; }}>
            Pedir orçamento
          </a>
          <a href="#projetos"
            style={{ padding:"0.9rem 2rem", borderRadius:"8px", border:"1px solid var(--border-strong)", color:"var(--text-muted)", textDecoration:"none", fontSize:"0.95rem", transition:"all 0.2s" }}
            onMouseEnter={e => { e.target.style.borderColor="var(--accent)"; e.target.style.color="var(--accent)"; }}
            onMouseLeave={e => { e.target.style.borderColor="var(--border-strong)"; e.target.style.color="var(--text-muted)"; }}>
            Ver projetos
          </a>
          <a href="/src/assets/Curriculo_Caua_Diniz.pdf"
            style={{ padding:"0.9rem 1.5rem", borderRadius:"8px", border:"1px solid var(--border)", color:"var(--text-subtle)", textDecoration:"none", fontSize:"0.875rem", transition:"all 0.2s" }}
            onMouseEnter={e => { e.target.style.borderColor="var(--accent)"; e.target.style.color="var(--accent)"; }}
            onMouseLeave={e => { e.target.style.borderColor="var(--border)"; e.target.style.color="var(--text-subtle)"; }}>
            Currículo ↓
          </a>
        </div>
      </div>
    </section>
  );
}
