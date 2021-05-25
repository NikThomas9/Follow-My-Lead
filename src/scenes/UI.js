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
        this.selectedIcon.setTexture(activeTool.uiSprite);

        this.selected.text = "Selected: ";
    }
}