const questions = [
  {
    question: "which is the largest animal in the world?",
    answers: [
      { text: "shark", correct: false },
      { text: "blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },

  {
    question: "What is the largest ocean in the world?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
    ],
  },

  {
    question: "What is the name of the first web browser ever created?",
    answers: [
      { text: "Internet Explorer", correct: false },
      { text: "WorldWideWeb", correct: true },
      { text: " Netscape Navigator", correct: false },
      { text: "Mosaic", correct: false },
    ],
  },

  {
    question:
      "What is the term for malicious software designed to harm a computer?",
    answers: [
      { text: "Malware", correct: true },
      { text: "Firewall", correct: false },
      { text: "Adware", correct: false },
      { text: "Spam", correct: false },
    ],
  },

  {
    question: " What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Rome", correct: false },
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
    ],
  },

  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "jupiter", correct: false },
      { text: "Mars", correct: true },
      { text: "Saturn", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  console.log(selectedBtn.dataset);
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  if (currentQuestionIndex + 1 === questions.length) {
    nextButton.innerHTML = "Submit";
  }

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
