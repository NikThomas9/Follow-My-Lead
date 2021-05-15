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
        this.load.image('buttonGreen', 'assets/buttonGreen.png');
        this.load.image('buttonRed', 'assets/buttonRed.png');
        this.load.image('buttonBlue', 'assets/buttonBlue.png');
        this.load.image('paper', 'assets/paper.png');


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
        buttons = this.physics.add.staticGroup();

        var paper = pickups.create(game.config.width/2, game.config.height, 'paper');
        var buttonRed = buttons.create(game.config.width * 2 + 300, game.config.height, 'buttonRed');
        var buttonBlue = buttons.create(game.config.width/2 - 150, game.config.height + 30, 'buttonBlue');
        var buttonGreen = buttons.create(game.config.width + 150, game.config.height /2, 'buttonGreen');


        paper.name = 'paper';
        buttonRed.name = 'red';
        buttonBlue.name = 'blue';
        buttonGreen.name = 'green';


        this.player.depth = 1;
        paper.depth = 1;
        buttonRed.depth = 1;
        buttonBlue.depth = 1;
        buttonGreen.depth = 1;
        

        //Set up tilemap and world
        //const map = this.make.tilemap({ data: level, tileWidth: 64, tileHeight: 64});
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

        keyI.on('down', this.inventoryToggle, this);
        keySpace.on('down', this.interact, this);

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
        combination.push(obj.name);
        console.log(combination);
        obj.scene.sound.play("sfx_pickup");

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
}