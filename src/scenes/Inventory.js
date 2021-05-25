class Inventory extends Phaser.Scene {
    constructor() {
        super("inventoryMenu");
        this.inventoryWidth = game.config.width/2 + 300;
        this.inventoryHeight = game.config.height/5;
    }

    create()
    {
        selectNumber = 0;

        var textOffset = 0;
        this.arrowOffset = 0;

        this.bg = this.add.rectangle(500, 10, 500, 500, 0x000000);

        this.inventoryMenu = this.add.text(this.inventoryWidth, this.inventoryHeight, 'Inventory:');
        inventory.forEach(item => 
            {
                textOffset += 30;
                this.add.text(this.inventoryWidth, this.inventoryHeight + textOffset, item);
            });

        this.arrow = this.add.image(this.inventoryWidth - 50, this.inventoryHeight + 50 + this.arrowOffset, "arrow");

        this.input.keyboard.on('keydown-SPACE', this.select, this);
        this.input.keyboard.on('keydown-UP', this.selectorUp, this);
        this.input.keyboard.on('keydown-DOWN', this.selectorDown, this);
        this.input.keyboard.on('keydown-I', this.inventoryToggle, this);

    }

    update()
    {
        /*if (inventory.includes("paper1"))
        {
            var image = this.add.image(300, 300, 'samplePaper');
        }*/

        this.arrow.y = this.inventoryHeight + 50 + this.arrowOffset;
    }

    selectorUp()
    {
        if (inventory.length > 0)
        {
            selectNumber--;
            if (selectNumber < 0)
            {
                selectNumber = inventory.length - 1;
                this.arrowOffset = 30 * selectNumber;
            }
            else
            {
                this.arrowOffset -= 30;
            }
            console.log(selectNumber);
        }
    }

    selectorDown()
    {
        if (inventory.length > 0)
        {
            selectNumber++;
            if (selectNumber >= inventory.length)
            {
                selectNumber = 0;
                this.arrowOffset = 0;
            }
            else
            {
                this.arrowOffset += 30;
            }

            //selectNumber = selectNumber % inventory.length;
            console.log(selectNumber);
        }
    }

    select()
    {
        if (inventory.length > 0)
        {
            console.log("You selected " + inventory[Math.abs(selectNumber)]);
            selectedItem = inventory[Math.abs(selectNumber)];
        }
    }

    inventoryToggle()
    {
        this.scene.setActive(false, this);
        this.scene.setVisible(false, this);
        this.scene.setActive(true, "playScene");
    }
}