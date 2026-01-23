<template>
  <div class="container">
    <div class="board">
      <div
        v-for="(square, index) in board"
        :key="index"
        class="square"
        :class="square.color"
        @click="handleClick(index)"
      >
        <span class="piece">{{ square.piece }}</span>
      </div>
    </div>

    <div class="history">
      <h3>Historique des déplacements</h3>
      <ul>
        <li v-for="(move, i) in history" :key="i">
          {{ move.piece }} : {{ move.from }} → {{ move.to }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ChessService from "../services/ChessService"

export default {
  name: "ChessBoard",

  data() {
    return {
      chessService: null,
      board: [],
      history: [],
      selectedIndex: null
    }
  },

  created() {
    this.chessService = new ChessService()
    this.board = this.chessService.getBoard()
    this.history = this.chessService.getHistory()
  },

  methods: {
    handleClick(index) {
      if (this.selectedIndex === null) {
        if (this.board[index].piece !== "") {
          this.selectedIndex = index
        }
      } else {
        this.chessService.movePiece(this.selectedIndex, index)
        this.selectedIndex = null
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  gap: 40px;
}

.board {
  display: grid;
  grid-template-columns: repeat(8, 80px);
  grid-template-rows: repeat(8, 80px);
  border: 2px solid #333;
}

.square {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 42px;
  cursor: pointer;
}

.white {
  background-color: #f0d9b5;
}

.black {
  background-color: #b58863;
}

.piece {
  user-select: none;
}

.history {
  max-height: 640px;
  overflow-y: auto;
  font-family: monospace;
}

.history h3 {
  margin-bottom: 10px;
}
</style>
