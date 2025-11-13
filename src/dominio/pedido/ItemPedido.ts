import { Produto } from "../produto/Produto";

export class ItemPedido {
  private readonly precoUnitario: number;
  constructor(
    private readonly produto: Produto,
    private readonly quantidade: number = 1
  ) { this.precoUnitario = produto.obterPreco(); }

  obterProduto() { return this.produto; }
  obterQuantidade() { return this.quantidade; }
  obterPrecoUnitario() { return this.precoUnitario; }
  obterSubtotal() { return this.precoUnitario * this.quantidade; }

  toString(): string {
    return `${this.produto.obterNome()} x${this.quantidade} - R$ ${this.precoUnitario.toFixed(2)} (Subtotal: R$ ${this.obterSubtotal().toFixed(2)})`;
  }
}
