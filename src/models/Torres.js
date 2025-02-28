import { Peca, Corp } from "./Pecas.js";
import { Quadrado } from "./Quadrados.js";

export class Torre extends Peca {
    toString() {
        return this.cor === Corp.Preto ? '♜' : '♖';
    }

    constructor(cor) {
        super(cor);
    }

    MovimentosValidos(x1, y1, x2, y2, tabuleiro) {
        if (!(tabuleiro[x2][y2] instanceof Peca) || tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
            if ((x1 === x2 && y1 !== y2) || (x1 !== x2 && y1 === y2)) {
                if (this.CaminhoLimpo(x1, y1, x2, y2, tabuleiro)) {
                    return true;
                }
            }
        }

        return false;
    }

    CaminhoLimpo(x1, y1, x2, y2, tabuleiro) {
        if (x1 === x2) {
            const minY = Math.min(y1, y2);
            const maxY = Math.max(y1, y2);
            for (let y = minY + 1; y < maxY; y++) {
                if (tabuleiro[x2][y2] instanceof Peca && tabuleiro[x1][y]) {
                    return false;
                }
            }
        } else {
            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);
            for (let x = minX + 1; x < maxX; x++) {
                if (tabuleiro[x2][y2] instanceof Peca && tabuleiro[x][y1]) {
                    return false;
                }
            }
        }
        return true;
    }

    Capturar(x1, y1, x2, y2, tabuleiro) {
        if (tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
            if ((x1 === x2 && y1 !== y2) || (x1 !== x2 && y1 === y2)) {
                if (this.CaminhoLimpo(x1, y1, x2, y2, tabuleiro)) {
                    return true;
                }
            }
        }

        return false;
    }
}