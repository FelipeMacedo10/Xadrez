import {Peca, Corp} from "./Pecas";
import {Quadrado} from "./Quadrados";

export class Cavaleiro extends Peca {
    toString(): string {
        return this.cor === Corp.Preto ? '♘' : '♞';
    }

    constructor(cor: Corp) {
        super(cor);
    }

    MovimentosValidos(x1: number, y1: number, x2: number, y2: number, tabuleiro: (Peca | Quadrado)[][]): boolean {
        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);

        if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
            if (!(tabuleiro[x2][y2] instanceof Peca) || tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
                return true;
            }
        }

        return false;
    }
    Capturar (x1: number, y1: number, x2: number, y2: number, tabuleiro: (Peca | Quadrado)[][]): boolean {

        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);

        if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
            if (tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
                return true;
            }
        }
        return false;
    }
}