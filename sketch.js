
  var monkey , monkey_running
  var banana ,bananaImage, obstacle, obstacleImage
  var FoodGroup, obstacleGroup
  var score;
  var ground;
  var survivalTime;
  var PLAY=1;
  var END=0;
  var gameState=PLAY;
  var monkeyStanding;


  function preload(){

    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
    monkeyStanding=loadImage("sprite_1.png");

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");


}



function setup() {
    createCanvas(600,600);

    // creating ground sprite and giving its velocity
    ground=createSprite(30,550,2000,20);
    ground.velocityX=-4;

    // creating monkey sprite
    monkey=createSprite(40,480);
    monkey.addAnimation("moving",monkey_running);
    monkey.addAnimation("standing",monkeyStanding);
    monkey.scale=0.14;


    // giving value to the score variable and survival time
     score=0;
    survivalTime=0;

    //creating groups for food and obstacles
    FoodGroup=new Group();
    obstacleGroup=new Group();

}


function draw() {
    
  background("black");
    
   // monkey.debug=true;
   monkey.setCollider("rectangle",0,0,monkey.x,monkey.y);  

  //displaying survival time
   textSize(20);
    fill("white");
    strokeWeight(2.6);
    stroke("red");
    text("SURVIVAL TIME:"+survivalTime,10,45);
    
    
    //displaying scores
    textSize(20);
    fill("white");
    strokeWeight(3);
    stroke("green");
    text("SCORE :" +score,450,45);

    if(gameState===PLAY){
      
      //survival time
  survivalTime= survivalTime+Math.round(getFrameRate()/60);
      
    //resetting ground's position
    if(ground.x>0){
      ground.x=ground.width/2;
}

    monkey.collide(ground);


    //condition to make monkey jump
   if(keyDown("space") && monkey.y>400){
     monkey.velocityY=-17;
}
      
    //giving gravity to monkey
    monkey.velocityY=monkey.velocityY+0.8;
      
    // condition to increase score
    if(monkey.isTouching(FoodGroup)){
      score=score+1;
      FoodGroup.destroyEach();
}
      
      //condition for changing gamestate to end
      if(monkey.isTouching(obstacleGroup)){
        gameState=END;
}

    food();
    obstacles();
      
}
    
    if(gameState===END){
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      ground.velocityX=0;
      monkey.velocityY=0;
      ground.velocityX=0;
      monkey.changeAnimation("standing", monkeyStanding);
      
      
      //displaying text for gameover and restart
      textSize(50);
      stroke("red");
      fill("red");
      textFont("broadway");
      text("GAME OVER",150,240);
      
      textSize(20);
      textFont("cooper black")
      stroke("white");
      fill("green");
      text("PRESS R TO RESTART",150,300);


      obstacleGroup.setVelocityEach(0);
      FoodGroup.setVelocityEach(0);
}

    
    //condition to restart the game
    if(keyDown("R")){
      reset();
}

    drawSprites(); 
}

  //function to create tasty bananas
  function food(){
    if(frameCount % 130===0){
      banana=createSprite(600,Math.round(random(150,400)),20,20);
      banana.addImage(bananaImage);
      banana.velocityX=-(4+score/2);
      banana.scale=0.17;
      banana.lifetime=600;
      FoodGroup.add(banana);
}
}

  // function to create stones on the way
  function obstacles(){
    if(frameCount % 100===0){
      obstacle=createSprite(600,510);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX=-(4+score/2);
      obstacle.lifetime=200;
      obstacle.scale=0.16;
      obstacleGroup.add(obstacle);
}

}

function reset(){
  gameState=PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.changeAnimation("moving", monkey_running);
  score=0;
  survivalTime=0;
}




