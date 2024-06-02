//icon button
document.querySelector(".icon button").addEventListener("click",()=>{
    window.location.href = "index.html";
  });

//getting selected Quiz and maps
const storedQuiz = localStorage.getItem('selectedQuiz');
let selectedQuiz ={};
let responseMap={};
let timeMap={};
if (storedQuiz) {
    selectedQuiz = JSON.parse(storedQuiz); // Parse JSON back to object
    responseMap = JSON.parse(localStorage.getItem('responseMap'));
    timeMap = JSON.parse(localStorage.getItem('timeMap'));
  // Access and display quiz content using selectedQuiz object

} else {
  console.warn("No selected quiz found in local storage");
  // Handle cases where no quiz is stored
}
//localStorage.removeItem('selectedQuiz');


//avg time calc
function avgTime() {
    const totalTime = Object.values(timeMap).reduce((sum, time) => sum + time, 0);
    const averageTime = totalTime / Object.keys(timeMap).length;
  
    const formattedTime = averageTime >= 60
      ? `${(averageTime / 60).toFixed(1)}min ${(averageTime % 60).toFixed(1)}secs`
      : `${averageTime.toFixed(1)}secs`;
  
    console.log(formattedTime);
    return formattedTime;
  }
  

//%questions solved
function percentSolved() {
    const numAnsweredQuestions = Object.keys(responseMap).length;
    const totalQuestions = parseFloat(selectedQuiz.numofQ);
    if (totalQuestions === 0) {
      throw new Error("Cannot calculate percentage: total questions is zero");
    }
  
    const percentage = Math.round((numAnsweredQuestions / totalQuestions) * 100);
   
    return percentage;
  }
//function score
function scoreCalc(){ 
  let count = 0;

  // Iterate through the values in responseMap
  for (const value of Object.values(responseMap)) {
    // Check if the value is strictly equal to 1 (not just truthy)
    if (value === 1) {
      count++;
    }
  }

  return count;
}
 
//displaying data
document.getElementById("quiz-name").innerText=selectedQuiz.name;
document.querySelector("#time").innerText="Time : "+selectedQuiz.time+"mins";
document.querySelector("#noQ").innerText="Number of Questions : "+selectedQuiz.numofQ;
document.querySelector("#score").innerText=scoreCalc()+"/"+selectedQuiz.numofQ;
document.querySelector("#avg-time").innerHTML="Average time per question : "+avgTime();
document.querySelector("#pf1").innerHTML=percentSolved()+"%";
document.querySelector("#pf1").computedStyleMap.width=percentSolved+"%";
//progress bar;
let i=0;
function move() {
    if(i==0)
        {
            i=1;
            let element=document.querySelector("#pf1");
            let width=10;
            let limit=percentSolved();
            let id=setInterval(frame,10);
            function frame(){
                
                if(width>=limit){

                    clearInterval(id);
                    i=0;
                }
                else{
                    width++;
                    element.style.width = width+"%";
                    element.innerHTML = width  + "%";

                }
            }
        }
}

  //Progress Bar
  move();

//button functions
document.getElementById("home-btn").addEventListener('click',()=>{
    window.location.href="index.html";
    });
    
    document.getElementById("analysis-btn").addEventListener('click',()=>{
       
        window.location.href="#";
    });
    