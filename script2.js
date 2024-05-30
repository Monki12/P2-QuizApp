
/**
 * sample data used
 * height of divs
 * displaying right data
 * button functions
 * export
 */

/*
 string question , string arr[4] options, int correct-right option index,level,time
 */
//class QAblock
class QAblock{
    constructor(question,options,ans,level,selected){
        this.question=question;
        this.options=options;
        this.ans=ans;
        this.level=level;
        this.selected=selected;
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
    ["Space","Science","Stars"],
    "How much do you observe our fascinating sky?",
    [Qb1,Qb2,Qb1,Qb2,Qb1,Qb1,Qb2,Qb1,Qb2,Qb1,Qb1,Qb2,Qb1,Qb2,Qb1]
);



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
let pnl=document.querySelector(".panel");
pnl.style.height=100-(th/col1h*100)-10+"%";
pnl.style.top=(th/col1h*100)+"%";


//*************displaying data***************
let Qno=1;
document.querySelector("#Question-no").innerHTML="Question No. : "+Qno;


//icon button function
document.querySelector(".icon button").addEventListener("click",()=>{
    window.location.href = "index.html";
  });


//buttons css and functions
let options=document.querySelectorAll(".option button");
options.forEach(option =>{
    option.addEventListener("click",()=>{
        [...options].map(prev => prev.style.cssText="background: #B6C8A9");
        option.style.cssText="background: #C8EAD3";
        //save selected option
    })
})

//exporting sample quiz
//export{quiz1};
//!!!!!module.exports = quiz1