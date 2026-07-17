export type ControlTier = "core" | "full";
export type ConfidenceLevel = "declared" | "documented" | "evidenced" | "verified";
export type MaturityValue = 0 | 1 | 2 | 3 | 4 | 5 | "na";

export type FrameworkControl = {
  id: string;
  code: string;
  title: string;
  criterion: string;
  guidance: string;
  evidence: string[];
  recommendation: string;
  tier: ControlTier;
  weight: 1 | 2 | 3;
};

export type FrameworkCategory = {
  id: string;
  code: string;
  name: string;
  description: string;
  controls: FrameworkControl[];
};

export type FrameworkDomain = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  color: string;
  description: string;
  categories: FrameworkCategory[];
};

type ControlSeed = [
  id: string,
  title: string,
  criterion: string,
  evidence: string,
  recommendation: string,
  tier?: ControlTier,
  weight?: 1 | 2 | 3,
];

const makeControls = (categoryCode: string, seeds: ControlSeed[]): FrameworkControl[] =>
  seeds.map(([id, title, criterion, evidence, recommendation, tier = "full", weight = 2], index) => ({
    id,
    code: `${categoryCode}.${index + 1}`,
    title,
    criterion,
    guidance: "Avalie a prática real, sua consistência e a capacidade de demonstrá-la — não apenas a intenção ou a ferramenta adquirida.",
    evidence: evidence.split(" | "),
    recommendation,
    tier,
    weight,
  }));

const category = (
  id: string,
  code: string,
  name: string,
  description: string,
  seeds: ControlSeed[],
): FrameworkCategory => ({ id, code, name, description, controls: makeControls(code, seeds) });

export const framework = {
  id: "saf-v1",
  name: "Sabion Architecture Framework",
  shortName: "SAF",
  version: "1.0",
  description: "Framework proprietário para avaliar estratégia, desenho, segurança, entrega e operação de arquiteturas digitais.",
};

export const maturityLevels: Array<{ value: MaturityValue; label: string; short: string; description: string }> = [
  { value: 0, label: "Inexistente", short: "0", description: "Não existe prática ou controle reconhecível." },
  { value: 1, label: "Ad hoc", short: "1", description: "Acontece de forma reativa e depende de pessoas." },
  { value: 2, label: "Repetível", short: "2", description: "Existe um padrão, mas sua aplicação ainda varia." },
  { value: 3, label: "Definido", short: "3", description: "Está documentado, adotado e possui responsáveis." },
  { value: 4, label: "Gerenciado", short: "4", description: "É medido, revisado e controlado com indicadores." },
  { value: 5, label: "Otimizado", short: "5", description: "Evolui continuamente com automação e aprendizado." },
  { value: "na", label: "Não aplicável", short: "N/A", description: "Não faz parte do escopo ou contexto avaliado." },
];

export const confidenceLevels: Array<{ value: ConfidenceLevel; label: string; description: string; score: number }> = [
  { value: "declared", label: "Declarada", description: "Informada pelo respondente, sem documento associado.", score: 25 },
  { value: "documented", label: "Documentada", description: "Há política, desenho, procedimento ou registro.", score: 50 },
  { value: "evidenced", label: "Evidenciada", description: "Há artefato ou dado que demonstra a execução.", score: 75 },
  { value: "verified", label: "Verificada", description: "O avaliador confirmou a efetividade da prática.", score: 100 },
];

export const frameworkDomains: FrameworkDomain[] = [
  {
    id: "strategy", code: "D1", name: "Estratégia e governança", shortName: "Estratégia", color: "#7cf0bc",
    description: "Alinhamento com o negócio, decisões arquiteturais e gestão de riscos.",
    categories: [
      category("business-alignment", "D1.1", "Alinhamento ao negócio", "Resultados, princípios e evolução conectados à estratégia.", [
        ["d1-outcomes", "Resultados arquiteturais", "A arquitetura possui resultados de negócio e requisitos não funcionais mensuráveis?", "Mapa de objetivos | NFRs ou quality attributes", "Definir resultados, métricas e restrições que orientem as decisões.", "core", 3],
        ["d1-principles", "Princípios de arquitetura", "Princípios explícitos são usados para orientar e contestar decisões técnicas?", "Catálogo de princípios | Exemplos de aplicação", "Publicar poucos princípios testáveis e vinculá-los às decisões."],
        ["d1-roadmap", "Roadmap arquitetural", "Existe uma visão de evolução conectada às prioridades e dependências do negócio?", "Roadmap | Mapa de dependências", "Manter um roadmap trimestral com resultados, riscos e dependências."],
      ]),
      category("decision-governance", "D1.2", "Governança de decisões", "Responsabilidade, registro e revisão de escolhas relevantes.", [
        ["d1-ownership", "Responsabilidade decisória", "Papéis e alçadas para decisões de arquitetura estão claros?", "RACI | Termo do fórum de arquitetura", "Definir responsáveis, alçadas e caminho de escalonamento.", "core", 3],
        ["d1-adrs", "Registro de decisões", "Decisões relevantes registram contexto, alternativas e consequências?", "ADRs | Histórico de decisões", "Adotar ADRs versionados para decisões de maior impacto."],
        ["d1-review", "Revisão arquitetural", "Mudanças de maior risco passam por revisão proporcional e oportuna?", "Critérios de revisão | Atas ou aprovações", "Definir gatilhos e SLA para revisão sem criar gargalo."],
      ]),
      category("risk-compliance", "D1.3", "Risco e conformidade", "Obrigações e riscos técnicos incorporados à arquitetura.", [
        ["d1-risk", "Riscos arquiteturais", "Riscos técnicos possuem impacto, responsável, tratamento e prazo?", "Registro de riscos | Planos de tratamento", "Criar registro vivo de riscos arquiteturais e revisar mensalmente.", "core", 3],
        ["d1-obligations", "Obrigações aplicáveis", "Requisitos legais, regulatórios e contratuais foram traduzidos em requisitos técnicos?", "Matriz de obrigações | Controles mapeados", "Mapear obrigações aos sistemas, dados e controles responsáveis."],
        ["d1-exceptions", "Exceções e desvios", "Exceções arquiteturais têm justificativa, risco aceito e validade definida?", "Registro de exceções | Aprovação de risco", "Aplicar prazo, compensações e revisão às exceções."],
      ]),
    ],
  },
  {
    id: "organization", code: "D2", name: "Organização e processos", shortName: "Organização", color: "#f2b96d",
    description: "Modelo operacional, portfólio tecnológico, conhecimento e capacidades.",
    categories: [
      category("operating-model", "D2.1", "Modelo operacional", "Papéis, interfaces e capacidades para operar a arquitetura.", [
        ["d2-roles", "Papéis e responsabilidades", "Cada serviço e componente crítico possui responsáveis técnicos e de negócio?", "Catálogo de serviços | Matriz de ownership", "Atribuir ownership técnico e de negócio a todos os serviços críticos.", "core", 3],
        ["d2-team-topology", "Interfaces entre times", "Dependências e formas de colaboração entre times estão explícitas?", "Mapa de times | Acordos de interação", "Mapear dependências e reduzir handoffs recorrentes."],
        ["d2-capabilities", "Capacidades arquiteturais", "As competências necessárias são conhecidas e possuem plano de evolução?", "Matriz de competências | Plano de capacitação", "Manter matriz de competências e plano para lacunas críticas."],
      ]),
      category("portfolio", "D2.2", "Portfólio e ciclo de vida", "Inventário, criticidade, ciclo de vida e racionalização.", [
        ["d2-inventory", "Inventário tecnológico", "Aplicações, serviços, integrações e tecnologias possuem inventário confiável?", "Catálogo de aplicações | CMDB ou service catalog", "Consolidar inventário com owner, criticidade, dependências e ciclo de vida.", "core", 3],
        ["d2-lifecycle", "Ciclo de vida tecnológico", "Tecnologias possuem estados de adoção, suporte e descontinuação definidos?", "Technology radar | Política de lifecycle", "Definir ciclo de vida e datas de saída para tecnologias obsoletas."],
        ["d2-rationalization", "Racionalização", "Duplicidades, obsolescência e soluções sem owner são tratadas sistematicamente?", "Análise de portfólio | Plano de desativação", "Priorizar consolidação e desativação por custo, risco e valor."],
      ]),
      category("knowledge", "D2.3", "Conhecimento e continuidade", "Documentação, transferência de conhecimento e dependência de pessoas.", [
        ["d2-docs", "Documentação essencial", "Visões, dependências e procedimentos críticos estão atuais e acessíveis?", "Diagramas | Runbooks | Catálogo", "Definir documentação mínima e revisão vinculada a mudanças.", "core", 2],
        ["d2-bus-factor", "Dependência de especialistas", "Conhecimento crítico está distribuído para evitar dependência de uma única pessoa?", "Matriz de cobertura | Registros de shadowing", "Criar cobertura secundária e rotação para áreas críticas."],
        ["d2-learning", "Aprendizado organizacional", "Lições de entregas, incidentes e avaliações alteram padrões e práticas?", "Post-mortems | Atualizações de padrões", "Converter aprendizados recorrentes em padrões e automações."],
      ]),
    ],
  },
  {
    id: "applications", code: "D3", name: "Aplicações e integrações", shortName: "Aplicações", color: "#ff7e98",
    description: "Desenho de software, APIs, integrações, qualidade e dependências.",
    categories: [
      category("application-design", "D3.1", "Design de aplicações", "Limites, acoplamento, estado e evolução segura.", [
        ["d3-boundaries", "Limites de domínio", "Responsabilidades e limites entre componentes evitam sobreposição e acoplamento indevido?", "Diagramas C4 | Mapa de domínios", "Redefinir limites com ownership e contratos claros.", "core", 3],
        ["d3-coupling", "Acoplamento e dependências", "Dependências críticas são explícitas e possuem estratégia de isolamento?", "Mapa de dependências | Análise de acoplamento", "Reduzir dependências síncronas e estabelecer limites de falha."],
        ["d3-state", "Gestão de estado", "Estado, consistência e transações distribuídas seguem uma estratégia consciente?", "Modelo de dados | Fluxos transacionais", "Documentar consistência, idempotência e reconciliação."],
      ]),
      category("apis", "D3.2", "APIs e integrações", "Contratos, segurança, versionamento e resiliência.", [
        ["d3-api-security", "Autorização de APIs", "APIs autenticam e autorizam cada operação e objeto acessado?", "Políticas de API | Testes de autorização", "Padronizar autorização por operação e por objeto.", "core", 3],
        ["d3-contracts", "Contratos e versionamento", "Contratos possuem documentação, compatibilidade e política de versionamento?", "OpenAPI ou AsyncAPI | Política de versionamento", "Versionar contratos e testar compatibilidade no pipeline."],
        ["d3-integration-resilience", "Resiliência de integrações", "Integrações tratam timeout, retry, idempotência e indisponibilidade?", "Padrões de integração | Testes de falha", "Aplicar padrões de resiliência e filas de exceção."],
      ]),
      category("software-quality", "D3.3", "Qualidade de software", "Padrões, testes, dependências e manutenibilidade.", [
        ["d3-quality-gates", "Quality gates", "Critérios automatizados impedem a promoção de software abaixo do padrão aceito?", "Pipeline | Regras de qualidade", "Definir gates mínimos por criticidade e risco.", "core", 2],
        ["d3-dependencies", "Dependências de software", "Bibliotecas e componentes possuem inventário, atualização e tratamento de vulnerabilidades?", "SCA | SBOM | Política de atualização", "Automatizar inventário e atualização de dependências."],
        ["d3-testability", "Testabilidade", "A arquitetura permite testes rápidos, isolados e representativos dos fluxos críticos?", "Estratégia de testes | Métricas de flakiness", "Reduzir acoplamento e criar ambientes/test doubles confiáveis."],
      ]),
    ],
  },
  {
    id: "data", code: "D4", name: "Dados e inteligência artificial", shortName: "Dados e IA", color: "#b39bff",
    description: "Governança, qualidade, proteção, plataformas de dados e uso responsável de IA.",
    categories: [
      category("data-governance", "D4.1", "Governança e qualidade", "Ownership, catálogo, qualidade e linhagem.", [
        ["d4-inventory", "Inventário de dados", "Dados críticos possuem catálogo, classificação, owner e finalidade conhecidos?", "Data catalog | Inventário de dados", "Catalogar dados críticos com owner, finalidade e criticidade.", "core", 3],
        ["d4-quality", "Qualidade de dados", "Regras e indicadores detectam degradação da qualidade em dados críticos?", "Data quality rules | Dashboards", "Definir SLOs de qualidade e responsáveis por correção."],
        ["d4-lineage", "Linhagem", "Origem, transformações e consumidores de dados críticos podem ser rastreados?", "Data lineage | Mapa de pipelines", "Automatizar linhagem para dados regulados e decisões críticas."],
      ]),
      category("data-protection", "D4.2", "Proteção e privacidade", "Classificação, criptografia, retenção e direitos de titulares.", [
        ["d4-sensitive", "Dados sensíveis", "Dados pessoais e sensíveis são identificados ao longo de todo o fluxo?", "Mapa de dados | Scan de classificação", "Mapear dados sensíveis em bancos, filas, logs, backups e analytics.", "core", 3],
        ["d4-encryption", "Criptografia e chaves", "Dados críticos usam criptografia e gestão de chaves compatíveis com seu risco?", "Configuração KMS | Política de chaves", "Centralizar chaves, limitar acesso e estabelecer rotação."],
        ["d4-retention", "Retenção e descarte", "Retenção, anonimização e descarte são aplicados tecnicamente?", "Política de retenção | Jobs de descarte", "Automatizar retenção e demonstrar descarte quando exigido."],
      ]),
      category("data-platform-ai", "D4.3", "Plataformas e IA", "Arquitetura analítica, pipelines e governança de modelos.", [
        ["d4-platform", "Arquitetura de dados", "A plataforma separa ingestão, processamento, consumo e responsabilidades de forma sustentável?", "Arquitetura de dados | Padrões de consumo", "Definir camadas, contratos e ownership da plataforma.", "core", 2],
        ["d4-pipelines", "Confiabilidade de pipelines", "Pipelines possuem testes, observabilidade, reprocessamento e tratamento de falhas?", "Pipeline CI/CD | Alertas de dados", "Adicionar testes, idempotência e capacidade de reprocessamento."],
        ["d4-ai", "Governança de IA", "Modelos e serviços de IA possuem avaliação de risco, dados, desempenho e uso responsável?", "Model cards | Registro de modelos | Avaliação de risco", "Criar inventário de IA e controles proporcionais ao impacto."],
      ]),
    ],
  },
  {
    id: "platform", code: "D5", name: "Cloud e infraestrutura", shortName: "Cloud e infra", color: "#63c7ff",
    description: "Landing zones, redes, runtime, infraestrutura como código e configurações.",
    categories: [
      category("landing-zone", "D5.1", "Landing zone", "Estrutura de contas, ambientes, guardrails e isolamento.", [
        ["d5-isolation", "Isolamento de ambientes", "Produção e não produção possuem limites de identidade, rede e dados?", "Diagrama de ambientes | Políticas organizacionais", "Separar ambientes e reduzir caminhos de confiança cruzada.", "core", 3],
        ["d5-accounts", "Estrutura de contas", "Contas, subscriptions ou projetos seguem estrutura padronizada e escalável?", "Estrutura organizacional cloud | Padrão de provisionamento", "Padronizar hierarquia, naming, quotas e ownership."],
        ["d5-guardrails", "Guardrails preventivos", "Políticas bloqueiam configurações incompatíveis com segurança e governança?", "Policies as code | Relatório de violações", "Aplicar guardrails preventivos e exceções com validade."],
      ]),
      category("network-runtime", "D5.2", "Rede e runtime", "Segmentação, exposição, computação e plataformas de execução.", [
        ["d5-segmentation", "Segmentação de rede", "Fluxos entre zonas e serviços seguem menor privilégio e são observáveis?", "Diagramas de rede | Regras de firewall", "Mapear fluxos e remover permissões amplas ou não utilizadas.", "core", 3],
        ["d5-runtime", "Hardening de runtime", "Hosts, containers e clusters usam imagens, configurações e acesso endurecidos?", "Baselines | Scan de imagens | Configuração de cluster", "Automatizar baselines e bloquear imagens/configurações críticas."],
        ["d5-exposure", "Exposição de serviços", "Serviços públicos possuem proteção de borda, inventário e ownership?", "Inventário de endpoints | WAF/API gateway", "Centralizar exposição e monitorar superfície externa."],
      ]),
      category("iac-config", "D5.3", "IaC e configuração", "Provisionamento reproduzível, drift, segredos e configuração.", [
        ["d5-iac", "Infraestrutura como código", "Infraestrutura crítica é declarada, revisada e promovida por pipeline?", "Repositórios IaC | Pipeline de infraestrutura", "Migrar recursos críticos para IaC com revisão e testes.", "core", 3],
        ["d5-drift", "Detecção de drift", "Mudanças fora do pipeline e desvios de configuração são detectados?", "Relatório de drift | CSPM", "Detectar drift continuamente e restringir alterações manuais."],
        ["d5-config-secrets", "Configuração e segredos", "Configurações e segredos são separados do código, versionados e rotacionáveis?", "Secret manager | Política de configuração", "Centralizar segredos e eliminar credenciais estáticas."],
      ]),
    ],
  },
  {
    id: "security", code: "D6", name: "Segurança e identidade", shortName: "Segurança", color: "#ff9f6e",
    description: "Identidade, desenvolvimento seguro, vulnerabilidades, detecção e resposta.",
    categories: [
      category("identity-access", "D6.1", "Identidade e acesso", "Autenticação, privilégios e ciclo de vida de identidades.", [
        ["d6-mfa", "MFA privilegiado", "Todo acesso privilegiado exige MFA resistente a phishing?", "Políticas do IdP | Relatório de cobertura MFA", "Exigir FIDO2/WebAuthn para acessos privilegiados.", "core", 3],
        ["d6-least-privilege", "Menor privilégio", "Permissões humanas e técnicas são mínimas, temporárias e revisadas?", "Revisão de acessos | Papéis IAM", "Reduzir privilégios permanentes e adotar acesso just-in-time."],
        ["d6-lifecycle", "Ciclo de vida de identidades", "Criação, mudança e revogação de acessos são integradas ao ciclo de vida?", "Fluxos JML | Relatórios de contas órfãs", "Automatizar revogação e atribuir owner a contas técnicas."],
      ]),
      category("secure-sdlc", "D6.2", "Desenvolvimento seguro", "Ameaças, testes, vulnerabilidades e cadeia de suprimentos.", [
        ["d6-threat-model", "Modelagem de ameaças", "Fluxos críticos são analisados para abuso, fraude e falhas de segurança?", "Threat models | Backlog de mitigações", "Modelar ameaças nas mudanças de maior risco.", "core", 3],
        ["d6-testing", "Testes de segurança", "SAST, DAST, SCA e secret scanning cobrem os riscos relevantes?", "Pipelines de segurança | Relatórios de cobertura", "Aplicar testes por risco e bloquear achados críticos."],
        ["d6-supply-chain", "Cadeia de suprimentos", "Origem, integridade e vulnerabilidades de componentes e artefatos são controladas?", "SBOM | Assinatura de artefatos | Provenance", "Gerar SBOM e verificar integridade no deploy."],
      ]),
      category("detection-response", "D6.3", "Detecção e resposta", "Telemetria de segurança, playbooks e exposição.", [
        ["d6-security-logs", "Logs de segurança", "Eventos críticos de identidade, dados, cloud e aplicações chegam a uma visão central?", "Fontes do SIEM | Matriz de cobertura", "Priorizar fontes críticas e validar casos de detecção.", "core", 3],
        ["d6-playbooks", "Resposta a incidentes", "Cenários prioritários possuem playbooks exercitados e responsáveis disponíveis?", "Playbooks | Relatórios de tabletop", "Exercitar cenários críticos e atualizar contatos e decisões."],
        ["d6-attack-surface", "Superfície de ataque", "Ativos expostos e vulnerabilidades críticas são descobertos e tratados continuamente?", "ASM | Vulnerability management | SLA", "Unificar inventário, criticidade e SLA de remediação."],
      ]),
    ],
  },
  {
    id: "reliability", code: "D7", name: "Resiliência e operações", shortName: "Resiliência", color: "#f4d35e",
    description: "Confiabilidade, observabilidade, continuidade, incidentes e operação diária.",
    categories: [
      category("reliability", "D7.1", "Confiabilidade", "SLOs, isolamento de falhas e recuperação arquitetural.", [
        ["d7-slo", "Objetivos de serviço", "Jornadas críticas possuem SLIs, SLOs e impacto de indisponibilidade definidos?", "Catálogo de SLOs | Error budget", "Definir SLOs ligados à experiência e usá-los nas prioridades.", "core", 3],
        ["d7-failure", "Contenção de falhas", "Timeout, retry, circuit breaker e isolamento evitam falhas em cascata?", "Padrões de resiliência | Testes de falha", "Aplicar padrões de contenção nas dependências críticas."],
        ["d7-dr", "Arquitetura de recuperação", "RTO, RPO, dependências e estratégia de recuperação são coerentes e testados?", "Plano de DR | Testes de recuperação", "Validar recuperação ponta a ponta contra RTO e RPO."],
      ]),
      category("observability", "D7.2", "Observabilidade", "Sinais, alertas e entendimento das dependências.", [
        ["d7-telemetry", "Telemetria das jornadas", "Logs, métricas e traces explicam a saúde das jornadas críticas?", "Dashboards | Instrumentação | Traces", "Instrumentar jornadas, não apenas componentes isolados.", "core", 3],
        ["d7-alerts", "Alertas acionáveis", "Alertas representam impacto, têm responsável e oferecem contexto para agir?", "Catálogo de alertas | Métricas de ruído", "Eliminar ruído e vincular alertas a runbooks e impacto."],
        ["d7-service-map", "Mapa de serviços", "Dependências e fluxo de requisições podem ser visualizados durante incidentes?", "Service map | Distributed tracing", "Manter mapa de dependências derivado da telemetria."],
      ]),
      category("operations", "D7.3", "Operações e continuidade", "Backups, incidentes, runbooks e prontidão operacional.", [
        ["d7-backup", "Restauração de backups", "Backups críticos são imutáveis, monitorados e restaurados periodicamente?", "Relatórios de backup | Evidência de restore", "Executar restore real e registrar tempo, integridade e falhas.", "core", 3],
        ["d7-learning", "Aprendizado com incidentes", "Incidentes relevantes geram análise sem culpa e ações concluídas?", "Post-mortems | Backlog de ações", "Acompanhar ações sistêmicas até comprovar sua efetividade."],
        ["d7-runbooks", "Prontidão operacional", "Runbooks, on-call e escalonamento cobrem serviços e cenários críticos?", "Escala on-call | Runbooks | Testes operacionais", "Definir cobertura, escalonamento e exercícios de prontidão."],
      ]),
    ],
  },
  {
    id: "delivery", code: "D8", name: "Entrega e evolução", shortName: "Entrega", color: "#54d6d6",
    description: "CI/CD, qualidade de mudanças, capacidade, custos e dívida técnica.",
    categories: [
      category("cicd", "D8.1", "CI/CD e artefatos", "Automação, integridade e estratégias de publicação.", [
        ["d8-pipeline", "Pipeline reproduzível", "Build, testes e publicação são automatizados e produzem artefatos imutáveis?", "Pipeline CI/CD | Registro de artefatos", "Promover o mesmo artefato testado entre ambientes.", "core", 3],
        ["d8-integrity", "Integridade de artefatos", "Artefatos possuem origem, assinatura e controle de acesso verificáveis?", "Assinatura | Provenance | Registry policies", "Assinar artefatos e verificar origem antes do deploy."],
        ["d8-deployment", "Estratégia de deployment", "Deploy progressivo reduz impacto e permite interromper mudanças problemáticas?", "Canary ou blue-green | Feature flags", "Adotar rollout progressivo para serviços críticos."],
      ]),
      category("change-testing", "D8.2", "Mudança e testes", "Rollback, estratégia de testes e risco de mudanças.", [
        ["d8-rollback", "Reversão segura", "Aplicação, configuração e banco podem ser revertidos ou avançados com segurança?", "Runbook de rollback | Testes de migração", "Definir estratégia de rollback e compatibilidade de dados.", "core", 3],
        ["d8-test-strategy", "Estratégia de testes", "Testes cobrem riscos nas camadas certas e entregam feedback rápido?", "Pirâmide de testes | Métricas de pipeline", "Alinhar testes ao risco e reduzir suítes lentas ou frágeis."],
        ["d8-change-risk", "Risco de mudança", "Mudanças são classificadas por risco para ajustar revisão, testes e aprovação?", "Política de mudança | Change failure rate", "Automatizar mudanças padrão e reforçar as de alto risco."],
      ]),
      category("evolution", "D8.3", "Sustentabilidade e evolução", "Custos, capacidade, dívida técnica e modernização.", [
        ["d8-cost", "Visibilidade de custos", "Custos de cloud, licenças e operação são atribuídos e usados em decisões?", "FinOps dashboard | Tags e budgets", "Alocar custos por produto e criar alertas e budgets.", "core", 2],
        ["d8-debt", "Dívida técnica", "Dívida possui impacto, owner e espaço explícito no planejamento?", "Registro de dívida | Roadmap de redução", "Priorizar dívida por risco, custo de mudança e impacto operacional."],
        ["d8-capacity", "Capacidade e eficiência", "Limites, picos e eficiência de recursos são conhecidos e revisados?", "Testes de carga | Capacity plan | Utilização", "Testar limites e ajustar capacidade com base em demanda real."],
      ]),
    ],
  },
];

export const allFrameworkControls = frameworkDomains.flatMap((domain) =>
  domain.categories.flatMap((categoryItem) =>
    categoryItem.controls.map((control) => ({ ...control, domain, category: categoryItem })),
  ),
);

export const coreControls = allFrameworkControls.filter((control) => control.tier === "core");
