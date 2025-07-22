const playBoard=document.querySelector(".play-board");
const Score=document.querySelector(".score");
const HighScore=document.querySelector(".HighScore");
let foodX ,foodY ;
let Gameover=false;
let snakeX=5,snakeY=10;
let velocityX=0 ,velocityY=0;
let snakebody=[];
let score=0;
let Highscore=localStorage.getItem("") ||0;
const changeFoodPosition = () =>
{
    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;

}
const handleGameOver = () =>
{
    clearInterval(gameInterval);
    alert("The game is over! press ok to restart....");
    location.reload();
}
const changeDirection = (e) =>{
    if(e.key === "ArrowUp" && velocityY!=1)
    {
        velocityX = 0;
        velocityY = -1;

    }
    else if(e.key === "ArrowDown" &&  velocityY!=-1)
    {
        velocityX = 0;
        velocityY = 1;

    }
    else if(e.key === "ArrowLeft" &&  velocityX!=1)
        {
            velocityX = -1;
            velocityY = 0;
    
    }
   else if(e.key === "ArrowRight" &&  velocityX!=-1)
        {
            velocityX = 1;
            velocityY = 0;
    
    }
   
}
const initGame = () => 
    {
        if(Gameover)
        {
            return handleGameOver();
        }
      let htmlMarkup= `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  

      snakeX += velocityX;
      snakeY += velocityY;
      if(snakeX<=0 || snakeX>30 ||snakeY<=0 || snakeY>30)
      {
        Gameover =true;
      }
      if(snakeX === foodX && snakeY=== foodY)
        {
           changeFoodPosition();
           snakebody.push([foodX,foodY]);
           console.log(snakebody);
           score++;
           Score.innerText=`score ${score}`
           if(Highscore>score)
           {
            Highscore=score;
           }  
           localStorage.setItem("HighScore",Highscore);
        }
        for(let i=snakebody.length-1;i>0;i--)
        {
            snakebody[i]=snakebody[i-1];
        }
     snakebody[0]=[snakeX,snakeY];
     for(i=1;i<snakebody.length;i++)
     {
        if( snakebody[0][1] === snakebody[i][1] && snakebody[0][0]===snakebody[i][0])
            {
                Gameover=true;
            }
     }
     for(let i=0;i<snakebody.length;i++)
     {
      htmlMarkup += `<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
    
    }
      playBoard.innerHTML = htmlMarkup;
  }
changeFoodPosition();
gameInterval=setInterval(initGame,125);

document.addEventListener("keydown", changeDirection);
