// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finalMessage = document.querySelector(".finish");
let select = document.querySelector("select");
let options = document.querySelectorAll("option");

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "JavaScript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "LeetCode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// fill options with lvls objec
options.forEach((option, index) => {
  option.innerHTML = Object.keys(lvls)[index];
});
// Default Level
//   remove selected attribute from option

  let defaultLevelName = options[Math.floor(Math.random() * options.length)].innerHTML;
  console.log(defaultLevelName);
  let defaultSeconds = lvls[defaultLevelName];
  // Setting Level Name + Seconds + Score
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultSeconds;
  timeLeftSpan.innerHTML = defaultSeconds;


scoreTotal.innerHTML = words.length;

// Disable Paste Function ----------new event
input.addEventListener("paste", (e) => e.preventDefault());

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();

  //   Generate words function
  genWords();
};

function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  //   Get Word Index
  let wordIndex = words.indexOf(randomWord);

  //   Remove Word From Array
  words.splice(wordIndex, 1);

  //   Show The Random word
  theWord.innerHTML = randomWord;

  //   Empty Upcoming Words
  upcomingWords.innerHTML = "";

  //   Generate Words
  for (let i = 0; i < words.length; i++) {
    //    Create Div element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  //   Call Start Play Function
  startPlay();
}
function startPlay() {
  timeLeftSpan.innerHTML = defaultSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Comapring Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        //    Empty input field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanTxt = document.createTextNode(
            "Congratulations! You Are A good Touch Typist"
          );
          span.appendChild(spanTxt);
          finalMessage.appendChild(span);
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanTxt = document.createTextNode("Game Over");
        span.appendChild(spanTxt);
        finalMessage.appendChild(span);
      }
    }
  }, 1000);
}
