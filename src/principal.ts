import { perguntarNaoVazio, perguntarInteiro, perguntarDecimal } from "./utilitarios/entrada";

    import { Produto } from "./dominio/produto/Produto";
    import { ProdutoFisico } from "./dominio/produto/ProdutoFisico";

    import { Cliente } from "./dominio/usuario/Cliente";
    import { Pedido } from "./dominio/pedido/Pedido";
    import { ItemPedido } from "./dominio/pedido/ItemPedido";

    import { PagamentoPix } from "./pagamento/PagamentoPix";
    import { PagamentoCartao } from "./pagamento/PagamentoCartao";

    import { RepositorioProduto } from "./repositorio/RepositorioProduto";
    import { RepositorioPedido } from "./repositorio/RepositorioPedido";

    import { ErroProdutoNaoEncontrado } from "./excecoes/ErroProdutoNaoEncontrado";
    import { ErroEstoqueInsuficiente } from "./excecoes/ErroEstoqueInsuficiente";

    const VERMELHO = "[31m";
    const RESET = "[0m";

    const repoProduto = new RepositorioProduto();
    const repoPedido = new RepositorioPedido();

    function carregarSementes() {
      repoProduto.adicionar(new ProdutoFisico(repoProduto.proximoId(), "Cerveja Heineken 600ml", 13.9, 50, 1.0));
      repoProduto.adicionar(new ProdutoFisico(repoProduto.proximoId(), "Vodka Absolut 1L", 99.0, 20, 1.2));
    }

    function cadastrarProduto() {
      console.log("=== Cadastro de Produto ===");
      const nome = perguntarNaoVazio("Nome: ");
      const preco = perguntarDecimal("Preco (R$): ");
      const estoque = perguntarInteiro("Estoque inicial: ");
      const peso = perguntarDecimal("Peso (kg): ");
      repoProduto.adicionar(new ProdutoFisico(repoProduto.proximoId(), nome, preco, estoque, peso));
      console.log("Produto cadastrado!");
    }

    function listarProdutos() {
      console.log("=== Lista de Produtos ===");
      const todos = repoProduto.listarTodos();
      if (todos.length === 0) return console.log("Nenhum produto.");
      todos.forEach(p => console.log(p.toString()));
    }

    function buscarProduto() {
      console.log("=== Buscar Produto ===");
      const termo = perguntarNaoVazio("Termo: ");
      const res = repoProduto.buscar(termo);
      if (res.length === 0) return console.log("Nada encontrado.");
      res.forEach(p => console.log(p.toString()));
    }

    function criarPedido() {
      console.log("=== Criar Pedido ===");
      const cliente = new Cliente(repoPedido.proximoId(), perguntarNaoVazio("Nome do cliente: "), perguntarNaoVazio("E-mail: "));
      const pedido = new Pedido(repoPedido.proximoId(), cliente);

      while (true) {
        const id = perguntarInteiro("ID do produto (0 para finalizar): ");
        if (id === 0) break;
        try {
          const prod = repoProduto.obter(id);
          const qtd = perguntarInteiro("Quantidade: ");
          if (qtd <= 0) { console.log("Quantidade deve ser > 0."); continue; }
          const estoque = prod.obterEstoque();
          if (estoque !== Infinity && qtd > estoque) {
            throw new ErroEstoqueInsuficiente(prod.obterNome(), qtd, estoque);
          }
          pedido.adicionarItem(new ItemPedido(prod, qtd));
          console.log("Item adicionado!");
        } catch (e) {
          if (e instanceof ErroProdutoNaoEncontrado) console.log(e.message);
          else if (e instanceof ErroEstoqueInsuficiente) console.log(e.message);
          else console.log("Erro inesperado.");
        }
      }

      if (pedido.obterItens().length === 0) {
        console.log("Pedido vazio. Cancelado.");
        return;
      }

      console.log(`Total: R$ ${pedido.obterTotal().toFixed(2)}`);
      const forma = perguntarInteiro("Forma de pagamento (1=PIX, 2=Cartao): ");
      if (forma === 1) pedido.definirPagamento(new PagamentoPix(perguntarNaoVazio("Chave PIX: ")));
      else pedido.definirPagamento(new PagamentoCartao(
        perguntarNaoVazio("Titular: "), perguntarNaoVazio("Número do cartao: "), perguntarNaoVazio("Validade (MM/AA): ")
      ));

      const pago = pedido.finalizar();
      if (pago) {
        for (const it of pedido.obterItens()) {
          const p = it.obterProduto();
          if (p.obterEstoque() !== Infinity) p.reduzirEstoque(it.obterQuantidade());
        }
        repoPedido.adicionar(pedido);
        console.log("Pagamento aprovado! Pedido confirmado.");
        console.log(pedido.toString());
      } else {
        console.log("Falha no pagamento.");
      }
    }

    function listarPedidos() {
      console.log("=== Lista de Pedidos ===");
      const todos = repoPedido.listarTodos();
      if (todos.length === 0) return console.log("Nenhum pedido.");
      todos.forEach(o => { console.log(o.toString()); console.log("---------------------"); });
    }

    function imprimirMenu() {
      console.log(VERMELHO + "=== E-COMMERCE - ESQUENTA ADEGA ===" + RESET);
      console.log("1. Cadastrar produto");
      console.log("2. Listar produtos");
      console.log("3. Criar pedido");
      console.log("4. Listar pedidos");
      console.log("5. Buscar produto por nome");
      console.log("0. Sair");
    }

    function principal() {
      carregarSementes();
      let op = -1;
      do {
        imprimirMenu();
        op = perguntarInteiro("Escolha uma opcao: ");
        switch (op) {
          case 1: cadastrarProduto(); break;
          case 2: listarProdutos(); break;
          case 3: criarPedido(); break;
          case 4: listarPedidos(); break;
          case 5: buscarProduto(); break;
          case 0: console.log("Saindo..."); break;
          default: console.log("Opcao inválida.");
        }
      } while (op !== 0);
    }

    principal();
