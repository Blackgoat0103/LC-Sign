const form = document.getElementById('userForm');
const list = document.getElementById('userList');

/* =========================
   CREATE
========================= */
form.addEventListener('submit', async e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  await fetch('/api/users', {
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
  const users = await fetch('/api/users').then(r => r.json());

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
  await fetch(`/api/users/${id}`, {
    method: 'DELETE'
  });

  loadUsers();
}

// initial load
loadUsers();
