const userName=document.querySelector(".input");
const save=document.querySelector(".Save");
const score=localStorage.getItem("recentScore");
document.querySelector(".finalScore").innerText=score;
const highScore=JSON.parse(localStorage.getItem("HighScore")) || [];
userName.addEventListener("keyup",()=>{
  save.disabled=!userName.value;
});
save.addEventListener("click",()=>{

const Score={
score:score,
name:userName.value
};
highScore.push(Score);
highScore.sort((a,b)=>{
  return b.score-a.score;
});
highScore.splice(5);
localStorage.setItem("HighScore",JSON.stringify(highScore));
window.location.assign("index.html");
});
