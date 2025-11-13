export class Cliente {
  constructor(
    private readonly id: number,
    private nome: string,
    private email: string
  ) {}

  obterId() { return this.id; }
  obterNome() { return this.nome; }
  obterEmail() { return this.email; }
  definirNome(n: string) { this.nome = n; }
  definirEmail(e: string) { this.email = e; }

  toString(): string { return `Cliente #${this.id} - ${this.nome} <${this.email}>`; }
}
