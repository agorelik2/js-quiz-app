const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

let jsQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz)

function startQuiz() {
    startButton.classList.add('hide')
    jsQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    displayNextQuestion()
  }

function displayNextQuestion() {
    
    showQuestion(jsQuestions[currentQuestionIndex])
  }

function showQuestion(question){

    questionElement.innerText = question.question
}
  function selectAnswer(e) {


  }
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
