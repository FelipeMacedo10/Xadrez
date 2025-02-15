export const Corq = {
    Preto: 'Preto'
};

export class Quadrado {
    toString() {
        return this.cor === Corq.Preto ? '□' : '□';
    }

    constructor(cor) {
        this.cor = cor;
    }
}