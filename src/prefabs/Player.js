class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.velocity = 300;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = false;
        var offset = 20;

        this.radius = scene.add.rectangle(x, y, this.body.width + offset, this.body.height + offset, 0xFF0000, 0).setOrigin(.1, .1);
        this.radius.depth = 1;

        this.isFacing = "back";
        this.curAnimation = "back";

        scene.add.existing(this.radius);
        scene.physics.add.existing(this.radius);

    }

    update() {
        if (keyLeft.isDown)
        {
            this.isFacing = "left";

            this.body.setVelocityX(-this.velocity);
        }
        else if (keyRight.isDown)
        {
            this.isFacing = "right";

            this.body.setVelocityX(this.velocity);
        }
        else
        {
            this.body.setVelocityX(0);
        }

        if (keyUp.isDown)
        {
            this.isFacing = "back";
            this.body.setVelocityY(-this.velocity);
        }
        else if (keyDown.isDown)
        {
            this.isFacing = "front";
            this.body.setVelocityY(this.velocity);
        }
        else
        {
            this.body.setVelocityY(0);
        }

        this.body.velocity.normalize().scale(this.velocity);

        if ((this.body.velocity.x != 0 || this.body.velocity.y != 0))
        {
            if (this.isFacing != this.curAnimation)
            {
                this.curAnimation = this.isFacing;
                this.play(this.curAnimation);
            }
            if (!this.scene.walkingSFX.isPlaying)
            {
                this.scene.walkingSFX.play();
            }
        }
        else if ((this.body.velocity.x == 0 && this.body.velocity.y == 0))
        {
            this.play(this.isFacing + "Stop");
            this.curAnimation = "stopped";
            if (this.scene.walkingSFX.isPlaying)
            {
                this.scene.walkingSFX.stop();
            }
        }

        this.radius.x = this.body.x;
        this.radius.y = this.body.y;
    }

    reset() {

    }
}