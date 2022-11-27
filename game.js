/* 
 * THIS CODE MUST BE USED ON THE WEBSITE "https://editor.p5js.org/". IT WILL
 * NOT WORK IN A COMMON ENVIRONMENT.
 */

//Circle measurements
let constXCircle = 300;
let constYCircle = 200;
let diameterCircle = 15;

//Ball velocity
let speedXCircle = 6;
let speedYCircle = 6;

let radius = diameterCircle / 2;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  
  drawCircle();
  moveBall();
  verifyEdgeCollision();
}

  
  function drawCircle(){
    circle(constXCircle, constYCircle, diameterCircle)
  }
  
  function moveBall(){
    constXCircle += speedXCircle;
    constYCircle += speedYCircle;
  }
  
  function verifyEdgeCollision(){
    
    /*
      If the ball touches the ends, its speed will be reversed, that is, it will be "bounced".
    */

    /* 
     We are adding and subtracting the radius because, by default, the position of the circle is        the center, and we want that when the edge of the ball hits the edge of the screen, it            bounces, and not when the center of the ball hits the edge of the screen.
    */

    if(constXCircle + radius > width || constXCircle - radius < 0){

      speedXCircle *= -1;
    }

    if(constYCircle + radius > height || constYCircle - radius < 0){
      speedYCircle *= -1;
    }
  
}