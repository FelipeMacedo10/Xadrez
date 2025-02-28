import {Peca, Corp} from "./Pecas";
import {Quadrado} from "./Quadrados";

export class Rainha extends Peca {
    toString(): string {
        return this.cor === Corp.Preto ? '♕' : '♛';
    }

    constructor(cor: Corp) {
        super(cor);
    }

    MovimentosValidos(x1: number, y1: number, x2: number, y2: number, tabuleiro: (Peca | Quadrado)[][]): boolean {
        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);

        if ((x1 === x2 || y1 === y2 || dx === dy)) {
            if (this.CaminhoLimpo(x1, y1, x2, y2, tabuleiro)) {
                if (!(tabuleiro[x2][y2] instanceof Peca) || tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
                    return true;
                }
            }
        }

        return false;
    }

    CaminhoLimpo(x1: number, y1: number, x2: number, y2: number, tabuleiro: (Peca | Quadrado)[][]): boolean {
    
        const dx = x2 - x1;
        const dy = y2 - y1;
    
        const incrementoX = dx > 0 ? 1 : -1;
        const incrementoY = dy > 0 ? 1 : -1;
    
        let x = x1 + incrementoX;
        let y = y1 + incrementoY;
    
        while (x !== x2 && y !== y2) {
            if (x < 0 || x >= tabuleiro.length || y < 0 || y >= tabuleiro[0].length) {
                return false;
            }
    
            if (tabuleiro[x][y] instanceof Peca) {
                return false;
            }
            x += incrementoX;
            y += incrementoY;
        }
        if (x1 === x2) {
            const minY = Math.min(y1, y2);
            const maxY = Math.max(y1, y2);
            for (let y = minY + 1; y < maxY; y++) {
                if (tabuleiro[x1][y] instanceof Peca) {
                    return false;
                }
            }
        } else if (y1 === y2) {
            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);
            for (let x = minX + 1; x < maxX; x++) {
                if (tabuleiro[x][y1] instanceof Peca) {
                    return false;
                }
            }
        }
    
        return true;
    }    

    Capturar (x1: number, y1: number, x2: number, y2: number, tabuleiro: (Peca | Quadrado)[][]): boolean {

        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);

        if ((x1 === x2 || y1 === y2 || dx === dy)) {
            if (this.CaminhoLimpo(x1, y1, x2, y2, tabuleiro)) {
                if (tabuleiro[x2][y2] instanceof Peca && tabuleiro[x2][y2].cor !== this.cor) {
                    return true;
                }
            }
        }

        return false;
    }
}