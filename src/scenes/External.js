class External extends Phaser.Scene{
    constructor(){
        super("ex1");
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
            borderPadding - 140, 'Dialogue System inspired by Professor Nathan\'s example.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding - 110, 'Tilemap sprites: https://zrghr.itch.io/topdown-plains-pack ', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding - 80, 'Cursor Move Sound 1: https://freesound.org/people/ticebilla/sounds/238188/', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding -50, 'Cursor Move Sound 2: https://freesound.org/people/Breviceps/sounds/445972/', menuConfig).setOrigin(0.5);
         this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
             borderPadding - 20, 'Failure Sound 1: https://freesound.org/people/FunWithSound/sounds/394899', menuConfig).setOrigin(0.5);
         this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
             borderPadding + 7, 'Failure Sound 2: https://freesound.org/people/FunWithSound/sounds/394900/', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
             borderPadding + 35, 'Water Sound: https://freesound.org/people/Yin_Yang_Jake007/sounds/406087/', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding + 60, 'Picking up Paper: https://freesound.org/people/jomse/sounds/428664/ ', menuConfig).setOrigin(0.5);    
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
                borderPadding + 100, 'Press SPACE to go to next page.', menuConfig).setOrigin(0.5);
            
            



        


                cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start('ex2');

        }
    }
}
    


