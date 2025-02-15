import { Peca, Corp } from "./Pecas.js";
import { Quadrado } from "./Quadrados.js";

export class Rei extends Peca {
    toString() {
        return this.cor === Corp.Preto ? '♚' : '♔';
    }

    constructor(cor) {
        super(cor);
    }

    MovimentosValidos(x1, y1, x2, y2, tabuleiro) {
        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);

        if (dx <= 1 && dy <= 1) {
            if (!(tabuleiro[x2][y2] instanceof Peca) || (tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor)) {
                return true;
            }
        }

        return false;
    }

    Capturar(x1, y1, x2, y2, tabuleiro) {
        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);

        if (dx <= 1 && dy <= 1) {
            if (tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
                return true;
            }
        }

        return false;
    }
}