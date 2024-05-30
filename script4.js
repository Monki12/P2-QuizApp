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

//creating q-btns
const questionMap = {}; // Stores mapping of question number to its index

function createQuestionButtons(data) {

  function createButtons() {
    const shuffledQuestions = data.Qblocks.slice(); // Copy questions array
    shuffledQuestions.sort(() => Math.random() - 0.5); // Randomly shuffle questions
    console.log(shuffledQuestions);
    console.log(data.Qblocks);
    for (let i = 0; i < shuffledQuestions.length; i++) {
      const question = shuffledQuestions[i];
      const questionNumber = question.questionNumber || i + 1; // Use provided question number or assign a sequential number

      const button = document.createElement('button');
      button.classList.add('q-btn');
      button.textContent = questionNumber;

      questionMap[questionNumber] = i; // Store mapping

      const panel = document.getElementById(`panel${question.level}`);
      panel.appendChild(button);
    }
  }

  createButtons();
}






//calling function to create
createQuestionButtons(selectedQuiz); 
console.log(questionMap);

//functionality of q- btns and displaying data
function displayQuestion(questionMap, data) {
  const questionButtons = document.querySelectorAll('.q-btn'); // Select all q-btn buttons

  questionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const questionNumber = parseInt(button.textContent); // Get question number from button text
      const questionIndex = questionMap[questionNumber]; // Look up index using questionMap
      console.log(questionNumber);
      if (questionIndex !== undefined) {
        const question = data.Qblocks[questionIndex]; // Access question data using index
        const questionElement = document.getElementById('Question');
        const questionNoElement = document.getElementById('Question-no');

        questionElement.textContent = question.question; // Update question text
        questionNoElement.textContent = `Question No. : ${questionNumber}`; // Update question number

        // Update options (assuming option elements have IDs optionA, optionB, etc.)
        const options = document.querySelectorAll('.option');
        for (let i = 0; i < options.length; i++) {
          const optionElement = options[i].querySelector('p');
          optionElement.textContent = question.options[i]; // Update option text
        }
      }
    });
  });

  const initialQuestion = data.Qblocks[questionMap[1]];
  const questionElement = document.getElementById('Question');
  const questionNoElement = document.getElementById('Question-no');

  questionElement.textContent = initialQuestion.question;
  questionNoElement.textContent = `Question No. : 1`;

  // Update options for initial question
  const options = document.querySelectorAll('.option');
  for (let i = 0; i < options.length; i++) {
    const optionElement = options[i].querySelector('p');
    optionElement.textContent = initialQuestion.options[i];
  }
}

//calling function to display
displayQuestion(questionMap, selectedQuiz); 


//setting panel and tab
const tabs = document.querySelectorAll('.tabs button');
const panels = document.querySelectorAll('.panel');

// Function to show/hide panels and update tab color
function showPanel(panelId, clickedTab) {
  panels.forEach(panel => panel.style.display = 'none'); // Hide all panels
  document.getElementById(panelId).style.display = 'block'; // Show the selected panel

  // Update tab background color (avoiding extra class)
  tabs.forEach(tab => tab.style.backgroundColor = '#f0f0f0'); // Reset all backgrounds
  clickedTab.style.backgroundColor = getComputedStyle(document.getElementById(panelId)).backgroundColor; // Get panel background color
}

// Add click event listener to each tab button
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const panelId = tab.id.replace('tab', 'panel'); // Extract panel ID from tab ID
    showPanel(panelId, tab);
  });
});

// Optional: Initial panel display (uncomment and set default panel ID if needed)
const defaultPanelId = 'panel1'; // Replace with your default panel ID
showPanel(defaultPanelId,document.querySelector("#tab1"));



