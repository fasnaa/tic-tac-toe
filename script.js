window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startBtn").addEventListener("click", handleStart);
  });
  
  let currentPlayer = "X";
  let board = Array(9).fill("");
  let player1, player2, totalRounds;
  let p1Score = 0;
  let p2Score = 0;
  let currentRound = 1;
  
  function handleStart() {
    const p1 = document.getElementById("player1").value.trim();
    const p2 = document.getElementById("player2").value.trim();
    const rounds = parseInt(document.getElementById("rounds").value);
    const errorEl = document.getElementById("error");
  
    if (!p1 || !p2) {
      errorEl.textContent = "Please enter both player names.";
      return;
    }
  
    if (!rounds || rounds < 1 || rounds % 2 === 0) {
      errorEl.textContent = "Please enter a valid odd number of rounds.";
      return;
    }
  
    errorEl.textContent = "";
    document.getElementById("setup").classList.add("hidden");
    document.getElementById("board").classList.remove("hidden");
  
    startGame(p1, p2, rounds);
  }
  
  function startGame(p1, p2, rounds) {
    player1 = p1;
    player2 = p2;
    totalRounds = rounds;
    updateScoreboard();
    renderBoard();
  }
  
  function renderBoard() {
    const boardEl = document.getElementById("gameboard");
    boardEl.innerHTML = "";
  
    board.forEach((cell, index) => {
      const cellEl = document.createElement("div");
      cellEl.className = "cell";
      cellEl.textContent = cell;
      cellEl.addEventListener("click", () => handleMove(index));
      boardEl.appendChild(cellEl);
    });
  }
  
  function handleMove(index) {
    if (board[index] !== "") return;
    board[index] = currentPlayer;
    renderBoard();
  
    if (checkWin(currentPlayer)) {
      handleWin(currentPlayer);
    } else if (board.every(cell => cell !== "")) {
      handleDraw();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
  
  function checkWin(player) {
    const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6]          // diagonals
    ];
    return winPatterns.some(pattern =>
      pattern.every(index => board[index] === player)
    );
  }
  
  function handleWin(player) {
    if (player === "X") {
      p1Score++;
    } else {
      p2Score++;
    }
  
    alert(`${player === "X" ? player1 : player2} wins this round!`);
    nextRound();
  }
  
  function handleDraw() {
    alert("It's a draw!");
    nextRound();
  }
  
  function nextRound() {
    currentRound++;
    if (currentRound > totalRounds) {
      endGame();
    } else {
      board = Array(9).fill("");
      currentPlayer = "X";
      updateScoreboard();
      renderBoard();
    }
  }
  
  function updateScoreboard() {
    document.getElementById("p1Score").textContent = `${player1} (X): ${p1Score}`;
    document.getElementById("p2Score").textContent = `${player2} (O): ${p2Score}`;
    document.getElementById("roundInfo").textContent = `Round: ${currentRound} of ${totalRounds}`;
  }
  
  function endGame() {
    let result = "";
    if (p1Score > p2Score) result = `🎉 ${player1} wins the game!`;
    else if (p2Score > p1Score) result = `🎉 ${player2} wins the game!`;
    else result = "🤝 It's a draw!";
  
    setTimeout(() => {
      const again = confirm(`${result}\n\nPlay again with same settings?`);
      if (again) {
        // Reset but keep players and rounds
        currentRound = 1;
        p1Score = 0;
        p2Score = 0;
        board = Array(9).fill("");
        currentPlayer = "X";
        updateScoreboard();
        renderBoard();
      } else {
        // Full reset
        resetGame();
      }
    }, 100);
  }
  
  function resetGame() {
    p1Score = 0;
    p2Score = 0;
    currentRound = 1;
    board = Array(9).fill("");
    currentPlayer = "X";
  
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
    document.getElementById("rounds").value = "";
    document.getElementById("setup").classList.remove("hidden");
    document.getElementById("board").classList.add("hidden");
  }
  