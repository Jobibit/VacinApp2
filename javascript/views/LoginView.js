export class LoginView {
  static mostrarMensagem(mensagem) {
    alert(mensagem);
  }

  static redirecionarParaPrincipal() {
    window.location.href = "/html/principal.html";
  }

  static redirecionarParaCadastro() {
    window.location.href = "/html/cadastro.html";
  }

  static alternarVisibilidadeSenha() {
    const senhaInput = document.getElementById('senha');
    const eyeIcon = document.querySelector('.toggle-password img');
    const isPasswordHidden = senhaInput.type === 'password';

    senhaInput.type = isPasswordHidden ? 'text' : 'password';
    eyeIcon.src = isPasswordHidden ? '/img/olho (1).png' : '/img/olho.png';
    eyeIcon.alt = isPasswordHidden ? 'Esconder senha' : 'Mostrar senha';
  }
}
