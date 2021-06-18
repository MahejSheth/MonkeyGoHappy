var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImage;
var stone, stoneImage;
var gameOver, gameOverImage;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  gameOverImage =  loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  var score = 0;
  bananaGroup = new Group();
  stoneGroup = new Group();
  
}

function draw() { 
  background(0);
  drawSprites();

 textSize(20);
 stroke("white")
 fill("white");
 text("Score:" + score, 550, 50)

  if(gameState===PLAY){
  
  spawnBanana();
  spawnStone();

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(stoneGroup.isTouching (player)){
      gameState = END;
      }
      
      if(bananaGroup.isTouching(player)){
        bananaGroup.destroyEach();
        score = score+2;
        player.scale += 0.02;
      }
  }
  else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();

    textSize(30);
    fill("yellow");
    text("GAME_OVER", 300, 200);
  }

 
}

function spawnBanana(){
if(frameCount % 80 === 0){
  banana = createSprite(600, 250, 40, 10);
  banana.y = random(120, 200);
  banana.addImage("bananaImage", bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.lifetime = 300;
  player.depth = banana.depth+1;
  bananaGroup.add(banana);
}
}

function spawnStone(){
if(frameCount % 300 === 0){
  stone = createSprite(800, 350, 10, 40);
  stone.velocityX = -6;
  stone.addImage("stoneImage", stoneImage)
  stone.scale = 0.2;
  stone.lifetime = 300;
  stoneGroup.add(stone);
}
}
