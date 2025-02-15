export enum Corq {
    Preto
}

export class Quadrado{
    toString(): string {
        return this.cor === Corq.Preto ? '□' : '□';
    }

    cor: Corq;

    constructor(cor: Corq) {
        this.cor = cor;
    }
}