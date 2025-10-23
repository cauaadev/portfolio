// components/Footer.jsx
import React from "react";

export default function Footer() {
    return (
        <footer className="py-8 text-center text-sm text-neutral-400">
            <div className="max-w-6xl mx-auto px-6">
                © {new Date().getFullYear()} Cauã Diniz — Feito com React, Tailwind e Framer Motion.
            </div>
        </footer>
    );
}