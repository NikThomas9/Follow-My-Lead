class Puzzle2 extends Phaser.Scene {
    constructor() {
        super("puzzle2");
    }

    preload()
    {
        //Load Sprites
        this.load.image('tiles_dark', 'assets/tilemap/Forest_Dark.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('arrow', 'assets/arrow.png');

        this.load.image('paper', 'assets/paper.png');
        this.load.image('note1', 'assets/note1.png');
        this.load.image('samplePaper2', 'assets/sample2.png');
        this.load.image('samplePaper3', 'assets/sample3.png');

        this.load.image('bucketFull', 'assets/fullbucket.png');

        this.load.audio('sfx_pickup', './assets/puzzle_click.wav');
        this.load.audio('sfx_walking', './assets/walking.wav');
        this.load.audio('sfx_slam', './assets/slam.wav');
        this.load.audio('sfx_incorrect', './assets/wrong.wav');
        
        this.load.atlas('playerAtlas', 'assets/playerAtlas.png', 'assets/playerAtlas.json');

        this.load.tilemapTiledJSON('level2', 'assets/tilemap/puzzle2.json');
    }

    create()
    {
        //Set up tilemap and world
        const map = this.make.tilemap({ key: 'level2'});

        const tiles = map.addTilesetImage('Forest_Dark', 'tiles_dark');  
        const groundLayer = map.createStaticLayer("Ground", tiles, 0, 0);     
        const groundLayer2 = map.createStaticLayer("Ground2", tiles, 0, 0);       
        const obstacleLayer = map.createStaticLayer("Obstacles", tiles, 0, 0);
        groundLayer.setCollisionByProperty({collides: true});  
        obstacleLayer.setCollisionByProperty({collides: true});  

        groundLayer.depth = -2;
        groundLayer2.depth = -1;
        obstacleLayer.depth = 1;


        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        
        this.scene.launch("UILayer");

        //Keyboard input
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);      
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);  
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);    

        this.inventoryEnabled = false;

        const playerSpawn = map.findObject(
            "Objects",
            obj => obj.name === "playerSpawn"
          );

          this.anims.create({
              key: "back",
              frameRate: 7,
              frames: this.anims.generateFrameNames("playerAtlas", {
                  prefix: "back",
                  suffix: ".png",
                  start: 0,
                  end: 3,
                  zeroPad: 1
              }),
              repeat: -1
          });    
          
          this.anims.create({
              key: "left",
              frameRate: 7,
              frames: this.anims.generateFrameNames("playerAtlas", {
                  prefix: "left",
                  suffix: ".png",
                  start: 0,
                  end: 3,
                  zeroPad: 1
              }),
              repeat: -1
          });   
  
          this.anims.create({
              key: "front",
              frameRate: 7,
              frames: this.anims.generateFrameNames("playerAtlas", {
                  prefix: "front",
                  suffix: ".png",
                  start: 0,
                  end: 3,
                  zeroPad: 1
              }),
              repeat: -1
          });      
  

        this.anims.create({
            key: "right",
            frameRate: 7,
            frames: this.anims.generateFrameNames("playerAtlas", {
                prefix: "right",
                suffix: ".png",
                start: 0,
                end: 3,
                zeroPad: 1
            }),
            repeat: -1
        });   
        
        this.anims.create({
            key: "backStop",
            frameRate: 7,
            frames: this.anims.generateFrameNames("playerAtlas", {
                prefix: "back",
                suffix: ".png",
                start: 0,
                end: 0,
                zeroPad: 1
            }),
            repeat: -1
        });    
        
        this.anims.create({
            key: "leftStop",
            frameRate: 7,
            frames: this.anims.generateFrameNames("playerAtlas", {
                prefix: "left",
                suffix: ".png",
                start: 0,
                end: 0,
                zeroPad: 1
            }),
            repeat: -1
        });   

        this.anims.create({
            key: "frontStop",
            frameRate: 7,
            frames: this.anims.generateFrameNames("playerAtlas", {
                prefix: "front",
                suffix: ".png",
                start: 0,
                end: 0,
                zeroPad: 1
            }),
            repeat: -1
        });      

      this.anims.create({
          key: "rightStop",
          frameRate: 7,
          frames: this.anims.generateFrameNames("playerAtlas", {
              prefix: "right",
              suffix: ".png",
              start: 0,
              end: 0,
              zeroPad: 1
          }),
          repeat: -1
      });           
      
      this.player = new Player(
            this,
            playerSpawn.x,
            playerSpawn.y,
            'playerAtlas',
            'back0.png'
        ).setOrigin(0,0);

        this.walkingSFX = this.sound.add("sfx_walking", {loop: true});
        
        //Generate pickups
        pickups = this.physics.add.group();
        buttons = this.physics.add.group();
        obstacles = this.physics.add.group();
                
        this.paper1 = new Note(this, 0, 0, 'paper', null, 'note1').setOrigin(0, 0);
        this.paper2 = new Note(this, 0, 0, 'paper', null, 'samplePaper2').setOrigin(0, 0);

        this.bucket = new Tool(this, 0, 0, 'bucketEmpty', null, 'bucketEmpty').setOrigin(0, 0);

        this.puddle = new Obstacle(this, 0, 0, 'puddle', null, 'puddle').setOrigin(0, 0);

        obstacles.add(this.puddle);

        pickups.add(this.paper1);
        pickups.add(this.paper2);
        pickups.add(this.bucket);

        this.buttonRed = new Button(this, 0, 0, 'red', this, 'red').setOrigin(0, 0);

        buttons.add(this.buttonRed);

        pickups.getChildren().forEach(item => {item.setImmovable(true)});
        buttons.getChildren().forEach(item => {item.setImmovable(true)});
        obstacles.getChildren().forEach(item => {item.setImmovable(true)});

        this.paper1.name = 'Note 1';
        this.paper2.name = 'paper2';
        this.bucket.name = 'bucket';

        //Physics colliders
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, obstacleLayer);
        this.physics.add.collider(this.player, groundLayer);

        this.physics.add.collider(this.player, pickups);
        this.physics.add.collider(this.player, buttons);
        this.physics.add.collider(this.player, obstacles);

        this.pickupHandler = this.physics.add.overlap(this.player.radius, pickups, this.handlePickup);
        this.buttonHandler = this.physics.add.overlap(this.player.radius, buttons, this.handleButton);
        this.obstacleHandler = this.physics.add.overlap(this.player.radius, obstacles, this.handleObstacle);

        this.pickupHandler.active = false;
        this.buttonHandler.active = false;
        this.obstacleHandler.active = false;

        //Set camera follow
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        //Debug colliders for the tilemap
        /*const debugGraphics = this.add.graphics().setAlpha(0.75);
        groundLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/

        this.input.keyboard.on('keydown-I', this.inventoryToggle, this);
        this.input.keyboard.on('keydown-SPACE', this.interact, this);
    }

    update()
    {
        this.player.update();
        this.pickupHandler.active = false;
        this.buttonHandler.active = false;
        this.obstacleHandler.active = false;


        if (newPickup && this.scene.isActive("inventoryMenu"))
        {
            this.scene.launch("inventoryMenu");
            newPickup = false;
        }
    }

    handlePickup(sprite, obj)
    {
        pickups.killAndHide(obj);
        inventory.push(obj);

        console.log(inventory);
        obj.body.enable = false;   

        newPickup = true;

        obj.scene.sound.play("sfx_pickup");
    }

    handleButton(sprite, obj)
    {
        if (!obj.isDisabled)
        {
            combination.push(obj.color);
            console.log(combination);
            obj.scene.sound.play("sfx_pickup");

            obj.isDisabled = true;
            obj.setTexture(obj.color+"Disabled")
        

            //Evaluate combo
            if (combination.length == 4)
            {
                var success = true;
                var index = 0;
                combination.forEach(item =>{
                    if (item != code1[index])
                    {
                        success = false;
                    }
                    index++;
                });

                if (success)
                {
                    console.log("success");
                    obj.scene.sound.play("sfx_slam");

                    if (obj.scene.door != null)
                    {
                        obj.scene.door.destroy();
                    }
                }
                else
                {
                    console.log("failure");
                    obj.scene.sound.play("sfx_incorrect");
                    combination = [];
                    obj.scene.resetButtons();
                }
            }
        }
    }

    handleObstacle(sprite, obj)
    {
        if (obj.name == "puddle" && activeTool.name == "bucket")
        {
            obj.destroy();
            activeTool.uiSprite = "bucketFull";
            console.log(activeTool.name);
        }
    }

    inventoryToggle()
    {
        this.scene.launch("inventoryMenu");
        this.scene.pause(this);
        this.scene.setActive(true, "inventoryMenu");
        this.scene.setVisible(true, "inventoryMenu");
    }

    interact()
    {
        this.pickupHandler.active = true;
        this.buttonHandler.active = true;
        this.obstacleHandler.active = true;
    }

    resetButtons()
    {
        buttons.getChildren().forEach(item => 
            {
                item.setTexture(item.color);
                item.isDisabled = false;
            })
    }
}