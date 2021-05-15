class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload()
    {
        //Load Sprites
        this.load.image('tiles', 'assets/tiles.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('pickup', 'assets/obj.png');
        this.load.image('green', 'assets/buttonGreen.png');
        this.load.image('red', 'assets/buttonRed.png');
        this.load.image('blue', 'assets/buttonBlue.png');
        this.load.image('greenDisabled', 'assets/buttonGreenDisabled.png');
        this.load.image('redDisabled', 'assets/buttonRedDisabled.png');
        this.load.image('blueDisabled', 'assets/buttonBlueDisabled.png');

        this.load.image('paper', 'assets/paper.png');
        this.load.image('samplePaper', 'assets/samplePaper.png');

        this.load.audio('sfx_pickup', './assets/puzzle_click.wav');
        this.load.audio('sfx_walking', './assets/walking.wav');
        this.load.audio('sfx_slam', './assets/slam.wav');
        this.load.audio('sfx_incorrect', './assets/wrong.wav');


        this.load.tilemapTiledJSON('level', 'assets/testmap.json');
    }

    create()
    {
        //Keyboard input
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);      
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);  
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);    

        this.inventoryEnabled = false;
             
        this.player = new Player(
            this,
            game.config.width,
            game.config.height*4,
            'player',
        ).setOrigin(0,0);

        this.walkingSFX = this.sound.add("sfx_walking", {loop: true});
        
        //Generate pickups
        pickups = this.physics.add.staticGroup();
        buttons = this.physics.add.group();

        var paper = pickups.create(game.config.width/2, game.config.height, 'paper');
        this.buttonRed = new Button(this, game.config.width * 2 + 300, game.config.height, 'red', this, 'red').setOrigin(0, 0);
        this.buttonBlue = new Button(this, game.config.width/2 - 150, game.config.height + 30, 'blue', this, 'blue').setOrigin(0, 0);
        this.buttonGreen = new Button(this, game.config.width + 150, game.config.height /2, 'green', this, 'green').setOrigin(0, 0);

        buttons.add(this.buttonRed);
        buttons.add(this.buttonBlue);
        buttons.add(this.buttonGreen);

        this.buttonRed.setImmovable(true);
        this.buttonBlue.setImmovable(true);
        this.buttonGreen.setImmovable(true);

        paper.name = 'paper1';

        this.player.depth = 1;
        paper.depth = 1;        

        //Set up tilemap and world
        const map = this.make.tilemap({ key: 'level'});
        
        const tiles = map.addTilesetImage('tiles', 'tiles');  
        const worldLayer = map.createStaticLayer(0, tiles, 0, 0);      
        worldLayer.setCollision(3);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        //Physics colliders
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.collider(this.player, pickups);
        this.physics.add.collider(this.player, buttons);

        this.pickupHandler = this.physics.add.overlap(this.player.radius, pickups, this.handlePickup);
        this.buttonHandler = this.physics.add.overlap(this.player.radius, buttons, this.handleButton);

        this.pickupHandler.active = false;
        this.buttonHandler.active = false;

        //Set camera follow
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;



        //Debug colliders for the tilemap
        
        /*const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/

        //keyI.on('keydown-I', this.inventoryToggle, this);
        //keySpace.on('keydown-SPACE', this.interact, this);
        this.input.keyboard.on('keydown-I', this.inventoryToggle, this);
        this.input.keyboard.on('keydown-SPACE', this.interact, this);

    }

    update()
    {
        this.player.update();
        this.pickupHandler.active = false;
        this.buttonHandler.active = false;


        if (newPickup && this.scene.isActive("inventoryMenu"))
        {
            this.scene.launch("inventoryMenu");
            newPickup = false;
        }
    }

    handlePickup(sprite, obj)
    {
        pickups.killAndHide(obj);
        inventory.push(obj.name);

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
            if (combination.length == 3)
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

    inventoryToggle()
    {
        if(!this.inventoryEnabled)
        {
            this.inventoryEnabled = true;
            this.scene.launch("inventoryMenu");
        }
        else 
        {
            this.scene.sleep("inventoryMenu");
            this.inventoryEnabled = false;
        }
    }

    interact()
    {
        this.pickupHandler.active = true;
        this.buttonHandler.active = true;
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