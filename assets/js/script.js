// Set constants and variables

const quizContainerElement = document.getElementById('quiz-container')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const quizStatus = document.getElementById('quiz-status')
const quizName = document.getElementById('quiz-name')
const userInput = document.getElementById ('user-input')
const userInit = document.getElementById ('user-init')
const userResponse = document.getElementById ('response')
const userHighScore = document.getElementById ('high-score')
var submitButton = document.getElementById('submit-btn');
var myTimer = document.getElementById('timer');
const timeTotal  = 75
var secondsLeft 
var onTime

const quizInstructions = 'Try to answer following code-related questions within the time limit. You will get 15 points for every correct answer plus bonus points for answering quickly. When you hit the wrong answer, it will penalize you by 10 seconds.'

// Define the array of questions
const questions = [
    {
      question: 'Inside which HTML element do we put the JavaScript?',
      answers: [
        { text: '<script>', correct: true },
        { text: '<javascript>', correct: false },
        { text: '<js>', correct: false },
        { text: '<code>', correct: false }
      ]
    },
    {
      question: 'How do you create a function in JavaScript?',
      answers: [
        { text: 'function = myFunction()', correct: false },
        { text: 'function.myFunction()', correct: false },
        { text: 'function myFunction()', correct: true },
        { text: 'function:myFunction()', correct: false }
      ]
    },
    {
      question: 'Which event occurs when the user clicks on an HTML element?',
      answers: [
        { text: 'onMouseClick', correct: false },
        { text: 'onClick', correct: true },
        { text: 'onChange', correct: false },
        { text: 'IDK', correct: false }
      ]
    },
    {
      question: 'How to write an IF statement in JavaScript?',
      answers: [
        { text: 'if i = 3 then', correct: false },
        { text: 'if (i == 3)', correct: true },
        { text: 'if i == 3 then', correct: false },
        { text: 'if i = 3', correct: false }
      ]
    },
    {
      question: 'What is the correct way to write a JavaScript array?',
      answers: [
        { text: 'var colors = ["red","green","blue"]', correct: true },
        { text: 'var colors = "red","green","blue"', correct: false },
        { text: 'var colors = ("red","green","blue")', correct: false },
        { text: 'var colors = {"red","green","blue")', correct: false }
      ]
    }
  ]

//Main routine
let jsQuestions, currentQuestionIndex, score

quizStatus.innerHTML = quizInstructions 
quizName.classList.remove('hide')
quizStatus.classList.remove('hide')

userInput.classList.add('hide')
startButton.addEventListener('click', startQuiz)

nextButton.addEventListener('click', () => 
{
    currentQuestionIndex++
    if (secondsLeft > 1){
      onTime = 1
      if (questions.length >= currentQuestionIndex + 1){
          displayNextQuestion()
      } else {
        displayResults(onTime)
      }
    }
    else {
      onTime = 0
      displayResults(onTime)
    }
  })
  
// Start Quiz
function startQuiz() {
    startButton.classList.add('hide')
    quizStatus.classList.add('hide')
    userInput.classList.add('hide')
    jsQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    score = 0
    secondsLeft = timeTotal
    myTimer.classList.remove('hide')
    questionContainerElement.classList.remove('hide')
    displayNextQuestion()
  }

//Display next Question
function displayNextQuestion() {
    resetPage()
    if (secondsLeft > 0) {
      showTimer()
      showQuestion(jsQuestions[currentQuestionIndex])
    }  else {
        onTime = 0
        displayResults(onTime)
    }
  }

  // Set Timer
function showTimer()  {
    var interval = setInterval(function() {
      myTimer.innerHTML = "Timer: " + secondsLeft + " seconds left";

      if(secondsLeft < 1) {
        myTimer.innerHTML = "0 seconds left"
        clearInterval(interval);
      } else {
          secondsLeft--;
      }
    } ,1000) ; 
  }

  
// Reset Page
function resetPage(){

    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

//Present a question and multiple choice answers
function showQuestion(question){

    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        //if (answer.correct) {
          button.dataset.correct = answer.correct
        
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
      })
}

// Functionality to select answer
  function selectAnswer(e) {
    const selectedButton = e.target
    let correct = selectedButton.dataset.correct
    let selected = 0
    
    //Create an array of all answers and set the data element correct to 'correct' or 'wrong'
    
    Array.from(answerButtonsElement.children).forEach(button => {
        
        if (button == selectedButton) {          
            console.log ("button selected")
            selected = 1  
        } else {
            selected = 0
        }
        setStatusClass(selected, button, button.dataset.correct)
        button.disabled = true
  })
  
    //If this is not the last question
    if (jsQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')   
    } 
    // this is the last question
    else {
       nextButton.classList.remove('hide')
       nextButton.innerText = 'Finish'    
    }
}
 
  // Set display class of the answer element based on 'correct' class
  function setStatusClass(clicked, element, correct) {
    clearStatusClass(element)
 
   if (clicked == 1 && correct == 'true') {
        element.classList.add('correct')
        console.log ("timer before correct: " + secondsLeft)
        console.log ("score before correct: " + score)
        score = score + 15
        console.log ("correct button pressed, score: " + score)
        console.log ("correct button pressed, timer: " + secondsLeft)
    } else if (clicked == 1 && correct == 'false'){
            element.classList.add('wrong')
            console.log ("clicked wrong button")
            console.log ("timer before wrong: " + secondsLeft) 
            console.log ("score before wrong was pressed: " + score)
            secondsLeft = secondsLeft - 10
            console.log ("incorrect button pressed, timer decr: " + secondsLeft)
            console.log ("incorrect button pressed score: " + score)
    } else { console.log ("did not click this button")}
  }

  // Clear the display class for the answers
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }

  // Present Results Screen
  function displayResults(onTime) {   
    questionContainerElement.classList.add('hide')
    myTimer.classList.add('hide')
    nextButton.classList.add('hide')
    startButton.classList.remove('hide')
    quizStatus.classList.remove('hide')
    quizName.classList.add('hide')
    currentQuestionIndex = 0
    userResponse.textContent = ""
    userHighScore.innerHTML = ""
    userInit.value = ""
    
    //Check if user was on time
    if (onTime) {
      if (score > 0) {
        if (secondsLeft > 0){
          score = score + secondsLeft
        }
        quizStatus.innerHTML = "All Done! Your score is " + score;
        userInput.classList.remove('hide');
        submitButton.addEventListener('click', function(event) {
        console.log ("submit button clicked")
        event.preventDefault();
        event.stopPropagation();
        var response = userInit.value  + ", thank you for your submission! "
        
        userResponse.textContent = response  
        
        // localStorage.setItem ("highscore", score);
        //localStorage.removeItem ("highscore");
        //localStorage.removeItem ("highscoreuser");

        //Store the highest score if achieved. Display the highest score
        var setScore = 0
        storeHighScores(score, userInit.value, setScore);
        displayHighScores();
        })
      } else {
        // user did not answer any question correctly
            score = 0 
            quizStatus.innerText = "Oooops... Your score is " + score;
          }        
    } else {
        // user ran out of time
          quizStatus.innerText = "Sorry... You ran out of time!";
      } 
      
    startButton.innerText = 'Try again';
    nextButton.innerText = 'Next';   
}

// Store user initials and high score result
function storeHighScores(newScore, newUser) {

var highscore = localStorage.getItem("highscore");
console.log ("the high score stored: ") + highscore
  // Compare the new score with the high score stored in the local storage
  if(highscore !== null) { 

  //Override the HIGH SCORE stored in local storage
    if(newScore > highscore) {
        console.log ("new high score: " + newScore)
        localStorage.setItem("highscoreuser", newUser);
        localStorage.setItem("highscore", newScore);      
    } 
  //There is no high score, so set the FIRST high score
  }else{
    localStorage.setItem("highscoreuser", newUser);
    localStorage.setItem("highscore", newScore); 
  }
}

// Display High Scores and message
function displayHighScores() {

  console.log ("disp high score: " + highscore)
  var highscore = localStorage.getItem("highscore");
  var highUser = localStorage.getItem("highscoreuser");
  userHighScore.innerHTML = "<br/>The highest score of " + highscore + " was set by " + highUser + ". Try Again !!!"
  
  //if (setnew === 1) {
  //  userHighScore.innerHTML = "<br/>Congratulations "+ highscoreuser + "!!! You just set the highest score of "+ highscore 
  //}else{
  //userHighScore.innerHTML = "<br/>The highest score of " + highscore + " was set by " + highUser + ". Try Again !!!"
  //}
}
