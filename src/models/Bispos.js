import { Peca, Corp } from "./Pecas.js";
import { Quadrado } from "./Quadrados.js";

export class Bispo extends Peca {
    toString() {
        return this.cor === Corp.Preto ? '♝' : '♗';
    }

    constructor(cor) {
        super(cor);
    }

    MovimentosValidos(x1, y1, x2, y2, tabuleiro) {
        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);

        if (dx === dy) {
            if (this.CaminhoLimpo(x1, y1, x2, y2, tabuleiro)) {
                if (!(tabuleiro[x2][y2] instanceof Peca) || tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
                    return true;
                }
            }
        }

        return false;
    }

    CaminhoLimpo(x1, y1, x2, y2, tabuleiro) {
        const dx = x2 - x1;
        const dy = y2 - y1;

        const incrementoX = dx > 0 ? 1 : -1;
        const incrementoY = dy > 0 ? 1 : -1;

        let x = x1 + incrementoX;
        let y = y1 + incrementoY;

        while (x !== x2 && y !== y2) {
            if (x < 0 || x >= tabuleiro.length || y < 0 || y >= tabuleiro[0].length) {
                return false;
            }

            if (tabuleiro[x][y] instanceof Peca) {
                return false;
            }
            x += incrementoX;
            y += incrementoY;
        }
        return true;
    }

    Capturar(x1, y1, x2, y2, tabuleiro) {
        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);

        if (dx === dy) {
            if (this.CaminhoLimpo(x1, y1, x2, y2, tabuleiro)) {
                if (tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
                    return true;
                }
            }
        }

        return false;
    }
}
