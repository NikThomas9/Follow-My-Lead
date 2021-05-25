class Note extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, frame, readSprite) {
        super(scene, x, y, texture, frame);
        
        this.name = texture;
        this.readSprite = readSprite;
        //this.readSprite.setVisible(false);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
    }

    update() {
        
    }

    reset() {

    }

}