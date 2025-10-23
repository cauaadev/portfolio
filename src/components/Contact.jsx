import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
    // Substitua pelos seus dados reais antes de publicar
    const email = "cauasouzadev@gmail.com"; // ex.: contato@seu-dominio.com
    const whatsapp = "+5521995744001"; // DDI+DDD+Número, apenas dígitos. ex.: 5521999999999
    const scheduler = "https://calendly.com/SEU_USUARIO/30min"; // serviço famoso (Calendly)

    const [copied, setCopied] = useState(false);

    const waUrl = useMemo(() => {
        const digits = String(whatsapp).replace(/\D/g, "");
        return `https://wa.me/${digits}?text=${encodeURIComponent(
            "Olá! Vi seu portfólio e gostaria de conversar."
        )}`;
    }, [whatsapp]);

    function handleCopy() {
        navigator.clipboard
            .writeText(email)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
            })
            .catch(() => {});
    }

    function handleSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const nome = form.get("nome") || "";
        const remetente = form.get("email") || "";
        const mensagem = form.get("mensagem") || "";
        const subject = `Contato via site — ${nome || "Sem nome"}`;
        const body = `Nome: ${nome}\nEmail: ${remetente}\n\n${mensagem}`;
        const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
    }

    return (
        <section id="contato" className="scroll-mt-24 md:scroll-mt-28 py-28 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Vamos conversar
            </span>
                    </h2>
                    <p className="text-neutral-300">
                        Fale comigo por e‑mail, WhatsApp ou agende uma call. Normalmente respondo no mesmo dia útil.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Formulário leve (mailto) */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 soft-shadow"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.45 }}
                    >
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm text-neutral-300 mb-1">Seu nome</label>
                                <input
                                    name="nome"
                                    type="text"
                                    placeholder="Seu nome"
                                    className="w-full px-3 py-2 rounded-lg bg-neutral-950/60 border border-white/10 outline-none focus:border-amber-400/60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-300 mb-1">Seu e-mail</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="voce@empresa.com"
                                    className="w-full px-3 py-2 rounded-lg bg-neutral-950/60 border border-white/10 outline-none focus:border-amber-400/60"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-300 mb-1">Mensagem</label>
                                <textarea
                                    name="mensagem"
                                    rows="4"
                                    placeholder="Conte um pouco sobre a oportunidade…"
                                    className="w-full px-3 py-2 rounded-lg bg-neutral-950/60 border border-white/10 outline-none focus:border-amber-400/60 resize-y"
                                />
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <motion.button
                                type="submit"
                                className="px-5 py-2.5 rounded-xl bg-amber-400 text-black font-semibold hover:shadow-[0_0_24px_rgba(251,191,36,0.5)] transition"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Enviar por e-mail
                            </motion.button>

                            <motion.button
                                type="button"
                                onClick={handleCopy}
                                className="px-4 py-2.5 rounded-xl border border-amber-400/40 hover:bg-white/5 transition text-sm"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {copied ? "E-mail copiado ✔" : "Copiar e-mail"}
                            </motion.button>

                            <motion.a
                                href={waUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2.5 rounded-xl border border-emerald-400/40 text-emerald-200 hover:bg-emerald-400/10 transition text-sm"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                WhatsApp
                            </motion.a>

                            {scheduler && (
                                <motion.a
                                    href={scheduler}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2.5 rounded-xl border border-white/15 hover:bg-white/10 transition text-sm"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Agendar call (Calendly)
                                </motion.a>
                            )}
                        </div>

                        <p className="mt-4 text-xs text-neutral-400">
                            Dica: descreva contexto, prazo, stack e formato (PJ/CLT) para resposta mais assertiva.
                        </p>
                    </motion.form>

                    {/* Cartões rápidos (sem chat ao vivo) */}
                    <motion.div
                        className="grid gap-4"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.45, delay: 0.05 }}
                    >
                        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 soft-shadow">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">Disponibilidade</h3>
                                <span className="text-[11px] px-2 py-1 rounded-full border bg-emerald-400/15 text-emerald-300 border-emerald-400/30">
                  Aberto a propostas
                </span>
                            </div>
                            <p className="text-neutral-300 mt-2 text-sm">
                                Preferência por back-end Java/Spring, integrações, APIs e bancos de dados.
                            </p>
                            <div className="mt-3 flex gap-3 text-sm">
                                <a
                                    href="https://www.linkedin.com/in/cauadiniz/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/10 transition"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href={`mailto:${email}`}
                                    className="px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/10 transition"
                                >
                                    E-mail
                                </a>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 soft-shadow">
                            <h3 className="font-semibold">Outros canais</h3>
                            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                <a
                                    href="https://github.com/cauaadev"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 transition text-center"
                                >
                                    GitHub
                                </a>
                                <a
                                    href="/src/assets/Curriculo_Caua_Diniz.pdf"
                                    className="px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 transition text-center"
                                >
                                    Baixar CV
                                </a>
                            </div>
                            <p className="text-neutral-400 text-xs mt-3">Resposta típica: em até 24h úteis.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}