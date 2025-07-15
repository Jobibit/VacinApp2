import { UsuarioModel } from '../models/UsuarioModel.js';
import { LoginView } from '../views/LoginView.js';

export class LoginController {
  static async autenticar() {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
      LoginView.mostrarMensagem("Preencha todos os campos!");
      return;
    }

    try {
      const usuarios = await UsuarioModel.buscarTodos();
      const usuario = usuarios.find(user => user.email === email && user.senha === senha);

      if (usuario) {
        localStorage.setItem('userId', usuario.id);
        LoginView.redirecionarParaPrincipal();
      } else {
        LoginView.mostrarMensagem("Usuário ou senha inválidos.");
      }
    } catch (erro) {
      console.error(erro);
      LoginView.mostrarMensagem("Erro ao conectar com o servidor.");
    }
  }
}
