class Instructions extends Phaser.Scene{
    constructor(){
        super("ins");
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
        borderPadding -150, 'Here is your key to play the game', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding - 80, 'Press I to open inventories or to view notes', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding -50, 'Press W to move left', menuConfig).setOrigin(0.5);
         this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
             borderPadding - 20, 'Press A to move up', menuConfig).setOrigin(0.5);
         this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
             borderPadding + 7, 'Press S to move right', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
             borderPadding + 35, 'Press D to move down', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding + 60, 'Press the SpaceBar to interact with the buttons with clues', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
                borderPadding + 100, 'Press -> to start playing', menuConfig).setOrigin(0.5);
            
            



        


        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            this.scene.start('playScene');

        }
    }
}
    


