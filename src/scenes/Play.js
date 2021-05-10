class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload()
    {
        //Load Sprites
        this.load.image('player', 'assets/player.png');
    }

    create()
    {
        //Keyboard input
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);      
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);    


        this.BG = this.add.rectangle(
            0,
            0,
            game.config.width,
            game.config.height,
             0x28232b,).setOrigin(0,0);   
             
        this.player = new Player(
            this,
            game.config.width/2,
            game.config.height/2,
            'player',
        ).setOrigin(0,0);
    }

    update()
    {
        this.player.update();
    }
}