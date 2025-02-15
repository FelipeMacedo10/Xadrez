import {Quadrado} from "./Quadrados";

export enum Corp {
    Branco,
    Preto
}

export abstract class Peca {
    cor: Corp;

    constructor(cor: Corp) {
        this.cor = cor;
    }

    toString(): string {
        return '';
    }

    abstract MovimentosValidos(x1: number, y1: number, x2: number, y2: number, tabuleiro: (Peca | Quadrado)[][]): boolean;

    abstract Capturar(x1: number, y1: number, x2: number, y2: number, tabuleiro: (Peca | Quadrado)[][]): boolean;

}