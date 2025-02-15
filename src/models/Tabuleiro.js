import { Peca, Corp } from "./Pecas.js";
import { Rei } from "./Reis.js";
import { Rainha } from "./Rainhas.js";
import { Peao } from "./Peoes.js";
import { Cavaleiro } from "./Cavaleiros.js";
import { Bispo } from "./Bispos.js";
import { Torre } from "./Torres.js";
import { Quadrado, Corq } from "./Quadrados.js";
import { Corj } from "./Jogadores.js";

export const SituacaoJogo = {
    EmAndamento: 'EmAndamento',
    Xeque: 'Xeque',
    XequeMate: 'XequeMate',
    Encerrado: 'Encerrado'
};

export class TabuleiroXadrez {
    constructor() {
        this.tabuleiro = new Array(8);
        for (let i = 0; i < 8; i++) {
            this.tabuleiro[i] = new Array(8);
        }
        this.IniciarTabuleiro();

        this.situacao = SituacaoJogo.EmAndamento;
        this.corRei = Corp.Branco | Corp.Preto;
        this.corJogador = Corj.Branco | Corj.Preto;
    }

    IniciarTabuleiro() {
        this.PosicionarPecas(0, 0, new Torre(Corp.Branco));
        this.PosicionarPecas(0, 1, new Cavaleiro(Corp.Branco));
        this.PosicionarPecas(0, 2, new Bispo(Corp.Branco));
        this.PosicionarPecas(0, 3, new Rainha(Corp.Branco));
        this.PosicionarPecas(0, 4, new Rei(Corp.Branco));
        this.PosicionarPecas(0, 5, new Bispo(Corp.Branco));
        this.PosicionarPecas(0, 6, new Cavaleiro(Corp.Branco));
        this.PosicionarPecas(0, 7, new Torre(Corp.Branco));

        for (let i = 0; i < 8; i++) {
            this.PosicionarPecas(1, i, new Peao(Corp.Branco));
            this.PosicionarPecas(6, i, new Peao(Corp.Preto));
        }

        this.PosicionarPecas(7, 0, new Torre(Corp.Preto));
        this.PosicionarPecas(7, 1, new Cavaleiro(Corp.Preto));
        this.PosicionarPecas(7, 2, new Bispo(Corp.Preto));
        this.PosicionarPecas(7, 3, new Rainha(Corp.Preto));
        this.PosicionarPecas(7, 4, new Rei(Corp.Preto));
        this.PosicionarPecas(7, 5, new Bispo(Corp.Preto));
        this.PosicionarPecas(7, 6, new Cavaleiro(Corp.Preto));
        this.PosicionarPecas(7, 7, new Torre(Corp.Preto));
    }

    PosicionarPecas(x, y, peca) {
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            this.tabuleiro[x][y] = peca;
        }
    }

    ImprimirTabuleiro() {
        const Colunas = '  a b c d e f g h';
        console.log(Colunas);

        for (let i = 0; i < 8; i++) {
            let Linhas = (1 + i) + ' ';
            for (let j = 0; j < 8; j++) {
                const peca = this.tabuleiro[i][j];
                Linhas += (peca ? peca.toString() : new Quadrado(Corq.Preto)) + ' ';
            }
            console.log(Linhas);
        }
    }

    ChecarXeque(jogadorAtual) {
        let reiX = 0;
        let reiY = 0;
        let Pecas = [];

        if (jogadorAtual === Corj.Preto) {
            this.corRei = Corp.Branco;
        } else if (jogadorAtual === Corj.Branco) {
            this.corRei = Corp.Preto;
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const rei = this.tabuleiro[i][j];
                if (rei instanceof Rei && rei.cor === this.corRei) {
                    reiX = i;
                    reiY = j;
                    break;
                }
            }
        }
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const peca = this.tabuleiro[i][j];
                if (peca instanceof Peca && peca.cor !== this.corRei) {
                    if (this.ValidarMovimento(i, j, reiX, reiY) && this.ValidarCaptura(i, j, reiX, reiY)) {
                        Pecas.push(peca);
                    }
                }
            }
        }
        return Pecas.length > 0;
    }

    ChecarXequeMate(jogadorAtual) {
        let corReiAdversario;
        if (jogadorAtual === Corj.Preto) {
            corReiAdversario = Corp.Branco;
        } else if (jogadorAtual === Corj.Branco) {
            corReiAdversario = Corp.Preto;
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const peca = this.tabuleiro[i][j];

                if (peca instanceof Peca && peca.cor === corReiAdversario) {
                    for (let x = 0; x < 8; x++) {
                        for (let y = 0; y < 8; y++) {
                            if (this.ValidarMovimento(i, j, x, y) || this.ValidarCaptura(i, j, x, y)) {
                                const temp = this.tabuleiro[x][y];
                                this.tabuleiro[x][y] = this.tabuleiro[i][j];
                                this.tabuleiro[i][j] = temp;

                                if (!this.ChecarXeque(jogadorAtual)) {
                                    this.tabuleiro[i][j] = this.tabuleiro[x][y];
                                    this.tabuleiro[x][y] = temp;
                                    return false;
                                }

                                this.tabuleiro[i][j] = this.tabuleiro[x][y];
                                this.tabuleiro[x][y] = temp;
                            }
                        }
                    }
                }
            }
        }
        return true;
    }

    encerrarJogo() {
        this.situacao = SituacaoJogo.Encerrado;
        process.exit(0);
    }

    ValidarMovimento(x1, y1, x2, y2) {
        const peca = this.tabuleiro?.[x1]?.[y1];
        if (peca instanceof Peca) {
            return peca.MovimentosValidos(x1, y1, x2, y2, this.tabuleiro);
        }
        return false;
    }

    ValidarCaptura(x1, y1, x2, y2) {
        const peca = this.tabuleiro?.[x1]?.[y1];
        if (peca instanceof Peca) {
            return peca.Capturar(x1, y1, x2, y2, this.tabuleiro);
        }
        return false;
    }
}