class Title2 extends Phaser.Scene {
    constructor() {
        super("title2Scene");
    }

    preload() {
        // load assets
        this.load.path = "./assets/";
        this.load.audio('music', 'music.mp3');

        // load JSON (dialog)
        this.load.json('dialog', 'ending.json');

        // load images
        // this.load.image('dialogbox', 'img/box.png');
        this.load.image('Me', 'img/player.png');
        this.load.image('Friend', 'img/friend.png');
        // this.load.image('jove', 'img/jove.png');
        // this.load.image('neptune', 'img/neptune.png');

        // load bitmap font
        this.load.bitmapFont('shortstack', 'font/shortStack.png', 'font/shortStack.xml');
    }

    create() {
        // add title text
        music = this.sound.add('music');
        music.play();
        this.add.bitmapText(centerX, centerY - 32, 'shortstack', 'You have reached the end.', 32).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY, 'shortstack', 'Press SPACE to continue', 16).setOrigin(0.5);
        //this.add.bitmapText(centerX, centerY + 32, 'shortstack', 'Credits to Professor Nathan', 16).setOrigin(0.5);


        // create input
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // wait for player input
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start("ending");
        }

        //Debug to get to gameplay REMOVE LATER
       

    }
}