const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");
let currentplayer;
let gameGrid;
const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8], 
    [0,4,8],
    [2,4,6],
]
initGame();

function initGame(){
    currentplayer="X",
    gameInfo.innerText=`Current Player - ${currentplayer}`;
    boxes.forEach((box,index)=>{
        boxes[index].innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList=`box box${index+1}`

    })

    
    gameGrid=["","","","","","","","",""];
    newGameBtn.classList.remove("active");
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index);
    })
})

function handleclick(index){
   if(gameGrid[index]===""){
    boxes[index].innerText=currentplayer;
    gameGrid[index]=currentplayer; 
    boxes[index].style.pointerEvents="none"
    //trun
    swapTurn();
    checkGameOver();
   }
}

function swapTurn(){
    if(currentplayer=="X"){
        currentplayer="0"
    }
    else{
        currentplayer="X"
    }
    gameInfo.innerText=`Current Player - ${currentplayer}`;

}

function checkGameOver(){
//    newGameBtn.classList.add("active");
let ans="";
winningPositions.forEach((position)=>{

    if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")&&(gameGrid[position[0]]===gameGrid[position[1]]) &&(gameGrid[position[1]]===gameGrid[position[2]]) ){

        if (gameGrid[position[0]]==="X") 
            ans="X";
        else
            ans="0";

        boxes.forEach((box)=>{
            box.style.pointerEvents="none"
        })   
        
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
})

   if(ans!=""){
        gameInfo.innerText=`Winning Player - ${ans}`;
        newGameBtn.classList.add("active");
   }

   let empty=0;
   boxes.forEach((box)=>{
    if(box!=""){
        empty=empty+1;
    }
   })

   if(empty==9){
    gameInfo.innerText=`Game tried`;
    newGameBtn.classList.add("active");
   }
}


newGameBtn.addEventListener("click",initGame)
