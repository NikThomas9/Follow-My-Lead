class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.velocity = 300;
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = false;
    }

    update() {
        if (keyLeft.isDown)
        {
            this.body.setVelocityX(-this.velocity);
        }
        else if (keyRight.isDown)
        {
            this.body.setVelocityX(this.velocity);
        }
        else
        {
            this.body.setVelocityX(0);
        }

        if (keyUp.isDown)
        {
            this.body.setVelocityY(-this.velocity);
        }
        else if (keyDown.isDown)
        {
            this.body.setVelocityY(this.velocity);
        }
        else
        {
            this.body.setVelocityY(0);
        }
    }

    reset() {

    }
}