class Player{
  constructor(){
    this.index = null;
    this.life = 200; 
    this.name = null;
    this.rank = null; 
    this.x = 400;
    this.y = 750
  }
  
  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value", function(data){
      playerCount = data.val();
    })
  }
  
  updateCount(count){
    database.ref('/').update({
      playerCount: count
    })
  }
  
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name: this.name,
      life: this.life,
      x: this.x,
      y: this.y,
    })
  }
  
  static getPlayerInfo(){
    var playerInfoRef = database.ref('players')
    playerInfoRef.on("value", (data)=>{
      allPlayers = data.val()
    })
  }
}

