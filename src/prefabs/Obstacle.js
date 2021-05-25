class Obstacle extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, frame, uiSprite) {
        super(scene, x, y, texture, frame);

        this.name = texture;
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
    }

    update() {
        
    }

    reset() {

    }

}