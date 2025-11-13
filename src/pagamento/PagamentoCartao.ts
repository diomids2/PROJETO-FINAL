import { EstrategiaPagamento } from "./EstrategiaPagamento";
export class PagamentoCartao implements EstrategiaPagamento {
  private mascarar(num: string) {
    if (!num || num.length < 4) return "****";
    return `**** **** **** ${num.slice(-4)}`;
  }
  constructor(
    private readonly titular: string,
    private readonly numero: string,
    private readonly validade: string
  ) {}
  pagar(valor: number): boolean {
    console.log(`Cartao ${this.mascarar(this.numero)} (${this.titular}) - R$ ${valor.toFixed(2)}: aprovado`);
    return valor <= 10000;
  }
}
