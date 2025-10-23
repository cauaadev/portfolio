// components/Hero.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const highlights = [
  "Back‑End Java",
  "APIs REST",
  "Bancos de Dados",
  "Clean Code",
  "Testes",
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % highlights.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
      <section id="home" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="h-5 mb-3 relative">
            <AnimatePresence mode="wait">
              <motion.p
                  key={idx}
                  className="absolute left-0 top-0 text-amber-300/90 text-sm"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45 }}
              >
                {highlights[idx]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
          >
            Construo APIs escaláveis e bem testadas,
            <br />
            com foco em performance e clareza.
          </motion.h1>

          <motion.p
              className="mt-4 text-neutral-300 text-lg max-w-2xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
          >
            Olá! Sou Cauã Diniz. Transformo requisitos em serviços limpos e observáveis,
            com documentação clara e entregas consistentes.
          </motion.p>

          <motion.div
              className="mt-8 flex gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
          >
            <a
                href="#projetos"
                className="inline-block text-lg px-6 py-3 rounded-xl bg-amber-400 text-black font-semibold hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition"
            >
              Ver projetos
            </a>
            <a
                href="#contato"
                className="inline-block text-lg px-6 py-3 rounded-xl border border-amber-400/50 hover:bg-white/5 transition"
            >
              Falar comigo
            </a>
          </motion.div>
        </div>
      </section>
  );
}