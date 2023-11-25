document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    let selectedPiece = null;
  
    // Початковий стан шахової дошки
    const initialBoard = [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      Array(8).fill(''),
      Array(8).fill(''),
      Array(8).fill(''),
      Array(8).fill(''),
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];
  
    // Функція для створення шахової дошки
    function createBoard() {
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const square = document.createElement('div');
          // Клас для квадрату відповідно до його кольору
          square.className = (row + col) % 2 === 0 ? 'square white' : 'square black';
          square.dataset.row = row;
          square.dataset.col = col;
  
          // Фiгура (текст) на квадраті відповідно до початкового стану гри
          square.textContent = initialBoard[row][col];
  
          square.addEventListener('click', handleSquareClick);
          board.appendChild(square);
        }
      }
    }
  
    // Функція для обробки кліку по квадрату
    function handleSquareClick(event) {
      const clickedSquare = event.target;
      const clickedRow = parseInt(clickedSquare.dataset.row);
      const clickedCol = parseInt(clickedSquare.dataset.col);
  
      if (selectedPiece) {
        // Якщо фігура вже обрана, намагаємося виконати хід
        if (isValidMove(selectedPiece.row, selectedPiece.col, clickedRow, clickedCol)) {
          movePiece(selectedPiece.row, selectedPiece.col, clickedRow, clickedCol);
        }
        selectedPiece = null;
      } else {
        // Якщо фігура ще не обрана, обираємо фігуру на клітинці
        const piece = initialBoard[clickedRow][clickedCol];
        if (piece !== '') {
          selectedPiece = { row: clickedRow, col: clickedCol };
        }
      }
    }
  
    // Функція для виконання ходу фігурою
    function movePiece(startRow, startCol, endRow, endCol) {
      initialBoard[endRow][endCol] = initialBoard[startRow][startCol];
      initialBoard[startRow][startCol] = '';
      renderBoard();
    }
  
    // Функція для перевірки допустимості ходу
    function isValidMove(startRow, startCol, endRow, endCol) {
      const piece = initialBoard[startRow][startCol];
      const targetPiece = initialBoard[endRow][endCol];
  
      // Перевірка чи шлях вільний для лад'ї чи ферзя
      if (piece.toLowerCase() === 'r' || piece.toLowerCase() === 'q') {
        if (!isPathClearRook(startRow, startCol, endRow, endCol)) {
          console.log('Шлях зайнятий');
          return false;
        }
      }
  
      // Перевірка чи на кінцевій клітинці знаходиться власна фігура
      if (targetPiece !== '' && piece.toLowerCase() === targetPiece.toLowerCase()) {
        console.log('На кінцевій клітинці вже стоїть власна фігура');
        return false;
      }
  
      return true;
    }
  
    // Функція для перевірки вільності шляху для лад'ї
    function isPathClearRook(startRow, startCol, endRow, endCol) {
      // Горизонтальний рух
      if (startRow === endRow) {
        const step = startCol < endCol ? 1 : -1;
        for (let col = startCol + step; col !== endCol; col += step) {
          if (initialBoard[startRow][col] !== '') {
            return false;
          }
        }
      }
      // Вертикальний рух
      else if (startCol === endCol) {
        const step = startRow < endRow ? 1 : -1;
        for (let row = startRow + step; row !== endRow; row += step) {
          if (initialBoard[row][startCol] !== '') {
            return false;
          }
        }
      }
  
      return true;
    }

  
    // Функція для переоформлення дошки
    function renderBoard() {
      const squares = document.querySelectorAll('.square');
      squares.forEach((square, index) => {
        const row = Math.floor(index / 8);
        const col = index % 8;
        square.textContent = initialBoard[row][col];
      });
    }
  
    // Ініціалізація дошки при завантаженні сторінки
    createBoard();
  });
  