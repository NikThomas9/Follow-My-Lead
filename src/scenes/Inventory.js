class Inventory extends Phaser.Scene {
    constructor() {
        super("inventoryMenu");
        this.inventoryWidth = game.config.width/2 - 30;
        this.inventoryHeight = 30;
    }

    create()
    {
        selectNumber = 0;

        var textOffset = 0;
        this.arrowOffset = 0;

        this.bg = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width - 30, game.config.height - 30, 0x000000);

        let inventoryHeader = {
            fontFamily: 'Courier',
            fontSize: '32px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            fixedWidth: 0
        }

        let inventoryText = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            fixedWidth: 0
        }

        this.inventoryMenu = this.add.text(this.inventoryWidth - 100, this.inventoryHeight, 'Inventory:', inventoryHeader).setOrigin(0, 0);

        inventory.forEach(item => 
            {
                textOffset += 50;
                this.add.text(this.inventoryWidth - 100, this.inventoryHeight + textOffset, item.name, inventoryText);
            });

        this.arrow = this.add.image(this.inventoryWidth - 150, this.inventoryHeight + 75 + this.arrowOffset, "arrow");

        this.input.keyboard.on('keydown-SPACE', this.select, this);
        this.input.keyboard.on('keydown-UP', this.selectorUp, this);
        this.input.keyboard.on('keydown-DOWN', this.selectorDown, this);
        this.input.keyboard.on('keydown-I', this.inventoryToggle, this);

        this.note = this.add.image(game.config.width/2, game.config.height/2, "");
        this.note.setVisible(false);

        this.readingNote = false;
    }

    update()
    {
        this.arrow.y = this.inventoryHeight + 75 + this.arrowOffset;

        if (inventory.length <= 0)
        {
            this.arrow.setVisible(false);
        }
    }

    selectorUp()
    {
        if (inventory.length > 0 && !this.readingNote)
        {
            selectNumber--;
            if (selectNumber < 0)
            {
                selectNumber = inventory.length - 1;
                this.arrowOffset = 50 * selectNumber;
            }
            else
            {
                this.arrowOffset -= 50;
            }
        }
    }

    selectorDown()
    {
        if (inventory.length > 0 && !this.readingNote)
        {
            selectNumber++;
            if (selectNumber >= inventory.length)
            {
                selectNumber = 0;
                this.arrowOffset = 0;
            }
            else
            {
                this.arrowOffset += 50;
            }
        }
    }

    select()
    {
        if (inventory.length > 0)
        {
            console.log("You selected " + inventory[Math.abs(selectNumber)].name);
            selectedItem = inventory[Math.abs(selectNumber)];
        }
        
        if (selectedItem instanceof Note)
        {
            this.readNote();
        }

        if (selectedItem instanceof Tool)
        {
            activeTool = selectedItem;
        }
    }

    inventoryToggle()
    {
        this.scene.setActive(false, this);
        this.scene.setVisible(false, this);
        this.scene.setActive(true, "playScene");
    }

    readNote()
    {
        if (!this.readingNote)
        {
            console.log(selectedItem.readSprite);
            this.note.setTexture(selectedItem.readSprite);
            this.note.setVisible(true);
            this.readingNote = true;
        }
        else
        {
            this.note.setVisible(false);
            this.readingNote = false;
        }
    }

}