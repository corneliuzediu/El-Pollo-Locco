let canvas;
let world;
let indexLevel = 1;
let keyboard = new Keyboard();
let runningLevel = level1;
let currentLevel;
let gameSwitch = false;
let musicSwitch = false;
let canvasFullscreen = false;
let gameFullscreen = false;
let reloadGame = false
let gameStatusInterval;
let intervalsID = []


async function init() {
    bindMobilBtns();
    if (canvasFullscreen) {
        gameSwitch = true;
        stopPreStartSound();
        let elementHTML = document.getElementById('preStart__canvas');
        window.canvas.style = "width: 100%";
        elementHTML.requestFullscreen();
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        if (!reloadGame) {
            await initlevel();
            gameStatusInterval = setInterval(() => checkGameStatus(), 100);
        }

        else if (reloadGame) {
            await nextLevel();
        }
    } else {
        canvas = document.getElementById('canvas');
        gameSwitch = true;
        stopPreStartSound()
        if (!reloadGame) {
            await initlevel();
            gameStatusInterval = setInterval(() => checkGameStatus(), 100);
        }
        else if (reloadGame) {
            await resetLevel();
            await initlevel();
            hideOutroButtons();
            gameStatusInterval = setInterval(() => checkGameStatus(), 100);
        }
    }
}


document.addEventListener('keydown', (e) => {
    if (e.keyCode == 65)
        keyboard.LEFT = true;
    if (e.keyCode == 68)
        keyboard.RIGHT = true;
    if (e.keyCode == 87)
        keyboard.UP = true;
    if (e.keyCode == 83)
        keyboard.DOWN = true;
    if (e.keyCode == 32)
        keyboard.SPACE = true;
    if (e.keyCode == 27)
        keyboard.EXIT = true;
    if (e.keyCode == 82)
        tryAgain();
    if (e.keyCode == 84)
        nextLevel();
});


document.addEventListener('keyup', (e) => {
    if (e.keyCode == 65)
        keyboard.LEFT = false;
    if (e.keyCode == 68)
        keyboard.RIGHT = false;
    if (e.keyCode == 87)
        keyboard.UP = false;
    if (e.keyCode == 83)
        keyboard.DOWN = false;
    if (e.keyCode == 32)
        keyboard.SPACE = false;
    if (e.keyCode == 27)
        keyboard.EXIT = false;
});


function bindMobilBtns() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    })
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    })


    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    })


    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    })


    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    })


    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    })


    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    })

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    })
}


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


async function selectLevel(i) {
    runningLevel = level1;
    if (i == 2) {
        runningLevel = level2;
        indexLevel = 2; //For Menu Level Selector
        backToMenu();
        showcanvas();
        init();
    }
    else if (i == 3) {
        runningLevel = level3;
        indexLevel = 3; //For Menu Level Selector
        reloadGame = true;
        backToMenu();
        showcanvas();
        init();

    } else {
        runningLevel = level1;
        backToMenu();
        showcanvas();
        init();
    }
}


async function initlevel() {
    canvas = document.getElementById('canvas');
    if (runningLevel == level1) {
        currentLevel = await initlevel1();
        world = new World(canvas, keyboard, currentLevel);
    } else if (runningLevel == level2) {
        currentLevel = await initlevel2();
        world = new World(canvas, keyboard, currentLevel);
    } else if (runningLevel == level3) {
        currentLevel = await initlevel3();
        world = new World(canvas, keyboard, currentLevel);
    }
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


function setIntervalFrame(fn, time) {
    let id = setInterval(fn, time);
    intervalsID.push(id);
};


function stopGame() {
    intervalsID.forEach(clearInterval);
}


function restartGame() {
    world.restartWorld();
}


async function nextLevel() {
    indexLevel++;
    if (indexLevel > 3) {
        indexLevel = 3;
    }
    intervalsID.forEach(clearInterval);
    world.redraw = false;
    world.character.bottleFuel = 0;
    world.clearCanvas();
    console.log("Level: ", indexLevel);
    currentLevel = undefined;
    await selectLevel(indexLevel)
    gameStatusInterval = setInterval(() => checkGameStatus(), 100);
}


function checkGameStatus() {
    showLevelOnCanvas();
    if (world.character.isDead()) {
        stopGame();
        showTryAgain();
        clearInterval(gameStatusInterval)
    } else if (world.level.endBoss[endBoss.length - 1].energy <= 0) {
        clearInterval(gameStatusInterval);
        console.log('as');
        setTimeout(() => {
            stopGame();
            showGoNextLevel();
        }, 2000)
    }
}

function tryAgain() {
    hideOutroButtons();
    stopGame();
    restartGame();
    gameStatusInterval = setInterval(() => checkGameStatus(), 100);
}


function showTryAgain() {
    showPlayerLost();
    setTimeout(getTryAgain, 2000);
}


function getTryAgain() {
    document.getElementById('canvas').classList.add('blur');
    document.getElementById('buttons__newOrNext').classList.remove('d-none');
    document.getElementById('btnReload').classList.remove('d-none');
}


function goNextLevel() {
    hideOutroButtons();
    nextLevel();
}


function showGoNextLevel() {
    if (runningLevel != level3) {
        getTryAgain();
        document.getElementById('btnNextLevel').classList.remove('d-none');
    } else if (runningLevel == 'level3') {
        document.getElementById('canvas').classList.add('blur');
        document.getElementById('outro__wrapper').classList.remove('d-none');
        document.getElementById('outro__img').src = "./img/9_intro_outro_screens/game_over/game over!.png";
        //setTimeout: after 2 seconds. it shound go back to initial page.
        setTimeout(() => {
            // world.clearCanvas();
            world = undefined;
            currentLevel = undefined;
            indexLevel = 1;
            runningLevel = 'level1';
            level1 = 'level1';
            document.getElementById('preStart__buttons').classList.remove('d-none')
            document.getElementById('buttons__newOrNext').classList.add('d-none');
            document.getElementById('preStart__canvas').classList.add('d-none')
            document.getElementById('outro__wrapper').classList.add('d-none');
            document.getElementById('canvas').classList.remove('blur');
        }, 2000)
    };
}


function showPlayerLost() {
    document.getElementById('outro__wrapper').classList.remove('d-none');
    document.getElementById('canvas').classList.add('blur');
    setTimeout(() => {
        document.getElementById('outro__wrapper').classList.add('d-none');
    }, 2000);
};


function hideOutroButtons() {
    document.getElementById('buttons__newOrNext').classList.add('d-none');
    document.getElementById('btnReload').classList.add('d-none');
    document.getElementById('btnNextLevel').classList.add('d-none');
    document.getElementById('canvas').classList.remove('blur');
}


function showLevelOnCanvas() {
    if (runningLevel == 'level1')
        document.getElementById('display__level').innerHTML = 'Level 1';
    if (runningLevel == 'level2')
        document.getElementById('display__level').innerHTML = 'Level 2';
    if (runningLevel == 'level3')
        document.getElementById('display__level').innerHTML = 'Level 3';

}

