// Vi skapar två spelare, extra uppgift blir att göra det möjligt att spela mot dator.
// Skapa en boll som ska studsa tillbaka när det blir collision mellan spelare och boll
// Åker bollen ut ur canvas, har man förlorat
// Bollens hastighet ökar efter collissions, alltså blir spelet svårare beroende på hur många gånger bollen studsar.
// 1 collission = 1 poäng
// Bollen kan endast åka ut på kortsidorna, och inte på långsidorna av canvas.
// Poäng och spelarnas namn sparar i local storage.
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let snowball = document.getElementById("snowball");
let players = document.getElementById('players');
let gameOver = document.getElementById('game-over')
let restartButton = document.getElementById("restart-btn");
let pointsTable = document.getElementById("points-table");
let snowFlake = document.getElementById("snow");
let snowTimer;

let playerOne;
let playerTwo;
let playerOneMovingUp;
let playerOneMovingDown;
let playerTwoMovingUp;
let playerTwoMovingDown;
let bounceCount;
let vel;
let ball;
let lastTime;
let snow;
let snowFlakes

function saveToLocalStorage(name, points) {
  let data = localStorage.getItem("points");
  let allPoints = data ? JSON.parse(data) : [];

  allPoints.push({
    name,
    points,
  });

  localStorage.setItem("points", JSON.stringify(allPoints));
}




function renderPointsTable(){

  let data = localStorage.getItem("points");
  let allPoints = data ? JSON.parse(data) : [];

  while (pointsTable.children.length > 1) {
    pointsTable.children[1].remove();
  }

  for(let i = 0; i < allPoints.length; i++){
    let namePoints = allPoints[i];

    allPoints.sort(function (a, b) {
      return b.points - a.points;
    });

    let row = document.createElement("tr");
    let name = document.createElement("td");
    let points = document.createElement("td");

    name.innerText = namePoints.name;
    points.innerText = namePoints.points;

    row.append(name, points);
    pointsTable.append(row);

   
    }


}

restartButton.addEventListener("click", function () {
  startGame();
  restartButton.style.display = "none";
});

function startGame() {
  playerOne = {
    x: 25,
    y: 400,
    width: 25,
    height: 150,
    playerOneMovingUp: false,
    playerOneMovingDown: false,
    vel: 500,
  };
  playerTwo = {
    x: canvas.width - 25 * 2,
    y: 400,
    width: 25,
    height: 150,
    playerTwoMovingUp: false,
    playerTwoMovingDown: false,
    vel: 500,
  };

  ball = {
    x: 400,
    y: 400,
    width: 50,
    height: 50,
    velX: -300,
    velY: 0,
  };
  snowTimer = 0.2;
  snowFlakes = []
  renderPointsTable()
  bounceCount = 0;
  lastTime = Date.now();
  requestAnimationFrame(tick);



}
window.addEventListener("keydown", function (event) {
  if (event.key === "w") {
    playerOneMovingUp = true;
  } else if (event.key === "s") {
    playerOneMovingDown = true;
  }
  if (event.key === "ArrowUp") {
    playerTwoMovingUp = true;
  } else if (event.key === "ArrowDown") {
    playerTwoMovingDown = true;
  }
});
window.addEventListener("keyup", function (event) {
  if (event.key === "w") {
    playerOneMovingUp = false;
  } else if (event.key === "s") {
    playerOneMovingDown = false;
  }
  if (event.key === "ArrowUp") {
    playerTwoMovingUp = false;
  } else if (event.key === "ArrowDown") {
    playerTwoMovingDown = false;
  }
});

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let now = Date.now();
  let deltaTime = (now - lastTime) / 1000;
  lastTime = now;

  for(let i = 0; i < snowFlakes.length; i++){
    let snow = snowFlakes[i]
    ctx.globalAlpha = 0.7;
    ctx.drawImage(snowFlake, snow.x, snow.y, snow.width, snow.height)
    ctx.globalAlpha = 1;
    snow.y += snow.velY + deltaTime;
    snow.x += snow.velX + deltaTime;
    snow.opacity = 0;
  }

  if (ball.y < 0 || ball.y > canvas.height - ball.height) {
    ball.velY *= -1;
  }
  if (playerOneMovingUp && playerOne.y > 0) {
    playerOne.y -= playerOne.vel * deltaTime;
  }
  if (playerOneMovingDown && playerOne.y < canvas.height - playerOne.height) {
    playerOne.y += playerOne.vel * deltaTime;
  }

  if (playerTwoMovingDown && playerTwo.y < canvas.height - playerTwo.height) {
    playerTwo.y += playerTwo.vel * deltaTime;
  }
  if (playerTwoMovingUp && playerTwo.y > 0) {
    playerTwo.y -= playerTwo.vel * deltaTime;
  }

  ctx.drawImage(players, playerOne.x, playerOne.y, playerOne.width, playerOne.height);
  ctx.drawImage(players,  playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height);

  ctx.drawImage(snowball, ball.x, ball.y, ball.width, ball.height);

  ball.x += ball.velX * deltaTime;
  ball.y += ball.velY * deltaTime;

  if (ball.x < 0 || ball.x > canvas.width - ball.width) {
    let name = prompt("Write team-name");
    saveToLocalStorage(name, bounceCount);
    renderPointsTable()
    ctx.drawImage(gameOver, 300, 300, 200, 200)
    ctx.font = "25px cursive";
    ctx.fillStyle = "black";
    ctx.fillText( name.toUpperCase() + "'S" +  " POINTS: " + bounceCount, 300, 500);
    restartButton.style.display = "block";
    
  } else {
    requestAnimationFrame(tick);
  }

  if(collision(playerOne, ball)) {
    let playerCenterY = playerOne.y + playerOne.height / 2;
    let ballCenterY = ball.y + ball.height / 2;
    let deltaY = ballCenterY - playerCenterY;
    bounceCount++;
    ball.velX *= -1;
    ball.velY = deltaY * 0.2;
    if (ball.y < playerOne.y + playerOne.height / 2) {
    ball.velY -= 100;
    } else {
    ball.velY += 100;
    }
    }
    if (collision(playerTwo, ball)) {
    let playerCenterY = playerTwo.y + playerTwo.height / 2;
    let ballCenterY = ball.y + ball.height / 2;
    let deltaY = ballCenterY - playerCenterY;
    bounceCount++;
    ball.velX *= -1;
    ball.velY = deltaY * 0.2;
    if (ball.y < playerTwo.y + playerTwo.height / 2) {
    ball.velY -= 100;
    } else {
    ball.velY += 100;
    }
    if (bounceCount % 10 === 0) {
    ball.velX *= 1.2;
    ball.velY *= 1.2;
    
    }
    }

  if(snowTimer <= 0){
    spawnSnow()
    snowTimer = 0.5;
  }
  snowTimer -= deltaTime;

  

  ctx.font = "25px cursive";
  ctx.fillStyle = "black";
  ctx.fillText("Points: " + bounceCount, 350, 30);
  console.log(bounceCount);
}

function collision(padelOne, snowball) {
  if (
    // padelOne.y - padelOne.height > snowball.y &&
    padelOne.y < snowball.y + snowball.height &&
    padelOne.y + padelOne.height > snowball.y &&
    padelOne.x + padelOne.width > snowball.x &&
    padelOne.x < snowball.x + snowball.width
  ) {
    return true;
  } else {
    return false;
  }
}

function spawnSnow(){
  snow = {
    x: Math.random() * 1200,
    y: -50,
    width: 50, 
    height: 50,
    velY: 2, 
    velX: -2.5
  }
snowFlakes.push(snow)

}
startGame();


