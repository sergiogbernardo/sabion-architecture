# Sabion Architecture

Avalie, entenda e melhore arquiteturas de tecnologia.

O Sabion Architecture será uma aplicação orientada a pessoas que desejam analisar uma arquitetura sem depender de uma consultoria ou dominar previamente frameworks complexos. O produto transforma uma avaliação guiada em uma visão clara de maturidade, riscos e próximos passos.

## Visão

Uma pessoa deve conseguir:

1. descrever sua arquitetura;
2. responder perguntas contextualizadas;
3. compreender seus pontos fortes e riscos;
4. receber recomendações priorizadas;
5. acompanhar a evolução da arquitetura.

O framework trabalha nos bastidores. Na interface, o usuário encontra perguntas e recomendações em linguagem clara.

## Público inicial

- Arquitetos de software e soluções
- Desenvolvedores e tech leads
- Profissionais de segurança
- Fundadores e equipes técnicas pequenas
- Estudantes e pessoas aprendendo arquitetura

## Primeira experiência

O primeiro produto será o **Architecture Health Check**, uma avaliação curta e útil para arquiteturas como:

- Aplicação web
- API ou backend
- SaaS
- Arquitetura cloud
- Aplicação mobile com backend
- Plataforma de dados
- Arquitetura genérica

O resultado deverá apresentar nota geral, maturidade por dimensão, pontos fortes, riscos prioritários e um plano de melhorias.

## Princípios

- Valor antes do cadastro
- Linguagem clara antes do jargão
- Recomendações explicáveis, não apenas uma nota
- Avaliação adaptada ao contexto da arquitetura
- Privacidade por padrão
- Evolução mensurável ao longo do tempo
- Sem foco comercial no MVP

## Arquitetura planejada

- Frontend: React + Vite
- Hospedagem: GitHub Pages
- Backend: Nhost Auth, PostgreSQL, Hasura GraphQL e Storage
- Funções: apenas para cálculos ou integrações que não pertençam ao cliente ou ao GraphQL

## Origem

Este produto nasce a partir dos aprendizados e do motor de avaliação do projeto Cyber Architecture. O código anterior será usado como fonte seletiva de componentes, conteúdo, cálculos e visualizações, sem transportar automaticamente sua estrutura B2B.

## Estado

Em descoberta e definição do MVP.

Consulte:

- [Visão do produto](docs/PRODUCT_VISION.md)
- [Escopo do MVP](docs/MVP.md)
- [Arquitetura técnica inicial](docs/ARCHITECTURE.md)

