# Arquitetura técnica inicial

## Visão

```text
GitHub Pages
└── React + Vite
    ├── avaliação anônima local
    ├── autenticação Nhost
    └── GraphQL e Storage

Nhost
├── Auth
├── PostgreSQL
├── Hasura GraphQL
├── Storage
└── Functions pequenas e específicas
```

## Decisões iniciais

### GitHub Pages

O frontend será uma SPA estática. O projeto deverá considerar que o GitHub Pages publica em um caminho de repositório, salvo quando houver domínio próprio. Assets, rotas e `base` do Vite precisam funcionar nos dois cenários.

### Nhost Auth

O produto utilizará autenticação e tokens do Nhost. Não será transportado o modelo atual de sessão em cookie assinado com Redis.

### PostgreSQL e Hasura

Operações comuns serão atendidas via GraphQL e permissões por usuário. Lógica de autorização deverá ficar explícita nas permissões do Hasura e ser testada.

### Nhost Storage

O Storage será reservado a anexos realmente necessários. O Architecture Health Check não exigirá upload de diagramas ou evidências no primeiro fluxo.

### Functions

Functions serão usadas somente quando houver necessidade real de lógica confiável no servidor, como:

- cálculo protegido;
- geração de link compartilhável;
- integração externa;
- exportação pequena;
- processamento que não possa ocorrer no navegador.

O plano gratuito possui limites de quantidade, tempo e payload. Processamentos pesados não entram no MVP.

## Estratégia de migração

1. Criar a experiência B2C sem dependência do backend antigo.
2. Migrar o conteúdo do primeiro questionário.
3. Extrair o motor de scoring como módulo independente e testável.
4. Modelar o schema mínimo no Nhost.
5. Integrar autenticação e persistência.
6. Adicionar compartilhamento somente leitura.
7. Importar componentes visuais úteis de forma seletiva.

## Segurança e privacidade

- Não solicitar segredos, credenciais ou código-fonte.
- Explicar quais informações serão armazenadas.
- Manter avaliações anônimas apenas no navegador.
- Aplicar autorização por linha no Hasura.
- Não expor o admin secret do Nhost no frontend.
- Evitar funções administrativas chamadas diretamente pelo cliente.
- Registrar mudanças relevantes sem criar uma estrutura de auditoria excessiva no MVP.

## Questões em aberto

- Domínio próprio ou caminho padrão do GitHub Pages?
- Avaliação anônima pode gerar resultado completo ou resumido?
- O scoring será executado no navegador ou em Function?
- Links públicos terão validade ou poderão ser revogados?
- Diagramas entrarão como imagem, modelo estruturado ou ficarão para uma fase posterior?

