# [003]-feat-dashboard-grafico-tarefas-prioridade

**Agent Responsável:** dev  
**Status:** 🆕 Nova  
**Branch:** 003-feat-dashboard-grafico-tarefas-prioridade  
**Worktree:** `.kiro/worktrees/003-feat-dashboard-grafico-tarefas-prioridade/`

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
   git worktree add .kiro/worktrees/003-feat-dashboard-grafico-tarefas-prioridade -b 003-feat-dashboard-grafico-tarefas-prioridade
   ```

3. Mover esta task para `doing/`:
   ```bash
   # Ainda no ia-main
   git mv .kiro/tasks/003-feat-dashboard-grafico-tarefas-prioridade.md .kiro/tasks/doing/
   git commit -m "chore: move task 003-feat-dashboard-grafico-tarefas-prioridade to doing"
   git push origin ia-main
   ```

4. Entrar no worktree e começar a trabalhar:
   ```bash
   cd .kiro/worktrees/003-feat-dashboard-grafico-tarefas-prioridade
   ```

### ⚠️ Importante
- **TODO o trabalho** deve ser feito dentro do worktree
- **NÃO tente** fazer checkout de outras branches dentro do worktree
- **NÃO edite** arquivos fora do worktree

---

## 📋 Descrição da Task

### Contexto
A aplicação BIA precisa de uma tela de dashboard que apresente visualmente a distribuição das tarefas por prioridade, facilitando a análise e gestão das atividades.

### Objetivo
Criar uma nova rota `/dashboard` com um gráfico visual que agrupe e exiba o número de tarefas organizadas por prioridade (importante vs. não importante).

### Requisitos Técnicos

#### 1. Configuração do shadcn/ui

**Instalação inicial:**
```bash
cd client
npx shadcn@latest init
```

**Configurações recomendadas durante o init:**
- Style: **Default**
- Base color: **Slate** (ou conforme o tema atual)
- CSS variables: **Yes**
- TypeScript: **No** (projeto usa JavaScript)

**Instalar componente de Card (para estrutura do dashboard):**
```bash
npx shadcn@latest add card
```

#### 2. Biblioteca de Gráficos

**Instalar Recharts** (biblioteca leve e React-friendly):
```bash
npm install recharts
```

**Por que Recharts:**
- ✅ Integração nativa com React
- ✅ Componentes declarativos
- ✅ Leve e performático
- ✅ Suporta diversos tipos de gráficos
- ✅ Responsivo

#### 3. Estrutura de Arquivos

**Criar novos arquivos:**

**A) Componente Dashboard:** `client/src/components/Dashboard.jsx`
- Componente principal da tela
- Busca dados das tarefas
- Calcula agrupamento por prioridade
- Renderiza o gráfico

**B) Componente de Gráfico:** `client/src/components/TaskChart.jsx`
- Componente reutilizável do gráfico
- Recebe dados agregados como props
- Renderiza usando Recharts

#### 4. Estrutura de Dados do Gráfico

**Campo de referência:** `importante` (boolean)
- **true:** Tarefa importante/prioritária
- **false:** Tarefa normal

**Agregação necessária:**
```javascript
const aggregateData = (tasks) => {
  const important = tasks.filter(task => task.importante === true).length;
  const normal = tasks.filter(task => task.importante === false).length;
  
  return [
    { name: 'Importantes', value: important, fill: '#ef4444' }, // Vermelho
    { name: 'Normais', value: normal, fill: '#3b82f6' }         // Azul
  ];
};
```

#### 5. Tipo de Gráfico

**Usar PieChart (Gráfico de Pizza):**
- Melhor visualização para proporções
- Fácil de entender
- Ideal para 2 categorias (importante/normal)

**Alternativa (BarChart):**
- Se preferir gráfico de barras
- Mais tradicional
- Igualmente efetivo

#### 6. Adição do Link na Home

**Arquivo:** `client/src/components/Header.jsx`

**Modificações necessárias:**
- Adicionar ícone de gráfico (ex: `FaChartPie` do react-icons)
- Adicionar `Link` para `/dashboard`
- Posicionar junto aos outros controles do header

**Exemplo de estrutura:**
```jsx
<Link to="/dashboard" className="header-dashboard-link" title="Ver Dashboard">
  <FaChartPie />
</Link>
```

#### 7. Configuração da Rota

**Arquivo:** `client/src/App.jsx`

**Adicionar nova rota:**
```jsx
import Dashboard from "./components/Dashboard.jsx";

// Dentro de <Routes>
<Route path="/dashboard" element={<Dashboard />} />
```

#### 8. Layout e Design

**Estrutura do Dashboard:**
- Título da página: "Dashboard de Tarefas"
- Card principal contendo o gráfico
- Estatísticas resumidas:
  - Total de tarefas
  - Tarefas importantes
  - Tarefas normais
  - Percentual de tarefas importantes

**Responsividade:**
- Gráfico deve se adaptar a diferentes tamanhos de tela
- Layout mobile-friendly
- Usar as classes CSS existentes do projeto

#### 9. Estados e Carregamento

**Implementar:**
- Estado de loading enquanto busca dados
- Tratamento de erros na API
- Mensagem quando não há tarefas
- Logs de debug usando o `LogContext`

### Critérios de Aceitação

✅ **CA1:** shadcn/ui está corretamente configurado no projeto

✅ **CA2:** Biblioteca Recharts instalada e funcionando

✅ **CA3:** Componente `Dashboard.jsx` criado e implementado

✅ **CA4:** Componente `TaskChart.jsx` criado com gráfico funcional

✅ **CA5:** Rota `/dashboard` adicionada e acessível

✅ **CA6:** Link para dashboard adicionado no Header da aplicação

✅ **CA7:** Gráfico exibe corretamente o número de tarefas importantes vs. normais

✅ **CA8:** Cores distintas para cada categoria (importante/normal)

✅ **CA9:** Estatísticas numéricas exibidas junto ao gráfico

✅ **CA10:** Tratamento de caso sem tarefas (mensagem apropriada)

✅ **CA11:** Design consistente com o restante da aplicação

✅ **CA12:** Navegação funcional (ir e voltar da rota)

✅ **CA13:** Responsivo em diferentes tamanhos de tela

✅ **CA14:** Logs de debug implementados corretamente

✅ **CA15:** Sem erros no console do navegador

### Exemplo de Implementação do Gráfico

**Estrutura básica usando Recharts:**

```jsx
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const TaskChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
```

### Testes Manuais a Realizar

1. **Teste de Navegação:**
   - Clicar no link do dashboard no header
   - Verificar se a rota `/dashboard` carrega corretamente
   - Voltar para home e verificar navegação

2. **Teste de Dados:**
   - Com tarefas importantes e normais: verificar se o gráfico exibe corretamente
   - Sem tarefas: verificar mensagem apropriada
   - Apenas tarefas importantes: verificar se o gráfico funciona
   - Apenas tarefas normais: verificar se o gráfico funciona

3. **Teste de Visual:**
   - Verificar cores distintas no gráfico
   - Verificar legenda do gráfico
   - Verificar tooltips ao passar mouse
   - Verificar estatísticas numéricas

4. **Teste de Responsividade:**
   - Desktop (1920x1080)
   - Tablet (768px)
   - Mobile (375px)

5. **Teste de Estado:**
   - Loading inicial
   - Atualização de dados
   - Tratamento de erro na API

6. **Teste Cross-browser:**
   - Chrome
   - Firefox
   - Safari

### Estrutura de Pastas Resultante

```
client/src/
├── components/
│   ├── Dashboard.jsx           (NOVO)
│   ├── TaskChart.jsx          (NOVO)
│   ├── ui/                    (NOVO - criado pelo shadcn)
│   │   └── card.jsx
│   ├── Header.jsx             (MODIFICADO)
│   └── ... (outros componentes existentes)
├── App.jsx                     (MODIFICADO)
└── ... (outros arquivos)
```

### Observações Importantes

- ⚠️ **Manter consistência** com o design atual da BIA
- ⚠️ **Usar o mesmo contexto** de logs (`LogContext`) para debug
- ⚠️ **Reaproveitar** a mesma lógica de fetch de tarefas do `App.jsx`
- ⚠️ **Não modificar** a API backend (usar endpoint existente `/api/tarefas`)
- ✅ **Testar** com diferentes quantidades de tarefas
- ✅ **Validar** cálculos de percentual
- ✅ **Verificar** performance com muitas tarefas

### Dependências Novas

Adicionar ao `client/package.json`:
```json
{
  "dependencies": {
    "recharts": "^2.x.x"
  }
}
```

(shadcn não adiciona dependência ao package.json, apenas copia componentes)

### Bônus (Opcional)

Se houver tempo, considerar adicionar:
- 📊 Gráfico de tarefas por data
- 📈 Tendência de criação de tarefas
- 🎯 Indicador de taxa de conclusão
- 🔄 Botão de refresh dos dados

---

## ✅ Como Finalizar Esta Task

Quando completar todos os critérios de aceitação:

1. **Commit final:**
   ```bash
   git add .
   git commit -m "feat: adiciona dashboard com gráfico de tarefas por prioridade"
   ```

2. **Push do branch:**
   ```bash
   git push -u origin 003-feat-dashboard-grafico-tarefas-prioridade
   ```

3. **Criar Pull Request:**
   ```bash
   gh pr create --base ia-main --title "[003]-feat-dashboard-grafico-tarefas-prioridade" --body "
   ## Resumo
   - Configurado shadcn/ui no projeto React
   - Instalado e integrado Recharts para visualização de dados
   - Criado componente Dashboard com gráfico de pizza
   - Implementado agrupamento de tarefas por prioridade (importante/normal)
   - Adicionado link de navegação no Header
   - Implementadas estatísticas e métricas visuais
   
   ## Testes Realizados
   - Navegação entre rotas (home ↔ dashboard)
   - Visualização com diferentes quantidades de tarefas
   - Caso sem tarefas cadastradas
   - Responsividade mobile/tablet/desktop
   - Cálculos de percentual e agregação
   - Cross-browser (Chrome, Firefox, Safari)
   - Integração com LogContext para debug
   
   ## Observações
   - Gráfico de pizza escolhido pela melhor visualização de proporções
   - Cores distintas: vermelho (importantes) e azul (normais)
   - Layout consistente com design existente da BIA
   - Performance validada com datasets variados
   
   ## Screenshots
   [Adicionar screenshots do dashboard se possível]
   "
   ```

4. **Notificar o PO:** Informar que o PR está pronto para revisão

5. **Mover task para done:**
   ```bash
   cd /home/renanaws/formacaoaws/bia-multi-agentic/bia
   git checkout ia-main
   git pull origin ia-main
   git mv .kiro/tasks/doing/003-feat-dashboard-grafico-tarefas-prioridade.md .kiro/tasks/done/
   git commit -m "chore: move task 003-feat-dashboard-grafico-tarefas-prioridade to done"
   git push origin ia-main
   ```

⚠️ **NÃO faça merge do PR!** Apenas o PO pode revisar e aprovar.
⚠️ **NÃO remova o worktree!** Ele será removido apenas após o PO confirmar o merge.
