class Inventory extends Phaser.Scene {
    constructor() {
        super("inventoryMenu");
    }

    create()
    {
        //keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);    

        var textOffset = 0;

        this.inventoryMenu = this.add.text(game.config.width/2 + 300, game.config.height/5, 'Inventory:');
        inventory.forEach(item => 
            {
                textOffset += 30;
                this.add.text(game.config.width/2 + 300, game.config.height/5 + textOffset, item);
            });

        //keyI.on('down', this.resume, this);
    }

    update()
    {
        if (inventory.includes("paper1"))
        {
            var image = this.add.image(300, 300, 'samplePaper');
        }
    }

    /*resume()
    {
        this.scene.resume("playScene");
    }*/
}