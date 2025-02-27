const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const button = document.getElementById('submit')

let currentQuiz = 0
let score = 0
let quizData = []
console.log(typeof(questionEl) + quizData)


fetch('quizData.json')
  .then(response => response.json())
  .then(data => {
    quizData = data
    console.log(typeof(quizData) + quizData)
    loadQuiz()
  })
  .catch(error => console.log(`error loading data ${error}`))


const loadQuiz = () => {
  deselectAnswers()

  const currentQuizData = quizData[currentQuiz]

  questionEl.innerText = currentQuizData.question
  a_text.innerText = currentQuizData.a
  b_text.innerText = currentQuizData.b
  c_text.innerText = currentQuizData.c
  d_text.innerText = currentQuizData.d
}

const deselectAnswers = () => {
  answerEls.forEach(answerEl => answerEl.checked = false)
}

const getSelected = () => {
  let answer
  answerEls.forEach(answerEl => {
    answerEl.checked ? answer = answerEl.id : false
  })
  return answer
}

const buttonFunction = () => {
  const answer = getSelected()
  if (answer) {
    answer === quizData[currentQuiz].correct ? score++ : false

    currentQuiz ++
    currentQuiz < quizData.length ? loadQuiz() : quiz.innerHTML = `
    <h2>You answered ${score}/${quizData.length} questions correctly</h2>

    <button onclick="location.reload()">Reload</button>
    `
  } else {
    alert('select an answer please')
  }
}

button.addEventListener('click', buttonFunction)

loadQuiz()
