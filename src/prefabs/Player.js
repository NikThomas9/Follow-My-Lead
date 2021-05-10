class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.moveSpeed = 3;
        scene.add.existing(this);
    }

    update() {
        if (keyLeft.isDown)
        {
            this.x -= this.moveSpeed;
        }

        if (keyRight.isDown)
        {
            this.x += this.moveSpeed;
        }

        if (keyUp.isDown)
        {
            this.y -= this.moveSpeed;
        }

        if (keyDown.isDown)
        {
            this.y += this.moveSpeed;
        }
    }

    reset() {

    }
}