export const Corj = {
    Branco: 'Branco',
    Preto: 'Preto'
};

export class Jogador {
    constructor(nome, cor) {
        this.nome = nome;
        this.cor = cor;
    }

    organizarValores(linhaI, colunaI, linhaF, colunaF) {
        return [linhaI, colunaI, linhaF, colunaF];
    }
}