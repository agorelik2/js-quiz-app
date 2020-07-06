const quizContainerElement = document.getElementById('quiz-container')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const quizStatus = document.getElementById('quiz-status')
const userInput = document.getElementById ('user-input')
const userInit = document.getElementById ('user-init')
const userResponse = document.getElementById ('response')
var submitButton = document.getElementById('submit-btn');

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
    }
  ]

let jsQuestions, currentQuestionIndex, score

quizStatus.innerText = "Coding Quiz Challenge"
quizStatus.classList.remove('hide')
userInput.classList.add('hide')
startButton.addEventListener('click', startQuiz)
console.log ("number of questions: " + questions.length)
nextButton.addEventListener('click', () => 
{
    currentQuestionIndex++
    if (questions.length >= currentQuestionIndex + 1){
        displayNextQuestion()
    } else {
       console.log ("you are done") 
       displayResults()
    }
  })
  
function startQuiz() {
    startButton.classList.add('hide')
    quizStatus.classList.add('hide')
    userInput.classList.add('hide')
    jsQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    score = 0
    questionContainerElement.classList.remove('hide')
    displayNextQuestion()
  }

function displayNextQuestion() {
    resetPage()
    showQuestion(jsQuestions[currentQuestionIndex])
  }

function resetPage(){

    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
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

  function selectAnswer(e) {
    const selectedButton = e.target
    let correct = selectedButton.dataset.correct
    let selected = 0
    
    //Create an array of all answers and set the data element correct to 'correct' or 'wrong'
    //setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        console.log ("inside buttons array")
        if (button == selectedButton) {          
            console.log ("button selected")
            selected = 1  
        } else {
            selected = 0
        }
        setStatusClass(selected, button, button.dataset.correct)
        button.disabled = true
  })
  
    if (jsQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')   
    } 
    else {
       nextButton.classList.remove('hide')
       nextButton.innerText = 'Finish'
    //   nextButton.addEventListener('click', displayResults)
      console.log ("after display results")     
    }
}
 
  // Set display class of the answer element based on 'correct' class
  function setStatusClass(clicked, element, correct) {
    clearStatusClass(element)
 
   if (clicked == 1 && correct == 'true') {
        element.classList.add('correct')
        score = score + 2
    } else if (clicked == 1 && correct == 'false'){
            element.classList.add('wrong')
            console.log ("clicked wrong button")
    } else { console.log ("did not click this button")}
  }

  // Clear the display class for the answers
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }

  function displayResults() {
    questionContainerElement.classList.add('hide')
    nextButton.classList.add('hide')
    quizStatus.innerText = "All Done! Your score is " + score
    startButton.innerText = 'Try again'
    nextButton.innerText = 'Next'
    userInput.classList.remove('hide')
    startButton.classList.remove('hide')
    quizStatus.classList.remove('hide')
    currentQuestionIndex = 0
    userResponse.textContent = ""
    userInit.value = ""
    submitButton.addEventListener('click', function(event) {
      console.log ("submit button clicked")
      event.preventDefault();
      event.stopPropagation();
      var response = "Thank you for your submission " + userInit.value 
      console.log ("user initials: " + userInit.value)
      userResponse.textContent = response;
  
    })
}