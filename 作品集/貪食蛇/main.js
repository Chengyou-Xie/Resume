const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// getContext() 會回傳一個 canvas 的 drawing context
// drawing context 可以用來在 canvas 內畫圖

const unit = 20;
const row = canvas.height / unit; // row 的數量
const col = canvas.width / unit; // column 的數量

// array 中的每個元素 都是物件，物件用來儲存每個身體的 x,y 座標
let snake = [
    { x: 80, y: 0 },
    { x: 60, y: 0 },
    { x: 40, y: 0 },
    { x: 20, y: 0 },
];

class Fruit {
    constructor() {
        this.x = Math.floor(Math.random() * col) * unit;
        this.y = Math.floor(Math.random() * row) * unit;
    }
    drawFruit() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, unit, unit);
    }
    // 選定新果實的位置不能與蛇身重疊
    pickALocation() {
        let overLapping = false;
        let newX, newY;

        function checkLapping(newX, newY) {
            for (let i = 0; i < snake.length; i++) {
                if (newX == snake[i].x && newY == snake[i].y) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        do {
            newX = Math.floor(Math.random() * col) * unit;
            newY = Math.floor(Math.random() * row) * unit;
            overLapping = checkLapping(newX, newY);
        } while (overLapping);
        this.x = newX;
        this.y = newY;
    }
}

// 設定最一開始的果實
let myFruit = new Fruit();

let d = "right"; // 蛇 移動的方向，不可 180度移動
window.addEventListener("keydown", changeDirection);

function changeDirection(e) {
    // 37:左   38:上   39:右   40:下
    if (e.keyCode == 37 && d != "right") {
        d = "left";
    } else if (e.keyCode == 38 && d != "down") {
        d = "up";
    } else if (e.keyCode == 39 && d != "left") {
        d = "right";
    } else if (e.keyCode == 40 && d != "up") {
        d = "down";
    }

    // 每次按下上下左右鑑時，可能在一幀內連點兩下
    // 會造成蛇還沒實際轉向，但 d 已經被改變
    // 有反咬自己(轉180度)的可能，造成遊戲結束
    window.removeEventListener("keydown", changeDirection);
    // 此為設定改變 d 後，在下一幀還沒被畫出來前不接受任何改變 d 的事件(keydown)
}

let score = 0;
document.getElementById("myScore").innerText = "遊戲分數：" + score;

let highestScore;
loadHighestScore();
document.getElementById("highestScore").innerText = "最高分數：" + highestScore;

function draw() {
    // 畫圖前判定蛇有沒有咬到自己
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(myGame);
            alert("遊戲結束");
            return; // 結束 setInterval，並且取消執行 draw 後面的程式碼
        }
    }
    // 畫圖前判定蛇有沒有咬到自己

    // 蛇移動後要重新繪製整個 canvas，此為整個覆蓋為黑色
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 畫果實
    myFruit.drawFruit();

    // 畫蛇
    for (let i = 0; i < snake.length; i++) {
        // 設定矩形填滿樣式
        if (i == 0) {
            ctx.fillStyle = "yellow";
        } else {
            ctx.fillStyle = "lightblue";
        }

        /////////// 畫蛇前判定位置是否需要做更動 ///////////
        /////////// 設定蛇碰到邊框後的動作 ///////////
        if (snake[i].x >= canvas.width) {
            snake[i].x = 0;
        }
        if (snake[i].y >= canvas.height) {
            snake[i].y = 0;
        }

        if (snake[i].x < 0) {
            snake[i].x = canvas.width - unit;
        }
        if (snake[i].y < 0) {
            snake[i].y = canvas.height - unit;
        }
        /////////// 設定蛇碰到邊框後的動作 ///////////

        // 設定邊框樣式
        ctx.strokeStyle = "white";

        //  x, y, width, height
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
        ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
    }

    // 以目前的方向 (d) 來決定蛇的移動路徑
    // 先取得蛇頭的位置
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "left") {
        snakeX -= unit;
    } else if (d == "up") {
        snakeY -= unit;
    } else if (d == "right") {
        snakeX += unit;
    } else if (d == "down") {
        snakeY += unit;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    // 確認蛇是否吃到果實
    if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
        myFruit.pickALocation();
        score += 1;
        setHighestScore(score);

        // 更新畫面上的分數
        document.getElementById("myScore").innerText = "遊戲分數：" + score;
        document.getElementById("highestScore").innerText =
            "最高分數：" + highestScore;
    } else {
        snake.pop();
    }
    snake.unshift(newHead);
    // 恢復 EventListener - 73行
    window.addEventListener("keydown", changeDirection);
}

let myGame = setInterval(draw, 100);

function loadHighestScore() {
    highestScore = localStorage.getItem("highestScore")
        ? Number(localStorage.getItem("highestScore"))
        : 0;
}

function setHighestScore(score) {
    if (score > highestScore) {
        localStorage.setItem("highestScore", score);
        highestScore = score;
    }
}
