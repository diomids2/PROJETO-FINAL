import { Cliente } from "../usuario/Cliente";
    import { ItemPedido } from "./ItemPedido";
    import { EstrategiaPagamento } from "../../pagamento/EstrategiaPagamento";

    export class Pedido {
      static Status = { NOVO: "NOVO", PAGO: "PAGO", FALHA_PAGAMENTO: "FALHA_PAGAMENTO" } as const;

      private readonly itens: ItemPedido[] = [];
      private pagamento?: EstrategiaPagamento;
      private status: keyof typeof Pedido.Status = "NOVO";

      constructor(private readonly id: number, private readonly cliente: Cliente) {}

      adicionarItem(item: ItemPedido) { this.itens.push(item); }
      obterItens() { return this.itens; }
      definirPagamento(p: EstrategiaPagamento) { this.pagamento = p; }
      obterTotal(): number { return this.itens.reduce((s, it) => s + it.obterSubtotal(), 0); }
      obterStatus() { return this.status; }

      finalizar(): boolean {
        const pago = !!this.pagamento && this.pagamento.pagar(this.obterTotal());
        this.status = pago ? "PAGO" : "FALHA_PAGAMENTO";
        return pago;
      }

      toString(): string {
        const cabecalho = `Pedido #${this.id} - ${this.cliente.toString()} - Status: ${this.status}`;
        const linhas = this.itens.map(i => `  - ${i.toString()}`).join("");
        const total = `TOTAL: R$ ${this.obterTotal().toFixed(2)}`;
        return [cabecalho, linhas, total].join("");
      }
    }
