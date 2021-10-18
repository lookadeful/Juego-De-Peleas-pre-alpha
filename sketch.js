var player1, player2;
var player1Img, player2Img, player3Img, player4Img, player5Img, player6Img, player7Img, player8Img, player9Img
var player1Jump
var ground, invisibleGround
var platform1, platform2, platform3
var invisiblePlatform1, invisiblePlatform2, invisiblePlatform3
var allPlayers, players;
var stuff
var player1life = 200
var player2life = 200 

var power
var gameState = 0;
var database
var form, player, game;
var playerCount;

function preload() {
  player1Img = loadAnimation("png/Run (1).png", "png/Run (2).png", "png/Run (3).png", "png/Run (4).png", "png/Run (5).png", "png/Run (6).png", "png/Run (7).png", "png/Run (8).png");
  player1Jump = loadAnimation("png/Jump (1).png", "png/Jump (2).png", "png/Jump (3).png", "png/Jump (4).png", "png/Jump (5).png", "png/Jump (6).png", "png/Jump (7).png", "png/Jump (8).png", "png/Jump (9).png", "png/Jump (10).png")
  player2Img = loadAnimation("png/Shoot(1).png")
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 750);

  game = new Game();
  game.getState();
  game.start()
}

function draw() {
  background(255, 255, 255);

  if(playerCount === 2){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.end();
  }
}
