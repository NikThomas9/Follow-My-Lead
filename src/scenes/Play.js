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
        this.load.image('greenDisabled', 'assets/buttonGreenDisabled.png');
        this.load.image('redDisabled', 'assets/buttonRedDisabled.png');
        this.load.image('blueDisabled', 'assets/buttonBlueDisabled.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('puddle', 'assets/puddle.png');

        this.load.image('paper', 'assets/paper.png');
        this.load.image('samplePaper1', 'assets/samplePaper.png');
        this.load.image('samplePaper2', 'assets/sample2.png');
        this.load.image('samplePaper3', 'assets/sample3.png');

        this.load.image('bucketEmpty', 'assets/emptybucket.png');
        this.load.image('bucketFull', 'assets/fullbucket.png');

        this.load.audio('sfx_pickup', './assets/puzzle_click.wav');
        this.load.audio('sfx_walking', './assets/walking.wav');
        this.load.audio('sfx_slam', './assets/slam.wav');
        this.load.audio('sfx_incorrect', './assets/wrong.wav');


        this.load.tilemapTiledJSON('level', 'assets/tilemap/puzzle1.json');
    }

    create()
    {
        //Set up tilemap and world
        const map = this.make.tilemap({ key: 'level'});

        const tiles = map.addTilesetImage('Forest', 'tiles');  
        const groundLayer = map.createStaticLayer("Ground", tiles, 0, 0);      
        const treeLayer = map.createStaticLayer("Trees", tiles, 0, 0);
        treeLayer.setCollisionByProperty({collides: true});  
        groundLayer.setCollisionByProperty({collides: true});  

        groundLayer.depth = -2;
        treeLayer.depth = 1;


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
             
        this.player = new Player(
            this,
            map.widthInPixels/2 + 200,
            map.heightInPixels - 100,
            'player',
        ).setOrigin(0,0);

        this.walkingSFX = this.sound.add("sfx_walking", {loop: true});
        
        //Generate pickups
        pickups = this.physics.add.group();
        buttons = this.physics.add.group();
        obstacles = this.physics.add.group();

        this.paper1 = new Note(this, game.config.width/2, game.config.height, 'paper', null, 'samplePaper1').setOrigin(0, 0);
        this.paper2 = new Note(this, game.config.width/2 + 100, game.config.height, 'paper', null, 'samplePaper2').setOrigin(0, 0);
        this.paper3 = new Note(this, game.config.width/2 + 200, game.config.height, 'paper', null, 'samplePaper3').setOrigin(0, 0);

        this.bucket = new Tool(this, game.config.width/2 + 300, game.config.height, 'bucketEmpty', null, 'bucketEmpty').setOrigin(0, 0);

        this.puddle = new Obstacle(this, game.config.width/2 + 500, game.config.height, 'puddle', null, 'puddle').setOrigin(0, 0);

        obstacles.add(this.puddle);

        pickups.add(this.paper1);
        pickups.add(this.paper2);
        pickups.add(this.paper3);
        pickups.add(this.bucket);

        this.buttonRed = new Button(this, game.config.width * 2 + 300, game.config.height, 'red', this, 'red').setOrigin(0, 0);
        this.buttonBlue = new Button(this, game.config.width/2 - 150, game.config.height + 30, 'blue', this, 'blue').setOrigin(0, 0);
        this.buttonGreen = new Button(this, game.config.width + 150, game.config.height /2, 'green', this, 'green').setOrigin(0, 0);

        buttons.add(this.buttonRed);
        buttons.add(this.buttonBlue);
        buttons.add(this.buttonGreen);

        this.buttonRed.setImmovable(true);
        this.buttonBlue.setImmovable(true);
        this.buttonGreen.setImmovable(true);

        this.paper1.setImmovable(true);
        this.paper2.setImmovable(true);
        this.paper3.setImmovable(true);
        this.bucket.setImmovable(true);
        this.puddle.setImmovable(true);

        this.paper1.name = 'paper1';
        this.paper2.name = 'paper2';
        this.paper3.name = 'paper3';
        this.bucket.name = 'bucket';

        /*this.player.depth = 1;
        this.paper1.depth = 1;     
        this.paper2.depth = 1;        
        this.paper3.depth = 1;    
        this.bucket.depth = 1;      
        this.puddle.depth = 1;  */



        //Physics colliders
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, groundLayer);
        this.physics.add.collider(this.player, treeLayer);
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
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        groundLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

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