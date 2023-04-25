//create a scene
let gameScene = new Phaser.Scene('game')
//load assets

gameScene.init=function(){
    //hero speed
    this.hrSpeed=2.5
    //enemy speed
    this.dgMinSpeed=2;
    this.dgMaxSpeed=4;
    
    //boundaries
    this.dgMin=80
    this.dgMax=280

    // we are not terminating
    this.isTerminating = false;
}

gameScene.preload=function(){
    //create sprites
    this.load.image('background','Assets/background.png')
    this.load.image('hero','Assets/player.png')
    this.load.image('dargon','Assets/dragon.png')
    this.load.image('treasure','Assets/treasure.png')
}
gameScene.create=function(){
    //create Sprites
    this.bg=this.add.sprite(0,0,'background')
    this.bg.setPosition(320,180)

    this.hr=this.add.sprite(0,0,'hero')
    this.hr.setPosition(40,180)

    this.add.sprite('dargon')

    this.tr=this.add.sprite(0,0,'treasure')
    this.tr.setPosition(560,180)
    

    //scaling/flipping
    this.hr.setScale(0.5)
    
    this.tr.setScale(0.6)

    //grouping enemies
    this.dgs=this.add.group({
        key:'dargon',
        repeat:5,
        setXY: {
            x:100,
            y:100,
            stepX:80,
            stepY:20
        }

    });

    Phaser.Actions.ScaleXY(this.dgs.getChildren(),-0.6,-0.6)

    //flipX
    Phaser.Actions.Call(this.dgs.getChildren(), function(dg) {
        //set flip X
        dg.flipX = true;

        
        //dargon speed
    let dir= Math.random() <0.5 ? 1:-1;
    let speed=this.dgMinSpeed+Math.random() *(this.dgMaxSpeed-this.dgMinSpeed)
    dg.speed=dir*speed


    }, this);

    
    
}


//used about 60 per seconds
gameScene.update = function() {

    // don't execute if we are terminating
  if(this.isTerminating) return;

     // check for active input
  if(this.input.activePointer.isDown) {
    // player walks
    this.hr.x += this.hrSpeed;
  }


    let hrRect = this.hr.getBounds();
    let trRect = this.tr.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(hrRect, trRect)) {
        console.log('reached goal!');

        
        return this.gameOver();
    }

    let dgs = this.dgs.getChildren();
    let numDgs = dgs.length;

    for (let i = 0; i < numDgs; i++) {
        let dg = dgs[i];
        dg.y += dg.speed;

        if (dg.y >= this.dgMax) {
            dg.speed *= -1;
        }

        if (dg.y <= this.dgMin) {
            dg.speed *= -1;
        }

        let dgRect = dg.getBounds();

        if (Phaser.Geom.Intersects.RectangleToRectangle(hrRect, dgRect)) {
            console.log('game over');
            return this.gameOver();
        }
    }
};

gameScene.gameOver = function() {
  
    // initiated game over sequence
    this.isTerminating = true;
    
    // shake camera
    this.cameras.main.shake(500);
    
    // listen for event completion
    this.cameras.main.on('camerashakecomplete', function(camera, effect){
      
      // fade out
      this.cameras.main.fade(500);
    }, this);
    
    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
      // restart the Scene
      this.scene.restart();
    }, this);
    
    
    
  };

//set up configuration of our game
let config={
    type:Phaser.auto,  //phaser will use webGL if avalible
    width:640,
    height:360,
    scene:gameScene,
};
//create a new game, and pass configuration
let game=new Phaser.Game(config)