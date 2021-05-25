class UI extends Phaser.Scene {
    constructor() {
        super("UILayer");
    }

    create()
    {
        this.selected = this.add.text(50, 50, "Selected: " + selectedItem.name);
    }

    update()
    {
        this.selected.text = "Selected: " + selectedItem.name;
    }
}