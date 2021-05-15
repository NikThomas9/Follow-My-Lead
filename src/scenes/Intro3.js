class Intro3 extends Phaser.Scene{
    constructor(){
        super("intro3");
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
        borderPadding - 100, 'Me: Apparently a lot of mysterious events happen in this forest', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding , 'Friend: Dont worry they are all myths', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding + 100, 'Me: Thats cool', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding + 200, 'Friend: *gasps', menuConfig).setOrigin(0.5);
       this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
                borderPadding + 300, 'Press -> to keep reading', menuConfig).setOrigin(0.5);


        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            this.scene.start('intro4');

        }
    }
}
    


