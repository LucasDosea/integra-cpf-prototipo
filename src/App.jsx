import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { Shield, Activity, BookOpen, Database, Lock, FileCheck, Users, Building2, ArrowRight, Check, X, AlertCircle, ChevronUp, ChevronDown, Search, Eye, EyeOff, Sun, Moon, Play, Layers, GitBranch, FileText, Sparkles, TrendingDown, TrendingUp, Clock, Heart, GraduationCap, ShieldCheck, ScrollText } from "lucide-react";

// ============================================
// ImunizAju — Demo Visual Institucional
// ============================================

export default function ImunizAjuSite() {
  const [theme, setTheme] = useState("light");
  const [showBackTop, setShowBackTop] = useState(false);
  const [openPortal, setOpenPortal] = useState(null); // 'crypto' | 'minimization' | 'audit' | null

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openPortalFn = (id) => setOpenPortal(id);
  const closePortal = () => setOpenPortal(null);

  const isDark = theme === "dark";

  // Paleta institucional — usada inline pra controle total
  const palette = isDark
    ? {
        bg: "#0a1628",
        bgAlt: "#0f1e36",
        surface: "#152843",
        surfaceAlt: "#1c3358",
        text: "#f0f6ff",
        textMuted: "#8da5c7",
        primary: "#3b82f6",
        primaryDeep: "#1e40af",
        accent: "#fbbf24",
        success: "#34d399",
        warn: "#fb923c",
        danger: "#fb7185",
        border: "rgba(255,255,255,0.08)",
        glass: "rgba(21, 40, 67, 0.6)",
      }
    : {
        bg: "#fafbfd",
        bgAlt: "#f1f5fb",
        surface: "#ffffff",
        surfaceAlt: "#f7f9fc",
        text: "#0a1628",
        textMuted: "#5a6b85",
        primary: "#1e40af",
        primaryDeep: "#0a2472",
        accent: "#d97706",
        success: "#059669",
        warn: "#ea580c",
        danger: "#dc2626",
        border: "rgba(10, 22, 40, 0.08)",
        glass: "rgba(255, 255, 255, 0.7)",
      };

  return (
    <div
      style={{
        background: palette.bg,
        color: palette.text,
        minHeight: "100vh",
        fontFamily: "'Inter', system-ui, sans-serif",
        transition: "background 0.6s ease, color 0.6s ease",
      }}
    >
      {/* Importação de fontes elegantes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; -webkit-font-smoothing: antialiased; }
        .display-font { font-family: 'Fraunces', Georgia, serif; letter-spacing: -0.02em; }
        .body-font { font-family: 'Inter', system-ui, sans-serif; }
        .mono-font { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.02em; }
        h1, h2, h3, h4, h5 { overflow-wrap: break-word; word-wrap: break-word; }
        @media (max-width: 600px) {
          h1, h2 { word-break: break-word; hyphens: auto; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.7; }
          70% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        ::selection { background: ${palette.accent}; color: ${palette.bg}; }
      `}</style>

      <NoiseOverlay />
      <NavBar palette={palette} theme={theme} setTheme={setTheme} />

      <Hero palette={palette} />
      <BigTypeTransition palette={palette} word="MINIMIZAR" subword="quanto menos dado circula, mais cidadão é respeitado" />
      <ProblemaPublico palette={palette} />
      <SolucaoProposta palette={palette} />
      <AntesDepois palette={palette} />
      <FocusGallery palette={palette} />
      <FluxoSolucao palette={palette} />
      <BigTypeTransition palette={palette} word="THRESHOLD" subword="o limiar entre o que se sabe e o que se mostra" />
      <AlinhamentoDesafio palette={palette} />
      <DashboardExecutivo palette={palette} />
      <DemonstracaoPratica palette={palette} />
      <LGPDMinimizacao palette={palette} openPortal={openPortalFn} />
      <BigTypeTransition palette={palette} word="EVIDÊNCIA" subword="cada acesso registrado, cada finalidade declarada" />
      <AuditoriaDemo palette={palette} openPortal={openPortalFn} />
      <ImpactoSocial palette={palette} />
      <CalculadoraEconomia palette={palette} />
      <ArquiteturaDemo palette={palette} />
      <LimitesDemo palette={palette} />
      <Rodape palette={palette} />

      <BackToTop show={showBackTop} palette={palette} />

      {/* Deep dive portals */}
      <CryptographyPortal open={openPortal === "crypto"} onClose={closePortal} palette={palette} />
      <MinimizationPortal open={openPortal === "minimization"} onClose={closePortal} palette={palette} />
      <AuditTrailPortal open={openPortal === "audit"} onClose={closePortal} palette={palette} />
    </div>
  );
}

// ============================================
// NOISE OVERLAY (grain de filme premium)
// ============================================
function NoiseOverlay() {
  return (
    <svg
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.035,
        mixBlendMode: "multiply",
      }}
    >
      <filter id="noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-filter)" />
    </svg>
  );
}

// ============================================
// BIG TYPE TRANSITION (palavra gigante entre seções)
// ============================================
function BigTypeTransition({ palette, word, subword }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Range reduzido — letras não saem da tela
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      style={{
        height: "50vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: palette.bg,
        zIndex: 2,
        padding: "0 4vw",
      }}
    >
      <motion.div
        style={{
          x,
          opacity,
          whiteSpace: "nowrap",
          textAlign: "center",
          maxWidth: "100%",
        }}
      >
        <div
          className="display-font"
          style={{
            fontSize: "clamp(60px, 13vw, 200px)",
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
            color: "transparent",
            WebkitTextStroke: `1px ${palette.accent}`,
          }}
        >
          {word}
        </div>
      </motion.div>
      <motion.div
        className="mono-font"
        style={{
          opacity,
          position: "absolute",
          bottom: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 11,
          color: palette.textMuted,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          textAlign: "center",
          padding: "0 20px",
          width: "90%",
        }}
      >
        ─ {subword} ─
      </motion.div>
    </section>
  );
}

// ============================================
// NAVBAR
// ============================================
function NavBar({ palette, theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "12px 32px" : "20px 32px",
        background: scrolled ? palette.glass : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? `1px solid ${palette.border}` : "1px solid transparent",
        transition: "all 0.4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${palette.primary}, ${palette.primaryDeep})`,
            display: "grid",
            placeItems: "center",
            boxShadow: `0 8px 20px -8px ${palette.primary}`,
          }}
        >
          <ShieldCheck size={18} color="#fff" />
        </div>
        <div style={{ lineHeight: 1.1 }}>
          <div className="display-font" style={{ fontSize: 18, fontWeight: 700 }}>ImunizAju</div>
          <div style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.1em" }}>ARACAJU · DEMO</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", gap: 24, fontSize: 13, color: palette.textMuted }} className="hide-mobile">
          {["Solução", "Fluxo", "Dashboard", "Protótipo", "Auditoria", "LGPD"].map((item) => (
            <a key={item} href={item === "Protótipo" ? "#demonstracao" : item === "Auditoria" ? "#auditoria" : `#${item.toLowerCase().replace("ç", "c").replace("ã", "a").replace("ó", "o").replace("ú", "u")}`} style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = palette.text)} onMouseLeave={(e) => (e.currentTarget.style.color = palette.textMuted)}>
              {item}
            </a>
          ))}
        </div>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{
            background: "transparent",
            border: `1px solid ${palette.border}`,
            color: palette.text,
            width: 36,
            height: 36,
            borderRadius: 8,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = palette.surfaceAlt)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>

      <style>{`
        @media (max-width: 720px) { .hide-mobile { display: none !important; } }
      `}</style>
    </motion.nav>
  );
}

// ============================================
// PORTAL SYSTEM — Deep dive experiences
// ============================================

// Wrapper genérico do portal — transição vortex + container fullscreen
// ============================================
// ANIMAÇÕES DE ABERTURA DOS PORTAIS (temáticas)
// ============================================

// CRYPTO INTRO — caracteres binários caindo, condensam no centro
function CryptoIntroAnimation({ palette, accentColor }) {
  const cols = 24;
  return (
    <>
      <style>{`
        @keyframes crypto-fall {
          0% { transform: translateY(-100vh); opacity: 0; }
          15% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(50vh); opacity: 0; }
        }
        @keyframes crypto-flash {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.6; transform: scale(2); }
        }
      `}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1 }}>
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className="mono-font"
            style={{
              position: "absolute",
              top: 0,
              left: `${(i / cols) * 100}%`,
              fontSize: 16,
              color: accentColor,
              letterSpacing: "0.2em",
              writingMode: "vertical-rl",
              animation: `crypto-fall ${1.4 + (i % 4) * 0.15}s ease-out forwards`,
              animationDelay: `${(i % 6) * 0.05}s`,
              opacity: 0,
            }}
          >
            {Array.from({ length: 30 }).map(() => Math.random() > 0.5 ? "1" : "0").join(" ")}
          </div>
        ))}
        {/* Flash central condensando */}
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            width: 80,
            height: 80,
            marginLeft: -40,
            marginTop: -40,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentColor}, transparent 70%)`,
            animation: "crypto-flash 1.6s ease-out forwards",
            animationDelay: "0.4s",
          }}
        />
      </div>
    </>
  );
}

// MINIMIZATION INTRO — pixels desaparecendo em camadas
function MinimizationIntroAnimation({ palette, accentColor }) {
  return (
    <>
      <style>{`
        @keyframes pixel-fade-in {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes filter-sweep {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1 }}>
        {/* Pixels que vão sumindo */}
        {Array.from({ length: 60 }).map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const size = 4 + Math.random() * 12;
          const delay = Math.random() * 0.8;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                background: accentColor,
                borderRadius: 2,
                animation: "pixel-fade-in 1.2s ease-out forwards",
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
        {/* Linha de varredura tipo "filtro" */}
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            boxShadow: `0 0 30px ${accentColor}`,
            animation: "filter-sweep 1.6s ease-out forwards",
            animationDelay: "0.2s",
          }}
        />
      </div>
    </>
  );
}

// AUDIT INTRO — scanner forense varrendo horizontalmente
function AuditIntroAnimation({ palette, accentColor }) {
  return (
    <>
      <style>{`
        @keyframes scanner-h {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes scanner-fade {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes grid-reveal {
          0% { opacity: 0; transform: scale(0.95); }
          70% { opacity: 0.2; }
          100% { opacity: 0; transform: scale(1); }
        }
        @keyframes dot-flash {
          0% { opacity: 0; transform: scale(0); }
          30% { opacity: 1; transform: scale(1.2); }
          60% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.8); }
        }
      `}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1 }}>
        {/* Grid de fundo aparecendo e sumindo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${accentColor}22 1px, transparent 1px), linear-gradient(90deg, ${accentColor}22 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            animation: "grid-reveal 2.4s ease-out forwards",
          }}
        />
        {/* Scanner vertical varrendo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 3,
            background: accentColor,
            boxShadow: `0 0 30px ${accentColor}, 0 0 60px ${accentColor}`,
            animation: "scanner-h 1.6s ease-out forwards, scanner-fade 1.6s ease-out forwards",
          }}
        />
        {/* Dots forenses — apenas durante a abertura, depois somem */}
        {Array.from({ length: 8 }).map((_, i) => {
          const x = 10 + Math.random() * 80;
          const y = 10 + Math.random() * 80;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: accentColor,
                boxShadow: `0 0 12px ${accentColor}`,
                animation: "dot-flash 2s ease-out forwards",
                animationDelay: `${0.2 + i * 0.1}s`,
                opacity: 0,
              }}
            />
          );
        })}
      </div>
    </>
  );
}


function Portal({ open, onClose, palette, title, kicker, children, accentColor, theme }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const onKey = (e) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  const ac = accentColor || palette.accent;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            background: "rgba(10, 22, 40, 0.96)",
            backdropFilter: "blur(20px)",
            overflowY: "auto",
          }}
        >
          {/* Animação temática de abertura */}
          {theme === "crypto" && <CryptoIntroAnimation palette={palette} accentColor={ac} />}
          {theme === "minimization" && <MinimizationIntroAnimation palette={palette} accentColor={ac} />}
          {theme === "audit" && <AuditIntroAnimation palette={palette} accentColor={ac} />}

          {/* Botão fechar */}
          <button
            onClick={onClose}
            style={{
              position: "fixed",
              top: 24,
              right: 24,
              zIndex: 100,
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${palette.border}`,
              color: palette.text,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              backdropFilter: "blur(10px)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = ac; e.currentTarget.style.color = palette.bg; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = palette.text; }}
          >
            <X size={18} />
          </button>

          {/* ESC hint */}
          <div className="mono-font" style={{
            position: "fixed",
            top: 32,
            left: 32,
            fontSize: 10,
            color: palette.textMuted,
            letterSpacing: "0.25em",
            zIndex: 100,
          }}>
            ─ ESC para sair
          </div>

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              minHeight: "100vh",
              padding: "100px 32px 60px",
              maxWidth: 1100,
              margin: "0 auto",
              position: "relative",
              color: palette.text,
            }}
          >
            <div style={{ marginBottom: 48 }}>
              <div className="mono-font" style={{ fontSize: 11, color: ac, letterSpacing: "0.3em", marginBottom: 16 }}>
                ─ {kicker}
              </div>
              <h2 className="display-font" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, margin: 0, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#f5f1e8" }}>
                {title}
              </h2>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// PORTAL 1 — Pseudonimização (criptografia)
// ============================================
function CryptographyPortal({ open, onClose, palette }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!open) {
      setPhase(0);
      return;
    }
    const timers = [
      setTimeout(() => setPhase(1), 1200),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => setPhase(3), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [open]);

  // Hash fictício para demonstração
  const hashChars = "a4f8b2c9d1e7m3k0p5q8r2v6x9y1z3w7";

  return (
    <Portal
      open={open}
      onClose={onClose}
      palette={palette}
      kicker="DEEP DIVE · CRIPTOGRAFIA"
      title="Como o CPF é protegido entre os domínios"
      accentColor={palette.primary}
      theme="crypto"
    >
      <p style={{ fontSize: 17, color: "rgba(245, 241, 232, 0.92)", lineHeight: 1.7, maxWidth: 700, marginBottom: 60, position: "relative", zIndex: 2 }}>
        Quando a Educação consulta o status, o CPF do cidadão nunca chega ao banco pseudonimizado em texto puro. Ele passa por uma função criptográfica que produz um <strong style={{ color: "#fff" }}>token irreversível</strong> — usado apenas naquela consulta, então descartado.
      </p>

      {/* Matrix background */}
      <div style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0.15,
        zIndex: 0,
      }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="mono-font"
            style={{
              position: "absolute",
              top: -200,
              left: `${i * 8.5}%`,
              fontSize: 14,
              color: palette.primary,
              letterSpacing: "0.2em",
              writingMode: "vertical-rl",
              animation: `matrix-rain ${4 + (i % 3)}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {hashChars.slice(0, 20).split("").join(" ")}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes matrix-rain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(150vh); }
        }
        @keyframes char-flip {
          0% { content: var(--orig); color: ${palette.danger}; }
          50% { color: ${palette.warn}; }
          100% { content: var(--enc); color: ${palette.success}; }
        }
      `}</style>

      {/* Pipeline visual */}
      <div style={{
        background: palette.surface,
        border: `1px solid ${palette.border}`,
        borderRadius: 20,
        padding: 48,
        marginBottom: 32,
        position: "relative",
      }}>
        {/* Etapa 1: CPF original */}
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <div className="mono-font" style={{ fontSize: 11, color: palette.danger, letterSpacing: "0.3em", marginBottom: 16 }}>
            ─ ETAPA 1 · DOMÍNIO DA SAÚDE
          </div>
          <div style={{
            display: "inline-block",
            padding: "16px 24px",
            background: phase >= 0 ? palette.danger + "15" : "transparent",
            border: `2px solid ${palette.danger}`,
            borderRadius: 12,
            fontFamily: "monospace",
            fontSize: "clamp(18px, 5.5vw, 32px)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: palette.danger,
            transition: "all 0.5s",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}>
            333.444.555-66
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: palette.textMuted, fontFamily: "monospace" }}>
            CPF do cidadão · DADO SENSÍVEL
          </div>
        </div>

        {/* Seta + função */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: 32, color: palette.primary }}
          >
            ↓
          </motion.div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 24px",
            background: palette.bg,
            border: `1px dashed ${palette.primary}`,
            borderRadius: 100,
            marginTop: 8,
          }}>
            <Lock size={14} color={palette.primary} />
            <span className="mono-font" style={{ fontSize: 12, color: palette.primary, letterSpacing: "0.15em" }}>
              SHA-256 + SALT
            </span>
          </div>
          <div style={{ fontSize: 12, color: palette.textMuted, marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>
            Função hash unidirecional. Impossível recuperar o CPF a partir do token.
          </div>
        </div>

        {/* Etapa 2: Hash gerado letra por letra */}
        <div style={{ textAlign: "center" }}>
          <div className="mono-font" style={{ fontSize: 11, color: palette.success, letterSpacing: "0.3em", marginBottom: 16 }}>
            ─ ETAPA 2 · TOKEN ENVIADO À EDUCAÇÃO
          </div>
          <div style={{
            display: "inline-block",
            padding: "16px 24px",
            background: phase >= 1 ? palette.success + "15" : "transparent",
            border: `2px solid ${palette.success}`,
            borderRadius: 12,
            fontFamily: "monospace",
            fontSize: "clamp(13px, 3.5vw, 22px)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: palette.success,
            transition: "all 0.5s",
            wordBreak: "break-all",
            maxWidth: "100%",
            lineHeight: 1.5,
          }}>
            {phase >= 1 ? `${hashChars.slice(0, 32)}...` : "..."}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: palette.textMuted, fontFamily: "monospace" }}>
            Token irreversível · SEM VALOR fora desta consulta
          </div>
        </div>

        {/* Comparação visual final */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              marginTop: 48,
              padding: 24,
              background: palette.bg,
              borderRadius: 12,
              borderLeft: `3px solid ${palette.primary}`,
            }}
          >
            <div style={{ fontSize: 14, color: palette.text, lineHeight: 1.7 }}>
              <strong style={{ color: palette.primary }}>O que isso significa na prática:</strong> mesmo que o banco de dados da Educação fosse comprometido, ninguém conseguiria descobrir QUAIS cidadãos foram consultados. Os tokens não revelam nada — são "etiquetas" sem significado isolado.
            </div>
          </motion.div>
        )}
      </div>

      {/* Princípios LGPD aplicados */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {[
          { icon: Lock, title: "Irreversibilidade", desc: "Hash SHA-256 não pode ser revertido em CPF original." },
          { icon: Shield, title: "Salt único", desc: "Cada consulta usa um salt diferente. Tokens nunca se repetem." },
          { icon: Eye, title: "Escopo limitado", desc: "Token só é válido naquela transação. Expira em segundos." },
          { icon: ScrollText, title: "Auditável", desc: "A geração do hash em si é registrada com finalidade declarada." },
        ].map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              style={{
                padding: 24,
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: 14,
              }}
            >
              <Icon size={20} color={palette.primary} strokeWidth={1.4} style={{ marginBottom: 14 }} />
              <h4 className="display-font" style={{ fontSize: 17, fontWeight: 500, margin: "0 0 8px" }}>{p.title}</h4>
              <p style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </Portal>
  );
}

// ============================================
// PORTAL 2 — Minimização de Dados
// ============================================
function MinimizationPortal({ open, onClose, palette }) {
  const [filterStep, setFilterStep] = useState(0);

  useEffect(() => {
    if (!open) {
      setFilterStep(0);
      return;
    }
    const interval = setInterval(() => {
      setFilterStep((prev) => prev < 5 ? prev + 1 : prev);
    }, 800);
    return () => clearInterval(interval);
  }, [open]);

  const prontuarioCompleto = [
    { campo: "Nome", valor: "Helena Silva Andrade", tipo: "identificação", criticidade: 5 },
    { campo: "CPF", valor: "111.222.333-44", tipo: "identificação", criticidade: 5 },
    { campo: "Data nasc.", valor: "12/03/2018", tipo: "identificação", criticidade: 4 },
    { campo: "Endereço", valor: "Rua das Flores, 234", tipo: "identificação", criticidade: 4 },
    { campo: "Telefone mãe", valor: "(79) 99876-5432", tipo: "contato", criticidade: 3 },
    { campo: "Plano de saúde", valor: "Unimed Aracaju", tipo: "financeiro", criticidade: 3 },
    { campo: "Histórico de doenças", valor: "Asma leve · Alergia a leite", tipo: "clínico", criticidade: 5 },
    { campo: "Medicamentos uso contínuo", valor: "Salbutamol spray", tipo: "clínico", criticidade: 5 },
    { campo: "Alergias", valor: "Lactose · Pólen", tipo: "clínico", criticidade: 4 },
    { campo: "Última consulta médica", valor: "15/03/2026 — clínica geral", tipo: "clínico", criticidade: 4 },
    { campo: "Vacina Tríplice Viral", valor: "Aplicada 12/04/2024", tipo: "vacinal", criticidade: 2 },
    { campo: "Vacina Hepatite B", valor: "Aplicada 03/06/2018", tipo: "vacinal", criticidade: 2 },
    { campo: "Vacina HPV", valor: "Aplicada 22/09/2025", tipo: "vacinal", criticidade: 2 },
    { campo: "Vacina Meningocócica", valor: "Aplicada 10/05/2023", tipo: "vacinal", criticidade: 2 },
    { campo: "Status calendário vacinal", valor: "Em dia para a faixa etária", tipo: "status", criticidade: 1 },
  ];

  // Lógica de filtros progressivos
  const itemFiltered = (item, step) => {
    if (step === 0) return false;
    if (step >= 1 && item.tipo === "financeiro") return true;
    if (step >= 2 && item.tipo === "contato") return true;
    if (step >= 3 && item.tipo === "clínico") return true;
    if (step >= 4 && item.tipo === "vacinal") return true;
    if (step >= 5 && item.tipo === "identificação") return true;
    return false;
  };

  return (
    <Portal
      open={open}
      onClose={onClose}
      palette={palette}
      kicker="DEEP DIVE · MINIMIZAÇÃO"
      title="O que sobra quando aplicamos minimização?"
      accentColor={palette.warn}
      theme="minimization"
    >
      <p style={{ fontSize: 17, color: "rgba(245, 241, 232, 0.92)", lineHeight: 1.7, maxWidth: 700, marginBottom: 40, position: "relative", zIndex: 2 }}>
        Este é o prontuário completo de uma criança fictícia. Acompanhe o que <strong style={{ color: "#fff" }}>desaparece</strong> camada por camada quando aplicamos o princípio da minimização — até sobrar apenas o necessário para autorizar matrícula.
      </p>

      {/* Background temático: linhas de dados sendo filtradas continuamente */}
      <div style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0.08,
        zIndex: 0,
      }}>
        <style>{`
          @keyframes data-line-filter {
            0% { transform: translateX(-100%); opacity: 0; }
            10%, 40% { opacity: 1; }
            50% { transform: translateX(0); opacity: 1; }
            55% { transform: scaleX(0.3); opacity: 0.4; }
            70% { transform: scaleX(0); opacity: 0; }
            100% { transform: translateX(100%); opacity: 0; }
          }
          @keyframes filter-bar-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
        `}</style>
        {Array.from({ length: 14 }).map((_, i) => {
          const yPos = 5 + i * 7;
          const widths = [60, 75, 50, 85, 40, 70, 55, 80, 45, 65, 75, 50, 85, 60];
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                top: `${yPos}%`,
                width: `${widths[i]}%`,
                height: 3,
                background: palette.warn,
                borderRadius: 2,
                animation: `data-line-filter ${5 + (i % 3) * 1.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
                transformOrigin: "left center",
              }}
            />
          );
        })}
        {/* Linha de filtro vertical pulsando */}
        <div style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "65%",
          width: 2,
          background: `linear-gradient(to bottom, transparent, ${palette.warn}, transparent)`,
          animation: "filter-bar-pulse 3s ease-in-out infinite",
        }} />
      </div>

      {/* Indicador de etapa */}
      <div style={{ marginBottom: 32, padding: "16px 24px", background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="mono-font" style={{ fontSize: 10, color: palette.warn, letterSpacing: "0.25em", marginBottom: 4 }}>
            FILTRO ATUAL
          </div>
          <div className="display-font" style={{ fontSize: 20, fontWeight: 500 }}>
            {filterStep === 0 && "Prontuário completo"}
            {filterStep === 1 && "− Dados financeiros removidos"}
            {filterStep === 2 && "− Dados de contato removidos"}
            {filterStep === 3 && "− Histórico clínico removido"}
            {filterStep === 4 && "− Detalhes vacinais removidos"}
            {filterStep >= 5 && "Apenas o necessário"}
          </div>
        </div>
        <div className="mono-font" style={{ fontSize: 14, color: palette.warn, letterSpacing: "0.2em" }}>
          {filterStep}/5
        </div>
      </div>

      {/* Tabela de prontuário */}
      <div style={{
        background: palette.surface,
        border: `1px solid ${palette.border}`,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 32,
      }}>
        {prontuarioCompleto.map((item, i) => {
          const filtered = itemFiltered(item, filterStep);
          return (
            <motion.div
              key={i}
              animate={{
                opacity: filtered ? 0.15 : 1,
                filter: filtered ? "blur(2px)" : "blur(0px)",
              }}
              transition={{ duration: 0.5 }}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr auto",
                gap: 16,
                padding: "14px 20px",
                borderBottom: i < prontuarioCompleto.length - 1 ? `1px solid ${palette.border}` : "none",
                position: "relative",
                background: item.tipo === "status" && filterStep >= 5 ? palette.success + "11" : "transparent",
                transition: "background 0.5s",
              }}
            >
              {/* Strikethrough overlay quando filtrado */}
              {filtered && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 20,
                    right: 20,
                    height: 1,
                    background: palette.danger,
                  }}
                />
              )}
              <div className="mono-font" style={{ fontSize: 11, color: palette.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {item.campo}
              </div>
              <div style={{ fontSize: 14, color: palette.text, fontFamily: "monospace" }}>
                {item.valor}
              </div>
              <div className="mono-font" style={{ fontSize: 9, color: filtered ? palette.danger : palette.textMuted, letterSpacing: "0.15em", padding: "2px 8px", border: `1px solid ${filtered ? palette.danger : palette.border}`, borderRadius: 100 }}>
                {filtered ? "REMOVIDO" : item.tipo.toUpperCase()}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Resultado final */}
      {filterStep >= 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            padding: 40,
            background: `linear-gradient(135deg, ${palette.success}11, ${palette.primary}11)`,
            border: `2px solid ${palette.success}`,
            borderRadius: 20,
            textAlign: "center",
          }}
        >
          <div className="mono-font" style={{ fontSize: 11, color: palette.success, letterSpacing: "0.3em", marginBottom: 16 }}>
            ─ DADO ENTREGUE À EDUCAÇÃO
          </div>
          <div className="display-font" style={{ fontSize: 56, fontWeight: 300, color: palette.success, letterSpacing: "-0.03em", marginBottom: 8 }}>
            EM DIA
          </div>
          <p style={{ fontSize: 14, color: palette.textMuted, maxWidth: 500, margin: "16px auto 0", lineHeight: 1.6 }}>
            De 15 campos do prontuário, apenas <strong style={{ color: palette.text }}>1 status calculado</strong> chega à Educação. Sem nome, sem CPF, sem doenças, sem medicamentos — apenas a resposta à pergunta pública específica.
          </p>
        </motion.div>
      )}

      {/* Botão para reiniciar animação */}
      {filterStep >= 5 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => setFilterStep(0)}
          style={{
            display: "block",
            margin: "24px auto 0",
            padding: "12px 24px",
            background: "transparent",
            color: palette.textMuted,
            border: `1px solid ${palette.border}`,
            borderRadius: 10,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
          }}
        >
          ↻ Reiniciar demonstração
        </motion.button>
      )}
    </Portal>
  );
}

// ============================================
// PORTAL 3 — Trilha de Auditoria
// ============================================
function AuditTrailPortal({ open, onClose, palette }) {
  const [selectedEvent, setSelectedEvent] = useState(0);

  const events = [
    { ts: "14:08:19", date: "30/04/2026", agent: "prefeitura.admin", finalidade: "dados_clinicos_individuais", cidadao: "***333.444**", retorno: "—", status: "BLOCKED", ip: "10.21.8.33", duracao: "13ms", motivo: "Cargo administrativo sem finalidade clínica declarada" },
    { ts: "14:07:44", date: "30/04/2026", agent: "integracao.terceiro.api", finalidade: "exportacao_massiva_cpfs", cidadao: "lote_500_cpfs", retorno: "—", status: "BLOCKED", ip: "187.45.210.77", duracao: "9ms", motivo: "Tentativa de extração em massa bloqueada" },
    { ts: "14:06:11", date: "30/04/2026", agent: "saude.ubs.externa", finalidade: "histórico_paciente_fora_território", cidadao: "***888.999**", retorno: "—", status: "BLOCKED", ip: "192.168.44.21", duracao: "14ms", motivo: "Escopo geográfico e assistencial violado" },
    { ts: "14:05:36", date: "30/04/2026", agent: "saude.ubs.siqueira", finalidade: "dados_escolares_sem_atendimento", cidadao: "***000.111**", retorno: "—", status: "BLOCKED", ip: "192.168.12.64", duracao: "18ms", motivo: "UBS não possui vínculo assistencial ativo com este cidadão" },
    { ts: "14:04:22", date: "30/04/2026", agent: "direcao.escola.aracaju", finalidade: "endereço_residencial_completo", cidadao: "***666.777**", retorno: "—", status: "BLOCKED", ip: "200.150.42.23", duracao: "15ms", motivo: "Dado pessoal excessivo para validação de matrícula" },
    { ts: "14:03:09", date: "30/04/2026", agent: "secescolar.aracaju", finalidade: "histórico_clínico", cidadao: "***222.333**", retorno: "—", status: "BLOCKED", ip: "200.150.42.18", duracao: "12ms", motivo: "Finalidade fora do escopo autorizado" },
    { ts: "14:02:11", date: "30/04/2026", agent: "secescolar.aracaju", finalidade: "matrícula", cidadao: "***222.333**", retorno: "LIBERADO", status: "OK", ip: "200.150.42.18", duracao: "247ms" },
    { ts: "14:01:47", date: "30/04/2026", agent: "secescolar.aracaju", finalidade: "matrícula", cidadao: "***666.777**", retorno: "EM DIA", status: "OK", ip: "200.150.42.18", duracao: "189ms" },
    { ts: "14:00:30", date: "30/04/2026", agent: "secescolar.aracaju", finalidade: "matrícula", cidadao: "***000.111**", retorno: "PENDENTE", status: "OK", ip: "200.150.42.18", duracao: "203ms" },
    { ts: "13:58:22", date: "30/04/2026", agent: "saude.ubs.atalaia", finalidade: "atendimento", cidadao: "***222.333**", retorno: "histórico_completo", status: "OK", ip: "192.168.1.45", duracao: "418ms" },
  ];

  const event = events[selectedEvent];
  const isBlocked = event.status === "BLOCKED";

  return (
    <Portal
      open={open}
      onClose={onClose}
      palette={palette}
      kicker="DEEP DIVE · TRILHA FORENSE"
      title="Cada acesso vira evidência permanente"
      accentColor={palette.accent}
      theme="audit"
    >
      <p style={{ fontSize: 17, color: "rgba(245, 241, 232, 0.92)", lineHeight: 1.7, maxWidth: 700, marginBottom: 40, position: "relative", zIndex: 2 }}>
        A auditoria não é um log de texto comum. Cada evento é registrado com <strong style={{ color: "#fff" }}>seis dimensões</strong> que permitem investigação posterior: quem acessou, com qual finalidade, em qual horário, de qual IP, quanto tempo levou e o que retornou.
      </p>

      {/* Timeline interativa */}
      <div style={{
        background: palette.surface,
        border: `1px solid ${palette.border}`,
        borderRadius: 16,
        padding: 32,
        marginBottom: 32,
      }}>
        <div className="mono-font" style={{ fontSize: 11, color: palette.accent, letterSpacing: "0.3em", marginBottom: 24 }}>
          ─ TIMELINE · ÚLTIMOS EVENTOS
        </div>

        {/* Timeline de eventos */}
        <div style={{ position: "relative", paddingLeft: 32, marginBottom: 32 }}>
          {/* Linha vertical */}
          <div style={{
            position: "absolute",
            left: 8,
            top: 0,
            bottom: 0,
            width: 2,
            background: palette.border,
          }} />

          {events.map((ev, i) => {
            const selected = selectedEvent === i;
            const blocked = ev.status === "BLOCKED";
            return (
              <motion.button
                key={i}
                onClick={() => setSelectedEvent(i)}
                whileHover={{ x: 4 }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  background: selected ? (blocked ? palette.danger + "15" : palette.accent + "15") : "transparent",
                  border: `1px solid ${selected ? (blocked ? palette.danger : palette.accent) : "transparent"}`,
                  borderRadius: 10,
                  marginBottom: 8,
                  cursor: "pointer",
                  position: "relative",
                  fontFamily: "inherit",
                  color: palette.text,
                  transition: "all 0.2s",
                }}
              >
                {/* Dot na timeline */}
                <div style={{
                  position: "absolute",
                  left: -28,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: blocked ? palette.danger : palette.success,
                  border: `3px solid ${palette.bg}`,
                  boxShadow: selected ? `0 0 0 3px ${blocked ? palette.danger : palette.accent}` : "none",
                  transition: "box-shadow 0.2s",
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <div className="mono-font" style={{ fontSize: 11, color: palette.textMuted, marginBottom: 2 }}>
                      {ev.ts} · {ev.agent}
                    </div>
                    <div style={{ fontSize: 13, color: palette.text }}>
                      Finalidade: <strong style={{ color: blocked ? palette.danger : palette.text }}>{ev.finalidade}</strong>
                    </div>
                  </div>
                  <div className="mono-font" style={{
                    fontSize: 9,
                    padding: "3px 10px",
                    background: blocked ? palette.danger : palette.success + "33",
                    color: blocked ? "#fff" : palette.success,
                    letterSpacing: "0.2em",
                    fontWeight: 700,
                    borderRadius: 4,
                  }}>
                    {ev.status}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Detalhes forenses do evento selecionado */}
      <motion.div
        key={selectedEvent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: palette.surface,
          border: `1px solid ${isBlocked ? palette.danger : palette.border}`,
          borderRadius: 16,
          padding: 32,
        }}
      >
        <div className="mono-font" style={{ fontSize: 11, color: isBlocked ? palette.danger : palette.accent, letterSpacing: "0.3em", marginBottom: 24 }}>
          ─ DETALHES FORENSES · EVENT #{String(selectedEvent + 1).padStart(4, "0")}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {[
            { label: "TIMESTAMP", value: `${event.date} ${event.ts}`, mono: true },
            { label: "AGENTE", value: event.agent, mono: true },
            { label: "FINALIDADE", value: event.finalidade, color: isBlocked ? palette.danger : palette.text },
            { label: "CIDADÃO (TOKEN)", value: event.cidadao, mono: true },
            { label: "RETORNO", value: event.retorno, mono: true },
            { label: "IP DE ORIGEM", value: event.ip, mono: true },
            { label: "TEMPO DE RESPOSTA", value: event.duracao, mono: true },
            { label: "STATUS HTTP", value: isBlocked ? "403 Forbidden" : "200 OK", mono: true, color: isBlocked ? palette.danger : palette.success },
          ].map((field, i) => (
            <div key={i}>
              <div className="mono-font" style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.2em", marginBottom: 6 }}>
                {field.label}
              </div>
              <div style={{
                fontSize: 14,
                color: field.color || palette.text,
                fontFamily: field.mono ? "monospace" : "inherit",
                wordBreak: "break-word",
              }}>
                {field.value}
              </div>
            </div>
          ))}
        </div>

        {isBlocked && event.motivo && (
          <div style={{
            marginTop: 24,
            padding: 20,
            background: palette.danger + "11",
            borderRadius: 12,
            borderLeft: `3px solid ${palette.danger}`,
          }}>
            <div className="mono-font" style={{ fontSize: 10, color: palette.danger, letterSpacing: "0.25em", marginBottom: 8, fontWeight: 700 }}>
              ⚠ MOTIVO DO BLOQUEIO
            </div>
            <div style={{ fontSize: 14, color: palette.text, lineHeight: 1.6 }}>
              {event.motivo}. A tentativa foi registrada permanentemente e pode ser usada como evidência em auditoria pela autoridade de proteção de dados.
            </div>
          </div>
        )}

        {/* Imutabilidade */}
        <div style={{
          marginTop: 24,
          paddingTop: 20,
          borderTop: `1px solid ${palette.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 12,
          color: palette.textMuted,
        }}>
          <Lock size={14} color={palette.accent} strokeWidth={1.5} />
          <span className="mono-font" style={{ letterSpacing: "0.1em" }}>
            REGISTRO IMUTÁVEL · hash: 7f3a9b2e8c4d...
          </span>
        </div>
      </motion.div>
    </Portal>
  );
}


// ============================================
// 1. HERO
// ============================================
function Hero({ palette }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = ["Saúde", "registra.", "Sistema", "calcula.", "Educação", "consulta", "apenas", "o", "necessário."];

  return (
    <section ref={ref} style={{ minHeight: "100vh", position: "relative", overflow: "hidden", padding: "140px 32px 80px" }}>
      {/* Background atmosférico */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "60%",
            height: "70%",
            background: `radial-gradient(circle, ${palette.primary}22 0%, transparent 60%)`,
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "50%",
            height: "60%",
            background: `radial-gradient(circle, ${palette.accent}15 0%, transparent 60%)`,
            filter: "blur(40px)",
          }}
        />
        {/* Grid sutil */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }}>
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={palette.border} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Animação temática — notebook com sistema rodando */}
        <NotebookPreviewAnimation palette={palette} />
      </div>

      <motion.div style={{ y, opacity, position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            background: palette.surfaceAlt,
            border: `1px solid ${palette.border}`,
            borderRadius: 100,
            fontSize: 12,
            color: palette.textMuted,
            marginBottom: 32,
            letterSpacing: "0.05em",
            maxWidth: "100%",
            flexWrap: "wrap",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: palette.success, animation: "pulse-ring 2s infinite" }} />
          GOVERNANÇA DIGITAL · SAÚDE × EDUCAÇÃO · SERGIPE
        </motion.div>

        <h1 className="display-font" style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 1.02, margin: "0 0 32px", letterSpacing: "-0.03em" }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-block", marginRight: "0.25em", color: ["registra.", "calcula.", "consulta"].includes(word) ? palette.accent : "inherit", fontStyle: ["registra.", "calcula.", "consulta"].includes(word) ? "italic" : "normal" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{ fontSize: 18, color: palette.textMuted, maxWidth: 640, lineHeight: 1.6, margin: "0 0 40px" }}
        >
          Uma demonstração visual de como integração entre secretarias pode reduzir burocracia, papel e exposição de dados sensíveis — entregando à família apenas o que é necessário para a matrícula escolar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          <a href="#solucao" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            background: palette.text,
            color: palette.bg,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 30px -10px ${palette.text}`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Conhecer a solução <ArrowRight size={16} />
          </a>
          <a href="#dashboard" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            background: "transparent",
            color: palette.text,
            border: `1px solid ${palette.border}`,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = palette.surfaceAlt; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            Ver dashboard
          </a>
          <a href="#demonstracao" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            background: palette.primary,
            color: "#fff",
            border: `1px solid ${palette.primary}`,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 30px -12px ${palette.primary}`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <Play size={15} /> Ver protótipo
          </a>
        </motion.div>

        {/* Stats inline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24, marginTop: 80, paddingTop: 40, borderTop: `1px solid ${palette.border}` }}
        >
          {[
            { num: "4", label: "status, não histórico" },
            { num: "0", label: "papel impresso" },
            { num: "100%", label: "auditável" },
            { num: "LGPD", label: "minimização aplicada" },
          ].map((s, i) => (
            <div key={i}>
              <div className="display-font" style={{ fontSize: 36, fontWeight: 600, color: palette.text }}>{s.num}</div>
              <div style={{ fontSize: 12, color: palette.textMuted, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================
// ANIMAÇÕES TEMÁTICAS DE FUNDO (autônomas, contínuas)
// ============================================

// NOTEBOOK PREVIEW — Tela de notebook com sistema rodando (estilo StackBlitz)
function NotebookPreviewAnimation({ palette }) {
  return (
    <>
      <style>{`
        @keyframes notebook-float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes status-cycle {
          0%, 24% { content: "LIBERADO"; }
          25%, 49% { content: "EM DIA"; }
          50%, 74% { content: "PENDENTE"; }
          75%, 100% { content: "NÃO LOCALIZADO"; }
        }
        @keyframes status-text-1 {
          0%, 22% { opacity: 1; transform: translateY(0); }
          23%, 100% { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes status-text-2 {
          0%, 24% { opacity: 0; transform: translateY(8px); }
          25%, 47% { opacity: 1; transform: translateY(0); }
          48%, 100% { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes status-text-3 {
          0%, 49% { opacity: 0; transform: translateY(8px); }
          50%, 72% { opacity: 1; transform: translateY(0); }
          73%, 100% { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes status-text-4 {
          0%, 74% { opacity: 0; transform: translateY(8px); }
          75%, 100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bar-load {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 100%; }
        }
        @keyframes notebook-line-fade-1 {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes notebook-line-fade-2 {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes scan-line {
          0% { top: 0; opacity: 0; }
          50% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      {/* Notebook flutuante na direita do hero */}
      <div
        className="hide-on-mobile-anim"
        style={{
          position: "absolute",
          top: "43%",
          right: "2%",
          width: 520,
          opacity: 0.38,
          pointerEvents: "none",
          animation: "notebook-float 6s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        {/* Body do notebook */}
        <div style={{
          width: "100%",
          aspectRatio: "16/10",
          background: palette.text,
          borderRadius: "14px 14px 4px 4px",
          padding: 8,
          boxShadow: `0 30px 60px -20px rgba(10, 22, 40, 0.4)`,
          position: "relative",
        }}>
          {/* Câmera notch */}
          <div style={{
            position: "absolute",
            top: 4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: palette.bg,
          }} />

          {/* Tela do notebook */}
          <div style={{
            width: "100%",
            height: "100%",
            background: palette.bg,
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* Barra superior tipo navegador */}
            <div style={{
              height: 26,
              background: palette.surface,
              borderBottom: `1px solid ${palette.border}`,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 12px",
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: palette.danger }} />
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: palette.warn }} />
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: palette.success }} />
              <div className="mono-font" style={{ marginLeft: 12, fontSize: 8, color: palette.textMuted, letterSpacing: "0.1em" }}>
                imunizaju.gov.br/consulta
              </div>
            </div>

            {/* Conteúdo da tela — interface de consulta */}
            <div style={{ padding: 16, position: "relative", height: "calc(100% - 26px)" }}>
              {/* Scan line decorativa */}
              <div style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 1,
                background: `linear-gradient(90deg, transparent, ${palette.primary}, transparent)`,
                animation: "scan-line 4s linear infinite",
              }} />

              {/* Header da consulta */}
              <div className="mono-font" style={{
                fontSize: 7,
                color: palette.accent,
                letterSpacing: "0.2em",
                marginBottom: 8,
                fontWeight: 600,
              }}>
                ─ CONSULTA · SECRETARIA ESCOLAR
              </div>

              {/* CPF input fake */}
              <div style={{
                background: palette.surfaceAlt,
                padding: "5px 10px",
                borderRadius: 4,
                fontSize: 9,
                fontFamily: "monospace",
                color: palette.textMuted,
                marginBottom: 10,
                border: `1px solid ${palette.border}`,
              }}>
                ***.***.***-**
              </div>

              {/* Status que muda em loop */}
              <div style={{
                position: "relative",
                height: 28,
                marginBottom: 10,
              }}>
                {[
                  { word: "LIBERADO", color: palette.success, anim: "status-text-1" },
                  { word: "EM DIA", color: palette.primary, anim: "status-text-2" },
                  { word: "PENDENTE", color: palette.warn, anim: "status-text-3" },
                  { word: "NÃO LOCALIZADO", color: palette.danger, anim: "status-text-4" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="mono-font"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: s.color,
                      padding: "4px 10px",
                      border: `1px solid ${s.color}`,
                      borderRadius: 4,
                      background: s.color + "11",
                      animation: `${s.anim} 8s ease-in-out infinite`,
                    }}
                  >
                    {s.word}
                  </div>
                ))}
              </div>

              {/* Barras de "dados" */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
                {[
                  { label: "status_only", color: palette.success, width: 100, delay: 0 },
                  { label: "histórico", color: palette.danger, width: 0, delay: 0.5, blocked: true },
                  { label: "personal_data", color: palette.danger, width: 0, delay: 1, blocked: true },
                ].map((bar, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div className="mono-font" style={{
                      fontSize: 7,
                      color: bar.blocked ? palette.danger : palette.text,
                      width: 60,
                      letterSpacing: "0.05em",
                      textDecoration: bar.blocked ? "line-through" : "none",
                    }}>
                      {bar.label}
                    </div>
                    <div style={{
                      flex: 1,
                      height: 3,
                      background: palette.border,
                      borderRadius: 2,
                      overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%",
                        background: bar.color,
                        width: bar.blocked ? 0 : "100%",
                        animation: bar.blocked ? "none" : `bar-load 3s ease-in-out infinite`,
                        animationDelay: `${bar.delay}s`,
                      }} />
                    </div>
                    <div className="mono-font" style={{
                      fontSize: 7,
                      color: bar.blocked ? palette.danger : palette.success,
                      letterSpacing: "0.05em",
                    }}>
                      {bar.blocked ? "BLOCK" : "OK"}
                    </div>
                  </div>
                ))}
              </div>

              {/* "Console" embaixo */}
              <div style={{
                background: palette.surface,
                padding: 8,
                borderRadius: 4,
                borderLeft: `2px solid ${palette.primary}`,
              }}>
                {[
                  { txt: "› GET /api/status?id=***", color: palette.textMuted, anim: "notebook-line-fade-1" },
                  { txt: "‹ 200 OK · status_only", color: palette.success, anim: "notebook-line-fade-2" },
                  { txt: "‹ audit.log · timestamp saved", color: palette.accent, anim: "notebook-line-fade-1" },
                ].map((line, i) => (
                  <div
                    key={i}
                    className="mono-font"
                    style={{
                      fontSize: 7,
                      color: line.color,
                      lineHeight: 1.6,
                      letterSpacing: "0.05em",
                      animation: `${line.anim} ${2 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  >
                    {line.txt}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Base do notebook */}
          <div style={{
            position: "absolute",
            bottom: -3,
            left: "30%",
            right: "30%",
            height: 3,
            background: palette.textMuted,
            borderRadius: "0 0 6px 6px",
            opacity: 0.4,
          }} />
        </div>

        {/* Tag flutuante */}
        <div className="mono-font" style={{
          position: "absolute",
          top: -16,
          left: 12,
          fontSize: 8,
          color: palette.accent,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}>
          ↳ live preview
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hide-on-mobile-anim { display: none !important; }
        }
      `}</style>
    </>
  );
}


// HERO ANIMATION — Data Flow entre Saúde e Educação
function HeroDataFlowAnimation({ palette }) {
  return (
    <>
      <style>{`
        @keyframes data-pulse-1 {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translate(280px, 0); opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(560px, 0); opacity: 0; }
        }
        @keyframes data-pulse-2 {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          15% { opacity: 1; }
          50% { transform: translate(-280px, 0); opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translate(-560px, 0); opacity: 0; }
        }
        @keyframes node-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes line-fade {
          0% { transform: scaleX(0); opacity: 0; }
          20% { opacity: 0.7; }
          50% { transform: scaleX(1); opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes status-blink {
          0%, 100% { opacity: 0; }
          20%, 80% { opacity: 0.6; }
        }
        .data-packet { will-change: transform, opacity; }
      `}</style>

      {/* Container do flow — direita superior */}
      <div style={{
        position: "absolute",
        top: "12%",
        right: "5%",
        width: 600,
        height: 200,
        opacity: 0.5,
        pointerEvents: "none",
      }} className="hide-on-mobile-anim">
        {/* Nó esquerdo - SAÚDE */}
        <div style={{
          position: "absolute",
          left: 0,
          top: 80,
          width: 60,
          height: 60,
          border: `1px solid ${palette.danger}`,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: palette.surface,
          animation: "node-pulse 3s ease-in-out infinite",
        }}>
          <div style={{ fontSize: 9, color: palette.danger, fontFamily: "monospace", letterSpacing: "0.1em" }}>SAÚDE</div>
        </div>

        {/* Linha entre nós */}
        <div style={{
          position: "absolute",
          left: 60,
          top: 109,
          width: 480,
          height: 2,
          background: `linear-gradient(90deg, ${palette.danger}33, ${palette.primary}33, ${palette.success}33)`,
        }} />

        {/* Pacotes de dados viajando da Saúde para Educação */}
        {[0, 1.5, 3, 4.5].map((delay, i) => (
          <div
            key={`pkt-1-${i}`}
            className="data-packet"
            style={{
              position: "absolute",
              left: 60,
              top: 100,
              width: 8,
              height: 8,
              background: palette.primary,
              borderRadius: 2,
              animation: `data-pulse-1 6s ease-in-out infinite`,
              animationDelay: `${delay}s`,
              boxShadow: `0 0 8px ${palette.primary}`,
            }}
          />
        ))}

        {/* Nó central - BANCO PSEUDONIMIZADO */}
        <div style={{
          position: "absolute",
          left: 270,
          top: 80,
          width: 60,
          height: 60,
          border: `1px solid ${palette.primary}`,
          borderRadius: 8,
          display: "grid",
          placeItems: "center",
          background: palette.surface,
          animation: "node-pulse 3s ease-in-out infinite",
          animationDelay: "1s",
        }}>
          <div style={{ fontSize: 8, color: palette.primary, fontFamily: "monospace", letterSpacing: "0.1em", textAlign: "center" }}>
            BANCO<br />MIN
          </div>
        </div>

        {/* Nó direito - EDUCAÇÃO */}
        <div style={{
          position: "absolute",
          right: 0,
          top: 80,
          width: 60,
          height: 60,
          border: `1px solid ${palette.success}`,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: palette.surface,
          animation: "node-pulse 3s ease-in-out infinite",
          animationDelay: "2s",
        }}>
          <div style={{ fontSize: 9, color: palette.success, fontFamily: "monospace", letterSpacing: "0.1em" }}>EDU</div>
        </div>

        {/* Status piscando acima do fluxo */}
        <div style={{
          position: "absolute",
          right: 0,
          top: 30,
          fontSize: 9,
          fontFamily: "monospace",
          color: palette.success,
          letterSpacing: "0.15em",
          animation: "status-blink 4s ease-in-out infinite",
        }}>
          ↳ LIBERADO
        </div>
        <div style={{
          position: "absolute",
          right: 0,
          top: 50,
          fontSize: 9,
          fontFamily: "monospace",
          color: palette.warn,
          letterSpacing: "0.15em",
          animation: "status-blink 4s ease-in-out infinite",
          animationDelay: "1.5s",
        }}>
          ↳ PENDENTE
        </div>
      </div>

      {/* Container de "código fantasma" — esquerda inferior */}
      <div style={{
        position: "absolute",
        bottom: "8%",
        left: "3%",
        width: 380,
        height: 180,
        opacity: 0.45,
        pointerEvents: "none",
      }} className="hide-on-mobile-anim">
        {[
          { width: 180, top: 0, color: palette.primary, delay: 0 },
          { width: 240, top: 24, color: palette.textMuted, delay: 0.5 },
          { width: 140, top: 48, color: palette.accent, delay: 1 },
          { width: 200, top: 72, color: palette.primary, delay: 1.5 },
          { width: 280, top: 96, color: palette.textMuted, delay: 2 },
          { width: 160, top: 120, color: palette.success, delay: 2.5 },
          { width: 220, top: 144, color: palette.primary, delay: 3 },
        ].map((line, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: line.top,
              width: line.width,
              height: 4,
              background: line.color,
              borderRadius: 2,
              animation: `line-fade 5s ease-in-out infinite`,
              animationDelay: `${line.delay}s`,
              transformOrigin: "left center",
            }}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hide-on-mobile-anim { display: none !important; }
        }
      `}</style>
    </>
  );
}

// LGPD ANIMATION — Data Minimization (dados sendo censurados)
function LGPDMinimizationAnimation({ palette }) {
  return (
    <>
      <style>{`
        @keyframes censor-fill {
          0% { width: 0%; background: ${palette.danger}; }
          40% { width: 100%; background: ${palette.danger}; }
          50% { width: 100%; background: ${palette.textMuted}; }
          90% { width: 100%; background: ${palette.textMuted}; }
          100% { width: 100%; background: ${palette.textMuted}; opacity: 0; }
        }
        @keyframes data-row-cycle {
          0%, 100% { opacity: 0; transform: translateY(10px); }
          10%, 90% { opacity: 1; transform: translateY(0); }
        }
        @keyframes lock-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>

      <div style={{
        position: "absolute",
        top: "20%",
        right: "5%",
        width: 280,
        opacity: 0.35,
        pointerEvents: "none",
      }} className="hide-on-mobile-anim">
        <div style={{ fontSize: 9, color: palette.textMuted, fontFamily: "monospace", letterSpacing: "0.2em", marginBottom: 12 }}>
          ─ FIELDS · MINIMIZED
        </div>
        {[
          { label: "clinical_history", delay: 0 },
          { label: "personal_data", delay: 0.6 },
          { label: "diagnosis_codes", delay: 1.2 },
          { label: "prescription_log", delay: 1.8 },
          { label: "appointment_data", delay: 2.4 },
          { label: "status_only ✓", delay: 3, keep: true },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
              animation: row.keep ? "none" : "data-row-cycle 6s ease-in-out infinite",
              animationDelay: `${row.delay}s`,
            }}
          >
            <div style={{
              fontSize: 10,
              fontFamily: "monospace",
              color: row.keep ? palette.success : palette.text,
              minWidth: 130,
              letterSpacing: "0.05em",
            }}>
              {row.label}
            </div>
            <div style={{
              flex: 1,
              height: 4,
              background: palette.border,
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
            }}>
              {!row.keep && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  animation: `censor-fill 6s ease-in-out infinite`,
                  animationDelay: `${row.delay}s`,
                }} />
              )}
              {row.keep && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: palette.success,
                }} />
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hide-on-mobile-anim { display: none !important; }
        }
      `}</style>
    </>
  );
}

// AUDIT ANIMATION — Live Logs scrolling
function AuditLogsAnimation({ palette }) {
  return (
    <>
      <style>{`
        @keyframes log-scroll {
          0% { transform: translateY(100%); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-700%); opacity: 0; }
        }
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "3%",
        width: 320,
        height: 180,
        opacity: 0.32,
        pointerEvents: "none",
        overflow: "hidden",
      }} className="hide-on-mobile-anim">
        <div style={{
          fontSize: 9,
          color: palette.accent,
          fontFamily: "monospace",
          letterSpacing: "0.2em",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          ─ AUDIT.LOG · LIVE
          <span style={{
            display: "inline-block",
            width: 6,
            height: 6,
            background: palette.success,
            borderRadius: "50%",
            animation: "cursor-blink 1s infinite",
          }} />
        </div>
        <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
          {[
            { ts: "14:02:11", txt: "secescolar.demo · matrícula", status: "OK", color: palette.success, delay: 0 },
            { ts: "14:01:47", txt: "secescolar.demo · matrícula", status: "OK", color: palette.success, delay: 1.2 },
            { ts: "14:00:30", txt: "secescolar.demo · matrícula", status: "OK", color: palette.success, delay: 2.4 },
            { ts: "13:58:22", txt: "saude.ubs.demo · clínico", status: "OK", color: palette.success, delay: 3.6 },
            { ts: "13:55:09", txt: "secescolar.demo · histórico", status: "BLOCK", color: palette.danger, delay: 4.8 },
            { ts: "13:53:41", txt: "secescolar.demo · matrícula", status: "OK", color: palette.success, delay: 6 },
            { ts: "13:51:28", txt: "secescolar.demo · matrícula", status: "OK", color: palette.success, delay: 7.2 },
          ].map((log, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                fontSize: 10,
                fontFamily: "monospace",
                display: "flex",
                gap: 8,
                alignItems: "center",
                animation: "log-scroll 9s linear infinite",
                animationDelay: `${log.delay}s`,
              }}
            >
              <span style={{ color: palette.textMuted, minWidth: 56 }}>{log.ts}</span>
              <span style={{ color: palette.text, flex: 1, fontSize: 9, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{log.txt}</span>
              <span style={{
                fontSize: 8,
                color: log.color,
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "1px 6px",
                border: `1px solid ${log.color}`,
                borderRadius: 3,
              }}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hide-on-mobile-anim { display: none !important; }
        }
      `}</style>
    </>
  );
}


// ============================================
// REUSABLE: Section Header com scroll reveal
// ============================================
function SectionHeader({ palette, kicker, title, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} style={{ maxWidth: 800, margin: "0 auto 64px", textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ fontSize: 12, color: palette.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}
      >
        {kicker}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="display-font"
        style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400, lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-0.02em" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontSize: 17, color: palette.textMuted, lineHeight: 1.6 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

function SectionWrap({ children, palette, alt = false, id, animation = null }) {
  return (
    <section id={id} style={{ padding: "120px 32px", background: alt ? palette.bgAlt : palette.bg, position: "relative", overflow: "hidden" }}>
      {animation && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
          {animation}
        </div>
      )}
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>{children}</div>
    </section>
  );
}

// ============================================
// 2. PROBLEMA PÚBLICO
// ============================================
function ProblemaPublico({ palette }) {
  const problems = [
    { icon: FileText, title: "Papel circulando entre órgãos", desc: "Caderneta de vacinação física exigida fisicamente na escola, gerando perda, dano e fraude." },
    { icon: Clock, title: "Filas presenciais evitáveis", desc: "Famílias se deslocam à UBS apenas para emitir comprovante, ocupando vaga clínica." },
    { icon: AlertCircle, title: "Exposição desnecessária", desc: "Histórico clínico completo apresentado quando bastaria um status de conformidade." },
    { icon: Layers, title: "Retrabalho administrativo", desc: "Servidores conferindo manualmente documentos que poderiam ser validados por sistema." },
  ];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <SectionWrap palette={palette}>
      <SectionHeader
        palette={palette}
        kicker="O ponto de partida"
        title="A família não deveria carregar informação de um órgão para outro em papel."
        subtitle="O que parece simples — provar vacinação na matrícula — esconde um circuito ineficiente que custa tempo, dinheiro e privacidade."
      />
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
        {problems.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: 28,
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: 16,
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s, border-color 0.3s",
              }}
              whileHover={{ y: -6 }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = palette.danger + "66")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = palette.border)}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: palette.danger + "1a",
                color: palette.danger,
                display: "grid",
                placeItems: "center",
                marginBottom: 20,
              }}>
                <Icon size={20} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px", lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: palette.textMuted, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ============================================
// 3. SOLUÇÃO PROPOSTA
// ============================================
function SolucaoProposta({ palette }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    { icon: Database, title: "Banco pseudonimizado", desc: "Dados clínicos permanecem na Saúde. Educação consulta apenas o status calculado." },
    { icon: Lock, title: "Minimização por design", desc: "Cada órgão acessa o mínimo necessário para sua função pública específica." },
    { icon: GitBranch, title: "Integração orquestrada", desc: "Comunicação por API entre secretarias, sem duplicação de cadastros." },
    { icon: ScrollText, title: "Auditoria contínua", desc: "Cada consulta registrada com finalidade, agente e dado acessado." },
  ];

  return (
    <SectionWrap palette={palette} alt id="solucao">
      <SectionHeader
        palette={palette}
        kicker="A proposta"
        title="A Educação precisa do status, não do histórico clínico."
        subtitle="Quatro pilares que sustentam uma integração segura entre secretarias, com foco em valor público e respeito ao cidadão."
      />
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: 32,
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: 20,
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}
              whileHover={{ y: -8, boxShadow: `0 30px 60px -20px ${palette.primary}33` }}
            >
              <div style={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                background: `radial-gradient(circle, ${palette.primary}15, transparent)`,
                borderRadius: "50%",
              }} />
              <Icon size={28} color={palette.primary} style={{ marginBottom: 20, position: "relative" }} />
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 10px", position: "relative" }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: palette.textMuted, lineHeight: 1.6, margin: 0, position: "relative" }}>{p.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ============================================
// 4. ANTES x DEPOIS
// ============================================
function AntesDepois({ palette }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState(null);

  const antes = ["Família imprime caderneta na UBS", "Levam papel à secretaria escolar", "Servidor confere visualmente", "Histórico clínico exposto", "Risco de extravio e fraude", "Múltiplas idas presenciais"];
  const depois = ["Saúde mantém registro digital", "Sistema calcula status objetivo", "Educação consulta apenas LIBERADO/PENDENTE", "Histórico clínico permanece na Saúde", "Auditoria automática de cada consulta", "Família resolve em um clique"];

  return (
    <SectionWrap palette={palette}>
      <SectionHeader
        palette={palette}
        kicker="Comparativo"
        title="Antes × Depois"
        subtitle="O mesmo objetivo — validar vacinação para matrícula — alcançado com menos atrito e mais privacidade."
      />
      <div
        ref={ref}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 32,
          perspective: 1200,
          position: "relative",
          zIndex: 2,
        }}
      >
        {[{ data: antes, color: palette.danger, icon: X, title: "Modelo atual", subtitle: "Burocrático e exposto" }, { data: depois, color: palette.success, icon: Check, title: "Modelo proposto", subtitle: "Digital e minimizado" }].map((col, idx) => {
          const Icon = col.icon;
          const isHovered = hoveredCard === idx;
          const isOther = hoveredCard !== null && hoveredCard !== idx;
          return (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredCard(idx)}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              animate={inView ? {
                opacity: isOther ? 0.58 : 1,
                x: 0,
                y: isHovered ? -18 : 0,
                scale: isHovered ? 1.055 : isOther ? 0.97 : 1,
                rotateX: isHovered ? 2 : 0,
                filter: isOther ? "blur(1.2px)" : "blur(0px)",
              } : {}}
              transition={{ duration: 0.45, delay: inView ? 0 : idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: 36,
                background: palette.surface,
                border: `1px solid ${isHovered ? col.color : col.color + "33"}`,
                borderRadius: 24,
                position: "relative",
                zIndex: isHovered ? 10 : 1,
                cursor: "pointer",
                overflow: "hidden",
                transformStyle: "preserve-3d",
                boxShadow: isHovered ? `0 32px 80px -28px ${col.color}99` : "0 10px 30px -28px rgba(10, 22, 40, 0.25)",
              }}
            >
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, ${col.color}14, transparent 58%)`,
                  pointerEvents: "none",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, position: "relative", zIndex: 1 }}>
                <motion.div
                  animate={{ scale: isHovered ? 1.08 : 1, rotate: isHovered ? -3 : 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ width: 44, height: 44, borderRadius: 12, background: col.color + "1a", color: col.color, display: "grid", placeItems: "center" }}
                >
                  <Icon size={22} />
                </motion.div>
                <div>
                  <h3 className="display-font" style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>{col.title}</h3>
                  <div style={{ fontSize: 13, color: palette.textMuted }}>{col.subtitle}</div>
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, position: "relative", zIndex: 1 }}>
                {col.data.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: isHovered ? 4 : 0 } : {}}
                    transition={{ duration: 0.4, delay: idx * 0.15 + i * 0.08 }}
                    style={{ display: "flex", gap: 12, padding: "10px 0", fontSize: 14, color: palette.text, borderBottom: i < col.data.length - 1 ? `1px solid ${palette.border}` : "none" }}
                  >
                    <span style={{ color: col.color, marginTop: 2 }}>•</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ============================================
// 5. FOCUS GALLERY
// ============================================
function FocusGallery({ palette }) {
  const [hovered, setHovered] = useState(null);
  const cards = [
    { titulo: "Família", desc: "Acompanha vacinação pelo app, sem precisar imprimir nada para a escola.", icon: Users, color: palette.primary },
    { titulo: "UBS / Saúde", desc: "Registra dose aplicada e mantém o histórico clínico em seu domínio.", icon: Heart, color: palette.danger },
    { titulo: "Banco pseudonimizado", desc: "Calcula status objetivo a partir do registro, sem expor dados clínicos.", icon: Database, color: palette.accent },
    { titulo: "Educação", desc: "Consulta apenas LIBERADO, EM DIA, PENDENTE ou NÃO LOCALIZADO.", icon: GraduationCap, color: palette.success },
    { titulo: "Matrícula", desc: "Família é orientada conforme status; pendência vira agendamento, não barreira.", icon: BookOpen, color: palette.warn },
  ];

  return (
    <SectionWrap palette={palette} alt>
      <SectionHeader
        palette={palette}
        kicker="Atores em foco"
        title="Cada órgão acessa apenas o que sua função exige"
        subtitle="Passe o mouse sobre um cartão para focá-lo. Os demais recuam — assim como deveria ser com os dados."
      />
      <div
        onMouseLeave={() => setHovered(null)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          perspective: 1200,
        }}
      >
        {cards.map((c, i) => {
          const Icon = c.icon;
          const isHovered = hovered === i;
          const isOther = hovered !== null && hovered !== i;
          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHovered(i)}
              animate={{
                scale: isHovered ? 1.06 : isOther ? 0.94 : 1,
                opacity: isOther ? 0.45 : 1,
                filter: isOther ? "blur(2px)" : "blur(0px)",
                rotateY: isHovered ? -3 : 0,
                z: isHovered ? 30 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: 28,
                background: palette.surface,
                border: `1px solid ${isHovered ? c.color : palette.border}`,
                borderRadius: 20,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                minHeight: 220,
                transformStyle: "preserve-3d",
                boxShadow: isHovered ? `0 30px 60px -20px ${c.color}66` : "none",
              }}
            >
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, ${c.color}15, transparent 60%)`,
                  pointerEvents: "none",
                }}
              />
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: c.color + "1a",
                color: c.color,
                display: "grid",
                placeItems: "center",
                marginBottom: 20,
              }}>
                <Icon size={22} />
              </div>
              <h3 className="display-font" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 10px" }}>{c.titulo}</h3>
              <p style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ============================================
// 6. FLUXO DA SOLUÇÃO
// ============================================
function FluxoSolucao({ palette }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredStep, setHoveredStep] = useState(null);

  const passos = [
    { label: "Família", sub: "Cidadão com vacinação em dia ou não", icon: Users },
    { label: "UBS / Saúde", sub: "Registra ou valida dose aplicada", icon: Heart },
    { label: "Banco pseudonimizado", sub: "Calcula status objetivo", icon: Database },
    { label: "Educação", sub: "Consulta apenas o status", icon: GraduationCap },
    { label: "Matrícula orientada", sub: "Liberada ou orientada conforme status", icon: BookOpen },
  ];

  return (
    <SectionWrap palette={palette} id="fluxo">
      <SectionHeader
        palette={palette}
        kicker="Fluxo end-to-end"
        title="Como o dado caminha"
        subtitle="A Saúde registra, o sistema calcula e a Educação consulta apenas o necessário."
      />
      <div ref={ref} style={{ position: "relative", padding: "20px 0" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          alignItems: "stretch",
        }}>
          {passos.map((p, i) => {
            const Icon = p.icon;
            return (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? {
                    opacity: 1,
                    y: hoveredStep === i ? -5 : 0,
                    scale: hoveredStep === i ? 1.018 : 1,
                    boxShadow: hoveredStep === i ? `0 18px 38px -24px ${palette.primary}` : "0 0 0 rgba(0,0,0,0)",
                  } : {}}
                  transition={{ duration: 0.35, delay: hoveredStep === null ? i * 0.15 : 0, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  style={{
                    padding: 24,
                    background: palette.surface,
                    border: `1px solid ${hoveredStep === i ? palette.primary + "55" : palette.border}`,
                    borderRadius: 16,
                    textAlign: "center",
                    position: "relative",
                    cursor: "default",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    animate={{ opacity: hoveredStep === i ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(135deg, ${palette.primary}0f, transparent 65%)`,
                      pointerEvents: "none",
                    }}
                  />
                  <motion.div
                    animate={{ scale: hoveredStep === i ? 1.08 : 1 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${palette.primary}, ${palette.primaryDeep})`,
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      margin: "0 auto 16px",
                      boxShadow: hoveredStep === i ? `0 12px 34px -10px ${palette.primary}` : `0 10px 30px -14px ${palette.primary}`,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Icon size={24} />
                  </motion.div>
                  <div style={{ fontSize: 11, color: palette.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>Etapa {i + 1}</div>
                  <h4 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>{p.label}</h4>
                  <p style={{ fontSize: 12, color: palette.textMuted, margin: 0, lineHeight: 1.5 }}>{p.sub}</p>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </SectionWrap>
  );
}

// ============================================
// 7. ALINHAMENTO COM DESAFIO
// ============================================
function AlinhamentoDesafio({ palette }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const items = [
    { icon: Building2, title: "Governo Digital", desc: "Serviço público entregue por canais digitais com identidade unificada." },
    { icon: GitBranch, title: "Interoperabilidade", desc: "Comunicação entre secretarias por API, sem duplicar bases." },
    { icon: Shield, title: "LGPD", desc: "Princípios de finalidade, necessidade e minimização aplicados por design." },
    { icon: TrendingUp, title: "Valor público", desc: "Tempo do cidadão preservado e exposição de dados reduzida." },
  ];

  return (
    <SectionWrap palette={palette} alt>
      <SectionHeader
        palette={palette}
        kicker="Diretrizes públicas"
        title="Alinhamento com o desafio"
        subtitle="A solução não nasce isolada: dialoga com diretrizes consolidadas de modernização administrativa e proteção de dados."
      />
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                padding: 24,
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: 14,
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              <div style={{
                minWidth: 40,
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${palette.primary}22, ${palette.accent}22)`,
                color: palette.primary,
                display: "grid",
                placeItems: "center",
              }}>
                <Icon size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ============================================
// 8. DASHBOARD EXECUTIVO
// ============================================
function AnimatedNumber({ target, suffix = "", decimals = 0, palette }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();
    const step = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(start + (target - start) * eased);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="display-font" style={{ fontSize: 48, fontWeight: 600, color: palette.text, letterSpacing: "-0.02em" }}>
      {decimals === 0 ? Math.round(val).toLocaleString("pt-BR") : val.toFixed(decimals)}{suffix}
    </span>
  );
}

function ProgressBar({ value, color, palette, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ width: "100%", height: 6, background: palette.border, borderRadius: 100, overflow: "hidden", marginTop: 12 }}>
      <motion.div
        initial={{ width: "0%" }}
        animate={inView ? { width: `${value}%` } : {}}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: "100%", background: color, borderRadius: 100 }}
      />
    </div>
  );
}

function DashboardExecutivo({ palette }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const metrics = [
    { label: "Matrículas processadas", value: 12847, suffix: "", color: palette.primary, progress: 92, sub: "+18% vs ciclo anterior" },
    { label: "Status LIBERADO", value: 78.4, suffix: "%", decimals: 1, color: palette.success, progress: 78, sub: "Dose calendário em dia" },
    { label: "Pendências resolvidas em até 7 dias", value: 86, suffix: "%", color: palette.accent, progress: 86, sub: "Sem barreira à matrícula" },
    { label: "Idas presenciais evitadas", value: 31200, suffix: "", color: palette.primary, progress: 88, sub: "Estimativa demonstrativa" },
    { label: "Documentos em papel", value: 0, suffix: "", color: palette.success, progress: 100, sub: "Zero impressão exigida" },
    { label: "Consultas auditadas", value: 100, suffix: "%", color: palette.primaryDeep, progress: 100, sub: "Cada acesso registrado" },
  ];

  return (
    <SectionWrap palette={palette} id="dashboard">
      <SectionHeader
        palette={palette}
        kicker="Visão executiva"
        title="Dashboard de impacto"
        subtitle="Métricas demonstrativas que materializam o valor público gerado pela integração entre secretarias."
      />
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -4, boxShadow: `0 20px 40px -15px ${m.color}33` }}
            style={{
              padding: 28,
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: 18,
              transition: "box-shadow 0.3s",
            }}
          >
            <div style={{ fontSize: 12, color: palette.textMuted, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>{m.label}</div>
            <AnimatedNumber target={m.value} suffix={m.suffix} decimals={m.decimals || 0} palette={palette} />
            <ProgressBar value={m.progress} color={m.color} palette={palette} delay={i * 0.08} />
            <div style={{ fontSize: 12, color: palette.textMuted, marginTop: 12 }}>{m.sub}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          marginTop: 28,
          padding: 24,
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 18,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
          <div>
            <div className="mono-font" style={{ fontSize: 10, color: palette.danger, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 6 }}>
              ─ ALERTAS DAS ÚLTIMAS 24H
            </div>
            <h3 className="display-font" style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>
              Governança operacional
            </h3>
          </div>
          <span className="mono-font" style={{ fontSize: 10, color: palette.success, letterSpacing: "0.18em", padding: "6px 10px", background: palette.success + "18", borderRadius: 100 }}>
            MONITORAMENTO ATIVO
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12 }}>
          {[
            { label: "Tentativas fora do escopo", value: "3", detail: "bloqueadas antes de retornar dado", color: palette.danger },
            { label: "Extração em massa", value: "1", detail: "chave de API suspensa para revisão", color: palette.warn },
            { label: "Consultas dentro da finalidade", value: "98%", detail: "matrícula escolar / status objetivo", color: palette.success },
            { label: "Vazamentos detectados", value: "0", detail: "nenhum dado clínico exposto", color: palette.primary },
          ].map((a, i) => (
            <div key={i} style={{ padding: 16, background: palette.surfaceAlt, borderRadius: 12, borderLeft: `3px solid ${a.color}` }}>
              <div className="display-font" style={{ fontSize: 28, fontWeight: 600, color: a.color, marginBottom: 6 }}>{a.value}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: palette.text, marginBottom: 4 }}>{a.label}</div>
              <div style={{ fontSize: 12, color: palette.textMuted, lineHeight: 1.5 }}>{a.detail}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionWrap>
  );
}

// ============================================
// MODAL AGENDAMENTO (3 etapas: UBS · Data · Hora)
// ============================================
function ModalAgendamento({ palette, cidadao, onClose, onConcluir }) {
  const [etapa, setEtapa] = useState(1);
  const [ubsSelecionada, setUbsSelecionada] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  const ubsOpcoes = [
    { id: "augusto-franco", nome: "UBS Augusto Franco", endereco: "Av. Augusto Franco, 2840 — Aracaju/SE", distancia: "1.2 km", proxima: true },
    { id: "atalaia", nome: "UBS Atalaia", endereco: "R. Niceu Dantas, 410 — Atalaia, Aracaju/SE", distancia: "3.8 km", proxima: false },
    { id: "centro", nome: "UBS Centro", endereco: "R. Laranjeiras, 285 — Centro, Aracaju/SE", distancia: "5.4 km", proxima: false },
  ];

  const hoje = new Date();
  const gerarDias = () => {
    const dias = [];
    for (let i = 1; i <= 21; i++) {
      const d = new Date(hoje);
      d.setDate(d.getDate() + i);
      const diaSemana = d.getDay();
      const isWeekend = diaSemana === 0 || diaSemana === 6;
      const lotado = [3, 7, 12, 18].includes(i);
      dias.push({
        data: d,
        dia: d.getDate(),
        mes: d.getMonth(),
        diaSemana,
        disponivel: !isWeekend && !lotado,
        motivo: isWeekend ? "Fim de semana" : lotado ? "Agenda cheia" : null,
      });
    }
    return dias;
  };
  const dias = gerarDias();

  const horarios = [
    { hora: "08:00", disponivel: true },
    { hora: "08:30", disponivel: false },
    { hora: "09:00", disponivel: true },
    { hora: "09:30", disponivel: true },
    { hora: "10:00", disponivel: false },
    { hora: "10:30", disponivel: true },
    { hora: "11:00", disponivel: true },
    { hora: "11:30", disponivel: false },
    { hora: "13:30", disponivel: true },
    { hora: "14:00", disponivel: true },
    { hora: "14:30", disponivel: false },
    { hora: "15:00", disponivel: true },
    { hora: "15:30", disponivel: true },
    { hora: "16:00", disponivel: false },
    { hora: "16:30", disponivel: true },
  ];

  const confirmar = () => {
    setEtapa(4);
    setTimeout(() => {
      const protocolo = `VE-${hoje.getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
      onConcluir({
        cidadao,
        ubs: ubsOpcoes.find((u) => u.id === ubsSelecionada),
        data: dataSelecionada,
        horario: horarioSelecionado,
        protocolo,
      });
    }, 1800);
  };

  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const diasSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 22, 40, 0.6)",
        backdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "grid",
        placeItems: "center",
        padding: 20,
        overflowY: "auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: palette.surface,
          borderRadius: 20,
          maxWidth: 720,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: 36,
          position: "relative",
          boxShadow: `0 40px 80px -20px rgba(10, 22, 40, 0.3)`,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, color: palette.accent, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
              {cidadao.status === "EM DIA" && "Agendamento · Próxima Dose"}
              {cidadao.status === "PENDENTE" && "Agendamento · Dose em Atraso"}
              {cidadao.status === "NÃO LOCALIZADO" && "Agendamento · Vigilância Epidemiológica"}
            </div>
            <h3 className="display-font" style={{ fontSize: 26, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>
              {etapa === 1 && "Selecione a UBS de referência"}
              {etapa === 2 && "Escolha o dia"}
              {etapa === 3 && "Escolha o horário"}
              {etapa === 4 && "Enviando solicitação..."}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: `1px solid ${palette.border}`,
              color: palette.textMuted,
              width: 36,
              height: 36,
              borderRadius: 10,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = palette.surfaceAlt; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Cidadão info */}
        <div style={{ padding: "14px 18px", background: palette.surfaceAlt, borderRadius: 12, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Cidadão</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{cidadao.nome} · <span style={{ color: palette.textMuted, fontSize: 12, fontFamily: "monospace" }}>{cidadao.cpf}</span></div>
          </div>
          <div style={{ padding: "5px 12px", background: cidadao.color + "22", color: cidadao.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", borderRadius: 100 }}>
            {cidadao.status}
          </div>
        </div>

        {/* Steps indicator */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 3,
                background: etapa >= s ? palette.primary : palette.border,
                borderRadius: 100,
                transition: "background 0.4s",
              }}
            />
          ))}
        </div>

        {/* ETAPA 1: UBS */}
        <AnimatePresence mode="wait">
          {etapa === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
                {ubsOpcoes.map((ubs) => (
                  <motion.button
                    key={ubs.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setUbsSelecionada(ubs.id)}
                    style={{
                      padding: "16px 18px",
                      background: ubsSelecionada === ubs.id ? palette.primary + "11" : palette.surfaceAlt,
                      border: `1px solid ${ubsSelecionada === ubs.id ? palette.primary : palette.border}`,
                      borderRadius: 12,
                      color: palette.text,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                      transition: "all 0.2s",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                        <Heart size={14} color={palette.primary} strokeWidth={1.8} />
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{ubs.nome}</span>
                        {ubs.proxima && (
                          <span style={{ fontSize: 9, padding: "2px 8px", background: palette.accent, color: "#fff", borderRadius: 100, letterSpacing: "0.1em", fontWeight: 700 }}>
                            MAIS PRÓXIMA
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: palette.textMuted }}>{ubs.endereco}</div>
                    </div>
                    <div style={{ fontSize: 11, color: palette.textMuted, flexShrink: 0, fontFamily: "monospace" }}>
                      {ubs.distancia}
                    </div>
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => setEtapa(2)}
                disabled={!ubsSelecionada}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  background: ubsSelecionada ? palette.primary : palette.surfaceAlt,
                  color: ubsSelecionada ? "#fff" : palette.textMuted,
                  border: "none",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: ubsSelecionada ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
              >
                Próximo · Escolher data →
              </button>
            </motion.div>
          )}

          {/* ETAPA 2: DATA */}
          {etapa === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div style={{ fontSize: 11, color: palette.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, textAlign: "center", fontWeight: 600 }}>
                Próximos 21 dias · {meses[hoje.getMonth()]} / {meses[(hoje.getMonth() + 1) % 12]} {hoje.getFullYear()}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 8 }}>
                {diasSemana.map((d) => (
                  <div key={d} style={{ fontSize: 10, color: palette.textMuted, textAlign: "center", letterSpacing: "0.1em", padding: "6px 0", fontWeight: 600 }}>
                    {d}
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 20 }}>
                {Array.from({ length: dias[0].diaSemana }).map((_, i) => (
                  <div key={`spacer-${i}`} />
                ))}
                {dias.map((d, i) => {
                  const isSelected = dataSelecionada && dataSelecionada.dia === d.dia && dataSelecionada.mes === d.mes;
                  return (
                    <button
                      key={i}
                      onClick={() => d.disponivel && setDataSelecionada(d)}
                      disabled={!d.disponivel}
                      title={d.motivo || "Disponível"}
                      style={{
                        aspectRatio: "1",
                        background: isSelected ? palette.primary : d.disponivel ? palette.surfaceAlt : "transparent",
                        border: `1px solid ${isSelected ? palette.primary : d.disponivel ? palette.border : "transparent"}`,
                        color: isSelected ? "#fff" : d.disponivel ? palette.text : palette.textMuted,
                        cursor: d.disponivel ? "pointer" : "not-allowed",
                        fontFamily: "'Fraunces', serif",
                        fontSize: 16,
                        fontWeight: 500,
                        borderRadius: 8,
                        position: "relative",
                        transition: "all 0.2s",
                        opacity: d.disponivel ? 1 : 0.3,
                        textDecoration: d.disponivel ? "none" : "line-through",
                      }}
                      onMouseEnter={(e) => { if (d.disponivel && !isSelected) e.currentTarget.style.borderColor = palette.primary; }}
                      onMouseLeave={(e) => { if (d.disponivel && !isSelected) e.currentTarget.style.borderColor = palette.border; }}
                    >
                      {d.dia}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: 16, fontSize: 10, color: palette.textMuted, letterSpacing: "0.05em", marginBottom: 20, justifyContent: "center", flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 10, height: 10, background: palette.surfaceAlt, border: `1px solid ${palette.border}`, borderRadius: 3 }} /> DISPONÍVEL
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 10, height: 10, background: palette.primary, borderRadius: 3 }} /> SELECIONADO
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.5 }}>
                  <span style={{ width: 10, height: 10, background: "transparent", border: `1px solid ${palette.border}`, borderRadius: 3 }} /> INDISPONÍVEL
                </span>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setEtapa(1)}
                  style={{
                    padding: "14px 20px",
                    background: "transparent",
                    color: palette.textMuted,
                    border: `1px solid ${palette.border}`,
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ← Voltar
                </button>
                <button
                  onClick={() => setEtapa(3)}
                  disabled={!dataSelecionada}
                  style={{
                    flex: 1,
                    padding: "14px 20px",
                    background: dataSelecionada ? palette.primary : palette.surfaceAlt,
                    color: dataSelecionada ? "#fff" : palette.textMuted,
                    border: "none",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: dataSelecionada ? "pointer" : "not-allowed",
                  }}
                >
                  Próximo · Escolher horário →
                </button>
              </div>
            </motion.div>
          )}

          {/* ETAPA 3: HORÁRIO */}
          {etapa === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div style={{ fontSize: 11, color: palette.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18, textAlign: "center", fontWeight: 600 }}>
                {dataSelecionada && `${diasSemana[dataSelecionada.diaSemana]} · ${dataSelecionada.dia} de ${meses[dataSelecionada.mes]}`}
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: palette.accent, letterSpacing: "0.15em", marginBottom: 10, fontWeight: 700 }}>MANHÃ</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 6 }}>
                  {horarios.filter((h) => parseInt(h.hora) < 12).map((h) => (
                    <button
                      key={h.hora}
                      onClick={() => h.disponivel && setHorarioSelecionado(h.hora)}
                      disabled={!h.disponivel}
                      style={{
                        padding: "12px 8px",
                        background: horarioSelecionado === h.hora ? palette.primary : h.disponivel ? palette.surfaceAlt : "transparent",
                        border: `1px solid ${horarioSelecionado === h.hora ? palette.primary : h.disponivel ? palette.border : "transparent"}`,
                        borderRadius: 8,
                        color: horarioSelecionado === h.hora ? "#fff" : h.disponivel ? palette.text : palette.textMuted,
                        cursor: h.disponivel ? "pointer" : "not-allowed",
                        fontFamily: "monospace",
                        fontSize: 13,
                        fontWeight: 500,
                        opacity: h.disponivel ? 1 : 0.3,
                        textDecoration: h.disponivel ? "none" : "line-through",
                        transition: "all 0.2s",
                      }}
                    >
                      {h.hora}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, color: palette.accent, letterSpacing: "0.15em", marginBottom: 10, fontWeight: 700 }}>TARDE</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 6 }}>
                  {horarios.filter((h) => parseInt(h.hora) >= 12).map((h) => (
                    <button
                      key={h.hora}
                      onClick={() => h.disponivel && setHorarioSelecionado(h.hora)}
                      disabled={!h.disponivel}
                      style={{
                        padding: "12px 8px",
                        background: horarioSelecionado === h.hora ? palette.primary : h.disponivel ? palette.surfaceAlt : "transparent",
                        border: `1px solid ${horarioSelecionado === h.hora ? palette.primary : h.disponivel ? palette.border : "transparent"}`,
                        borderRadius: 8,
                        color: horarioSelecionado === h.hora ? "#fff" : h.disponivel ? palette.text : palette.textMuted,
                        cursor: h.disponivel ? "pointer" : "not-allowed",
                        fontFamily: "monospace",
                        fontSize: 13,
                        fontWeight: 500,
                        opacity: h.disponivel ? 1 : 0.3,
                        textDecoration: h.disponivel ? "none" : "line-through",
                        transition: "all 0.2s",
                      }}
                    >
                      {h.hora}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setEtapa(2)}
                  style={{
                    padding: "14px 20px",
                    background: "transparent",
                    color: palette.textMuted,
                    border: `1px solid ${palette.border}`,
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ← Voltar
                </button>
                <button
                  onClick={confirmar}
                  disabled={!horarioSelecionado}
                  style={{
                    flex: 1,
                    padding: "14px 20px",
                    background: horarioSelecionado ? palette.primary : palette.surfaceAlt,
                    color: horarioSelecionado ? "#fff" : palette.textMuted,
                    border: "none",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: horarioSelecionado ? "pointer" : "not-allowed",
                  }}
                >
                  Confirmar agendamento ✓
                </button>
              </div>
            </motion.div>
          )}

          {/* ETAPA 4: ENVIANDO */}
          {etapa === 4 && (
            <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "40px 0" }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{
                  width: 56,
                  height: 56,
                  border: `3px solid ${palette.border}`,
                  borderTopColor: palette.primary,
                  borderRadius: "50%",
                  margin: "0 auto 24px",
                }}
              />
              <div style={{ fontSize: 13, color: palette.primary, letterSpacing: "0.1em", marginBottom: 8, fontWeight: 600 }}>
                Encaminhando solicitação à UBS
              </div>
              <div style={{ fontSize: 12, color: palette.textMuted, letterSpacing: "0.05em" }}>
                Gerando protocolo · Notificando UBS · Registrando auditoria
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// CONFIRMAÇÃO PÓS-AGENDAMENTO
// ============================================
function ConfirmacaoAgendamento({ palette, dados, onReset }) {
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: palette.success,
          color: "#fff",
          display: "grid",
          placeItems: "center",
          marginBottom: 18,
        }}
      >
        <Check size={26} strokeWidth={2.5} />
      </motion.div>

      <div style={{
        display: "inline-block",
        padding: "8px 16px",
        background: palette.success + "22",
        color: palette.success,
        borderRadius: 100,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.05em",
        marginBottom: 18,
      }}>
        AGENDADO · MATRÍCULA LIBERADA
      </div>

      <h3 className="display-font" style={{ fontSize: 24, fontWeight: 500, margin: "0 0 18px", lineHeight: 1.3 }}>
        Regularização agendada para <span style={{ color: palette.primary }}>{dados.data.dia} de {meses[dados.data.mes]}</span>, às <span style={{ color: palette.primary }}>{dados.horario}</span>
      </h3>

      <div style={{ display: "grid", gap: 8, marginBottom: 18 }}>
        <div style={{ padding: "12px 14px", background: palette.surfaceAlt, borderRadius: 10, fontSize: 13 }}>
          <div style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>Unidade</div>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>{dados.ubs.nome}</div>
          <div style={{ fontSize: 11, color: palette.textMuted }}>{dados.ubs.endereco}</div>
        </div>

        <div style={{ padding: "12px 14px", background: palette.surfaceAlt, borderRadius: 10, fontSize: 13 }}>
          <div style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>Protocolo</div>
          <div style={{ fontWeight: 700, color: palette.primary, fontSize: 16, fontFamily: "monospace", letterSpacing: "0.05em" }}>{dados.protocolo}</div>
        </div>
      </div>

      <div style={{
        fontSize: 11,
        color: palette.textMuted,
        padding: "10px 14px",
        background: palette.surfaceAlt,
        borderLeft: `3px solid ${palette.success}`,
        borderRadius: 8,
        lineHeight: 1.7,
        marginBottom: 14,
      }}>
        <strong style={{ color: palette.text }}>Notificado:</strong> {dados.cidadao.status === "NÃO LOCALIZADO" ? "Vigilância Epidemiológica + UBS" : "UBS de referência"}<br />
        <strong style={{ color: palette.text }}>Status escolar:</strong> matrícula liberada condicionalmente<br />
        <strong style={{ color: palette.text }}>Auditoria:</strong> evento registrado · timestamp salvo
      </div>

      <button
        onClick={onReset}
        style={{
          width: "100%",
          padding: "10px 20px",
          background: "transparent",
          color: palette.textMuted,
          border: `1px solid ${palette.border}`,
          borderRadius: 10,
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Nova consulta
      </button>
    </motion.div>
  );
}

// ============================================
// 11. LGPD E MINIMIZAÇÃO
// ============================================
function LGPDMinimizacao({ palette, openPortal }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [active, setActive] = useState(0);
  const tabs = [
    { label: "Finalidade", desc: "Cada acesso ocorre com finalidade pública declarada: validação de matrícula escolar — não diagnóstico, não atendimento clínico.", icon: FileCheck },
    { label: "Necessidade", desc: "A Educação não precisa do histórico clínico para autorizar matrícula. Precisa apenas saber se o cidadão está em conformidade.", icon: Eye },
    { label: "Minimização", desc: "Apenas 4 estados retornam à Educação: LIBERADO, EM DIA, PENDENTE, NÃO LOCALIZADO. Nada mais.", icon: EyeOff },
    { label: "Auditoria", desc: "Toda consulta gera log com agente, finalidade, dado acessado e timestamp — passível de revisão pela autoridade competente.", icon: ScrollText },
  ];

  return (
    <SectionWrap palette={palette} alt id="lgpd" animation={<LGPDMinimizationAnimation palette={palette} />}>
      <SectionHeader
        palette={palette}
        kicker="Conformidade por design"
        title="LGPD aplicada na arquitetura"
        subtitle="O objetivo é reduzir burocracia sem aumentar exposição de dados sensíveis."
      />
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 32 }} className="lgpd-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tabs.map((t, i) => {
            const Icon = t.icon;
            const isActive = active === i;
            return (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                style={{
                  padding: "16px 20px",
                  background: isActive ? palette.surface : "transparent",
                  border: `1px solid ${isActive ? palette.primary : palette.border}`,
                  borderRadius: 12,
                  color: palette.text,
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "all 0.2s",
                }}
              >
                <Icon size={18} color={isActive ? palette.primary : palette.textMuted} />
                {t.label}
              </motion.button>
            );
          })}
        </div>
        <div style={{
          padding: 40,
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="display-font" style={{ fontSize: 32, fontWeight: 500, margin: "0 0 16px" }}>{tabs[active].label}</h3>
              <p style={{ fontSize: 16, color: palette.textMuted, lineHeight: 1.7, margin: 0 }}>{tabs[active].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Deep dive triggers */}
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {[
          { id: "crypto", icon: Lock, title: "Como o CPF é protegido?", desc: "Veja a pseudonimização em ação", color: palette.primary },
          { id: "minimization", icon: EyeOff, title: "O que é minimização na prática?", desc: "Filtre um prontuário completo passo a passo", color: palette.warn },
        ].map((portal) => {
          const Icon = portal.icon;
          return (
            <motion.button
              key={portal.id}
              onClick={() => openPortal(portal.id)}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{
                padding: "24px 28px",
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: 16,
                cursor: "pointer",
                fontFamily: "inherit",
                color: palette.text,
                textAlign: "left",
                display: "flex",
                gap: 18,
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = portal.color; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = palette.border; }}
            >
              {/* Vortex hint background */}
              <div style={{
                position: "absolute",
                right: -40,
                top: "50%",
                transform: "translateY(-50%)",
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${portal.color}22, transparent 70%)`,
                pointerEvents: "none",
              }} />

              <div style={{
                width: 48,
                height: 48,
                minWidth: 48,
                borderRadius: 12,
                background: portal.color + "15",
                color: portal.color,
                display: "grid",
                placeItems: "center",
                position: "relative",
              }}>
                <Icon size={20} strokeWidth={1.4} />
              </div>
              <div style={{ flex: 1, position: "relative" }}>
                <div className="mono-font" style={{ fontSize: 9, color: portal.color, letterSpacing: "0.25em", marginBottom: 6, fontWeight: 700 }}>
                  ↳ DEEP DIVE
                </div>
                <div className="display-font" style={{ fontSize: 17, fontWeight: 500, marginBottom: 4 }}>
                  {portal.title}
                </div>
                <div style={{ fontSize: 12, color: palette.textMuted }}>
                  {portal.desc}
                </div>
              </div>
              <ArrowRight size={18} color={portal.color} style={{ position: "relative" }} />
            </motion.button>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .lgpd-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SectionWrap>
  );
}

// ============================================
// 12. AUDITORIA DEMONSTRATIVA
// ============================================
function AuditoriaDemo({ palette, openPortal }) {
  const [showBlocked, setShowBlocked] = useState(false);
  const [activeBlocked, setActiveBlocked] = useState(null);
  const [liveTime, setLiveTime] = useState(new Date());
  const [registros, setRegistros] = useState([
    { ts: "10:42", ubs: "UBS Centro", evento: "Tríplice Viral aplicada", cidadao: "***222.333**", protocolo: "VE-2026-3201" },
    { ts: "10:38", ubs: "UBS Atalaia", evento: "HPV (1ª dose) aplicada", cidadao: "***666.777**", protocolo: "VE-2026-3198" },
    { ts: "10:31", ubs: "UBS Augusto Franco", evento: "Hepatite B aplicada", cidadao: "***000.111**", protocolo: "VE-2026-3194" },
  ]);
  const [adding, setAdding] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);

  // Atualiza relógio a cada segundo
  useEffect(() => {
    const t = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const consultas = [
    { ts: "14:02:11", agent: "secescolar.aracaju", finalidade: "matrícula", cidadao: "***222.333**", retorno: "LIBERADO", ok: true, duracao: "247ms" },
    { ts: "14:01:47", agent: "secescolar.aracaju", finalidade: "matrícula", cidadao: "***666.777**", retorno: "EM DIA", ok: true, duracao: "189ms" },
    { ts: "14:00:30", agent: "secescolar.aracaju", finalidade: "matrícula", cidadao: "***000.111**", retorno: "PENDENTE", ok: true, duracao: "203ms" },
    { ts: "13:58:22", agent: "saude.ubs.atalaia", finalidade: "atendimento", cidadao: "***222.333**", retorno: "histórico_completo", ok: true, duracao: "418ms" },
  ];

  const blockedScenarios = [
    {
      ts: "14:03:09",
      agent: "secescolar.aracaju",
      finalidade: "histórico_clínico",
      cidadao: "***222.333**",
      duracao: "12ms",
      motivo: "Finalidade fora do escopo autorizado para a entidade Educação",
      origem: "EE Profª Maria Thétis Nunes",
      bairro: "Atalaia · Aracaju/SE",
      agenteNome: "secescolar_a3429",
      cargo: "Auxiliar de secretaria",
      ip: "200.150.42.18",
      sessao: "sess_8a3f...2d91",
      statusHttp: "403 Forbidden",
      responsabilizacao: "Registrada · sujeita a processo administrativo",
    },
    {
      ts: "14:04:22",
      agent: "direcao.escola.aracaju",
      finalidade: "endereço_residencial_completo",
      cidadao: "***666.777**",
      duracao: "15ms",
      motivo: "Dado pessoal excessivo para validação de matrícula",
      origem: "EMEF José Carlos Teixeira",
      bairro: "Farolândia · Aracaju/SE",
      agenteNome: "diretor_b1170",
      cargo: "Diretor escolar",
      ip: "200.150.42.23",
      sessao: "sess_4b71...91ac",
      statusHttp: "403 Forbidden",
      responsabilizacao: "Bloqueio registrado · revisão pela DPO municipal",
    },
    {
      ts: "14:05:36",
      agent: "saude.ubs.siqueira",
      finalidade: "dados_escolares_sem_atendimento",
      cidadao: "***000.111**",
      duracao: "18ms",
      motivo: "UBS não possui vínculo assistencial ativo com este cidadão",
      origem: "UBS Siqueira Campos",
      bairro: "Siqueira Campos · Aracaju/SE",
      agenteNome: "ubs_siq_2281",
      cargo: "Servidor administrativo da UBS",
      ip: "192.168.12.64",
      sessao: "sess_9c20...bd41",
      statusHttp: "403 Forbidden",
      responsabilizacao: "Registrada · acesso fora do vínculo assistencial",
    },
    {
      ts: "14:06:11",
      agent: "saude.ubs.externa",
      finalidade: "histórico_paciente_fora_território",
      cidadao: "***888.999**",
      duracao: "14ms",
      motivo: "Escopo geográfico e assistencial violado",
      origem: "UBS Zona Norte",
      bairro: "Fora do território de referência",
      agenteNome: "ubs_ext_7740",
      cargo: "Servidor de outra UBS",
      ip: "192.168.44.21",
      sessao: "sess_2f85...c0ee",
      statusHttp: "403 Forbidden",
      responsabilizacao: "Registrada · tentativa fora do território autorizado",
    },
    {
      ts: "14:07:44",
      agent: "integracao.terceiro.api",
      finalidade: "exportacao_massiva_cpfs",
      cidadao: "lote_500_cpfs",
      duracao: "9ms",
      motivo: "Tentativa de extração em massa bloqueada por limite de finalidade e volume",
      origem: "Gateway de integração terceirizado",
      bairro: "API externa · ambiente controlado",
      agenteNome: "api_client_terc_019",
      cargo: "Sistema externo",
      ip: "187.45.210.77",
      sessao: "api_tok_5e92...f13a",
      statusHttp: "429/403 Blocked",
      responsabilizacao: "Alerta crítico · chave de API suspensa para revisão",
    },
    {
      ts: "14:08:19",
      agent: "prefeitura.admin",
      finalidade: "dados_clinicos_individuais",
      cidadao: "***333.444**",
      duracao: "13ms",
      motivo: "Cargo administrativo sem finalidade clínica declarada",
      origem: "Secretaria Municipal de Administração",
      bairro: "Centro Administrativo · Aracaju/SE",
      agenteNome: "admin_mun_4502",
      cargo: "Servidor administrativo",
      ip: "10.21.8.33",
      sessao: "sess_adm_6a11...e309",
      statusHttp: "403 Forbidden",
      responsabilizacao: "Registrada · encaminhada para auditoria interna",
    },
  ];

  const getBlockedMeta = (log) => {
    const finalidade = log?.finalidade || "";
    if (finalidade.includes("exportacao_massiva")) {
      return {
        risco: "CRÍTICO",
        dispositivo: "API Gateway · client externo",
        matricula: "API-TERC-019",
        dpoAlerta: "Enviado ao Encarregado LGPD · prioridade crítica · revisão imediata",
        evidenciaId: "EV-2026-0047",
        hashEvento: "9d2f7a1c8e4b...",
      };
    }
    if (finalidade.includes("fora_território") || finalidade.includes("dados_clinicos") || finalidade.includes("dados_escolares")) {
      return {
        risco: "ALTO",
        dispositivo: "Desktop institucional autenticado",
        matricula: "SERV-2026-1184",
        dpoAlerta: "Enviado para auditoria interna · análise em até 24h",
        evidenciaId: "EV-2026-0044",
        hashEvento: "7f3a9b2e8c4d...",
      };
    }
    if (finalidade.includes("endereço")) {
      return {
        risco: "MÉDIO",
        dispositivo: "Desktop Direção 01",
        matricula: "SEMED-2026-0712",
        dpoAlerta: "Marcado para revisão do Encarregado LGPD",
        evidenciaId: "EV-2026-0042",
        hashEvento: "4c8e1b7a2f91...",
      };
    }
    return {
      risco: "ALTO",
      dispositivo: "Desktop Secretaria 03",
      matricula: "SEMED-2026-04829",
      dpoAlerta: "Notificação enviada ao painel do Encarregado LGPD",
      evidenciaId: "EV-2026-0041",
      hashEvento: "7f3a9b2e8c4d...",
    };
  };

  const blockedDetails = activeBlocked ? { ...activeBlocked, ...getBlockedMeta(activeBlocked) } : { ...blockedScenarios[0], ...getBlockedMeta(blockedScenarios[0]) };

  const simularBloqueio = () => {
    if (showBlocked) {
      setShowBlocked(false);
      setShowEvidence(false);
      return;
    }
    const next = blockedScenarios[Math.floor(Math.random() * blockedScenarios.length)];
    setActiveBlocked(next);
    setShowEvidence(false);
    setShowBlocked(true);
  };

  const allConsultas = showBlocked ? [{ ...blockedDetails, ok: false, retorno: "—" }, ...consultas] : consultas;
  const totalEventos = consultas.length + registros.length + (showBlocked ? 1 : 0);
  const eventosBloqueados = showBlocked ? 1 : 0;

  const adicionarRegistro = () => {
    setAdding(true);
    setTimeout(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ubsList = ["UBS Centro", "UBS Atalaia", "UBS Augusto Franco", "UBS Siqueira Campos"];
      const eventos = ["Pneumocócica 10 aplicada", "Pentavalente aplicada", "Meningocócica aplicada", "DTP reforço aplicada"];
      const cidadaos = ["***333.444**", "***777.888**", "***111.222**", "***555.666**"];
      const novoProtocolo = `VE-2026-${Math.floor(3200 + Math.random() * 100)}`;
      const novo = {
        ts: `${hh}:${mm}`,
        ubs: ubsList[Math.floor(Math.random() * ubsList.length)],
        evento: eventos[Math.floor(Math.random() * eventos.length)],
        cidadao: cidadaos[Math.floor(Math.random() * cidadaos.length)],
        protocolo: novoProtocolo,
        novo: true,
      };
      setRegistros([novo, ...registros].slice(0, 6));
      setAdding(false);
    }, 1000);
  };

  const formatTime = (d) => d.toLocaleTimeString("pt-BR");

  return (
    <SectionWrap palette={palette} id="auditoria" animation={<AuditLogsAnimation palette={palette} />}>
      <SectionHeader
        palette={palette}
        kicker="Trilha de evidências"
        title="Auditoria demonstrativa"
        subtitle="Toda escrita (registro de doses) e toda leitura (consulta de status) é registrada com finalidade declarada. Tentativas fora do escopo são bloqueadas e rastreadas."
      />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Painel de stats em tempo real */}
        <div className="audit-stats-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}>
          {[
            { label: "Eventos hoje", value: totalEventos, color: palette.primary, icon: ScrollText },
            { label: "Bloqueios", value: eventosBloqueados, color: eventosBloqueados > 0 ? palette.danger : palette.textMuted, icon: Shield },
            { label: "Tempo médio", value: "247ms", color: palette.success, icon: Sparkles },
            { label: "Status sistema", value: "ATIVO", color: palette.success, icon: Check, pulse: true },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: "16px 18px",
                  background: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 12,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Icon size={14} color={stat.color} strokeWidth={1.6} />
                  <div className="mono-font" style={{ fontSize: 9, color: palette.textMuted, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
                    {stat.label}
                  </div>
                  {stat.pulse && (
                    <span style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: stat.color,
                      animation: "pulse-ring 2s infinite",
                      marginLeft: "auto",
                    }} />
                  )}
                </div>
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="display-font"
                  style={{ fontSize: 22, fontWeight: 600, color: stat.color, lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Header do terminal */}
        <div style={{
          padding: "14px 20px",
          background: palette.surfaceAlt,
          border: `1px solid ${palette.border}`,
          borderRadius: "18px 18px 0 0",
          borderBottom: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: palette.danger }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: palette.warn }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: palette.success }} />
            </div>
            <div className="mono-font" style={{ fontSize: 12, fontWeight: 600, color: palette.text, letterSpacing: "0.05em" }}>
              imunizaju.gov.br/audit
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: palette.success, animation: "pulse-ring 2s infinite" }} />
              <span className="mono-font" style={{ fontSize: 10, color: palette.success, letterSpacing: "0.2em", fontWeight: 700 }}>LIVE</span>
            </span>
            <span className="mono-font" style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.1em" }}>
              {formatTime(liveTime)}
            </span>
          </div>
        </div>

        {/* Identidade da sessão + detecção de tentativa fora do escopo */}
        <div style={{
          display: "grid",
          gridTemplateColumns: showBlocked ? "1fr 1.15fr" : "1fr",
          gap: 14,
          marginBottom: 18,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: 18,
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: 14,
            }}
          >
            <div className="mono-font" style={{ fontSize: 9, color: palette.primary, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 12 }}>
              ─ SESSÃO INSTITUCIONAL AUTENTICADA
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
              {[
                { label: "Usuário", value: showBlocked ? blockedDetails.agenteNome : "secescolar_a3429" },
                { label: "Cargo", value: showBlocked ? blockedDetails.cargo : "Auxiliar de secretaria" },
                { label: "Unidade", value: showBlocked ? blockedDetails.origem : "EE Profª Maria Thétis Nunes" },
                { label: "Matrícula", value: showBlocked ? blockedDetails.matricula : "SEMED-2026-04829" },
                { label: "IP", value: showBlocked ? blockedDetails.ip : "200.150.42.18" },
                { label: "Dispositivo", value: showBlocked ? blockedDetails.dispositivo : "Desktop Secretaria 03" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="mono-font" style={{ fontSize: 9, color: palette.textMuted, letterSpacing: "0.15em", marginBottom: 4 }}>{item.label.toUpperCase()}</div>
                  <div style={{ fontSize: 12, color: palette.text, lineHeight: 1.4, wordBreak: "break-word" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {showBlocked && (
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                style={{
                  padding: 18,
                  background: `linear-gradient(135deg, ${palette.danger}14, ${palette.warn}10)`,
                  border: `1px solid ${palette.danger}66`,
                  borderRadius: 14,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div className="mono-font" style={{ fontSize: 9, color: palette.danger, letterSpacing: "0.25em", fontWeight: 800, marginBottom: 10 }}>
                  ⚠ TENTATIVA FORA DO ESCOPO DETECTADA
                </div>
                <div style={{ fontSize: 18, color: palette.text, fontWeight: 700, marginBottom: 8 }}>
                  Acesso bloqueado antes do retorno de dados
                </div>
                <div style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6, marginBottom: 12 }}>
                  O sistema comparou usuário, cargo, unidade, finalidade declarada e dado solicitado. A ação foi negada e transformada em evidência auditável.
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span className="mono-font" style={{ fontSize: 10, color: "#fff", background: palette.danger, padding: "5px 9px", borderRadius: 6, letterSpacing: "0.12em" }}>RISCO {blockedDetails.risco}</span>
                  <span className="mono-font" style={{ fontSize: 10, color: palette.danger, background: palette.danger + "18", padding: "5px 9px", borderRadius: 6, letterSpacing: "0.12em" }}>{blockedDetails.evidenciaId}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DUAL FEED: Escritas (Saúde) | Leituras (Educação/Saúde) */}
        <div className="audit-dual-feed" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          borderTop: "none",
        }}>
          {/* COLUNA ESQUERDA: ESCRITAS */}
          <div style={{
            padding: 20,
            borderRight: `1px solid ${palette.border}`,
          }} className="audit-col-left">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 8, flexWrap: "wrap" }}>
              <div>
                <div className="mono-font" style={{ fontSize: 9, color: palette.success, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 4 }}>
                  ─ ESCRITAS · DOMÍNIO DA SAÚDE
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: palette.text }}>
                  Registros de doses aplicadas
                </div>
              </div>
              <button
                onClick={adicionarRegistro}
                disabled={adding}
                style={{
                  padding: "6px 12px",
                  background: palette.success,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: adding ? "wait" : "pointer",
                  opacity: adding ? 0.6 : 1,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "inherit",
                }}
              >
                <Sparkles size={12} />
                {adding ? "Registrando..." : "Simular dose"}
              </button>
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <AnimatePresence>
                {registros.map((r, i) => (
                  <motion.div
                    key={`reg-${r.protocolo}-${i}`}
                    layout
                    initial={r.novo ? { opacity: 0, x: -20, scale: 0.95 } : { opacity: 1 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      padding: "12px 14px",
                      background: r.novo ? palette.success + "15" : palette.surfaceAlt,
                      borderRadius: 10,
                      borderLeft: `3px solid ${palette.success}`,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, gap: 8, flexWrap: "wrap" }}>
                      <span className="mono-font" style={{ fontSize: 11, fontWeight: 600, color: palette.text }}>
                        {r.ts} · {r.ubs}
                      </span>
                      <span className="mono-font" style={{ fontSize: 9, color: palette.success, letterSpacing: "0.1em", padding: "2px 6px", background: palette.success + "22", borderRadius: 4, fontWeight: 700 }}>
                        +REGISTRO
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: palette.text, marginBottom: 4 }}>
                      {r.evento}
                    </div>
                    <div className="mono-font" style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.05em" }}>
                      cidadão: {r.cidadao} · proto: {r.protocolo}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* COLUNA DIREITA: LEITURAS */}
          <div style={{ padding: 20 }} className="audit-col-right">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 8, flexWrap: "wrap" }}>
              <div>
                <div className="mono-font" style={{ fontSize: 9, color: palette.primary, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 4 }}>
                  ─ LEITURAS · CONSULTAS DE STATUS
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: palette.text }}>
                  Acessos por escolas e UBS
                </div>
              </div>
              <button
                onClick={simularBloqueio}
                style={{
                  padding: "6px 12px",
                  background: showBlocked ? palette.danger : "transparent",
                  color: showBlocked ? "#fff" : palette.danger,
                  border: `1px solid ${palette.danger}`,
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {showBlocked ? "↺ Ocultar" : "▶ Simular bloqueio aleatório"}
              </button>
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <AnimatePresence>
                {allConsultas.map((log, i) => (
                  <motion.div
                    key={`cons-${log.ts}-${log.ok ? "ok" : "block"}`}
                    layout
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      padding: "12px 14px",
                      background: log.ok ? palette.surfaceAlt : palette.danger + "0d",
                      borderRadius: 10,
                      borderLeft: `3px solid ${log.ok ? palette.primary : palette.danger}`,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, gap: 8, flexWrap: "wrap" }}>
                      <span className="mono-font" style={{ fontSize: 11, fontWeight: 600, color: palette.text }}>
                        {log.ts} · {log.agent}
                      </span>
                      <span className="mono-font" style={{
                        fontSize: 9,
                        padding: "2px 6px",
                        background: log.ok ? palette.primary + "22" : palette.danger,
                        color: log.ok ? palette.primary : "#fff",
                        borderRadius: 4,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                      }}>
                        {log.ok ? "OK" : "BLOCKED"}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: palette.text, marginBottom: 4 }}>
                      <span style={{ color: palette.textMuted }}>Finalidade:</span>{" "}
                      <strong style={{ color: log.ok ? palette.text : palette.danger }}>{log.finalidade}</strong>
                    </div>
                    <div className="mono-font" style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.05em" }}>
                      cidadão: {log.cidadao} · {log.duracao}
                    </div>

                    {/* DETALHES FORENSES DO BLOQUEIO (expandidos quando ok=false) */}
                    {!log.ok && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                          marginTop: 12,
                          paddingTop: 12,
                          borderTop: `1px dashed ${palette.danger}66`,
                        }}
                      >
                        <div className="mono-font" style={{ fontSize: 9, color: palette.danger, letterSpacing: "0.2em", marginBottom: 8, fontWeight: 700 }}>
                          ⚠ DETALHES FORENSES · RASTREADO
                        </div>
                        <div style={{ display: "grid", gap: 5, fontSize: 11 }}>
                          {[
                            { icon: "📍", label: "Origem", value: log.origem },
                            { icon: "🏛", label: "Local", value: log.bairro },
                            { icon: "👤", label: "Agente", value: `${log.agenteNome} (${log.cargo})` },
                            { icon: "🎫", label: "Matrícula", value: log.matricula },
                            { icon: "💻", label: "Dispositivo", value: log.dispositivo },
                            { icon: "🌐", label: "IP", value: log.ip },
                            { icon: "🆔", label: "Sessão", value: log.sessao },
                            { icon: "🚦", label: "Risco", value: log.risco },
                            { icon: "📋", label: "Resp.", value: log.responsabilizacao },
                            { icon: "🛡", label: "DPO", value: log.dpoAlerta },
                          ].map((d, idx) => (
                            <div key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                              <span style={{ fontSize: 11, opacity: 0.8 }}>{d.icon}</span>
                              <span className="mono-font" style={{ fontSize: 10, color: palette.textMuted, minWidth: 50, letterSpacing: "0.05em" }}>
                                {d.label}:
                              </span>
                              <span style={{ fontSize: 11, color: palette.text, flex: 1, lineHeight: 1.5 }}>
                                {d.value}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div style={{
                          marginTop: 10,
                          padding: 10,
                          background: palette.danger + "11",
                          borderRadius: 6,
                          fontSize: 11,
                          color: palette.danger,
                          fontStyle: "italic",
                          lineHeight: 1.5,
                        }}>
                          ⚠ <strong>Motivo:</strong> {log.motivo}. A tentativa foi registrada permanentemente e pode ser usada como evidência em auditoria pela autoridade de proteção de dados.
                        </div>

                        <button
                          onClick={() => setShowEvidence((v) => !v)}
                          style={{
                            marginTop: 10,
                            padding: "8px 12px",
                            background: showEvidence ? palette.danger : "transparent",
                            color: showEvidence ? "#fff" : palette.danger,
                            border: `1px solid ${palette.danger}`,
                            borderRadius: 8,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          {showEvidence ? "Ocultar evidência" : "Ver evidência gerada"}
                        </button>

                        <AnimatePresence>
                          {showEvidence && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: "auto" }}
                              exit={{ opacity: 0, y: -6, height: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{
                                marginTop: 10,
                                padding: 14,
                                background: palette.bg,
                                border: `1px solid ${palette.border}`,
                                borderRadius: 10,
                              }}
                            >
                              <div className="mono-font" style={{ fontSize: 9, color: palette.accent, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 10 }}>
                                REGISTRO DE AUDITORIA · {log.evidenciaId}
                              </div>
                              <div style={{ display: "grid", gap: 6, fontSize: 11 }}>
                                {[
                                  ["Hash do evento", log.hashEvento],
                                  ["Status", "Imutável · gravado na trilha de auditoria"],
                                  ["Origem", `${log.origem} · ${log.ip}`],
                                  ["Usuário autenticado", `${log.agenteNome} · ${log.matricula}`],
                                  ["Ação tentada", log.finalidade],
                                  ["Resultado", `${log.statusHttp} · dado não retornado`],
                                ].map(([label, value], idx) => (
                                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: 10 }}>
                                    <span className="mono-font" style={{ color: palette.textMuted, fontSize: 9, letterSpacing: "0.1em" }}>{label.toUpperCase()}</span>
                                    <span style={{ color: palette.text, lineHeight: 1.45 }}>{value}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer com hash */}
        <div style={{
          padding: "12px 20px",
          background: palette.surfaceAlt,
          border: `1px solid ${palette.border}`,
          borderTop: "none",
          borderRadius: "0 0 18px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}>
          <div className="mono-font" style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 8 }}>
            <Lock size={12} color={palette.accent} strokeWidth={1.6} />
            REGISTRO IMUTÁVEL · hash: {showBlocked ? blockedDetails.hashEvento : "7f3a9b2e8c4d..."}
          </div>
          <div className="mono-font" style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.1em" }}>
            {registros.length} escritas · {allConsultas.length} leituras · {eventosBloqueados} bloqueio{eventosBloqueados !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Deep dive trigger */}
        <motion.button
          onClick={() => openPortal("audit")}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          style={{
            marginTop: 24,
            width: "100%",
            display: "flex",
            padding: "24px 28px",
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: 16,
            cursor: "pointer",
            fontFamily: "inherit",
            color: palette.text,
            textAlign: "left",
            gap: 18,
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.3s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = palette.accent; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = palette.border; }}
        >
          <div style={{
            position: "absolute",
            right: -40,
            top: "50%",
            transform: "translateY(-50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${palette.accent}22, transparent 70%)`,
            pointerEvents: "none",
          }} />
          <div style={{
            width: 48,
            height: 48,
            minWidth: 48,
            borderRadius: 12,
            background: palette.accent + "15",
            color: palette.accent,
            display: "grid",
            placeItems: "center",
            position: "relative",
          }}>
            <ScrollText size={20} strokeWidth={1.4} />
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <div className="mono-font" style={{ fontSize: 9, color: palette.accent, letterSpacing: "0.25em", marginBottom: 6, fontWeight: 700 }}>
              ↳ DEEP DIVE
            </div>
            <div className="display-font" style={{ fontSize: 17, fontWeight: 500, marginBottom: 4 }}>
              Como cada acesso vira evidência forense?
            </div>
            <div style={{ fontSize: 12, color: palette.textMuted }}>
              Explore a timeline interativa de eventos auditados
            </div>
          </div>
          <ArrowRight size={18} color={palette.accent} style={{ position: "relative" }} />
        </motion.button>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .audit-dual-feed { grid-template-columns: 1fr !important; }
          .audit-col-left { border-right: none !important; border-bottom: 1px solid ${palette.border}; }
          .audit-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </SectionWrap>
  );
}



// ============================================
// 13. IMPACTO SOCIAL
// ============================================
function ImpactoSocial({ palette }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const impactos = [
    { stat: "−4h", label: "Tempo médio economizado por família", desc: "Sem deslocamento à UBS exclusivamente para emitir comprovante." },
    { stat: "−R$ 18", label: "Custo evitado por matrícula", desc: "Considerando transporte público, impressão e tempo do servidor." },
    { stat: "+23%", label: "Adesão estimada à matrícula no prazo", desc: "Pendência deixa de ser barreira e passa a ser orientação." },
  ];

  return (
    <SectionWrap palette={palette} alt>
      <SectionHeader
        palette={palette}
        kicker="Valor público"
        title="Impacto social esperado"
        subtitle="O impacto principal é diminuir o esforço do cidadão para acessar um direito básico."
      />
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
        {impactos.map((imp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            style={{
              padding: 40,
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              background: `radial-gradient(circle, ${palette.accent}20, transparent 70%)`,
              borderRadius: "50%",
            }} />
            <div className="display-font" style={{ fontSize: 64, fontWeight: 600, color: palette.accent, lineHeight: 1, marginBottom: 16, position: "relative", letterSpacing: "-0.04em" }}>
              {imp.stat}
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px", position: "relative" }}>{imp.label}</h4>
            <p style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6, margin: 0, position: "relative" }}>{imp.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrap>
  );
}


// ============================================
// 15. ARQUITETURA DEMONSTRATIVA
// ============================================
function ArquiteturaDemo({ palette }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const camadas = [
    { nivel: "Camada de apresentação", desc: "Portal da Educação, app do cidadão, painel da Saúde. Front separado por audiência.", icon: Eye, color: palette.primary },
    { nivel: "Camada de orquestração", desc: "API Gateway com autenticação por agente, autorização por finalidade e rate limiting.", icon: GitBranch, color: palette.accent },
    { nivel: "Camada de cálculo", desc: "Serviço que transforma registros clínicos em status objetivo (LIBERADO/EM DIA/PENDENTE/NÃO LOCALIZADO).", icon: Activity, color: palette.success },
    { nivel: "Camada de dados", desc: "Base clínica isolada na Saúde + base pseudonimizada acessada pela Educação.", icon: Database, color: palette.primaryDeep },
    { nivel: "Camada de auditoria", desc: "Log imutável transversal a todas as camadas, com finalidade declarada por requisição.", icon: ScrollText, color: palette.warn },
  ];

  return (
    <SectionWrap palette={palette} alt>
      <SectionHeader
        palette={palette}
        kicker="Visão técnica"
        title="Arquitetura em camadas"
        subtitle="Estrutura demonstrativa, não vinculante — pensada para conversa com áreas técnicas das secretarias."
      />
      <div ref={ref} style={{ display: "grid", gap: 12, maxWidth: 900, margin: "0 auto" }}>
        {camadas.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ x: 8 }}
              style={{
                padding: "20px 28px",
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderLeft: `4px solid ${c.color}`,
                borderRadius: 12,
                display: "flex",
                gap: 20,
                alignItems: "center",
              }}
            >
              <div style={{
                minWidth: 44,
                width: 44,
                height: 44,
                borderRadius: 10,
                background: c.color + "1a",
                color: c.color,
                display: "grid",
                placeItems: "center",
              }}>
                <Icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{c.nivel}</div>
                <div style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.5 }}>{c.desc}</div>
              </div>
              <div style={{ fontSize: 11, color: palette.textMuted, fontFamily: "monospace" }}>L{i + 1}</div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ============================================
// 16. LIMITES DA DEMO
// ============================================
function LimitesDemo({ palette }) {
  const itens = [
    "Esta página é uma demonstração visual. Não é sistema oficial.",
    "Todos os dados, CPFs e nomes apresentados são fictícios.",
    "Não está integrada a sistemas reais da Saúde ou Educação.",
    "Não está pronta para produção e não promete segurança absoluta.",
    "Decisões reais sobre matrícula devem seguir os trâmites oficiais vigentes.",
    "A finalidade é demonstrar uma arquitetura conceitual de governança digital.",
  ];

  return (
    <SectionWrap palette={palette}>
      <div style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 40,
        background: palette.surface,
        border: `2px dashed ${palette.warn}66`,
        borderRadius: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <AlertCircle size={24} color={palette.warn} />
          <h3 className="display-font" style={{ fontSize: 28, fontWeight: 500, margin: 0 }}>Limites desta demonstração</h3>
        </div>
        <p style={{ fontSize: 14, color: palette.textMuted, lineHeight: 1.6, marginBottom: 24 }}>
          Transparência sobre o que esta página é — e o que ainda não é.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
          {itens.map((i, idx) => (
            <li key={idx} style={{ display: "flex", gap: 12, fontSize: 14, color: palette.text, lineHeight: 1.6 }}>
              <span style={{ color: palette.warn, marginTop: 6, fontSize: 8 }}>●</span>
              {i}
            </li>
          ))}
        </ul>
      </div>
    </SectionWrap>
  );
}

// ============================================
// DEMONSTRAÇÃO PRÁTICA DE INTEGRAÇÃO (input CPF → resultado)
// ============================================
function DemonstracaoPratica({ palette }) {
  const sessaoAtiva = {
    usuario: "Ana Paula Santos",
    login: "ana.santos.semed",
    cargo: "Auxiliar de Secretaria Escolar",
    unidade: "Escola Municipal João Alves Filho",
    matricula: "SEMED-004829",
    ip: "200.150.42.18",
    dispositivo: "Secretaria-PC-03",
  };

  const finalidadeAtual = "Matrícula escolar";
  const dadosBloqueados = ["Histórico clínico", "Doenças", "Alergias", "Medicamentos", "Prontuário", "Exportação em massa"];
  const agoraCurta = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const [step, setStep] = useState(0); // 0: input, 1: processando, 2: resultado, 3: agendando, 4: confirmado
  const [resultado, setResultado] = useState(null);
  const [vacinasState, setVacinasState] = useState([]); // estado dinâmico das vacinas (pra atualizar após agendamento)
  const [statusState, setStatusState] = useState(null);
  const [statusColorState, setStatusColorState] = useState(null);
  const [orientacaoState, setOrientacaoState] = useState(null);
  const [agendamentoStep, setAgendamentoStep] = useState(0); // 0: ubs, 1: data, 2: hora, 3: confirmando
  const [ubsSelecionada, setUbsSelecionada] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horaSelecionada, setHoraSelecionada] = useState(null);
  const [protocolo, setProtocolo] = useState(null);
  const [cpfInput, setCpfInput] = useState("");
  const [acessoIndevido, setAcessoIndevido] = useState(null);
  const [orientacaoResponsavel, setOrientacaoResponsavel] = useState(false);
  const [auditEventos, setAuditEventos] = useState([
    { ts: "sessão", tipo: "login", texto: "Sessão institucional autenticada", detalhe: "Usuário, unidade, IP e dispositivo registrados.", cor: palette.primary },
  ]);

  const registrarEvento = (tipo, texto, detalhe, cor = palette.primary) => {
    setAuditEventos((prev) => [
      { ts: agoraCurta(), tipo, texto, detalhe, cor },
      ...prev.slice(0, 5),
    ]);
  };

  const exemplos = [
    {
      cpf: "111.222.333-44",
      nome: "Helena Silva",
      idade: 6,
      status: "LIBERADO",
      statusColor: palette.success,
      orientacao: "Esquema vacinal completo para a faixa etária. Matrícula liberada sem ações adicionais.",
      vacinas: [
        { nome: "BCG", data: "15/03/2018", status: "ok" },
        { nome: "Hepatite B", data: "12/04/2018", status: "ok" },
        { nome: "Pentavalente (3 doses)", data: "20/06/2018", status: "ok" },
        { nome: "Pneumocócica 10", data: "20/06/2018", status: "ok" },
        { nome: "Tríplice Viral", data: "12/04/2019", status: "ok" },
        { nome: "Febre Amarela", data: "08/09/2019", status: "ok" },
        { nome: "Tetraviral", data: "15/03/2022", status: "ok" },
        { nome: "DTP (reforço)", data: "10/04/2022", status: "ok" },
      ],
    },
    {
      cpf: "555.666.777-88",
      nome: "Pedro Mendes",
      idade: 11,
      status: "EM DIA",
      statusColor: palette.primary,
      orientacao: "Doses dentro do calendário. Próxima dose (HPV reforço) prevista em 60 dias.",
      vacinas: [
        { nome: "BCG", data: "10/05/2013", status: "ok" },
        { nome: "Hepatite B", data: "12/05/2013", status: "ok" },
        { nome: "Pentavalente (3 doses)", data: "15/07/2013", status: "ok" },
        { nome: "Tríplice Viral", data: "10/05/2014", status: "ok" },
        { nome: "DTP (reforço)", data: "10/05/2017", status: "ok" },
        { nome: "HPV (1ª dose)", data: "22/09/2024", status: "ok" },
        { nome: "Meningocócica ACWY", data: "15/01/2025", status: "ok" },
        { nome: "HPV (2ª dose)", data: "Previsto: 22/03/2026", status: "agendado" },
      ],
    },
    {
      cpf: "999.000.111-22",
      nome: "Lucas Rocha",
      idade: 8,
      status: "PENDENTE",
      statusColor: palette.warn,
      orientacao: "Tríplice Viral em atraso há 14 meses. Matrícula liberada com agendamento orientado na UBS.",
      vacinas: [
        { nome: "BCG", data: "08/02/2016", status: "ok" },
        { nome: "Hepatite B", data: "10/02/2016", status: "ok" },
        { nome: "Pentavalente (3 doses)", data: "20/04/2016", status: "ok" },
        { nome: "Pneumocócica 10", data: "20/04/2016", status: "ok" },
        { nome: "Tríplice Viral", data: "Em atraso desde mar/2025", status: "atrasado" },
        { nome: "Febre Amarela", data: "12/08/2017", status: "ok" },
        { nome: "DTP (reforço)", data: "15/03/2020", status: "ok" },
      ],
    },
    {
      cpf: "333.444.555-66",
      nome: null,
      idade: null,
      status: "NÃO LOCALIZADO",
      statusColor: palette.danger,
      orientacao: "Sem registro nas bases consultadas. Família orientada a comparecer à UBS para regularização inicial.",
      vacinas: [],
    },
  ];

  const ubsOptions = [
    { nome: "UBS Augusto Franco", endereco: "Av. Augusto Franco, 3115 · Ponto Novo", distancia: "1.2 km", tempo: "8 min", vacinaDisponivel: true, territorio: "compatível", horarios: 6, proxima: true },
    { nome: "UBS Atalaia", endereco: "R. Pedro Calazans, 458 · Atalaia", distancia: "2.4 km", tempo: "14 min", vacinaDisponivel: true, territorio: "compatível", horarios: 4, proxima: false },
    { nome: "UBS Centro", endereco: "Praça Camerino, 230 · Centro", distancia: "3.8 km", tempo: "18 min", vacinaDisponivel: true, territorio: "referência alternativa", horarios: 3, proxima: false },
  ];

  const horarios = [
    { periodo: "Manhã", slots: ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"] },
    { periodo: "Tarde", slots: ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30"] },
  ];

  // Gerar próximos 21 dias úteis
  const gerarDatas = () => {
    const datas = [];
    const hoje = new Date();
    for (let i = 1; i <= 21; i++) {
      const d = new Date(hoje);
      d.setDate(hoje.getDate() + i);
      const dia = d.getDate();
      const mes = d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
      const diaSemana = d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
      const isFimDeSemana = d.getDay() === 0 || d.getDay() === 6;
      const lotado = i % 7 === 3; // simula alguns dias lotados
      datas.push({
        date: d,
        dia,
        mes,
        diaSemana,
        disponivel: !isFimDeSemana && !lotado,
        motivo: isFimDeSemana ? "Fim de semana" : (lotado ? "Lotado" : null),
      });
    }
    return datas;
  };

  const datasDisponiveis = gerarDatas();

  const somenteNumeros = (valor) => String(valor || "").replace(/\D/g, "").slice(0, 11);

  const formatarCpf = (valor) => {
    const digits = somenteNumeros(valor);
    const p1 = digits.slice(0, 3);
    const p2 = digits.slice(3, 6);
    const p3 = digits.slice(6, 9);
    const p4 = digits.slice(9, 11);
    if (digits.length <= 3) return p1;
    if (digits.length <= 6) return `${p1}.${p2}`;
    if (digits.length <= 9) return `${p1}.${p2}.${p3}`;
    return `${p1}.${p2}.${p3}-${p4}`;
  };

  const cpfFormatado = formatarCpf(cpfInput);
  const cpfCompleto = cpfInput.length === 11;

  const digitarCpf = (numero) => {
    setCpfInput((prev) => (prev.length < 11 ? prev + numero : prev));
  };

  const apagarCpf = () => {
    setCpfInput((prev) => prev.slice(0, -1));
  };

  const limparCpf = () => {
    setCpfInput("");
  };

  const consultar = (cpfFromButton) => {
    const cpf = formatarCpf(cpfFromButton || cpfInput);
    if (somenteNumeros(cpf).length !== 11) return;

    const found = exemplos.find(ex => ex.cpf === cpf) || {
      cpf,
      nome: null,
      idade: null,
      status: "NÃO LOCALIZADO",
      statusColor: palette.danger,
      orientacao: "CPF não localizado nas bases demonstrativas consultadas. Família orientada a procurar a UBS para conferência cadastral.",
      vacinas: [],
    };

    setCpfInput(somenteNumeros(cpf));
    setAcessoIndevido(null);
    setOrientacaoResponsavel(false);
    setStep(1);
    setTimeout(() => {
      setResultado(found);
      setVacinasState(found.vacinas);
      setStatusState(found.status);
      setStatusColorState(found.statusColor);
      setOrientacaoState(found.orientacao);
      registrarEvento(
        "consulta",
        `CPF consultado para ${finalidadeAtual.toLowerCase()}`,
        `Retorno mínimo: ${found.status} · CPF mascarado: ***.***.${somenteNumeros(cpf).slice(6, 9)}-${somenteNumeros(cpf).slice(9, 11)}`,
        found.statusColor
      );
      setStep(2);
    }, 1400);
  };

  const reset = () => {
    setStep(0);
    setResultado(null);
    setVacinasState([]);
    setStatusState(null);
    setStatusColorState(null);
    setOrientacaoState(null);
    setAgendamentoStep(0);
    setUbsSelecionada(null);
    setDataSelecionada(null);
    setHoraSelecionada(null);
    setProtocolo(null);
    setCpfInput("");
    setAcessoIndevido(null);
    setOrientacaoResponsavel(false);
    setAuditEventos([
      { ts: "sessão", tipo: "login", texto: "Sessão institucional autenticada", detalhe: "Usuário, unidade, IP e dispositivo registrados.", cor: palette.primary },
    ]);
  };

  const iniciarAgendamento = () => {
    registrarEvento("encaminhamento", "Fluxo de agendamento iniciado", "Sistema sugeriu UBS por distância, território e disponibilidade de vacina.", palette.warn);
    setStep(3);
    setAgendamentoStep(0);
  };

  const cancelarAgendamento = () => {
    setStep(2);
    setAgendamentoStep(0);
    setUbsSelecionada(null);
    setDataSelecionada(null);
    setHoraSelecionada(null);
  };

  const confirmarAgendamento = (horaEscolhida = horaSelecionada) => {
    setAgendamentoStep(3); // loading
    setTimeout(() => {
      // Gera protocolo
      const proto = `VE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setProtocolo(proto);

      // ATUALIZA AS VACINAS EM TEMPO REAL (a vacina em atraso vira agendada)
      const dataFmt = `${dataSelecionada.dia}/${String(dataSelecionada.date.getMonth() + 1).padStart(2, "0")} às ${horaEscolhida}`;
      const vacinasAtualizadas = vacinasState.map(v => {
        if (v.status === "atrasado") {
          return { ...v, status: "agendado", data: `Agendada · ${dataFmt}` };
        }
        return v;
      });
      setVacinasState(vacinasAtualizadas);

      // Atualiza status do lado da escola
      setStatusState("AGENDADO");
      setStatusColorState(palette.primary);
      setOrientacaoState(`Agendamento confirmado em ${ubsSelecionada.nome} para ${dataFmt}. Matrícula liberada com compromisso registrado.`);
      registrarEvento("protocolo", `Protocolo ${proto} gerado`, `${ubsSelecionada.nome} · ${dataFmt} · responsável orientado.`, palette.success);

      setStep(4);
    }, 1400);
  };

  const statusVacinaConfig = {
    ok: { color: palette.success, icon: "✓", label: "Aplicada" },
    agendado: { color: palette.primary, icon: "◷", label: "Agendada" },
    atrasado: { color: palette.danger, icon: "✗", label: "Em atraso" },
  };

  const simularAcessoIndevido = () => {
    const tentativa = {
      titulo: "Tentativa fora do escopo detectada",
      usuario: sessaoAtiva.login,
      cargo: sessaoAtiva.cargo,
      acao: "Acessar histórico clínico completo",
      finalidade: finalidadeAtual,
      risco: "ALTO",
      motivo: "Perfil escolar pode consultar status vacinal, mas não prontuário, doenças, alergias ou medicamentos.",
      hash: `EV-${Math.random().toString(16).slice(2, 10).toUpperCase()}`,
    };
    setAcessoIndevido(tentativa);
    registrarEvento("bloqueio", tentativa.titulo, `${tentativa.acao} · ${tentativa.risco} · evidência ${tentativa.hash}`, palette.danger);
  };

  const podeAgendar = statusState && statusState !== "LIBERADO";
  const ubsSugerida = ubsOptions.find((ubs) => ubs.proxima) || ubsOptions[0];

  return (
    <SectionWrap palette={palette} id="demonstracao">
      <SectionHeader
        palette={palette}
        kicker="Demonstração prática · fluxo completo"
        title="Digite o CPF. O sistema consulta só o necessário."
        subtitle="Simule a entrada do CPF no terminal escolar: o sistema pseudonimiza a consulta, retorna apenas o status necessário para a matrícula e registra tudo para auditoria."
      />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatePresence mode="wait">
          {/* ========== STEP 0: SELEÇÃO ========== */}
          {step === 0 && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: 24,
                padding: 48,
                boxShadow: `0 20px 50px -20px rgba(10, 22, 40, 0.1)`,
                position: "relative",
                overflow: "hidden",
                maxWidth: 720,
                margin: "0 auto",
              }}
            >
              <div style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${palette.primary}11, transparent 70%)`,
                pointerEvents: "none",
              }} />

              <div className="mono-font" style={{ fontSize: 11, color: palette.accent, letterSpacing: "0.25em", marginBottom: 16, fontWeight: 600, position: "relative" }}>
                ─ TERMINAL DE CONSULTA
              </div>
              <h3 className="display-font" style={{ fontSize: 28, fontWeight: 500, margin: "0 0 12px", letterSpacing: "-0.02em", position: "relative" }}>
                Digite ou selecione um CPF demonstrativo
              </h3>
              <p style={{ fontSize: 14, color: palette.textMuted, marginBottom: 28, lineHeight: 1.6, position: "relative" }}>
                Esta tela simula a entrada real no balcão da secretaria. O CPF é digitado, transformado em token seguro e a escola recebe apenas o status necessário — sem prontuário, doenças ou histórico clínico.
              </p>

              {/* Sessão institucional + finalidade declarada */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 22, position: "relative" }}>
                <div style={{ padding: 16, background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: 14 }}>
                  <div className="mono-font" style={{ fontSize: 9, color: palette.primary, letterSpacing: "0.22em", fontWeight: 800, marginBottom: 10 }}>
                    ─ SESSÃO ATIVA
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{sessaoAtiva.usuario}</div>
                  <div style={{ fontSize: 12, color: palette.textMuted, lineHeight: 1.5 }}>{sessaoAtiva.cargo}<br />{sessaoAtiva.unidade}</div>
                  <div className="mono-font" style={{ fontSize: 10, color: palette.textMuted, marginTop: 10, lineHeight: 1.6 }}>
                    matrícula: {sessaoAtiva.matricula}<br />ip: {sessaoAtiva.ip}<br />dispositivo: {sessaoAtiva.dispositivo}
                  </div>
                </div>
                <div style={{ padding: 16, background: `${palette.primary}0f`, border: `1px solid ${palette.primary}55`, borderRadius: 14 }}>
                  <div className="mono-font" style={{ fontSize: 9, color: palette.primary, letterSpacing: "0.22em", fontWeight: 800, marginBottom: 10 }}>
                    ─ FINALIDADE DECLARADA
                  </div>
                  <div className="display-font" style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{finalidadeAtual}</div>
                  <div style={{ fontSize: 12, color: palette.textMuted, lineHeight: 1.6 }}>
                    O sistema valida <strong style={{ color: palette.text }}>perfil + finalidade + dado solicitado</strong> antes de retornar qualquer informação.
                  </div>
                  <div className="mono-font" style={{ marginTop: 10, fontSize: 10, color: palette.success, letterSpacing: "0.12em", fontWeight: 700 }}>
                    PERMITIDO: status vacinal mínimo
                  </div>
                </div>
              </div>

              <div style={{
                position: "relative",
                padding: 22,
                background: palette.bg,
                border: `1px solid ${palette.border}`,
                borderRadius: 18,
                marginBottom: 26,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
                  <div>
                    <div className="mono-font" style={{ fontSize: 10, color: palette.primary, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 6 }}>
                      ─ ENTRADA DE CPF · CONSULTA CONTROLADA
                    </div>
                    <div style={{ fontSize: 13, color: palette.textMuted }}>
                      Simulação de digitação no terminal da escola
                    </div>
                  </div>
                  <div className="mono-font" style={{
                    fontSize: 10,
                    color: cpfCompleto ? palette.success : palette.textMuted,
                    padding: "6px 10px",
                    border: `1px solid ${cpfCompleto ? palette.success : palette.border}`,
                    borderRadius: 999,
                    letterSpacing: "0.16em",
                    fontWeight: 700,
                  }}>
                    {cpfInput.length}/11 DÍGITOS
                  </div>
                </div>

                <input
                  value={cpfFormatado}
                  onChange={(e) => setCpfInput(somenteNumeros(e.target.value))}
                  placeholder="___.___.___-__"
                  inputMode="numeric"
                  maxLength={14}
                  className="mono-font"
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    borderRadius: 14,
                    border: `1px solid ${cpfCompleto ? palette.success : palette.border}`,
                    background: palette.surface,
                    color: palette.text,
                    fontSize: "clamp(20px, 5vw, 32px)",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    outline: "none",
                    textAlign: "center",
                    marginBottom: 16,
                  }}
                />

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 14 }}>
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "limpar", "0", "apagar"].map((tecla) => (
                    <motion.button
                      key={tecla}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        if (tecla === "limpar") limparCpf();
                        else if (tecla === "apagar") apagarCpf();
                        else digitarCpf(tecla);
                      }}
                      style={{
                        padding: tecla === "limpar" || tecla === "apagar" ? "12px 8px" : "14px 8px",
                        background: tecla === "limpar" || tecla === "apagar" ? palette.surfaceAlt : palette.surface,
                        color: tecla === "limpar" || tecla === "apagar" ? palette.textMuted : palette.text,
                        border: `1px solid ${palette.border}`,
                        borderRadius: 12,
                        cursor: "pointer",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: tecla === "limpar" || tecla === "apagar" ? 10 : 18,
                        fontWeight: 700,
                        letterSpacing: tecla === "limpar" || tecla === "apagar" ? "0.16em" : "0.02em",
                        textTransform: tecla === "limpar" ? "uppercase" : "none",
                      }}
                    >
                      {tecla === "apagar" ? "←" : tecla}
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={() => consultar()}
                  disabled={!cpfCompleto}
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                    padding: "15px 20px",
                    background: cpfCompleto ? palette.text : palette.surfaceAlt,
                    color: cpfCompleto ? palette.bg : palette.textMuted,
                    border: `1px solid ${cpfCompleto ? palette.text : palette.border}`,
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: cpfCompleto ? "pointer" : "not-allowed",
                    opacity: cpfCompleto ? 1 : 0.65,
                  }}
                >
                  <Search size={16} /> Consultar CPF
                </button>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: 10,
                  marginTop: 16,
                }}>
                  {[
                    { label: "Finalidade", value: "matrícula" },
                    { label: "Retorno", value: "status mínimo" },
                    { label: "Auditoria", value: "obrigatória" },
                  ].map((item) => (
                    <div key={item.label} style={{ padding: "10px 12px", background: palette.surfaceAlt, borderRadius: 10 }}>
                      <div className="mono-font" style={{ fontSize: 9, color: palette.textMuted, letterSpacing: "0.18em", marginBottom: 4 }}>
                        {item.label.toUpperCase()}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: palette.text }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mono-font" style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.18em", marginBottom: 12, fontWeight: 700, position: "relative" }}>
                ─ ATALHOS PARA APRESENTAÇÃO
              </div>
              <div style={{ display: "grid", gap: 10, position: "relative" }}>
                {exemplos.map((ex, i) => (
                  <motion.button
                    key={i}
                    onClick={() => consultar(ex.cpf)}
                    whileHover={{ x: 4 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "16px 20px",
                      background: palette.bg,
                      border: `1px solid ${palette.border}`,
                      borderRadius: 12,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      color: palette.text,
                      textAlign: "left",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = ex.statusColor;
                      e.currentTarget.style.background = ex.statusColor + "08";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = palette.border;
                      e.currentTarget.style.background = palette.bg;
                    }}
                  >
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: ex.statusColor,
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div className="mono-font" style={{ fontSize: 16, fontWeight: 500, color: palette.text, letterSpacing: "0.02em" }}>
                        {ex.cpf}
                      </div>
                      <div className="mono-font" style={{ fontSize: 10, color: ex.statusColor, letterSpacing: "0.2em", marginTop: 4, fontWeight: 700 }}>
                        ↳ {ex.status}
                      </div>
                      <div style={{ fontSize: 11, color: palette.textMuted, marginTop: 5 }}>
                        Preenche o CPF e executa a consulta segura
                      </div>
                    </div>
                    <ArrowRight size={16} color={ex.statusColor} />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========== STEP 1: PROCESSANDO ========== */}
          {step === 1 && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: 24,
                padding: 48,
                textAlign: "center",
                maxWidth: 720,
                margin: "0 auto",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{
                  width: 56,
                  height: 56,
                  border: `3px solid ${palette.border}`,
                  borderTopColor: palette.primary,
                  borderRadius: "50%",
                  margin: "0 auto 24px",
                }}
              />
              <div className="mono-font" style={{ fontSize: 12, color: palette.primary, letterSpacing: "0.2em", marginBottom: 16, fontWeight: 600 }}>
                PROCESSANDO CONSULTA SEGURA
              </div>
              <div style={{ display: "grid", gap: 8, maxWidth: 400, margin: "0 auto" }}>
                {[
                  "Pseudonimização aplicada (SHA-256)",
                  "Token enviado ao banco da Saúde",
                  "Status calculado e retornado",
                  "Acesso registrado em auditoria",
                ].map((label, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.3 }}
                    className="mono-font"
                    style={{
                      fontSize: 11,
                      color: palette.textMuted,
                      textAlign: "left",
                      padding: "8px 14px",
                      background: palette.surfaceAlt,
                      borderRadius: 8,
                      borderLeft: `2px solid ${palette.success}`,
                      letterSpacing: "0.05em",
                    }}
                  >
                    ✓ {label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========== STEPS 2 & 4: VISÃO DUPLA ========== */}
          {(step === 2 || step === 4) && resultado && (
            <motion.div
              key={`result-${step}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div className="mono-font" style={{ fontSize: 11, color: palette.accent, letterSpacing: "0.25em", fontWeight: 600 }}>
                  {step === 4 ? "─ AGENDAMENTO CONFIRMADO · DADOS ATUALIZADOS" : "─ MESMA CONSULTA · DUAS VISÕES"}
                </div>
                <button
                  onClick={reset}
                  style={{
                    padding: "8px 18px",
                    background: "transparent",
                    color: palette.textMuted,
                    border: `1px solid ${palette.border}`,
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ↻ Nova consulta
                </button>
              </div>

              {/* Banner de protocolo (só aparece após agendamento) */}
              {step === 4 && protocolo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: "16px 24px",
                    background: `linear-gradient(135deg, ${palette.success}11, ${palette.primary}11)`,
                    border: `2px solid ${palette.success}`,
                    borderRadius: 14,
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: palette.success + "22", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Check size={20} color={palette.success} strokeWidth={2.5} />
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div className="mono-font" style={{ fontSize: 10, color: palette.success, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 2 }}>
                      ─ PROTOCOLO GERADO
                    </div>
                    <div className="display-font" style={{ fontSize: 18, fontWeight: 600 }}>
                      {protocolo}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: palette.textMuted, lineHeight: 1.5 }}>
                    {ubsSelecionada?.nome}<br />{dataSelecionada?.dia}/{String((dataSelecionada?.date?.getMonth?.() ?? 0) + 1).padStart(2, "0")} · {horaSelecionada}
                  </div>
                  <button
                    onClick={() => setOrientacaoResponsavel(true)}
                    style={{
                      padding: "10px 14px",
                      background: orientacaoResponsavel ? palette.success : palette.primary,
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                  >
                    {orientacaoResponsavel ? "Responsável orientado ✓" : "Enviar orientação"}
                  </button>
                </motion.div>
              )}

              {/* Motor de decisão + política de minimização */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 16 }}>
                <div style={{ padding: 18, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 16 }}>
                  <div className="mono-font" style={{ fontSize: 9, color: palette.primary, letterSpacing: "0.22em", fontWeight: 800, marginBottom: 10 }}>
                    ─ MOTOR DE DECISÃO
                  </div>
                  {[
                    "CPF recebido → token pseudonimizado",
                    `Finalidade validada → ${finalidadeAtual}`,
                    `Perfil validado → ${sessaoAtiva.cargo}`,
                    `Retorno permitido → ${statusState}`,
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: palette.textMuted, lineHeight: 1.6, marginBottom: 6 }}>
                      <Check size={13} color={palette.success} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: 18, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 16 }}>
                  <div className="mono-font" style={{ fontSize: 9, color: palette.success, letterSpacing: "0.22em", fontWeight: 800, marginBottom: 10 }}>
                    ─ A ESCOLA RECEBE
                  </div>
                  {["Status vacinal", "Orientação de matrícula", "Encaminhamento para UBS", "Protocolo, se houver agendamento"].map((item, i) => (
                    <div key={i} style={{ fontSize: 12, color: palette.text, marginBottom: 7 }}>✓ {item}</div>
                  ))}
                </div>
                <div style={{ padding: 18, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 16 }}>
                  <div className="mono-font" style={{ fontSize: 9, color: palette.danger, letterSpacing: "0.22em", fontWeight: 800, marginBottom: 10 }}>
                    ─ A ESCOLA NÃO RECEBE
                  </div>
                  {dadosBloqueados.slice(0, 5).map((item, i) => (
                    <div key={i} style={{ fontSize: 12, color: palette.textMuted, marginBottom: 7 }}>× {item}</div>
                  ))}
                </div>
              </div>

              {/* Grid de duas visões */}
              <div className="visao-dupla-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* COLUNA 1: Visão Família/UBS */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    background: palette.surface,
                    border: `1px solid ${palette.border}`,
                    borderRadius: 20,
                    padding: 28,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: palette.success + "22", color: palette.success, display: "grid", placeItems: "center" }}>
                      <Heart size={16} strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="mono-font" style={{ fontSize: 9, color: palette.success, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 2 }}>
                        DOMÍNIO DA SAÚDE / FAMÍLIA
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>O que se vê aqui:</div>
                    </div>
                  </div>

                  <div style={{ fontSize: 12, color: palette.textMuted, lineHeight: 1.6, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${palette.border}` }}>
                    Histórico clínico completo. Cada vacina, cada data, status individual de cada dose.
                  </div>

                  {resultado.idade !== null && (
                    <div style={{ marginBottom: 16 }}>
                      <div className="display-font" style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 4 }}>
                        {resultado.nome}
                      </div>
                      <div className="mono-font" style={{ fontSize: 11, color: palette.textMuted, letterSpacing: "0.05em" }}>
                        {resultado.idade} anos · CPF {resultado.cpf}
                      </div>
                    </div>
                  )}

                  {vacinasState.length > 0 ? (
                    <div style={{ display: "grid", gap: 6 }}>
                      <div className="mono-font" style={{ fontSize: 9, color: palette.textMuted, letterSpacing: "0.2em", marginBottom: 4, fontWeight: 600 }}>
                        ─ HISTÓRICO VACINAL ({vacinasState.length} REGISTROS)
                      </div>
                      {vacinasState.map((v, i) => {
                        const cfg = statusVacinaConfig[v.status];
                        return (
                          <motion.div
                            key={`${i}-${v.status}`}
                            layout
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.04 }}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "20px 1fr auto",
                              gap: 10,
                              padding: "10px 12px",
                              background: v.status === "atrasado" ? palette.danger + "0d" : (v.status === "agendado" ? palette.primary + "0d" : palette.surfaceAlt),
                              borderRadius: 8,
                              borderLeft: `2px solid ${cfg.color}`,
                              alignItems: "center",
                            }}
                          >
                            <span style={{ color: cfg.color, fontSize: 14, fontWeight: 700, textAlign: "center" }}>
                              {cfg.icon}
                            </span>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 500, color: palette.text, lineHeight: 1.3 }}>
                                {v.nome}
                              </div>
                              <div className="mono-font" style={{ fontSize: 10, color: palette.textMuted, marginTop: 2, letterSpacing: "0.03em" }}>
                                {v.data}
                              </div>
                            </div>
                            <span className="mono-font" style={{
                              fontSize: 9,
                              color: cfg.color,
                              letterSpacing: "0.15em",
                              fontWeight: 700,
                              padding: "3px 8px",
                              border: `1px solid ${cfg.color}`,
                              borderRadius: 100,
                              textTransform: "uppercase",
                            }}>
                              {cfg.label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ padding: 16, background: palette.surfaceAlt, borderRadius: 8, fontSize: 12, color: palette.textMuted, textAlign: "center", fontStyle: "italic" }}>
                      Nenhum registro vacinal localizado nas bases.
                    </div>
                  )}
                </motion.div>

                {/* COLUNA 2: Visão Escola */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    background: palette.surface,
                    border: `1px solid ${palette.border}`,
                    borderRadius: 20,
                    padding: 28,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: palette.primary + "22", color: palette.primary, display: "grid", placeItems: "center" }}>
                      <GraduationCap size={16} strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="mono-font" style={{ fontSize: 9, color: palette.primary, letterSpacing: "0.25em", fontWeight: 700, marginBottom: 2 }}>
                        DOMÍNIO DA EDUCAÇÃO / ESCOLA
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>O que se vê aqui:</div>
                    </div>
                  </div>

                  <div style={{ fontSize: 12, color: palette.textMuted, lineHeight: 1.6, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${palette.border}` }}>
                    <strong style={{ color: palette.text }}>Apenas o status</strong>. Sem nome, sem CPF, sem histórico clínico, sem datas.
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "24px 0", textAlign: "center" }}>
                    <motion.div
                      key={statusState}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "14px 28px",
                        background: statusColorState + "15",
                        border: `2px solid ${statusColorState}`,
                        borderRadius: 100,
                        marginBottom: 24,
                      }}
                    >
                      <span style={{ width: 12, height: 12, borderRadius: "50%", background: statusColorState }} />
                      <span style={{ fontSize: 16, fontWeight: 700, color: statusColorState, letterSpacing: "0.05em" }}>
                        {statusState}
                      </span>
                    </motion.div>

                    <div className="display-font" style={{ fontSize: 18, fontWeight: 500, color: palette.text, marginBottom: 12, maxWidth: 320, lineHeight: 1.4 }}>
                      Orientação à matrícula
                    </div>
                    <motion.p
                      key={orientacaoState}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.7, maxWidth: 320, margin: 0 }}
                    >
                      {orientacaoState}
                    </motion.p>
                  </div>

                  <div style={{
                    padding: 14,
                    background: palette.surfaceAlt,
                    borderRadius: 10,
                    borderLeft: `2px solid ${palette.primary}`,
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: palette.textMuted,
                    lineHeight: 1.7,
                    marginTop: 16,
                  }}>
                    <div><strong style={{ color: palette.text }}>RETURN:</strong> status_only</div>
                    <div><strong style={{ color: palette.text }}>WITHHELD:</strong> {vacinasState.length} registros clínicos</div>
                    <div><strong style={{ color: palette.text }}>RESPONSE_TIME:</strong> 247ms · AUDIT_LOG: ✓</div>
                  </div>
                </motion.div>
              </div>

              {/* Segurança operacional: testar acesso indevido + trilha do protótipo */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginTop: 16 }}>
                <div style={{ padding: 20, background: palette.surface, border: `1px solid ${acessoIndevido ? palette.danger : palette.border}`, borderRadius: 16 }}>
                  <div className="mono-font" style={{ fontSize: 10, color: palette.danger, letterSpacing: "0.22em", fontWeight: 800, marginBottom: 10 }}>
                    ─ TESTE DE ACESSO INDEVIDO
                  </div>
                  <p style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6, margin: "0 0 14px" }}>
                    Simula um servidor escolar tentando abrir prontuário completo. O sistema deve bloquear e registrar evidência.
                  </p>
                  <button
                    onClick={simularAcessoIndevido}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: 12,
                      border: `1px solid ${palette.danger}`,
                      background: acessoIndevido ? palette.danger + "18" : "transparent",
                      color: palette.danger,
                      cursor: "pointer",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      fontSize: 11,
                      textTransform: "uppercase",
                    }}
                  >
                    Testar acesso indevido
                  </button>
                  {acessoIndevido && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 14, padding: 14, borderRadius: 12, background: palette.danger + "10", borderLeft: `3px solid ${palette.danger}` }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: palette.danger, marginBottom: 6 }}>{acessoIndevido.titulo}</div>
                      <div style={{ fontSize: 12, color: palette.textMuted, lineHeight: 1.6 }}>
                        Usuário: <strong style={{ color: palette.text }}>{acessoIndevido.usuario}</strong><br />
                        Ação: <strong style={{ color: palette.text }}>{acessoIndevido.acao}</strong><br />
                        Risco: <strong style={{ color: palette.danger }}>{acessoIndevido.risco}</strong><br />
                        Evidência: <strong style={{ color: palette.text }}>{acessoIndevido.hash}</strong>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div style={{ padding: 20, background: palette.surface, border: `1px solid ${palette.border}`, borderRadius: 16 }}>
                  <div className="mono-font" style={{ fontSize: 10, color: palette.accent, letterSpacing: "0.22em", fontWeight: 800, marginBottom: 10 }}>
                    ─ TRILHA DO PROTÓTIPO
                  </div>
                  <div style={{ display: "grid", gap: 8, maxHeight: 220, overflowY: "auto" }}>
                    {auditEventos.map((ev, i) => (
                      <div key={`${ev.ts}-${i}`} style={{ padding: "10px 12px", background: palette.bg, borderRadius: 10, borderLeft: `3px solid ${ev.cor}` }}>
                        <div className="mono-font" style={{ fontSize: 9, color: ev.cor, letterSpacing: "0.16em", marginBottom: 4, textTransform: "uppercase", fontWeight: 800 }}>
                          {ev.ts} · {ev.tipo}
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: palette.text, marginBottom: 2 }}>{ev.texto}</div>
                        <div style={{ fontSize: 11, color: palette.textMuted, lineHeight: 1.4 }}>{ev.detalhe}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botão de Agendamento (aparece se status != LIBERADO e ainda não agendou) */}
              {podeAgendar && step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  style={{ marginTop: 16 }}
                >
                  <motion.button
                    onClick={iniciarAgendamento}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%",
                      padding: "20px 28px",
                      background: `linear-gradient(135deg, ${palette.primary}, ${palette.primaryDeep})`,
                      color: "#fff",
                      border: "none",
                      borderRadius: 16,
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: `0 15px 35px -10px ${palette.primary}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      fontFamily: "inherit",
                    }}
                  >
                    <Sparkles size={18} />
                    {statusState === "PENDENTE" && "Agendar dose em atraso"}
                    {statusState === "EM DIA" && "Agendar próxima dose"}
                    {statusState === "NÃO LOCALIZADO" && "Agendar regularização inicial"}
                    <ArrowRight size={18} />
                  </motion.button>
                </motion.div>
              )}

              {/* Mensagem de fechamento */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                  marginTop: 24,
                  padding: 20,
                  background: `linear-gradient(135deg, ${palette.primary}11, ${palette.accent}11)`,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 14,
                  textAlign: "center",
                }}
              >
                <div className="mono-font" style={{ fontSize: 10, color: palette.accent, letterSpacing: "0.25em", marginBottom: 8, fontWeight: 700 }}>
                  ─ MINIMIZAÇÃO DE DADOS · LGPD ART. 6º
                </div>
                <p style={{ fontSize: 14, color: palette.text, lineHeight: 1.6, margin: 0, maxWidth: 700, marginInline: "auto" }}>
                  Mesma fonte de dados, duas visões diferentes. A escola cumpre sua função pública sem precisar acessar informação clínica sensível. <strong>Esta é a minimização aplicada na arquitetura.</strong>
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* ========== STEP 3: AGENDAMENTO ========== */}
          {step === 3 && (
            <motion.div
              key="agendamento"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: 24,
                padding: 40,
                maxWidth: 720,
                margin: "0 auto",
              }}
            >
              {/* Header com etapas */}
              <div style={{ marginBottom: 32 }}>
                <div className="mono-font" style={{ fontSize: 11, color: palette.primary, letterSpacing: "0.25em", marginBottom: 12, fontWeight: 600 }}>
                  ─ AGENDAMENTO NA UBS · ETAPA {agendamentoStep + 1} DE 3
                </div>
                {/* Barra de progresso */}
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{
                      flex: 1,
                      height: 4,
                      background: i <= agendamentoStep ? palette.primary : palette.border,
                      borderRadius: 2,
                      transition: "background 0.3s",
                    }} />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {/* ETAPA 0: Escolher UBS */}
                {agendamentoStep === 0 && (
                  <motion.div
                    key="ubs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="display-font" style={{ fontSize: 24, fontWeight: 500, margin: "0 0 10px", letterSpacing: "-0.02em" }}>
                      Escolha a UBS mais próxima
                    </h3>
                    <div style={{ padding: 16, background: `${palette.primary}0f`, border: `1px solid ${palette.primary}55`, borderRadius: 14, marginBottom: 16 }}>
                      <div className="mono-font" style={{ fontSize: 9, color: palette.primary, letterSpacing: "0.22em", fontWeight: 800, marginBottom: 8 }}>
                        ─ UBS MAIS PRÓXIMA SUGERIDA AUTOMATICAMENTE
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 800 }}>{ubsSugerida.nome}</div>
                          <div style={{ fontSize: 12, color: palette.textMuted, marginTop: 3 }}>{ubsSugerida.endereco}</div>
                        </div>
                        <div className="mono-font" style={{ fontSize: 11, color: palette.primary, fontWeight: 800, letterSpacing: "0.1em" }}>
                          {ubsSugerida.distancia} · {ubsSugerida.tempo}
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8, marginTop: 12 }}>
                        {[
                          ["Critério", "menor distância"],
                          ["Vacina", ubsSugerida.vacinaDisponivel ? "disponível" : "verificar"],
                          ["Território", ubsSugerida.territorio],
                          ["Horários", `${ubsSugerida.horarios} livres`],
                        ].map(([label, value]) => (
                          <div key={label} style={{ padding: "8px 10px", background: palette.surface, borderRadius: 10, border: `1px solid ${palette.border}` }}>
                            <div className="mono-font" style={{ fontSize: 8, color: palette.textMuted, letterSpacing: "0.16em", marginBottom: 3 }}>{label}</div>
                            <div style={{ fontSize: 11, fontWeight: 700 }}>{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "grid", gap: 10 }}>
                      {ubsOptions.map((ubs, i) => (
                        <button
                          key={i}
                          onClick={() => { setUbsSelecionada(ubs); setAgendamentoStep(1); }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            padding: "16px 20px",
                            background: palette.bg,
                            border: `1px solid ${palette.border}`,
                            borderRadius: 12,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            color: palette.text,
                            textAlign: "left",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = palette.primary; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = palette.border; }}
                        >
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: palette.primary + "15", color: palette.primary, display: "grid", placeItems: "center", flexShrink: 0 }}>
                            <Heart size={18} strokeWidth={1.6} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                              <span style={{ fontSize: 14, fontWeight: 600 }}>{ubs.nome}</span>
                              {ubs.proxima && (
                                <span className="mono-font" style={{ fontSize: 8, color: "#fff", background: palette.primary, padding: "3px 7px", borderRadius: 999, letterSpacing: "0.12em", fontWeight: 800 }}>
                                  MAIS PRÓXIMA
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 12, color: palette.textMuted }}>{ubs.endereco}</div>
                            <div style={{ fontSize: 11, color: palette.textMuted, marginTop: 4 }}>
                              Vacina disponível · território {ubs.territorio} · {ubs.horarios} horários livres
                            </div>
                          </div>
                          <div className="mono-font" style={{ fontSize: 11, color: palette.primary, letterSpacing: "0.1em", fontWeight: 600, textAlign: "right" }}>
                            {ubs.distancia}<br />{ubs.tempo}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ETAPA 1: Escolher Data */}
                {agendamentoStep === 1 && (
                  <motion.div
                    key="data"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="display-font" style={{ fontSize: 24, fontWeight: 500, margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                      Escolha a data
                    </h3>
                    <div style={{ fontSize: 12, color: palette.textMuted, marginBottom: 20 }}>
                      em {ubsSelecionada.nome}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 8, maxHeight: 360, overflowY: "auto" }}>
                      {datasDisponiveis.map((d, i) => (
                        <button
                          key={i}
                          onClick={() => { if (d.disponivel) { setDataSelecionada(d); setAgendamentoStep(2); } }}
                          disabled={!d.disponivel}
                          style={{
                            padding: "12px 8px",
                            background: d.disponivel ? palette.bg : palette.surfaceAlt,
                            border: `1px solid ${palette.border}`,
                            borderRadius: 10,
                            cursor: d.disponivel ? "pointer" : "not-allowed",
                            fontFamily: "inherit",
                            color: d.disponivel ? palette.text : palette.textMuted,
                            opacity: d.disponivel ? 1 : 0.5,
                            textDecoration: d.disponivel ? "none" : "line-through",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) => { if (d.disponivel) e.currentTarget.style.borderColor = palette.primary; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = palette.border; }}
                        >
                          <div className="mono-font" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: palette.textMuted, marginBottom: 2 }}>
                            {d.diaSemana}
                          </div>
                          <div className="display-font" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1 }}>
                            {d.dia}
                          </div>
                          <div className="mono-font" style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: palette.textMuted, marginTop: 2 }}>
                            {d.mes}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ETAPA 2: Escolher Hora */}
                {agendamentoStep === 2 && (
                  <motion.div
                    key="hora"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="display-font" style={{ fontSize: 24, fontWeight: 500, margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                      Escolha o horário
                    </h3>
                    <div style={{ fontSize: 12, color: palette.textMuted, marginBottom: 20 }}>
                      {dataSelecionada.diaSemana}, {dataSelecionada.dia} de {dataSelecionada.mes} · {ubsSelecionada.nome}
                    </div>
                    {horarios.map((p, idx) => (
                      <div key={idx} style={{ marginBottom: 20 }}>
                        <div className="mono-font" style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.2em", marginBottom: 10, fontWeight: 600, textTransform: "uppercase" }}>
                          ─ {p.periodo}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 8 }}>
                          {p.slots.map((slot, j) => {
                            const ocupado = j === 1 || j === 4; // simulação
                            return (
                              <button
                                key={j}
                                onClick={() => { if (!ocupado) { setHoraSelecionada(slot); confirmarAgendamento(slot); } }}
                                disabled={ocupado}
                                style={{
                                  padding: "12px 8px",
                                  background: ocupado ? palette.surfaceAlt : palette.bg,
                                  border: `1px solid ${palette.border}`,
                                  borderRadius: 10,
                                  cursor: ocupado ? "not-allowed" : "pointer",
                                  fontFamily: "monospace",
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: ocupado ? palette.textMuted : palette.text,
                                  opacity: ocupado ? 0.4 : 1,
                                  textDecoration: ocupado ? "line-through" : "none",
                                  transition: "all 0.15s",
                                }}
                                onMouseEnter={(e) => { if (!ocupado) e.currentTarget.style.borderColor = palette.primary; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = palette.border; }}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* ETAPA 3: Loading da confirmação */}
                {agendamentoStep === 3 && (
                  <motion.div
                    key="confirming"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ textAlign: "center", padding: "32px 0" }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: 48,
                        height: 48,
                        border: `3px solid ${palette.border}`,
                        borderTopColor: palette.primary,
                        borderRadius: "50%",
                        margin: "0 auto 20px",
                      }}
                    />
                    <div className="mono-font" style={{ fontSize: 11, color: palette.primary, letterSpacing: "0.2em", fontWeight: 600 }}>
                      CONFIRMANDO AGENDAMENTO
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botão de cancelar */}
              {agendamentoStep < 3 && (
                <button
                  onClick={cancelarAgendamento}
                  style={{
                    marginTop: 20,
                    padding: "8px 16px",
                    background: "transparent",
                    color: palette.textMuted,
                    border: "none",
                    fontSize: 12,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  ← Cancelar agendamento
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .visao-dupla-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SectionWrap>
  );
}



// ============================================
// CALCULADORA DE ECONOMIA (slider de tempo)
// ============================================
function CalculadoraEconomia({ palette }) {
  const [meses, setMeses] = useState(12); // total em meses, padrão 1 ano

  // Estimativas demonstrativas baseadas em Aracaju (por ano)
  const matriculasPorAno = 12847;
  const tempoEconomizadoPorMatricula = 4; // horas
  const custoEvitadoPorMatricula = 18; // reais
  const idasUBSEvitadas = 31200;
  const papelEconomizado = 25694; // folhas

  // Converter pra base mensal
  const fator = meses / 12;
  const totais = {
    horas: Math.round(matriculasPorAno * tempoEconomizadoPorMatricula * fator),
    reais: Math.round(matriculasPorAno * custoEvitadoPorMatricula * fator),
    idasUBS: Math.round(idasUBSEvitadas * fator),
    papel: Math.round(papelEconomizado * fator),
  };

  const formatNumber = (n) => n.toLocaleString("pt-BR");

  // Formatar período de forma legível
  const formatarPeriodo = () => {
    if (meses < 12) return `${meses} ${meses === 1 ? "mês" : "meses"}`;
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    if (mesesRestantes === 0) return `${anos} ${anos === 1 ? "ano" : "anos"}`;
    return `${anos}a ${mesesRestantes}m`;
  };

  return (
    <SectionWrap palette={palette} alt>
      <SectionHeader
        palette={palette}
        kicker="Impacto em escala"
        title="Quanto se economiza ao longo do tempo"
        subtitle="Use o controle abaixo para projetar o impacto cumulativo da solução em diferentes horizontes de tempo, de meses a anos."
      />

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Slider */}
        <div style={{
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 20,
          padding: 40,
          marginBottom: 32,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div className="mono-font" style={{ fontSize: 11, color: palette.accent, letterSpacing: "0.25em", marginBottom: 6, fontWeight: 600 }}>
                ─ HORIZONTE TEMPORAL
              </div>
              <div className="display-font" style={{ fontSize: 44, fontWeight: 500, lineHeight: 1, letterSpacing: "-0.03em" }}>
                <span style={{ color: palette.primary }}>{formatarPeriodo()}</span>
              </div>
              <div className="mono-font" style={{ fontSize: 11, color: palette.textMuted, marginTop: 8, letterSpacing: "0.05em" }}>
                = {meses} {meses === 1 ? "mês" : "meses"} totais
              </div>
            </div>
            <div className="mono-font" style={{ fontSize: 12, color: palette.textMuted, letterSpacing: "0.1em" }}>
              ARRASTE PARA AJUSTAR →
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="120"
            value={meses}
            onChange={(e) => setMeses(parseInt(e.target.value))}
            style={{
              width: "100%",
              height: 8,
              borderRadius: 4,
              background: `linear-gradient(to right, ${palette.primary} 0%, ${palette.primary} ${((meses - 1) / 119) * 100}%, ${palette.border} ${((meses - 1) / 119) * 100}%, ${palette.border} 100%)`,
              outline: "none",
              appearance: "none",
              cursor: "pointer",
              marginBottom: 16,
            }}
          />

          {/* Marcadores rápidos */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px", flexWrap: "wrap", gap: 8 }}>
            {[
              { mark: 1, label: "1 mês" },
              { mark: 6, label: "6 meses" },
              { mark: 12, label: "1 ano" },
              { mark: 36, label: "3 anos" },
              { mark: 60, label: "5 anos" },
              { mark: 120, label: "10 anos" },
            ].map((m) => (
              <button
                key={m.mark}
                onClick={() => setMeses(m.mark)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: meses === m.mark ? palette.primary : palette.textMuted,
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  fontWeight: meses === m.mark ? 700 : 400,
                  transition: "color 0.2s",
                  padding: "4px 8px",
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards de impacto */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { label: "Horas economizadas", value: formatNumber(totais.horas), suffix: "h", color: palette.primary, sub: "tempo das famílias" },
            { label: "Custo evitado", value: `R$ ${formatNumber(totais.reais)}`, suffix: "", color: palette.success, sub: "transporte + impressão" },
            { label: "Idas à UBS evitadas", value: formatNumber(totais.idasUBS), suffix: "", color: palette.accent, sub: "consultas desafogadas" },
            { label: "Folhas de papel economizadas", value: formatNumber(totais.papel), suffix: "", color: palette.warn, sub: "impacto ambiental" },
          ].map((item, i) => (
            <motion.div
              key={i}
              layout
              transition={{ duration: 0.4 }}
              style={{
                padding: 28,
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderLeft: `3px solid ${item.color}`,
                borderRadius: 14,
              }}
            >
              <div className="mono-font" style={{ fontSize: 10, color: palette.textMuted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
                {item.label}
              </div>
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="display-font"
                style={{ fontSize: 32, fontWeight: 600, color: item.color, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 8 }}
              >
                {item.value}{item.suffix}
              </motion.div>
              <div style={{ fontSize: 12, color: palette.textMuted }}>
                {item.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: 24,
          padding: 16,
          fontSize: 12,
          color: palette.textMuted,
          textAlign: "center",
          fontStyle: "italic",
        }}>
          * Estimativas demonstrativas baseadas em ~12.847 matrículas/ano em Aracaju · Valores reais dependem da implementação
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${palette.primary};
          cursor: pointer;
          box-shadow: 0 4px 12px ${palette.primary}66;
          border: 3px solid ${palette.surface};
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${palette.primary};
          cursor: pointer;
          box-shadow: 0 4px 12px ${palette.primary}66;
          border: 3px solid ${palette.surface};
        }
      `}</style>
    </SectionWrap>
  );
}



// ============================================
// 17. RODAPÉ INSTITUCIONAL
// ============================================
function Rodape({ palette }) {
  return (
    <footer style={{ padding: "80px 32px 40px", background: palette.bgAlt, borderTop: `1px solid ${palette.border}`, position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Logo gigante em outline — assinatura premium */}
        <div className="display-font" style={{
          fontSize: "clamp(60px, 12vw, 180px)",
          fontWeight: 300,
          letterSpacing: "-0.05em",
          lineHeight: 0.9,
          color: "transparent",
          WebkitTextStroke: `1px ${palette.accent}66`,
          marginBottom: 60,
          textAlign: "center",
        }}>
          ImunizAju
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg, ${palette.primary}, ${palette.primaryDeep})`, display: "grid", placeItems: "center" }}>
                <ShieldCheck size={18} color="#fff" strokeWidth={1.5} />
              </div>
              <div className="display-font" style={{ fontSize: 20, fontWeight: 600 }}>ImunizAju</div>
            </div>
            <p style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6, margin: 0 }}>
              Demonstração visual de governança digital aplicada à integração entre Saúde e Educação.
            </p>
          </div>
          <div>
            <h5 className="mono-font" style={{ fontSize: 11, color: palette.accent, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>─ Navegar</h5>
            <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
              <a href="#solucao" style={{ color: palette.text, textDecoration: "none" }}>Solução</a>
              <a href="#fluxo" style={{ color: palette.text, textDecoration: "none" }}>Fluxo</a>
              <a href="#dashboard" style={{ color: palette.text, textDecoration: "none" }}>Dashboard</a>
              <a href="#lgpd" style={{ color: palette.text, textDecoration: "none" }}>LGPD</a>
            </div>
          </div>
          <div>
            <h5 style={{ fontSize: 12, color: palette.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Natureza</h5>
            <div style={{ display: "grid", gap: 8, fontSize: 13, color: palette.textMuted }}>
              <span>Demonstração visual</span>
              <span>Dados fictícios</span>
              <span>Não-oficial</span>
              <span>Conceitual</span>
            </div>
          </div>
          <div>
            <h5 style={{ fontSize: 12, color: palette.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Princípios</h5>
            <div style={{ display: "grid", gap: 8, fontSize: 13, color: palette.textMuted }}>
              <span>Minimização de dados</span>
              <span>Auditoria contínua</span>
              <span>Valor público</span>
              <span>Experiência do cidadão</span>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${palette.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, fontSize: 12, color: palette.textMuted }}>
          <div>© 2026 ImunizAju · Demo conceitual</div>
          <div style={{ display: "flex", gap: 16 }}>
            <span>v0.1 demonstrativa</span>
            <span>·</span>
            <span>Sergipe, Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// BACK TO TOP
// ============================================
function BackToTop({ show, palette }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ y: -4 }}
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            width: 48,
            height: 48,
            borderRadius: 14,
            background: palette.text,
            color: palette.bg,
            border: "none",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            zIndex: 50,
            boxShadow: `0 20px 40px -10px ${palette.text}66`,
          }}
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
