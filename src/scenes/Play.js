class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload()
    {
        //Load Sprites
        this.load.image('tiles', 'assets/tiles.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('obj', 'assets/obj.png');
    }

    create()
    {
        const level = [
            [  0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,  1,  0,  1,  0 ],
            [  1,   0,   2,   2,   1,   0,   1,   0,   1,   0,   1,  0,  1,  0,  1 ],
            [  0,   1,   2,   2,   0,   1,   0,   1,   0,   1,   0,  1,  0,  1,  0 ],
            [  1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,  0,  1,  0,  1 ],
            [  0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,  1,  0,  1,  0 ],
            [  1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   2,  2,  1,  0,  1 ],
            [  0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   2,  2,  0,  1,  0 ],
            [  1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,  0,  1,  0,  1 ],
            [  0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,  1,  0,  1,  0 ],
            [  1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,  0,  1,  0,  1 ],
            [  0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,  1,  0,  1,  0 ],
            [  1,   0,   2,   2,   1,   0,   1,   0,   1,   0,   1,  0,  1,  0,  1 ],
            [  0,   1,   2,   2,   0,   1,   0,   1,   0,   1,   0,  1,  0,  1,  0 ],
            [  1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,  0,  1,  0,  1 ],
            [  0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,  1,  0,  1,  0 ],
            [  1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   2,  2,  1,  0,  1 ],
            [  0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   2,  2,  0,  1,  0 ],
            [  1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,  0,  1,  0,  1 ],
            [  0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,  1,  0,  1,  0 ],
            [  1,   0,   1,   0,   1,   0,   1,   0,   1,   0,   1,  0,  1,  0,  1 ],
            [  0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   0,  1,  0,  1,  0 ],
          ];
          

        //Keyboard input
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);      
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);  
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    
  
             
        this.player = new Player(
            this,
            game.config.width/2,
            game.config.height*1.5,
            'player',
        ).setOrigin(0,0);

        this.obj = this.add.rectangle(
            game.config.width/2,
            game.config.height,
            50,
            50,
            0xFF0000,
        ).setOrigin(0,0);

        this.obj = this.physics.add.staticImage(game.config.width/2, game.config.height, 'obj')
        this.player.depth = 1;
        this.obj.depth = 1;

        this.add.existing(this.obj);
        this.physics.add.existing(this.obj);

        //Set up tilemap and world
        const map = this.make.tilemap({ data: level, tileWidth: 64, tileHeight: 64});
        
        const tiles = map.addTilesetImage('tiles');  
        const worldLayer = map.createStaticLayer(0, tiles, 0, 0);      
        worldLayer.setCollision(2);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        //Physics colliders
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.collider(this.player, this.obj);
        this.physics.add.overlap(this.player.radius, this.obj,
            () => {
                //this.handleInteraction()
                if (keySpace.isDown)
                {
                    this.obj.destroy();
                }
            });

        //Set camera follow
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        //Debug colliders for the tilemap
        
        /*const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/
    }

    update()
    {
        this.player.update();
    }

    handleInteraction()
    {

    }
}