'use strict';
//list that holds all of the cards
let symbols=['linkedin','android','apple','chrome','codepen','git','slack','github',];

let symbolMore=['hand-o-up','hand-o-down','hourglass-1','hourglass-3','coffee','certificate','bug','database']

let symbolsE=['twitter','twitter','youtube','youtube'];

let symbolsM = [...symbols,...symbols];

let symbolsH=[...symbolsE,...symbolsM,...symbolMore,...symbolMore];

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

let starCount=0;//total stars earned

let timerRunning = 0;

let intervalCounter = "";

let secs = 0;

let mins = "0" + 0;

let matches=0;//total matches found

let moves=0;//total moves made by the player

let flag=0;//flag for getting the level that has been chosed

let opened=[];//hold card that is open

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;

   while (currentIndex !== 0) {
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
   }

   return array;
}


//this is the function is called when clicked on start game button to show the available levels
function level() {
 //hide the elements having class as front
 let front= document.getElementsByClassName("front");
 for(var i = 0; i < front.length; i++){
       front[i].style.display = "none";
   }
 let head=document.getElementsByTagName("h1");
 head[0].innerText="Pick the level";
 //show the elements having class as level
 let level= document.getElementsByClassName("level");
 for(var i = 0; i < level.length; i++){
       level[i].style.display = "block";
   }
}


//create grid
function createGrid(level) {

 let head=document.getElementsByTagName("h1");
 head[0].innerText="Memory Game";

 // show the scroll panel
 let scorePanel=document.querySelector(".score-panel");
 scorePanel.style.display="block";

//hide the elements having class as level
 let levelBtn= document.getElementsByClassName("level");
 for(var i = 0; i < levelBtn.length; i++){
       levelBtn[i].style.display = "none";
 }

 //create a fragment to which the ul will be attached
 const divFrag = document.createDocumentFragment();

 //create an element ul which is to be added to the fragment
 let game=document.createElement("ul");// create a ul element
 game.setAttribute("class","deck");
 game.setAttribute("id","deck-game");



 if(level==="easy"){

   let cards = shuffle(symbolsE);
   flag=1;
   for (let j = 0; j < cards.length; j++) {
     let g =document.createElement("li");
     g.setAttribute("id","uli"+j);
     g.setAttribute("class","cardE card show open");
     g.innerHTML+='<i class="fa fa-'+cards[j]+' "></i>';
     game.appendChild(g);
   }
 }
 else if (level==="medium") {

   let cards = shuffle(symbolsM);
   flag=2;
   for (let j = 0; j < cards.length; j++) {
     let g =document.createElement("li");
     g.setAttribute("id","uli"+j);
     g.setAttribute("class","cardM card show open");
     g.innerHTML+='<i class="fa fa-'+cards[j]+' "></i>';
     game.appendChild(g);
   }
 }
 else {

   let cards = shuffle(symbolsH);
   flag=3;
   for (let j = 0; j < cards.length; j++) {
     let g =document.createElement("li");
     g.setAttribute("id","uli"+j);
     g.setAttribute("class","cardH card show open");
     g.innerHTML+='<i class="fa fa-'+cards[j]+'"></i>';
     game.appendChild(g);
   }
 }
 //Event click listener added
 game.addEventListener('click', check,false);
 divFrag.appendChild(game);
 //attach the fragment to the body
 document.getElementsByClassName("container")[0].appendChild(divFrag);

 let eli=document.getElementsByClassName("card");
 if(eli.length<4){
   setTimeout(function () {
     for(let i=0;i<eli.length;i++)
     {
       eli[i].classList.remove("open");
       eli[i].classList.remove("show");
     }
   },1000);
 }
 else if (eli.length<16) {
   setTimeout(function () {
     for(let i=0;i<eli.length;i++)
     {
       eli[i].classList.remove("open");
       eli[i].classList.remove("show");
     }
   },2000);
 }else{
   setTimeout(function () {
     for(let i=0;i<eli.length;i++)
     {
       eli[i].classList.remove("open");
       eli[i].classList.remove("show");
     }
   },5000);
 }
}

//get event target
function getEventTarget(e) {
   e = e || window.event;
   return e.target || e.srcElement;
}


//check which element is clicked
function  check(event) {
 event.preventDefault();
if(document.querySelectorAll('.nomatch').length==2){
  return ;
}
if(event.target.nodeName ==="LI") {
 //cardClickCount++;
 if(timerRunning==0) {
   timerRunning++;
   intervalCounter = setInterval(function() {
     timer(); // timer function called
   }, 1000);
 }


 let eli=document.getElementsByClassName("card");
 let uli=document.getElementById(event.target.id);

 if(uli.classList.contains('match')||uli.classList.contains('open')) {
   return;
 }


 let cardContent = getEventTarget(event).innerHTML;

 if(flag==1) {
   uli.className+=" show open";
 }else if(flag==2){
   uli.className+=" show open";
 }else{
   uli.className+=" show open";
 }

 //push content ot array
 opened.push(cardContent);


 if(opened.length > 1) {
   moves++;
   if(cardContent === opened[0]) {
       matches++;
       uli.className+=" match";
       for(let i=0;i<eli.length;i++) {
           if(eli[i].classList.contains('open')){
             eli[i].className+=" match";
             eli[i].classList.remove("open");
             eli[i].classList.remove("show");
           }
       }

       uli.classList.remove("open");
       uli.classList.remove("show");

       while(opened.length > 0){
         opened.pop();
         }
   }else {
       uli.className+=" nomatch";
       setTimeout(function(){
       //your code to be executed after 1 second
       for(let j = 0; j < eli.length; j++){
         if(eli[j].classList.contains('open')){
             eli[j].className+=" nomatch";
             eli[j].classList.remove("open");
             eli[j].classList.remove("show");

             setTimeout(function(){
                 eli[j].classList.remove("nomatch");
               },700);

             }
           }
         }, 10);

         while(opened.length > 0) {
           opened.pop();
         }
       }

       let m=document.getElementsByClassName("moves")[0];
       m.textContent =moves;
     }
   if(flag==1 && matches==2){
     stopTimer();

     let star=document.getElementsByTagName("li");

     setTimeout(function(){dialogContent();},2000);

     if(moves==2){
       starCount=3;
       for(let i=2;i>=0;i--)  {
         star[i].style.color="yellow";
       }
     }else if (moves<5) {
       starCount=2;
       for(let i=1;i>=0;i--)  {
         star[i].style.color="yellow";
       }
     }else{
         starCount=1;
         star[0].style.color="yellow";
     }

   }else if(flag==2 && matches==8) {
     stopTimer();

     let star=document.getElementsByTagName("li");

     setTimeout(function(){dialogContent();},2000);
     if(moves==8){
       starCount=3;
       for(let i=2;i>=0;i--){
       star[i].style.color="yellow";
     }
   } else if (moves<20) {
     starCount=2;
     for(let i=1;i>=0;i--) {
       star[i].style.color="yellow";
     }
   }else{
       starCount=1;
       star[0].style.color="yellow";
     }
   }else if(flag==3 && matches==18){
     stopTimer();
     let star=document.getElementsByTagName("li");

     setTimeout(function(){dialogContent();},2000);
     if(moves==18){
       starCount=3;
       for(let i=2;i>=0;i--){
         star[i].style.color="yellow";
       }
     }else if (moves<30) {
       starCount=2;
       for(let i=1;i>=0;i--)  {
         star[i].style.color="yellow";
       }
     }else{
         starCount=1;
         star[0].style.color="yellow";
     }
   }
 }
}

//dialog to shown when game ends
function dialogContent() {

 let timeCount=document.getElementById("timer");
 let time= timeCount.textContent;
 timeCount.innerText="00min:00sec";

 let star=document.getElementsByTagName("li");
 for(let i=2;i>=0;i--)
 {
   star[i].style.color="black";
 }

 let dial=document.getElementById("favDialog");

 let str="<h1>Congratulatios!!!<h1><hr><h1>You Won with "+moves+" moves you  took <br>"+time+" to complete the game.<br>You earned "+starCount+" STARS.</h1><hr><button class='dialogBtn' onclick='ok()'>Ok</button><button class='daBtn' onclick='playAgain()'>Play Again</button>";

 let child=document.createElement('div');
 child.innerHTML=str;

 dial.appendChild(child);
 document.querySelector(".deck").remove();

 let scorePanel=document.getElementsByClassName("score-panel")[0];
 scorePanel.style.display="none";
 matches=0;
 moves=0;

 let m=document.getElementsByClassName("moves")[0];
 m.textContent ="";
 document.getElementById("favDialog").setAttribute("open","open");
}

//function call when ok button is clicked from the dialog
function ok() {
 let dial=document.getElementById("favDialog");
 dial.innerHTML="";
 dial.close();

 let front= document.getElementsByClassName("front");
 for(let i = 0; i < front.length; i++){
       front[i].style.display = "block";
   }
}

//function call when play again button is clicked from the dialog
function playAgain(){
 let dial=document.getElementById("favDialog");
 dial.innerHTML="";
 dial.close();
 let head=document.getElementsByTagName("h1");
 head[0].innerText="Pick the level";

 //show the elements having class as level
 let level= document.getElementsByClassName("level");
 for(var i = 0; i < level.length; i++){
       level[i].style.display = "block";
   }

}


//function call when restart icon is clicked from the dialog
function restart(){
 matches=0;
 moves=0;
 let timeCount=document.getElementById("timer");
 timeCount.innerText="00min:00sec";
 debugger;
 while(opened.length > 0) {
   opened.pop();
 }

 stopTimer();

 let m=document.getElementsByClassName("moves")[0];
 m.textContent =moves;
 document.querySelector(".deck").remove();
 if(flag==1){
   createGrid("easy");
 }else if (flag==2) {
   createGrid("medium");
 }else{
   createGrid("hard");
 }

}
//timer to start
function timer() {
  let timeCount=document.getElementById("timer");
   if (secs < 59) {
      secs++;
      if (secs < 10) {
         secs = "0" + secs;
      }
   } else {
      secs = 0;
      mins++;
      if (mins < 10) {
         mins = "0" + mins;
      }
   }
   timeCount.innerHTML = mins + "min:" + secs+"sec";
}

//stop the timer
function stopTimer() {
  timerRunning=0;
  secs=0;
  mins=0;
 clearInterval(intervalCounter);
 }





















//=================================================================///
//////added content/////////////





//============================================================///
/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
