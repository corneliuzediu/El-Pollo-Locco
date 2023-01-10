class Bottle extends MovableObject {
    height = 100;
    width = 100;

    // IMAGES = [
    //     'img/8_coin/coin_1.png'
    // ]

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_TOOGLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]

    constructor() {
        super();
        this.x = 300 + Math.random() * (level_end_x - 300); // zahl zwichen 200 und 700
        this.y = 200 + Math.random() * 200; 
        this.speed = 500 + Math.random() * 200;
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_TOOGLE);
        this.animate();
        // this.loadImages(this.IMAGES);
        // this.animate();
    }

    animate(){
        if(this.y < 340){
            this.loadImage('img/6_salsa_bottle/salsa_bottle.png'); 
            setInterval(() =>{
                this.playAnimation(this.IMAGES_ROTATION);
            }, this.speed)
        } else if ( this.y > 100){
            this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'); 
            setInterval(() =>{
                this.playAnimation(this.IMAGES_TOOGLE);
            }, this.speed)
        }
    }

    
}