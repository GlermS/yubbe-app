# Yubbe Server

## Indice

- [Grafos de dependência](#grafos-de-dependência)
- [Histórias do usuário](#hist%C3%B3rias-do-usu%C3%A1rio)
- [Links das documentações](#links)

- [Iniciando o servidor](#iniciando-o-servidor)



## Grafos de dependência

[Voltar para o indice](#indice)

![alt text](https://github.com/GlermS/yubbe-server/blob/master/readme-files/Yubbe%402x.png "Logo Title Text 1")



### Histórias do usuário

[Voltar para o indice](#indice)

- **Agendamento de chamadas**
  1. Os usuários logam na plataforma.
  2. Os usuários selecionam o tipo de acesso (como aluno de algum curso ou independente)
  3. Os usuários têm acesso à lista de reuniões permitidas dependente do tipo de acesso e vagas), ordenadas e filtradas por tema, data, horário, mediador e nível.
  4. O usuário seleciona reunião.
  5. O usuário lê a descrição da reunião.
  6. O usuário seleciona se vai participar da reunião escolhida.
  7. Caso decida participar, o usuário solicita o registro.
  8. Verificar se ainda há vagas e se o usuário já atingiu o seu limite semanal.
  9. O usuário recebe um retorno confirmando o registro da chamada ou uma falha por uma devida causa.
- **Criação da chamadas**
  1. Os mediadores logam na plataforma.
  2. Os mediadores selecionam o tipo de acesso (como mediador de algum curso ou independente).
  3. Os mediadores selecionam a opção de criar uma chamada.
  4. Os mediadores selecionam a data, o horário, o tema, acesso (público ou privado), o nível e escrevem a descrição.
  5. Caso o acesso seja privado, ele seleciona quais usuários terão acesso.
  6. Os mediadores confirmam a escolha.
  7. Os mediadores recebem um retorno confirmando o registro com o link da chamada ou uma falha por uma devida causa.
  8. Caso o acesso seja privado, os usuários convidados são notificados por email e dentro da plataforma.
- **Registro de usuários**
  1. Os administradores logam na plataforma.
  2. Os administradores selecionam a opção de adicionar usuários.
  3. Os administradores selecionam se:
     1. O usuário é usuário comum:
        1. limite de chamadas semanais
        2. email
        3. senha
        4. acesso (a qual curso que ele pertence)
     2. Ou um mediador:
        1. email
        2. senha
        3. pertencimento
  4. Os administradores confirmam as informações.
  5. Os administradores recebem um retorno confirmando o registro ou uma falha por uma devida causa.
- **Acesso das chamadas**
  1. Logar na plataforma.
  2. Acessar página com as chamadas em que o usuário está registrado.
  3. Clicar no link de acessar a chamada 
  4. Esperar o mediador iniciar a chamada..
- **Durante a chamada**
  1. O mediador inicia a chamada.
  2. Os participantes entram na chamada.
  3. Durante a chamada os usuários:
     1. podem ligar e desligar câmera e áudio (antes de entrar na chamada também)
     2. levantar a mão para falar.mandar mensagem no chat.
     3. cutucar outra pessoa; desligar e ligar a opção de cutucar.
  4. Durante a chamada o mediador pode:
     1. mutar os outros usuários;
     2. desligar as câmeras deles;
     3. acionar dinâmicas.
  5. Após a chamada o usuário aluno pode:
     1. dar uma nota de 0 a 5 ao mediador.
- **Edição do perfil dos usuários**
  1. Os usuários podem adicionar ou trocar suas fotos de perfil.
  2. Podem adicionar uma descrição do seu perfil.
  3. Podem adicionar e remover pessoas das suas listas de amigos.
     1. Na lista de amigos eles podem ver foto e descrição dos outros, número de horas conversadas e reuniões agendadas.
- **Cancelamento de agendamento**
  1. O usuário loga na plataforma.
  2. O usuário seleciona o tipo de acesso (como aluno de algum curso ou independente).
  3. O usuário acessa a área com as aulas que estão agendadas
  4. Seleciona a aula que quer cancelar
  5. Clica no botão de cancelar.
  6. Responde a mensagem se tem certeza do cancelamento.
  7. Se o prazo for menor do que 24 antes do início da chamada, o usuário perde a hora referente aquela semana.
  8. O usuário recebe um retorno confirmando o cancelamento da chamada ou uma falha por uma devida causa.

## MVP
Os usuários do sistema logam na plataforma de acessa as chamadas. Os usuários(clientes e monitores) têm acesso a lista ordena a de chamadas. Os clientes tem a opção de se registra na chamada, enquanto os monitores tem a opção de criar ou cancelar uma chamada.

Os usuário de entrarem deve espera a liberação do monitor para acessar a chamada. Durante a chamadas os usuários podem tanto abrir e fecha o canal de video quanto o de audio. Também há um canal de chat disponível, onde será permitido apenas troca de mensagens em texto.

Os administradores de acesso a todas as funcionalidades dos demais usuários e podem adicionar, alterar e excluir outros usuários.

## Descrição técnica do MVP

### Login e autenticação
Os usuários, ao acessar o site, passam por uma verificação. Caso não tenham um token de autorização válido serão redirecionados para a página de login, mantendos as informações do path. Na página de login, eles preenchem um formulário com usuário(email) e senha clicam no botam enviar. Os dados são validados ainda no lado do cliente, para uma uma resposta mais rápida, e, caso estejam no formato correto, são enviados para o servidor através do método post.
No lado do servidor, os dados de login são revalidados, para proteger o banco de dados. Caso não passe no teste, será retornado uma resposta em formato json informando um status de erro de informação em um formato inválido. Caso passe no teste, os dados são vereficados no banco de dados. Se não houver registro de usuários com os dados informados, é retornado um status de erro de email ou senha inválidos. Se houver um registro desse usuário, e retornado um status de aprovação e o cookie com o registro da sessão é atualizado.
Uma vez o login aprovido, os usuários são redirecionando para pagína de destino original.

### Dinâmica de chamadas
Os usuários, ao acessar o site, passam por uma verificação. Caso não tenham um token de autorização válido serão redirecionados para a página de login, mantendos as informações do path. Caso estejam conectados, o servidor verifica se usuário está inscrito na chamada. Caso esteja, o usuário é redirecionado para a sala de espera e servido informa se a chamada já foi iniciada, caso contrario o servidor retorna um status de erro informando que o usuário não está inscrito.

Caso a chamada não tenha iniciada, os clientes esperam pelo inicio o e moderador tem opção de iniciar a chamada. Caso tenha iniciado, o cliente tem a opção de entrar na chamada. Quando o pedido é feito, o moderador é notificado e tem a opção de permitir ou não o acesso.

Ao entrar na chamada, o frontend envia o handshaking. Em seguida o servidor verifica a sessão novamente e, caso aprovado, envia o token de acesso à chamada.
Todos os usuários participantes da chamada ativa terão um token de acesso único à chamada que será enviado pelo servidor assim que a o usuário é conectado no websocket.Todos as mensagens enviadas para o servidor deverão ser no formato json e conterão esse codigo, caso contrario o servidor encerra a conexão.



 ## Links

[Voltar para o indice](#indice)

Links das documentações dos pacotes utilizados.

### Frontend

- Framework -  React
  - https://pt-br.reactjs.org/docs/getting-started.html
- PWA
  - https://medium.com/better-programming/build-a-realtime-pwa-with-react-99e7b0fd3270

### Backend

- Linguagem - Golang
  - https://golang.org/doc/
- Criptografia das senhas - Bcrypt
  - https://pkg.go.dev/golang.org/x/crypto/bcrypt
- Autentificação de sessão - Gorilla session e securecoockie
  - https://github.com/gorilla/sessions
  - https://github.com/gorilla/securecookie



### Banco de Dados

- Mysql



## Iniciando o servidor 

[Voltar para o indice](#indice)

Comando do terminal para iniciar o servidor

```(golang)
 go run server.go
```
