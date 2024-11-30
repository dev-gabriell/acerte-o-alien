const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
        totalScore: document.querySelector("#totalscore"),
    },
    values:{
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 20,
        lifeid: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 500),
        countDownTimerId: setInterval(countDown, 1000),
      },
    };

    function countDown(){
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;
        if(state.values.currentTime <= 0) {
            state.values.lifeid--;
            state.view.life.textContent = state.values.lifeid;
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);
            state.view.squares.forEach((square) => {
                square.classList.remove("enemy");
            });
            alert("Game Over! O seu resultado foi: " + state.values.result);
        }
        if(state.values.lifeid == 0){
            showGameOverWindow(); 
            setTimeout(() =>{
            const gameOverWindow = document.querySelector('.infor');
            gameOverWindow.style.display = 'none';
            }, 7000)
            setTimeout(() =>{
                resetGame();
            }, 10000);  
        }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.1;
    audio.play();
}


function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    let randowNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randowNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () =>{
        if(square.id === state.values.hitPosition){
            state.values.result++
            state.view.score.textContent = state.values.result  
            state.view.totalScore.textContent = 
            (parseInt(state.view.totalScore.textContent, 10) || 0) + 1  
            state.values.hitPosition = null;
            playSound();
            }
        })
    });
}


function showGameOverWindow() {
    const gameOverWindow = document.querySelector('.infor');
    gameOverWindow.style.display = 'flex';
}

//REINICIA O JOGO
function restart(){
    state.values.currentTime = 20;
    state.values.result = 0;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;

    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    initalize();  
}

function resetGame() {
    state.values.currentTime = 20;
    state.values.lifeid = 3; 
    state.values.result = 0; 
    state.view.life.textContent = state.values.lifeid;
    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.totalScore.textContent = 0; 

    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    initalize();
}
function initalize(){
    addListenerHitBox();
}
initalize();
