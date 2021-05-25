class UI extends Phaser.Scene {
    constructor() {
        super("UILayer");
    }

    create()
    {
        console.log("launched");
        this.selected = this.add.text(50, 50, "Selected: " + selectedItem);
    }

    update()
    {
        this.selected.text = "Selected: " + selectedItem;
    }
}