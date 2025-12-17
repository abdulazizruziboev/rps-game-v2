/* HTML Elements */
let elScoreTxt = document.querySelector(".score_main");
const elHands = document.querySelectorAll(".hands");
const elGameBox = document.querySelector(".game_box");
const elResultBox = document.querySelector(".result_box");
const elResultText = document.querySelector(".result_text");
const elTryBox = document.querySelector(".try_box");
const elTryBtn = document.querySelector(".again_btn");
const elUserImg = document.querySelector(".user_img");
const elRobotImg = document.querySelector(".robot_img");
const elModeBtn = document.querySelector("#modeBtn");
const elModal = document.querySelector(".rules");
const elModalOpenBtn = document.querySelector("#rulesBtn");
const elModalCloseBtn = document.querySelector(".modal_close");
const elRulesImg = document.querySelector("#rulesImg");
/* Variables */
let basicHands = ["rock","paper","scissors"];
let advancedHands = ["rock","paper","scissors","lizard","spock"];
// Local Storage !

document.addEventListener("DOMContentLoaded",()=> {
    setTimeout(()=>{
        document.querySelector(".loader").style.transform = "translateY(-100%)";
    },1500)
});

elScoreTxt.textContent = localStorage.getItem("score")||0;
localStorage.setItem("mode",localStorage.getItem("mode")||"basic");

function changeMode() {
    if(localStorage.getItem("mode")=="basic"){
        localStorage.setItem("mode","advanced");
    } else if (localStorage.getItem("mode")=="advanced") {
        localStorage.setItem("mode","basic");
    } 
    if(localStorage.getItem("mode")=="basic") {
        elGameBox.classList.remove("advanced");
        elGameBox.classList.add("basic");
        document.getElementById("logo").src = "/imgs/tipa-logo.svg";
        elRulesImg.src="imgs/rule-basic.svg";
        elModeBtn.textContent="advanced";
    } else {
        elGameBox.classList.remove("basic");
        elGameBox.classList.add("advanced");
        document.getElementById("logo").src = "/imgs/tipa-logo-advanced.svg";
        elRulesImg.src="imgs/rule-advanced.svg";
        elModeBtn.textContent="basic";
    }
};

if(localStorage.getItem("mode")=="basic") {
        elGameBox.classList.remove("advanced");
        elGameBox.classList.add("basic");
        document.getElementById("logo").src = "/imgs/tipa-logo.svg";
        elRulesImg.src="imgs/rule-basic.svg";
        elModeBtn.textContent="advanced";
} else {
        elGameBox.classList.remove("basic");
        elGameBox.classList.add("advanced");
        document.getElementById("logo").src = "/imgs/tipa-logo-advanced.svg";
        elRulesImg.src="imgs/rule-advanced.svg";
        elModeBtn.textContent="basic";
}

function chooseRobot(arr) {
    return arr[Math.trunc(Math.random()*arr.length)];
};  

function getWinner(u,r) {
    const actions = {
    rock:{rock:"tie",scissors:"you win",paper:"you lose",lizard:"you win",spock:"you lose"},
    paper:{paper:"tie",rock:"you win",scissors:"you lose",lizard:"you lose",spock:"you win"},
    scissors:{scissors:"tie",rock:"you lose",paper:"you win",lizard:"you win",spock:"you lose"},
    lizard:{lizard:"tie",rock:"you lose",scissors:"you lose",paper:"you win",spock:"you win"},
    spock:{spock:"tie",rock:"you win",paper:"you lose",lizard:"you lose",scissors:"you win"}};
    return actions[u][r];
};

function swapZone(boolean) {
    if(boolean) {
        elResultBox.classList.remove("flex");
        elResultBox.classList.add("hidden");
        elGameBox.classList.remove("hidden");
        elGameBox.classList.add("flex");
    } else {
        elResultBox.classList.remove("hidden");
        elResultBox.classList.add("flex");
        elGameBox.classList.remove("flex");
        elGameBox.classList.add("hidden");
    }
};

elHands.forEach((btns) => {
    btns.addEventListener("click",(evt)=> {
        /* for result box */
        let score = 0;
        if(!localStorage.getItem("score")){
            elScoreTxt.textContent = "0";
        }
        let user = evt.target.alt;
        let robot = chooseRobot(basicHands);
        elUserImg.src = `imgs/${user}.svg`;
        elRobotImg.src = `imgs/hand-load.svg`
        setTimeout(()=>elRobotImg.src = `imgs/${robot}.svg`,1200)
        let winner = getWinner(user, robot);
        if(winner=="you win"){
            score++
            localStorage.setItem("score",  (Number(localStorage.getItem("score"))+1 || score+1));
        } else {
            localStorage.setItem("score",  (Number(localStorage.getItem("score")) || score));
        }
        setTimeout(()=>{
                elScoreTxt.textContent = localStorage.getItem("score");
        },1200)
        elTryBox.style.opacity=`0`;
        setTimeout(()=>{
            elTryBox.style.opacity=`1`,1200}
        );
        elResultText.textContent = "loading"
        setTimeout(()=>elResultText.textContent = winner,1200);
        swapZone(false);
    });
});

elTryBtn.addEventListener("click",()=>{swapZone(true)});
elModeBtn.addEventListener("click",()=>{changeMode()})
elModalOpenBtn.addEventListener("click",()=>{
    elModal.classList.remove("hidden");
    elModal.classList.add("flex");
})

elModalCloseBtn.addEventListener("click",()=>{
    elModal.classList.remove("flex");
    elModal.classList.add("hidden");
})