# [002]-feat-adicionar-seletor-calendario-data

**Agent Responsável:** dev  
**Status:** 🆕 Nova  
**Branch:** 002-feat-adicionar-seletor-calendario-data  
**Worktree:** `.kiro/worktrees/002-feat-adicionar-seletor-calendario-data/`

---

## 🔄 Modelo de Trabalho: Git Worktrees

Este projeto utiliza **Git Worktrees** para isolamento completo entre tasks paralelas.

### O que você precisa saber:
- ✅ Cada task trabalha em seu próprio worktree isolado
- ✅ Worktrees ficam em `.kiro/worktrees/[nome-da-task]/`
- ✅ Zero conflito com outras tasks em andamento
- ✅ Branch criado automaticamente derivado de `ia-main`

---

## 🚀 Como Iniciar Esta Task

### Pré-requisitos
1. Verificar se está no branch `ia-main`:
   ```bash
   git branch --show-current
   ```
   - Se não estiver, pergunte ao PO se pode retornar para `ia-main`

### Setup do Worktree
2. Criar o worktree isolado:
   ```bash
   cd /home/renanaws/formacaoaws/bia-multi-agentic/bia
   git worktree add .kiro/worktrees/002-feat-adicionar-seletor-calendario-data -b 002-feat-adicionar-seletor-calendario-data
   ```

3. Mover esta task para `doing/`:
   ```bash
   # Ainda no ia-main
   git mv .kiro/tasks/002-feat-adicionar-seletor-calendario-data.md .kiro/tasks/doing/
   git commit -m "chore: move task 002-feat-adicionar-seletor-calendario-data to doing"
   git push origin ia-main
   ```

4. Entrar no worktree e começar a trabalhar:
   ```bash
   cd .kiro/worktrees/002-feat-adicionar-seletor-calendario-data
   ```

### ⚠️ Importante
- **TODO o trabalho** deve ser feito dentro do worktree
- **NÃO tente** fazer checkout de outras branches dentro do worktree
- **NÃO edite** arquivos fora do worktree

---

## 📋 Descrição da Task

### Contexto
Na tela HOME da aplicação BIA, o campo de data/prazo atualmente é um input de texto simples. Esta task visa melhorar a experiência do usuário substituindo este campo por um seletor de calendário visual.

### Objetivo
Implementar um seletor de calendário (date picker) no componente `AddTask` para facilitar a escolha de datas pelos usuários.

### Requisitos Técnicos

#### 1. Escolha da Biblioteca
Recomenda-se usar **react-datepicker** por ser:
- Leve e simples
- Bem documentada
- Compatível com React 18
- Suporta localização pt-BR
- Fácil de estilizar

**Instalação:**
```bash
npm install react-datepicker --save
```

#### 2. Formato de Data
⚠️ **ATENÇÃO CRÍTICA:** O banco de dados armazena datas como **STRING**

- **Formato esperado no banco:** String no padrão brasileiro `DD/MM/YYYY`
- **Exemplo:** "30/09/2026"
- **Conversão necessária:** Date object → String em formato pt-BR
- **Método de conversão:** `toLocaleDateString('pt-BR')`

#### 3. Modificações no Componente AddTask

**Arquivo:** `client/src/components/AddTask.jsx`

**Alterações necessárias:**
- Importar o `react-datepicker` e seu CSS
- Mudar o estado `dia` de string para Date object
- Substituir o input de texto por `<DatePicker />`
- Converter a data para string pt-BR antes de enviar ao backend
- Manter compatibilidade com o formato atual do banco

**Estado atual do campo:**
```jsx
<input
  type="text"
  placeholder="Quando?"
  value={dia}
  onChange={(e) => setDia(e.target.value)}
/>
```

**Deve ser substituído por algo similar a:**
```jsx
<DatePicker
  selected={dia}
  onChange={(date) => setDia(date)}
  dateFormat="dd/MM/yyyy"
  locale="pt-BR"
  placeholderText="Quando?"
/>
```

#### 4. Conversão no onSubmit
No método `onSubmit`, garantir que a data seja convertida para string:
```javascript
dia_atividade: dia ? dia.toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR')
```

#### 5. Estilização
- Manter consistência com o design atual da aplicação
- O date picker deve se integrar visualmente ao formulário
- Adicionar CSS customizado se necessário

### Critérios de Aceitação

✅ **CA1:** O campo de data foi substituído por um seletor de calendário visual

✅ **CA2:** O calendário está localizado em português brasileiro (pt-BR)

✅ **CA3:** O formato de data exibido é DD/MM/YYYY

✅ **CA4:** Ao selecionar uma data no calendário, ela é corretamente convertida para string no formato pt-BR

✅ **CA5:** A data é persistida no banco como string no formato DD/MM/YYYY

✅ **CA6:** Se nenhuma data for selecionada, o sistema usa a data atual no formato correto

✅ **CA7:** O visual do date picker está consistente com o design da aplicação

✅ **CA8:** A funcionalidade de adicionar tarefas continua funcionando corretamente

✅ **CA9:** Não há erros no console do navegador

✅ **CA10:** O componente funciona em diferentes navegadores (Chrome, Firefox, Safari)

### Testes Manuais a Realizar

1. **Teste de Seleção de Data:**
   - Abrir o calendário
   - Selecionar uma data
   - Adicionar a tarefa
   - Verificar no banco se a data está no formato correto (string DD/MM/YYYY)

2. **Teste de Data Vazia:**
   - Não selecionar nenhuma data
   - Adicionar a tarefa
   - Verificar se usa a data atual corretamente

3. **Teste de Edição:**
   - Selecionar uma data
   - Mudar para outra data
   - Verificar se a atualização funciona

4. **Teste Visual:**
   - Verificar se o calendário abre corretamente
   - Confirmar que está em português
   - Validar que o estilo está adequado

### Documentação Necessária
- Comentários no código explicando a conversão de Date para string
- Nota sobre o formato de armazenamento no banco de dados

### Observações Importantes
- ⚠️ **Não alterar** a estrutura do banco de dados
- ⚠️ **Não modificar** outros componentes além do AddTask
- ⚠️ **Manter** a funcionalidade existente intacta
- ✅ **Garantir** compatibilidade com dados já existentes no banco

---

## ✅ Como Finalizar Esta Task

Quando completar todos os critérios de aceitação:

1. **Commit final:**
   ```bash
   git add .
   git commit -m "feat: adiciona seletor de calendário no campo de data"
   ```

2. **Push do branch:**
   ```bash
   git push -u origin 002-feat-adicionar-seletor-calendario-data
   ```

3. **Criar Pull Request:**
   ```bash
   gh pr create --base ia-main --title "[002]-feat-adicionar-seletor-calendario-data" --body "
   ## Resumo
   - Substituído input de texto por seletor de calendário (react-datepicker)
   - Implementada conversão de Date para string no formato pt-BR
   - Mantida compatibilidade com armazenamento em string no banco de dados
   
   ## Testes Realizados
   - Teste de seleção de data via calendário
   - Teste de data vazia (usa data atual)
   - Teste de formato de persistência no banco
   - Teste visual em diferentes navegadores
   - Validação de localização pt-BR
   
   ## Observações
   - A data continua sendo armazenada como string no formato DD/MM/YYYY
   - O componente mantém total compatibilidade com os dados existentes
   - CSS do date picker importado e integrado ao design atual
   "
   ```

4. **Notificar o PO:** Informar que o PR está pronto para revisão

5. **Mover task para done:**
   ```bash
   cd /home/renanaws/formacaoaws/bia-multi-agentic/bia
   git checkout ia-main
   git pull origin ia-main
   git mv .kiro/tasks/doing/002-feat-adicionar-seletor-calendario-data.md .kiro/tasks/done/
   git commit -m "chore: move task 002-feat-adicionar-seletor-calendario-data to done"
   git push origin ia-main
   ```

⚠️ **NÃO faça merge do PR!** Apenas o PO pode revisar e aprovar.
⚠️ **NÃO remova o worktree!** Ele será removido apenas após o PO confirmar o merge.
