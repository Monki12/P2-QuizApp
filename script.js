// Dropdown list
let dropdownbtn = document.querySelector("#droptext");
let list = document.querySelector("#list");
let dropicon = document.querySelector("#dropicon");


dropdownbtn.onclick=() =>{
    list.classList.toggle("show");
    dropicon.classList.toggle("show");
};

//voice search and icon animation

let voicebtn= document.querySelector("#micbtn");
let voiceicon= document.querySelector("#mic");
voicebtn.onclick= () => {
    voiceicon.classList.toggle("recording");
};
