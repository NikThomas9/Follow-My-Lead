class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload()
    {
        //Load Sprites
        this.load.image('tiles', 'assets/tilemap/Forest.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('pickup', 'assets/obj.png');
        this.load.image('green', 'assets/buttonGreen.png');
        this.load.image('red', 'assets/buttonRed.png');
        this.load.image('blue', 'assets/buttonBlue.png');
        this.load.image('yellow', 'assets/buttonYellow.png');
        this.load.image('greenDisabled', 'assets/buttonGreenDisabled.png');
        this.load.image('redDisabled', 'assets/buttonRedDisabled.png');
        this.load.image('blueDisabled', 'assets/buttonBlueDisabled.png');
        this.load.image('yellowDisabled', 'assets/buttonYellowDisabled.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('puddle', 'assets/puddle.png');
        this.load.image('door', 'assets/door.png');

        this.load.image('paper', 'assets/paper.png');
        this.load.image('note1', 'assets/note1.png');
        this.load.image('samplePaper2', 'assets/sample2.png');
        this.load.image('samplePaper3', 'assets/sample3.png');

        this.load.image('bucketEmpty', 'assets/emptybucket.png');
        this.load.image('bucketFull', 'assets/fullbucket.png');

        this.load.audio('sfx_pickup', './assets/puzzle_click.wav');
        this.load.audio('sfx_walking', './assets/walking.wav');
        this.load.audio('sfx_slam', './assets/slam.wav');
        this.load.audio('sfx_incorrect', './assets/wrong.wav');
        
        this.load.atlas('playerAtlas', 'assets/playerAtlas.png', 'assets/playerAtlas.json');
        this.textures.addSpriteSheetFromAtlas('playerAtlas', {frameHeight: 64, frameWidth: 43, atlas: "playerAtlas"});

        this.load.tilemapTiledJSON('level', 'assets/tilemap/puzzle1.json');
    }

    create()
    {
        currentScene = "playScene";

        //Set up tilemap and world
        const map = this.make.tilemap({ key: 'level'});

        const tiles = map.addTilesetImage('Forest', 'tiles');  
        const groundLayer = map.createStaticLayer("Ground", tiles, 0, 0);     
        const groundLayer2 = map.createStaticLayer("Ground2", tiles, 0, 0);       
        const obstacleLayer = map.createStaticLayer("Obstacles", tiles, 0, 0);
        obstacleLayer.setCollisionByProperty({collides: true});  
        groundLayer.setCollisionByProperty({collides: true});  

        groundLayer.depth = -2;
        groundLayer2.depth = -1;
        obstacleLayer.depth = 1;


        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        
        this.scene.launch("UILayer");

        //Keyboard input
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);      
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);  
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

        const button1Spawn = map.findObject(
            "Objects",
            obj => obj.name === "button1Spawn"
            );
        
        const button2Spawn = map.findObject(
            "Objects",
            obj => obj.name === "button2Spawn"
            );
        
        const button3Spawn = map.findObject(
            "Objects",
            obj => obj.name === "button3Spawn"
            );

        const button4Spawn = map.findObject(
            "Objects",
            obj => obj.name === "button4Spawn"
            );

        const bucketSpawn = map.findObject(
            "Objects",
            obj => obj.name === "bucketSpawn"
            );

        const note1Spawn = map.findObject(
            "Objects",
            obj => obj.name === "note1Spawn"
            );

        const puddleSpawn = map.findObject(
            "Objects",
            obj => obj.name === "puddleSpawn"
            );

        const doorSpawn = map.findObject(
            "Objects",
            obj => obj.name === "doorSpawn"
            );
    
    

                
        this.paper1 = new Note(this, note1Spawn.x, note1Spawn.y, 'paper', null, 'note1').setOrigin(0, 0);
        this.paper2 = new Note(this, game.config.width/2 + 100, game.config.height, 'paper', null, 'samplePaper2').setOrigin(0, 0);
        this.paper3 = new Note(this, game.config.width/2 + 200, game.config.height, 'paper', null, 'samplePaper3').setOrigin(0, 0);

        this.bucket = new Tool(this, bucketSpawn.x, bucketSpawn.y, 'bucketEmpty', null, 'bucketEmpty').setOrigin(0, 0);

        this.puddle = new Obstacle(this, puddleSpawn.x, puddleSpawn.y, 'puddle', null, 'puddle').setOrigin(0, 0);
        this.door = new Obstacle(this, doorSpawn.x, doorSpawn.y, 'door', null, 'door').setOrigin(0, 0);

        obstacles.add(this.puddle);
        obstacles.add(this.door);

        pickups.add(this.paper1);
        pickups.add(this.paper2);
        pickups.add(this.paper3);
        pickups.add(this.bucket);

        this.buttonRed = new Button(this, button1Spawn.x, button1Spawn.y, 'red', this, 'red').setOrigin(0, 0);
        this.buttonBlue = new Button(this, button2Spawn.x, button2Spawn.y, 'blue', this, 'blue').setOrigin(0, 0);
        this.buttonGreen = new Button(this, button3Spawn.x, button3Spawn.y, 'green', this, 'green').setOrigin(0, 0);
        this.buttonYellow = new Button(this, button4Spawn.x, button4Spawn.y, 'yellow', this, 'yellow').setOrigin(0, 0);

        buttons.add(this.buttonRed);
        buttons.add(this.buttonBlue);
        buttons.add(this.buttonGreen);
        buttons.add(this.buttonYellow);

        pickups.getChildren().forEach(item => {item.setImmovable(true)});
        buttons.getChildren().forEach(item => {item.setImmovable(true)});
        obstacles.getChildren().forEach(item => {item.setImmovable(true)});

        /*this.buttonRed.setImmovable(true);
        this.buttonBlue.setImmovable(true);
        this.buttonGreen.setImmovable(true);
        this.buttonYellow.setImmovable(true);

        this.paper1.setImmovable(true);
        this.paper2.setImmovable(true);
        this.paper3.setImmovable(true);
        this.bucket.setImmovable(true);
        this.puddle.setImmovable(true);
        this.door.setImmovable(true);*/

        this.paper1.name = 'Note 1';
        this.paper2.name = 'paper2';
        this.paper3.name = 'paper3';
        this.bucket.name = 'bucket';

        //Physics colliders
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, obstacleLayer);
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