/*      Variables       */
let canvas;
let world;
let indexLevel = 1;
let keyboard = new Keyboard();
let runningLevel = level1;
let currentLevel;
let gameSwitch = false;
let musicSwitch = false;
let gameFullscreen = false;
let reloadGame = false
let gameStatusInterval;
let intervalsID = [];
let preStartSound = new Audio('audio/pre_start.mp3');



async function init() {
    connectControlers();
    getCanvasOnDisplay();
    if (isNewGame())
        await initlevel();
    else if (reloadGame)
        await startLevelFromTheBeginning();
    doGameStatusCheck();
};


function connectControlers() {
    bindMobilBtns();
    getPressDownButton();
    getRemovePressButton();
};


function getPressDownButton() {
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
    });
}


function getRemovePressButton() {
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
};


function bindMobilBtns() {
    getTouchMoveLeft();
    getTouchMoveRight();
    getToughtThrow();
    getTouchJump();
};


function getTouchMoveLeft() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
};


function getTouchMoveRight() {
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
};


function getToughtThrow() {
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
};


function getTouchJump() {
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
};


function getCanvasOnDisplay() {
    canvas = document.getElementById('canvas')
    document.getElementById('musicSwitch__out').classList.add('d-none');
    gameSwitch = true;
};


function isNewGame() {
    return !reloadGame;
};


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
    };
};


async function startLevelFromTheBeginning() {
    await resetLevel();
    await initlevel();
    hideOutroButtons();
};


function doGameStatusCheck() {
    gameStatusInterval = setInterval(() => checkGameStatus(), 100);
};


function checkGameStatus() {
    showLevelOnCanvas();
    if (isCharacterDead())
        youLost();
    else if (isEndBossDead())
        youWin();
};


function isCharacterDead() {
    return world.character.isDead();
};


function youLost() {
    stopGame();
    showTryAgain();
    clearInterval(gameStatusInterval)
};


function isEndBossDead() {
    return world.level.endBoss[endBoss.length - 1].energy <= 0;
};


function youWin() {
    clearInterval(gameStatusInterval);
    setTimeout(() => {
        stopGame();
        showGoNextLevel();
    }, 2000)
};


function stopGame() {
    intervalsID.forEach(clearInterval);
};


function preStart() {
    const popup = document.getElementById('popup');
    popup.classList.add('d-none');
    changeImgMusic();
    preStartSound.volume = 0.2;
};


function startPreStartSound() {
    preStartSound.play();
    preStartSound.loop = true;
};


function stopPreStartSound() {
    preStartSound.pause();
};


async function selectLevel(i) {
    if (i == 2)
        prepareLevel2();
    else if (i == 3)
        prepareLevel3();
    else
        prepareLevel1();
};


function prepareLevel1() {
    runningLevel = level1;
    startLevel();
};


function prepareLevel2() {
    runningLevel = level2;
    indexLevel = 2; //For Menu Level Selector
    startLevel();
};


function prepareLevel3() {
    runningLevel = level3;
    indexLevel = 3; //For Menu Level Selector
    reloadGame = true;
    startLevel();
};


function startLevel() {
    backToMenu();
    showcanvas();
    init();
};


function setIntervalFrame(fn, time) {
    let id = setInterval(fn, time);
    intervalsID.push(id);
};


function goNextLevel() {
    hideOutroButtons();
    nextLevel();
};


async function nextLevel() {
    indexLevel++;
    if (indexLevel > 3)
        indexLevel = 3;
    clearCurrentLevel();
    await selectLevel(indexLevel);
};


function clearCurrentLevel() {
    intervalsID.forEach(clearInterval);
    world.redraw = false;
    world.character.bottleFuel = 0;
    world.clearCanvas();
    currentLevel = undefined;
};


function tryAgain() {
    hideOutroButtons();
    stopGame();
    restartGame();
    gameStatusInterval = setInterval(() => checkGameStatus(), 100);
};


function restartGame() {
    world.restartWorld();
};