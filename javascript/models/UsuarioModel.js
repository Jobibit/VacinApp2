export class UsuarioModel {
  static async buscarTodos() {
    const resposta = await fetch("https://6874093fdd06792b9c930670.mockapi.io/vacinapp/usuario");
    if (!resposta.ok) throw new Error("Erro ao buscar usuários");
    return await resposta.json();
  }
}
