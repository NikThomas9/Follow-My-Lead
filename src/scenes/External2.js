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
    
        // this.cover = this.add.image(game.config.width / 2, game.config.height / 2, 'cityscapeDay');
        // this.cover.setDisplaySize(game.config.width, game.config.height);

        // this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
        // borderPadding -150, 'Created by: Nik Thomas, Sreevani Suvarna, Stevie Rodriguez', menuConfig).setOrigin(0.5);
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
                borderPadding + 110, 'Press SPACE to go back to the beginning', menuConfig).setOrigin(0.5);
            
            



        


                cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start('titleScene');
            music.stop();

        }
    }
}
    


