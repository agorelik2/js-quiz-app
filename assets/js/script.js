const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

let jsQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    displayNextQuestion()
  })

function startQuiz() {
    startButton.classList.add('hide')
    jsQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
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
        if (answer.correct) {
          button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
      })
}

  function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    //Create an array of all answers and set the data element correct to 'correct' or 'wrong'
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
  })
    if (jsQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
  } 
  else {
        startButton.innerText = 'Try again'
        startButton.classList.remove('hide')
    }

  }

  // Set display class of the answer element based on 'correct' class
  function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
  }

  // Clear the display class for the answers
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
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
