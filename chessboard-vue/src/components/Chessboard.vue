<template>
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
</template>

<script>
export default {
  data() {
    return {
      board: [],
      selectedIndex: null
    }
  },

  created() {
    this.initBoard()
  },

  methods: {
    initBoard() {
      const pieces = [
        "♜","♞","♝","♛","♚","♝","♞","♜",
        "♟","♟","♟","♟","♟","♟","♟","♟",
        "","","","","","","","",
        "","","","","","","","",
        "","","","","","","","",
        "","","","","","","","",
        "♙","♙","♙","♙","♙","♙","♙","♙",
        "♖","♘","♗","♕","♔","♗","♘","♖"
      ]

      this.board = pieces.map((piece, index) => ({
        piece,
        color: (Math.floor(index / 8) + index) % 2 === 0
          ? "white"
          : "black"
      }))
    },

    handleClick(index) {
      if (this.selectedIndex === null) {
        if (this.board[index].piece !== "") {
          this.selectedIndex = index
        }
      } else {
        this.board[index].piece = this.board[this.selectedIndex].piece
        this.board[this.selectedIndex].piece = ""
        this.selectedIndex = null
      }
    }
  }
}
</script>

<style scoped>
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
</style>
