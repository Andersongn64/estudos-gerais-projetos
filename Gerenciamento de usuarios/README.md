# Gerenciamento de Usuários

Este é um sistema simples de gerenciamento de usuários, composto por uma interface web frontend e uma API backend. Permite adicionar, editar, visualizar e excluir usuários.

## Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura da página web.
- **CSS3**: Estilização da interface, com design responsivo e gradientes.
- **JavaScript (Vanilla)**: Lógica do cliente para interagir com a API, incluindo validações e manipulação do DOM.

### Backend
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Restify**: Framework para criar APIs RESTful.
- **restify-cors-middleware2**: Middleware para permitir requisições CORS (Cross-Origin Resource Sharing).

### Armazenamento de Dados
- Dados são armazenados em memória (array JavaScript), sem persistência em banco de dados. Os dados são perdidos ao reiniciar o servidor.

## Como Usar

### Pré-requisitos
- Node.js instalado (versão 14 ou superior).
- NPM (geralmente vem com Node.js).

### Instalação
1. Clone ou baixe este repositório.
2. Navegue até a pasta do projeto.
3. Instale as dependências do backend:
   ```
   npm init -y
   npm install restify restify-cors-middleware2
   ```

### Executando o Projeto
1. Inicie o servidor backend:
   ```
   node server.js
   ```
   O servidor será executado em `http://localhost:3000`.

2. Abra o arquivo `index.html` no navegador web (por exemplo, clique duplo no arquivo ou arraste para o navegador).
   - A interface web se conectará automaticamente à API em `localhost:3000`.

### Funcionalidades
- **Adicionar Usuário**: Preencha o formulário com nome, email e idade, e clique em "Adicionar Usuário".
- **Editar Usuário**: Clique no botão "Editar" ao lado de um usuário na lista, modifique os campos e salve.
- **Excluir Usuário**: Clique no botão "Excluir" ao lado de um usuário e confirme.
- **Visualizar Usuários**: A lista de usuários é exibida automaticamente após carregar a página ou após operações.

### Validações
- Nome: Deve ter pelo menos 2 caracteres.
- Email: Deve ser um email válido (contém '@').
- Idade: Deve ser um número entre 0 e 120.

### Notas
- Certifique-se de que o servidor esteja rodando antes de usar a interface web.
- Como os dados são armazenados em memória, eles serão perdidos ao parar o servidor.
- A interface é responsiva e funciona em dispositivos móveis.

## Estrutura do Projeto
- `index.html`: Página principal da interface web.
- `styles.css`: Arquivo de estilos CSS.
- `script.js`: Lógica JavaScript do frontend.
- `server.js`: Código do servidor backend.
- `README.md`: Este arquivo de documentação.