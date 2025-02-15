import * as readlineSync from 'readline-sync';

export enum Corj {
    Branco,
    Preto
}

export class Jogador {
    nome: string;
    cor: Corj;

    constructor(nome: string, cor: Corj) {
        this.nome = nome;
        this.cor = cor;
    }

    async PerguntarJogador(): Promise<number[]> {
        const PosiçãoI: string = readlineSync.question(`${this.nome}, digite a posicao da peca que deseja mover (Ex: b2): `);
        const PosiçãoF: string = readlineSync.question(`Digite a posicao de destino para onde deseja mover a peca (Ex: b3): `);

        const formatoVálido = /^[a-h][1-8]$/;
        if (!formatoVálido.test(PosiçãoI) || !formatoVálido.test(PosiçãoF)) {
            console.log("Entrada inválida. Use o formato correto (Ex: a1).");
            return [];
        }

        const letraProcurada: { [key: string]: number } = {
            'a': 1,
            'b': 2,
            'c': 3,
            'd': 4,
            'e': 5,
            'f': 6,
            'g': 7,
            'h': 8
        };

        function encontrarLetra(texto: string, letraProcurada: { [key: string]: number }): number {
            texto = texto.toLowerCase();
            return letraProcurada[texto];
        }

        const colunaI = encontrarLetra(PosiçãoI.charAt(0), letraProcurada);
        const linhaI = parseInt(PosiçãoI.charAt(1), 10);

        const colunaF = encontrarLetra(PosiçãoF.charAt(0), letraProcurada);
        const linhaF = parseInt(PosiçãoF.charAt(1), 10);
        return [linhaI-1, colunaI-1, linhaF-1, colunaF-1];
    }
}