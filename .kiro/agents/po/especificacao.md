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
