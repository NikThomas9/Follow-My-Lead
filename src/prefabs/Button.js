class Button extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, frame, color) {
        super(scene, x, y, texture, frame);
        this.color = color;
        this.depth = 1;
        this.isDisabled = false;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = false;
        this.setImmovable(true);
    }

    update() {
        
    }

    reset() {

    }
}