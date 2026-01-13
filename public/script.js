const form = document.getElementById('userForm');
const list = document.getElementById('userList');

const API_BASE = 'http://localhost:3000';

/* =========================
   CREATE
========================= */
form.addEventListener('submit', async e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  await fetch(`${API_BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  form.reset();
  loadUsers();
});

/* =========================
   READ
========================= */
async function loadUsers() {
  const res = await fetch(`${API_BASE}/api/users`);
  const users = await res.json();

  list.innerHTML = '';

  users.forEach(({ id, name, email }) => {
    const li = document.createElement('li');

    li.innerHTML = `
      ${name} (${email})
      <button>Delete</button>
    `;

    li.querySelector('button').onclick = () => deleteUser(id);
    list.appendChild(li);
  });
}

/* =========================
   DELETE
========================= */
async function deleteUser(id) {
  await fetch(`${API_BASE}/api/users/${id}`, {
    method: 'DELETE'
  });

  loadUsers();
}

// initial load
loadUsers();
