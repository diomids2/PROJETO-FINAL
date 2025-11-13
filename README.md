# E-commerce de Console (TypeScript/Node) — Esquenta Adega (PT-BR)

Projeto em **TypeScript (Node.js)** com entrada síncrona via `readline-sync`.

## 🚀 Como rodar

```bash
npm install
npm run build
npm start
# ou (modo dev, sem build)
npm run dev
```

## 🗂 Estrutura

```
src/
  principal.ts
  utilitarios/entrada.ts
  excecoes/
    ErroProdutoNaoEncontrado.ts
    ErroEstoqueInsuficiente.ts
  dominio/
    produto/
      Produto.ts
      ProdutoFisico.ts
    usuario/Cliente.ts
    pedido/
      ItemPedido.ts
      Pedido.ts
  pagamento/
    EstrategiaPagamento.ts
    PagamentoPix.ts
    PagamentoCartao.ts
  repositorio/
    RepositorioProduto.ts
    RepositorioPedido.ts
```

## 🧭 Funcionalidades

- **Cadastrar produto** (somente *Produto Físico*): nome, preco, estoque, peso (kg)
- **Listar produtos**: ID, nome, tipo, preco, estoque, peso
- **Buscar produto por nome** (case-insensitive)
- **Criar pedido**:
  - Informar cliente (nome, e-mail)
  - Adicionar itens por ID do produto e quantidade (validacao de estoque)
  - Escolher forma de pagamento: **PIX** (chave) ou **Cartao** (titular, número, validade)
  - Em caso de **pagamento aprovado**: estoque é **debitado** (apenas produtos físicos)
- **Listar pedidos**: itens, subtotais, total e status (**NOVO**, **PAGO**, **FALHA_PAGAMENTO**)

## 🧠 Conceitos atendidos (projeto acadêmico)

- **Entrada/Saída** de dados: `readline-sync`
- **Lacos e Condicionais**: `do...while` no menu, `switch-case`, `if/else`
- **POO**:
  - `abstract class Produto` (abstracao)
  - `ProdutoFisico extends Produto` (heranca)
  - `EstrategiaPagamento` (interface) + `PagamentoPix`/`PagamentoCartao` (polimorfismo)
  - `precoFinal()` com e sem parametro (sobrecarga de método)
- **Collections**: `Map<number, Produto>` em `RepositorioProduto`; listas para itens/pedidos
- **Exceptions**: `ErroProdutoNaoEncontrado`, `ErroEstoqueInsuficiente`

## 🧪 Exemplo de uso

```
=== E-COMMERCE - ESQUENTA ADEGA ===
1. Cadastrar produto
2. Listar produtos
3. Criar pedido
4. Listar pedidos
5. Buscar produto por nome
0. Sair
Escolha uma opcao: 2

=== Lista de Produtos ===
[101] Cerveja Heineken 600ml (Físico) - R$ 13.90 | Estoque: 50 | Peso: 1.00kg
[102] Vodka Absolut 1L (Físico) - R$ 99.00 | Estoque: 20 | Peso: 1.20kg
```

## 🧵 Branches de entrega (sugestao para avaliacao)

```bash
# Inicial
git init
git add .
git commit -m "chore: setup inicial (TS + readline-sync, PT-BR)"

# Etapa 1 — variaveis-lacos
git checkout -b variaveis-lacos
git add src/principal.ts src/utilitarios/entrada.ts
git commit -m "feat(etapa1): menu, entrada/saída, lacos e condicionais"

# Etapa 2 — POO
git checkout -b POO main
git add src/dominio/** src/pagamento/**
git commit -m "feat(etapa2): POO (abstracao, heranca, polimorfismo, sobrecarga, interfaces)"

# Etapa 3 — collections & exceptions
git checkout -b collection-exceptions main
git add src/repositorio/** src/excecoes/**
git commit -m "feat(etapa3): Collections e Exceptions (repos e erros customizados)"
```

---