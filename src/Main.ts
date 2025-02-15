import { TabuleiroXadrez, SituacaoJogo } from "./models/Tabuleiro";
import { Jogador, Corj } from "./models/Jogadores";
import { Corp } from "./models/Pecas";
import { Quadrado, Corq } from "./models/Quadrados";
import { Peao } from "./models/Peoes";

console.log("Jogador 1 joga com as peças brancas.");
console.log("Jogador 2 joga com as peças pretas.");

class Jogo {
    tabuleiroXadrez: TabuleiroXadrez;
    jogador1: Jogador;
    jogador2: Jogador;
    jogadorAtual: Jogador;

    constructor(jogador1Nome: string, jogador2Nome: string) {
        this.tabuleiroXadrez = new TabuleiroXadrez();
        this.jogador1 = new Jogador(jogador1Nome, Corj.Branco);
        this.jogador2 = new Jogador(jogador2Nome, Corj.Preto);
        this.jogadorAtual = this.jogador1;
    }

    async jogar() {
        while (true) {
            this.tabuleiroXadrez.ImprimirTabuleiro();
            
            const [linhaI, colunaI, linhaF, colunaF] = await this.jogadorAtual.PerguntarJogador();
    
            const espacoI = this.tabuleiroXadrez?.tabuleiro?.[linhaI]?.[colunaI];
            const espacoF = this.tabuleiroXadrez?.tabuleiro?.[linhaF]?.[colunaF];

            const movimentoValido = this.tabuleiroXadrez.ValidarMovimento(linhaI, colunaI, linhaF, colunaF);
            const capturaValida = this.tabuleiroXadrez.ValidarCaptura(linhaI, colunaI, linhaF, colunaF);

            let corJogador: Corj;
            if (this.jogadorAtual.cor === Corj.Preto){
                corJogador = Corj.Branco;
            } else {
                corJogador = Corj.Preto;
            }

            if (this.tabuleiroXadrez.ChecarXeque(corJogador)) {
                this.tabuleiroXadrez.tabuleiro[linhaI][colunaI] = espacoF;
                this.tabuleiroXadrez.tabuleiro[linhaF][colunaF] = espacoI;
                if(this.tabuleiroXadrez.ChecarXeque(corJogador)){
                    this.tabuleiroXadrez.tabuleiro[linhaI][colunaI] = espacoI;
                    this.tabuleiroXadrez.tabuleiro[linhaF][colunaF] = espacoF;
                    console.log("Movimento inválido. Tente novamente.");
                    continue;
                } else if(!this.tabuleiroXadrez.ChecarXeque(corJogador)){
                    this.tabuleiroXadrez.tabuleiro[linhaI][colunaI] = espacoI;
                    this.tabuleiroXadrez.tabuleiro[linhaF][colunaF] = espacoF;
                }
            }

            if (!movimentoValido || this.jogadorAtual === this.jogador1 && espacoI.cor === Corp.Preto || this.jogadorAtual === this.jogador2 && espacoI.cor === Corp.Branco) {
                console.log("Movimento inválido. Tente novamente.");
                continue;
            }

            if (movimentoValido) {
                if(espacoI instanceof Peao){
                    espacoI.foiMovido = true;
                }
                this.tabuleiroXadrez.tabuleiro[linhaI][colunaI] = espacoF;
                this.tabuleiroXadrez.tabuleiro[linhaF][colunaF] = espacoI;
                if(capturaValida) {
                    this.tabuleiroXadrez.tabuleiro[linhaI][colunaI] = new Quadrado(Corq.Preto);
                }
                if (this.tabuleiroXadrez.ChecarXeque(this.jogadorAtual.cor)) {
                    this.tabuleiroXadrez.situacao = SituacaoJogo.Xeque;
                    console.log("Xeque!");
                    if (this.jogadorAtual.cor === Corj.Branco && this.tabuleiroXadrez.ChecarXequeMate(this.jogadorAtual.cor)) {
                        this.tabuleiroXadrez.situacao = SituacaoJogo.XequeMate;
                        this.tabuleiroXadrez.ImprimirTabuleiro();
                        console.log("O jogador 1 ganhou!");
                        this.tabuleiroXadrez.encerrarJogo();
                    }
                    if (this.jogadorAtual.cor === Corj.Preto && this.tabuleiroXadrez.ChecarXequeMate(this.jogadorAtual.cor)) {
                        this.tabuleiroXadrez.situacao = SituacaoJogo.XequeMate;
                        this.tabuleiroXadrez.ImprimirTabuleiro();
                        console.log("O jogador 2 ganhou!");
                        this.tabuleiroXadrez.encerrarJogo();
                    }
                }
                this.jogadorAtual = this.jogadorAtual === this.jogador1 ? this.jogador2 : this.jogador1;
            }
        }
    } 
}

const jogo = new Jogo("Jogador 1", "Jogador 2");
jogo.jogar();