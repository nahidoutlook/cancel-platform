"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, FileText } from "lucide-react";

interface CallCTAProps {
  title: string;
  description: string;
  primaryButton: string;
  secondaryButton?: string;
}

export default function CallCTA({
  title,
  description,
  primaryButton,
  secondaryButton,
}: CallCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-muted/40 to-muted/10 p-12 text-center shadow-sm"
    >
      {/* Glow Effect */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
          {title}
        </h2>

        <p className="text-lg text-muted-foreground mb-10">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link
            href="/"
            className="px-8 py-3 rounded-xl bg-black text-white font-medium hover:bg-black/90 transition"
          >
            {primaryButton}
          </Link>

          {secondaryButton && (
            <Link
              href="/contact"
              className="px-8 py-3 rounded-xl border bg-background hover:bg-muted transition font-medium"
            >
              {secondaryButton}
            </Link>
          )}
        </div>

        {/* Trust Proof */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure & Private</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" />
            <span>500+ Guides Updated for 2026</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Step-by-Step Instructions</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
