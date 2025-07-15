// Alternar visibilidade da senha
const senhaInput = document.getElementById('senha');
const eyeIcon = document.getElementById('eye-icon');

eyeIcon.addEventListener('click', () => {
  const isPasswordHidden = senhaInput.type === 'password';

  senhaInput.type = isPasswordHidden ? 'text' : 'password';
  eyeIcon.src = isPasswordHidden ? '/img/olho (1).png' : '/img/olho.png';
  eyeIcon.alt = isPasswordHidden ? 'Esconder senha' : 'Mostrar senha';
});

// Enviar dados para o MockAPI
document.querySelector('.btn').addEventListener('click', () => {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  // Validação simples
  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  fetch("https://6874093fdd06792b9c930670.mockapi.io/vacinapp/usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, email, senha })
  })
  .then(response => {
    if (response.ok) {
      alert("Usuário cadastrado com sucesso!");
      // limpar campos se quiser:
      document.getElementById('nome').value = "";
      document.getElementById('email').value = "";
      document.getElementById('senha').value = "";
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  })
  .catch(error => {
    console.error("Erro:", error);
    alert("Erro de conexão com a API.");
  });
});

// Botão de redirecionar para login
document.getElementById('btn-logar').addEventListener('click', () => {
  window.location.href = "/html/login.html"; // ajuste o caminho se estiver em subpastas
});
