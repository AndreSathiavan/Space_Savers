var canvas;
var player;
var alien_group;
var laser, laserImg;
var border1, border2, border3;
var lives = 3, score = 0;
var alienLives = 5;
var laser_group;
var alien_group1, alien_group3, alien1, alien3;
var alienLaser, alienLaserImg;
var alienLaser_group;
var gameState = -1;
var backgroundImg2;
var restart, restartImg;
var explosion, explosionImg;
var explosion2, explosionImg2;
var explosion3, explosionImg3;
var name = "Player", nameInput, play, playImg;
var easy, medium, hard;
var easyImg, medImg, hardImg;

function preload() {
  explosionImg2 = loadImage("explosion.png");
  explosionImg3 = loadImage("greenExp.png");
  explosionImg = loadImage("explosion.png");
  restartImg = loadImage("restart.png");
  backgroundImg2 = loadImage("back.jpeg");
  backgroundImg = loadImage("background.jpeg");
  playerimage = loadImage("GoodGuysSpaceship2.png");
  computerimage = loadImage("BadGuysSpaceShip.png");
  alienImg = loadImage("BadGuys.png")
  laserImg = loadImage("GoodGuysbullet.png")
  alienLaserImg = loadImage("BadGuysBullet.png")
  playImg = loadImage("playButton.png");
  easyImg = loadImage("easy.png");
  medImg = loadImage("medium.png");
  hardImg = loadImage("hard.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  alienLaser_group = new Group();
  alien_group = new Group();
  alien_group1 = new Group();
  alien_group3 = new Group();
  laser_group = new Group();
  restart = createSprite(windowWidth/2, windowHeight/2, 100,100);
  restart.addImage("restart", restartImg);
  restart.scale = 0.1;

  player = createSprite(windowWidth/2, 1111);
  player.addImage("player",playerimage)
  player.scale = 0.25;
  //player.debug = true;
  player.setCollider('rectangle',0,0,600,700);

  computer = createSprite(windowWidth/2,110);
  computer.addImage("computer",computerimage)
  computer.scale = 0.7;
  //computer.debug = true;
  computer.setCollider('rectangle',0,0,200,200);

  border1 = createSprite(600,0, 30, 500);
  border1.visible = false;

  border2 = createSprite(windowWidth - 750,0, 30, 500);
  border2.visible = false;

  border3 = createSprite(windowWidth/2, 1000, windowWidth, 20);
  border3.visible = false;
  
  nameInput = createInput("Player Name");
  nameInput.position(windowWidth/2 - 150, windowHeight/2 - 50);
  nameInput.size(300, 60);
  nameInput.scale = 1.8;
  nameInput.input(myInputEvent);

  play = createSprite(windowWidth/2, windowHeight/2 + 70, 600, 200);
  play.addImage(playImg);
  play.scale = 0.3;

  easy = createSprite(windowWidth/2 - 300, windowHeight/2 + 350, 100,100);
  easy.addImage(easyImg);
  easy.scale = 0.5;
  medium = createSprite(windowWidth/2, windowHeight/2 + 350, 100,100);
  medium.addImage(medImg);
  medium.scale = 0.5;
  hard = createSprite(windowWidth/2 + 300, windowHeight/2 + 350, 100,100);
  hard.addImage(hardImg);
  hard.scale = 0.5;
}

function draw() {
  
  if(gameState === -1){
    background(backgroundImg2); 
    computer.visible = false;
    player.visible = false;
    restart.visible = false;
    nameInput.show();
    play.visible = true;

    textAlign("center");
    fill('white');
    textSize(24)
    text("SPACE SAVERS", windowWidth/2, windowHeight/2 - 200);

    easy.visible = false;
    medium.visible = false;
    hard.visible = false;

    if(mousePressedOver(play)){
      gameState=0;
      play.visible = false;
      nameInput.hide();
    } else {
      console.log("Enter the name to continue");
    }

    
  }

  if(gameState === 0){
      easy.visible = true;
      medium.visible = true;
      hard.visible = true;

      if(mousePressedOver(easy)){
        gameState = 1;
        player.visible = true;
        computer.visible = true;
        computer.x = windowWidth/2;
        lives = 3;
        alienLives = 5;
        computer.velocityX = 8;
      }

      if(mousePressedOver(medium)){
        gameState = 2;
        player.visible = true;
        computer.visible = true;
        computer.x = windowWidth/2;
        lives = 2;
        alienLives = 6;
        computer.velocityX = 10;
      }

      if(mousePressedOver(hard)){
        gameState = 3;
        player.visible = true;
        computer.visible = true;
        computer.x = windowWidth/2;
        lives = 1;
        alienLives = 6;
        computer.velocityX = 12;
      }

      textSize(24);
      textAlign("center")
      text("How to Play", windowWidth/2, windowHeight/2 -60);
      textSize(24);
      text("Move Left and Right with Arrow Keys", windowWidth/2, windowHeight/2);
      text("Press Space to Shoot", windowWidth/2, windowHeight/2 + 60);
      text("Avoid Lasers and do not let Aliens Invade", windowWidth/2, windowHeight/2 + 120);
      text("Protect the Planet", windowWidth/2, windowHeight/2 + 180);

  }


  if(gameState === 1){
  background(backgroundImg);
  player.velocityX = 0;
  player.velocityY = 0;
  restart.visible = false;
  easy.visible = false;
  medium.visible = false;
  hard.visible = false;

  if(keyDown("LEFT_ARROW")){
    player.velocityX = -15
  }

  if(keyDown("RIGHT_ARROW")){
    player.velocityX = 15
  }

  if(keyDown("SPACE")){
    laser = createSprite(player.x, 980);
    laser.addImage("laser", laserImg);
    laser.scale = 0.40;
    laser.velocityY = -15
    //laser.debug = true;
    laser.setCollider('rectangle',0,0,80,300)
    laser_group.add(laser);
  }

  if(frameCount%100 === 0){
    alienLaser = createSprite(computer.x, 200);
    alienLaser.addImage("alien laser", alienLaserImg);
    alienLaser.scale =1;
    alienLaser.velocityY = 10;
    alienLaser.setCollider('rectangle',5,0,30,120);
    //alienLaser.debug = true;
    alienLaser_group.add(alienLaser);
  }

  if(computer.isTouching(border1) || computer.isTouching(border2)){
    computer.velocityY = computer.velocityY
  }

  computer.bounceOff(border1);
  computer.bounceOff(border2);

  if(player.x>windowWidth - 500){
    player.x = windowWidth - 500;
  }

  if(player.x<400){
    player.x = 400;
  }

  var select_alien = Math.round(random(1,3));


if(alienLaser_group.isTouching(player)){
  explosion2 = createSprite(player.x, player.y, 50,50);
  explosion2.addImage("explosion2", explosionImg2);
  explosion2.scale = 0.75;
  explosion2.lifetime = 2;
  //explosion2.velocityX = player.velocityX;
  lives = lives - 1;
  alienLaser_group.destroyEach();
}

if(laser_group.isTouching(computer)){
  explosion = createSprite(computer.x, computer.y - 50, 50,50);
  explosion.addImage("explosion", explosionImg);
  //explosion.scale = 1;
  explosion.lifetime = 3;
  explosion.velocityX = computer.velocityX;
  alienLives = alienLives - 1;
  laser_group.destroyEach();
  //laser.destroy();
  score = score + 100;
}


if(alien_group.isTouching(border3)){
  alien_group.destroyEach();
  lives = lives -1;
}

if(alien_group1.isTouching(border3)){
  alien_group.destroyEach();
  lives = lives -1;
}

if(alien_group3.isTouching(border3)){
  alien_group.destroyEach();
  lives = lives -1;
}
 


if(frameCount%175===0){
  createAlien1();
}

if(frameCount%275===0){
  createAlien2();
}

if(frameCount%375===0){
  createAlien3();
}


 if(laser_group.isTouching(alien_group)){
    alien_group.destroyEach();
    //laser_group.destroyEach();
    laser.destroy();
   //isTouch(laser_group,alien_group)
    score = score + 50;
    explosion3 = createSprite(alien.x, alien.y, 50, 50);
    explosion3.addImage("explosion3", explosionImg3);
    explosion3.scale = 0.6;
    explosion3.lifetime = 2;
  }

  if(laser_group.isTouching(alien_group1)){
    alien_group1.destroyEach();
   // laser_group.destroyEach();
    laser.destroy();
    score = score + 50;
    explosion3 = createSprite(alien1.x, alien1.y, 50, 50);
    explosion3.addImage("explosion3", explosionImg3);
    explosion3.scale = 0.6;
    explosion3.lifetime = 2;
  }

  if(laser_group.isTouching(alien_group3)){
    alien_group3.destroyEach();
   // laser_group.destroyEach();
    laser.destroy();
    score = score + 50;
    explosion3 = createSprite(alien3.x, alien3.y, 50, 50);
    explosion3.addImage("explosion3", explosionImg3);
    explosion3.scale = 0.6;
    explosion3.lifetime = 2;
  }

  // Title
  textAlign("center");
  fill("white");
  textSize(24)
  text("Lives left: " + lives, 430, 50);
  text(name + "'s Score: " + score, 500, 100);
  text("Alien Lives: " + alienLives, windowWidth - 450, 50)

  if(lives === 0){
    gameState =4;
    restart.visible = true;
    console.log("Game Over");
  }

  if(alienLives === 0){
    gameState = 5;
    explosion.destroy();
    console.log("You won");
  }
  }

  if(gameState === 2){
    background(backgroundImg);
    player.velocityX = 0;
    player.velocityY = 0;
    restart.visible = false;
    easy.visible = false;
    medium.visible = false;
    hard.visible = false;

    if(keyDown("LEFT_ARROW")){
      player.velocityX = -15
    }
  
    if(keyDown("RIGHT_ARROW")){
      player.velocityX = 15
    }
  
    if(keyDown("SPACE")){
      laser = createSprite(player.x, 980);
      laser.addImage("laser", laserImg);
      laser.scale = 0.40;
      laser.velocityY = -15
      //laser.debug = true;
      laser.setCollider('rectangle',0,0,80,300)
      laser_group.add(laser);
    }
  
    if(frameCount%80 === 0){
      alienLaser = createSprite(computer.x, 200);
      alienLaser.addImage("alien laser", alienLaserImg);
      alienLaser.scale =1;
      alienLaser.velocityY = 14;
      alienLaser.setCollider('rectangle',5,0,30,120);
      //alienLaser.debug = true;
      alienLaser_group.add(alienLaser);
    }
  
    if(computer.isTouching(border1) || computer.isTouching(border2)){
      computer.velocityY = computer.velocityY
    }
  
    computer.bounceOff(border1);
    computer.bounceOff(border2);
  
    if(player.x>windowWidth - 500){
      player.x = windowWidth - 500;
    }
  
    if(player.x<400){
      player.x = 400;
    }
  
    var select_alien = Math.round(random(1,3));
  
  
  if(alienLaser_group.isTouching(player)){
    explosion2 = createSprite(player.x, player.y, 50,50);
    explosion2.addImage("explosion2", explosionImg2);
    explosion2.scale = 0.75;
    explosion2.lifetime = 2;
    //explosion2.velocityX = player.velocityX;
    lives = lives - 1;
    alienLaser_group.destroyEach();
  }
  
  if(laser_group.isTouching(computer)){
    explosion = createSprite(computer.x, computer.y - 50, 50,50);
    explosion.addImage("explosion", explosionImg);
    //explosion.scale = 1;
    explosion.lifetime = 3;
    explosion.velocityX = computer.velocityX;
    alienLives = alienLives - 1;
    laser_group.destroyEach();
    //laser.destroy();
    score = score + 100;
  }
  
  
  if(alien_group.isTouching(border3)){
    alien_group.destroyEach();
    lives = lives -1;
  }
  
  if(alien_group1.isTouching(border3)){
    alien_group.destroyEach();
    lives = lives -1;
  }
  
  if(alien_group3.isTouching(border3)){
    alien_group.destroyEach();
    lives = lives -1;
  }
   
  
  
  if(frameCount%100===0){
    createAlien1_2();
  }
  
  if(frameCount%250===0){
    createAlien2_2();
  }
  
  if(frameCount%300===0){
    createAlien3_2();
  }
  
  
   if(laser_group.isTouching(alien_group)){
      alien_group.destroyEach();
      //laser_group.destroyEach();
      laser.destroy();
     //isTouch(laser_group,alien_group)
      score = score + 50;
      explosion3 = createSprite(alien.x, alien.y, 50, 50);
      explosion3.addImage("explosion3", explosionImg3);
      explosion3.scale = 0.6;
      explosion3.lifetime = 2;
    }
  
    if(laser_group.isTouching(alien_group1)){
      alien_group1.destroyEach();
     // laser_group.destroyEach();
      laser.destroy();
      score = score + 50;
      explosion3 = createSprite(alien1.x, alien1.y, 50, 50);
      explosion3.addImage("explosion3", explosionImg3);
      explosion3.scale = 0.6;
      explosion3.lifetime = 2;
    }
  
    if(laser_group.isTouching(alien_group3)){
      alien_group3.destroyEach();
     // laser_group.destroyEach();
      laser.destroy();
      score = score + 50;
      explosion3 = createSprite(alien3.x, alien3.y, 50, 50);
      explosion3.addImage("explosion3", explosionImg3);
      explosion3.scale = 0.6;
      explosion3.lifetime = 2;
    }
  
    // Title
    textAlign("center");
    fill("white");
    textSize(24)
    text("Lives left: " + lives, 430, 50);
    text(name + "'s Score: " + score, 500, 100);
    text("Alien Lives: " + alienLives, windowWidth - 450, 50)
  
    if(lives === 0){
      gameState =4;
      restart.visible = true;
      console.log("Game Over");
    }
  
    if(alienLives === 0){
      gameState = 5;
      explosion.destroy();
      console.log("You won");
    }
  }

  if(gameState === 3){
      background(backgroundImg);
      player.velocityX = 0;
      player.velocityY = 0;
      restart.visible = false;
      easy.visible = false;
      medium.visible = false;
      hard.visible = false;

      if(keyDown("LEFT_ARROW")){
        player.velocityX = -15
      }
    
      if(keyDown("RIGHT_ARROW")){
        player.velocityX = 15
      }
    
      if(keyDown("SPACE")){
        laser = createSprite(player.x, 980);
        laser.addImage("laser", laserImg);
        laser.scale = 0.40;
        laser.velocityY = -15
        //laser.debug = true;
        laser.setCollider('rectangle',0,0,80,300)
        laser_group.add(laser);
      }
    
      if(frameCount%60 === 0){
        alienLaser = createSprite(computer.x, 200);
        alienLaser.addImage("alien laser", alienLaserImg);
        alienLaser.scale =1;
        alienLaser.velocityY = 18;
        alienLaser.setCollider('rectangle',5,0,30,120);
        //alienLaser.debug = true;
        alienLaser_group.add(alienLaser);
      }
    
      if(computer.isTouching(border1) || computer.isTouching(border2)){
        computer.velocityY = computer.velocityY
      }
    
      computer.bounceOff(border1);
      computer.bounceOff(border2);
    
      if(player.x>windowWidth - 500){
        player.x = windowWidth - 500;
      }
    
      if(player.x<400){
        player.x = 400;
      }
    
      var select_alien = Math.round(random(1,3));
    
    
    if(alienLaser_group.isTouching(player)){
      explosion2 = createSprite(player.x, player.y, 50,50);
      explosion2.addImage("explosion2", explosionImg2);
      explosion2.scale = 0.75;
      explosion2.lifetime = 2;
      //explosion2.velocityX = player.velocityX;
      lives = lives - 1;
      alienLaser_group.destroyEach();
    }
    
    if(laser_group.isTouching(computer)){
      explosion = createSprite(computer.x, computer.y - 50, 50,50);
      explosion.addImage("explosion", explosionImg);
      //explosion.scale = 1;
      explosion.lifetime = 3;
      explosion.velocityX = computer.velocityX;
      alienLives = alienLives - 1;
      laser_group.destroyEach();
      //laser.destroy();
      score = score + 100;
    }
    
    
    if(alien_group.isTouching(border3)){
      alien_group.destroyEach();
      lives = lives -1;
    }
    
    if(alien_group1.isTouching(border3)){
      alien_group.destroyEach();
      lives = lives -1;
    }
    
    if(alien_group3.isTouching(border3)){
      alien_group.destroyEach();
      lives = lives -1;
    }
     
    
    
    if(frameCount%120===0){
      createAlien1_3();
    }
    
    if(frameCount%180===0){
      createAlien2_3();
    }
    
    if(frameCount%240===0){
      createAlien3_3();
    }
    
    
     if(laser_group.isTouching(alien_group)){
        alien_group.destroyEach();
        //laser_group.destroyEach();
        laser.destroy();
       //isTouch(laser_group,alien_group)
        score = score + 50;
        explosion3 = createSprite(alien.x, alien.y, 50, 50);
        explosion3.addImage("explosion3", explosionImg3);
        explosion3.scale = 0.6;
        explosion3.lifetime = 2;
      }
    
      if(laser_group.isTouching(alien_group1)){
        alien_group1.destroyEach();
       // laser_group.destroyEach();
        laser.destroy();
        score = score + 50;
        explosion3 = createSprite(alien1.x, alien1.y, 50, 50);
        explosion3.addImage("explosion3", explosionImg3);
        explosion3.scale = 0.6;
        explosion3.lifetime = 2;
      }
    
      if(laser_group.isTouching(alien_group3)){
        alien_group3.destroyEach();
       // laser_group.destroyEach();
        laser.destroy();
        score = score + 50;
        explosion3 = createSprite(alien3.x, alien3.y, 50, 50);
        explosion3.addImage("explosion3", explosionImg3);
        explosion3.scale = 0.6;
        explosion3.lifetime = 2;
      }
    
      // Title
      textAlign("center");
      fill("white");
      textSize(40)
      text("Lives left: " + lives, 430, 50);
      text(name + "'s Score: " + score, 500, 100);
      text("Alien Lives: " + alienLives, windowWidth - 450, 50)
    
      if(lives === 0){
        gameState =4;
        restart.visible = true;
        console.log("Game Over");
      }
    
      if(alienLives === 0){
        gameState = 5;
        explosion.destroy();
        console.log("You won");
      }
  }

  if(gameState === 4){
    background(backgroundImg2)
    laser_group.destroyEach();
    alienLaser_group.destroyEach();
    computer.velocityX = 0;
    computer.x = windowWidth/2
    player.velocityX = 0;
    alien_group.setLifetimeEach(-1);
    alien_group1.setLifetimeEach(-1);
    alien_group3.setLifetimeEach(-1);
    alien_group.destroyEach();
    alien_group1.destroyEach();
    alien_group3.destroyEach();
    player.visible = false;
    computer.visible = false;
    computer.velocityX = 8;

    if(mousePressedOver(restart)){
      gameState = -1;
      score = 0;
      lives = 3;
      alienLives = 5;
      restart.visible = false;
      player.visible = true;
      computer.visible = true;  
      computer.x = windowWidth/2;
      player.x = windowWidth/2;
    }


    textAlign("center");
    textSize(100);
    fill('white');
    text(" You lost all your lives", windowWidth/2, windowHeight/2 -100);
    text("GAME OVER", windowWidth/2, windowHeight/2 -220);
    textSize(50);
    text("Would you like to try again?", windowWidth/2, windowHeight/2 +100);
    textSize(100);
    text(name + "'s Score: " + score, windowWidth/2, windowHeight/2 + 200);


  }

  if(gameState === 5){
    background(backgroundImg2)
    laser_group.destroyEach();
    alienLaser_group.destroyEach();
    computer.velocityX = 0;
    computer.x = windowWidth/2
    player.velocityX = 0;
    alien_group.setLifetimeEach(-1);
    alien_group1.setLifetimeEach(-1);
    alien_group3.setLifetimeEach(-1);
    alien_group.destroyEach();
    alien_group1.destroyEach();
    alien_group3.destroyEach();
    player.visible = false;
    computer.visible = false;
    computer.velocityX = 8;
    restart.visible = true;

    if(mousePressedOver(restart)){
      gameState = -1;
      score = 0;
      lives = 3;
      alienLives = 5;
      restart.visible = false;
      player.visible = true;
      computer.visible = true;  

    }

    textAlign("center");
    textSize(100);
    fill('white')
    text("Congratulations " + name + " You Saved the Planet", windowWidth/2, windowHeight/2 -300);
    text(name + "'s Score  " + score, windowWidth/2, windowHeight/2 + 300);
    textSize(50);
    text("Would you like to try again?", windowWidth/2, windowHeight/2 -100);
  }

  drawSprites();
}

function createAlien1(){
    alien = createSprite(random(600, windowWidth -600),200);
    alien.addImage(alienImg);
    alien.scale = 0.6;
    alien.lifetime = 500;
    alien_group.add(alien);
    alien.velocityY = 3;
    alien.setCollider('rectangle',0,0,350,150)
    //alien.debug = true;

}

function createAlien2(){
    alien1 = createSprite(random(600, windowWidth -600),200);
    alien1.addImage(alienImg);
    alien1.scale = 0.6;
    alien1.lifetime = 500;
    alien_group1.add(alien1);
    alien1.velocityY = 3;
    alien1.setCollider('rectangle',0,0,350,150)
    //alien1.debug = true;
}

function createAlien3(){
    alien3 = createSprite(random(600, windowWidth -600),200);
    alien3.addImage(alienImg);
    alien3.scale = 0.6;
    alien3.lifetime = 500;
    alien_group3.add(alien3);
    alien3.velocityY = 3;
    alien3.setCollider('rectangle',0,0,350,150)
    //alien3.debug = true;
}

function createAlien1_2(){
  alien = createSprite(random(600, windowWidth -600),200);
  alien.addImage(alienImg);
  alien.scale = 0.6;
  alien.lifetime = 500;
  alien_group.add(alien);
  alien.velocityY = 5;
  alien.setCollider('rectangle',0,0,350,150)
  //alien.debug = true;

}

function createAlien2_2(){
  alien1 = createSprite(random(600, windowWidth -600),200);
  alien1.addImage(alienImg);
  alien1.scale = 0.6;
  alien1.lifetime = 500;
  alien_group1.add(alien1);
  alien1.velocityY = 5;
  alien1.setCollider('rectangle',0,0,350,150)
  //alien1.debug = true;
}

function createAlien3_2(){
  alien3 = createSprite(random(600, windowWidth -600),200);
  alien3.addImage(alienImg);
  alien3.scale = 0.6;
  alien3.lifetime = 500;
  alien_group3.add(alien3);
  alien3.velocityY = 5;
  alien3.setCollider('rectangle',0,0,350,150)
  //alien3.debug = true;
}

function createAlien1_3(){
  alien = createSprite(random(600, windowWidth -600),200);
  alien.addImage(alienImg);
  alien.scale = 0.6;
  alien.lifetime = 500;
  alien_group.add(alien);
  alien.velocityY = 7;
  alien.setCollider('rectangle',0,0,350,150)
  //alien.debug = true;

}

function createAlien2_3(){
  alien1 = createSprite(random(600, windowWidth -600),200);
  alien1.addImage(alienImg);
  alien1.scale = 0.6;
  alien1.lifetime = 500;
  alien_group1.add(alien1);
  alien1.velocityY = 7;
  alien1.setCollider('rectangle',0,0,350,150)
  //alien1.debug = true;
}

function createAlien3_3(){
  alien3 = createSprite(random(600, windowWidth -600),200);
  alien3.addImage(alienImg);
  alien3.scale = 0.6;
  alien3.lifetime = 500;
  alien_group3.add(alien3);
  alien3.velocityY = 7;
  alien3.setCollider('rectangle',0,0,350,150)
  //alien3.debug = true;
}

function myInputEvent() {
  console.log('you are typing: ', this.value());
  name = this.value();
}
