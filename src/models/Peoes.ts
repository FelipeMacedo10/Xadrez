import {Peca, Corp} from "./Pecas";
import {Quadrado} from "./Quadrados";

export class Peao extends Peca {
    toString(): string {
        return this.cor === Corp.Preto ? '♙' : '♟';
    }

    foiMovido: boolean;

    constructor(cor: Corp) {
        super(cor);
        this.foiMovido = false;
    }

    MovimentosValidos(x1: number, y1: number, x2: number, y2: number, tabuleiro: (Peca | Quadrado)[][]): boolean {
        const direçãoFrente = this.cor === Corp.Branco ? 1 : -1;

        if (x2 === x1 + direçãoFrente && y2 === y1 && !(tabuleiro[x2][y2] instanceof Peca)) {
            return true;
        }

        if (!this.foiMovido && x2 === x1 + 2 * direçãoFrente && y2 === y1 && !(tabuleiro[x2][y2] instanceof Peca)) {
            return true;
        }

        if (x2 === x1 + direçãoFrente && (y2 === y1 - 1 || y2 === y1 + 1) && tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
            return true;
        }

        return false;
    }

    Capturar (x1: number, y1: number, x2: number, y2: number, tabuleiro: (Peca | Quadrado)[][]): boolean {

        const direçãoFrente = this.cor === Corp.Branco ? 1 : -1;

        if (x2 === x1 + direçãoFrente && (y2 === y1 - 1 || y2 === y1 + 1) && tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
            return true;
        }

        return false;
    }
}