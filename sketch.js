var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;


function preload(){
  backImage=loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-6;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX = -(6 + 3*score/100);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.15;
                break;
        case 30: player.scale=0.18;
                break;
        case 40: player.scale=0.21;
                break;
        default: break;
    }
  
    if(keyDown("space") && player.y >= 300) {
      player.velocityY = -20;
    }
      
    player.velocityY = player.velocityY + 0.9;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
     // score=score-2;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(30);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -8;

    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -8
    obstacle.addImage(obstacle_img);
  
    obstacle.scale = 0.2;
  
    obstaclesGroup.add(obstacle);
  }
}


  
