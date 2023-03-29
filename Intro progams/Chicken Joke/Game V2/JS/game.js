//create a scene
let gameScene = new Phaser.Scene('game')
//load assets


// define the score variable
let score = 0;


gameScene.init=function(){
    //hero speed
    this.hrSpeed=4
    //enemy speed
    this.dgMinSpeed=-10;
    this.dgMaxSpeed=5;
    
    //boundaries
    this.dgMin=100
    this.dgMax=270

     // we are not terminating
     this.isTerminating = false;
}

gameScene.preload=function(){
    //create sprites
    this.load.image('background','Assets/battleback1.png')
    this.load.image('hero','Assets/Hero.png')
    this.load.image('ninja','Assets/ninja.png')
    this.load.image("ninja2",'Assets/ninja_back.png')
    this.load.image('treasure','Assets/treasure.png')
}
gameScene.create=function(){
    //create Sprites
    this.bg=this.add.sprite(0,0,'background')
    this.bg.setPosition(320,180)

    this.hr=this.add.sprite(0,0,'hero')
    this.hr.setPosition(40,180)

    this.add.sprite('ninja')
    this.add.sprite('ninja2')
    this.tr=this.add.sprite(0,0,'treasure')
    this.tr.setPosition(560,180)
    

    //scaling/flipping
    this.hr.setScale(.5)
    
    this.tr.setScale(0.32)

    this.bg.setScale(0.6)

    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: 'aliceblue', backgroundColor: 'black', borderRadius:'10px' });

    //grouping enemies
    this.dgs=this.add.group({
        key:'ninja',
        repeat:4,
        setXY: {
            x:100,
            y:110,
            stepX:100,
            stepY:20
        }

    });

    Phaser.Actions.ScaleXY(this.dgs.getChildren(),-.5,-.5)

    //flipX
    Phaser.Actions.Call(this.dgs.getChildren(), function(dg) {
        //set flip X
        dg.flipX = true;

        
        //ninja speed
    let dir= Math.random() <0.5 ? 1:-1;
    let speed=this.dgMinSpeed+Math.random() *(this.dgMaxSpeed-this.dgMinSpeed)
    dg.speed=dir*speed


    }, this);

    
    
}


//used about 60 per seconds
gameScene.update = function() {

    // don't execute if we are terminating
    if(this.isTerminating) return;

    var rightArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    var downArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    var upArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    var leftArrowKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    var rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    if (rightArrowKey.isDown && this.hr.x < 620) {
        this.hr.x += this.hrSpeed;
    }

    if (leftArrowKey.isDown && this.hr.x > 20) {
        this.hr.x -= this.hrSpeed;
    }

    if (downArrowKey.isDown && this.hr.y < 270) {
        this.hr.y += this.hrSpeed;
    }

    if (upArrowKey.isDown && this.hr.y > 100) {
        this.hr.y -= this.hrSpeed;
    }

    if (rKey.isDown) {
        this.scene.restart();
    }


    let hrRect = this.hr.getBounds();
    let trRect = this.tr.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(hrRect, trRect)) {
        console.log('reached goal!');
        score += 50;
        this.scoreText.setText('Score: ' + score);

        this.hr.setPosition(40,180);
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
            score -= 20;
            this.scoreText.setText('Score: ' + score);
            this.hr.setPosition(40,180);
            return this.gameOver();
        }

        // var spinDirection = Phaser.Math.RND.between(0, 1) == 0 ? -1 : 1;
        // dg.angle += spinDirection * Phaser.Math.RND.between(1, 10);
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
