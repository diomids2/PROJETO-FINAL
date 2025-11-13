import { Produto } from "../dominio/produto/Produto";
import { ErroProdutoNaoEncontrado } from "../excecoes/ErroProdutoNaoEncontrado";

export class RepositorioProduto {
  private porId = new Map<number, Produto>();
  private seq = 100;

  proximoId(): number { return ++this.seq; }
  adicionar(p: Produto) { this.porId.set(p.obterId(), p); }
  obter(id: number): Produto {
    const p = this.porId.get(id);
    if (!p) throw new ErroProdutoNaoEncontrado(id);
    return p;
  }
  listarTodos(): Produto[] { return Array.from(this.porId.values()); }
  buscar(termo: string): Produto[] {
    const t = termo.toLowerCase();
    return this.listarTodos().filter(p => p.obterNome().toLowerCase().includes(t));
  }
}
