// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {
  this.playerSpeed=170;
  this.jumpSpeed=-500;
};

// load asset files for our game
gameScene.preload = function() {

  // load images
  this.load.image('ground', 'assets/images/ground.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.image('block', 'assets/images/block.png');
  this.load.image('goal', 'assets/images/gorilla3.png');
  this.load.image('barrel', 'assets/images/barrel.png');

  // load spritesheets
  this.load.spritesheet('player', 'assets/images/player_spritesheet.png', {
    frameWidth: 28,
    frameHeight: 30,
    margin: 1,
    spacing: 1
  });

  this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', {
    frameWidth: 20,
    frameHeight: 21,
    margin: 1,
    spacing: 1
  });
  this.load.json('levelData',"Assets/images/JSON/levelDATA.json")
};



// executed once, after assets were loaded
gameScene.create=function() {
  //world bounds
  this.physics.world.bounds.width=360
  this.physics.world.bounds.height=700
  
  this.anims.create({
    key:'burning',
    frames:this.anims.generateFrameNames('fire',{
      frames:[0,1],
    }),
    frameRate:4,
    repeat:-1
  })
  //walking animation
  this.anims.create({
    key:"walking",
    frames:this.anims.generateFrameNames('player',{
      frames:[0,1,2],
    }),
    frameRate:12,
    yoyo:true,
    repeat:-1,
  })

  //add levels to game
  this.setUpLevel();
  this.setupSpawner()
  //fire animation
  
  //add existing sprites
  let ground=this.add.sprite(180,640, "ground") 
  this.platforms.add(ground)
  //add sprite to physics
  this.physics.add.existing(ground)

  // this.physics.add.collider(ground);
  this.physics.add.collider(this.player,this.platforms);
  this.physics.add.collider(this.goal,this.platforms);
  this.physics.add.collider(this.barrels,this.platforms)
  
  //add overlap
  this.physics.add.overlap(this.player,[this.fires,this.goal,this.barrels],this.restartGame,null,this)

  //disable gravity
  ground.body.allowGravity=false;

  //make object immovable
  ground.body.immovable=true

  //make movement keys
  cursors=this.input.keyboard.createCursorKeys();
  
  //constrain player to game bounds
  this.player.body.setCollideWorldBounds(true)
};

gameScene.update=function(){

  //check if on ground
  let onGround=this.player.body.blocked.down||this.player.body.touching.down

  //left movement
  if(cursors.left.isDown){
    this.player.body.setVelocityX(-this.playerSpeed)
    this.player.flipX=false
    this.player.flipY=false
    //play animation
    if(onGround && !this.player.anims.isPlaying){
      this.player.anims.play('walking')
    }
  }

  //right movement
  else if(cursors.right.isDown){
    this.player.body.setVelocityX(this.playerSpeed)
    this.player.flipX=true
    //play animation
    if(onGround && !this.player.anims.isPlaying){
      this.player.anims.play('walking')
    }
  }

  //jump movement
  else if(onGround && (cursors.up.isDown|| cursors.space.isDown)){
    this.player.body.setVelocityY(this.jumpSpeed)
    //stop walking animation
    this.player.anims.stop('walking')
    //set default
    this.player.setFrame(2)
  }

  else{
    //make player stop moving
    this.player.body.setVelocityX(0);
    //stop walking animation
    this.player.anims.stop('walking')
    if(onGround){
    //set default
    this.player.setFrame(3)
    }
  }
}

//set up elements in level
gameScene.setUpLevel =function(){

  //create platform
  this.platforms=this.physics.add.staticGroup();
  this.platforms=this.add.group();

  //use JSON data
  this.levelData=this.cache.json.get('levelData');

  //create all platforms
  for(let i=0;i<this.levelData.platforms.length;i++){
    let curr=this.levelData.platforms[i];
    let newObj;

    //create objects
    if(curr.numTiles==1){
      //create sprite
      newObj=this.add.sprite(curr.x,curr.y,curr.key).setOrigin(0);
    }

    //create tiles
    else{
      let width=this.textures.get(curr.key).get(0).width;
      let height=this.textures.get(curr.key).get(0).height;
      newObj=this.add.tileSprite(curr.x,curr.y,curr.numTiles*width,height,curr.key).setOrigin(0);
    }

    //enable physics
    this.physics.add.existing(newObj,true)

    //add to group
    this.platforms.add(newObj)
  }

  //add physics to fire
  this.fires=this.physics.add.group({
    allowGravity:false,
    immovable:true
  })

  //create fires
  this.fires=this.physics.add.group({
    allowGravity:false,
    immovable:true
  })

  for(let i=0;i<this.levelData.fires.length; i++){
    let curr=this.levelData.fires[i];
    let newObj=this.add.sprite(curr.x,curr.y,'fire').setOrigin(0);
    
    //play burning animation
    newObj.anims.play('burning')

    //add to group
    this.fires.add(newObj);
  }

  //for level creation
  this.input.on('drag',function(pointer,gameObject,dragX, dragY){
    gameObject.x=dragX
    gameObject.y=dragY
    console.log(dragX,dragY)
  })

  //player
  this.player=this.add.sprite(this.levelData.player.x,this.levelData.player.y,"player",3)
  this.physics.add.existing(this.player)
  //camera bounds
  this.cameras.main.setBounds(0,0,360,700)
  //follow player
  this.cameras.main.startFollow(this.player)
  //goal
  this.goal=this.add.sprite(this.levelData.goal.x,this.levelData.goal.y,'goal')
  this.physics.add.existing(this.goal)
}

//restarts game
gameScene.restartGame=function(sourceSprite,targetSprite){
  this.cameras.main.fade(1000)
  //when the fade is complete
  this.cameras.main.on('camerafadeoutcomplete',function(camera){
    //restart scene
    this.scene.restart()
  },this)
}

//barrel spawner
gameScene.setupSpawner=function(){
  //make barrel group
  this.barrels=this.physics.add.group({
    bounceY:0.1,
    bounceX:1, 
    collideWorldBounds:true,
  })

  //spawn barrels
  let spwanEvent=this.time.addEvent({
    delay:this.levelData.spawner.interval,
    loop:true,
    callbackScope:this,
    callback:function(){
      //create barrel
      let barrel=this.barrels.create(this.goal.x,this.goal.y,'barrel')
      barrel.setActive(true)
      barrel.setVisible(true)
      barrel.body.enable=true
      //set properties
      barrel.setVelocityX(this.levelData.spawner.speed)
      //lifespan
      this.time.addEvent({
        delay:this.levelData.spawner.lifeSpan,
        repeat:0,
        callbackScope:this,
        callback:function(){
          this.barrels.killAndHide(barrel)
          barrel.body.enable=false
        }
      })
    }
  })
}

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: gameScene,
  title: 'Monster Kong',
  pixelArt: false,
  physics:{
    default:'arcade',
    arcade:{
      gravity:{y:1000},
      debug:true,
    }
  }
  
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
