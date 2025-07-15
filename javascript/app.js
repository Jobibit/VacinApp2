document.addEventListener('DOMContentLoaded', () => {
  // Inicializa os componentes
  const userModel = new UserModel();
  const authView = new AuthView();
  const authController = new AuthController(userModel, authView);
});

import { CadastroController } from './controllers/CadastroController.js';

document.addEventListener('DOMContentLoaded', () => {
  new CadastroController();
});