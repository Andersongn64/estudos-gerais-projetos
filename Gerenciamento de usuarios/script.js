// Variáveis globais
let users = [];
let editingUserId = null;

// DOM Elements
const userForm = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const submitBtn = document.getElementById('submitBtn');
const usersList = document.getElementById('usersList');
const formMessage = document.getElementById('formMessage');
const resetBtn = document.getElementById('resetBtn');

// Event Listeners
userForm.addEventListener('submit', handleFormSubmit);
resetBtn && resetBtn.addEventListener('click', cancelarEdicao);

// Ao carregar, buscar usuários da API
window.onload = fetchUsers;

function fetchUsers() {
    fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(data => {
            users = data;
            updateUsersList();
        })
        .catch(() => showMessage('Erro ao carregar usuários.', true));
}

function handleFormSubmit(e) {
    e.preventDefault();
    limparMensagem();
    const userData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        age: parseInt(ageInput.value)
    };
    if (!userData.name || !userData.email || isNaN(userData.age)) {
        showMessage('Preencha todos os campos corretamente.', true);
        return;
    }
    if (editingUserId) {
        // Editando usuário existente
        fetch(`http://localhost:3000/users/${editingUserId}` , {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(res => res.json().then(data => ({ status: res.status, data })))
        .then(({ status, data }) => {
            if (status !== 200) throw new Error(data.message || 'Erro ao editar usuário');
            cancelarEdicao();
            showMessage('Usuário atualizado com sucesso!');
            fetchUsers();
        })
        .catch(err => showMessage(err.message, true));
    } else {
        // Adicionando novo usuário
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(res => res.json().then(data => ({ status: res.status, data })))
        .then(({ status, data }) => {
            if (status !== 201) throw new Error(data.message || 'Erro ao adicionar usuário');
            userForm.reset();
            showMessage('Usuário cadastrado com sucesso!');
            fetchUsers();
        })
        .catch(err => showMessage(err.message, true));
    }
}

function updateUsersList() {
    usersList.innerHTML = '';
    if (!users.length) {
        usersList.innerHTML = '<p style="text-align:center;color:#888;">Nenhum usuário cadastrado.</p>';
        return;
    }
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <div class="user-info">
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Idade: ${user.age}</p>
            </div>
            <div class="user-actions">
                <button class="edit-btn" type="button" data-id="${user.id}">Editar</button>
                <button class="delete-btn" type="button" data-id="${user.id}">Excluir</button>
            </div>
        `;
        usersList.appendChild(userCard);
    });
    // Delegação de eventos para botões
    usersList.querySelectorAll('.edit-btn').forEach(btn => {
        btn.onclick = () => editarUsuario(Number(btn.dataset.id));
    });
    usersList.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = () => excluirUsuario(Number(btn.dataset.id));
    });
}

// Tornar editUser e deleteUser globais para funcionar no onclick
function editarUsuario(id) {
    limparMensagem();
    const user = users.find(u => u.id === id);
    if (user) {
        nameInput.value = user.name;
        emailInput.value = user.email;
        ageInput.value = user.age;
        editingUserId = id;
        submitBtn.textContent = 'Salvar Alterações';
        resetBtn.style.display = 'inline-block';
    }
}

function excluirUsuario(id) {
    limparMensagem();
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' })
        .then(res => {
            if (res.status !== 204) return res.json().then(data => { throw new Error(data.message || 'Erro ao excluir usuário'); });
            showMessage('Usuário removido com sucesso!');
            fetchUsers();
        })
        .catch(err => showMessage(err.message, true));
    }
}

function cancelarEdicao() {
    editingUserId = null;
    userForm.reset();
    submitBtn.textContent = 'Adicionar Usuário';
    resetBtn.style.display = 'none';
    limparMensagem();
}

function showMessage(msg, erro = false) {
    if (formMessage) {
        formMessage.textContent = msg;
        formMessage.style.color = erro ? '#c0392b' : '#2e7d32';
    }
}

function limparMensagem() {
    if (formMessage) formMessage.textContent = '';
}
