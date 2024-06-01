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
localStorage.removeItem('selectedCategory');


//setting height of section2
let sec1h=document.querySelector(".section1").offsetHeight;
document.querySelector(".section2").style.height=((0.9*window.innerHeight)-sec1h-2)+"px";

//setting height for col2 rows
let r1h=document.querySelector(".row1").offsetHeight;
let r2=document.querySelector(".row2");
let r3=document.querySelector(".row3");
let col1h=document.querySelector(".col1").offsetHeight;
r2.style.top=(r1h/col1h*100)+"%";
r2.style.height=100-(r1h/col1h*100)-10+"%";

let th=document.querySelector(".tabs").offsetHeight;
document.querySelectorAll(".panel").forEach(panel => {
  panel.style.height=100-(th/col1h*100)-10+"%";
  panel.style.maxHeight=100-(th/col1h*100)-10+"%";
  panel.style.top=(th/col1h*100)+"%";
});

//
/*
THought process
creating q-btns
To create map of shuffled question by level to index in qblocks array
1. Get selected quiz object- SQz
2. SQz.Qblocks[index] is a question set , so we have to create [displayQNo.- index in Qblocks] map
3. get all question indexes of same Level questions in an array
4. Shuffle the array.Map the Shuffled array index to a display No.(which is in serial order, so that q1,q2 are displayed sequentially)
5. store it in map.
6. repeat for all the 3 levels

To Create panel for each tab
1. get data and map
2. go serially, check Qblocks[map[0]].level 
3. create element of type: <button class="q-btn">1</button> inside <div class="panel" id="panel1" >  so that questions are displayed properly
eg.
<div class="panel" id="panel1" > 
  <button class="q-btn">1</button>
  <button class="q-btn">2</button>
  <button class="q-btn">3</button>
</div>

*/

 let currentQuestion="1-1";
const questionMap = {}; // Stores mapping of question number (within level) to its index in SQz.Qblocks
let ansMap={};//saves ans when returning to same question
let responseMap={};//save whether question was 1-right/0-wrong/2review and not saved/3-seenunattempted/null-unseen
let timeMap={};//saves time taken per question

const options = document.querySelectorAll(".option");
let selectedOption = null; // Variable to store the currently selected option element

//setting panel and tab
const tabs = document.querySelectorAll('.tabs button');
const panels = document.querySelectorAll('.panel');
const defaultPanelId = 'panel1'; 


function createQuestionButtons(selectedQuiz) {


  // Loop through all levels in the selected quiz
 // Loop through all levels in the selected quiz
 for (let level = 1; level <= 3; level++) {
  const levelQuestions = selectedQuiz.Qblocks.filter(question => question.level === level); // Filter questions for this level

  // Shuffle questions using sort with custom comparison
  levelQuestions.sort(() => Math.random() - 0.5);

  // Create mapping for this level's questions
  for (let i = 0; i < levelQuestions.length; i++) {
    const question = levelQuestions[i];
    const questionNumber = i + 1; // Display question number within this level (starts from 1)
    questionMap[`${level}-${questionNumber}`] = question; // Store original question with level-question number as key
  }

    // select panel for this level
    const panel = document.querySelector(`#panel${level}`);

    // Create q-btns for this level
    for (let i = 0; i <levelQuestions.length; i++) {
      const questionNumber = i + 1;
      const button = document.createElement('button');
      button.classList.add('q-btn');
      button.id=`${level}-${questionNumber}`;
      button.textContent = questionNumber;

      panel.appendChild(button);
    }

  }
}
createQuestionButtons(selectedQuiz);

// Helper function to shuffle an array for creating q-btns
function shuffleArray(array) {
  const shuffledArray = array.slice(); // Copy array to avoid modifying original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Function to show/hide panels and update tab color
function showPanel(panelId, clickedTab) {
  panels.forEach(panel => panel.style.display = 'none'); // Hide all panels
  document.getElementById(panelId).style.display = 'block'; // Show the selected panel

  // Update tab background color (avoiding extra class)
  tabs.forEach(tab => tab.style.backgroundColor = '#f0f0f0'); // Reset all backgrounds
  clickedTab.style.backgroundColor = getComputedStyle(document.getElementById(panelId)).backgroundColor; // Get panel background color
}
showPanel(defaultPanelId,document.querySelector("#tab1"));

// Add click event listener to each tab button
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const panelId = tab.id.replace('tab', 'panel'); // Extract panel ID from tab ID
    showPanel(panelId, tab);
  });
});

//Add click event listener to each q-btn
function displayQuizData(questionMap) {
  const questionNoElement = document.getElementById('Question-no');
  const questionElement = document.getElementById('Question');
  const optionAElement = document.getElementById('1').querySelector('p'); // Get option A content element
  const optionBElement = document.getElementById('2').querySelector('p'); // Get option B content element
  const optionCElement = document.getElementById('3').querySelector('p'); // Get option C content element
  const optionDElement = document.getElementById('4').querySelector('p'); // Get option D content element

  
  //initial question display
  responseMap["1-1"]=4;
  const intialQuestion=questionMap["1-1"];
  questionElement.textContent = intialQuestion.question;
        optionAElement.textContent = intialQuestion.options[0];
        optionBElement.textContent = intialQuestion.options[1];
        optionCElement.textContent = intialQuestion.options[2];
        optionDElement.textContent = intialQuestion.options[3];

  // Add a click event listener to all q-btns (assuming a class for them)
  const qBtns = document.querySelectorAll('.q-btn');
  qBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stopQwatch(currentQuestion);
      
      const clickedQuestionNumber = parseInt(btn.textContent); // Get clicked question number
      const panel = btn.closest('.panel'); // Get the closest panel element

      // Extract level from panel ID (assuming format like "panel1")
      const level = parseInt(panel.id.slice(5)); // Assuming ID starts with "panel"

      // Construct question key based on level and question number from displayed format
      const questionKey = `${level}-${clickedQuestionNumber}`;
      currentQuestion=questionKey;
      startQwatch();
      responseMap[currentQuestion]=3;
      // Check if question exists in the map based on the constructed key
      if (questionMap[questionKey]) {
        const questionObject = questionMap[questionKey];
        let color=getComputedStyle(document.getElementById(`${currentQuestion}`)).backgroundColor;
        if(color!== "rgb(64, 201, 162)" && color!== "rgb(173, 52, 62)"&& color!== "rgb(157, 93, 235)")
          document.getElementById(`${currentQuestion}`).style.backgroundColor="#858383";
        if(selectedOption!=null)
          ansMap[`${currentQuestion}`]=selectedOption.querySelector("button").id ;
        // Update question content
        questionNoElement.textContent = `Question No. : ${clickedQuestionNumber}`;
        questionElement.textContent = questionObject.question;
        optionAElement.textContent = questionObject.options[0];
        optionBElement.textContent = questionObject.options[1];
        optionCElement.textContent = questionObject.options[2];
        optionDElement.textContent = questionObject.options[3];
      } else {
        console.error(`Question with number ${clickedQuestionNumber} not found in the map!`);
      }
      displaySelectedOption();
    });
  });
}
displayQuizData(questionMap);


//options functionality

function displaySelectedOption(clickedOption) {
  // Reset background color of all options
  options.forEach(option => option.querySelector("button").style.backgroundColor = "#B6C8A9");

  // Highlight the clicked option
  if(clickedOption)
  clickedOption.querySelector("button").style.backgroundColor = "#badac4";

  // Update selectedOption variable (only if different)
  if (selectedOption !== clickedOption) {
    selectedOption = clickedOption;
  }
 // console.log(selectedOption);
}

options.forEach(option => {
  option.addEventListener('click', () => {
    displaySelectedOption(option);
  });
});

//buttons funtionality

//save button
function handleSaveButtonClick() {
  const saveButton = document.querySelector("#save-btn");
  saveButton.addEventListener("click", () => {
    let selectedOptionIndex=null;
    if (!selectedOption) {
      // Handle case where no option is selected (optional)
      // if(ansMap[`${currentQuestion}`])
      //   {
      //     selectedOptionIndex = parseInt(ansMap[`${currentQuestion}`])-1;
      //   }
      //   else{
          console.log("Please select an option before saving.");
          return; // Exit the function if no option is selected
        //}
    }
    //if(!ansMap[`${currentQuestion}`]){
      selectedOptionIndex = parseInt(selectedOption.querySelector("button").id)-1; // Assuming option IDs end with a number (e.g., option1, option2)
    //}
    const correctAnswerIndex = questionMap[currentQuestion].ans; // Get correct answer index from question map
    // Update background colors based on selection
    if (selectedOptionIndex == correctAnswerIndex) {
      responseMap[currentQuestion]=1;
      document.getElementById(`${currentQuestion}`).style.backgroundColor="#40c9a2";
      selectedOption.querySelector("button").style.backgroundColor = "#40c9a2"; // #40c9a2 for correct answer (assuming current highlight color)
    } else {
      responseMap[currentQuestion]=0;
      document.getElementById(`${currentQuestion}`).style.backgroundColor="#AD343E";
      selectedOption.querySelector("button").style.backgroundColor = "#AD343E"; // AD343E for incorrect answer
      options.forEach(option => {
        if (option.querySelector("button").id === `${correctAnswerIndex + 1}`) { // Assuming option IDs follow a pattern (option1, option2, ...)
          option.querySelector("button").style.backgroundColor = "#40c9a2"; // #40c9a2 for correct answer
        }
      });
    }
  });
}
handleSaveButtonClick();

//mark for review button
function handleReviewButtonClick(){
  const reviewButton = document.querySelector("#review-btn");
  reviewButton.addEventListener("click",()=>{
    let color=getComputedStyle(document.getElementById(`${currentQuestion}`)).backgroundColor;
    if(color!== "rgb(64, 201, 162)" && color!== "rgb(173, 52, 62)")
      {
        document.getElementById(`${currentQuestion}`).style.backgroundColor="#9d5deb";
        responseMap[currentQuestion]=2;
      }
    if(selectedOption!=null)
      ansMap[`${currentQuestion}`]=selectedOption.querySelector("button").id ;
    
  });
}
handleReviewButtonClick();

//Next button
function handleNextButtonClick(){
  const nextButton =document.querySelector("#next-btn");
  nextButton.addEventListener("click",() =>{
    let color=getComputedStyle(document.getElementById(`${currentQuestion}`)).backgroundColor;
    if(color!== "rgb(64, 201, 162)" && color!== "rgb(173, 52, 62)"&& color!== "rgb(157, 93, 235)")
      document.getElementById(`${currentQuestion}`).style.backgroundColor="#858383";
    if(selectedOption!=null)
      ansMap[`${currentQuestion}`]=selectedOption.querySelector("button").id ;//go to the next question in question map and update currentQuestion
    gotonextquestion(currentQuestion);
  });
}
handleNextButtonClick();

//go to next question
function gotonextquestion(currentQuestion){
  stopQwatch(currentQuestion);
  let level=currentQuestion.slice(0,1);
  let questionnumber=currentQuestion.slice(2);
  let temp=parseInt(questionnumber)+1;
  if (questionMap[`${level}-${temp}`]) {
    questionnumber++;
  } else if (level < 3) {  // Combined check
    questionnumber = 1;
    level++;
  } else if (level == 3) {
    console.log("This is the last question.");
  }
  currentQuestion=`${level}-${questionnumber}`;
  startQwatch();
 
  //currentQuestion=currentQuestion;
  document.getElementById(`${currentQuestion}`).click();
  const panel =document.getElementById(`${currentQuestion}`).closest(".panel");
  const tabId = panel.id.replace('panel','tab');
  // Reset background color of all options
  options.forEach(option => option.querySelector("button").style.backgroundColor = "#B6C8A9");
   //changes acc. selected tab
   if(ansMap[`${currentQuestion}`])
    {
      console.log("this is getting executed");
      document.getElementById(ansMap[`${currentQuestion}`]).style.backgroundColor = "#badac4";
    }
  document.getElementById(`${tabId}`).click();
  
}

//calc btn
document.getElementById("calc-btn").addEventListener('click',()=>{
  console.log("clicked");
 document.querySelector("#calc").classList.toggle("show");
});

//submit button
document.getElementById("submit-btn").addEventListener('click',()=>{
  let submit=window.confirm("Are you sure you want to submit?");
  if(submit)
    {
      stopQwatch(currentQuestion);
      watchStop();
      console.log(responseMap);
      console.log(timeMap);
      console.log(ansMap);
      localStorage.setItem('selectedQuiz', JSON.stringify(selectedQuiz));
      window.location.href="index5.html";
   }
  
});

//exit button
document.getElementById("exit-btn").addEventListener('click',()=>{
  let exit=window.confirm("Your progress will not be saved.\nDo you want to exit?");
  if(exit)
    {
      stopQwatch(currentQuestion);
      watchStop();
      window.history.go(-1);
    }
});



//stopwatch per question
let s =0;
let qtimer=null;

function questionStopwatch()
{
  s++;
}

function startQwatch(){
  if(qtimer!=null){
    clearInterval(qtimer);
  }
  qtimer=setInterval(questionStopwatch,1000);
}
startQwatch();
function stopQwatch(currentQuestion){
  clearInterval(qtimer);
  if(timeMap[currentQuestion])
    timeMap[currentQuestion]+=s;
  else
  timeMap[currentQuestion]=s;
  s=0;
}

//stopwatch function for entire quiz
let [sec,min,hrs]=[59,selectedQuiz.time-1,0];
let displaytime = document.querySelector(".section1 p");
let timer=null;
function stopwatch(){
  sec--;
  if(sec==0)
    {
      sec=59;
      min--;
      if(min==0)
        {
          min=59;
          hr--;
        }
    }
    displaytime.innerHTML=`${hrs}:${min}:${sec}`;
}

function watchStart(){
  if (timer!==null)
    {
      clearInterval(timer);
    }
  timer=setInterval(stopwatch,1000);
}
watchStart();
function watchStop(){
  clearInterval(timer);
}

export{
  responseMap,timeMap
};