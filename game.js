class Level1 extends Phaser.Scene {
    ball;

    goal;

    reqBounces = 1;

    currBounces = 0;

    attempts = 0;

    timer = 0;

    bounceText;

    constructor() {
        super('level1')
    }

    init() {
        this.attempts = 0;
        this.currBounces = 0;
    }

    preload() {
        this.load.image('ball', 'Assets/Images/ball.png');
        this.load.image('cannonHead', 'Assets/Images/cannonHead.png');
        this.load.image('cannonBase', 'Assets/Images/cannonBase.png');
        this.load.image('goal', 'Assets/Images/goal.png');
    }

    create() {
            this.add.rectangle(150, 600, 300, 1200, 0x808080);

            this.bounceText = this.add.text(20, 250, 'Bounces: ' + this.currBounces).setFontSize(25);
            this.add.text(20, 200, 'Bounces To Win: ' + this.reqBounces).setFontSize(25);
            this.timer = this.add.text(20, 300, 'Time: ' + Math.round(this.time.now * 0.001) + ' sec').setFontSize(25);

            const cannonBase = this.add.image(130, 948, 'cannonBase').setDepth(1);
            const cannonHead = this.add.image(130, 900, 'cannonHead').setDepth(1);

            this.ball = this.physics.add.image(cannonHead.x, cannonHead.y - 50, 'ball')
            .setBounce(1, 1)
            .setCollideWorldBounds(true, 1, 1, true)

            const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
            const line = new Phaser.Geom.Line();
            
            this.goal = this.physics.add.image(1800, 900, 'goal');
            this.goal.setScale(1.5);
            this.goal.setImmovable(true);
            this.goal.setGravityX(0);
            this.goal.setGravityY(-300);
            
            this.ball.body.onOverlap = true;
            this.physics.add.overlap(this.ball, this.goal);

            this.ball.disableBody(true, true);

            let angle = 0;

            this.input.on('pointermove', (pointer) => {
                angle = Phaser.Math.Angle.BetweenPoints(cannonBase, pointer);
                cannonHead.rotation = angle;
                Phaser.Geom.Line.SetToAngle(line, cannonBase.x, cannonBase.y - 50, angle, 128);
                graphics.clear().strokeLineShape(line);
            });

            this.input.on('pointerup', () => {
                this.currBounces = 0;
                this.attempts += 1;
                this.ball.enableBody(true, cannonBase.x, cannonBase.y - 50, true, true);
                this.physics.velocityFromRotation(angle, 550, this.ball.body.velocity);
            });

            this.physics.world.on('worldbounds', (down) =>
            {
                if (down) { this.currBounces += 1; }
            });

            this.physics.world.on('overlap', () => {
                if (this.currBounces == this.reqBounces) {
                    this.scene.start('summary1', { attempts: this.attempts, time: Math.round(this.time.now * 0.001) });
                }
                else{
                    this.currBounces = 0;
                    this.ball.disableBody(true, true);
                }
            });
    }

    update() {
        this.ball.rotation = this.ball.body.angle;
        this.bounceText.setText('Bounces: ' + this.currBounces );
        this.timer.setText('Time: ' + Math.round(this.time.now * 0.001) + ' sec');

        if (this.currBounces > this.reqBounces) {
            this.currBounces = 0;
            this.ball.disableBody(true, true);
        }
    }
}

class Level2 extends Phaser.Scene {
    ball;

    goal;

    reqBounces = 2;

    currBounces = 0;

    attempts = 0;

    timer = 0;

    bounceText;

    rect1;
    rect2;
    rect3;
    rect4;
    rect5;
    rect6;

    constructor() {
        super('level2')
    }

    init() {
        this.attempts = 0;
        this.currBounces = 0;
    }

    preload() {
        this.load.image('ball', 'Assets/Images/ball.png');
        this.load.image('cannonHead', 'Assets/Images/cannonHead.png');
        this.load.image('cannonBase', 'Assets/Images/cannonBase.png');
        this.load.image('goal', 'Assets/Images/goal.png');
    }

    create() {
            this.add.rectangle(150, 600, 300, 1200, 0x808080);

            let rect1 = this.add.rectangle(400, 175, 100, 350, 0xffffff);
            let rect2 = this.add.rectangle(900, 175, 100, 350, 0xffffff);
            let rect3 = this.add.rectangle(1400, 175, 100, 350, 0xffffff);
            let rect4 = this.add.rectangle(400, 900, 100, 400, 0xffffff);
            let rect5 = this.add.rectangle(900, 900, 100, 400, 0xffffff);
            let rect6 = this.add.rectangle(1400, 900, 100, 400, 0xffffff);

            this.physics.add.existing(rect1);
            this.physics.add.existing(rect2);
            this.physics.add.existing(rect3);
            this.physics.add.existing(rect4);
            this.physics.add.existing(rect5);
            this.physics.add.existing(rect6);

            rect1.body.setImmovable(true);
            rect1.body.setGravityX(0);
            rect1.body.setGravityY(-300);

            rect2.body.setImmovable(true);
            rect2.body.setGravityX(0);
            rect2.body.setGravityY(-300);

            rect3.body.setImmovable(true);
            rect3.body.setGravityX(0);
            rect3.body.setGravityY(-300);

            rect4.body.setImmovable(true);
            rect4.body.setGravityX(0);
            rect4.body.setGravityY(-300);

            rect5.body.setImmovable(true);
            rect5.body.setGravityX(0);
            rect5.body.setGravityY(-300);

            rect6.body.setImmovable(true);
            rect6.body.setGravityX(0);
            rect6.body.setGravityY(-300);

            this.bounceText = this.add.text(20, 250, 'Bounces: ' + this.currBounces).setFontSize(25);
            this.add.text(20, 200, 'Bounces To Win: ' + this.reqBounces).setFontSize(25);
            this.timer = this.add.text(20, 300, 'Time: ' + Math.round(this.time.now * 0.001) + ' sec').setFontSize(25);

            const cannonBase = this.add.image(130, 948, 'cannonBase').setDepth(1);
            const cannonHead = this.add.image(130, 900, 'cannonHead').setDepth(1);

            this.ball = this.physics.add.image(cannonHead.x, cannonHead.y - 50, 'ball')
            .setBounce(1, 1)
            .setCollideWorldBounds(true, 1, 1, true)

            const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
            const line = new Phaser.Geom.Line();
            
            this.goal = this.physics.add.image(1700, 900, 'goal');
            this.goal.setScale(1.5);
            this.goal.setImmovable(true);
            this.goal.setGravityX(0);
            this.goal.setGravityY(-300);
            
            this.ball.body.onOverlap = true;
            this.ball.body.onCollide = true;
            this.physics.add.overlap(this.ball, this.goal);
            this.physics.add.collider(this.ball, rect1);
            this.physics.add.collider(this.ball, rect2);
            this.physics.add.collider(this.ball, rect3);
            this.physics.add.collider(this.ball, rect4);
            this.physics.add.collider(this.ball, rect5);
            this.physics.add.collider(this.ball, rect6);

            this.ball.disableBody(true, true);

            let angle = 0;

            this.input.on('pointermove', (pointer) => {
                angle = Phaser.Math.Angle.BetweenPoints(cannonBase, pointer);
                cannonHead.rotation = angle;
                Phaser.Geom.Line.SetToAngle(line, cannonBase.x, cannonBase.y - 50, angle, 128);
                graphics.clear().strokeLineShape(line);
            });

            this.input.on('pointerup', () => {
                this.currBounces = 0;
                this.attempts += 1;
                this.ball.enableBody(true, cannonBase.x, cannonBase.y - 50, true, true);
                this.physics.velocityFromRotation(angle, 550, this.ball.body.velocity);
            });

            this.physics.world.on('worldbounds', (down) =>
            {
                if (down) { this.currBounces += 1; }
            });

            this.physics.world.on('overlap', () => {
                if (this.currBounces == this.reqBounces) {
                    this.scene.start('summary2', { attempts: this.attempts, time: Math.round(this.time.now * 0.001) });
                }
                else{
                    this.currBounces = 0;
                    this.ball.disableBody(true, true);
                }
            });

            this.physics.world.on('collide', () => {
                this.currBounces += 1;
            });
    }

    update() {
        this.ball.rotation = this.ball.body.angle;
        this.bounceText.setText('Bounces: ' + this.currBounces );
        this.timer.setText('Time: ' + Math.round(this.time.now * 0.001) + ' sec');

        if (this.currBounces > this.reqBounces) {
            this.currBounces = 0;
            this.ball.disableBody(true, true);
        }
    }
}

class Level3 extends Phaser.Scene {
    ball;

    goal;

    reqBounces = 3;

    currBounces = 0;

    attempts = 0;

    timer = 0;

    bounceText;

    rect1;
    rect2;
    rect3;
    redRect1;
    redRect2;

    constructor() {
        super('level3')
    }

    init() {
        this.attempts = 0;
        this.currBounces = 0;
    }

    preload() {
        this.load.image('ball', 'Assets/Images/ball.png');
        this.load.image('cannonHead', 'Assets/Images/cannonHead.png');
        this.load.image('cannonBase', 'Assets/Images/cannonBase.png');
        this.load.image('goal', 'Assets/Images/goal.png');
    }

    create() {
            this.add.rectangle(150, 600, 300, 1200, 0x808080);

            let rect1 = this.add.rectangle(500, 800, 200, 50, 0xffffff);
            let rect2 = this.add.rectangle(950, 800, 200, 50, 0xffffff);
            let rect3 = this.add.rectangle(1350, 800, 200, 50, 0xffffff);
            let redRect1 = this.add.rectangle(980, 300, 1300, 50, 0xff0000);
            let redRect2 = this.add.rectangle(980, 900, 1300, 50, 0xff0000);

            this.physics.add.existing(rect1);
            this.physics.add.existing(rect2);
            this.physics.add.existing(rect3);
            this.physics.add.existing(redRect1);
            this.physics.add.existing(redRect2);

            rect1.body.setImmovable(true);
            rect1.body.setGravityX(0);
            rect1.body.setGravityY(-300);

            rect2.body.setImmovable(true);
            rect2.body.setGravityX(0);
            rect2.body.setGravityY(-300);

            rect3.body.setImmovable(true);
            rect3.body.setGravityX(0);
            rect3.body.setGravityY(-300);

            redRect1.body.setImmovable(true);
            redRect1.body.setGravityX(0);
            redRect1.body.setGravityY(-300);

            redRect2.body.setImmovable(true);
            redRect2.body.setGravityX(0);
            redRect2.body.setGravityY(-300);

            this.bounceText = this.add.text(20, 250, 'Bounces: ' + this.currBounces).setFontSize(25);
            this.add.text(20, 200, 'Bounces To Win: ' + this.reqBounces).setFontSize(25);
            this.timer = this.add.text(20, 300, 'Time: ' + Math.round(this.time.now * 0.001) + ' sec').setFontSize(25);

            const cannonBase = this.add.image(130, 948, 'cannonBase').setDepth(1);
            const cannonHead = this.add.image(130, 900, 'cannonHead').setDepth(1);

            this.ball = this.physics.add.image(cannonHead.x, cannonHead.y - 50, 'ball')
            .setBounce(1, 1)
            .setCollideWorldBounds(true, 1, 1, true)

            const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
            const line = new Phaser.Geom.Line();
            
            this.goal = this.physics.add.image(1800, 900, 'goal');
            this.goal.setScale(1.5);
            this.goal.setImmovable(true);
            this.goal.setGravityX(0);
            this.goal.setGravityY(-300);
            
            this.ball.body.onOverlap = true;
            this.ball.body.onCollide = true;
            this.physics.add.overlap(this.ball, this.goal);
            this.physics.add.collider(this.ball, rect1);
            this.physics.add.collider(this.ball, rect2);
            this.physics.add.collider(this.ball, rect3);
            this.physics.add.overlap(this.ball, redRect1);
            this.physics.add.overlap(this.ball, redRect2);

            this.ball.disableBody(true, true);

            let angle = 0;

            this.input.on('pointermove', (pointer) => {
                angle = Phaser.Math.Angle.BetweenPoints(cannonBase, pointer);
                cannonHead.rotation = angle;
                Phaser.Geom.Line.SetToAngle(line, cannonBase.x, cannonBase.y - 50, angle, 128);
                graphics.clear().strokeLineShape(line);
            });

            this.input.on('pointerup', () => {
                this.currBounces = 0;
                this.attempts += 1;
                this.ball.enableBody(true, cannonBase.x, cannonBase.y - 50, true, true);
                this.physics.velocityFromRotation(angle, 550, this.ball.body.velocity);
            });

            this.physics.world.on('worldbounds', (down) =>
            {
                if (down) { 
                    this.currBounces = 0; 
                    this.ball.disableBody(true, true);
                }
            });

            this.physics.world.on('overlap', () => {
                if (this.currBounces == this.reqBounces) {
                    this.scene.start('summary3', { attempts: this.attempts, time: Math.round(this.time.now * 0.001) });
                }
                else{
                    this.currBounces = 0;
                    this.ball.disableBody(true, true);
                }
            });

            this.physics.world.on('collide', () => {
                this.currBounces += 1;
            });
    }

    update() {
        this.ball.rotation = this.ball.body.angle;
        this.bounceText.setText('Bounces: ' + this.currBounces );
        this.timer.setText('Time: ' + Math.round(this.time.now * 0.001) + ' sec');

        if (this.currBounces > this.reqBounces) {
            this.currBounces = 0;
            this.ball.disableBody(true, true);
        }
    }
}

class Summary1 extends Phaser.Scene {
    attempts;

    time;

    constructor() {
        super('summary1')
    }

    init(data) {
        this.attempts = data.attempts;
        this.time = data.time;
    }

    create() {
        this.add.text(800, 300, 'Level Complete!!!').setFontSize(40);
        this.add.text(850, 540, 'Attempts: ' + this.attempts).setFontSize(40);
        this.add.text(850, 590, 'Time: ' + this.time + ' sec').setFontSize(40);
        this.add.text(1200, 900, 'Click anywhere to go to next level').setFontSize(25);

        this.input.on('pointerup', () => {
            this.scene.start('level2');
        });
    }
}

class Summary2 extends Phaser.Scene {
    attempts;

    time;

    constructor() {
        super('summary2')
    }

    init(data) {
        this.attempts = data.attempts;
        this.time = data.time;
    }

    create() {
        this.add.text(800, 300, 'Level Complete!!!').setFontSize(40);
        this.add.text(850, 540, 'Attempts: ' + this.attempts).setFontSize(40);
        this.add.text(850, 590, 'Time: ' + this.time + ' sec').setFontSize(40);
        this.add.text(1200, 900, 'Click anywhere to go to next level').setFontSize(25);

        this.input.on('pointerup', () => {
            this.scene.start('level3');
        });
    }
}

class Summary3 extends Phaser.Scene {
    attempts;

    time;

    constructor() {
        super('summary3')
    }

    init(data) {
        this.attempts = data.attempts;
        this.time = data.time;
    }

    create() {
        this.add.text(780, 300, 'You Won!!!').setFontSize(80);
        this.add.text(850, 540, 'Attempts: ' + this.attempts).setFontSize(40);
        this.add.text(850, 590, 'Time: ' + this.time + ' sec').setFontSize(40);
        this.add.text(1200, 900, 'Click anywhere to restart').setFontSize(25);

        this.input.on('pointerup', () => {
            this.scene.start('level1');
        });
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 300 }
        }
    },
    scene: [Level1, Summary1, Level2, Summary2, Level3, Summary3],
    title: "Physics Game",
});