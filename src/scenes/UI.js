class UI extends Phaser.Scene {
    constructor() {
        super("UILayer");
    }

    create()
    {
        this.selected = this.add.text(50, 50, "Selected: ");
        this.selectedIcon = this.add.image(this.selected.x + 125, this.selected.y, activeTool.uiSprite);
    }

    update()
    {
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
}