class Tutorial extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, frame, message, colliderGroup, map, name) {
        super(scene, x, y, texture, frame);

        this.name = name;

        colliderGroup.add(this);
                
        const spawn = map.findObject(
            "Objects",
            obj => obj.name === this.name
            );

        this.x = spawn.x;
        this.y = spawn.y;
       
        this.body.setSize(100, 100);
        this.message = message;
        this.played = false;
        this.setVisible(false);

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