# [002] Checkbox "Importante" marcado por padrão no cadastro de tarefa

## Tipo
`feat`

## Branch
`002-feat-checkbox-importante-marcado-por-padrao`
> ⚠️ Este branch deve ser criado a partir do branch `ia-main`.

## Agente Responsável
**dev**

## Modelo de Trabalho

1. Verificar se está no branch `ia-main`. Se não estiver, informar ao usuário e aguardar autorização para retornar.
2. Após autorizado, mover este arquivo para a pasta `doing/`, fazer commit e push no branch `ia-main`.
3. Criar o branch `002-feat-checkbox-importante-marcado-por-padrao` a partir de `ia-main` e iniciar a implementação.

---

## Descrição

Na tela de cadastro de tarefas, o campo **"Importante"** (checkbox) deve vir **marcado por padrão** ao abrir o formulário. O usuário pode desmarcá-lo manualmente, caso a tarefa não seja importante.

## Contexto

O componente responsável pelo formulário de cadastro é `client/src/components/AddTask.jsx`.

> ⚠️ **Atenção:** Antes de implementar, o agente dev deve ler o arquivo `AddTask.jsx` e verificar o estado atual do `useState` do campo `importante`. É possível que o estado já esteja inicializado como `true` (`useState(true)`), porém o comportamento pode não estar refletindo corretamente na interface. Confirmar e corrigir se necessário.

## Critérios de Aceite

- [ ] Ao abrir o formulário de cadastro de tarefas, o checkbox "Importante" deve estar **marcado por padrão**
- [ ] O usuário deve conseguir **desmarcar** o checkbox normalmente
- [ ] Após **salvar** uma tarefa (com ou sem o checkbox marcado), ao abrir o formulário novamente, o checkbox deve voltar a estar **marcado por padrão**
- [ ] Nenhuma outra funcionalidade do formulário deve ser afetada pela mudança

## Arquivos a Verificar/Modificar

| Ação | Arquivo |
|------|---------|
| Verificar e modificar se necessário | `client/src/components/AddTask.jsx` |

## Notas de Implementação

- O estado inicial do campo `importante` deve ser `true`: `useState(true)`
- O atributo `checked` do `<input type="checkbox">` deve estar vinculado ao estado `importante`
- Após o `onSubmit`, o reset do formulário deve restaurar `importante` para `true` (não `false`)
- Não alterar estilos, layout ou outros campos do formulário

## Validação

Após a implementação, o agente deve:
1. Verificar se o checkbox aparece marcado ao carregar o formulário
2. Confirmar que o comportamento de reset após submit também retorna marcado
3. Garantir que a funcionalidade de desmarcação manual continua funcionando
