import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Database,
  Eye,
  EyeOff,
  FileCheck,
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
    bg: '#07111f',
    bg2: '#0b1730',
    surface: 'rgba(15, 29, 52, .78)',
    surface2: 'rgba(255,255,255,.055)',
    text: '#f7fbff',
    muted: '#9fb2d0',
    blue: '#4f8cff',
    green: '#35d399',
    amber: '#f6b84b',
    red: '#ff5c7a',
    purple: '#a78bfa',
    line: 'rgba(255,255,255,.12)',
    glass: 'rgba(10,22,40,.72)',
  },
  light: {
    bg: '#f7f9fc',
    bg2: '#eef4ff',
    surface: 'rgba(255,255,255,.86)',
    surface2: 'rgba(10,22,40,.045)',
    text: '#07111f',
    muted: '#51617a',
    blue: '#1e40af',
    green: '#059669',
    amber: '#d97706',
    red: '#dc2626',
    purple: '#7c3aed',
    line: 'rgba(10,22,40,.11)',
    glass: 'rgba(255,255,255,.72)',
  },
};

const pessoas = [
  {
    cpf: '12345678900',
    nome: 'Helena S. Andrade',
    idade: '8 anos',
    escola: 'EMEF Aracaju Digital',
    status: 'LIBERADO',
    cor: 'green',
    educacao: 'Matrícula pode prosseguir.',
    saude: 'Calendário vacinal em dia para a faixa etária.',
    ubs: 'Sem necessidade de agendamento.',
    retornoMinimo: 'STATUS: LIBERADO',
  },
  {
    cpf: '11122233344',
    nome: 'Miguel A. Santos',
    idade: '10 anos',
    escola: 'EMEF Aracaju Digital',
    status: 'PENDENTE',
    cor: 'amber',
    educacao: 'Matrícula exige orientação à família.',
    saude: 'Pendência vacinal administrativa identificada.',
    ubs: 'Agendar atualização na UBS Atalaia.',
    retornoMinimo: 'STATUS: PENDENTE + ORIENTAÇÃO UBS',
  },
  {
    cpf: '00011122233',
    nome: 'Cadastro não localizado',
    idade: '—',
    escola: '—',
    status: 'NÃO LOCALIZADO',
    cor: 'red',
    educacao: 'Responsável deve regularizar o cadastro.',
    saude: 'Nenhum vínculo encontrado nos dados simulados.',
    ubs: 'Encaminhar para conferência cadastral.',
    retornoMinimo: 'STATUS: NÃO LOCALIZADO',
  },
];

function formatCpf(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function getColor(p, key) {
  if (!key) return p.blue;
  return p[key] || p.blue;
}

function maskedCpf(value) {
  const d = value.replace(/\D/g, '');
  if (d.length < 11) return '***.***.***-**';
  return `***.${d.slice(3, 6)}.${d.slice(6, 9)}-**`;
}

function Noise() {
  return (
    <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: .035 }}>
      <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" /></filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

function Card({ children, p, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: .55 }}
      style={{
        background: p.surface,
        border: `1px solid ${p.line}`,
        borderRadius: 26,
        padding: 24,
        backdropFilter: 'blur(18px)',
        boxShadow: '0 24px 90px rgba(0,0,0,.20)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

function Pill({ children, p, color }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 999, background: `${color || p.blue}18`, color: color || p.blue, border: `1px solid ${(color || p.blue)}44`, fontSize: 12, fontWeight: 800, letterSpacing: '.08em' }}>{children}</span>;
}

function SectionTitle({ p, eyebrow, title, text }) {
  return (
    <div style={{ maxWidth: 850, margin: '0 auto 28px', textAlign: 'center' }}>
      <div style={{ color: p.amber, fontSize: 12, fontWeight: 900, letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: 12 }}>— {eyebrow}</div>
      <h2 style={{ fontSize: 'clamp(34px, 5vw, 62px)', lineHeight: 1, margin: 0, letterSpacing: '-.055em' }}>{title}</h2>
      {text && <p style={{ color: p.muted, fontSize: 18, lineHeight: 1.65, margin: '18px auto 0', maxWidth: 740 }}>{text}</p>}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [cpf, setCpf] = useState('');
  const [resultado, setResultado] = useState(null);
  const [simulando, setSimulando] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const p = themes[theme];

  const digits = cpf.replace(/\D/g, '');
  const pessoa = useMemo(() => pessoas.find(x => x.cpf === digits), [digits]);
  const active = resultado || null;
  const c = active ? getColor(p, active.cor) : p.blue;

  function consultar(e) {
    e.preventDefault();
    setAccessDenied(false);
    setSimulando(true);
    setResultado(null);
    setTimeout(() => {
      setResultado(pessoa || pessoas[2]);
      setSimulando(false);
    }, 850);
  }

  return (
    <main style={{ minHeight: '100vh', color: p.text, background: `radial-gradient(circle at 12% 8%, ${p.blue}33, transparent 25%), radial-gradient(circle at 86% 5%, ${p.purple}22, transparent 24%), linear-gradient(180deg, ${p.bg}, ${p.bg2})`, fontFamily: 'Inter, system-ui, Arial', overflowX: 'hidden' }}>
      <style>{`
        *{box-sizing:border-box} body{margin:0} html{scroll-behavior:smooth} input,button{font:inherit} a{color:inherit}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes scan{0%{transform:translateY(-110%);opacity:0}30%{opacity:1}100%{transform:translateY(310%);opacity:0}}
        @keyframes pulseLine{0%{width:0;opacity:.2}50%{width:100%;opacity:1}100%{width:100%;opacity:.2}}
        .wrap{max-width:1180px;margin:0 auto;padding:0 24px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:22px}.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.grid5{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
        @media(max-width:900px){.grid2,.grid3,.grid5{grid-template-columns:1fr!important}.heroTitle{font-size:48px!important}.hideMobile{display:none!important}}
      `}</style>
      <Noise />

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(18px)', background: p.glass, borderBottom: `1px solid ${p.line}` }}>
        <div className="wrap" style={{ height: 74, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, background: `linear-gradient(135deg, ${p.blue}, ${p.green})`, display: 'grid', placeItems: 'center', boxShadow: `0 18px 40px ${p.blue}44` }}><ShieldCheck color="white" /></div>
            <div><strong style={{ fontSize: 18 }}>IntegraCPF</strong><div style={{ color: p.muted, fontSize: 11, letterSpacing: '.14em' }}>PROTÓTIPO · SAÚDE × EDUCAÇÃO</div></div>
          </div>
          <div className="hideMobile" style={{ display: 'flex', gap: 22, color: p.muted, fontSize: 13 }}>
            <a href="#fluxo" style={{ textDecoration: 'none' }}>Fluxo</a><a href="#interfaces" style={{ textDecoration: 'none' }}>Interfaces</a><a href="#auditoria" style={{ textDecoration: 'none' }}>Auditoria</a><a href="#apresentacao" style={{ textDecoration: 'none' }}>Apresentação</a>
          </div>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ width: 42, height: 42, borderRadius: 14, border: `1px solid ${p.line}`, background: p.surface2, color: p.text, cursor: 'pointer' }}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
        </div>
      </nav>

      <section className="wrap" style={{ position: 'relative', padding: '72px 24px 54px' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <Pill p={p} color={p.green}><Sparkles size={15} /> Demo interativa para apresentar tela a tela</Pill>
          <h1 className="heroTitle" style={{ fontSize: 78, lineHeight: .96, letterSpacing: '-.07em', maxWidth: 960, margin: '24px 0 22px' }}>Como o protótipo funciona em cada interface.</h1>
          <p style={{ maxWidth: 760, color: p.muted, fontSize: 19, lineHeight: 1.7 }}>A escola digita o CPF para fins de matrícula. A Saúde calcula o status. A Educação recebe somente a resposta mínima necessária. Qualquer tentativa de ver prontuário é bloqueada e registrada.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 30 }}>
            <a href="#simulador" style={{ textDecoration: 'none', background: p.text, color: p.bg, padding: '15px 22px', borderRadius: 14, fontWeight: 900, display: 'inline-flex', gap: 8, alignItems: 'center' }}><Play size={17} /> Abrir simulador</a>
            <a href="#interfaces" style={{ textDecoration: 'none', border: `1px solid ${p.line}`, padding: '15px 22px', borderRadius: 14, fontWeight: 800, color: p.text }}>Ver interfaces</a>
          </div>
        </motion.div>
        <HeroMachine p={p} />
      </section>

      <section id="fluxo" className="wrap" style={{ padding: '36px 24px 70px' }}>
        <SectionTitle p={p} eyebrow="Fluxo operacional" title="Tela a tela, do CPF até a decisão" text="Este é o roteiro que explica a navegação do protótipo para qualquer professor, avaliador ou equipe técnica." />
        <div className="grid5">
          {[
            ['01', 'Educação', 'Servidor escolar digita o CPF do aluno/responsável.', GraduationCap, p.amber],
            ['02', 'Validação', 'O sistema cria uma consulta com finalidade declarada.', ShieldCheck, p.blue],
            ['03', 'Saúde', 'A base da Saúde calcula apenas o status vacinal.', HeartPulse, p.red],
            ['04', 'Retorno mínimo', 'A Educação recebe liberado, pendente ou não localizado.', EyeOff, p.green],
            ['05', 'Auditoria', 'Tudo fica registrado e tentativas indevidas são bloqueadas.', FileSearch, p.purple],
          ].map(([n, title, desc, Icon, color], i) => (
            <Card key={n} p={p} style={{ minHeight: 210, position: 'relative' }}>
              <Icon color={color} />
              <div style={{ color, fontWeight: 900, marginTop: 18 }}>{n}</div>
              <h3 style={{ margin: '8px 0' }}>{title}</h3>
              <p style={{ color: p.muted, lineHeight: 1.55, margin: 0 }}>{desc}</p>
              {i < 4 && <ChevronRight className="hideMobile" style={{ position: 'absolute', right: -26, top: '46%', color: p.muted, zIndex: 2 }} />}
            </Card>
          ))}
        </div>
      </section>

      <section id="simulador" className="wrap" style={{ padding: '20px 24px 70px' }}>
        <SectionTitle p={p} eyebrow="Simulador principal" title="Consulta por CPF em ambiente controlado" text="Use CPFs fictícios para demonstrar os três cenários: liberado, pendente e não localizado." />
        <div className="grid2">
          <Card p={p}>
            <h3 style={{ fontSize: 26, margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 10 }}><Search color={p.blue} /> Interface da Educação</h3>
            <form onSubmit={consultar}>
              <label style={{ color: p.muted, fontSize: 14 }}>CPF simulado</label>
              <input value={cpf} onChange={e => { setCpf(formatCpf(e.target.value)); setResultado(null); setAccessDenied(false); }} placeholder="123.456.789-00" style={{ width: '100%', margin: '10px 0 14px', padding: '18px 16px', borderRadius: 18, border: `1px solid ${p.line}`, background: p.surface2, color: p.text, outline: 'none', fontSize: 22, letterSpacing: '.04em' }} />
              <button type="submit" style={{ width: '100%', border: 0, borderRadius: 18, padding: '16px 18px', background: `linear-gradient(135deg, ${p.blue}, ${p.purple})`, color: 'white', fontWeight: 900, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>Consultar situação <ArrowRight size={18} /></button>
            </form>
            <div style={{ marginTop: 16, display: 'grid', gap: 8, color: p.muted, fontSize: 14 }}>
              <span>123.456.789-00 → liberado</span><span>111.222.333-44 → pendente</span><span>000.111.222-33 ou outro → não localizado</span>
            </div>
          </Card>

          <Card p={p} style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 2, background: `linear-gradient(90deg, transparent, ${c}, transparent)`, animation: simulando ? 'pulseLine .85s ease-in-out infinite' : 'none' }} />
            <h3 style={{ fontSize: 26, margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 10 }}><Database color={p.green} /> Motor de decisão</h3>
            <div style={{ display: 'grid', gap: 14 }}>
              <EngineStep p={p} active={digits.length > 0} icon={<GraduationCap color={p.amber} />} title="1. Solicitação da escola" text={`CPF enviado para consulta: ${maskedCpf(cpf)}`} />
              <EngineStep p={p} active={simulando || !!active} icon={<Lock color={p.blue} />} title="2. Pseudonimização" text="CPF é transformado em token temporário para reduzir exposição." />
              <EngineStep p={p} active={!!active} icon={<HeartPulse color={p.red} />} title="3. Cálculo pela Saúde" text="A Saúde calcula o status sem revelar prontuário." />
            </div>
          </Card>
        </div>
      </section>

      <section id="interfaces" className="wrap" style={{ padding: '0 24px 70px' }}>
        <SectionTitle p={p} eyebrow="Interfaces separadas" title="O que cada secretaria enxerga" text="Essa é a parte mais importante para a apresentação: Educação e Saúde possuem visões diferentes do mesmo fluxo." />
        <div className="grid2">
          <InterfaceEducacao p={p} active={active} color={c} />
          <InterfaceSaude p={p} active={active} color={c} />
        </div>
      </section>

      <section id="privacidade" className="wrap" style={{ padding: '0 24px 70px' }}>
        <div className="grid3">
          <Card p={p}>
            <EyeOff color={p.green} />
            <h3>Minimização de dados</h3>
            <p style={{ color: p.muted, lineHeight: 1.6 }}>A Educação não recebe vacina específica, doença, alergia, medicação ou prontuário. Recebe apenas o status necessário para o ato administrativo.</p>
          </Card>
          <Card p={p}>
            <Lock color={p.blue} />
            <h3>Pseudonimização</h3>
            <p style={{ color: p.muted, lineHeight: 1.6 }}>O CPF é usado como chave de consulta, mas a demonstração apresenta o conceito de token temporário e retorno mínimo.</p>
          </Card>
          <Card p={p}>
            <FileCheck color={p.amber} />
            <h3>Finalidade declarada</h3>
            <p style={{ color: p.muted, lineHeight: 1.6 }}>Toda consulta possui finalidade: matrícula escolar. Se a finalidade muda, o sistema bloqueia.</p>
          </Card>
        </div>
      </section>

      <section id="auditoria" className="wrap" style={{ padding: '0 24px 70px' }}>
        <SectionTitle p={p} eyebrow="Controle e segurança" title="Acesso indevido é bloqueado e registrado" text="Essa tela demonstra que o protótipo não é apenas uma consulta: ele também controla abusos e gera evidências de auditoria." />
        <div className="grid2">
          <Card p={p}>
            <h3 style={{ fontSize: 25, marginTop: 0, display: 'flex', gap: 10, alignItems: 'center' }}><AlertTriangle color={p.red} /> Teste de acesso indevido</h3>
            <p style={{ color: p.muted, lineHeight: 1.65 }}>Simule uma tentativa da escola de acessar prontuário, alergias ou medicamentos. O sistema deve negar porque isso não é necessário para matrícula.</p>
            <button onClick={() => setAccessDenied(true)} style={{ width: '100%', padding: '16px 18px', borderRadius: 18, border: `1px solid ${p.red}`, background: `${p.red}1f`, color: p.text, fontWeight: 900, cursor: 'pointer' }}>Tentar abrir prontuário</button>
            <AnimatePresence>
              {accessDenied && <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: 16, padding: 18, borderRadius: 18, background: `${p.red}18`, border: `1px solid ${p.red}` }}>
                <strong style={{ color: p.red, display: 'flex', gap: 8, alignItems: 'center' }}><XCircle /> ACESSO NEGADO — 403</strong>
                <p style={{ color: p.muted, marginBottom: 0 }}>Finalidade incompatível. Evento registrado na trilha de auditoria.</p>
              </motion.div>}
            </AnimatePresence>
          </Card>
          <AuditTable p={p} accessDenied={accessDenied} />
        </div>
      </section>

      <section id="apresentacao" className="wrap" style={{ padding: '0 24px 90px' }}>
        <Card p={p} style={{ textAlign: 'center' }}>
          <Pill p={p} color={p.amber}>ROTEIRO FINAL</Pill>
          <h2 style={{ fontSize: 'clamp(34px,5vw,60px)', letterSpacing: '-.055em', margin: '18px 0 12px' }}>Como explicar para o grupo</h2>
          <p style={{ color: p.muted, maxWidth: 760, margin: '0 auto', lineHeight: 1.7, fontSize: 18 }}>“A Educação não precisa conhecer o histórico de saúde do aluno. Ela só precisa saber se a situação permite matrícula ou se a família deve ser orientada. O IntegraCPF demonstra esse fluxo com segurança, minimização e auditoria.”</p>
        </Card>
      </section>
    </main>
  );
}

function HeroMachine({ p }) {
  return (
    <div className="hideMobile" style={{ position: 'absolute', right: 24, top: 110, width: 390, opacity: .38, animation: 'float 6s ease-in-out infinite' }}>
      <div style={{ border: `1px solid ${p.line}`, borderRadius: 24, background: p.surface, padding: 14, transform: 'rotate(-3deg)' }}>
        <div style={{ height: 24, display: 'flex', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: 999, background: p.red }} /><span style={{ width: 10, height: 10, borderRadius: 999, background: p.amber }} /><span style={{ width: 10, height: 10, borderRadius: 999, background: p.green }} /></div>
        <div style={{ border: `1px solid ${p.line}`, borderRadius: 18, padding: 18, background: p.bg }}>
          <div style={{ height: 12, width: '65%', background: p.surface2, borderRadius: 99, marginBottom: 12 }} />
          <div style={{ height: 54, borderRadius: 14, background: `${p.blue}18`, border: `1px solid ${p.blue}44`, marginBottom: 12 }} />
          <div style={{ display: 'grid', gap: 8 }}>{[p.green,p.amber,p.red].map((x,i)=><div key={i} style={{ height: 28, borderRadius: 10, background: `${x}16`, border: `1px solid ${x}33` }} />)}</div>
        </div>
      </div>
    </div>
  );
}

function EngineStep({ p, active, icon, title, text }) {
  return <motion.div animate={{ opacity: active ? 1 : .45, scale: active ? 1 : .985 }} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 15, borderRadius: 18, background: active ? p.surface2 : 'transparent', border: `1px solid ${active ? p.line : 'transparent'}` }}><div>{icon}</div><div><strong>{title}</strong><p style={{ color: p.muted, margin: '6px 0 0', lineHeight: 1.5 }}>{text}</p></div></motion.div>;
}

function InterfaceEducacao({ p, active, color }) {
  return <Card p={p} style={{ minHeight: 410 }}>
    <h3 style={{ fontSize: 28, marginTop: 0, display: 'flex', gap: 10, alignItems: 'center' }}><GraduationCap color={p.amber} /> Secretaria da Educação</h3>
    {!active ? <Empty p={p} text="Aguardando CPF para validar matrícula..." /> : <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Pill p={p} color={color}>{active.status}</Pill>
      <h4 style={{ fontSize: 30, margin: '20px 0 8px' }}>{active.nome}</h4>
      <p style={{ color: p.muted, marginTop: 0 }}>{active.educacao}</p>
      <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
        <MiniRow p={p} icon={<UserCheck color={color} />} label="Retorno recebido" value={active.retornoMinimo} />
        <MiniRow p={p} icon={<Building2 color={p.amber} />} label="Finalidade" value="Matrícula escolar" />
        <MiniRow p={p} icon={<EyeOff color={p.green} />} label="Dados ocultos" value="Prontuário, doença, alergia, medicamento e histórico clínico" />
      </div>
    </motion.div>}
  </Card>;
}

function InterfaceSaude({ p, active, color }) {
  return <Card p={p} style={{ minHeight: 410 }}>
    <h3 style={{ fontSize: 28, marginTop: 0, display: 'flex', gap: 10, alignItems: 'center' }}><HeartPulse color={p.red} /> Secretaria da Saúde</h3>
    {!active ? <Empty p={p} text="Aguardando consulta da Educação..." /> : <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Pill p={p} color={color}>CÁLCULO INTERNO</Pill>
      <p style={{ color: p.muted, lineHeight: 1.65 }}>A Saúde mantém os dados sensíveis protegidos e calcula somente a resposta necessária.</p>
      <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
        <MiniRow p={p} icon={<CheckCircle2 color={color} />} label="Situação vacinal" value={active.saude} />
        <MiniRow p={p} icon={<CalendarCheck color={p.blue} />} label="Encaminhamento" value={active.ubs} />
        <MiniRow p={p} icon={<Eye color={p.red} />} label="Visível apenas para Saúde" value="Dados clínicos internos continuam restritos ao domínio da Saúde" />
      </div>
    </motion.div>}
  </Card>;
}

function Empty({ p, text }) { return <div style={{ minHeight: 250, display: 'grid', placeItems: 'center', color: p.muted, border: `1px dashed ${p.line}`, borderRadius: 20 }}>{text}</div>; }
function MiniRow({ p, icon, label, value }) { return <div style={{ display: 'flex', gap: 12, padding: 14, borderRadius: 18, background: p.surface2, border: `1px solid ${p.line}` }}><div>{icon}</div><div><strong>{label}</strong><p style={{ margin: '5px 0 0', color: p.muted, lineHeight: 1.45 }}>{value}</p></div></div>; }

function AuditTable({ p, accessDenied }) {
  const rows = [
    ['11:08:21', 'Educação', 'Consulta para matrícula', 'OK', '200'],
    ['11:08:23', 'Motor LGPD', 'Minimização aplicada', 'OK', '200'],
    ['11:08:25', 'Saúde', 'Status vacinal calculado', 'OK', '200'],
    ['11:08:27', 'Sistema', 'Retorno mínimo enviado', 'OK', '200'],
    ...(accessDenied ? [['AGORA', 'Educação', 'Tentativa de prontuário', 'BLOQUEADO', '403']] : []),
  ];
  return <Card p={p}>
    <h3 style={{ fontSize: 25, marginTop: 0, display: 'flex', gap: 10, alignItems: 'center' }}><FileSearch color={p.purple} /> Trilha de auditoria</h3>
    <div style={{ display: 'grid', gap: 10 }}>{rows.map((r, i) => {
      const blocked = r[3] === 'BLOQUEADO';
      return <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i*.04 }} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 96px 48px', gap: 10, alignItems: 'center', padding: '12px 13px', borderRadius: 15, background: blocked ? `${p.red}18` : p.surface2, border: `1px solid ${blocked ? p.red : p.line}`, fontSize: 13 }}><span style={{ color: p.muted }}>{r[0]}</span><span>{r[1]} · {r[2]}</span><strong style={{ color: blocked ? p.red : p.green }}>{r[3]}</strong><span style={{ color: p.muted }}>{r[4]}</span></motion.div>;
    })}</div>
  </Card>;
}
