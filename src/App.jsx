import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Database,
  EyeOff,
  FileSearch,
  GraduationCap,
  HeartPulse,
  Lock,
  Moon,
  Play,
  ShieldCheck,
  Sparkles,
  Sun,
  UserCheck,
  XCircle,
} from "lucide-react";

const themes = {
  dark: {
    bg: "#06101f",
    bg2: "#0b1730",
    panel: "rgba(15, 29, 52, .84)",
    panelStrong: "rgba(13, 26, 48, .96)",
    soft: "rgba(255,255,255,.055)",
    text: "#f8fbff",
    muted: "#9fb2d0",
    blue: "#4f8cff",
    green: "#35d399",
    amber: "#f6b84b",
    red: "#ff5c7a",
    purple: "#a78bfa",
    line: "rgba(255,255,255,.12)",
    glass: "rgba(8,18,34,.72)",
  },
  light: {
    bg: "#f7f9fc",
    bg2: "#eef4ff",
    panel: "rgba(255,255,255,.9)",
    panelStrong: "rgba(255,255,255,.98)",
    soft: "rgba(10,22,40,.045)",
    text: "#07111f",
    muted: "#51617a",
    blue: "#1e40af",
    green: "#059669",
    amber: "#d97706",
    red: "#dc2626",
    purple: "#7c3aed",
    line: "rgba(10,22,40,.11)",
    glass: "rgba(255,255,255,.78)",
  },
};

const agent = {
  name: "Servidor escolar demonstrativo",
  role: "Auxiliar de Secretaria Escolar",
  unit: "Unidade escolar demonstrativa",
  profile: "Secretaria Escolar",
  device: "Secretaria-PC-03",
  ip: "200.150.42.18",
  purpose: "Matrícula escolar",
};

const cases = {
  liberado: {
    cpf: "12345678900",
    name: "Aluno demonstrativo A",
    birth: "12/03/2018",
    className: "3º ano B",
    responsible: "Responsável demonstrativo A",
    status: "LIBERADO",
    color: "green",
    educationTitle: "Matrícula autorizada",
    educationMessage: "A escola pode prosseguir com o cadastro escolar.",
    healthTitle: "Calendário validado",
    healthMessage: "Situação interna regular para a faixa etária.",
    familyMessage: "Situação regular para matrícula. Nenhuma ação adicional é necessária.",
    nextStep: "Sem necessidade de agendamento.",
    http: "200 OK",
  },
  pendente: {
    cpf: "11122233344",
    name: "Aluno demonstrativo B",
    birth: "04/09/2015",
    className: "5º ano A",
    responsible: "Responsável demonstrativo B",
    status: "PENDENTE",
    color: "amber",
    educationTitle: "Orientar responsável",
    educationMessage: "A escola deve orientar a família a procurar a unidade indicada.",
    healthTitle: "Pendência administrativa",
    healthMessage: "Existe uma pendência simulada que exige atualização presencial.",
    familyMessage: "Compareça à UBS indicada para atualização e liberação do processo.",
    nextStep: "UBS Atalaia · horário demonstrativo",
    http: "200 OK",
  },
  nao: {
    cpf: "00011122233",
    name: "Cadastro não localizado",
    birth: "—",
    className: "—",
    responsible: "—",
    status: "DADOS INSUFICIENTES",
    color: "red",
    educationTitle: "Conferência cadastral",
    educationMessage: "Não foi encontrado vínculo suficiente para validação automática.",
    healthTitle: "Vínculo não encontrado",
    healthMessage: "Nenhum vínculo suficiente foi encontrado nos dados simulados.",
    familyMessage: "Procure a unidade responsável para conferência cadastral.",
    nextStep: "Atendimento cadastral recomendado.",
    http: "200 OK",
  },
};

function formatCpf(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskCpf(value) {
  const d = String(value || "").replace(/\D/g, "");
  if (d.length < 9) return "***.***.***-**";
  return `***.${d.slice(3, 6)}.${d.slice(6, 9)}-**`;
}

function nowString(date = new Date()) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(date);
}

function makeProtocol(date = new Date()) {
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const da = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `ICP-${y}${mo}${da}-${h}${mi}${s}`;
}

function decide(cpf) {
  const d = String(cpf || "").replace(/\D/g, "");
  if (d.length < 11) return null;
  if (d === cases.liberado.cpf) return cases.liberado;
  if (d === cases.pendente.cpf) return cases.pendente;
  if (d === cases.nao.cpf) return cases.nao;
  return cases.nao;
}

function makeToken(cpf, date) {
  const d = (String(cpf || "").replace(/\D/g, "") || "00000000000")
    .split("")
    .reverse()
    .join("")
    .slice(0, 8);
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `tok_${d}_${h}${m}${s}_a9f`;
}

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function Card({ p, children, style, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { y: -3, scale: 1.005 }}
      style={{
        background: p.panel,
        border: `1px solid ${p.line}`,
        borderRadius: 28,
        padding: 24,
        backdropFilter: "blur(18px)",
        boxShadow: "0 26px 90px rgba(0,0,0,.22)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {!reduce && (
        <motion.div
          aria-hidden="true"
          initial={{ x: "-120%", opacity: 0 }}
          whileInView={{ x: "120%", opacity: [0, 0.45, 0] }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 5.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 90,
            transform: "skewX(-18deg)",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,.16), transparent)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

function AnimatedBlock({ p, children, style, danger = false, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.985, filter: "blur(4px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      whileHover={reduce ? undefined : { y: -2, scale: 1.01, borderColor: danger ? p.red : p.blue }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.42, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {!reduce && (
        <motion.span
          aria-hidden="true"
          animate={{ x: ["-140%", "160%"] }}
          transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 55,
            transform: "skewX(-18deg)",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent)",
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

function Pill({ p, c, children }) {
  const color = c || p.blue;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 999,
        background: `${color}18`,
        border: `1px solid ${color}44`,
        color,
        fontSize: 12,
        fontWeight: 900,
        letterSpacing: ".08em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function LiveClock({ p, compact = false, now }) {
  return (
    <motion.span
      animate={{ opacity: [0.78, 1, 0.78] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: p.muted,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: compact ? 11 : 12,
        whiteSpace: "nowrap",
      }}
    >
      <Clock3 size={compact ? 13 : 15} color={p.green} />
      {nowString(now)}
    </motion.span>
  );
}

function SectionTitle({ p, eyebrow, title, text }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto 30px" }}>
      <div
        style={{
          color: p.amber,
          fontSize: 12,
          fontWeight: 900,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        — {eyebrow}
      </div>
      <h2
        style={{
          fontSize: "clamp(34px, 5vw, 64px)",
          lineHeight: 1,
          letterSpacing: "-.06em",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {text && (
        <p style={{ color: p.muted, fontSize: 18, lineHeight: 1.65, maxWidth: 780, margin: "18px auto 0" }}>
          {text}
        </p>
      )}
    </div>
  );
}

function BackgroundOrbs({ p }) {
  const reduce = useReducedMotion();
  const orbData = [
    { c: p.blue, size: 420, left: "4%", top: "4%", dur: 12, delay: 0 },
    { c: p.green, size: 360, left: "64%", top: "0%", dur: 14, delay: 0.7 },
    { c: p.purple, size: 390, left: "72%", top: "58%", dur: 16, delay: 1.1 },
    { c: p.amber, size: 310, left: "14%", top: "68%", dur: 13, delay: 1.6 },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <motion.div
        aria-hidden="true"
        animate={
          reduce
            ? undefined
            : {
                backgroundPosition: ["0% 0%", "100% 80%", "0% 0%"],
                opacity: [0.18, 0.34, 0.18],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: "-20%",
          backgroundImage: `
            linear-gradient(${p.line} 1px, transparent 1px),
            linear-gradient(90deg, ${p.line} 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(circle at 50% 30%, black, transparent 68%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 30%, black, transparent 68%)",
        }}
      />

      {orbData.map((orb, i) => (
        <motion.div
          key={`${orb.c}-${i}`}
          animate={
            reduce
              ? undefined
              : {
                  x: [0, i % 2 ? -90 : 90, i % 2 ? 60 : -60, 0],
                  y: [0, i % 2 ? 56 : -56, i % 2 ? -46 : 46, 0],
                  scale: [1, 1.16, 0.92, 1],
                  opacity: [0.7, 1, 0.82, 0.7],
                }
          }
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
          style={{
            position: "absolute",
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.c}2d 0%, ${orb.c}18 32%, transparent 70%)`,
            filter: "blur(22px)",
            left: orb.left,
            top: orb.top,
          }}
        />
      ))}

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          animate={
            reduce
              ? undefined
              : {
                  y: ["120vh", "-20vh"],
                  x: [0, i % 2 ? 80 : -80, 0],
                  opacity: [0, 0.42, 0],
                  rotate: [0, i % 2 ? 28 : -28],
                }
          }
          transition={{ duration: 12 + i * 1.4, repeat: Infinity, ease: "linear", delay: i * 1.15 }}
          style={{
            position: "absolute",
            left: `${10 + i * 15}%`,
            bottom: "-18vh",
            width: 2,
            height: 150 + i * 14,
            borderRadius: 999,
            background: `linear-gradient(180deg, transparent, ${i % 2 ? p.blue : p.green}66, transparent)`,
            filter: "blur(.2px)",
          }}
        />
      ))}

      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: ["-35%", "35%", "-35%"], opacity: [0.08, 0.22, 0.08] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "10%",
          right: "10%",
          top: "18%",
          height: 260,
          background: `linear-gradient(90deg, transparent, ${p.blue}24, ${p.green}18, transparent)`,
          filter: "blur(32px)",
          transform: "rotate(-8deg)",
        }}
      />
    </div>
  );
}

function GhostGlass({ p, statusColor }) {
  const reduce = useReducedMotion();
  const panels = [
    { top: "12%", left: "62%", width: 310, height: 170, color: p.blue, rotate: -5, delay: 0 },
    { top: "25%", left: "70%", width: 240, height: 120, color: p.green, rotate: 7, delay: 0.4 },
    { top: "44%", left: "58%", width: 280, height: 145, color: p.purple, rotate: -2, delay: 0.8 },
  ];

  return (
    <div className="hideMobile" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {panels.map((panel, index) => (
        <motion.div
          key={index}
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -18, 0],
                  x: [0, index % 2 ? -18 : 18, 0],
                  rotate: [panel.rotate, panel.rotate + (index % 2 ? -2.2 : 2.2), panel.rotate],
                  scale: [1, 1.035, 1],
                  opacity: [0.26, 0.54, 0.26],
                }
          }
          transition={{ duration: 5.5 + index, repeat: Infinity, ease: "easeInOut", delay: panel.delay }}
          style={{
            position: "absolute",
            top: panel.top,
            left: panel.left,
            width: panel.width,
            height: panel.height,
            rotate: panel.rotate,
            borderRadius: 28,
            background: `linear-gradient(135deg, rgba(255,255,255,.13), ${panel.color}16)`,
            border: `1px solid ${panel.color}55`,
            backdropFilter: "blur(22px) saturate(145%)",
            WebkitBackdropFilter: "blur(22px) saturate(145%)",
            boxShadow: `0 30px 110px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.16)`,
          }}
        >
          <motion.div
            animate={reduce ? undefined : { x: ["-80%", "150%"] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.7 }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 70,
              transform: "skewX(-18deg)",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent)",
            }}
          />
          <div style={{ position: "absolute", inset: 16, borderRadius: 20, border: `1px solid ${p.line}` }} />
          <div style={{ position: "absolute", left: 22, right: 22, top: 26, height: 10, borderRadius: 99, background: `${panel.color}28` }} />
          <div style={{ position: "absolute", left: 22, right: 80, top: 50, height: 9, borderRadius: 99, background: "rgba(255,255,255,.10)" }} />
          <div style={{ position: "absolute", left: 22, top: 82, width: 74, height: 34, borderRadius: 14, background: `${statusColor}1f`, border: `1px solid ${statusColor}44` }} />
        </motion.div>
      ))}
    </div>
  );
}


function OriginalSitePrototypePreview({ p, result, statusColor, now }) {
  const reduce = useReducedMotion();
  const statuses = [
    { label: "LIBERADO", color: p.green },
    { label: "EM DIA", color: p.blue },
    { label: "PENDENTE", color: p.amber },
    { label: "NÃO LOCALIZADO", color: p.red },
  ];

  return (
    <div className="hideMobile" style={{ position: "absolute", top: "40%", right: "1%", width: 520, opacity: 0.42, pointerEvents: "none", zIndex: 0 }}>
      <style>{`
        @keyframes notebook-float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
        }
        @keyframes notebook-bar-load {
          0% { width: 0%; opacity: .45; }
          50% { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: .45; }
        }
        @keyframes notebook-scan-line {
          0% { top: 0; opacity: 0; }
          45% { opacity: .6; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes notebook-line-pulse {
          0%, 100% { opacity: .32; transform: scaleX(.78); }
          50% { opacity: .88; transform: scaleX(1); }
        }
      `}</style>

      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-2, -1.2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "100%",
          aspectRatio: "16/10",
          background: p.text,
          borderRadius: "14px 14px 4px 4px",
          padding: 8,
          boxShadow: `0 40px 100px -35px ${p.blue}`,
          position: "relative",
          animation: reduce ? "none" : "notebook-float 6s ease-in-out infinite",
        }}
      >
        <div style={{ background: p.bg, height: "100%", borderRadius: 9, overflow: "hidden", position: "relative", border: `1px solid ${p.line}` }}>
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${statusColor}, transparent)`,
              boxShadow: `0 0 24px ${statusColor}`,
              animation: reduce ? "none" : "notebook-scan-line 3.4s ease-in-out infinite",
              zIndex: 4,
            }}
          />

          <div style={{ height: 34, background: p.panel, borderBottom: `1px solid ${p.line}`, display: "flex", alignItems: "center", gap: 7, padding: "0 12px" }}>
            <span style={{ width: 9, height: 9, borderRadius: 99, background: p.red }} />
            <span style={{ width: 9, height: 9, borderRadius: 99, background: p.amber }} />
            <span style={{ width: 9, height: 9, borderRadius: 99, background: p.green }} />
            <span style={{ marginLeft: 10, color: p.muted, fontSize: 10, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>imunizaju.demo/sistema</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 12, padding: 16 }}>
            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ color: p.muted, fontSize: 9, letterSpacing: ".18em", fontWeight: 900 }}>TERMINAL DE CONSULTA</div>
                <LiveClock p={p} compact now={now} />
              </div>

              <div style={{ padding: 14, borderRadius: 16, background: p.soft, border: `1px solid ${p.line}` }}>
                <div style={{ height: 8, width: "56%", background: `${p.text}18`, borderRadius: 99, marginBottom: 10 }} />
                <div style={{ height: 38, borderRadius: 12, background: p.panelStrong, border: `1px solid ${p.line}`, display: "flex", alignItems: "center", padding: "0 12px", color: p.muted, fontSize: 13, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                  ***.456.789-**
                </div>
                <div style={{ marginTop: 10, height: 7, width: "100%", borderRadius: 99, background: `${p.blue}18`, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: `linear-gradient(90deg, ${p.blue}, ${p.green})`, animation: reduce ? "none" : "notebook-bar-load 3.5s ease-in-out infinite" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {[p.amber, p.blue, p.green].map((color, i) => (
                  <motion.div
                    key={color}
                    animate={reduce ? undefined : { y: [0, i % 2 ? 4 : -4, 0], opacity: [.56, 1, .56] }}
                    transition={{ duration: 2.5 + i * .4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ height: 42, borderRadius: 13, background: `${color}18`, border: `1px solid ${color}33` }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ padding: 14, borderRadius: 16, background: `${statusColor}14`, border: `1px solid ${statusColor}66`, minHeight: 96 }}>
                <div style={{ color: p.muted, fontSize: 9, letterSpacing: ".16em", fontWeight: 900, marginBottom: 9 }}>STATUS ATUAL</div>
                <motion.div
                  key={result?.status || "status"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: .35 }}
                  style={{ color: statusColor, fontSize: 18, fontWeight: 950, letterSpacing: ".08em" }}
                >
                  {result?.status || "AGUARDANDO"}
                </motion.div>
                <div style={{ marginTop: 8, display: "grid", gap: 5 }}>
                  {[74, 52, 88].map((width, i) => (
                    <div key={i} style={{ height: 6, width: `${width}%`, borderRadius: 99, background: `${p.text}${i === 0 ? "18" : "10"}`, transformOrigin: "left", animation: reduce ? "none" : `notebook-line-pulse ${2.4 + i * .35}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gap: 7 }}>
                {statuses.map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={reduce ? undefined : { x: [0, i % 2 ? 4 : -4, 0], opacity: result?.status === item.label ? [0.7, 1, 0.7] : [0.28, 0.55, 0.28] }}
                    transition={{ duration: 2.8 + i * .24, repeat: Infinity, ease: "easeInOut" }}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 12, background: `${item.color}12`, border: `1px solid ${item.color}30` }}
                  >
                    <span style={{ width: 7, height: 7, borderRadius: 99, background: item.color, boxShadow: `0 0 14px ${item.color}` }} />
                    <span style={{ color: p.muted, fontSize: 10, fontWeight: 800 }}>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 16, width: "108%", marginLeft: "-4%", background: `linear-gradient(180deg, ${p.text}, rgba(255,255,255,.78))`, borderRadius: "0 0 22px 22px", boxShadow: "0 18px 40px rgba(0,0,0,.25)" }} />
      </motion.div>
    </div>
  );
}


function StatusBurst({ p, color, status }) {
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <motion.div
        key={status}
        initial={{ scale: 0.86, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{
          padding: "10px 14px",
          borderRadius: 999,
          background: `${color}1f`,
          border: `1px solid ${color}`,
          color,
          fontWeight: 950,
          letterSpacing: ".09em",
        }}
      >
        {status}
      </motion.div>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 0.8, opacity: 0.32 }}
          animate={{ scale: 1.8 + i * 0.22, opacity: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.35 }}
          style={{ position: "absolute", inset: 0, borderRadius: 999, border: `1px solid ${color}` }}
        />
      ))}
    </div>
  );
}

function SessionCard({ p, title, lines, highlight }) {
  return (
    <AnimatedBlock
      p={p}
      style={{
        padding: 16,
        borderRadius: 18,
        background: highlight ? `${p.blue}10` : p.soft,
        border: `1px solid ${highlight ? `${p.blue}44` : p.line}`,
      }}
    >
      <div
        style={{
          color: highlight ? p.blue : p.muted,
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        — {title}
      </div>
      {lines.map((l) => (
        <div key={l} style={{ color: p.muted, fontSize: 13, lineHeight: 1.55 }}>
          {l}
        </div>
      ))}
    </AnimatedBlock>
  );
}

function ProcessStep({ p, active, done, icon, title, text, color, index }) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.45, x: active ? 0 : -8, scale: active ? 1 : 0.985 }}
      whileHover={{ x: active ? 4 : 0, scale: active ? 1.01 : 0.985 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        padding: 14,
        borderRadius: 18,
        background: active ? p.soft : "transparent",
        border: `1px solid ${active ? p.line : "transparent"}`,
        marginBottom: 10,
      }}
    >
      <motion.div
        animate={active ? { rotate: [0, -5, 5, 0], scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 1.4, repeat: active && !done ? Infinity : 0 }}
        style={{ color }}
      >
        {icon}
      </motion.div>
      <div>
        <strong style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {title}
          {done && <CheckCircle2 size={15} color={p.green} />}
        </strong>
        <p
          style={{
            color: p.muted,
            margin: "5px 0 0",
            lineHeight: 1.45,
            fontFamily: title.includes("Token") ? "ui-monospace, SFMono-Regular, Menlo, monospace" : "inherit",
          }}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}

function FlowRail({ p, stage }) {
  const items = [
    ["Educação", GraduationCap, p.amber],
    ["Token", Lock, p.blue],
    ["Saúde", HeartPulse, p.red],
    ["Retorno", EyeOff, p.green],
    ["Auditoria", FileSearch, p.purple],
  ];
  return (
    <div style={{ position: "relative", padding: "22px 0 4px", marginTop: 12 }}>
      <div style={{ position: "absolute", top: 39, left: 30, right: 30, height: 2, background: p.line }} />
      <motion.div
        animate={{ left: `${Math.min(stage, 4) * 25}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        style={{
          position: "absolute",
          top: 34,
          width: 12,
          height: 12,
          borderRadius: 999,
          background: p.green,
          boxShadow: `0 0 28px ${p.green}`,
          zIndex: 2,
        }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, position: "relative", zIndex: 3 }}>
        {items.map(([label, Icon, c], i) => (
          <div key={label} style={{ textAlign: "center" }}>
            <motion.div
              animate={{ scale: stage >= i ? 1.08 : 1, opacity: stage >= i ? 1 : 0.45 }}
              style={{
                margin: "0 auto 10px",
                width: 34,
                height: 34,
                borderRadius: 12,
                background: stage >= i ? `${c}22` : p.soft,
                border: `1px solid ${stage >= i ? c : p.line}`,
                display: "grid",
                placeItems: "center",
                color: c,
              }}
            >
              <Icon size={17} />
            </motion.div>
            <div style={{ color: p.muted, fontSize: 11, fontWeight: 800 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniRow({ p, icon, label, value, danger }) {
  return (
    <AnimatedBlock
      p={p}
      danger={danger}
      style={{ display: "flex", gap: 12, padding: 14, borderRadius: 18, background: p.soft, border: `1px solid ${danger ? p.red : p.line}` }}
    >
      <div>{icon}</div>
      <div>
        <strong>{label}</strong>
        <p style={{ margin: "5px 0 0", color: danger ? p.red : p.muted, lineHeight: 1.45 }}>{value}</p>
      </div>
    </AnimatedBlock>
  );
}

function InterfaceFrame({ p, title, subtitle, badge, c, children }) {
  return (
    <Card p={p}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 14, marginBottom: 18, alignItems: "flex-start" }}>
        <div>
          <h3 style={{ fontSize: 30, margin: "0 0 6px" }}>{title}</h3>
          <p style={{ color: p.muted, margin: 0 }}>{subtitle}</p>
        </div>
        {badge && <StatusBurst p={p} color={c} status={badge} />}
      </div>
      {children}
    </Card>
  );
}

function EducationView({ p, r, c }) {
  if (!r) return <EmptyView p={p} />;
  return (
    <InterfaceFrame p={p} title="Tela da Secretaria da Educação" subtitle="Visão do servidor escolar durante a matrícula" badge={r.status} c={c}>
      <div className="grid2">
        <div style={{ display: "grid", gap: 12 }}>
          <MiniRow p={p} icon={<UserCheck color={c} />} label="Aluno/Responsável" value={`${r.name} · ${r.responsible}`} />
          <MiniRow p={p} icon={<GraduationCap color={p.amber} />} label="Unidade/Turma" value={`${agent.unit} · ${r.className}`} />
          <MiniRow p={p} icon={<CheckCircle2 color={c} />} label="Decisão exibida" value={r.educationTitle} />
        </div>
        <div>
          <div style={{ padding: 22, borderRadius: 22, background: `${c}14`, border: `1px solid ${c}` }}>
            <h4 style={{ fontSize: 34, margin: "0 0 8px", color: c }}>{r.status}</h4>
            <p style={{ color: p.muted, lineHeight: 1.6 }}>{r.educationMessage}</p>
          </div>
          <p style={{ color: p.muted, lineHeight: 1.6 }}>
            A Educação não acessa prontuário, doenças, medicamentos, alergias ou detalhes internos da Saúde.
          </p>
        </div>
      </div>
    </InterfaceFrame>
  );
}

function HealthView({ p, r }) {
  if (!r) return <EmptyView p={p} />;
  return (
    <InterfaceFrame p={p} title="Tela da Secretaria da Saúde" subtitle="Ambiente restrito responsável pelo cálculo" badge="DADOS RESTRITOS" c={p.red}>
      <div className="grid2">
        <div style={{ display: "grid", gap: 12 }}>
          <MiniRow p={p} icon={<HeartPulse color={p.red} />} label="Situação interna" value={r.healthMessage} />
          <MiniRow p={p} icon={<CalendarCheck color={p.blue} />} label="Encaminhamento" value={r.nextStep} />
          <MiniRow p={p} icon={<Lock color={p.green} />} label="Proteção" value="Informações internas permanecem restritas ao domínio da Saúde." />
        </div>
        <div style={{ padding: 20, borderRadius: 22, background: p.soft, border: `1px solid ${p.line}` }}>
          <h4 style={{ marginTop: 0 }}>O que a Saúde consegue ver</h4>
          <p style={{ color: p.muted, lineHeight: 1.65 }}>
            A Saúde mantém contexto interno para cuidado e atualização, mas devolve para a Educação somente um status administrativo.
          </p>
        </div>
      </div>
    </InterfaceFrame>
  );
}

function FamilyView({ p, r, c }) {
  if (!r) return <EmptyView p={p} />;
  return (
    <InterfaceFrame p={p} title="Tela/Comprovante para a família" subtitle="Mensagem simples para orientar o responsável" badge="ORIENTAÇÃO" c={p.green}>
      <div style={{ padding: 24, borderRadius: 24, background: `${c}12`, border: `1px solid ${c}` }}>
        <h4 style={{ fontSize: 34, margin: "0 0 10px", color: c }}>{r.status}</h4>
        <p style={{ fontSize: 18, lineHeight: 1.65, color: p.muted }}>{r.familyMessage}</p>
        <MiniRow p={p} icon={<CalendarCheck color={p.blue} />} label="Próximo passo" value={r.nextStep} />
      </div>
    </InterfaceFrame>
  );
}

function AuditView({ p, r, eventTime, token, denied, logs, protocol }) {
  const rows = [
    ["Protocolo", protocol],
    ["Horário", nowString(eventTime)],
    ["Agente", agent.name],
    ["Perfil", agent.role],
    ["Unidade", agent.unit],
    ["Finalidade", agent.purpose],
    ["CPF exibido", maskCpf(r?.cpf || "")],
    ["Token", token],
    ["Dispositivo", agent.device],
    ["Resposta", r?.status || "—"],
    ["Status HTTP", denied ? "403 BLOQUEADO" : r?.http || "—"],
  ];
  return (
    <InterfaceFrame p={p} title="Tela de Auditoria Técnica" subtitle="Registro de evidência e rastreabilidade" badge={denied ? "BLOQUEIO REGISTRADO" : "LOG OK"} c={denied ? p.red : p.purple}>
      <div className="grid2">
        <div style={{ display: "grid", gap: 10 }}>
          {rows.map(([k, v]) => (
            <motion.div
              key={k}
              whileHover={{ x: 4, borderColor: p.blue }}
              transition={{ duration: 0.2 }}
              style={{ display: "grid", gridTemplateColumns: "145px 1fr", gap: 12, padding: "13px 14px", borderRadius: 14, background: p.soft, border: `1px solid ${p.line}` }}
            >
              <strong style={{ color: p.muted }}>{k}</strong>
              <span style={{ fontFamily: k === "Token" || k === "Protocolo" ? "ui-monospace, SFMono-Regular, Menlo, monospace" : "inherit" }}>{v}</span>
            </motion.div>
          ))}
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <h4 style={{ margin: "0 0 4px" }}>Eventos recentes</h4>
          <AnimatePresence initial={false}>
            {logs.slice(0, 7).map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ x: -4, scale: 1.01 }}
                transition={{ duration: 0.24 }}
                style={{
                  padding: 13,
                  borderRadius: 14,
                  background: log.type === "blocked" ? `${p.red}16` : p.soft,
                  border: `1px solid ${log.type === "blocked" ? p.red : p.line}`,
                }}
              >
                <strong style={{ color: log.type === "blocked" ? p.red : p.green }}>{log.status}</strong>
                <p style={{ margin: "5px 0 0", color: p.muted, fontSize: 13 }}>{log.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </InterfaceFrame>
  );
}

function EmptyView({ p }) {
  return (
    <div style={{ minHeight: 220, display: "grid", placeItems: "center", color: p.muted, border: `1px dashed ${p.line}`, borderRadius: 20 }}>
      Aguardando consulta por CPF...
    </div>
  );
}

function CompareCard({ p, icon, title, items }) {
  return (
    <Card p={p} style={{ minHeight: 245 }}>
      {icon}
      <h3>{title}</h3>
      <ul style={{ margin: 0, paddingLeft: 18, color: p.muted, lineHeight: 1.75 }}>
        {items.map((i, index) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ x: 4, color: p.text }}
            viewport={{ once: true }}
            transition={{ duration: 0.28, delay: index * 0.04 }}
          >
            {i}
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}

export default function App() {
  const now = useClock();
  const [theme, setTheme] = useState("dark");
  const [cpf, setCpf] = useState("123.456.789-00");
  const [result, setResult] = useState(cases.liberado);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("educacao");
  const [denied, setDenied] = useState(false);
  const [eventTime, setEventTime] = useState(new Date());
  const [stage, setStage] = useState(4);
  const [inputError, setInputError] = useState("");
  const [logs, setLogs] = useState([
    { id: "initial-ok", status: "200 OK", type: "ok", message: "Consulta demonstrativa registrada com retorno mínimo." },
  ]);
  const [autoDemo, setAutoDemo] = useState(true);
  const [autoBeat, setAutoBeat] = useState(0);

  const p = themes[theme];
  const statusColor = result ? p[result.color] : p.blue;
  const token = useMemo(() => makeToken(cpf, eventTime), [cpf, eventTime]);
  const protocol = useMemo(() => makeProtocol(eventTime), [eventTime]);

  useEffect(() => {
    if (!autoDemo || loading || inputError) return undefined;

    const stageTimer = setInterval(() => {
      setStage((current) => (current >= 4 ? 0 : current + 1));
      setAutoBeat((beat) => beat + 1);
    }, 950);

    return () => clearInterval(stageTimer);
  }, [autoDemo, loading, inputError]);

  useEffect(() => {
    if (!autoDemo || loading || inputError) return undefined;

    const tabs = ["educacao", "saude", "familia", "auditoria"];
    const viewTimer = setInterval(() => {
      setView((current) => {
        const index = tabs.indexOf(current);
        return tabs[(index + 1 + tabs.length) % tabs.length];
      });
    }, 5200);

    return () => clearInterval(viewTimer);
  }, [autoDemo, loading, inputError]);

  useEffect(() => {
    if (!autoDemo || loading || inputError) return undefined;

    const scenarioList = Object.values(cases);
    const scenarioTimer = setInterval(() => {
      const next = scenarioList[Math.floor(Date.now() / 13000) % scenarioList.length];
      const newEventTime = new Date();
      setCpf(formatCpf(next.cpf));
      setResult(next);
      setDenied(false);
      setEventTime(newEventTime);
      addLog("ok", "AUTO DEMO", `Demonstração contínua alternou para ${next.status}. Protocolo ${makeProtocol(newEventTime)}.`);
    }, 13000);

    return () => clearInterval(scenarioTimer);
  }, [autoDemo, loading, inputError]);

  function addLog(type, status, message) {
    setLogs((old) => [{ id: `${Date.now()}-${Math.random()}`, type, status, message }, ...old].slice(0, 10));
  }

  function resetForTyping(value) {
    setCpf(formatCpf(value));
    setResult(null);
    setDenied(false);
    setInputError("");
    setStage(0);
  }

  function consultar(e) {
    e.preventDefault();
    const digits = cpf.replace(/\D/g, "");
    if (digits.length < 11) {
      setInputError("CPF incompleto — informe os 11 dígitos para consultar.");
      setStage(0);
      return;
    }

    setInputError("");
    const next = decide(cpf) || cases.nao;
    const newEventTime = new Date();

    setDenied(false);
    setLogs((old) => old.filter((l) => l.type !== "blocked"));
    setLoading(true);
    setEventTime(newEventTime);
    setStage(0);

    setTimeout(() => { setStage(1); addLog("ok", "ETAPA 1", "CPF recebido e mascarado para consulta."); }, 180);
    setTimeout(() => { setStage(2); addLog("ok", "ETAPA 2", "Token temporário gerado para processamento."); }, 420);
    setTimeout(() => { setStage(3); addLog("ok", "ETAPA 3", "Finalidade de matrícula escolar validada."); }, 660);
    setTimeout(() => { setStage(4); addLog("ok", "ETAPA 4", "Consulta interna simulada na Saúde concluída."); }, 900);

    setTimeout(() => {
      setResult(next);
      setLoading(false);
      setView("educacao");
      addLog("ok", "200 OK", `Consulta de matrícula retornou ${next.status}. Protocolo ${makeProtocol(newEventTime)}.`);
    }, 1180);
  }

  function useDemo(c) {
    const newEventTime = new Date();
    setCpf(formatCpf(c.cpf));
    setResult(c);
    setInputError("");
    setDenied(false);
    setLogs((old) => old.filter((l) => l.type !== "blocked"));
    setEventTime(newEventTime);
    setStage(4);
    setView("educacao");
    addLog("ok", "200 OK", `Cenário demonstrativo selecionado: ${c.status}. Protocolo ${makeProtocol(newEventTime)}.`);
  }

  function bloquear() {
    setDenied(true);
    setView("auditoria");
    setEventTime(new Date());
    addLog("blocked", "403 BLOQUEADO", "Evento: tentativa_acesso_dados_restritos · Motivo: finalidade incompatível · Ação: bloqueado automaticamente.");
  }

  const css = `
    *{box-sizing:border-box}
    body{margin:0}
    html{scroll-behavior:smooth}
    input,button{font:inherit}
    a{text-decoration:none;color:inherit}
    .wrap{max-width:1200px;margin:0 auto;padding:0 24px}
    .grid2{display:grid;grid-template-columns:1fr 1fr;gap:22px}
    .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
    .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
    @keyframes pulseDot{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.35);opacity:1}}
    @keyframes scanLine{0%{transform:translateY(-120%);opacity:0}30%{opacity:1}100%{transform:translateY(360%);opacity:0}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes ghostFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes ambientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    .ghostSurface{
      background:linear-gradient(135deg,rgba(255,255,255,.14),rgba(255,255,255,.045));
      border:1px solid rgba(255,255,255,.18);
      backdrop-filter:blur(20px) saturate(145%);
      -webkit-backdrop-filter:blur(20px) saturate(145%);
      box-shadow:0 28px 90px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.16);
    }
    a:focus-visible,button:focus-visible,input:focus-visible{
      outline:2px solid ${p.blue};outline-offset:3px;border-radius:6px;
    }
    @media(max-width:1024px){
      .grid4{grid-template-columns:repeat(2,1fr)}
      .grid3{grid-template-columns:repeat(2,1fr)}
    }
    @media(max-width:900px){
      .grid2,.grid3,.grid4{grid-template-columns:1fr!important}
      .heroTitle{font-size:46px!important}
      .hideMobile{display:none!important}
      .wrap{padding:0 18px}
    }
    @media(max-width:480px){
      .heroTitle{font-size:36px!important}
    }
    @media(prefers-reduced-motion:reduce){
      *{animation-duration:.01ms!important;animation-iteration-count:1!important}
      html{scroll-behavior:auto}
    }
  `;

  return (
    <main
      style={{
        minHeight: "100vh",
        color: p.text,
        background: `radial-gradient(circle at 15% 8%,${p.blue}33,transparent 25%),radial-gradient(circle at 86% 4%,${p.purple}22,transparent 24%),linear-gradient(180deg,${p.bg},${p.bg2})`,
        fontFamily: "Inter, system-ui, Arial",
        overflowX: "hidden",
      }}
    >
      <style>{css}</style>
      <BackgroundOrbs p={p} />
      <GhostGlass p={p} statusColor={statusColor} />
      <OriginalSitePrototypePreview p={p} result={result} statusColor={statusColor} now={now} />

      <nav style={{ position: "sticky", top: 0, zIndex: 20, background: p.glass, backdropFilter: "blur(18px)", borderBottom: `1px solid ${p.line}` }}>
        <div className="wrap" style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <motion.div whileHover={{ rotate: 8, scale: 1.05 }} style={{ width: 44, height: 44, borderRadius: 15, background: `linear-gradient(135deg,${p.blue},${p.green})`, display: "grid", placeItems: "center" }}>
              <ShieldCheck color="white" />
            </motion.div>
            <div>
              <strong>ImunizAju</strong>
              <div style={{ fontSize: 11, color: p.muted, letterSpacing: ".14em" }}>PROTÓTIPO FINAL · INTERFACES</div>
            </div>
          </div>
          <div className="hideMobile" style={{ display: "flex", gap: 20, color: p.muted, fontSize: 13 }}>
            <a href="#simulador">Simulador</a>
            <a href="#interfaces">Interfaces</a>
            <a href="#comparativo">Diferenças</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LiveClock p={p} compact now={now} />
            <button
              aria-label={autoDemo ? "Pausar demonstração automática" : "Ativar demonstração automática"}
              onClick={() => setAutoDemo((value) => !value)}
              style={{
                border: `1px solid ${autoDemo ? p.green : p.line}`,
                background: autoDemo ? `${p.green}18` : p.soft,
                color: autoDemo ? p.green : p.text,
                cursor: "pointer",
                borderRadius: 14,
                padding: "11px 12px",
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: ".06em",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 99, background: autoDemo ? p.green : p.muted, animation: autoDemo ? "pulseDot 1.25s infinite" : "none" }} />
              AUTO
            </button>
            <button aria-label="Alternar tema" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{ width: 42, height: 42, borderRadius: 14, border: `1px solid ${p.line}`, background: p.soft, color: p.text, cursor: "pointer" }}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <section className="wrap" style={{ padding: "72px 24px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Pill p={p} c={p.green}><Sparkles size={15} /> Protótipo para avaliação</Pill>
          <Pill p={p} c={p.amber}>Dados 100% simulados</Pill>
          <Pill p={p} c={autoDemo ? p.green : p.muted}>{autoDemo ? "Animação contínua ativa" : "Animação contínua pausada"}</Pill>
        </div>
        <h1 className="heroTitle" style={{ fontSize: "clamp(36px, 7vw, 78px)", lineHeight: 0.96, letterSpacing: "-.07em", maxWidth: 970, margin: "24px 0 20px" }}>
          Cada secretaria enxerga uma tela diferente.
        </h1>
        <p style={{ maxWidth: 820, color: p.muted, fontSize: "clamp(16px, 2.2vw, 19px)", lineHeight: 1.7 }}>
          A Educação consulta o CPF para matrícula. A Saúde calcula internamente. A família recebe orientação. A auditoria registra horário, protocolo, agente, finalidade, token e bloqueios.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
          <a href="#simulador" style={{ background: p.text, color: p.bg, padding: "15px 22px", borderRadius: 14, fontWeight: 900, display: "flex", gap: 8, alignItems: "center" }}>
            <Play size={17} /> Iniciar demonstração
          </a>
          <a href="#interfaces" style={{ border: `1px solid ${p.line}`, padding: "15px 22px", borderRadius: 14, fontWeight: 800 }}>
            Ver telas separadas
          </a>
        </div>

        {/* Preview de notebook reaproveitado do protótipo original fica animando no fundo. */}
      </section>

      <section className="wrap" style={{ padding: "0 24px 54px", position: "relative", zIndex: 1 }}>
        <SectionTitle p={p} eyebrow="Fluxo operacional" title="Do CPF ao resultado, com movimento" text="O avaliador vê uma experiência guiada, com feedback visual em cada etapa da consulta." />
        <Card p={p}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <Pill p={p} c={autoDemo ? p.green : p.blue}>{autoDemo ? "Fluxo automático" : "Fluxo manual"}</Pill>
            <motion.span
              key={autoBeat}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ color: p.muted, fontSize: 12, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            >
              etapa {stage + 1}/5
            </motion.span>
          </div>
          <FlowRail p={p} stage={stage} />
        </Card>
      </section>

      <section id="simulador" className="wrap" style={{ padding: "0 24px 62px", position: "relative", zIndex: 1 }}>
        <div className="grid2">
          <Card p={p}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 18 }}>
              <div>
                <div style={{ color: p.amber, fontSize: 12, fontWeight: 900, letterSpacing: ".22em" }}>— TERMINAL DE CONSULTA</div>
                <h2 style={{ margin: "10px 0 4px", fontSize: 32 }}>Digite ou selecione um CPF demonstrativo</h2>
                <p style={{ color: p.muted, margin: 0 }}>Entrada controlada, com horário em tempo real e finalidade declarada.</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <LiveClock p={p} now={now} />
                <div style={{ color: p.green, fontSize: 12, marginTop: 8, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: p.green, animation: "pulseDot 1.8s infinite" }} />
                  sessão ativa
                </div>
              </div>
            </div>
            <div className="grid2" style={{ marginBottom: 18 }}>
              <SessionCard p={p} title="Sessão ativa" lines={[agent.name, agent.role, agent.unit, agent.device]} />
              <SessionCard p={p} title="Finalidade declarada" lines={[agent.purpose, "permite: status administrativo", "bloqueia: dados restritos"]} highlight />
            </div>
            <form onSubmit={consultar}>
              <label htmlFor="cpf-input" style={{ color: p.muted, fontSize: 14 }}>CPF fictício</label>
              <input
                id="cpf-input"
                value={cpf}
                onChange={(e) => resetForTyping(e.target.value)}
                placeholder="123.456.789-00"
                inputMode="numeric"
                aria-invalid={!!inputError}
                aria-describedby={inputError ? "cpf-error" : undefined}
                style={{ width: "100%", margin: "10px 0 8px", padding: "18px 16px", borderRadius: 18, border: `1px solid ${inputError ? p.red : p.line}`, background: p.panelStrong, color: p.text, outline: "none", fontSize: 22, letterSpacing: ".04em" }}
              />
              <AnimatePresence>
                {inputError && (
                  <motion.div
                    id="cpf-error"
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", alignItems: "center", gap: 8, color: p.red, fontSize: 13, fontWeight: 700, margin: "0 0 12px" }}
                  >
                    <AlertTriangle size={15} /> {inputError}
                  </motion.div>
                )}
              </AnimatePresence>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: inputError ? "0 0 14px" : "8px 0 14px" }}>
                {Object.values(cases).map((c) => {
                  const activeScenario = result && result.status === c.status;
                  return (
                    <motion.button
                      key={c.status}
                      whileTap={{ scale: 0.96 }}
                      type="button"
                      onClick={() => useDemo(c)}
                      aria-pressed={activeScenario}
                      style={{ border: `1px solid ${p[c.color]}${activeScenario ? "" : "55"}`, background: `${p[c.color]}${activeScenario ? "2e" : "14"}`, color: p[c.color], borderRadius: 999, padding: "9px 12px", fontWeight: 900, cursor: "pointer", fontSize: 12 }}
                    >
                      {c.status}
                    </motion.button>
                  );
                })}
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={{ width: "100%", border: 0, borderRadius: 18, padding: "16px 18px", background: `linear-gradient(135deg,${p.blue},${p.purple})`, color: "white", fontWeight: 900, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}
              >
                {loading ? "Consultando..." : "Consultar CPF"} <ArrowRight size={18} />
              </motion.button>
            </form>
          </Card>

          <Card p={p} style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 2, background: `linear-gradient(90deg,transparent,${statusColor},transparent)`, animation: loading ? "scanLine .8s ease-in-out infinite" : "none" }} />
            <h2 style={{ marginTop: 0, display: "flex", gap: 10, alignItems: "center" }}>
              <Database color={p.green} /> Motor de decisão
            </h2>
            <ProcessStep p={p} index={0} active={!!cpf} done={stage > 0} icon={<GraduationCap />} color={p.amber} title="1. Solicitação recebida" text={`CPF mascarado: ${maskCpf(cpf)}`} />
            <ProcessStep p={p} index={1} active={stage >= 1 || loading} done={stage > 1} icon={<Lock />} color={p.blue} title="2. Token temporário" text={token} />
            <ProcessStep p={p} index={2} active={stage >= 2 || loading} done={stage > 2} icon={<FileSearch />} color={p.purple} title="3. Finalidade validada" text="Matrícula escolar · dado mínimo permitido" />
            <ProcessStep p={p} index={3} active={stage >= 3 || loading} done={stage > 3} icon={<HeartPulse />} color={p.red} title="4. Saúde consultada" text="Processamento interno sem expor dados restritos" />
            <ProcessStep p={p} index={4} active={!!result} done={!!result} icon={<ShieldCheck />} color={statusColor} title="5. Retorno mínimo" text={result ? `${result.status} · ${result.educationTitle}` : "Aguardando consulta"} />
          </Card>
        </div>
      </section>

      <section id="interfaces" className="wrap" style={{ padding: "0 24px 62px", position: "relative", zIndex: 1 }}>
        <SectionTitle p={p} eyebrow="Diferença das telas" title="Escolha a interface para ver o que aparece" text="A mesma consulta gera telas diferentes para cada perfil de acesso." />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 22 }}>
          {[
            ["educacao", "Secretaria da Educação", GraduationCap, p.amber],
            ["saude", "Secretaria da Saúde", HeartPulse, p.red],
            ["familia", "Responsável/Família", UserCheck, p.green],
            ["auditoria", "Auditoria Técnica", FileSearch, p.purple],
          ].map(([id, label, Icon, x]) => (
            <motion.button
              key={id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setView(id)}
              aria-pressed={view === id}
              style={{ padding: "12px 16px", borderRadius: 999, border: `1px solid ${view === id ? x : p.line}`, background: view === id ? `${x}18` : p.soft, color: p.text, cursor: "pointer", fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}
            >
              <Icon size={16} color={x} />
              {label}
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{ opacity: 0, y: 14, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -8, filter: "blur(6px)" }} transition={{ duration: 0.28 }}>
            {view === "educacao" && <EducationView p={p} r={result} c={statusColor} />}
            {view === "saude" && <HealthView p={p} r={result} />}
            {view === "familia" && <FamilyView p={p} r={result} c={statusColor} />}
            {view === "auditoria" && <AuditView p={p} r={result} eventTime={eventTime} token={token} denied={denied} logs={logs} protocol={protocol} />}
          </motion.div>
        </AnimatePresence>
      </section>

      <section id="comparativo" className="wrap" style={{ padding: "0 24px 62px", position: "relative", zIndex: 1 }}>
        <SectionTitle p={p} eyebrow="Comparativo" title="O que cada perfil vê e não vê" />
        <div className="grid4">
          <CompareCard p={p} icon={<GraduationCap color={p.amber} />} title="Educação vê" items={["Status administrativo", "Orientação de matrícula", "CPF mascarado", "Finalidade"]} />
          <CompareCard p={p} icon={<EyeOff color={p.green} />} title="Educação não vê" items={["Dados restritos", "Histórico sensível", "Detalhes privados", "Base interna da Saúde"]} />
          <CompareCard p={p} icon={<HeartPulse color={p.red} />} title="Saúde vê" items={["Situação interna", "Encaminhamento", "Ambiente restrito", "Cálculo do status"]} />
          <CompareCard p={p} icon={<FileSearch color={p.purple} />} title="Auditoria vê" items={["Horário", "Protocolo", "Agente", "Token", "Finalidade", "Bloqueios"]} />
        </div>
      </section>

      <section className="wrap" style={{ padding: "0 24px 90px", position: "relative", zIndex: 1 }}>
        <div className="grid2">
          <Card p={p}>
            <h2 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 10 }}>
              <AlertTriangle color={p.red} /> Teste de acesso indevido
            </h2>
            <p style={{ color: p.muted, lineHeight: 1.65 }}>
              Simule uma tentativa da Educação de abrir dados restritos. O sistema bloqueia e registra o evento na auditoria.
            </p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={bloquear}
              style={{ width: "100%", padding: "16px 18px", borderRadius: 18, border: `1px solid ${p.red}`, background: `${p.red}1f`, color: p.text, fontWeight: 900, cursor: "pointer" }}
            >
              Tentar acessar dados restritos
            </motion.button>
            <AnimatePresence>
              {denied && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} style={{ marginTop: 16, padding: 18, borderRadius: 18, border: `1px solid ${p.red}`, background: `${p.red}18` }}>
                  <strong style={{ color: p.red, display: "flex", gap: 8, alignItems: "center" }}>
                    <XCircle /> ACESSO NEGADO — 403
                  </strong>
                  <p style={{ color: p.muted, marginBottom: 0 }}>Finalidade incompatível com matrícula escolar. Evento registrado.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
          <Card p={p} style={{ textAlign: "center" }}>
            <Pill p={p} c={p.amber}>FALA PARA APRESENTAR</Pill>
            <h2 style={{ fontSize: "clamp(30px,5vw,54px)", letterSpacing: "-.055em", margin: "18px 0 12px" }}>Resumo do protótipo</h2>
            <p style={{ color: p.muted, lineHeight: 1.75, fontSize: 18 }}>
              “A Educação consulta apenas o necessário para matrícula. A Saúde calcula internamente. A família recebe orientação. A auditoria registra cada acesso.”
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}
