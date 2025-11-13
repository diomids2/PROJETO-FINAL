export class ErroProdutoNaoEncontrado extends Error {
  constructor(id: number) {
    super(`Produto com id ${id} nao encontrado.`);
    this.name = "ErroProdutoNaoEncontrado";
  }
}
