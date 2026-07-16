# Visão do produto

## Problema

Avaliar uma arquitetura costuma exigir conhecimento especializado, frameworks extensos ou contratação de consultoria. Mesmo quando uma avaliação existe, o resultado frequentemente é uma pontuação difícil de interpretar e sem orientação prática.

O Sabion Architecture deve diminuir essa barreira.

## Proposta

> Descreva sua arquitetura, responda a uma avaliação guiada e receba uma análise clara de riscos, maturidade e próximos passos.

## Mudança de perspectiva

O produto de origem foi desenhado para uma operação B2B:

```text
Consultoria
└── Organização
    └── Clientes
        └── Projetos
            └── Avaliações
```

O Sabion Architecture será centrado no usuário:

```text
Pessoa
└── Minhas arquiteturas
    ├── Avaliações
    ├── Resultados
    ├── Recomendações
    └── Evolução
```

## Trabalho principal do usuário

Quando alguém estiver planejando, construindo ou revisando uma arquitetura, queremos ajudá-la a:

- perceber lacunas importantes;
- organizar riscos dispersos;
- entender o que merece atenção primeiro;
- explicar decisões para outras pessoas;
- comparar a arquitetura antes e depois das melhorias.

## Jornada proposta

1. A pessoa inicia uma avaliação sem precisar criar conta.
2. Informa o tipo, o estágio e o objetivo da arquitetura.
3. Responde perguntas adaptadas ao contexto.
4. Pode pausar e continuar no mesmo dispositivo.
5. Recebe um resultado inicial imediatamente.
6. Cria uma conta somente para salvar, compartilhar ou acompanhar a evolução.
7. Converte recomendações em um plano de melhorias.
8. Repete a avaliação no futuro e compara os resultados.

## Dimensões iniciais

- Segurança
- Identidade e acessos
- Dados e privacidade
- Disponibilidade e resiliência
- Escalabilidade e desempenho
- Observabilidade
- Integrações e APIs
- Operação e manutenção

As dimensões são apresentadas ao usuário. Frameworks como SAB e SABSA podem sustentar perguntas e cálculos internamente.

## Resultado útil

O resultado não deve terminar em uma nota. Ele precisa responder:

- O que está funcionando bem?
- Onde estão os riscos mais importantes?
- Por que esses riscos importam?
- O que pode ser melhorado rapidamente?
- O que exige uma mudança estrutural?
- Qual é a ordem recomendada?

## Hipóteses a validar

1. Pessoas começarão uma avaliação antes de criar conta.
2. Uma avaliação de 10 a 15 minutos oferece valor suficiente.
3. Linguagem simples aumenta a conclusão sem reduzir a credibilidade.
4. Recomendações priorizadas são mais valiosas que relatórios longos.
5. Histórico e comparação justificam o retorno ao produto.
6. Compartilhamento somente leitura ajuda discussões técnicas.

## Fora de foco inicialmente

- Venda de planos
- Gestão de clientes de consultoria
- White-label
- Marketplace de ferramentas
- Gestão completa de times
- Relatórios executivos complexos
- Monitoramento contínuo de vulnerabilidades
- OSINT automatizado

## Métrica norteadora inicial

**Avaliações concluídas com pelo menos uma recomendação marcada como útil ou adicionada ao plano de melhorias.**

