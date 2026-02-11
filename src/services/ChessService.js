import { Chess } from 'chess.js'

export default class ChessService {
    constructor() {
        this.chess = new Chess()
        this.history = []
    }

    getBoard() {
        const board = this.chess.board()

        // Convertit le format chess.js vers notre format UI
        return board.flat().map((square, index) => {
            let pieceSymbol = ""

            if (square) {
                pieceSymbol = this.getUnicodePiece(square)
            }

            return {
                piece: pieceSymbol,
                position: index,
                color: (Math.floor(index / 8) + index) % 2 === 0
                    ? "white"
                    : "black"
            }
        })
    }

    movePiece(fromIndex, toIndex) {
        const from = this.indexToSquare(fromIndex)
        const to = this.indexToSquare(toIndex)

        const move = this.chess.move({
            from,
            to,
            promotion: 'q' // promotion automatique en dame
        })

        if (move) {
            this.history.push(move)
            return true
        }

        return false
    }

    getHistory() {
        return this.history
    }

    getTurn() {
        return this.chess.turn() // 'w' ou 'b'
    }

    isGameOver() {
        return this.chess.isGameOver()
    }

    indexToSquare(index) {
        const file = "abcdefgh"[index % 8]
        const rank = 8 - Math.floor(index / 8)
        return file + rank
    }

    getUnicodePiece(square) {
        const map = {
            p: { w: "♙", b: "♟" },
            r: { w: "♖", b: "♜" },
            n: { w: "♘", b: "♞" },
            b: { w: "♗", b: "♝" },
            q: { w: "♕", b: "♛" },
            k: { w: "♔", b: "♚" }
        }

        return map[square.type][square.color]
    }
}
