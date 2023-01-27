let canvas;
let world;
let keyboard = new Keyboard();
let runningLevel = level1
let currentLevel;
let newLevel = false;
let gameSwitch = false;
let musicSwitch = false;
let canvasFullscreen = false;
let gameFullscreen = false;
let intervalsID = []




function init() {
    // setInterval(() => {
    //     checkForNextLevel();
    // })
    if (canvasFullscreen) {
        gameSwitch = true;
        stopPreStartSound();
        let elementHTML = document.getElementById('preStart__canvas');
        window.canvas.style = "width: 100%";
        elementHTML.requestFullscreen();
        canvas = document.getElementById('canvas');
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        initlevel();
    } else {
        gameSwitch = true;
        stopPreStartSound()
        canvas = document.getElementById('canvas');
        initlevel();
    }
}


function checkForNextLevel() {
    // if(keyboard.NEW_LEVEL == true){
    runningLevel = level2;
    initlevel();
    // }
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
    if (e.keyCode == 82) {
        keyboard.RELOAD = true;
    }
    if (e.keyCode == 72) {
        keyboard.NEW_LEVEL = true;
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
    if (e.keyCode == 27) {
        keyboard.EXIT = false;
    }
    if (e.keyCode == 82) {
        keyboard.RELOAD = false;
    }
    if (e.keyCode == 72) {
        keyboard.NEW_LEVEL = false;
    }
});

document.addEventListener('mousedown', (e) => {
    keyboard.CLICK = true;
    keyboard.CLICK_X = e.clientX - canvas.offsetLeft;
    keyboard.CLICK_Y = e.clientY - canvas.offsetTop;
    console.log("E x:", e.x, "E y:", e.y);
    console.log("Canvas w", canvas.width, "Canvas h:", canvas.height);
}, false)


document.addEventListener('mouseup', (e) => {
    keyboard.CLICK = false;
})


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
    runningLevel = level1;
    if (i == 2) {
        runningLevel = level2;
    } else if (i == 3) {
        runningLevel = level3;
    } else if (i == 4) {
        runningLevel = level4;
    } else if (i == 5) {
        runningLevel = level5;
    } else {
        runningLevel = level1
    }
}


async function initlevel() {
    if (runningLevel == level1) {
        currentLevel = await initlevel1();
        world = new World(canvas, keyboard, currentLevel);
        console.log("l1w:", world)
        console.log("l1lvl:", currentLevel)
    } else if (runningLevel == level2) {
        console.log("B R:", world)
        console.log("B R:", currentLevel)
        currentLevel = await initlevel2();
        world = new World(canvas, keyboard, currentLevel);
        console.log("A R:", world)
        console.log("A R:", currentLevel)
        // }, 3000)
        // world.character.x = 0;
        // world.level.enemies = 0;
        // world.level.enemies = ;
        console.log("A r:", world)
        // currentLevel = await initlevel2();
    }
    //  else if (currentLevel === level3) {
    //     currentLevel = initlevel3();
    //     world = new World(canvas, keyboard, currentLevel);
    // } else if (currentLevel === level4) {
    //     currentLevel = initlevel4();
    //     world = new World(canvas, keyboard, currentLevel);
    // } else if (currentLevel === level5) {
    //     currentLevel = initlevel5();
    //     world = new World(canvas, keyboard, currentLevel);
    // }
}


function enterFullscreen() {
    if (window.screen.availHeight != window.screen.height && !gameSwitch) {
        document.body.requestFullscreen();
        canvasFullscreen = true;
        gameFullscreen = true;
        changeImgFullscreen();
    } else if (window.screen.availHeight != window.screen.height && gameSwitch) {
        let elementHTML = document.getElementById('preStart__canvas');
        window.canvas.style = "height 100vh;";
        elementHTML.requestFullscreen();
        gameFullscreen = true;
        changeImgFullscreen();
    } else if (window.screen.availHeight == window.screen.height) {
        window.canvas.style = "height: 100%";
        window.canvas.style = "width: 100%";
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


function getClickReloadOrNext() {
    // setTimeout(() => {
    this.a++;
    console.log("click", this.a)
    if (this.a == 1) {
        world.restartWorld();
        console.log("ar:", world)
    }
    setTimeout(() => {
        this.a = 0
    }, 2000);
    // }, 400)
}


function setIntervalFrame(fn, time) {
    let id = setInterval(fn, time);
    intervalsID.push(id);
};


function stopGame() {
    console.log(intervalsID);
    intervalsID.forEach(clearInterval);
    setTimeout(() => restartGame(), 200)
}

function restartGame() {
    world.restartWorld();
}


function nextLevel() {
    intervalsID.forEach(clearInterval);
    world.clearCanvas();
    debugger;
    world = 0;
    runningLevel = level2;
    initlevel();
}
