//create a scene
let gameScene = new Phaser.Scene('game')

// define the score variable
let score = 0;

gameScene.init=function(){
    //hero speed
    this.hrSpeed=2.5

    //dragon speed
    this.dgMinSpeed=2;
    this.dgMaxSpeed=4;
    
    //dragon boundaries
    this.dgMin=80
    this.dgMax=280

    // we are not terminating
    this.isTerminating = false;
}
gameScene.preload=function(){
    //loading sprites
    this.load.image('background','Assets/background.png')
    this.load.image('hero','Assets/player.png')
    this.load.image('dargon','Assets/dragon.png')
    this.load.image('treasure','Assets/treasure.png')
}
gameScene.create=function(){

    //adding Sprites and locations
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

    //creating score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: 'aliceblue', backgroundColor: 'black', borderRadius:'10px' });

    //grouping enemies
    this.dgs=this.add.group({
        key:'dargon',
        repeat:4,
        setXY: {
            x:100,
            y:100,
            stepX:100,
            stepY:20
        }
    });
    //scale dragons
    Phaser.Actions.ScaleXY(this.dgs.getChildren(),-0.6,-0.6)

    Phaser.Actions.Call(this.dgs.getChildren(), function(dg) {
        //flipX
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

    //checking if clicked the right or left arrow keys orthe r key
    var rightArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    var leftArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    var rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    //move hero forward
    if (rightArrowKey.isDown) {
        this.hr.x += this.hrSpeed;
    }
    //move hero backward
    if (leftArrowKey.isDown && this.hr.x > 20) {
        this.hr.x -= this.hrSpeed;
    }
    //restart game
    if (rKey.isDown) {
        this.scene.restart();
    }

    //setting hero boundaries
    let hrRect = this.hr.getBounds();
    //setting treasure boundaries
    let trRect = this.tr.getBounds();

    //checking if hero has hit treasure
    if (Phaser.Geom.Intersects.RectangleToRectangle(hrRect, trRect)) {
        console.log('reached goal!');
        score += 50;
        this.scoreText.setText('Score: ' + score);
        this.hr.setPosition(40,180);
        return this.gameOver();
    }
    //getting dragons
    let dgs = this.dgs.getChildren();
    let numDgs = dgs.length;

    for (let i = 0; i < numDgs; i++) {
        let dg = dgs[i];
        dg.y += dg.speed;
        //setting flip from bottom
        if (dg.y >= this.dgMax) {
            dg.speed *= -1;
        }
        //setting flip from top
        if (dg.y <= this.dgMin) {
            dg.speed *= -1;
        }
        //setting dragon boundaries
        let dgRect = dg.getBounds();

        //checking if hero has hit an enemy
        if (Phaser.Geom.Intersects.RectangleToRectangle(hrRect, dgRect)) {
            console.log('game over');
            score -= 20;
            this.scoreText.setText('Score: ' + score);
            this.hr.setPosition(40,180);
            return this.gameOver();
        }
        //setting random spin on enemies
        var spinDirection = Phaser.Math.RND.between(0, 1) == 0 ? -1 : 1;
        dg.angle += spinDirection * Phaser.Math.RND.between(1, 10);
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
