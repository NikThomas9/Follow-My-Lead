class External2 extends Phaser.Scene{
    constructor(){
        super("ex2");
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
            borderPadding - 80, 'Paper Scrawl: https://freesound.org/people/jackyyang09/sounds/476840/', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding -50, 'Boulder Smash: https://freesound.org/people/AlanCat/sounds/381645/', menuConfig).setOrigin(0.5);
         this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
             borderPadding - 20, 'Cauldron Bubble: https://freesound.org/people/Nomfundo_k/sounds/408540/', menuConfig).setOrigin(0.5);
         this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
             borderPadding + 7, 'Torch light: https://freesound.org/people/theshaggyfreak/sounds/315763/', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
             borderPadding + 35, 'Portal Open:  https://freesound.org/people/Qat/sounds/107640/', menuConfig).setOrigin(0.5);
         this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
                borderPadding + 60, 'Cursor up/down: https://freesound.org/people/plasterbrain/sounds/464903/', menuConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
                    borderPadding + 90, 'Cursor select: https://freesound.org/people/Rickplayer/sounds/530776/', menuConfig).setOrigin(0.5);  
             
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
                borderPadding + 130, 'Press SPACE to restart.', menuConfig).setOrigin(0.5);
            
            



        


                cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start('titleScene');
            music.stop();

        }
    }
}
    


