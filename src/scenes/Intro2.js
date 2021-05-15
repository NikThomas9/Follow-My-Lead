class Intro2 extends Phaser.Scene{
    constructor(){
        super("intro2");
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
        borderPadding, 'Both you and your friend start walking in the forest', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding + 50, 'Press -> to keep reading', menuConfig).setOrigin(0.5);

       
         keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            this.scene.start('intro3');
        }
    }
}
    


