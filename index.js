function non_attacking_queens() {
  const board = [];
  const cols = 9;
  for (let row = 0; row < cols; row++) {
    board[row] = [];
    for (let col = 1; col < cols; col++) {
      board[row][col] = 0;
    }
  }
  //random at first row
  const col1 = Math.floor(Math.random() * 8) + 1;
  console.log(col1);
  board[1][col1] = 1;
  //random at first row ./
  function checked(row, col) {
    //   for (let i = 1; i <= row - 1; i++) {
    //     if (board[i][col] == 1) return true;
    //   }
    //   for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    //     if (board[i][j] == 1) return true;
    //   }
    //   for (let i = row - 1, j = col + 1; i >= 0 && j < cols; i--, j++) {
    //     if (board[i][j] == 1) return true;
    //   }
    //   return false;
    for (let i = 1; i < row; i++) {
      for (j = 1; j < cols; j++) {
        if (board[i][j] == 1) {
          if (j == col) return true;
          if (Math.abs(col - j) == row - i) return true;
        }
      }
    }
    return false;
  }
  function drawQueen(row) {
    for (let i = 1; i < cols; i++) {
      if (!checked(row, i)) {
        board[row][i] = 1;
        if (row == 8) return true;
        if (drawQueen(row + 1)) return true;
        board[row][i] = 0;
      }
    }
    return false;
  }
  drawQueen(2);
  console.log(board);
  board.forEach((row) => {
    row.splice(0, 1);
  });
  board.splice(0, 1);

  return board;
}
const button = document.querySelector('.btn');
const caros = document.querySelectorAll('.caro');
caros.forEach((caro, index) => {
  caro.dataset.row = Math.floor(index / 8) + 1;
  caro.dataset.column = (index + 1) % 8 ? (index + 1) % 8 : 8;
  caro.innerHTML = `<i class="fas fa-chess-queen"></i>`;
});

button.addEventListener('click', (event) => {
  event.preventDefault();
  const board = non_attacking_queens();
  // console.log(board);
  caros.forEach((caro) => {
    caro.children[0].classList.remove('display');
    const row = caro.dataset.row - 1;
    const col = caro.dataset.column - 1;
    if (board[row][col] == 1) {
      caro.children[0].classList.add('display');
    }
  });
});
