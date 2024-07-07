const playbord = document.querySelector(".playbord");
const game=document.querySelector('.game');

let foodX; 
let foodY;
let snakeX = 5; 
let snakeY = 10;
let velX = 0; 
let valY = 0;
let snakebody = [];
let over = false;
let setIntervalId;
let score = 0;
const controls = document.querySelectorAll(".controls i");
const highscoreE = document.querySelector(".high-score")
let highscore = localStorage.getItem("high-score") || 0;
highscoreE.innerHTML = ` High-Score:${highscore}`;
const scoreE = document.querySelector(".score");

const changefoodposition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}
const handleover = () => {
    alert("GAME OVER!....PRESS OK TO PLAY AGAIN");
    clearInterval(setIntervalId);
    location.reload();
}
const iniGame = () => {
    if (over) return handleover();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    snakeX += velX;//vel in x dirn;
    snakeY += valY;//vel in y dirn;
    for (let index = snakebody.length - 1; index > 0; index--) {
        snakebody[index] = snakebody[index - 1];

    }
    snakebody[0] = [snakeX, snakeY];
    if (snakeX === foodX && snakeY === foodY) {
        changefoodposition();
        snakebody.push([foodX, foodY]);  
        score++;
        highscore = score > highscore ? score : highscore;
        localStorage.setItem("high-score", highscore)
        scoreE.innerHTML = `Score:${score}`;
        highscore.innerHTML = `High-Score:${highscore}`;
        console.log(snakebody);
    }
    for (let index = 0; index < snakebody.length; index++) {
        htmlMarkup += `<div class="food" style="grid-area: ${snakebody[index][1]}/${snakebody[index][0]}"></div>`;
        if (index != 0 && snakebody[0][1] === snakebody[index][1] && snakebody[index][0] === snakebody[0][0]) {
            over = true;
        }
    }
    if (snakeX == 0 || snakeY > 30 || snakeY == 0 || snakeX > 30) {
        //  console.log("over")
        over = true;
    }

    htmlMarkup += `<div class="snake" style="grid-area: ${snakeY}/${snakeX}"></div>`;

    // playbord.innerHTML = htmlMarkup;
    playbord.innerHTML = htmlMarkup;
}

const changedirection = (e) => {
    console.log(e)
    if (e.code === "ArrowUp") {
        velX = 0; valY = -1;
    }
    else if (e.code === "ArrowDown") {
        velX = 0; valY = 1;
    }
    else if (e.code === "ArrowLeft") {
        velX = -1; valY = 0;
    } else if (e.code === "ArrowRight") {
        velX = +1; valY = 0;
    }
    iniGame();

}
controls.forEach(code => {
   code.addEventListener("click", () => changedirection({ code: code.dataset.key }));
})
changefoodposition();
// setIntervalId = setInterval(iniGame, 125)
setIntervalId = setInterval(iniGame, 125)
document.addEventListener("keydown", changedirection)
