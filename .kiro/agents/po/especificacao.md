No seu trabalho de especificar tarefas, desejo que sempre que for pedido uma nova atividade, o resultado do seu trabalho será a criação de um arquivo markdown (.md).

Esse arquivo deve ter o seguinte formato [025]-[feat]-[resumo].md Onde:

-[025] é o número sequencial da tarefa, sempre com 3 dígitos
    - Esse controle sequencial sera feito por um arquivo chamado sequencial.md.
     - Nesse arquivo tera apenas o texto (Ultima Task: [002].)
        - Voce vai sempre usar o sequencial seguinte e incrementar o valor da Ultima Task.
-[feat] é o tipo da tarefa (pode ser feat, fix, test)
-[resumo] é um resumo curto da tarefa, separado por hífens

O Local que o arquivo deve ser criado, sera na pasta bia/.kiro/tasks

- Voce tambem devera gerenciar o estado desses arquivos criados, ou seja , quando uma tarefa for finalizada, voce vai mover esse arquivo para uma pasta na mesma folder acima chamada done/

- Sempre que voce criar uma nova task, voce me sinaliza para que eu possa revisar.
- Apos eu dizer que esta ok a revisao voce pergunta se ja pode ser feito o commit e push dela para o repositorio remoto. ( lemvre de fazer o commit e push da task e do sequencial).

# Sobre a task que vai ser criada
- No inicio da task, voce precisa colocar informacoes importantes sobre o nosso modelo de trabalho.
Vamos adotar um modelo de feature/branch, ou seja , cada task tera o seu branch, O Branch deve ter o nome das tasks e SEMPRE
derivar do branch ia-main. Ao criar a task, voce precisa especificar qual agent deve inciar ela.
- O Agent que iniciar, devera inicialmente verificar se estamos no branch ia-main. Caso nao esteja, deve informar e perguntar se podemos retornar para ele, antes de iniciar a task.
- Apos ser autorizado, ele devera mover a task para doing, fazer commit e push e criar o branch para iniciar a implementacao.

## Fluxo de Finalização e Pull Request

Quando o agent responsável finalizar a implementação da task:

1. **Validação:** O agent deve confirmar que todos os critérios de aceitação foram atendidos
2. **Commit final:** Fazer commit de todas as alterações pendentes no branch da feature
3. **Push:** Fazer push do branch para o repositório remoto
4. **Criação do PR:** Criar Pull Request do branch da feature para `ia-main` usando a CLI apropriada (gh pr create)
   - **Título do PR:** Usar o mesmo formato da task: `[XXX]-[tipo]-[resumo]`
   - **Descrição do PR:** Deve conter:
     - Resumo das alterações realizadas
     - Testes executados e resultados
     - Observações relevantes
5. **Notificação ao PO:** Informar que o PR foi criado e está aguardando revisão
6. **Movimentação da task:** Mover o arquivo da task de `tasks/` para `tasks/done/`
7. **Commit e push da movimentação:** Fazer commit e push da movimentação da task para done (no branch `ia-main`)

**Importante:** O agent NÃO deve fazer merge do PR. Apenas o PO pode revisar e aprovar o merge após validação.