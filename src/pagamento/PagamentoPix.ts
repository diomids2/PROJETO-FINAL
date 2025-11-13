import { EstrategiaPagamento } from "./EstrategiaPagamento";
export class PagamentoPix implements EstrategiaPagamento {
  constructor(private readonly chave: string) {}
  pagar(valor: number): boolean {
    console.log(`PIX (${this.chave}) - R$ ${valor.toFixed(2)}: aprovado`);
    return true;
  }
}
