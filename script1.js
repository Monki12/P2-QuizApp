//importing quiz1
//import { quiz1 } from "./script2";

/*
 string question , string arr[4] options, int correct-right option index,level,time
 */
//class QAblock
class QAblock{
    constructor(question,options,ans,level){
        this.question=question;
        this.options=options;
        this.ans=ans;
        this.level=level;
    }
}

//class quiz
/* 
int- number of questions , string array- categories , obj arr -question block objects-easy,med,tough , int time, String name, string arr - phrase

 */
class quiz{
    constructor(name,time,numofQ,categories,phrase,Qblocks){
        this.name=name;
        this.time=time;
        this.numofQ=numofQ;
        this.categories=categories;
        this.phrase=phrase;
        this.Qblocks=Qblocks;
    }


}
//quizclass ends

//declaring example question blocks
const Qb1= new QAblock(
    "Which is the closest start to earth?"
    ["Saturn","Sun","Pluto","Pole-star"],
    1,
    1
);

const Qb2= new QAblock(
    "Astronomers believe they understand the life cycle of most stars, but there are still mysteries surrounding the very biggest ones.  We know the largest observed star, UY Scuti, is a red supergiant, but how exactly do these stars become so massive, and why don't they seem to explode in supernovas like many other large stars?"
    ["UY Scuti is a black hole and black holes don't explode.","UY Scuti is too cold to undergo nuclear fusion.","UY Scuti is shedding mass so rapidly it won't accumulate enough iron for a supernova.","UY Scuti is a stable neutron star and neutron stars don't explode."],
    2,
    3
);

//declaring  object quiz1
const quiz1=new quiz(
    "Starry Night",
    30,
    15,
    ["Space","Science","Stars","Nature"],
    "How much do you observe our fascinating sky?",
    [Qb1,Qb2,Qb1,Qb2,Qb1,Qb1,Qb2,Qb1,Qb2,Qb1,Qb1,Qb2,Qb1,Qb2,Qb1]
);



console.log(quiz1);
//displaying data
document.querySelector(".row1-name h1").innerHTML=quiz1.name;

for(let i=0;i<quiz1.categories.length;i++)
    {
        let item=document.querySelector(".categories").appendChild(document.createElement("li"));
        item.className="category";
        item.href="#";
        item.textContent=quiz1.categories[i];
    }

    document.querySelector("#Time").innerHTML="Time : "+quiz1.time+"mins";
    document.querySelector("#noQ").innerHTML="Number of Questions : "+quiz1.numofQ;
    document.querySelector(".row4-start p").innerHTML=quiz1.phrase;    

//back button function
document.querySelector("#back-btn").onclick=() =>{
    window.history.go(-1);
};

document.querySelector("#start-btn").onclick=() =>{
    console.log("Starting quiz and timer");
    //set windowd=s location to question link
    window.location.href="index2.html";
};

