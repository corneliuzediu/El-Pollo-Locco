function showcanvas() {
    document.getElementById('preStart__buttons').classList.add('d-none');
    document.getElementById('preStart__canvas').classList.remove('d-none');
};


function openLevelSelector() {
    document.getElementById('preStart__buttons').classList.add('d-none');
    document.getElementById('preStart__level').classList.remove('d-none');
};


function openOptionsSelector() {
    document.getElementById('preStart__buttons').classList.add('d-none');
    document.getElementById('preStart__options').classList.remove('d-none');
};


function openInstructions() {
    document.getElementById('preStart__buttons').classList.add('d-none');
    document.getElementById('preStart__instructions').classList.remove('d-none');
};


function backToMenu() {
    document.getElementById('preStart__buttons').classList.remove('d-none');
    document.getElementById('preStart__level').classList.add('d-none');
    document.getElementById('preStart__instructions').classList.add('d-none');
};


function enterFullscreen() {
    if (!inFullScreen())
        goFullScreen();
    else if (inFullScreen())
        goMiminizedScreen();
};

function inFullScreen() {
    return gameFullscreen;
};


function goFullScreen() {
    let elementHTML = document.getElementById('preStart__canvas');
    window.canvas.style = "height 100vh;";
    elementHTML.requestFullscreen();
    gameFullscreen = true;
    changeImgFullscreen();
};


function goMiminizedScreen() {
    window.canvas.style = "height: 100%";
    window.canvas.style = "width: 100%";
    document.exitFullscreen();
    gameFullscreen = false;
    changeImgFullscreen();
};


function changeImgMusic() {
    const musicOn = document.getElementById('music-btn1');
    const musicOFF = document.getElementById('music-btn2');
    const musicOnOut = document.getElementById('music-btn1-out');
    const musicOFFOut = document.getElementById('music-btn2-out');
    if (musicSwitch)
        stopMusic(musicOn, musicOFF, musicOnOut, musicOFFOut)
    else if (!musicSwitch)
        startMusic(musicOn, musicOFF, musicOnOut, musicOFFOut);
}


function startMusic(musicOn, musicOFF, musicOnOut, musicOFFOut) {
    startPreStartSound();
    musicOn.classList.remove('d-none');
    musicOFF.classList.add('d-none');
    musicOnOut.classList.remove('d-none');
    musicOFFOut.classList.add('d-none');
    musicSwitch = true;
};


function stopMusic(musicOn, musicOFF, musicOnOut, musicOFFOut) {
    stopPreStartSound(musicOn, musicOFF, musicOnOut, musicOFFOut);
    musicOn.classList.add('d-none');
    musicOFF.classList.remove('d-none');
    musicOnOut.classList.add('d-none');
    musicOFFOut.classList.remove('d-none');
    musicSwitch = false;
};


function changeImgFullscreen() {
    const fullscreenON = document.getElementById('fullscreen-btn1');
    const fullscreenOFF = document.getElementById('fullscreen-btn2');
    if (inFullScreen()) {
        fullscreenON.classList.add('d-none');
        fullscreenOFF.classList.remove('d-none');
    } else if (!inFullScreen()) {
        fullscreenON.classList.remove('d-none');
        fullscreenOFF.classList.add('d-none');
    };
};



function showTryAgain() {
    showPlayerLost();
    setTimeout(getTryAgain, 2000);
};


function showPlayerLost() {
    document.getElementById('outro__wrapper').classList.remove('d-none');
    document.getElementById('canvas').classList.add('blur');
    setTimeout(() => document.getElementById('outro__wrapper').classList.add('d-none'), 2000);
};


function getTryAgain() {
    document.getElementById('canvas').classList.add('blur');
    document.getElementById('buttons__newOrNext').classList.remove('d-none');
    document.getElementById('btnReload').classList.remove('d-none');
};


function showGoNextLevel() {
    if (!isLastLevel()) {
        getTryAgain();
        document.getElementById('btnNextLevel').classList.remove('d-none');
    } else if (isLastLevel()) {
        showGameOver();
        setTimeout(() => backToStart(), 2000)
    };
};


function isLastLevel() {
    return runningLevel == level3;
};


function showGameOver() {
    document.getElementById('canvas').classList.add('blur');
    document.getElementById('outro__wrapper').classList.remove('d-none');
    document.getElementById('outro__img').src = "./img/9_intro_outro_screens/game_over/game over!.png";
    clearInterval(gameStatusInterval);
};

function backToStart(){
    resetGameParameters();
    backToInitialPage();
};


function backToInitialPage() {
    document.getElementById('preStart__buttons').classList.remove('d-none')
    document.getElementById('buttons__newOrNext').classList.add('d-none');
    document.getElementById('preStart__canvas').classList.add('d-none')
    document.getElementById('outro__wrapper').classList.add('d-none');
    document.getElementById('canvas').classList.remove('blur');
    document.getElementById('musicSwitch__out').classList.remove('d-none');
};


function resetGameParameters() {
    world = undefined;
    currentLevel = undefined;
    indexLevel = 1;
    runningLevel = 'level1';
    level1 = 'level1';
};


function hideOutroButtons() {
    document.getElementById('buttons__newOrNext').classList.add('d-none');
    document.getElementById('btnReload').classList.add('d-none');
    document.getElementById('btnNextLevel').classList.add('d-none');
    document.getElementById('canvas').classList.remove('blur');
};


function showLevelOnCanvas() {
    if (runningLevel == 'level1')
        document.getElementById('display__level').innerHTML = 'Level 1';
    if (runningLevel == 'level2')
        document.getElementById('display__level').innerHTML = 'Level 2';
    if (runningLevel == 'level3')
        document.getElementById('display__level').innerHTML = 'Level 3';
};