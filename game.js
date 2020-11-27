var score=0;
var currQuestion=document.querySelector(".Question h3");
var currScore=document.querySelector(".Score h3");
let questions=[];
fetch("https://opentdb.com/api.php?amount=15&category=18&difficulty=easy&type=multiple")
.then((res)=>{
  return res.json();
})
.then((loadedquestions)=>{
  
  questions=loadedquestions.results.map((loadedQuestion)=>{
    const formattedQuestion={
      question:loadedQuestion.question
    };
    const answerchoice=[...loadedQuestion.incorrect_answers];
    formattedQuestion.answer=loadedQuestion.correct_answer;
    const answerindex=Math.floor(Math.random()*4);
    answerchoice.splice(answerindex-1,0,loadedQuestion.correct_answer);
    answerchoice.forEach((choice,index)=>{
      formattedQuestion["choice"+(index+1)]=choice;
    });
    return formattedQuestion;
  });
 document.querySelector(".loader").classList.add("hidden");
 document.querySelector(".container").classList.remove("hidden");
 handle();

})
.catch((err)=>{
  console.error(err);
});
const n=questions.length;
var choice,index=0;
function generateQuestion(index)
{
    let question=document.querySelector("#question");
     choice=document.querySelectorAll(".option");
    question.innerHTML=questions[index].question;
    choice[0].innerHTML=questions[index].choice1;
    choice[1].innerHTML=questions[index].choice2;
    choice[2].innerHTML=questions[index].choice3;
    choice[3].innerHTML=questions[index].choice4;
}

function handle()
{

  generateQuestion(index);
   choice=document.querySelectorAll(".option");
  for(let i=0;i<=3;i++)
  choice[i].addEventListener("click",handleClick);
  function handleClick()
  {
    const toApply=this.innerText===questions[index].answer?"correct":"incorrect";
    if(this.innerText===questions[index].answer)
    {

     score++;
     currScore.innerText=score;
    }

    this.classList.add(toApply);
    setTimeout(()=>{
      this.classList.remove(toApply);
      if(index+1<questions.length)
      {
        index+=1;
        currQuestion.innerText=`${index+1}/${questions.length}`;
        generateQuestion(index);
      }
      else{
        localStorage.setItem("recentScore",score);
        return window.location.assign("end.html");
      }

},1000);
  }

}
