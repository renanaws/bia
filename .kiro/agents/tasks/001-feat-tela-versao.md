# [001] Implementar Tela de Versão

## Tipo
`feat`

## Descrição
Criar uma página dedicada para exibir as informações da rota `/api/versao`, seguindo o mesmo padrão visual e estrutural da tela de tarefas (`Tasks.jsx` / `Task.jsx`).

## Contexto
A API já possui o endpoint `/api/versao` que retorna a versão atual da aplicação (ex: `Bia 4.3.0`). Atualmente essa informação é exibida apenas como tooltip no componente `VersionInfo.jsx` (acessível via botão no cabeçalho). A ideia é criar uma tela dedicada que exiba essa informação de forma mais completa, acessível via rota no frontend.

## Critérios de Aceite

- [ ] Criar o componente `Versao.jsx` em `client/src/components/` seguindo o mesmo padrão de `Tasks.jsx`
- [ ] O componente deve consumir a rota `/api/versao` e exibir as informações retornadas
- [ ] Deve exibir o status da API (online/offline/verificando) de forma visual, como os badges de cache/database da tela de tarefas
- [ ] Adicionar a rota `/versao` no `App.jsx` (em `client/src/App.jsx`), mapeando para o novo componente
- [ ] Adicionar link de navegação para `/versao` no componente `Header.jsx`
- [ ] O layout deve seguir o mesmo padrão visual da tela de tarefas: container, cards, badges de status
- [ ] Exibir no mínimo as seguintes informações:
  - Versão da aplicação (retorno do endpoint)
  - Status da API (online / offline / verificando)
  - Ambiente detectado (local, IP direto, ALB, produção)
  - URL da API configurada
  - Configuração do cache (se disponível via `/api/cache-config`)

## Arquivos a Criar/Modificar

| Ação | Arquivo |
|------|---------|
| Criar | `client/src/components/Versao.jsx` |
| Modificar | `client/src/App.jsx` — adicionar rota `/versao` e importar componente |
| Modificar | `client/src/components/Header.jsx` — adicionar link de navegação |

## Referências Técnicas

- Padrão visual: `client/src/components/Tasks.jsx` e `client/src/components/Task.jsx`
- Lógica de consumo da API de versão: `client/src/components/VersionInfo.jsx`
- Rota backend: `api/routes/versao.js` → `api/controllers/versao.js`
- Endpoint: `GET /api/versao` — retorna string `"Bia X.X.X"`
- Endpoint auxiliar: `GET /api/cache-config` — retorna configuração do cache

## Notas de Implementação

- Reutilizar a função `getApiUrl()` já presente em `VersionInfo.jsx` ou mover para um utilitário compartilhado
- Usar `react-icons/fa` para ícones, mantendo consistência com os demais componentes
- Não duplicar a lógica já existente em `VersionInfo.jsx`; o novo componente é uma tela completa, não um tooltip
- Garantir que o componente funcione tanto em desenvolvimento (`localhost:8080`) quanto em produção
