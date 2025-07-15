import { LoginController } from './controllers/LoginController.js';
import { LoginView } from './views/LoginView.js';

document.getElementById("btn-logar").addEventListener("click", () => {
  LoginController.autenticar();
});

document.getElementById("btn-cadastrar").addEventListener("click", () => {
  LoginView.redirecionarParaCadastro();
});

document.querySelector('.toggle-password').addEventListener("click", () => {
  LoginView.alternarVisibilidadeSenha();
});


