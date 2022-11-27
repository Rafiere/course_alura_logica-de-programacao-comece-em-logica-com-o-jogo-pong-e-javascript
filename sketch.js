//Circle measurements
let constXCircle = 300;
let constYCircle = 200;
let diameterCircle = 15;

//Ball velocity
let speedXCircle = 6;
let speedYCircle = 6;

//Ball radius
let radius = diameterCircle / 2;

//Player racket positions and measurements
let constXRacketPlayer = 5;
let constYRacketPlayer = 150;
let widthRacketPlayer = 10;
let heightRacketPlayer = 90;

//Opponent racket positions and measurements
let constXRacketOpponent = 585;
let constYRacketOpponent = 150;
let widthRacketOpponent = 10;
let heightRacketOpponent = 90;

let velocityYOpponent;
let chanceOfErrorOpponent = 0;

//collide2D variables.
let isCollidedPlayer = false;

//Game score variables
let myPoints = 0;
let opponentPoints = 0;

//Game sounds;
let racketCollisionSound;
let pointSound;
let soundtrack;

function preload() {
  racketCollisionSound = loadSound("./assets/raquetada.mp3");
  pointSound = loadSound("./assets/ponto.mp3");
  soundtrack = loadSound("./assets/trilha.mp3");
}

function setup() {
  createCanvas(600, 400);

  soundtrack.loop();
}

function draw() {
  background(0);

  drawCircle();

  includeGameScore();
  setPoint();

  drawRacket(
    constXRacketPlayer,
    constYRacketPlayer,
    widthRacketPlayer,
    heightRacketPlayer
  );

  drawRacket(
    constXRacketOpponent,
    constYRacketOpponent,
    widthRacketOpponent,
    heightRacketOpponent
  );

  moveBall();
  verifyEdgeCollision();

  moveRacketPlayer();
  moveRacketOpponent();

  verifyRacketCollisionCollide2D(
    constXRacketPlayer,
    constYRacketPlayer,
    widthRacketPlayer,
    heightRacketPlayer
  );

  verifyRacketCollisionCollide2D(
    constXRacketOpponent,
    constYRacketOpponent,
    widthRacketOpponent,
    heightRacketOpponent
  );
}

function drawCircle() {
  circle(constXCircle, constYCircle, diameterCircle);
}

function drawRacket(constXRacket, constYRacket, widthRacket, heightRacket) {
  rect(constXRacket, constYRacket, widthRacket, heightRacket);
}

function drawOpponentRacket() {
  rect(
    constXRacketOpponent,
    constYRacketOpponent,
    widthRacketPlayer,
    heightRacketPlayer
  );
}

function moveBall() {
  constXCircle += speedXCircle;
  constYCircle += speedYCircle;
}

function verifyEdgeCollision() {
  /*
      If the ball touches the ends, its speed will be reversed, that is, it will be "bounced".
    */

  /* 
     We are adding and subtracting the radius because, by default, the
     position of the circle is the center, and we want that when the edge
     of the ball hits the edge of the screen, it bounces, and not when the center of 
     the ball hits the edge of the screen.
    */

  if (constXCircle + radius > width || constXCircle - radius < 0) {
    speedXCircle *= -1;
  }

  if (constYCircle + radius > height || constYCircle - radius < 0) {
    speedYCircle *= -1;
  }
}

function moveRacketPlayer() {
  if (keyIsDown(UP_ARROW)) {
    constYRacketPlayer -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    constYRacketPlayer += 10;
  }
}

function moveRacketOpponent() {
  velocityYOpponent =
    constYCircle - constYRacketOpponent - widthRacketOpponent / 2 - 30;

  constYRacketOpponent += velocityYOpponent + chanceOfErrorOpponent;

  opponentChanceOfErrorCalc();
}

function verifyRacketCollisionCollide2D(
  constXRacket,
  constYRacket,
  widthRacket,
  heightRacket
) {
  isCollided = collideRectCircle(
    constXRacket,
    constYRacket,
    widthRacket,
    heightRacket,
    constXCircle,
    constYCircle,
    radius
  );

  if (isCollided) {
    speedXCircle *= -1;
    racketCollisionSound.play();
  }
}

function includeGameScore() {
  textAlign(CENTER);
  textSize(16);

  stroke(255);

  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(myPoints, 170, 26);

  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(opponentPoints, 470, 26);
}

function setPoint() {
  if (constXCircle > 590) {
    myPoints += 1;
    pointSound.play();
  }

  if (constXCircle < 10) {
    opponentPoints += 1;
    pointSound.play();
  }
}

function opponentChanceOfErrorCalc() {
  if (opponentPoints >= myPoints) {
    chanceOfErrorOpponent += 5;
    if (chanceOfErrorOpponent >= 50) {
      chanceOfErrorOpponent = 50;
    }
  } else {
    chanceOfErrorOpponent -= 3;
    if (chanceOfErrorOpponent <= 20) {
      chanceOfErrorOpponent = 20;
    }
  }
}
