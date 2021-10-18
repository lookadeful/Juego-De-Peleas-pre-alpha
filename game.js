class Game {
  constructor(){}

  getState(){ 
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function(data){
      gameState = data.val();
    })
  }

  update(state){
    database.ref('/').update({
      gameState: state,
    })
  }

  async start(){ 
    if(gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");

      if(playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }

      player.getCount();
      form = new Form();
      form.display();
    }
    
    if(gameState === 2) {
      game.end();
    }

    ground = createSprite(displayWidth / 2, displayHeight, displayWidth, 50)
    invisibleGround = createSprite(displayWidth / 2, displayHeight + 20, displayWidth, 50)

    platform1 = createSprite(250, 500, 200, 20)
    invisiblePlatform1 = createSprite(250, 500, 90, 1)
    platform2 = createSprite(750, 500, 200, 20)
    invisiblePlatform2 = createSprite(750, 500, 90, 1)
    platform3 = createSprite(500, 300, 200, 20)
    invisiblePlatform3 = createSprite(500, 300, 90, 1)

    player1 = createSprite(400, 700, 50, 100);
    player1.shapeColor = "blue";
    player1.addAnimation("run", player1Img)
    player1.addAnimation("jump", player1Jump)
    player1.scale = 0.25

    player2 = createSprite(displayWidth - 400, 700, 50, 100);
    player2.shapeColor = "red";
    player2.addAnimation("run", player2Img)
    player2.scale = 0.25
    player2.mirrorX(-1);

    players = [player1, player2]
  }

  play(){ 
    background(255, 255, 255)
    form.hide();
    textSize(30);
    text("GAME START", 610, 150);
    textSize(20);
    text("Player 1 Life:", 50, 20)
    text(player1life, 50, 50)
    text("Player 2 Life:", 850, 20)
    text(player2life, 7400, 50)
  

    for(var plr in allPlayers){ 
      index ++;
      players[index-1].x = x;
      players[index-1].y = y;
    }

    if(keyDown("a")) {
      player1.x = player1.x - 10
      player1.mirrorX(-1)
      player1.changeAnimation("run", player1Img)
      player.x = player.x - 10
      console.log(player.x)
      player.update();
    }
        
    if(keyDown("d")) {
      player1.x = player1.x + 10
      player1.mirrorX(1)
      player1.changeAnimation("run", player1Img, 20, 20)
      player.x = player.x + 10
      player.update()
    }

    if(keyDown("enter")) {
      stuff = createSprite(player1.x, player1.y, 20, 20);
      stuff.velocityX = 3;
    }
        
    if(keyWentDown("space")) {
      var countdown = 10 
      player1.y = player1.y - 100
      player.y = player.y - 100
      player1.changeAnimation("jump", player1Jump)
      player.update()
            
      var a = setInterval(function() {
        countdown = countdown - 1 
        if(countdown ===  0){
          clearInterval(a);
        }
      }, 1000)
    }
        
    if(keyWentUp("space") && player.index !== null) {
      player1.changeAnimation("run", player1Img)
      player.update()
    }
    
    if(player.life < 0) {
      gameState = 2;
    }

    player1.velocityY = player1.velocityY + 0.8
    player1.collide(invisibleGround)
    player2.velocityY = player2.velocityY + 0.8
    player2.collide(invisibleGround)

    player1.collide(invisiblePlatform1)
    player1.collide(invisiblePlatform2)
    player1.collide(invisiblePlatform3)

    player2.collide(platform1)
    player2.collide(platform2)
    player2.collide(platform3)

    drawSprites();
  } 
}