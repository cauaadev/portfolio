// components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", "projetos", "sobre", "skills", "contato"];
    const els = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const Link = ({ href, children }) => {
    const id = href.replace("#", "");
    const isActive = active === id;
    return (
        <a
            className={`transition-colors ${isActive ? "text-amber-300" : "hover:text-amber-300"}`}
            href={href}
            aria-current={isActive ? "page" : undefined}
            onClick={() => setOpen(false)}
        >
          {children}
        </a>
    );
  };

  return (
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="font-bold text-lg" aria-label="Ir para o topo">
          <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
            Cauã Diniz
          </span>
          </a>

          {/* Desktop */}
          <ul className="hidden sm:flex items-center gap-6 text-sm">
            <li><Link href="#projetos">Projetos</Link></li>
            <li><Link href="#sobre">Sobre</Link></li>
            <li><Link href="#skills">Skills</Link></li>
            <li>
              <a
                  className="px-3 py-1.5 rounded-full border border-amber-400/40 hover:bg-amber-400 hover:text-black transition"
                  href="#contato"
              >
                Contato
              </a>
            </li>
            <li>
              <a
                  href="/src/assets/Curriculo_Caua_Diniz.pdf"
                  className="px-3 py-1.5 rounded-full border border-white/15 hover:bg-white/10 transition"
              >
                CV
              </a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
              className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 hover:bg-white/10"
              aria-label="Abrir menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block w-5 h-0.5 bg-white" />
              <span className="block w-5 h-0.5 bg-white" />
              <span className="block w-5 h-0.5 bg-white" />
            </div>
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
            <div className="sm:hidden border-t border-white/10 bg-black/70 backdrop-blur-md">
              <ul className="px-6 py-4 flex flex-col gap-4 text-sm">
                <li><Link href="#projetos">Projetos</Link></li>
                <li><Link href="#sobre">Sobre</Link></li>
                <li><Link href="#skills">Skills</Link></li>
                <li><Link href="#contato">Contato</Link></li>
        
              </ul>
            </div>
        )}

        {/* Barra de progresso da rolagem */}
        <motion.div
            className="h-[2px] origin-left bg-gradient-to-r from-amber-300 to-yellow-500"
            style={{ scaleX: scrollYProgress }}
        />
      </header>
  );
}
