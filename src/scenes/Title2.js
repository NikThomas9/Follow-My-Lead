class Title2 extends Phaser.Scene {
    constructor() {
        super("t2Scene");
    }

    preload() {
        // load assets
        this.load.path = "./assets/";
        this.load.audio('music', 'music.mp3');

        // load JSON (dialog)
        this.load.json('dialog2', 'ending.json');

        // load image
       

        // this.load.image('dialogbox', 'img/box.png');
        // this.load.image('Narrative', 'img/Narrative.png');
        this.load.image('Me', 'img/player.png');
        this.load.image('Friend', 'img/friend.png');
        


        // load bitmap font
        this.load.bitmapFont('shortstack', 'font/shortStack.png', 'font/shortStack.xml');
    }

    create() {
        // add title text
        music = this.sound.add('music');
        music.play();
        this.add.bitmapText(centerX, centerY - 32, 'shortstack', 'You made it to the end', 32).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY, 'shortstack', 'Press SPACE to continue', 16).setOrigin(0.5);
      


        // create input
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // wait for player input
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start("ending");
        }
        // if(Phaser.Input.Keyboard.JustDown(cursors.right)) {
        //     this.scene.start("ending");
        // }
    }
}