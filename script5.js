//getting reference to selected quiz
const storedQuiz = localStorage.getItem('selectedQuiz');
let selectedQuiz={};
if (storedQuiz) {
    selectedQuiz = JSON.parse(storedQuiz); // Parse JSON back to object
  // Access and display quiz content using selectedQuiz object

} else {
  console.warn("No selected quiz found in local storage");
  // Handle cases where no quiz is stored
}
console.log(selectedQuiz);
import { responseMap,timeMap } from "./script4"; 

function averagetime()
{
    let sum=null;
    for(time in timeMap)
        {
            time+=sum;
        }
    return sum/timeMap.length;
}

let count=[];
responseMap.forEach(num => {
    count[num]++;
});

document.querySelector("#time").innerHTML="Time : "+selectedQuiz.time+"mins";
document.querySelector("#noQ").innerHTML="Number of Questions : "+selectedQuiz.numofQ;
document.querySelector("#quiz-name").innerHTML=selectedQuiz.name;    









localStorage.removeItem('selectedQuiz');
