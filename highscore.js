const highScores=JSON.parse(localStorage.getItem("HighScore"));
const highScoresList=document.querySelector(".ScoreList");
highScoresList.innerHTML=(highScores.map((score)=>{
  return `<tr><td class="Column"> ${score.name}</td><td class="Column"> ${score.score}</td></tr>`;
})).join("");
console.log(highScoresList);
