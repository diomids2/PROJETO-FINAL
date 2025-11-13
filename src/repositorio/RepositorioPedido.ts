import { Pedido } from "../dominio/pedido/Pedido";

export class RepositorioPedido {
  private pedidos: Pedido[] = [];
  private seq = 0;

  proximoId(): number { return ++this.seq; }
  adicionar(p: Pedido) { this.pedidos.push(p); }
  listarTodos(): Pedido[] { return this.pedidos; }
}
