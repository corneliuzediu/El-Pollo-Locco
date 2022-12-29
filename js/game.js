let canvas;
let world;
let keyboard = new Keyboard();
let level = level1;
let num = 0;



function init() {
    if (num % 2 != 0) {
        window.canvas.requestFullscreen();
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard, level);
        console.log('My char is', world.character)
    }
    
// } else if (num % 2 == 0){
//     document.exitFullscreen();
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 65) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 68) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 87) {
        keyboard.UP = true;
    }
    if (e.keyCode == 83) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
});


document.addEventListener('keyup', (e) => {
    if (e.keyCode == 65) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 68) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 87) {
        keyboard.UP = false;
    }
    if (e.keyCode == 83) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
});

let preStartSound = new Audio('audio/pre_start.mp3')

function preStart() {
    // setInterval(() => {
    //     preStartSound.play();
    // }, 1)
}

function showcanvas() {
    document.getElementById('preStart__buttons').classList.add('d-none');
    document.getElementById('preStart__canvas').classList.remove('d-none');
}


function openLevelSelector() {
    document.getElementById('preStart__buttons').classList.add('d-none');
    document.getElementById('preStart__level').classList.remove('d-none');
}


function openOptionsSelector() {
    document.getElementById('preStart__buttons').classList.add('d-none');
    document.getElementById('preStart__options').classList.remove('d-none');
}


function openInstructions() {
    document.getElementById('preStart__buttons').classList.add('d-none');
    document.getElementById('preStart__instructions').classList.remove('d-none');
}


function backToMenu() {
    document.getElementById('preStart__buttons').classList.remove('d-none');
    document.getElementById('preStart__level').classList.add('d-none');
    document.getElementById('preStart__options').classList.add('d-none');
    document.getElementById('preStart__instructions').classList.add('d-none');

}


function selectLevel(i) {
    level = level1;
    if (i == 2) {
        level = level2;
    } else if (i == 3) {
        level = level3;
    } else if (i == 4) {
        level = level4;
    } else if (i == 5) {
        level = level5;
    } else {
        level = level1
    }
    console.log(level)
}


function fullscreen() {
    num += 1;
    if (num % 2 != 0) {
        document.body.requestFullscreen();
    } else if (num % 2 == 0) {
        document.exitFullscreen();
        canvas.exitFullscreen();
    }
    let a = (num % 1);
    console.log(a);

}
    // document.canvas.requestFullscreen();