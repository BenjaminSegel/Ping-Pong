// Vi skapar två spelare, extra uppgift blir att göra det möjligt att spela mot dator.
// Skapa en boll som ska studsa tillbaka när det blir collision mellan spelare och boll
// Åker bollen ut ur canvas, har man förlorat
// Bollens hastighet ökar efter collissions, alltså blir spelet svårare beroende på hur många gånger bollen studsar.
// 1 collission = 1 poäng
// Bollen kan endast åka ut på kortsidorna, och inte på långsidorna av canvas.
// Poäng och spelarnas namn sparar i local storage.

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let snowball = document.getElementById('snowball')
let lastTime = Date.now();

let playerOne;
let playerTwo;
let playerOneMovingUp;
let playerOneMovingDown;
let playerTwoMovingUp;
let playerTwoMovingDown;
let vel;
let ball;

playerOne = {
  x: 25,
  y: 400,
  width: 25,
  height: 150,
  playerOneMovingUp: false,
  playerOneMovingDown: false,
  vel: 500
};
playerTwo = {
  x: canvas.width - 25 * 2,
  y: 400,
  width: 25,
  height: 150,
  playerTwoMovingUp: false,
  playerTwoMovingDown: false,
  vel: 500
};

ball = {
    x : 400,
    y : 400,
    radius : 12,
    vel: 350
    }



  
  
    
window.addEventListener("keydown", function (event) {
  if (event.key === "w") {
    playerOneMovingUp = true;
  } else if (event.key === "s") {
    playerOneMovingDown = true;
  }
  if (event.key === "ArrowUp") {
    playerTwoMovingUp = true;
  }else if (event.key === "ArrowDown"){
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
  }else if (event.key === "ArrowDown"){
    playerTwoMovingDown = false;
  }
});

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let now = Date.now();
  let deltaTime = (now - lastTime) / 1000;
  lastTime = now;

  if (playerOneMovingUp && playerOne.y > 0) {
    playerOne.y -= playerOne.vel * deltaTime;
  }
  if (playerOneMovingDown && playerOne.y < canvas.height - playerOne.height) {
    playerOne.y += playerOne.vel * deltaTime;
  }


  if(playerTwoMovingDown && playerTwo.y < canvas.height - playerTwo.height){
    playerTwo.y += playerTwo.vel * deltaTime;
  }
  if(playerTwoMovingUp && playerTwo.y > 0){
    playerTwo.y -= playerTwo.vel * deltaTime;
  }

  ctx.fillStyle = "blue";
  ctx.fillRect(playerOne.x, playerOne.y, playerOne.width, playerOne.height);
  ctx.fillStyle = "red";
  ctx.fillRect(playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height);

  ctx.drawImage(snowball,ball.x, ball.y, 50, 50)
  
  ball.x += ball.vel * deltaTime;



  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

function collision(object1, object2, object3){
  object1.y + object1.width < object2.y   
}