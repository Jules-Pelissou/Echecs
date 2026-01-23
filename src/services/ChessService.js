export default class ChessService {
    constructor() {
        this.history = []
        this.board = []
        this.initBoard()
    }

    initBoard() {
        const pieces = [
            "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜",
            "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "",
            "♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙",
            "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"
        ]

        this.board = pieces.map((piece, index) => ({
            piece,
            position: index, // 0 → 63
            color: (Math.floor(index / 8) + index) % 2 === 0
                ? "white"
                : "black"
        }))
    }

    getBoard() {
        return this.board
    }

    movePiece(fromIndex, toIndex) {
        const piece = this.board[fromIndex].piece
        if (!piece) return

        // Historique
        this.history.push({
            piece,
            from: fromIndex,
            to: toIndex,
            date: new Date()
        })

        // Déplacement
        this.board[toIndex].piece = piece
        this.board[fromIndex].piece = ""
    }

    getHistory() {
        return this.history
    }

    getPiecePosition(index) {
        return this.board[index]
    }
}
