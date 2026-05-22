import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ArrowRight, BookOpen, CalendarCheck, CheckCircle2, Database, EyeOff, FileSearch, GraduationCap, HeartPulse, Lock, Search, ShieldCheck, XCircle } from 'lucide-react';

const palette = {
  bg: '#08111f',
  surface: '#101c31',
  surface2: '#16243d',
  text: '#f7fbff',
  muted: '#9fb2d0',
  blue: '#4f8cff',
  green: '#35d399',
  amber: '#f6b84b',
  red: '#ff5c7a',
  line: 'rgba(255,255,255,.12)',
};

const pessoas = [
  {
    cpf: '12345678900',
    nome: 'Helena S. Andrade',
    escola: 'EMEF Aracaju Digital',
    idade: '8 anos',
    status: 'LIBERADO',
    statusVacinal: 'Calendário em dia',
    educacao: 'Matrícula pode prosseguir',
    alerta: 'A escola recebe apenas o status necessário. Nenhum dado clínico é exibido.',
    vacina: 'Nenhuma pendência vacinal simulada.',
  },
  {
    cpf: '11122233344',
    nome: 'Miguel A. Santos',
    escola: 'EMEF Aracaju Digital',
    idade: '10 anos',
    status: 'PENDENTE',
    statusVacinal: 'Pendência identificada',
    educacao: 'Matrícula exige orientação à família',
    alerta: 'A escola não vê doença, prontuário ou medicamento. Só vê a pendência administrativa.',
    vacina: 'Atualização vacinal recomendada na UBS Atalaia.',
  },
  {
    cpf: '00011122233',
    nome: 'Cadastro não localizado',
    escola: '—',
    idade: '—',
    status: 'NÃO LOCALIZADO',
    statusVacinal: 'Sem vínculo encontrado',
    educacao: 'Encaminhar responsável para regularização',
    alerta: 'O sistema não libera dados inexistentes ou inconsistentes.',
    vacina: 'Responsável deve procurar atendimento cadastral.',
  },
];

const auditoriaBase = [
  ['11:08:21', 'Educação', 'Consulta para matrícula', 'OK', '200'],
  ['11:08:23', 'Motor LGPD', 'Minimização aplicada', 'OK', '200'],
  ['11:08:25', 'Saúde', 'Status vacinal calculado', 'OK', '200'],
  ['11:08:27', 'Escola', 'Tentativa de ver prontuário', 'BLOQUEADO', '403'],
];

function formatCpf(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function statusColor(status) {
  if (status === 'LIBERADO') return palette.green;
  if (status === 'PENDENTE') return palette.amber;
  return palette.red;
}

function Card({ children, style }) {
  return <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.025))', border: `1px solid ${palette.line}`, borderRadius: 24, padding: 24, boxShadow: '0 20px 70px rgba(0,0,0,.22)', ...style }}>{children}</div>;
}

function Step({ n, title, desc, active }) {
  return (
    <motion.div animate={{ opacity: active ? 1 : .48, scale: active ? 1 : .98 }} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{ width: 32, height: 32, borderRadius: 999, background: active ? palette.blue : palette.surface2, display: 'grid', placeItems: 'center', fontWeight: 800 }}>{n}</div>
      <div><strong>{title}</strong><p style={{ color: palette.muted, margin: '6px 0 0', lineHeight: 1.5 }}>{desc}</p></div>
    </motion.div>
  );
}

export default function App() {
  const [cpf, setCpf] = useState('');
  const [consultado, setConsultado] = useState(null);
  const [tentativaIndevida, setTentativaIndevida] = useState(false);

  const digits = cpf.replace(/\D/g, '');
  const pessoa = useMemo(() => pessoas.find(p => p.cpf === digits), [digits]);
  const resultado = consultado ? (pessoa || pessoas[2]) : null;
  const color = resultado ? statusColor(resultado.status) : palette.blue;

  function consultar(e) {
    e.preventDefault();
    setTentativaIndevida(false);
    setConsultado(true);
  }

  return (
    <main style={{ minHeight: '100vh', background: `radial-gradient(circle at 20% 10%, ${palette.blue}33, transparent 28%), radial-gradient(circle at 80% 0%, ${palette.green}22, transparent 22%), ${palette.bg}`, color: palette.text, fontFamily: 'Inter, system-ui, Arial', padding: 24 }}>
      <style>{`*{box-sizing:border-box} body{margin:0} input,button{font:inherit} @media(max-width:850px){.grid{grid-template-columns:1fr!important}.hero{padding-top:34px!important} .title{font-size:44px!important}}`}</style>

      <section className="hero" style={{ maxWidth: 1180, margin: '0 auto', padding: '70px 0 34px' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: `1px solid ${palette.line}`, background: 'rgba(255,255,255,.05)', padding: '10px 14px', borderRadius: 999, color: palette.muted, marginBottom: 22 }}>
          <ShieldCheck size={18} color={palette.green} /> Protótipo isolado · Saúde × Educação · LGPD
        </motion.div>
        <motion.h1 className="title" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .1 }} style={{ fontSize: 70, lineHeight: .98, letterSpacing: '-.055em', maxWidth: 900, margin: 0 }}>
          IntegraCPF: consulta por CPF com dados mínimos e auditoria.
        </motion.h1>
        <p style={{ maxWidth: 760, color: palette.muted, fontSize: 19, lineHeight: 1.65, marginTop: 22 }}>
          Este site mostra apenas o fluxo do protótipo: a Educação consulta um CPF, a Saúde calcula o status necessário, e o sistema bloqueia qualquer tentativa de acessar prontuário ou dados sensíveis.
        </p>
      </section>

      <section className="grid" style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 22 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}><Search color={palette.blue} /><h2 style={{ margin: 0 }}>1. Consulta da Secretaria da Educação</h2></div>
          <form onSubmit={consultar}>
            <label style={{ color: palette.muted, fontSize: 14 }}>Digite um CPF simulado</label>
            <input value={cpf} onChange={e => { setCpf(formatCpf(e.target.value)); setConsultado(false); }} placeholder="123.456.789-00" style={{ width: '100%', margin: '10px 0 14px', padding: '18px 16px', borderRadius: 16, border: `1px solid ${palette.line}`, background: 'rgba(255,255,255,.06)', color: palette.text, outline: 'none', fontSize: 22, letterSpacing: '.04em' }} />
            <button type="submit" style={{ width: '100%', border: 0, borderRadius: 16, padding: '16px 18px', background: palette.blue, color: 'white', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              Consultar situação <ArrowRight size={18} />
            </button>
          </form>
          <div style={{ marginTop: 18, display: 'grid', gap: 8, color: palette.muted, fontSize: 14 }}>
            <span>Teste rápido: 123.456.789-00 = liberado</span>
            <span>Teste rápido: 111.222.333-44 = pendente</span>
            <span>Qualquer outro CPF = não localizado</span>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}><Database color={palette.green} /><h2 style={{ margin: 0 }}>2. Motor de decisão</h2></div>
          <div style={{ display: 'grid', gap: 22 }}>
            <Step n="A" title="CPF entra no sistema" desc="A escola informa o CPF apenas para validar a situação de matrícula." active={!!digits} />
            <Step n="B" title="Saúde calcula o status" desc="O sistema consulta dados simulados, mas não expõe histórico clínico." active={!!consultado} />
            <Step n="C" title="Educação recebe só o necessário" desc="Retorna apenas liberado, pendente ou não localizado." active={!!resultado} />
          </div>
        </Card>
      </section>

      <section className="grid" style={{ maxWidth: 1180, margin: '22px auto 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
        <Card style={{ minHeight: 320 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}><GraduationCap color={palette.amber} /><h2 style={{ margin: 0 }}>Interface da Educação</h2></div>
          <AnimatePresence mode="wait">
            {!resultado ? <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: palette.muted }}>Aguardando consulta para matrícula...</motion.p> : (
              <motion.div key={resultado.status} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ display: 'inline-flex', padding: '10px 14px', borderRadius: 999, background: `${color}22`, color, fontWeight: 900, letterSpacing: '.08em' }}>{resultado.status}</div>
                <h3 style={{ fontSize: 28, margin: '18px 0 8px' }}>{resultado.nome}</h3>
                <p style={{ color: palette.muted, margin: 0 }}>{resultado.educacao}</p>
                <div style={{ marginTop: 18, padding: 16, borderRadius: 16, background: 'rgba(255,255,255,.05)', border: `1px solid ${palette.line}` }}>
                  <strong>O que aparece para a escola:</strong>
                  <p style={{ margin: '8px 0 0', color: palette.muted }}>{resultado.status} + orientação administrativa para matrícula.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <Card style={{ minHeight: 320 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}><HeartPulse color={palette.red} /><h2 style={{ margin: 0 }}>Interface da Saúde</h2></div>
          {!resultado ? <p style={{ color: palette.muted }}>Aguardando consulta...</p> : (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <p style={{ color: palette.muted, lineHeight: 1.6 }}>A Saúde mantém o dado sensível protegido e devolve apenas o cálculo do status.</p>
              <div style={{ display: 'grid', gap: 12 }}>
                <Info icon={<CheckCircle2 color={color} />} label="Status vacinal" value={resultado.statusVacinal} />
                <Info icon={<CalendarCheck color={palette.blue} />} label="Encaminhamento" value={resultado.vacina} />
                <Info icon={<EyeOff color={palette.amber} />} label="Minimização" value={resultado.alerta} />
              </div>
            </motion.div>
          )}
        </Card>
      </section>

      <section className="grid" style={{ maxWidth: 1180, margin: '22px auto 0', display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 22 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}><Lock color={palette.red} /><h2 style={{ margin: 0 }}>Bloqueio indevido</h2></div>
          <p style={{ color: palette.muted, lineHeight: 1.6 }}>Simulação de tentativa da escola de abrir prontuário, alergias ou medicamentos.</p>
          <button onClick={() => setTentativaIndevida(true)} style={{ width: '100%', border: `1px solid ${palette.red}`, background: `${palette.red}22`, color: palette.text, padding: '15px 18px', borderRadius: 16, fontWeight: 800, cursor: 'pointer' }}>Tentar acessar prontuário</button>
          <AnimatePresence>
            {tentativaIndevida && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: 16, borderRadius: 18, padding: 16, background: `${palette.red}18`, border: `1px solid ${palette.red}` }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', color: palette.red, fontWeight: 900 }}><XCircle /> ACESSO NEGADO — 403</div>
              <p style={{ color: palette.muted, marginBottom: 0 }}>Finalidade incompatível com matrícula. Evento registrado na auditoria.</p>
            </motion.div>}
          </AnimatePresence>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}><FileSearch color={palette.amber} /><h2 style={{ margin: 0 }}>Trilha de auditoria</h2></div>
          <div style={{ display: 'grid', gap: 10 }}>
            {auditoriaBase.map((log, i) => {
              const blocked = log[3] === 'BLOQUEADO';
              return <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .08 }} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 92px 54px', gap: 10, alignItems: 'center', padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,.05)', border: `1px solid ${blocked ? palette.red : palette.line}`, fontSize: 13 }}>
                <span style={{ color: palette.muted }}>{log[0]}</span><span>{log[1]} · {log[2]}</span><strong style={{ color: blocked ? palette.red : palette.green }}>{log[3]}</strong><span style={{ color: palette.muted }}>{log[4]}</span>
              </motion.div>;
            })}
            {tentativaIndevida && <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '12px 14px', borderRadius: 14, background: `${palette.red}18`, border: `1px solid ${palette.red}`, color: palette.red, fontWeight: 800 }}><AlertTriangle size={16} /> Nova tentativa indevida registrada agora</motion.div>}
          </div>
        </Card>
      </section>

      <section style={{ maxWidth: 1180, margin: '22px auto 0' }}>
        <Card>
          <h2 style={{ marginTop: 0 }}>Fluxo resumido para apresentação</h2>
          <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
            {['Educação digita CPF', 'Sistema pseudonimiza', 'Saúde calcula status', 'Educação recebe mínimo', 'Auditoria registra tudo'].map((t, i) => <div key={t} style={{ padding: 16, borderRadius: 16, background: palette.surface2, border: `1px solid ${palette.line}`, minHeight: 100 }}><div style={{ color: palette.blue, fontWeight: 900, marginBottom: 8 }}>0{i+1}</div>{t}</div>)}
          </div>
        </Card>
      </section>
    </main>
  );
}

function Info({ icon, label, value }) {
  return <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 14, borderRadius: 16, background: 'rgba(255,255,255,.05)', border: `1px solid ${palette.line}` }}><div>{icon}</div><div><strong>{label}</strong><p style={{ margin: '5px 0 0', color: palette.muted, lineHeight: 1.45 }}>{value}</p></div></div>;
}
