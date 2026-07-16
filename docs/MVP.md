# MVP — Architecture Health Check

## Objetivo

Permitir que uma pessoa avalie uma arquitetura e termine a sessão entendendo os principais riscos e próximos passos.

## Fluxo essencial

1. Acessar a página inicial.
2. Selecionar **Avaliar uma arquitetura**.
3. Informar nome, tipo, estágio e objetivo.
4. Responder ao questionário guiado.
5. Receber o resultado.
6. Explorar recomendações.
7. Criar conta para salvar ou compartilhar.

## Contexto mínimo da arquitetura

- Nome
- Tipo
- Estágio: ideia, construção, produção ou evolução
- Exposição: interna, parceiros ou pública
- Sensibilidade dos dados
- Tamanho aproximado da equipe
- Uso de cloud, ambiente próprio ou híbrido

Essas respostas determinam quais perguntas serão exibidas e como recomendações serão priorizadas.

## Avaliação

- 30 a 40 perguntas
- 8 dimensões
- Duração estimada entre 10 e 15 minutos
- Opções de resposta objetivas
- Ajuda contextual para termos técnicos
- Alternativa “não sei”
- Salvamento local automático antes do cadastro

## Resultado

- Nota geral
- Nível de maturidade
- Radar por dimensão
- Pontos fortes
- Riscos críticos
- Melhorias rápidas
- Melhorias estruturais
- Próximo passo recomendado

Cada recomendação deve conter:

- problema observado;
- impacto possível;
- ação sugerida;
- prioridade;
- esforço aproximado;
- dimensão relacionada;
- respostas que contribuíram para a recomendação.

## Conta e persistência

Sem cadastro:

- iniciar e concluir avaliação;
- manter rascunho no navegador;
- visualizar resultado inicial.

Com cadastro:

- salvar arquiteturas;
- manter histórico;
- retomar em outro dispositivo;
- criar link compartilhável;
- acompanhar plano de melhorias.

## Entidades conceituais

- User
- Architecture
- Assessment
- Question
- Answer
- Dimension
- Finding
- Recommendation
- ImprovementItem
- ShareLink

## Reutilização do Cyber Architecture

Avaliar para reaproveitamento:

- identidade visual e componentes básicos;
- conteúdo dos frameworks;
- estrutura de perguntas;
- motor de scoring e maturidade;
- gráficos;
- recomendações;
- plano de ação;
- testes dos cálculos.

Não transportar diretamente:

- organizações e multi-tenant B2B;
- clientes e projetos de consultoria;
- billing e Stripe;
- tickets de suporte;
- API keys e webhooks;
- Redis e sessões próprias;
- MinIO e infraestrutura Docker de produção.

## Critérios de conclusão do MVP

- Uma pessoa conclui a avaliação sem orientação externa.
- O resultado explica claramente pelo menos três riscos.
- Recomendações têm justificativa rastreável.
- O fluxo funciona em celular e desktop.
- O usuário pode salvar e revisitar o resultado.
- Nenhum segredo ou dado sensível é exigido para avaliar a arquitetura.

