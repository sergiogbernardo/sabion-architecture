import { useMemo, useState } from "react";

const architectureTypes = [
  { id: "web", label: "Aplicação web", icon: "⌘" },
  { id: "api", label: "API ou backend", icon: "↔" },
  { id: "saas", label: "Produto SaaS", icon: "◫" },
  { id: "cloud", label: "Arquitetura cloud", icon: "☁" },
  { id: "mobile", label: "Mobile + backend", icon: "◇" },
  { id: "data", label: "Plataforma de dados", icon: "◉" },
];

const stages = ["Ideia", "Em construção", "Em produção", "Em evolução"];

const sampleQuestions = [
  {
    dimension: "Identidade e acessos",
    question: "Contas administrativas exigem um segundo fator de autenticação?",
    help: "Considere painéis cloud, banco de dados, repositórios e ferramentas de operação.",
  },
  {
    dimension: "Resiliência",
    question: "A restauração dos backups já foi testada em uma situação realista?",
    help: "Ter backup não garante que os dados possam ser recuperados no tempo esperado.",
  },
  {
    dimension: "Observabilidade",
    question: "A equipe consegue detectar rapidamente falhas que afetam usuários?",
    help: "Pense em logs, métricas, alertas e em quem é acionado quando algo acontece.",
  },
];

const dimensions = [
  "Segurança",
  "Identidade",
  "Dados",
  "Resiliência",
  "Performance",
  "Observabilidade",
  "APIs",
  "Operação",
];

type Screen = "home" | "context" | "assessment" | "result";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [architectureType, setArchitectureType] = useState("");
  const [stage, setStage] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const progress = useMemo(
    () => Math.round(((questionIndex + 1) / sampleQuestions.length) * 100),
    [questionIndex],
  );

  function startAssessment() {
    setScreen("context");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function answer(value: string) {
    const nextAnswers = [...answers, value];
    setAnswers(nextAnswers);
    if (questionIndex === sampleQuestions.length - 1) {
      setScreen("result");
      return;
    }
    setQuestionIndex((current) => current + 1);
  }

  function resetDemo() {
    setScreen("home");
    setArchitectureType("");
    setStage("");
    setQuestionIndex(0);
    setAnswers([]);
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <button className="brand" onClick={resetDemo} aria-label="Voltar ao início">
          <span className="brand-mark">S</span>
          <span>Sabion <strong>Architecture</strong></span>
        </button>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#como-funciona">Como funciona</a>
          <a href="#dimensoes">Dimensões</a>
          <button className="nav-login">Entrar</button>
        </nav>
      </header>

      {screen === "home" && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="pulse-dot" />
                Architecture Health Check
              </div>
              <h1>
                Sua arquitetura faz sentido
                <span> quando o risco fica claro.</span>
              </h1>
              <p className="hero-description">
                Responda uma avaliação guiada e descubra pontos fortes, riscos
                prioritários e os próximos passos para evoluir sua arquitetura.
              </p>
              <div className="hero-actions">
                <button className="primary-button" onClick={startAssessment}>
                  Avaliar minha arquitetura
                  <span aria-hidden="true">→</span>
                </button>
                <span className="time-note">Grátis · 10–15 minutos · Sem cadastro</span>
              </div>
              <div className="trust-row">
                <span>Feito para quem constrói</span>
                <div className="trust-tags">
                  <span>Software</span>
                  <span>Cloud</span>
                  <span>Security</span>
                  <span>Data</span>
                </div>
              </div>
            </div>

            <div className="hero-visual" aria-label="Exemplo do resultado da avaliação">
              <div className="result-card">
                <div className="card-header">
                  <div>
                    <span className="card-kicker">VISÃO GERAL</span>
                    <h2>Architecture score</h2>
                  </div>
                  <span className="live-badge">Health Check</span>
                </div>
                <div className="score-area">
                  <div className="score-ring">
                    <div>
                      <strong>72</strong>
                      <span>/100</span>
                    </div>
                  </div>
                  <div className="score-copy">
                    <span className="maturity-label">Maturidade</span>
                    <strong>Em evolução</strong>
                    <p>Boa fundação, com riscos importantes para priorizar.</p>
                  </div>
                </div>
                <div className="mini-bars">
                  {[
                    ["Segurança", 78],
                    ["Resiliência", 54],
                    ["Dados", 84],
                    ["Operação", 66],
                  ].map(([label, value]) => (
                    <div className="bar-row" key={label}>
                      <span>{label}</span>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${value}%` }} />
                      </div>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
                <div className="risk-callout">
                  <span className="risk-icon">!</span>
                  <div>
                    <span>RISCO PRIORITÁRIO</span>
                    <strong>Recuperação ainda não foi testada</strong>
                  </div>
                  <span aria-hidden="true">↗</span>
                </div>
              </div>
            </div>
          </section>

          <section className="how-section" id="como-funciona">
            <div className="section-heading">
              <span>COMO FUNCIONA</span>
              <h2>Menos relatório. Mais clareza para decidir.</h2>
            </div>
            <div className="steps-grid">
              {[
                ["01", "Dê contexto", "Conte o tipo, estágio e objetivo da arquitetura. Nada de informações sensíveis."],
                ["02", "Responda com confiança", "Perguntas simples, adaptadas ao seu cenário e com explicações quando precisar."],
                ["03", "Saia com um plano", "Entenda o que está bem, o que traz risco e qual melhoria fazer primeiro."],
              ].map(([number, title, copy]) => (
                <article className="step-card" key={number}>
                  <span className="step-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="dimensions-section" id="dimensoes">
            <div>
              <span className="section-label">UMA VISÃO COMPLETA</span>
              <h2>Oito dimensões que sustentam uma boa arquitetura.</h2>
              <p>
                Os frameworks trabalham nos bastidores. Você vê perguntas claras,
                contexto e recomendações que consegue explicar para o time.
              </p>
            </div>
            <div className="dimension-cloud">
              {dimensions.map((dimension, index) => (
                <span key={dimension} className={index < 3 ? "highlight" : ""}>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  {dimension}
                </span>
              ))}
            </div>
          </section>

          <section className="final-cta">
            <span className="section-label">COMECE PELO QUE IMPORTA</span>
            <h2>Uma arquitetura melhor começa com as perguntas certas.</h2>
            <button className="primary-button" onClick={startAssessment}>
              Começar avaliação grátis <span>→</span>
            </button>
          </section>
        </>
      )}

      {screen === "context" && (
        <section className="flow-panel">
          <button className="back-button" onClick={() => setScreen("home")}>← Voltar</button>
          <div className="flow-heading">
            <span className="flow-step">PASSO 1 DE 2</span>
            <h1>O que vamos avaliar?</h1>
            <p>Um pouco de contexto torna as perguntas muito mais relevantes.</p>
          </div>

          <div className="form-group">
            <label>Tipo de arquitetura</label>
            <div className="type-grid">
              {architectureTypes.map((type) => (
                <button
                  key={type.id}
                  className={architectureType === type.id ? "type-card selected" : "type-card"}
                  onClick={() => setArchitectureType(type.id)}
                >
                  <span>{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Em qual estágio ela está?</label>
            <div className="stage-row">
              {stages.map((item) => (
                <button
                  key={item}
                  className={stage === item ? "stage-pill selected" : "stage-pill"}
                  onClick={() => setStage(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            className="primary-button flow-next"
            disabled={!architectureType || !stage}
            onClick={() => setScreen("assessment")}
          >
            Começar health check <span>→</span>
          </button>
          <p className="privacy-note">Não informe credenciais, segredos ou dados pessoais.</p>
        </section>
      )}

      {screen === "assessment" && (
        <section className="assessment-panel">
          <div className="assessment-top">
            <button className="back-button" onClick={() => setScreen("context")}>← Contexto</button>
            <span>{questionIndex + 1} de {sampleQuestions.length}</span>
          </div>
          <div className="progress-track">
            <div style={{ width: `${progress}%` }} />
          </div>
          <div className="question-card">
            <span className="question-dimension">
              {sampleQuestions[questionIndex].dimension}
            </span>
            <h1>{sampleQuestions[questionIndex].question}</h1>
            <p>{sampleQuestions[questionIndex].help}</p>
            <div className="answer-grid">
              {[
                ["Sim", "Está implementado e funciona"],
                ["Parcialmente", "Existe, mas precisa evoluir"],
                ["Não", "Ainda não foi implementado"],
                ["Não sei", "Preciso confirmar com o time"],
              ].map(([label, helper]) => (
                <button key={label} onClick={() => answer(label)}>
                  <strong>{label}</strong>
                  <span>{helper}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="autosave-note">Seu progresso fica salvo neste dispositivo.</p>
        </section>
      )}

      {screen === "result" && (
        <section className="demo-result">
          <span className="eyebrow"><span className="pulse-dot" /> Resultado demonstrativo</span>
          <h1>Sua arquitetura já tem uma boa base.</h1>
          <p className="result-intro">
            Com base nas respostas desta demonstração, encontramos um ponto forte
            e duas oportunidades que merecem atenção.
          </p>
          <div className="result-summary-grid">
            <div className="big-score">
              <span>HEALTH SCORE</span>
              <strong>68<small>/100</small></strong>
              <p>Em evolução</p>
            </div>
            <div className="findings-list">
              <article className="finding positive">
                <span>✓</span>
                <div><small>PONTO FORTE</small><strong>Controles básicos já considerados</strong></div>
              </article>
              <article className="finding warning">
                <span>!</span>
                <div><small>ATENÇÃO</small><strong>Valide o processo de recuperação</strong></div>
              </article>
              <article className="finding neutral">
                <span>→</span>
                <div><small>PRÓXIMO PASSO</small><strong>Defina responsáveis e evidências</strong></div>
              </article>
            </div>
          </div>
          <div className="result-actions">
            <button className="primary-button" onClick={resetDemo}>Voltar ao início</button>
            <button className="secondary-button">Salvar resultado em breve</button>
          </div>
        </section>
      )}

      <footer>
        <div className="brand">
          <span className="brand-mark">S</span>
          <span>Sabion <strong>Architecture</strong></span>
        </div>
        <p>Entenda, avalie e melhore sua arquitetura.</p>
        <span>Produto em construção · 2026</span>
      </footer>
    </main>
  );
}
