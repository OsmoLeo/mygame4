var ninja
var ground
var diesound;
var jumpsound;
var gameState = 'play';
var score=0;
var stoneGroup
var ninjacoinGroup
var reset;
var life=3;


function preload(){
  bg=loadImage("woods.jpg");
  ninja_img=loadAnimation("ninja1.png","ninja2.png","ninja3.png","ninja4.png")
  stone_img=loadImage("stone.png")
  diesound=loadSound("diesound.mp3")
  jumpsound=loadSound("jumpsound.mp3")
  fireball_img=loadAnimation("fireball1.png","fireball2.png","fireball3.png","fireball4.png")
  ninjacoin_img=loadImage("ninja coin.png")
  reset_img=loadImage("reset.png")
}
  

function setup() {
  createCanvas(1700,400);
  ninja=createSprite(250,270,20,20)
  ninja.addAnimation("ninja",ninja_img);
  ninja.scale=0.5;
  ground=createSprite(850,300,1400,50);
  //creating groups
  stoneGroup = new Group();
  ninjacoinGroup = new Group();
  ninja.setCollider("rectangle",0,0,10,10);
  reset=createSprite(800,200,20,20);
  reset.addImage("reset",reset_img);
  reset.scale=0.5;
  reset.visible=false;
}


function draw() {
  background(bg);
  ninja.debug=true;
  stoneGroup.debug=true;
  
   if(gameState === 'play' ){
    stone();
    ninjacoin();
    if(keyDown(UP_ARROW) && ninja.y > 203 ){
      ninja.velocityY=-10;
      jumpsound.play()
    }
    if(keyDown('space')){
      fireball();
    }
    if(mousePressedOver(reset)){
      gameState='end'
    }


      ninja.velocityY=ninja.velocityY+0.5; 
  if(ninja.isTouching(stoneGroup)){
  gameState = 'end';
  ninja.visible=true;
  life=life-1
  diesound.play();
  }
     
  }

  if(gameState === 'end'){
    Gamereset();
    ninja.velocityX=0;
    ninja.velocityY=0;
    //stoneGroup.destroyEach();
    reset.visible=true;

  }
   

  ground.visible=false;

  ninja.collide(ground);
  
  drawSprites();
  fill('red');
  textSize(22);
  text('SCORE'+score,800,20)
  text('LIFE'+life,1600,20);

  
}
 


function stone(){
  if(World.frameCount%100===0){
  var stone=createSprite(1600,Math.round(random(330,270)),20,20)
  stone.addImage("stone",stone_img);
  stone.scale=0.3;
  stone.velocityX=-8;
  stone.lifetime = 195;
  stoneGroup.add(stone);
}
}
  

function fireball(){
  if(World.frameCount%100===0){
    var fireball=createSprite(150,270,10,10)
    fireball.addAnimation("fireball",fireball_img)
    fireball.velocityX=10;
    fireball.lifetime = 135;
  }
}
function ninjacoin(){
  if(World.frameCount%100===0){
    var ninjacoin=createSprite(1600,270,10,10)
    ninjacoin.addImage("ninjacoin",ninjacoin_img)
    ninjacoin.velocityX=-25;
    ninjacoin.scale=-0.2
    ninjacoin.lifetime = 55
    ninjacoinGroup.add(ninjacoin);
  }
}
function Gamereset(){
gameState='play';
reset.visible=false 
}