class Outro extends DrawableObject {
    x= 0;
    y = 80;
    width = 720;
    height = 400;
    IMAGE = ['img/9_intro_outro_screens/game_over/oh no you lost!.png']

    constructor(){
        super().loadImage(this.IMAGE[0])
    }
}