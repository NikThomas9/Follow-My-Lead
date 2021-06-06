class Tool extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, frame, uiSprite, colliderGroup, map, name) {
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
            obj => obj.name.toLowerCase() === this.spawnString.toLowerCase()
            );

        this.x = spawn.x;
        this.y = spawn.y;

        this.uiSprite = uiSprite;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
    }

    update() {

    }

    reset() {

    }

}