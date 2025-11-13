# E-commerce de Console (TypeScript) — Esquenta Adega 

Projeto em **TypeScript (Node.js)** com entrada síncrona via `readline-sync`.

## 🚀 Como rodar

```bash
npm install
npm run build
npm start
# ou (modo dev, sem build)
npm run dev
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

## 🧠 Conceitos atendidos

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
