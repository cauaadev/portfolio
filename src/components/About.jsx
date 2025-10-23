// components/About.jsx
import React from "react";
import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="sobre" className="scroll-mt-24 md:scroll-mt-28 py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    className="text-3xl font-bold mb-4"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">Sobre</span>
                </motion.h2>

                <motion.p
                    className="text-neutral-300 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                >
                    Sou desenvolvedor back-end com foco em APIs REST com <span className="text-white">Java e Spring Boot</span>,
                    integrações seguras, testes e bancos de dados. Gosto de transformar requisitos em soluções simples, escaláveis
                    e bem estruturadas, priorizando <span className="text-white">clean code</span>, padronização e entrega de valor.
                </motion.p>

                <motion.ul
                    className="mt-6 grid sm:grid-cols-2 gap-3 text-neutral-300"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <li>• Banco de dados: PostgreSQL e MySQL (modelagem e consultas eficientes)</li>
                    <li>• Git e GitHub: fluxo em equipe e versionamento claro</li>
                    <li>• Segurança: JWT, Spring Security (em evolução)</li>
                    <li>• AWS (básico): deploy simples e noções de serviços essenciais</li>
                </motion.ul>
            </div>
        </section>
    );
}