class Bottle extends MovableObject {
    /***    Images for animations   ***/
    IMAGES_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    IMAGES_TOOGLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]


    /***    Variables   ***/
    height = 100;
    width = 100;


    constructor() {
        super();
        this.x = 300 + Math.random() * (level_end_x - 300); // zahl zwichen 200 und 700
        this.y = 200 + Math.random() * 150;
        this.speed = 500 + Math.random() * 200;
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_TOOGLE);
        this.animate();
    };


    animate() {
        if (this.isBottleSuspended())
            this.rotateBottle();
        else if (this.isBottleOnGround())
            this.toogleBottle();
    };


    rotateBottle() {
        this.loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.setIntervalFrame(() => this.playAnimation(this.IMAGES_ROTATION), this.speed);
    };
    
    
    isBottleSuspended() {
        return this.y < 330;
    };
    
    
    toogleBottle() {
        this.loadImage('./img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.setIntervalFrame(() => this.playAnimation(this.IMAGES_TOOGLE), this.speed);
    };

    
    isBottleOnGround() {
        return this.y > 100;
    };


    resetBottle() {
        this.x = 300 + Math.random() * (level_end_x - 300);
        this.y = 200 + Math.random() * 150;
        this.speed = 500 + Math.random() * 200;
    };
}