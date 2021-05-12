class Intro1 extends Phaser.Scene{
    constructor(){
        super("intro1");
    }
            
    preload(){
        // this.load.audio('music', 'assets/intro.mp3');
    }

    create(){
        // music = this.sound.add('music');
        // music.play();
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
        borderPadding, 'Friend: Hey! Are you new to the forest?', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding + 100, 'Me: Yes!, I am. I am a bit nervous though', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding + 200, 'Friend: Dont worry I am here', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding + 300, 'Me: Thank you!', menuConfig).setOrigin(0.5);




        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            this.scene.start('intro2');
        }
    }
}
    


