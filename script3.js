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

//icon button function
document.querySelector(".icon button").addEventListener("click",()=>{
  window.location.href = "index.html";
});


function getMatchingQuizzes(quizData, selectedCategory) {
    // Filter the quiz data to include only quizzes with a matching category
    const matchingQuizzes = quizData.filter(quiz => {
      // Use some() to check if any category in the quiz matches
      return quiz.categories.some(category => category.trim().toLowerCase() === selectedCategory.trim().toLowerCase());
    });
    return matchingQuizzes;
}

//to create side-category list items
function createCategoryListItems(quizData, ulElement) {
  const categoryCounts = {}; // Object to store category counts

  // Extract categories and count occurrences
  for (const quiz of quizData) {
    for (const category of quiz.categories) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  }

  // Create and append li elements with category and count
  for (const category in categoryCounts) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');

    const categoryLink = document.createElement('a');
    categoryLink.textContent = `${category} (${categoryCounts[category]})`; // Include count
    
    listItem.appendChild(categoryLink);

    ulElement.appendChild(listItem);
  }
}

createCategoryListItems(quizData,document.querySelector(".categories"));

//if list item clicked -> show category
document.querySelectorAll(".list-item").forEach(category=>category.addEventListener("click",()=>{
  const text = category.textContent.trim();
  const openingIndex = text.indexOf("("); // Find the opening parenthesis index
  const selectedCategory = openingIndex === -1 ? text : text.substring(0, openingIndex);
  localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));
  window.location.href = "index3.html";
}));


  //to create quiz card
function createQuizCard(quiz) {
  console.log("creating card");
    // Create the quiz card elements
    const quizCard = document.createElement("div");
    quizCard.classList.add("quizCard");
    quizCard.style.backgroundImage=`url(${quiz.bgimgurl})`;
  
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
console.log(quizlist);
  // Loop through quizzes and create cards
  quizlist.forEach(quiz => {
    const quizCard = createQuizCard(quiz); // Call the function
    const quizContainer = document.querySelector(".tank");
    quizContainer.appendChild(quizCard);
  });

 
 //Selecting Quiz Card
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
  

