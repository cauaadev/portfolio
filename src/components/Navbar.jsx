import React, { useEffect, useState } from "react";

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home","projetos","sobre","contato"];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin:"-40% 0px -55% 0px", threshold:0.01 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const NavLink = ({ href, label }) => {
    const id = href.replace("#","");
    const isActive = active === id;
    return (
      <a href={href} onClick={() => setOpen(false)}
        style={{ fontSize:"0.875rem", letterSpacing:"0.02em", color: isActive ? "var(--accent)" : "var(--text-muted)", textDecoration:"none", transition:"color 0.2s", fontWeight: isActive ? 500 : 400 }}>
        {label}
      </a>
    );
  };

  const toggleStyle = { background:"none", border:"1px solid var(--border-strong)", borderRadius:"8px", width:"2.25rem", height:"2.25rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", transition:"all 0.2s" };

  return (
    <header style={{ position:"sticky", top:0, zIndex:50, background:"var(--bg)", borderBottom:"1px solid var(--border)" }}>
      <nav style={{ maxWidth:"72rem", margin:"0 auto", padding:"1.1rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <a href="#home" style={{ textDecoration:"none" }}>
          <span style={{ fontSize:"1.15rem", fontWeight:700, color:"var(--accent)", letterSpacing:"-0.01em" }}>
            Cauã Diniz
          </span>
        </a>

        <ul className="desktop-nav" style={{ alignItems:"center", gap:"2rem", listStyle:"none" }}>
          {[["#projetos","Projetos"],["#sobre","Sobre"]].map(([href,label]) => (
            <li key={href}><NavLink href={href} label={label} /></li>
          ))}
          <li>
            <a href="#contato"
              style={{ padding:"0.5rem 1.25rem", borderRadius:"8px", background:"var(--accent)", color:"white", fontSize:"0.875rem", textDecoration:"none", transition:"background 0.2s", fontWeight:500 }}
              onMouseEnter={e => e.target.style.background="var(--accent-hover)"}
              onMouseLeave={e => e.target.style.background="var(--accent)"}>
              Fale comigo
            </a>
          </li>
          <li>
            <button onClick={() => setDark(d => !d)} style={toggleStyle} title={dark ? "Modo claro" : "Modo escuro"}>
              {dark ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>

        <div style={{ display:"flex", gap:"0.5rem" }}>
          <button onClick={() => setDark(d => !d)} style={toggleStyle} className="mobile-toggle">{dark ? "☀️" : "🌙"}</button>
          <button className="mobile-toggle" onClick={() => setOpen(v => !v)} aria-label="Menu"
            style={{ ...toggleStyle, flexDirection:"column", gap:"4px" }}>
            <span style={{ width:"1.1rem", height:"1.5px", background:"var(--accent)" }} />
            <span style={{ width:"1.1rem", height:"1.5px", background:"var(--accent)" }} />
            <span style={{ width:"0.7rem", height:"1.5px", background:"var(--accent)" }} />
          </button>
        </div>
      </nav>

      {open && (
        <div style={{ background:"var(--bg)", borderTop:"1px solid var(--border)", padding:"1.5rem" }}>
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"1.25rem" }}>
            {[["#projetos","Projetos"],["#sobre","Sobre"],["#contato","Fale comigo"]].map(([href,label]) => (
              <li key={href}><NavLink href={href} label={label} /></li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
