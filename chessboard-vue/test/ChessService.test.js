import { describe, it, expect, beforeEach } from "vitest"
import ChessService from "../src/services/ChessService"

describe("ChessService", () => {
  let chessService

  beforeEach(() => {
    chessService = new ChessService()
  })

  it("initialise un plateau de 64 cases", () => {
    const board = chessService.getBoard()
    expect(board.length).toBe(64)
  })

  it("place correctement les pièces au démarrage", () => {
    const board = chessService.getBoard()
    expect(board[0].piece).toBe("♜")   // tour noire
    expect(board[4].piece).toBe("♚")   // roi noir
    expect(board[60].piece).toBe("♔")  // roi blanc
  })

  it("déplace une pièce d'une case à une autre", () => {
    chessService.movePiece(52, 36) // pion blanc

    const board = chessService.getBoard()
    expect(board[36].piece).toBe("♙")
    expect(board[52].piece).toBe("")
  })

  it("enregistre un déplacement dans l'historique", () => {
    chessService.movePiece(52, 36)

    const history = chessService.getHistory()
    expect(history.length).toBe(1)
    expect(history[0]).toMatchObject({
      piece: "♙",
      from: 52,
      to: 36
    })
  })

  it("n'enregistre rien si on tente de déplacer une case vide", () => {
    chessService.movePiece(20, 28)

    const history = chessService.getHistory()
    expect(history.length).toBe(0)
  })

  it("permet d'accéder à une case précise", () => {
    const square = chessService.getPiecePosition(0)
    expect(square.piece).toBe("♜")
    expect(square.position).toBe(0)
  })
})
