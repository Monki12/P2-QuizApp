import quizData from "./quizdata.json" with {type:'json'};


const storedCategory = localStorage.getItem('selectedCategory');
let selectedCategory={};
if (storedCategory) {
    selectedCategory = JSON.parse(storedCategory); // Parse JSON back to object
  // Access and display Category content using selectedCategory object

} else {
  console.warn("No selected Category found in local storage");
  // Handle cases where no Category is stored
}

console.log(selectedCategory);
//  IMPORTANT- use to removeselected after whole Category is complete
//localStorage.removeItem('selectedCategory');


function getMatchingQuizzes(quizData, selectedCategory) {
    // Filter the quiz data to include only quizzes with a matching category
    const matchingQuizzes = quizData.filter(quiz => {
      // Use some() to check if any category in the quiz matches
      return quiz.categories.some(category => category.trim() === selectedCategory.trim());
    });
    return matchingQuizzes;
}
  
function createQuizCard(quiz) {
    // Create the quiz card elements
    const quizCard = document.createElement("div");
    quizCard.classList.add("quizCard");
  
    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");
  
    const info = document.createElement("div");
    info.classList.add("info");
  
    const title = document.createElement("h4");
    title.textContent = quiz.name;
  
    const time = document.createElement("p");
    time.id = "time";
    time.textContent = `Time: ${quiz.time}min`;
  
    const numofQ = document.createElement("p");
    numofQ.id = "numofQ";
    numofQ.textContent = `Questions: ${quiz.numofQ}`; // Assuming numofQuestions property
  
    // Structure the elements
    info.appendChild(title);
    info.appendChild(time);
    info.appendChild(numofQ);
  
    backdrop.appendChild(info);
    quizCard.appendChild(backdrop);
  
    return quizCard; // Return the completed quiz card element
  }
  const quizlist=getMatchingQuizzes(quizData,selectedCategory);  
  // Loop through quizzes and create cards
  quizlist.forEach(quiz => {
    const quizCard = createQuizCard(quiz); // Call the function
    const quizContainer = document.querySelector(".tank");
    quizContainer.appendChild(quizCard);
  });

 
 
  document.querySelectorAll(".quizCard").forEach(card => {
    card.addEventListener("click", () => {
      const selectedQuiz = quizlist.find(quiz => quiz.name.trim() == card.querySelector("h4").innerText.trim());
  
      if (selectedQuiz) { // Check if a quiz was found
        localStorage.setItem('selectedQuiz', JSON.stringify(selectedQuiz));
        window.location.href = "index1.html";
      } else {
        // Handle case where no matching quiz is found (optional)
        console.error("No matching quiz found for clicked card.");
      }
    });
  });
  

