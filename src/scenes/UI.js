class UI extends Phaser.Scene {
    constructor() {
        super("UILayer");
    }

    preload()
    {
        this.load.bitmapFont('shortstack', './font/shortStack.png', './font/shortStack.xml');
    }

    create()
    {
        let tutorialConfig = {
            fontFamily: 'shortstack',
            fontSize: '19px',
            backgroundColor: '#25412e',
            color: '#bddbbf',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5
            },
            fixedWidth: 0
        }

        this.tutorialTimer = null;

        this.selected = this.add.text(50, 50, "Selected: ");
        this.selectedIcon = this.add.image(this.selected.x + 125, this.selected.y, activeTool.uiSprite);
        this.tutorialUI = this.add.text(50, game.config.height - 100, tutorialText, tutorialConfig);
        this.tutorialUI.setVisible(false);
        this.inventoryTutorial = this.add.text(50, game.config.height - 100, tutorial3Message, tutorialConfig);
        this.inventoryTutorial.setVisible(false);
    }

    update()
    {
        if (inventoryOpened)
        {
            this.tutorialUI.setVisible(false);
            this.inventoryTutorial.setVisible(true);
        }
        else
        {
            if (tutorialActive)
            {
                this.tutorialUI.setVisible(true);
            }
            this.inventoryTutorial.setVisible(false);
        }

        if (tutorialActive)
        {
            this.tutorialUI.text = tutorialText;
            this.tutorialUI.setVisible(true);
            this.createTimer();
            tutorialActive = false;
        }

        if (activeTool != null)
        {
            this.selectedIcon.setVisible(true);
            this.selectedIcon.setTexture(activeTool.uiSprite);
        }
        else
        {
            this.selectedIcon.setVisible(false);
        }

        this.selected.text = "Selected: ";
    }

    hideText()
    {
        console.log("here");
        this.tutorialUI.setVisible(false);
        tutorialActive = false;
        this.tutorialTimer = null;
    }

    createTimer()
    {
        this.tutorialTimer = this.time.addEvent({
            delay:5000,
            callback: this.hideText,
            callbackScope: this,
            loop: false
        });
    }
}