const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware2');

const server = restify.createServer();
const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['Authorization'],
  exposeHeaders: ['Authorization']
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

let users = [];
let nextId = 1;

// Função utilitária para validar usuário
function validarUsuario({ name, email, age }) {
  if (!name || typeof name !== 'string' || name.trim().length < 2) return false;
  if (!email || typeof email !== 'string' || !email.includes('@')) return false;
  if (!age || isNaN(Number(age)) || Number(age) < 0) return false;
  return true;
}

// GET all users
server.get('/users', (req, res, next) => {
  res.send(users);
  return next();
});

// GET user by id
server.get('/users/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    res.send(404, { message: 'Usuário não encontrado.' });
    return next();
  }
  res.send(user);
  return next();
});

// POST create user
server.post('/users', (req, res, next) => {
  const { name, email, age } = req.body;
  if (!validarUsuario({ name, email, age })) {
    res.send(400, { message: 'Dados inválidos. Preencha nome, email e idade corretamente.' });
    return next();
  }
  const user = { id: nextId++, name: name.trim(), email: email.trim(), age: Number(age) };
  users.push(user);
  res.send(201, user);
  return next();
});

// PUT update user
server.put('/users/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const { name, email, age } = req.body;
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    res.send(404, { message: 'Usuário não encontrado.' });
    return next();
  }
  if (!validarUsuario({ name, email, age })) {
    res.send(400, { message: 'Dados inválidos. Preencha nome, email e idade corretamente.' });
    return next();
  }
  users[userIndex] = { id, name: name.trim(), email: email.trim(), age: Number(age) };
  res.send(users[userIndex]);
  return next();
});

// DELETE user
server.del('/users/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    res.send(404, { message: 'Usuário não encontrado.' });
    return next();
  }
  users.splice(userIndex, 1);
  res.send(204);
  return next();
});

server.listen(3000, () => {
  console.log('Servidor de usuários rodando em http://localhost:3000');
});
