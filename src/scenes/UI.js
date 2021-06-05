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
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.tutorialTimer = null;

        this.selected = this.add.text(50, 50, "Selected: ");
        this.selectedIcon = this.add.image(this.selected.x + 125, this.selected.y, activeTool.uiSprite);
        this.tutorialUI = this.add.text(50, game.config.height - 100, tutorialText, tutorialConfig);
        this.tutorialUI.setVisible(false);
    }

    update()
    {
        if (tutorialActive)
        {
            this.tutorialUI.text = tutorialText;
            this.tutorialUI.setVisible(true);
            this.createTimer();
        }

        if(tutorialTimerReset)
        {
            console.log("here");
            tutorialTimerReset = false;
            this.time.removeEvent(this.tutorialTimer);
            this.createTimer();
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
        this.tutorialUI.setVisible(false);
        tutorialActive = false;
    }

    createTimer()
    {
        this.tutorialTimer = this.time.addEvent({
            delay:3000,
            callback: this.hideText,
            callbackScope: this
        });
    }
}