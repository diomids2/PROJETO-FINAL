import rl from "readline-sync";

    export function perguntarNaoVazio(pergunta: string): string {
      while (true) {
        const s = rl.question(pergunta).trim();
        if (s) return s;
        console.log("Entrada obrigatória.");
      }
    }

    export function perguntarInteiro(pergunta: string): number {
      while (true) {
        const s = rl.question(pergunta).trim();
        const n = parseInt(s, 10);
        if (!Number.isNaN(n)) return n;
        console.log("Valor inválido.");
      }
    }

    export function perguntarDecimal(pergunta: string): number {
      while (true) {
        const s = rl.question(pergunta).trim().replace(",", ".");
        const n = parseFloat(s);
        if (!Number.isNaN(n)) return n;
        console.log("Valor inválido.");
      }
    }
