class Credits extends Phaser.Scene{
    constructor(){
        super("credits");
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
            borderPadding - 80, 'Programming: Nik, Sreevani', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding -50, 'Dialogging: Professor Nathan, Sreevani', menuConfig).setOrigin(0.5);
         this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
             borderPadding - 20, 'Art: Stevie', menuConfig).setOrigin(0.5);
         this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
             borderPadding + 7, 'Tilemap + Puzzles: Nik, Stevie', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
             borderPadding + 35, 'Sound: Sreevani', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
                borderPadding + 100, 'Press SPACE to go next and see external resourcess', menuConfig).setOrigin(0.5);
            
            



        


                cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start('ex1');

        }
    }
}
    


