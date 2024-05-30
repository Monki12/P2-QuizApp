
import quizData from "./quizdata.json" with {type:'json'};
console.log(quizData);

//icon button function
document.querySelector(".icon button").addEventListener("click",()=>{
  window.location.href = "index.html";
});

//getting all uniques categories to display in dropdown
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

createCategoryListItems(quizData,document.querySelector(".dropdownlist"));
 


// Dropdown list
let dropdownbtn = document.querySelector("#droptext");
let list = document.querySelector("#list");
let dropicon = document.querySelector("#dropicon");


dropdownbtn.onclick=() =>{
    list.classList.toggle("show");
    dropicon.classList.toggle("show");
};

//adding enter key as click to search
let searchbtn=document.querySelector("#searchicon");
let input=document.querySelector(".search input");
input.addEventListener("keypress",(event)=>{
    if(event.key==="Enter")
        {
        event.preventDefault();
        searchbtn.onclick();
        }
});

searchbtn.onclick = () => {
  if (input.value !== "") {
    document.getElementById("error").style.display = "none";
    console.log(`Searching for (case-insensitive): ${input.value}`);

    const searchTerm = input.value.trim().toLowerCase(); // Trim and convert to lowercase

    const matchingIndex = quizData.findIndex(quiz => {
      const quizNameLower = quiz.name.trim().toLowerCase();

      // Check for category match first
      for (const category of quiz.categories) {
        const categoryLower = category.trim().toLowerCase();
        if (searchTerm === categoryLower) {
          return true; // Stop searching if category matches
        }
      }

      // Check for quiz name match if no category match
      return searchTerm === quizNameLower;
    });

    if (matchingIndex !== -1) {
      const selectedItem = quizData[matchingIndex];

      if (searchTerm === selectedItem.name.trim().toLowerCase()) {
        // Matched quiz name - store quiz and redirect to index1.html
        localStorage.setItem('selectedQuiz', JSON.stringify(selectedItem));
        window.location.href = "index1.html";
      } else {
        // Matched category name - store category and redirect to index3.html
        localStorage.setItem('selectedCategory', JSON.stringify(searchTerm));
        window.location.href = "index3.html";
      }
    } else {
      document.getElementById("error").textContent = "No matching quiz or category found.";
      document.getElementById("error").style.display = "block";
    }
  } else {
    document.getElementById("error").textContent = "Empty input field.";
    document.getElementById("error").style.display = "block";
  }
};

    
document.querySelectorAll(".list-item").forEach(category=>category.addEventListener("click",()=>{
    const text = category.textContent.trim();
    const openingIndex = text.indexOf("("); // Find the opening parenthesis index
    const selectedCategory = openingIndex === -1 ? text : text.substring(0, openingIndex);
    
    localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));
    window.location.href = "index3.html";
}));


//voice search and icon animation

let voicebtn= document.querySelector("#micbtn");
let voiceicon= document.querySelector("#mic");

voicebtn.addEventListener('click',() =>{
    voiceicon.classList.toggle("recording");
    let speech=true;
    const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.intermResults = true;

    recognition.addEventListener('result',e=>{
    const transcript = Array.from(e.results)
    .map(result=>result[0])
    .map(result => result.transcript)

    input.value=transcript;
})

recognition.onspeechend = () => {
    recognition.stop();
    voiceicon.classList.toggle("recording");
  };  

  recognition.onerror = (event) => {
    diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
  };
  

if(speech == true){
    recognition.start();
}

});