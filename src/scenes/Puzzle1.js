class Puzzle1 extends Phaser.Scene {
    constructor() {
        super("puzzle1");
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
        this.load.image('portal', 'assets/portal.png');

        this.load.image('paper', 'assets/paper.png');
        this.load.image('note1', 'assets/note1.png');

        this.load.image('bucketEmpty', 'assets/emptybucket.png');
        this.load.image('bucketFull', 'assets/fullbucket.png');

        this.load.audio('sfx_pickup', './assets/puzzle_click.wav');
        this.load.audio('sfx_walking', './assets/walking.wav');
        this.load.audio('sfx_slam', './assets/slam.wav');
        this.load.audio('sfx_incorrect', './assets/wrong.wav');
        
        this.load.atlas('playerAtlas', 'assets/playerAtlas.png', 'assets/playerAtlas.json');

        this.load.tilemapTiledJSON('level', 'assets/tilemap/puzzle1.json');
    }

    create()
    {
        currentScene = "puzzle1";

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

    const tutorial1Trigger = map.findObject(
        "Objects",
        obj => obj.name === "tutorial1"
        );

        this.walkingSFX = this.sound.add("sfx_walking", {loop: true});
        
        //Generate pickups
        pickups = this.physics.add.group();
        buttons = this.physics.add.group();
        obstacles = this.physics.add.group();
        tutorials = this.physics.add.group();

        this.tutorial1 = new Tutorial(this, 0, 0, null, null, tutorial1Message, tutorials, map, "tutorial1");
        this.tutorial2 = new Tutorial(this, 0, 0, null, null, tutorial2Message, tutorials, map, "tutorial2");
        this.tutorial3 = new Tutorial(this, 0, 0, null, null, tutorial3Message, tutorials, map, "tutorial3");
        this.tutorial4 = new Tutorial(this, 0, 0, null, null, tutorial4Message, tutorials, map, "tutorial4");
        this.tutorial5 = new Tutorial(this, 0, 0, null, null, tutorial5Message, tutorials, map, "tutorial5");
                
        this.paper1 = new Note(this, 0, 0, 'paper', null, 'note1', pickups, map, 'Note 1').setOrigin(0, 0);

        this.bucket = new Tool(this, 0, 0, 'bucketEmpty', null, 'bucketEmpty', pickups, map, "bucket").setOrigin(0, 0);

        this.puddle = new Obstacle(this, 0, 0, 'puddle', null, obstacles, map).setOrigin(0, 0);
        this.portal = new Obstacle(this, 0, 0, 'portal', null, obstacles, map).setOrigin(0, 0);

        this.portal.body.enable = false;
        this.portal.setVisible(false);

        this.buttonRed = new Button(this, 0, 0, 'red', this, 'red', buttons, map, 'button1').setOrigin(0, 0);
        this.buttonBlue = new Button(this, 0, 0, 'blue', this, 'blue', buttons, map, 'button2').setOrigin(0, 0);
        this.buttonGreen = new Button(this, 0, 0, 'green', this, 'green', buttons, map, 'button3').setOrigin(0, 0);
        this.buttonYellow = new Button(this, 0, 0, 'yellow', this, 'yellow', buttons, map, 'button4').setOrigin(0, 0);

        //Physics colliders
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, obstacleLayer);
        this.physics.add.collider(this.player, pickups);
        this.physics.add.collider(this.player, buttons);
        this.physics.add.collider(this.player, obstacles);
        
        this.physics.add.overlap(this.player, tutorials, this.tutorialPopup);

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

        this.input.keyboard.on('keydown-F', this.inventoryToggle, this);
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
            combination.push(obj.code);
            console.log(combination);
            obj.scene.sound.play("sfx_pickup");

            obj.isDisabled = true;
            obj.setTexture(obj.code+"Disabled")
        

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

                    obj.scene.portal.setVisible(true);
                    obj.scene.portal.body.enable = true;            
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

        if (obj.name =="portal")
        {
            obj.scene.loadNextLevel();
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
                item.setTexture(item.code);
                item.isDisabled = false;
            })
    }

    loadNextLevel()
    {
        this.scene.start("puzzle2");
    }

    tutorialPopup(sprite, obj)
    {
        if (obj.played == false && !tutorialActive)
        {
            tutorialActive = true;
            tutorialText = obj.message;
            obj.played = true;
        }
        else if(obj.played == false && tutorialActive)
        {
            tutorialActive = false;
            tutorialTimerReset = true;
        }
    }
}