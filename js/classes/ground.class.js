class Ground extends MovableObject{
    y = 450;
    width = 80;
    height = 81;

    constructor(){
        super().loadImage('img/ground_line.ico');
    }
}