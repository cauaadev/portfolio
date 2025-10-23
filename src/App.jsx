// App.jsx
import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
      <HelmetProvider>
        <MotionConfig transition={{ duration: 0.6, ease: [0.22, 0.8, 0.26, 0.99] }}>
          <div className="relative min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white selection:bg-amber-400 selection:text-black">
            <Helmet>
              <title>Cauã Diniz — Back‑End Java</title>
              <meta
                  name="description"
                  content="Back-End Java • Spring Boot • APIs REST • Bancos de dados • Git/GitHub • AWS (básico)."
              />
              <meta property="og:title" content="Cauã Diniz — Back‑End Java" />
              <meta
                  property="og:description"
                  content="Projetos reais, código limpo e foco em back-end com Java e Spring Boot."
              />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://seu-site-ou-demo.com" />
              <meta property="og:image" content="https://images.example.com/cover.jpg" />
            </Helmet>

            {/* Glows de fundo */}
            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
              <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full bg-amber-400/10 blur-3xl animate-[floatSoft_8s_ease-in-out_infinite]" />
              <div className="absolute top-1/3 -right-24 w-[34rem] h-[34rem] rounded-full bg-yellow-500/10 blur-3xl animate-[floatSoft_9s_ease-in-out_infinite]" />
            </div>

            <div className="noise-layer" aria-hidden />

            <Navbar />
            <main>
              <Hero />
              <Projects />
              <About />
              <Skills />
              <Contact />
            </main>
            <Footer />
          </div>
        </MotionConfig>
      </HelmetProvider>
  );
}