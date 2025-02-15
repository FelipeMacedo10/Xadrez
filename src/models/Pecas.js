import { Quadrado } from "./Quadrados.js";

export const Corp = {
    Branco: 'Branco',
    Preto: 'Preto'
};

export class Peca {
    constructor(cor) {
        this.cor = cor;
    }

    toString() {
        return '';
    }

    MovimentosValidos(x1, y1, x2, y2, tabuleiro) {
        throw new Error("Método abstrato 'MovimentosValidos' deve ser implementado");
    }

    Capturar(x1, y1, x2, y2, tabuleiro) {
        throw new Error("Método abstrato 'Capturar' deve ser implementado");
    }
}