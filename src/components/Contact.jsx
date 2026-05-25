import React, { useMemo, useState } from "react";

const email = "cauasouzadev@gmail.com";
const whatsapp = "+5521995744001";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const waUrl = useMemo(() => `https://wa.me/${whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent("Oi Cauã, vi seu portfólio. Queria conversar sobre um projeto.")}`, []);

  function handleCopy() {
    navigator.clipboard.writeText(email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Projeto — ${f.get("nome")}`)}&body=${encodeURIComponent(`Nome: ${f.get("nome")}\nEmail: ${f.get("email")}\n\n${f.get("mensagem")}`)}`;
  }

  const inp = { width:"100%", padding:"0.75rem 1rem", borderRadius:"8px", border:"1px solid var(--border-strong)", background:"var(--off-white)", fontSize:"0.9rem", color:"var(--text)", outline:"none", transition:"border-color 0.2s", fontFamily:"inherit" };

  return (
    <section id="contato" style={{ scrollMarginTop:"6rem", padding:"6rem 1.5rem", background:"var(--section-alt)" }}>
      <div style={{ maxWidth:"72rem", margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"4rem" }}>
          <p style={{ color:"var(--accent)", fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.875rem" }}>Contato</p>
          <h2 style={{ fontSize:"clamp(2rem, 4.5vw, 3.25rem)", fontWeight:700, lineHeight:1.15, letterSpacing:"-0.02em" }}>
            Tem alguma coisa pra resolver?<br />
            <em style={{ color:"var(--accent)", fontStyle:"italic", fontWeight:400 }}>Me manda uma mensagem.</em>
          </h2>
          <p style={{ color:"var(--text-muted)", maxWidth:"52ch", margin:"1.5rem auto 0" }}>
            Respondo em até 24h. Me conta o que precisa, sem compromisso. Eu te falo se consigo ajudar e quanto sai.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"2rem", alignItems:"start" }}>
          <form onSubmit={handleSubmit}
            style={{ padding:"2rem", borderRadius:"12px", background:"var(--card-bg)", border:"1px solid var(--border)" }}>
            {[{name:"nome",type:"text",label:"Seu nome",ph:"Seu nome"},{name:"email",type:"email",label:"E-mail",ph:"seu@email.com"}].map(f => (
              <div key={f.name} style={{ marginBottom:"1.25rem" }}>
                <label style={{ display:"block", fontSize:"0.8rem", color:"var(--text-muted)", marginBottom:"0.5rem", fontWeight:500 }}>{f.label}</label>
                <input name={f.name} type={f.type} placeholder={f.ph} style={inp}
                  onFocus={e => e.target.style.borderColor="var(--accent)"} onBlur={e => e.target.style.borderColor="var(--border-strong)"} />
              </div>
            ))}
            <div style={{ marginBottom:"1.5rem" }}>
              <label style={{ display:"block", fontSize:"0.8rem", color:"var(--text-muted)", marginBottom:"0.5rem", fontWeight:500 }}>O que você precisa?</label>
              <textarea name="mensagem" rows="4" placeholder="Me conta o que precisa. Pode ser uma frase."
                style={{ ...inp, resize:"vertical" }}
                onFocus={e => e.target.style.borderColor="var(--accent)"} onBlur={e => e.target.style.borderColor="var(--border-strong)"} />
            </div>
            <button type="submit"
              style={{ width:"100%", padding:"0.9rem", borderRadius:"8px", border:"none", background:"var(--accent)", color:"white", fontWeight:500, fontSize:"0.95rem", cursor:"pointer", transition:"background 0.2s" }}
              onMouseEnter={e => e.target.style.background="var(--accent-hover)"}
              onMouseLeave={e => e.target.style.background="var(--accent)"}>
              Enviar
            </button>
          </form>

          <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>

            <div style={{ padding:"2rem", borderRadius:"12px", background:"var(--card-bg)", border:"1px solid var(--border)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
                <span style={{ fontWeight:600, fontSize:"0.95rem", color:"var(--text)" }}>Disponibilidade</span>
                <span style={{ padding:"0.25rem 0.75rem", borderRadius:"6px", background:"rgba(16,185,129,0.1)", color:"var(--accent)", border:"1px solid rgba(16,185,129,0.25)", fontSize:"0.72rem", fontWeight:500 }}>Disponível</span>
              </div>
              <p style={{ fontSize:"0.9rem", color:"var(--text-muted)", marginBottom:"1.5rem" }}>
                Tô pegando projetos novos. Web, desktop, automação, integração — o que precisar.
              </p>
              <div style={{ display:"flex", gap:"0.75rem" }}>
                {[["LinkedIn","https://www.linkedin.com/in/cauadiniz/"],["GitHub","https://github.com/cauaadev"]].map(([l,h]) => (
                  <a key={l} href={h} target="_blank" rel="noreferrer"
                    style={{ padding:"0.5rem 1rem", borderRadius:"8px", border:"1px solid var(--border-strong)", color:"var(--text-muted)", fontSize:"0.8rem", textDecoration:"none", transition:"all 0.2s" }}
                    onMouseEnter={e => { e.target.style.borderColor="var(--accent)"; e.target.style.color="var(--accent)"; }}
                    onMouseLeave={e => { e.target.style.borderColor="var(--border-strong)"; e.target.style.color="var(--text-muted)"; }}>
                    {l}
                  </a>
                ))}
              </div>
            </div>

            <div style={{ padding:"2rem", borderRadius:"12px", background:"var(--card-bg)", border:"1px solid var(--border)" }}>
              <p style={{ fontSize:"0.75rem", color:"var(--text-subtle)", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:"1.25rem" }}>Onde me achar</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontSize:"0.82rem", fontWeight:500, color:"var(--text)" }}>E-mail</div>
                    <div style={{ fontSize:"0.78rem", color:"var(--text-muted)", marginTop:"0.1rem" }}>{email}</div>
                  </div>
                  <button onClick={handleCopy}
                    style={{ padding:"0.4rem 0.875rem", borderRadius:"8px", border:"1px solid var(--border-strong)", background:"none", color:"var(--text-muted)", fontSize:"0.75rem", cursor:"pointer", transition:"all 0.2s" }}
                    onMouseEnter={e => { e.target.style.borderColor="var(--accent)"; e.target.style.color="var(--accent)"; }}
                    onMouseLeave={e => { e.target.style.borderColor="var(--border-strong)"; e.target.style.color="var(--text-muted)"; }}>
                    {copied ? "✓" : "Copiar"}
                  </button>
                </div>

                <div style={{ height:"1px", background:"var(--border)" }} />

                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontSize:"0.82rem", fontWeight:500, color:"var(--text)" }}>WhatsApp</div>
                  </div>
                  <a href={waUrl} target="_blank" rel="noreferrer"
                    style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.5rem 1.125rem", borderRadius:"8px", background:"#25d366", color:"white", fontSize:"0.82rem", textDecoration:"none", fontWeight:500, transition:"opacity 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.opacity="0.88"} onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
