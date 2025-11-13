import { Produto } from "./Produto";

export class ProdutoFisico extends Produto {
  constructor(
    id: number, nome: string, preco: number, estoque: number,
    private pesoKg: number
  ) { super(id, nome, preco, estoque); }

  obterTipo(): string { return "Físico"; }
  obterPesoKg() { return this.pesoKg; }
  definirPesoKg(w: number) { this.pesoKg = w; }

  toString(): string {
    return super.toString() + ` | Peso: ${this.pesoKg.toFixed(2)}kg`;
  }
}
