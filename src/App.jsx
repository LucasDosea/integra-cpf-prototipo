import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Database,
  Eye,
  EyeOff,
  FileSearch,
  GraduationCap,
  HeartPulse,
  Lock,
  Moon,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  UserCheck,
  XCircle,
} from 'lucide-react';

const themes = {
  dark: {
    bg: '#06101f',
    bg2: '#0b1730',
    surface: 'rgba(15, 29, 52, 0.84)',
    surfaceStrong: 'rgba(17, 32, 57, 0.96)',
    surface2: 'rgba(255,255,255,0.055)',
    text: '#f8fbff',
    muted: '#9fb2d0',
    blue: '#4f8cff',
    green: '#35d399',
    amber: '#f6b84b',
    red: '#ff5c7a',
    purple: '#a78bfa',
    line: 'rgba(255,255,255,0.12)',
    glass: 'rgba(8,18,34,0.72)',
  },
  light: {
    bg: '#f7f9fc',
    bg2: '#eef4ff',
    surface: 'rgba(255,255,255,0.92)',
    surfaceStrong: 'rgba(255,255,255,0.98)',
    surface2: 'rgba(10,22,40,0.045)',
    text: '#07111f',
    muted: '#51617a',
    blue: '#1e40af',
    green: '#059669',
    amber: '#d97706',
    red: '#dc2626',
    purple: '#7c3aed',
    line: 'rgba(10,22,40,0.11)',
    glass: 'rgba(255,255,255,0.78)',
  },
};

const agente = {
  nome: 'Ana Paula Santos',
  cargo: 'Auxiliar de Secretaria Escolar',
  unidade: 'Escola Municipal João Alves Filho',
  matricula: 'SEMED-004829',
  ip: '200.150.42.18',
  dispositivo: 'Secretaria-PC-03',
  finalidade: 'Matrícula escolar',
};

const casos = {
  liberado: {
    cpf: '12345678900',
    nome: 'Helena S. Andrade',
    nascimento: '12/03/2018',
    turma: '3º ano B',
    responsavel: 'Mariana Andrade',
    status: 'LIBERADO',
    cor: 'green',
    retornoEducacao: 'Matrícula autorizada',
    acaoEducacao: 'Prosseguir com o cadastro escolar.',
    saude: 'Calendário vacinal em dia para a faixa etária.',
    encaminhamento: 'Sem necessidade de agendamento.',
    familia: 'Situação regular para matrícula. Nenhuma ação adicional é necessária no momento.',
    motivo: 'Todas as validações públicas foram atendidas.',
    http: '200 OK',
  },
  pendente: {
    cpf: '11122233344',
    nome: 'Miguel A. Santos',
    nascimento: '04/09/2015',
    turma: '5º ano A',
    responsavel: 'Carlos Santos',
    status: 'PENDENTE',
    cor: 'amber',
    retornoEducacao: 'Orientar responsável',
    acaoEducacao: 'Gerar encaminhamento para UBS e orientar a família.',
    saude: 'Pendência vacinal administrativa identificada.',
    encaminhamento: 'UBS Atalaia · 23/05/2026 · 08:30',
    familia: 'Existe uma pendência administrativa. Compareça à UBS indicada para atualização.',
    motivo: 'Existe pendência, mas detalhes clínicos permanecem ocultos para a Educação.',
    http: '200 OK',
  },
  nao: {
    cpf: '00011122233',
    nome: 'Cadastro não localizado',
    nascimento: '—',
    turma: '—',
    responsavel: '—',
    status: 'NÃO LOCALIZADO',
    cor: 'red',
    retornoEducacao: 'Regularização cadastral',
    acaoEducacao: 'Solicitar conferência de dados antes de prosseguir.',
    saude: 'Sem vínculo suficiente encontrado nos dados simulados.',
    encaminhamento: 'Atendimento cadastral recomendado.',
    familia: 'Não encontramos vínculo suficiente. Procure a unidade responsável para conferência cadastral.',
    motivo: 'O CPF informado não retornou vínculo suficiente nos dados simulados.',
    http: '200 OK',
  },
};

function formatCpf(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskCpf(value) {
  const d = String(value || '').replace(/\D/g, '');
  if (d.length < 9) return '***.***.***-**';
  return `***.${d.slice(3, 6)}.${d.slice(6, 9)}-**`;
}

function nowString(date = new Date()) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(date);
}

function getCase(cpf) {
  const d = cpf.replace(/\D/g, '');
  if (d.length < 11) return null;
  return Object.values(casos).find((c) => c.cpf === d) || casos.nao;
}

function getColor(p, key) {
  return p[key] || p.blue;
}

function makeToken(cpf, stamp) {
  const d = cpf.replace(/\D/g, '') || '00000000000';
  const time =
    String(stamp.getHours()).padStart(2, '0') +
    String(stamp.getMinutes()).padStart(2, '0') +
    String(stamp.getSeconds()).padStart(2, '0');
  return `tok_${d.split('').reverse().join('').slice(0, 8)}_${time}_a9f`;
}

function Noise() {
  return (
    <svg
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.035,
        zIndex: 0,
      }}
    >
      <filter id="noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-filter)" />
    </svg>
  );
}

function Card({ p, children, style, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.5, delay }}
      style={{
        background: p.surface,
        border: `1px solid ${p.line}`,
        borderRadius: 28,
        padding: 24,
        backdropFilter: 'blur(18px)',
        boxShadow: '0 26px 90px rgba(0,0,0,0.22)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

function Pill({ p, children, c }) {
  const color = c || p.blue;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        borderRadius: 999,
        background: `${color}18`,
        border: `1px solid ${color}44`,
        color,
        fontSize: 12,
        fontWeight: 900,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  );
}

function RealtimeClock({ p, compact = false }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      animate={{ opacity: [0.75, 1, 0.75] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        color: p.muted,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: compact ? 11 : 12,
        letterSpacing: '.04em',
      }}
    >
      <Clock3 size={compact ? 13 : 15} color={p.green} />
      {nowString(now)}
    </motion.div>
  );
}

function SectionTitle({ p, eyebrow, title, text }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto 30px' }}>
      <div
        style={{
          color: p.amber,
          fontSize: 12,
          fontWeight: 900,
          letterSpacing: '.22em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        — {eyebrow}
      </div>
      <h2 style={{ fontSize: 'clamp(34px, 5vw, 64px)', lineHeight: 1, letterSpacing: '-.06em', margin: 0 }}>{title}</h2>
      {text && <p style={{ color: p.muted, fontSize: 18, lineHeight: 1.65, maxWidth: 780, margin: '18px auto 0' }}>{text}</p>}
    </div>
  );
}

function MiniRow({ p, icon, label, value, danger }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: 14,
        borderRadius: 18,
        background: p.surface2,
        border: `1px solid ${danger ? p.red : p.line}`,
      }}
    >
      <div>{icon}</div>
      <div>
        <strong>{label}</strong>
        <p style={{ margin: '5px 0 0', color: danger ? p.red : p.muted, lineHeight: 1.45 }}>{value}</p>
      </div>
    </div>
  );
}

function ProcessRow({ p, active, icon, title, text }) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.45, scale: active ? 1 : 0.985 }}
      style={{
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
        padding: 14,
        borderRadius: 18,
        background: active ? p.surface2 : 'transparent',
        border: `1px solid ${active ? p.line : 'transparent'}`,
        marginBottom: 10,
      }}
    >
      <div>{icon}</div>
      <div>
        <strong>{title}</strong>
        <p
          style={{
            color: p.muted,
            margin: '5px 0 0',
            lineHeight: 1.45,
            fontFamily: title.includes('Token') ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'inherit',
          }}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [cpf, setCpf] = useState('123.456.789-00');
  const [resultado, setResultado] = useState(casos.liberado);
  const [loading, setLoading] = useState(false);
  const [visao, setVisao] = useState('educacao');
  const [denied, setDenied] = useState(false);
  const [lastEvent, setLastEvent] = useState(new Date());
  const p = themes[theme];
  const statusColor = resultado ? getColor(p, resultado.cor) : p.blue;
  const token = useMemo(() => makeToken(cpf, lastEvent), [cpf, lastEvent]);

  function consultar(e) {
    e.preventDefault();
    const next = getCase(cpf);
    setLoading(true);
    setDenied(false);
    setLastEvent(new Date());
    setTimeout(() => {
      setResultado(next || casos.nao);
      setLoading(false);
      setVisao('educacao');
    }, 760);
  }

  function usarCaso(caso) {
    setCpf(formatCpf(caso.cpf));
    setResultado(caso);
    setDenied(false);
    setLastEvent(new Date());
    setVisao('educacao');
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        color: p.text,
        background: `radial-gradient(circle at 14% 8%, ${p.blue}33, transparent 25%), radial-gradient(circle at 86% 4%, ${p.purple}22, transparent 24%), linear-gradient(180deg, ${p.bg}, ${p.bg2})`,
        fontFamily: 'Inter, system-ui, Arial',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        *{box-sizing:border-box}body{margin:0}html{scroll-behavior:smooth}input,button{font:inherit}a{color:inherit;text-decoration:none}
        @keyframes float{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-10px) rotate(-2deg)}}
        @keyframes line{0%{transform:translateY(-120%);opacity:0}30%{opacity:1}100%{transform:translateY(360%);opacity:0}}
        @keyframes pulseDot{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.35);opacity:1}}
        .wrap{max-width:1200px;margin:0 auto;padding:0 24px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:22px}.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
        @media(max-width:900px){.grid2,.grid3,.grid4{grid-template-columns:1fr!important}.heroTitle{font-size:46px!important}.hideMobile{display:none!important}}
      `}</style>
      <Noise />

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(18px)', background: p.glass, borderBottom: `1px solid ${p.line}` }}>
        <div className="wrap" style={{ height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 15, background: `linear-gradient(135deg,${p.blue},${p.green})`, display: 'grid', placeItems: 'center' }}>
              <ShieldCheck color="white" />
            </div>
            <div>
              <strong style={{ fontSize: 18 }}>IntegraCPF</strong>
              <div style={{ color: p.muted, fontSize: 11, letterSpacing: '.14em' }}>PROTÓTIPO FINAL · INTERFACES</div>
            </div>
          </div>
          <div className="hideMobile" style={{ display: 'flex', gap: 20, color: p.muted, fontSize: 13 }}>
            <a href="#simulador">Simulador</a>
            <a href="#interfaces">Interfaces</a>
            <a href="#comparativo">Diferenças</a>
            <a href="#auditoria">Auditoria</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <RealtimeClock p={p} compact />
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{ width: 42, height: 42, borderRadius: 14, border: `1px solid ${p.line}`, background: p.surface2, color: p.text, cursor: 'pointer' }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <section className="wrap" style={{ position: 'relative', padding: '72px 24px 56px' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Pill p={p} c={p.green}>
            <Sparkles size={15} /> Protótipo enviado para avaliação
          </Pill>
          <h1 className="heroTitle" style={{ fontSize: 78, lineHeight: 0.96, letterSpacing: '-.07em', maxWidth: 960, margin: '24px 0 22px' }}>
            Cada secretaria enxerga uma tela diferente.
          </h1>
          <p style={{ maxWidth: 800, color: p.muted, fontSize: 19, lineHeight: 1.7 }}>
            A Educação consulta o CPF para matrícula. A Saúde calcula internamente a situação. A família recebe orientação simples. A auditoria registra horário, agente, finalidade, token e bloqueios.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 30 }}>
            <a href="#simulador" style={{ background: p.text, color: p.bg, padding: '15px 22px', borderRadius: 14, fontWeight: 900, display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              <Play size={17} /> Iniciar demonstração
            </a>
            <a href="#interfaces" style={{ border: `1px solid ${p.line}`, padding: '15px 22px', borderRadius: 14, fontWeight: 800 }}>
              Ver telas separadas
            </a>
          </div>
        </motion.div>
        <HeroPreview p={p} resultado={resultado} color={statusColor} />
      </section>

      <section className="wrap" style={{ padding: '20px 24px 54px' }}>
        <SectionTitle p={p} eyebrow="Fluxo operacional" title="Do CPF ao resultado, com telas reais" text="O avaliador consegue ver exatamente o que apareceria para Educação, Saúde, Família e Auditoria." />
        <div className="grid4">
          {[
            ['01', 'Educação digita CPF', 'Finalidade: matrícula escolar', GraduationCap, p.amber],
            ['02', 'Token temporário', 'CPF não circula exposto', Lock, p.blue],
            ['03', 'Saúde calcula', 'Status é gerado internamente', HeartPulse, p.red],
            ['04', 'Retorno mínimo', 'Educação vê apenas a decisão', EyeOff, p.green],
          ].map(([n, t, d, Icon, x], i) => (
            <Card key={n} p={p} delay={i * 0.04} style={{ minHeight: 185 }}>
              <Icon color={x} />
              <div style={{ color: x, fontWeight: 900, marginTop: 16 }}>{n}</div>
              <h3 style={{ margin: '8px 0' }}>{t}</h3>
              <p style={{ color: p.muted, lineHeight: 1.55, margin: 0 }}>{d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="simulador" className="wrap" style={{ padding: '0 24px 62px' }}>
        <div className="grid2">
          <Card p={p}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', marginBottom: 18 }}>
              <div>
                <div style={{ color: p.amber, fontSize: 12, fontWeight: 900, letterSpacing: '.22em', textTransform: 'uppercase' }}>— Terminal de consulta</div>
                <h2 style={{ margin: '10px 0 4px', fontSize: 32 }}>Digite um CPF demonstrativo</h2>
                <p style={{ color: p.muted, margin: 0 }}>Entrada controlada, sem teclado numérico grande.</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <RealtimeClock p={p} />
                <div style={{ color: p.green, fontSize: 12, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: p.green, animation: 'pulseDot 1.8s infinite' }} /> sessão ativa
                </div>
              </div>
            </div>
            <div className="grid2" style={{ marginBottom: 18 }}>
              <SessionCard p={p} title="Sessão ativa" lines={[agente.nome, agente.cargo, agente.unidade, `IP: ${agente.ip}`, `dispositivo: ${agente.dispositivo}`]} />
              <SessionCard p={p} title="Finalidade declarada" lines={[agente.finalidade, 'permite: status administrativo', 'bloqueia: prontuário clínico']} highlight />
            </div>
            <form onSubmit={consultar}>
              <label style={{ color: p.muted, fontSize: 14 }}>CPF fictício usado na demonstração</label>
              <input
                value={cpf}
                onChange={(e) => {
                  setCpf(formatCpf(e.target.value));
                  setResultado(null);
                  setDenied(false);
                }}
                placeholder="123.456.789-00"
                style={{ width: '100%', margin: '10px 0 14px', padding: '18px 16px', borderRadius: 18, border: `1px solid ${p.line}`, background: p.surfaceStrong, color: p.text, outline: 'none', fontSize: 22, letterSpacing: '.04em' }}
              />
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
                <DemoButton p={p} onClick={() => usarCaso(casos.liberado)} c={p.green}>Liberado</DemoButton>
                <DemoButton p={p} onClick={() => usarCaso(casos.pendente)} c={p.amber}>Pendente</DemoButton>
                <DemoButton p={p} onClick={() => usarCaso(casos.nao)} c={p.red}>Não localizado</DemoButton>
              </div>
              <button type="submit" style={{ width: '100%', border: 0, borderRadius: 18, padding: '16px 18px', background: `linear-gradient(135deg,${p.blue},${p.purple})`, color: 'white', fontWeight: 900, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                {loading ? 'Consultando...' : 'Consultar CPF'} <ArrowRight size={18} />
              </button>
            </form>
          </Card>

          <Card p={p} style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 2, background: `linear-gradient(90deg,transparent,${statusColor},transparent)`, animation: loading ? 'line .8s ease-in-out infinite' : 'none' }} />
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 10 }}><Database color={p.green} /> Motor de decisão</h2>
            <ProcessRow p={p} active={!!cpf} icon={<GraduationCap color={p.amber} />} title="1. Solicitação recebida" text={`CPF mascarado: ${maskCpf(cpf)}`} />
            <ProcessRow p={p} active={loading || !!resultado} icon={<Lock color={p.blue} />} title="2. Token temporário gerado" text={token} />
            <ProcessRow p={p} active={loading || !!resultado} icon={<FileSearch color={p.purple} />} title="3. Finalidade validada" text="Matrícula escolar · dado mínimo permitido" />
            <ProcessRow p={p} active={!!resultado} icon={<ShieldCheck color={statusColor} />} title="4. Retorno mínimo" text={resultado ? `${resultado.status} · ${resultado.retornoEducacao}` : 'Aguardando consulta'} />
          </Card>
        </div>
      </section>

      <section id="interfaces" className="wrap" style={{ padding: '0 24px 62px' }}>
        <SectionTitle p={p} eyebrow="Diferença das telas" title="Escolha a interface para ver o que aparece" text="A mesma consulta gera telas diferentes. Isso prova a separação de responsabilidades entre os órgãos." />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 22 }}>
          {[
            ['educacao', 'Secretaria da Educação', GraduationCap, p.amber],
            ['saude', 'Secretaria da Saúde', HeartPulse, p.red],
            ['familia', 'Responsável/Família', UserCheck, p.green],
            ['auditoria', 'Auditoria Técnica', FileSearch, p.purple],
          ].map(([id, label, Icon, x]) => (
            <button key={id} onClick={() => setVisao(id)} style={{ padding: '12px 16px', borderRadius: 999, border: `1px solid ${visao === id ? x : p.line}`, background: visao === id ? `${x}18` : p.surface2, color: p.text, cursor: 'pointer', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon size={16} color={x} />{label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={visao} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {visao === 'educacao' && <TelaEducacao p={p} r={resultado} c={statusColor} />}
            {visao === 'saude' && <TelaSaude p={p} r={resultado} />}
            {visao === 'familia' && <TelaFamilia p={p} r={resultado} c={statusColor} />}
            {visao === 'auditoria' && <TelaAuditoria p={p} r={resultado} hora={nowString(lastEvent)} token={token} denied={denied} />}
          </motion.div>
        </AnimatePresence>
      </section>

      <section id="comparativo" className="wrap" style={{ padding: '0 24px 62px' }}>
        <SectionTitle p={p} eyebrow="Comparativo" title="O que cada perfil vê e não vê" />
        <div className="grid4">
          <CompareCard p={p} icon={<GraduationCap color={p.amber} />} title="Educação vê" items={['Status administrativo', 'Orientação de matrícula', 'CPF mascarado', 'Finalidade da consulta']} />
          <CompareCard p={p} icon={<EyeOff color={p.green} />} title="Educação não vê" items={['Prontuário', 'Doenças', 'Alergias', 'Medicamentos', 'Vacina específica']} />
          <CompareCard p={p} icon={<HeartPulse color={p.red} />} title="Saúde vê" items={['Situação interna', 'Encaminhamento UBS', 'Ambiente restrito', 'Cálculo do status']} />
          <CompareCard p={p} icon={<FileSearch color={p.purple} />} title="Auditoria vê" items={['Horário', 'Agente', 'Token', 'IP', 'Finalidade', 'Bloqueios']} />
        </div>
      </section>

      <section id="auditoria" className="wrap" style={{ padding: '0 24px 70px' }}>
        <div className="grid2">
          <Card p={p}>
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 10 }}><AlertTriangle color={p.red} /> Teste de acesso indevido</h2>
            <p style={{ color: p.muted, lineHeight: 1.65 }}>Simule uma tentativa da Educação de abrir prontuário, alergias ou medicamentos. A resposta correta é bloquear e registrar o evento.</p>
            <button
              onClick={() => {
                setDenied(true);
                setVisao('auditoria');
                setLastEvent(new Date());
              }}
              style={{ width: '100%', padding: '16px 18px', borderRadius: 18, border: `1px solid ${p.red}`, background: `${p.red}1f`, color: p.text, fontWeight: 900, cursor: 'pointer' }}
            >
              Tentar acessar prontuário
            </button>
            <AnimatePresence>
              {denied && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: 16, padding: 18, borderRadius: 18, border: `1px solid ${p.red}`, background: `${p.red}18` }}>
                  <strong style={{ color: p.red, display: 'flex', gap: 8, alignItems: 'center' }}><XCircle /> ACESSO NEGADO — 403</strong>
                  <p style={{ color: p.muted, marginBottom: 0 }}>Finalidade incompatível com matrícula escolar. Evento registrado na auditoria.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
          <Card p={p}>
            <h2 style={{ marginTop: 0 }}>Regra demonstrada</h2>
            <p style={{ color: p.muted, lineHeight: 1.7 }}>A Educação vê status administrativo. A Saúde vê o contexto necessário para cuidado. A família recebe orientação. A auditoria vê quem acessou, quando, por qual finalidade e se houve bloqueio.</p>
            <MiniRow p={p} icon={<Lock color={p.green} />} label="Princípio aplicado" value="Minimização de dados + finalidade declarada + rastreabilidade" />
          </Card>
        </div>
      </section>

      <section className="wrap" style={{ padding: '0 24px 90px' }}>
        <Card p={p} style={{ textAlign: 'center' }}>
          <Pill p={p} c={p.amber}>FALA PARA APRESENTAR</Pill>
          <h2 style={{ fontSize: 'clamp(34px,5vw,60px)', letterSpacing: '-.055em', margin: '18px 0 12px' }}>Resumo do protótipo</h2>
          <p style={{ color: p.muted, maxWidth: 840, margin: '0 auto', lineHeight: 1.75, fontSize: 18 }}>“O IntegraCPF mostra como a Secretaria da Educação poderia consultar a situação necessária para matrícula sem acessar dados sensíveis da Saúde. A Saúde calcula internamente, a Educação recebe somente o status, a família recebe orientação e a auditoria registra cada acesso.”</p>
        </Card>
      </section>
    </main>
  );
}

function HeroPreview({ p, resultado, color }) {
  return (
    <div className="hideMobile" style={{ position: 'absolute', right: 24, top: 112, width: 410, opacity: 0.44, animation: 'float 6s ease-in-out infinite' }}>
      <Card p={p} style={{ transform: 'rotate(-2deg)', padding: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <span style={{ width: 10, height: 10, borderRadius: 99, background: p.red }} />
          <span style={{ width: 10, height: 10, borderRadius: 99, background: p.amber }} />
          <span style={{ width: 10, height: 10, borderRadius: 99, background: p.green }} />
        </div>
        <div style={{ background: p.bg, border: `1px solid ${p.line}`, borderRadius: 18, padding: 18 }}>
          <Pill p={p} c={color}>{resultado?.status || 'AGUARDANDO'}</Pill>
          <div style={{ height: 14, width: '72%', background: p.surface2, borderRadius: 99, margin: '18px 0 10px' }} />
          <div style={{ height: 12, width: '52%', background: p.surface2, borderRadius: 99 }} />
          <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>{[p.blue, p.green, p.amber].map((x, i) => <div key={i} style={{ height: 30, borderRadius: 10, background: `${x}18`, border: `1px solid ${x}33` }} />)}</div>
        </div>
      </Card>
    </div>
  );
}

function SessionCard({ p, title, lines, highlight }) {
  return (
    <div style={{ padding: 16, borderRadius: 18, background: highlight ? `${p.blue}0f` : p.surface2, border: `1px solid ${highlight ? `${p.blue}44` : p.line}` }}>
      <div style={{ color: highlight ? p.blue : p.muted, fontSize: 11, fontWeight: 900, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>— {title}</div>
      {lines.map((l) => <div key={l} style={{ color: p.muted, fontSize: 13, lineHeight: 1.55, fontFamily: l.includes(':') ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'inherit' }}>{l}</div>)}
    </div>
  );
}

function DemoButton({ p, c, children, onClick }) {
  return <button type="button" onClick={onClick} style={{ border: `1px solid ${c}55`, background: `${c}14`, color: c, borderRadius: 999, padding: '9px 12px', fontWeight: 900, cursor: 'pointer', fontSize: 12, letterSpacing: '.06em' }}>{children}</button>;
}

function TelaFrame({ p, title, subtitle, children, badge, c }) {
  return (
    <Card p={p}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
        <div>
          <h3 style={{ fontSize: 30, margin: '0 0 6px' }}>{title}</h3>
          <p style={{ color: p.muted, margin: 0 }}>{subtitle}</p>
        </div>
        {badge && <Pill p={p} c={c}>{badge}</Pill>}
      </div>
      {children}
    </Card>
  );
}

function TelaEducacao({ p, r, c }) {
  return (
    <TelaFrame p={p} title="Tela da Secretaria da Educação" subtitle="Usada pelo servidor escolar durante a matrícula" badge={r?.status || 'AGUARDANDO'} c={c}>
      {!r ? <Empty p={p} /> : (
        <div className="grid2">
          <div>
            <MiniRow p={p} icon={<UserCheck color={c} />} label="Aluno/Responsável" value={r.nome} />
            <MiniRow p={p} icon={<Building2 color={p.amber} />} label="Escola/Turma" value={`${agente.unidade} · ${r.turma}`} />
            <MiniRow p={p} icon={<CheckCircle2 color={c} />} label="Decisão exibida" value={r.retornoEducacao} />
          </div>
          <div>
            <div style={{ padding: 20, borderRadius: 22, background: `${c}14`, border: `1px solid ${c}` }}>
              <h4 style={{ fontSize: 34, margin: '0 0 8px', color: c }}>{r.status}</h4>
              <p style={{ color: p.muted, lineHeight: 1.6 }}>{r.acaoEducacao}</p>
            </div>
            <p style={{ color: p.muted, lineHeight: 1.6 }}>Não aparecem: prontuário, doenças, alergias, medicamentos, histórico clínico ou vacina específica.</p>
          </div>
        </div>
      )}
    </TelaFrame>
  );
}

function TelaSaude({ p, r }) {
  return (
    <TelaFrame p={p} title="Tela da Secretaria da Saúde" subtitle="Ambiente interno responsável pelo cálculo do status" badge="DADOS RESTRITOS" c={p.red}>
      {!r ? <Empty p={p} /> : (
        <div className="grid2">
          <div>
            <MiniRow p={p} icon={<HeartPulse color={p.red} />} label="Situação interna" value={r.saude} />
            <MiniRow p={p} icon={<CalendarCheck color={p.blue} />} label="Encaminhamento UBS" value={r.encaminhamento} />
            <MiniRow p={p} icon={<Lock color={p.green} />} label="Proteção" value="Dados clínicos permanecem restritos ao domínio da Saúde" />
          </div>
          <div style={{ padding: 20, borderRadius: 22, background: p.surface2, border: `1px solid ${p.line}` }}>
            <h4 style={{ marginTop: 0 }}>O que a Saúde consegue ver</h4>
            <p style={{ color: p.muted, lineHeight: 1.65 }}>A Saúde pode manter informações internas para cuidado e atualização vacinal, mas o retorno para a Educação é resumido em status administrativo.</p>
          </div>
        </div>
      )}
    </TelaFrame>
  );
}

function TelaFamilia({ p, r, c }) {
  return (
    <TelaFrame p={p} title="Tela/Comprovante para a família" subtitle="Mensagem simples para orientar o responsável" badge="ORIENTAÇÃO" c={p.green}>
      {!r ? <Empty p={p} /> : (
        <div style={{ padding: 24, borderRadius: 24, background: `${c}12`, border: `1px solid ${c}` }}>
          <h4 style={{ fontSize: 34, margin: '0 0 10px', color: c }}>{r.status}</h4>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: p.muted }}>{r.familia}</p>
          <MiniRow p={p} icon={<CalendarCheck color={p.blue} />} label="Próximo passo" value={r.acaoEducacao} />
        </div>
      )}
    </TelaFrame>
  );
}

function TelaAuditoria({ p, r, hora, token, denied }) {
  const rows = [
    ['Horário', hora],
    ['Agente', agente.nome],
    ['Perfil', agente.cargo],
    ['Unidade', agente.unidade],
    ['Finalidade', agente.finalidade],
    ['CPF exibido', maskCpf(r?.cpf || '')],
    ['Token', token],
    ['IP', agente.ip],
    ['Resposta', r?.status || '—'],
    ['Status HTTP', denied ? '403 BLOQUEADO' : (r?.http || '—')],
    ...(denied ? [['Evento extra', 'BLOQUEIO 403 · tentativa de acesso a prontuário']] : []),
  ];
  return (
    <TelaFrame p={p} title="Tela de Auditoria Técnica" subtitle="Registro de evidência para controle e LGPD" badge={denied ? 'BLOQUEIO REGISTRADO' : 'LOG OK'} c={denied ? p.red : p.purple}>
      <div style={{ display: 'grid', gap: 10 }}>
        {rows.map(([k, v]) => (
          <div key={k} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, padding: '13px 14px', borderRadius: 14, background: p.surface2, border: `1px solid ${k === 'Evento extra' ? p.red : p.line}` }}>
            <strong style={{ color: p.muted }}>{k}</strong>
            <span style={{ fontFamily: k === 'Token' ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'inherit', color: k === 'Evento extra' ? p.red : p.text }}>{v}</span>
          </div>
        ))}
      </div>
    </TelaFrame>
  );
}

function CompareCard({ p, icon, title, items }) {
  return (
    <Card p={p} style={{ minHeight: 245 }}>
      {icon}
      <h3>{title}</h3>
      <ul style={{ margin: 0, paddingLeft: 18, color: p.muted, lineHeight: 1.75 }}>
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </Card>
  );
}

function Empty({ p }) {
  return <div style={{ minHeight: 220, display: 'grid', placeItems: 'center', color: p.muted, border: `1px dashed ${p.line}`, borderRadius: 20 }}>Aguardando consulta por CPF...</div>;
}
