export abstract class Produto {
  protected constructor(
    protected readonly id: number,
    protected nome: string,
    protected preco: number,
    protected estoque: number
  ) {}

  abstract obterTipo(): string;

  // Sobrecarga: preco com/sem desconto
  precoFinal(): number;
  precoFinal(percentualDesconto: number): number;
  precoFinal(percentualDesconto?: number): number {
    if (!percentualDesconto || percentualDesconto <= 0) return this.preco;
    const fator = 1 - percentualDesconto / 100;
    return Math.max(0, this.preco * fator);
  }

  reduzirEstoque(qtd: number): void {
    if (qtd <= 0) return;
    if (this.estoque !== Infinity && qtd > this.estoque) {
      throw new Error(`Estoque insuficiente para '${this.nome}'.`);
    }
    if (this.estoque !== Infinity) this.estoque -= qtd;
  }

  obterId() { return this.id; }
  obterNome() { return this.nome; }
  obterPreco() { return this.preco; }
  obterEstoque() { return this.estoque; }

  definirNome(n: string) { this.nome = n; }
  definirPreco(p: number) { this.preco = p; }
  definirEstoque(e: number) { this.estoque = e; }

  toString(): string {
    const est = this.estoque === Infinity ? "∞" : this.estoque.toString();
    return `[${this.id}] ${this.nome} (${this.obterTipo()}) - R$ ${this.preco.toFixed(2)} | Estoque: ${est}`;
  }
}
