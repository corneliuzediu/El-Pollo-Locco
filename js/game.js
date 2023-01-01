let canvas;
let world;
let keyboard = new Keyboard();
let level = level1;
let gameSwitch = false;
let musicSwitch = false;
let canvasFullscreen = false;
let gameFullscreen = false;



function init() {
    if (canvasFullscreen) {
        gameSwitch = true;
        stopPreStartSound();
        window.canvas.requestFullscreen();
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard, level);
        console.log('My char is', world.character)
    } else {
        gameSwitch = true;
        stopPreStartSound()
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard, level);
        console.log('My char is', world.character)
    }
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

    if (e.keyCode == 27) {
        keyboard.EXIT = true;
    }
    console.log(e);
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
    if (e.keyCode == 27) {
        keyboard.EXIT = false;
    }
});

let preStartSound = new Audio('audio/pre_start.mp3')

function preStart() {
    const popup = document.getElementById('popup');
    popup.classList.add('d-none');
    changeImgMusic();
}



function startPreStartSound() {
    preStartSound.play();
    preStartSound.loop = true;
}

function stopPreStartSound() {
    preStartSound.pause();
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
}


function enterFullscreen() {
    if (window.screen.availHeight != window.screen.height && !gameSwitch) {
        document.body.requestFullscreen();
        canvasFullscreen = true;
        gameFullscreen = true;
        changeImgFullscreen();
    } else if (window.screen.availHeight != window.screen.height && gameSwitch) {
        window.canvas.requestFullscreen();
        gameFullscreen = true;
        changeImgFullscreen();
    } else if (window.screen.availHeight == window.screen.height) {
        document.exitFullscreen();
        canvasFullscreen = false;
        gameFullscreen = false;
        changeImgFullscreen();
    }
}


function changeImgMusic() {
    const musicOn = document.getElementById('music-btn1');
    const musicOFF = document.getElementById('music-btn2');
    if (musicSwitch) {
        stopPreStartSound();
        musicOn.classList.add('d-none');
        musicOFF.classList.remove('d-none');
        musicSwitch = false;
    } else if (!musicSwitch) {
        startPreStartSound();
        musicOn.classList.remove('d-none');
        musicOFF.classList.add('d-none');
        musicSwitch = true;
    }
}


function changeImgFullscreen() {
    const fullscreenON = document.getElementById('fullscreen-btn1');
    const fullscreenOFF = document.getElementById('fullscreen-btn2');
    if (gameFullscreen) {
        fullscreenON.classList.add('d-none');
        fullscreenOFF.classList.remove('d-none');
    } else if (!gameFullscreen) {
        fullscreenON.classList.remove('d-none');
        fullscreenOFF.classList.add('d-none');
    }
}