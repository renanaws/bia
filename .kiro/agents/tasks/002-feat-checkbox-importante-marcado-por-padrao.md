# [002] - Checkbox "Importante" marcado por padrão no cadastro de tarefa

## Tipo
`feat`

## Descrição
Na tela de cadastro de tarefa, o checkbox **"Importante"** deve vir marcado por padrão ao abrir o formulário. O usuário pode desmarcar se desejar, mas a intenção padrão é que toda nova tarefa seja considerada importante.

## Critérios de Aceite
- [ ] Ao abrir o formulário de cadastro de tarefa, o checkbox "Importante" deve estar **marcado (checked) por padrão**
- [ ] O usuário pode desmarcar o checkbox normalmente
- [ ] Após salvar uma tarefa, o formulário deve resetar com o checkbox **novamente marcado**
- [ ] O comportamento das demais funcionalidades do formulário não deve ser alterado

## Escopo Técnico
- **Arquivo:** `client/src/components/AddTask.jsx`
- **Mudança:** Alterar o estado inicial do hook `useState` do campo `importante` de `false` para `true`
- **Reset pós-submit:** Garantir que `setImportante(true)` seja chamado ao resetar o formulário após o envio

## Implementação
```jsx
// Antes
const [importante, setImportante] = useState(false);

// Depois
const [importante, setImportante] = useState(true);
```

```jsx
// Reset pós-submit — antes
setImportante(false);

// Reset pós-submit — depois
setImportante(true);
```

## Observações
- Mudança simples de estado inicial — sem impacto em outras telas ou componentes
- Não altera o comportamento da API nem da estrutura de dados enviada
