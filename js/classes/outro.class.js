class Outro extends DrawableObject {
    x= 0;
    y = 0;
    width = 720;
    height = 480;
    IMAGE = ['img/9_intro_outro_screens/game_over/oh no you lost!.png']

    constructor(){
        super().loadImage(this.IMAGE[0])
    }
}