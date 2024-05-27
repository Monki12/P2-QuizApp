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

searchbtn.onclick=() =>{
    if(input.value!="")
        {
            console.log(`searching for ${input.value}`);

            if(input.value=="quiz example")
                {
                    window.location.href="index1.html";
                }
        }
    else
    console.log("empty input field");
};
    



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