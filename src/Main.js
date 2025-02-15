import { TabuleiroXadrez, SituacaoJogo } from "./models/Tabuleiro.js";
import { Jogador, Corj } from "./models/Jogadores.js";
import { Corp, Peca } from "./models/Pecas.js";
import { Quadrado, Corq } from "./models/Quadrados.js";
import { Peao } from "./models/Peoes.js";


const tabuleiroHTML = document.getElementById('tabuleiro');
const msg = document.getElementById('alerta');

msg.innerHTML = "Jogador 1 joga com as peças brancas e Jogador 2 joga com as peças pretas.";

class Jogo {
    constructor(jogador1Nome, jogador2Nome) {
        this.tabuleiroXadrez = new TabuleiroXadrez();
        this.jogador1 = new Jogador(jogador1Nome, Corj.Branco);
        this.jogador2 = new Jogador(jogador2Nome, Corj.Preto);
        this.jogadorAtual = this.jogador1;
        this.selecionado = null;
        this.renderizarTabuleiro();
    }

    renderizarTabuleiro() {
        if (tabuleiroHTML) {
            tabuleiroHTML.innerHTML = '';

            for (let i = 0; i < 8; i++) {
                const row = document.createElement('div');
                row.classList.add('row');

                for (let j = 0; j < 8; j++) {
                    const square = document.createElement('div');
                    square.dataset.linha = i;
                    square.dataset.coluna = j;

                    const pecaOuQuadrado = this.tabuleiroXadrez.tabuleiro[i][j];
                    const cor = (i + j) % 2 === 0 ? 'white' : 'black';
                    square.className = cor;
                    square.classList.add('square');

                    if (pecaOuQuadrado instanceof Peca) {
                        square.innerHTML = pecaOuQuadrado.toString();
                    } else {
                        square.innerHTML = '&nbsp;';
                    }

                    square.addEventListener('click', this.selecionarOuMoverPeca.bind(this));
                    row.appendChild(square);
                }
                tabuleiroHTML.appendChild(row);
            }
        } else {
            msg.innerHTML = "Elemento 'tabuleiro' não encontrado.";
        }
    }

    selecionarOuMoverPeca(event) {
        const linha = parseInt(event.target.dataset.linha, 10);
        const coluna = parseInt(event.target.dataset.coluna, 10);

        if (this.selecionado) {
            const [linhaI, colunaI] = this.selecionado;

            const [linhaF, colunaF] = [linha, coluna];
            const posicoes = this.jogadorAtual.organizarValores(linhaI, colunaI, linhaF, colunaF);

            const movimentoValido = this.tabuleiroXadrez.ValidarMovimento(...posicoes);
            const capturaValida = this.tabuleiroXadrez.ValidarCaptura(...posicoes);

            const espacoI = this.tabuleiroXadrez.tabuleiro[linhaI][colunaI];
            const espacoF = this.tabuleiroXadrez.tabuleiro[linhaF][colunaF];

            let corJogador;
            if (this.jogadorAtual.cor === Corj.Preto) {
                corJogador = Corj.Branco;
            } else {
                corJogador = Corj.Preto;
            }

            if (this.tabuleiroXadrez.ChecarXeque(corJogador)) {
                this.tabuleiroXadrez.tabuleiro[linhaI][colunaI] = espacoF;
                this.tabuleiroXadrez.tabuleiro[linhaF][colunaF] = espacoI;
                if (this.tabuleiroXadrez.ChecarXeque(corJogador)) {
                    this.tabuleiroXadrez.tabuleiro[linhaI][colunaI] = espacoI;
                    this.tabuleiroXadrez.tabuleiro[linhaF][colunaF] = espacoF;
                    msg.innerHTML = "Movimento inválido. Tente novamente.";
                    return;
                } else if (!this.tabuleiroXadrez.ChecarXeque(corJogador)) {
                    this.tabuleiroXadrez.tabuleiro[linhaI][colunaI] = espacoI;
                    this.tabuleiroXadrez.tabuleiro[linhaF][colunaF] = espacoF;
                }
            }

            if (!movimentoValido || (this.jogadorAtual === this.jogador1 && espacoI.cor === Corp.Preto) || (this.jogadorAtual === this.jogador2 && espacoI.cor === Corp.Branco)) {
                msg.innerHTML = "Movimento inválido. Tente novamente.";
                return;
            }

            if (movimentoValido) {
                if (espacoI instanceof Peao) {
                    espacoI.foiMovido = true;
                }
                this.tabuleiroXadrez.tabuleiro[linhaF][colunaF] = espacoI;
                this.tabuleiroXadrez.tabuleiro[linhaI][colunaI] = espacoF;
                if (capturaValida) {
                    this.tabuleiroXadrez.tabuleiro[linhaI][colunaI] = new Quadrado(Corq.Preto);
                }
                if (this.tabuleiroXadrez.ChecarXeque(this.jogadorAtual.cor)) {
                    this.tabuleiroXadrez.situacao = SituacaoJogo.Xeque;
                    msg.innerHTML = "Xeque!";
                    if (this.jogadorAtual.cor === Corj.Branco && this.tabuleiroXadrez.ChecarXequeMate(this.jogadorAtual.cor)) {
                        this.tabuleiroXadrez.situacao = SituacaoJogo.XequeMate;
                        this.renderizarTabuleiro();
                        tabuleiroHTML.innerHTML = "O jogador 1 ganhou!";
                        this.tabuleiroXadrez.encerrarJogo();
                    }
                    if (this.jogadorAtual.cor === Corj.Preto && this.tabuleiroXadrez.ChecarXequeMate(this.jogadorAtual.cor)) {
                        this.tabuleiroXadrez.situacao = SituacaoJogo.XequeMate;
                        this.renderizarTabuleiro();
                        tabuleiroHTML.innerHTML = "O jogador 2 ganhou!";
                        this.tabuleiroXadrez.encerrarJogo();
                    }
                }
                this.jogadorAtual = this.jogadorAtual === this.jogador1 ? this.jogador2 : this.jogador1;
            }

            this.selecionado = null;
            this.renderizarTabuleiro();
        } else {
            const peca = this.tabuleiroXadrez.tabuleiro[linha][coluna];
            if (peca instanceof Peca && peca.cor === this.jogadorAtual.cor) {
                this.selecionado = [linha, coluna];
            }
        }
    }
}

const jogo = new Jogo("Jogador 1", "Jogador 2");
window.onload = () => {
    jogo.renderizarTabuleiro();
};