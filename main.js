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
  hasBouncedPOne: false, 
  hasBouncedPTwo: false, 
};

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

  ctx.fillStyle = "blue";
  ctx.fillRect(playerOne.x, playerOne.y, playerOne.width, playerOne.height);
  ctx.fillStyle = "red";
  ctx.fillRect(playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height);

  ctx.drawImage(snowball, ball.x, ball.y, ball.width, ball.height);

  ball.x += ball.velX * deltaTime;
  ball.y += ball.velY * deltaTime;


  if(ball.hasBouncedPOne){
    ball.velX = -300 * -1
    ball.velY = 60
    ball.hasBouncedPOne = false;
  }else if(ball.hasBouncedPTwo){
    ball.velX = 300 * -1
    ball.velY = -40
    ball.hasBouncedPTwo = false;
  }

  if (pOneCollision(playerOne, ball)) {
    ball.hasBouncedPOne = true;
    
  } else{
    
  }
  if (pOneCollision(playerTwo, ball)) {
    ball.hasBouncedPTwo = true;
    console.log('hej')
    
  } else{
    
  }

  requestAnimationFrame(tick);
}

function pOneCollision(padelOne, snowball) {
  if (
   // padelOne.y - padelOne.height > snowball.y &&
   padelOne.y < snowball.y + snowball.height &&
    padelOne.y + padelOne.height > snowball.y &&
    padelOne.x + padelOne.width > snowball.x  && 
    padelOne.x <  snowball.x + snowball.width
  )
 {
    return true;
  } else {
    return false;
  }
}

requestAnimationFrame(tick);
