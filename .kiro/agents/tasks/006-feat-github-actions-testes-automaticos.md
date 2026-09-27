# Task 006 - GitHub Actions para Testes Automatizados

## Informações da Task
- **Número:** 006
- **Tipo:** feat
- **Branch:** 006-feat-github-actions-testes-automaticos
- **Branch Base:** ia-main
- **Agent Responsável:** devops

## Descrição
Implementar GitHub Actions para executar automaticamente os testes unitários (Jest) em cada Pull Request criado contra o branch `ia-main`, garantindo qualidade do código antes do merge.

## Contexto Técnico
O projeto BIA já possui testes unitários configurados com Jest:
- Testes localizados em `tests/unit/controllers/`
- Framework: Jest 27.5.1
- Comando de execução: `npm test` (executa `jest tests/unit`)
- Testes cobrem controllers de versão e tarefas com mocks adequados

## Objetivo
Criar workflow do GitHub Actions que:
1. Seja acionado automaticamente em PRs contra `ia-main`
2. Execute os testes unitários existentes
3. Bloqueie o merge caso os testes falhem
4. Forneça feedback visual do status dos testes no PR

## Critérios de Aceitação
- [ ] Criar pasta `.github/workflows/` na raiz do projeto
- [ ] Criar arquivo `tests.yml` com workflow do GitHub Actions
- [ ] Workflow deve ser acionado em pull requests para `ia-main`
- [ ] Workflow deve executar `npm install` para instalar dependências
- [ ] Workflow deve executar `npm test` para rodar os testes
- [ ] Workflow deve falhar se algum teste não passar
- [ ] Adicionar badge de status no README.md (opcional mas recomendado)
- [ ] Testar o workflow criando um PR de teste

## Definição de Pronto
- [ ] Arquivo `.github/workflows/tests.yml` criado
- [ ] Workflow configurado corretamente com Node.js (verificar versão no package.json)
- [ ] Workflow testado com PR de exemplo
- [ ] Commit realizado no branch da feature
- [ ] Push para repositório remoto
- [ ] PR criado para ia-main com título: `[006]-feat-github-actions-testes-automaticos`

## Especificações Técnicas do Workflow

### Trigger
```yaml
on:
  pull_request:
    branches:
      - ia-main
```

### Jobs Necessários
1. **test**: Executar testes unitários
   - Node.js: verificar versão compatível (atual projeto usa dependências compatíveis com Node 14+)
   - Steps:
     - Checkout do código
     - Setup do Node.js
     - Instalação de dependências (`npm ci` ou `npm install`)
     - Execução dos testes (`npm test`)

### Ambiente
- **Runner:** ubuntu-latest
- **Node.js:** Verificar package.json para versão adequada (usar matrix se necessário)

## Observações Técnicas
- Usar `npm ci` ao invés de `npm install` para instalações mais rápidas e determinísticas
- Considerar cache de node_modules para otimizar tempo de execução
- O workflow deve ser simples e direto, mantendo a filosofia de simplicidade do projeto
- Não incluir configurações avançadas como cobertura de código, linting ou outros checks nesta primeira versão

## Benefícios
- ✅ Garantia de qualidade antes do merge
- ✅ Feedback automático para desenvolvedores
- ✅ Prevenção de bugs em ia-main
- ✅ Cultura de testes fortalecida
- ✅ Histórico visual de status dos testes

## Instruções para o Agent (devops)
1. Verificar se está no branch ia-main
2. Caso não esteja, solicitar autorização para retornar
3. Mover task para doing
4. Fazer commit e push no ia-main
5. Criar branch 006-feat-github-actions-testes-automaticos
6. Implementar o workflow seguindo as especificações
7. Testar localmente se possível (usando act ou similar)
8. Fazer commit das alterações
9. Fazer push do branch
10. Criar PR para ia-main
11. Aguardar execução do workflow no próprio PR (validação real)
12. Informar ao PO sobre conclusão

## Estrutura de Arquivos a Criar
```
.github/
└── workflows/
    └── tests.yml
```

## Exemplo de Mensagem de Commit
```
feat: adiciona GitHub Actions para testes automatizados em PRs

- Cria workflow tests.yml
- Configura trigger para PRs em ia-main
- Executa npm test automaticamente
- Bloqueia merge se testes falharem

Task: #006
```

## Referências
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions for Node.js](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)
- [Jest Testing Framework](https://jestjs.io/)

## Status: 📋 AGUARDANDO INÍCIO