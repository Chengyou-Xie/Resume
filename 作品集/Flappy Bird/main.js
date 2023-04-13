const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const gameContainer = document.querySelector("#game-container");

const bird = new Image();
bird.src = "images/bird.png";

// 遊戲常數
const FLAP_SPEED = -4.8;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;

// bird 變數
let birdX = 50;
let birdY = 50;
let birdV = 0;
let birdA = 0.2;

// pipe 變數
let pipeX = 400;
let pipeY = canvas.height - 200;

// score & record 變數
let scoreDiv = document.querySelector("#score-display");
let score = 0;
let record = 0;

// 因為 increaseScore() 一次會執行很多次，故新增 scored 來控制執行一次
let scored = false;

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

window.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
        birdV = FLAP_SPEED;
    }
});
document.querySelector("#restart").addEventListener("click", () => {
    hideMenu();
    restartGame();
    loop();
});

function restartGame() {
    birdX = 50;
    birdY = 50;
    birdV = 0;
    birdA = 0.2;

    pipeX = 400;
    pipeY = canvas.height - 200;

    score = 0;
    scoreDiv.innerHTML = score;
}

function endGame() {
    showMenu();
}

function showMenu() {
    document.querySelector("#end-page").style.display = "block";
    gameContainer.classList.add("blur");
    document.querySelector("#end-score").innerText = score;
    if (score > record) {
        record = score;
    }
    document.querySelector("#record").innerHTML = record;
}

function hideMenu() {
    document.querySelector("#end-page").style.display = "none";
    gameContainer.classList.remove("blur");
}

function increaseScore() {
    if (birdX > pipeX + PIPE_WIDTH && !scored) {
        score++;
        scoreDiv.innerHTML = score;
        scored = true;
    }
    if (birdX < pipeX + PIPE_WIDTH) {
        scored = false;
    }
}

function collisionCheck() {
    // 先整理 bird 和 pipes 的位置和尺寸
    const birdBox = {
        x: birdX,
        y: birdY,
        width: BIRD_WIDTH,
        height: BIRD_HEIGHT,
    };

    const topPipeBox = {
        x: pipeX,
        y: pipeY - PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: pipeY,
    };

    const bottomPipeBox = {
        x: pipeX,
        y: pipeY + PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: canvas.height - pipeY - PIPE_GAP,
    };

    // 判斷碰撞 topPipe(左、右、下)
    if (
        birdBox.x + birdBox.width > topPipeBox.x &&
        birdBox.x < topPipeBox.x + topPipeBox.width &&
        birdBox.y < topPipeBox.y
    ) {
        return true;
    }

    // 判斷碰撞 bottomPipe(左、右、上)
    if (
        birdBox.x + birdBox.width > bottomPipeBox.x &&
        birdBox.x < bottomPipeBox.x + bottomPipeBox.width &&
        birdBox.y + birdBox.height > bottomPipeBox.y
    ) {
        return true;
    }

    // 判斷碰到邊界
    if (birdY < 0 || birdY + BIRD_HEIGHT > canvas.height) {
        return true;
    }
}

function loop() {
    // 每次 loop 先清除所有元件
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw bird
    ctx.drawImage(bird, birdX, birdY, BIRD_WIDTH, BIRD_WIDTH);

    // draw pipes
    ctx.fillStyle = "#333";
    ctx.fillRect(pipeX, -100, PIPE_WIDTH, pipeY);
    ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY);

    // 確認是否碰撞
    if (collisionCheck()) {
        endGame();
        return;
    }

    // move bird
    birdV += birdA;
    birdY += birdV;

    // move pipes
    pipeX -= 4;

    // pipe 超出畫面後重置 pipe
    if (pipeX < -50) {
        pipeX = 400;
        pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH;
    }

    increaseScore();
    requestAnimationFrame(loop);
}

// 首次開始執行
loop();
