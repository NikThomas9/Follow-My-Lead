class Button extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, frame, code, colliderGroup, map, name) {
        super(scene, x, y, texture, frame);

        this.name = name;

        colliderGroup.add(this);
        
        if (this.name == null)
        {
            this.name = texture;  
        }

        this.spawnString = this.name + "Spawn";
        
        const spawn = map.findObject(
            "Objects",
            obj => obj.name === this.spawnString
            );

        this.x = spawn.x;
        this.y = spawn.y;

        this.code = code;
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