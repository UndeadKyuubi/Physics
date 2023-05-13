class level1 extends Phaser.Scene {

}

class level2 extends Phaser.Scene {

}

class level3 extends Phaser.Scene {

}

class summary extends Phaser.Scene {

}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [level1, level2, level3, summary],
    title: "Physics Game",
});