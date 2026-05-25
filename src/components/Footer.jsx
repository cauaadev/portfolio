import React from "react";
export default function Footer() {
  return (
    <footer style={{ borderTop:"1px solid var(--border)", padding:"3rem 1.5rem", background:"var(--bg)" }}>
      <div style={{ maxWidth:"72rem", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1.5rem" }}>
        <span style={{ fontSize:"1rem", fontWeight:700, color:"var(--accent)", letterSpacing:"-0.01em" }}>Cauã Diniz</span>
        <p style={{ fontSize:"0.8rem", color:"var(--text-subtle)" }}>© {new Date().getFullYear()} · Cauã Diniz</p>
        <div style={{ display:"flex", gap:"1.5rem" }}>
          {[["GitHub","https://github.com/cauaadev"],["LinkedIn","https://www.linkedin.com/in/cauadiniz/"],["E-mail","mailto:cauasouzadev@gmail.com"]].map(([l,h]) => (
            <a key={l} href={h} target="_blank" rel="noreferrer"
              style={{ fontSize:"0.85rem", color:"var(--text-subtle)", textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color="var(--accent)"} onMouseLeave={e => e.target.style.color="var(--text-subtle)"}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
