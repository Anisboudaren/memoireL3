let doors = ["lose", "lose", "lose"];
let open = [" - ", " - ", " - "];
let UserChoice, hostChoice;
let score = 0;
function rand() {
  return Math.floor(Math.random() * doors.length);
}
function setWinningDoor(doors) {
  doors[rand()] = "win";
}
function pickDoor(i) {
  UserChoice = i;
}
function openDoor(i) {
  open[i] = doors[i];
}
function playRound() {
  while (true) {
    hostChoice = rand();
    if (doors[hostChoice] == "lose" && hostChoice != UserChoice) {
      openDoor(hostChoice);
      break;
    }
  }
}
function changeChoice() {
  while (true) {
    let r = rand();
    if (r != hostChoice && r != UserChoice) {
      UserChoice = r;
      break;
    }
  }
}

function checkWin() {
  if (doors[UserChoice] == "win") {
    score++;
  }
}
function resetGame() {
  doors = ["lose", "lose", "lose"];
  open = [" - ", " - ", " - "];
  UserChoice, hostChoice;
}
function game(mode) {
  setWinningDoor(doors);
  pickDoor(rand());
  playRound();
  //console.log(UserChoice);
  if (mode) changeChoice();
  //console.log(UserChoice);
  checkWin();
  resetGame();
}
for (let i = 0; i < 10000000; i++) {
  game(true);
}

console.log("from 100 games the user won :" + score);
