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

        this.load.audio('sfx_pickup', './assets/puzzle_click.wav');
        this.load.audio('sfx_walking', './assets/walking.wav');

        this.load.tilemapTiledJSON('level', 'assets/testmap.json');
    }

    create()
    {
        /*const level = [
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
          ];*/
          

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

        var pickup1 = pickups.create(game.config.width/2, game.config.height, 'pickup');
        var pickup2 = pickups.create(game.config.width * 2 + 300, game.config.height, 'pickup');
        var pickup3 = pickups.create(game.config.width/2 - 150, game.config.height + 30, 'pickup');

        pickup1.name = 'crowbar';
        pickup2.name = 'paper';
        pickup3.name = 'key';

        this.player.depth = 1;
        pickup1.depth = 1;
        pickup2.depth = 1;
        pickup3.depth = 1;

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
        this.physics.add.overlap(this.player.radius, pickups, this.handlePickup);
        
        //Set camera follow
        this.cameraDolly = new Phaser.Geom.Point(this.player.x, this.player.y);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        //this.cameras.main.startFollow(this.player);
        this.cameras.main.startFollow(this.cameraDolly);

        //Debug colliders for the tilemap
        
        /*const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/

        keyI.on('down', this.inventoryToggle, this);
    }

    update()
    {
        this.player.update();
        this.cameraDolly.x = Math.floor(this.player.x + 3);
        this.cameraDolly.y = Math.floor(this.player.y + 3);

        if (newPickup && this.scene.isActive("inventoryMenu"))
        {
            this.scene.launch("inventoryMenu");
            newPickup = false;
        }
    }

    handlePickup(sprite, obj, scene)
    {
        if (keySpace.isDown)
        {
            pickups.killAndHide(obj);
            inventory.push(obj.name);

            console.log(inventory);
            obj.body.enable = false;   

            newPickup = true;

            obj.scene.sound.play("sfx_pickup");
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
}