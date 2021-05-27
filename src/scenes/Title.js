class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        // load assets
        this.load.path = "./assets/";
        this.load.audio('music', 'music.mp3');

        // load JSON (dialog)
        this.load.json('dialog', 'dialog.json');

        // load images
        // this.load.image('dialogbox', 'img/box.png');
        this.load.image('homer', 'img/homer.png');
        this.load.image('minerva', 'img/minerva.png');
        this.load.image('jove', 'img/jove.png');
        this.load.image('neptune', 'img/neptune.png');

        // load bitmap font
        this.load.bitmapFont('shortstack', 'font/shortStack.png', 'font/shortStack.xml');
    }

    create() {
        // add title text
        music = this.sound.add('music');
        music.play();
        this.add.bitmapText(centerX, centerY - 32, 'shortstack', 'FOLLOW MY LEAD', 32).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY, 'shortstack', 'Press SPACE to start', 16).setOrigin(0.5);
        //this.add.bitmapText(centerX, centerY + 32, 'shortstack', 'Credits to Professor Nathan', 16).setOrigin(0.5);


        // create input
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // wait for player input
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start("talkingScene");
        }

        //Debug to get to gameplay REMOVE LATER
        if(Phaser.Input.Keyboard.JustDown(cursors.right)) {
            this.scene.start("playScene");
        }

    }
}