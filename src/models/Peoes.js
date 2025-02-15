import { Peca, Corp } from "./Pecas.js";
import { Quadrado } from "./Quadrados.js";

export class Peao extends Peca {
    toString() {
        return this.cor === Corp.Preto ? '♟' : '♙';
    }

    constructor(cor) {
        super(cor);
        this.foiMovido = false;
    }

    MovimentosValidos(x1, y1, x2, y2, tabuleiro) {
        const direcaoFrente = this.cor === Corp.Branco ? 1 : -1;

        if (x2 === x1 + direcaoFrente && y2 === y1 && !(tabuleiro[x2][y2] instanceof Peca)) {
            return true;
        }

        if (!this.foiMovido && x2 === x1 + 2 * direcaoFrente && y2 === y1 && !(tabuleiro[x2][y2] instanceof Peca)) {
            return true;
        }

        if (x2 === x1 + direcaoFrente && (y2 === y1 - 1 || y2 === y1 + 1) && tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
            return true;
        }

        return false;
    }

    Capturar(x1, y1, x2, y2, tabuleiro) {
        const direcaoFrente = this.cor === Corp.Branco ? 1 : -1;

        if (x2 === x1 + direcaoFrente && (y2 === y1 - 1 || y2 === y1 + 1) && tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
            return true;
        }

        return false;
    }
}