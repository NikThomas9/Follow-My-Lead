class Inventory extends Phaser.Scene {
    constructor() {
        super("inventoryMenu");
        this.inventoryWidth = game.config.width/2 - 30;
        this.inventoryHeight = 30;
    }
    preload(){
        this.load.audio('sfx_scrawl', './assets/paper_scrawl.wav');
        this.load.audio('sfx_scroll', './assets/cursor.wav');
        this.load.audio('sfx_flac', './assets/select.mp3');

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
        this.input.keyboard.on('keydown-W', this.selectorUp, this);
        this.input.keyboard.on('keydown-S', this.selectorDown, this);
        this.input.keyboard.on('keydown-F', this.inventoryToggle, this);

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
                this.scroll = this.sound.add("sfx_scroll");
                this.scroll.play();
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

                this.scroll = this.sound.add("sfx_scroll");
                this.scroll.play();
                this.arrowOffset += 50;
            }
        }
    }

    select()
    {
        if (inventory.length > 0)
        {

            this.flac = this.sound.add("sfx_flac");
            this.flac.play();
            console.log("You selected " + inventory[Math.abs(selectNumber)].name);
            selectedItem = inventory[Math.abs(selectNumber)];
        }
        else
        {
            selectedItem = null;
        }
        
        if (selectedItem instanceof Note)
        {
            this.readNote();
        }

        if (selectedItem instanceof Tool && activeTool != selectedItem)
        {
            activeTool = selectedItem;
        }
    }

    inventoryToggle()
    {
        this.scene.setActive(false, this);
        this.scene.setVisible(false, this);
        this.scene.setActive(true, currentScene);
    }

    readNote()
    {
        if (!this.readingNote)
        {
            console.log(selectedItem.readSprite);
            this.note.setTexture(selectedItem.readSprite);
            this.scrawl = this.sound.add("sfx_scrawl");
            this.scrawl.play();
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