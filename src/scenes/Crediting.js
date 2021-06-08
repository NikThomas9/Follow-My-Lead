class Crediting extends Phaser.Scene{
    constructor(){
        super("crediting");
    }
            
    preload(){
        
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '19px',
            color: '#FFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
    
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        borderPadding , 'Created by: Nik Thomas, Sreevani Suvarna, and Stevie Rodriguez', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding + 80, 'Press Space to go to next page.', menuConfig).setOrigin(0.5);
            
            
        cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start('credits');

        }
    }
}
    


