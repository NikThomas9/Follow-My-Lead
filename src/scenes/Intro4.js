class Intro4 extends Phaser.Scene{
    constructor(){
        super("intro4");
    }
            
    preload(){
        
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '19px',
            backgroundColor: '#FFC0CB',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
    
        // this.cover = this.add.image(game.config.width / 2, game.config.height / 2, 'cityscapeDay');
        // this.cover.setDisplaySize(game.config.width, game.config.height);

    
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding, 'Me: Hey whered you go? Oh there you are' , menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding + 100, 'Me: Why arent you speaking? Okay I guess I will just follow you then' , menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
                borderPadding + 200, 'Press -> to keep reading', menuConfig).setOrigin(0.5);

        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            this.scene.start('ins');
            // music.stop();
        }
    }
}
    


