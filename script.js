window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startBtn").addEventListener("click", handleStart);
  });
  
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

    function startGame(p1, p2, rounds) {  
        console.log(`Starting game between ${p1} and ${p2} for ${rounds} rounds.`);

}
}