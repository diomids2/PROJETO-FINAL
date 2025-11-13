export class ErroEstoqueInsuficiente extends Error {
  constructor(produto: string, solicitado: number, disponivel: number) {
    super(`Estoque insuficiente para '${produto}'. Solicitado: ${solicitado}, Disponível: ${disponivel}`);
    this.name = "ErroEstoqueInsuficiente";
  }
}
