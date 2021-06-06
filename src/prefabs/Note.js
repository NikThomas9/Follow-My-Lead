class Note extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, frame, readSprite, colliderGroup, map, name) {
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

        console.log(this.spawnString);
        this.x = spawn.x;
        this.y = spawn.y;

        this.readSprite = readSprite;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
    }

    update() {
        
    }

    reset() {

    }

}