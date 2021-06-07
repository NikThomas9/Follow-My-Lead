class Puzzle2 extends Phaser.Scene {
    constructor() {
        super("puzzle2");
    }

    preload()
    {
        //Load Sprites
        this.load.image('tiles_dark', 'assets/tilemap/Forest_Dark.png');
        //this.load.image('player', 'assets/player.png');
        //this.load.image('arrow', 'assets/arrow.png');

        this.load.image('cauldron_empty', 'assets/cauldron_empty.png');
        this.load.image('cauldron_full', 'assets/cauldron_full.png');
        this.load.image('pedestal', 'assets/pedestal.png');
        this.load.image('Pickaxe', 'assets/pickaxe.png');
        this.load.image('Torch', 'assets/torch.png');
        this.load.image('portal', 'assets/portal.png');
        this.load.image('Orb', 'assets/orb.png');
        this.load.image('boulder', 'assets/boulder.png');

        this.load.image('die1', 'assets/die1.png');
        this.load.image('die2', 'assets/die2.png');
        this.load.image('die3', 'assets/die3.png');
        this.load.image('die4', 'assets/die4.png');
        this.load.image('die5', 'assets/die5.png');
        this.load.image('die6', 'assets/die6.png');

        this.load.image('die1Disabled', 'assets/die1Disabled.png');
        this.load.image('die2Disabled', 'assets/die2Disabled.png');
        this.load.image('die3Disabled', 'assets/die3Disabled.png');
        this.load.image('die4Disabled', 'assets/die4Disabled.png');
        this.load.image('die5Disabled', 'assets/die5Disabled.png');
        this.load.image('die6Disabled', 'assets/die6Disabled.png');

        //this.load.image('paper', 'assets/paper.png');
        //this.load.image('note1', 'assets/note1.png');
        this.load.image('note2', 'assets/note2.png');
        this.load.image('note3', 'assets/note3.png');

        //this.load.image('bucket', 'assets/fullbucket.png');

        this.load.audio('sfx_pickup', './assets/puzzle_click.wav');
        this.load.audio('sfx_walking', './assets/walking.wav');
        this.load.audio('sfx_slam', './assets/slam.wav');
        this.load.audio('sfx_incorrect', './assets/wrong.wav');
        this.load.audio('sfx_rockfall', './assets/smash.wav');
        this.load.audio('sfx_cauldron', './assets/bubbling-cauldron.wav');
        this.load.audio('sfx_torch', './assets/torch.wav');
        this.load.audio('sfx_teleport', './assets/teleport.mp3');
        //this.load.atlas('playerAtlas', 'assets/playerAtlas.png', 'assets/playerAtlas.json');

        this.load.tilemapTiledJSON('level2', 'assets/tilemap/puzzle2.json');
    }

    create()
    {
        currentScene = "puzzle2";
        this.isLoading = false;

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

        const orbSpriteSpawn = map.findObject(
            "Objects",
            obj => obj.name === "orbInPedestalSpawn"
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
              
        this.paper2 = new Note(this, 0, 0, 'paper', null, 'note2', pickups, map, 'Note 2').setOrigin(0, 0);
        this.paper3 = new Note(this, 0, 0, 'paper', null, 'note3', pickups, map, 'Note 3').setOrigin(0, 0);

        this.pickaxe = new Tool(this, 0, 0, 'Pickaxe', null, 'Pickaxe', pickups, map).setOrigin(0, 0);       
        this.torch = new Tool(this, 0, 0, 'Torch', null, 'Torch', pickups, map).setOrigin(0, 0);
        this.orb = new Tool(this, 0, 0, 'Orb', null, 'Orb', pickups, map).setOrigin(0, 0);
        this.orbInPedestal = this.add.sprite(orbSpriteSpawn.x, orbSpriteSpawn.y, 'Orb');

        this.die1 = new Button(this, 0, 0, "die1", null, 1, buttons, map).setOrigin(0, 0);
        this.die2 = new Button(this, 0, 0, "die2", null, 2, buttons, map).setOrigin(0, 0);
        this.die3 = new Button(this, 0, 0, "die3", null, 3, buttons, map).setOrigin(0, 0);
        this.die4 = new Button(this, 0, 0, "die4", null, 4, buttons, map).setOrigin(0, 0);
        this.die5 = new Button(this, 0, 0, "die5", null, 5, buttons, map).setOrigin(0, 0);
        this.die6 = new Button(this, 0, 0, "die6", null, 6, buttons, map).setOrigin(0, 0);

        this.orbInPedestal.setVisible(false);
        this.orb.body.enable = false;
        this.orb.setVisible(false);

        this.pickaxe.body.enable = false;
        this.pickaxe.setVisible(false);

        this.boulder = new Obstacle(this, 0, 0, 'boulder', null, obstacles, map).setOrigin(0, 0);
        this.cauldron = new Obstacle(this, 0, 0, 'cauldron_empty', null, obstacles, map, 'cauldron').setOrigin(0, 0);
        this.pedestal = new Obstacle(this, 0, 0, 'pedestal', null, obstacles, map).setOrigin(0, 0);
        this.portal = new Obstacle(this, 0, 0, 'portal', null, obstacles, map).setOrigin(0, 0);

        this.portal.body.enable = false;
        this.portal.setVisible(false);

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

        this.input.keyboard.on('keydown-F', this.inventoryToggle, this);
        this.input.keyboard.on('keydown-SPACE', this.interact, this);
    }

    update()
    {
        if (!this.isLoading)
        {
            this.player.update();
            this.pickupHandler.active = false;
            this.buttonHandler.active = false;
            this.obstacleHandler.active = false;
        }


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
            combination2.push(obj.code);
            console.log(combination2);
            obj.scene.sound.play("sfx_pickup");

            obj.isDisabled = true;
            obj.setTexture(obj.name + "Disabled")
        

            //Evaluate combo
            if (combination2.length == 6)
            {
                var success = true;
                var index = 0;
                combination2.forEach(item =>{
                    if (item != code2[index])
                    {
                        success = false;
                    }
                    index++;
                });

                if (success)
                {
                    console.log("success");
                    obj.scene.sound.play("sfx_slam");
                    obj.scene.pickaxe.body.enable = true;
                    obj.scene.pickaxe.setVisible(true);        
                }
                else
                {
                    console.log("failure");
                    obj.scene.sound.play("sfx_incorrect");
                    combination2 = [];
                    obj.scene.resetButtons();
                }
            }
        }
    }

    handleObstacle(sprite, obj)
    {
        var toolName = "None";

        if (activeTool != null)
        {
            toolName = activeTool.name;
        }

        if (obj.name == "portal")
        {
            obj.scene.sound.play("sfx_teleport");
            obj.scene.loadNextLevel();
        }

        if (obj.name == "boulder" && toolName == "Pickaxe")
        {
            obj.scene.sound.play("sfx_rockfall");
            obj.destroy();
        }

        if (obj.name == "cauldron" && (toolName == "Torch" || toolName == "Bucket"))
        {
            if(activeTool.name == "Torch"){
                obj.scene.sound.play("sfx_pickup");
                obj.scene.sound.play("sfx_torch");
            }

            if(activeTool.name == "Bucket"){
                obj.scene.sound.play("sfx_pickup");
                obj.scene.sound.play("sfx_water");
            }
            
            obj.contains.push(activeTool);

            for(var i = 0; i < inventory.length; i++){ 
                if (inventory[i] == activeTool) { 
                    inventory.splice(i, 1); 
                }
            }    

            activeTool = null;

            if (obj.contains.length >= 2)
            {
                obj.scene.sound.play('sfx_cauldron');
                obj.setTexture("cauldron_full");
                obj.scene.orb.body.enable = true;
                obj.scene.orb.setVisible(true);    
            }
        }

        if (obj.name == "pedestal" && (toolName == "Orb"))
        {
            obj.contains.push(activeTool);

            for(var i = 0; i < inventory.length; i++){ 
                if (inventory[i] == activeTool) { 
                    inventory.splice(i, 1); 
                }
            }    
            
            obj.scene.sound.play("sfx_door");
            obj.scene.sound.play("sfx_pickup");

            obj.scene.portal.setVisible(true);
            obj.scene.portal.body.enable = true;   
            obj.scene.orbInPedestal.setVisible(true);

            activeTool = null;
        }
    }

    inventoryToggle()
    {
        this.walkingSFX.stop();
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
                item.setTexture(item.name);
                item.isDisabled = false;
            })
    }
    loadNextLevel()
    {
        this.isLoading = true;
        this.walkingSFX.stop();
        this.scene.setActive(false, "inventoryMenu");
        this.scene.setActive(false, "UILayer");
        this.scene.setVisible(false, "inventoryMenu");
        this.scene.setVisible(false, "UILayer");
        this.scene.start("ending");
    }
}