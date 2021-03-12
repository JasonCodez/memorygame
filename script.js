const gameContainer = document.getElementById("game");
const cards = document.querySelectorAll("#game div");
const score = document.querySelector("#score span");
const gameOver = document.querySelector("#gameOver span");
let myBestScore = document.querySelector("#bestScore span");
let cardsClicked = 0;
let cardsFlipped = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const COLORS = [
  "red",
  "green",
  "blue",
  "orange",
  "purple",
  "brown",
  "orchid",
  "teal",
  "red",
  "green",
  "blue",
  "orange",
  "purple",
  "brown",
  "orchid",
  "teal"
];

let newHiScore = localStorage.getItem("scoreToBeat");

if(newHiScore === null) {
   myBestScore.innerText = "--";
} else {
   myBestScore.innerText = newHiScore;
}

function shuffle(array) {
  let counter = array.length;

  
  while (counter > 0) {
   
    let index = Math.floor(Math.random() * counter); 
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}


function handleCardClick(e) {
  if(lockBoard) {
     return;
  }
  
  if(this.classList.contains("flipped")) {

   return;
  }
   
  this.style.backgroundColor = this.classList[0];
  
  if (!firstCard || !secondCard) {
   cardsClicked += 1;
   score.innerText = cardsClicked;
   this.classList.add("flipped");
   firstCard = firstCard || this;
   secondCard = this === firstCard ? null : this;
 }

 if (firstCard && secondCard) {
   lockBoard = true;

   if (firstCard.className === secondCard.className) {
     cardsFlipped += 2;
     firstCard.removeEventListener("click", handleCardClick);
     secondCard.removeEventListener("click", handleCardClick);
     firstCard = null;
     secondCard = null;
     lockBoard = false;
   } else {
     setTimeout(function() {
       firstCard.style.backgroundColor = "";
       secondCard.style.backgroundColor = "";
       firstCard.classList.remove("flipped");
       secondCard.classList.remove("flipped");
       firstCard = null;
       secondCard = null;
       lockBoard = false;
     }, 1000);
   }
}

   function playSound() {
      document.querySelector("audio").play();
   }

   if(cardsFlipped === 16) {
      gameOver.innerText = "You finished with a score of: " + cardsClicked;
      
      if(cardsClicked < parseInt(newHiScore)) {
         gameOver.innerText = "A NEW HI SCORE!!";
         localStorage.setItem("scoreToBeat", cardsClicked);
         playSound();
      }
      
   }
}

createDivsForColors(shuffledColors);
