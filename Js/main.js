let btn = document.querySelector(".starting div button");
let input = document.querySelector(".starting div input");
let starting = document.querySelector(".starting");
let starting1Div = document.querySelector(".starting div");
let spanA = document.querySelector(".starting div label");
let spanB = document.querySelector(".spanB");
let spanC = document.querySelector(".spanC .rong");
let blocks = document.querySelectorAll(".block > div");
let blocksP = document.querySelectorAll(".block");
let blocksGP = document.querySelector(".cards");
starting1Div.classList.add("slowUp");

let matched = 0,starting2Div;
input.onfocus = function (){
    spanA.classList.add("Slowhide");
}
input.onblur = function (){
    if(input.value.trim() === ""){
        spanA.classList.remove("Slowhide");
    }
}
spanA.addEventListener("click",(e)=>{
    e.target.classList.add("Slowhide");
    input.focus();
})
btn.addEventListener("click",btnS);
function btnS() {
    if(input.value.trim() !== ""){
        spanA.innerHTML = input.value;
    } else {
        spanA.innerHTML = "User";
    }
    input.value = "";
    sounder("StartAudio");
    spanA.classList.remove("Slowhide");
    spanA.classList.add("up");
    let labl = document.createElement("label");
    labl.innerHTML = spanA.innerHTML;
    labl.classList.add("mainLabel");
    starting1Div.classList.remove("slowUp");
    tictac();
    setTimeout(function(){
        document.querySelector("body").prepend(labl);
        starting.classList.add("hide");
        sounder("clockAudio");
    },600)
}
let arrOfClicked = [];
blocks.forEach(function(block){
    block.addEventListener("click",function() {
        sounder("clickAudio");
        block.classList.add("rotate");
        block.style.pointerEvents = "none";
        arrOfClicked.push(block);
        if(arrOfClicked.length === 2){
            blocksGP.style.pointerEvents = "none";
            if(arrOfClicked[0].dataset.tech === arrOfClicked[1].dataset.tech){
                arrOfClicked[0].classList.add("matched");
                arrOfClicked[1].classList.add("matched");
                matched += 2;
                if(matched!==16){
                    sounder("SuccessAudio");
                } else { 
                    sounder("gameOverAudio");
                }
            } else {
                sounder("failAudio");
                spanC.innerHTML = parseInt(spanC.innerHTML)+1;
                if(parseInt(spanC.innerHTML)===10){
                    setTimeout(() => {
                        sounder("gameOverAudio");
                    }, 388);
                }
            }
        } 
        setTimeout(() => {
            block.classList.remove("rotate");
            block.style.pointerEvents = "visible";
            if(arrOfClicked.length === 2) blocksGP.style.pointerEvents = "visible";
            arrOfClicked = [];
        }, 1100);
    });
});
let arr = Array.from(Array(16).keys()).sort(()=>Math.random()-.4);
console.log(arr);
for(let i = 0 ; i < 16 ; i++){
    blocksP[i].style.order = arr[i];
}
function tictac() {
    let sc =1;
    let mn = 0;
    let timer = setInterval(() => {
        sounderPause("clockAudio");
        spanB.innerHTML = `0${mn}:${sc<10?`0${sc}`:sc}`;
        sc++;
        if(sc===60){
            mn++;
            sc=0;
        };
        if(parseInt(spanC.innerHTML)===10 || spanB.innerHTML === '02:00' || matched === 16){
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}
function endGame() {
    document.querySelector("body").innerHTML +=`
    <div class="starting2" style="position:absolute;z-index=5">
        <div>
            <h2>Game Over</h2>
            <h4>You finished it in ${spanB.innerHTML}</h4>
            <button id="endBtn">Play Again</button>
        </div>
    </div>
    `;
    document.querySelector("#endBtn").onclick=()=>window.location.reload();
    starting2Div = document.querySelector(".starting2 div");
    setTimeout(() => {
        starting2Div.classList.add("slowUp");
    }, 1);
}

function loader(theclass){
    soundV = document.querySelector(`.${theclass}`);
    soundV.load();
}
function sounder(theclass){
    soundV = document.querySelector(`.${theclass}`);
    soundV.play();
}
function sounderPause(theclass){
    soundV = document.querySelector(`.${theclass}`);
    soundV.pause();
}
loader("gameOverAudio");
loader("StartAudio");
loader("failAudio");
loader("SuccessAudio");
