# cambridge-maths-game
let score = 0;
let questionCount = 0;
const totalQuestions = 50;
let timeLeft = 30;
let correctAnswer;
let timerInterval;

function generateQuestion() {
  const a = Math.floor(Math.random() * 900) + 100;
  const b = Math.floor(Math.random() * 900) + 100;
  const isAddition = Math.random() > 0.5;
  const operator = isAddition ? '+' : '-';
  correctAnswer = isAddition ? a + b : a - b;
  document.getElementById("questionBox").innerText = `Q${questionCount + 1}: What is ${a} ${operator} ${b}?`;
  document.getElementById("answerInput").value = "";
  document.getElementById("answerInput").focus();
  timeLeft = 30;
  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").innerText = `Time left: ${timeLeft} seconds`;
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time left: ${timeLeft} seconds`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion(false);
    }
  }, 1000);
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("answerInput").value);
  const isCorrect = userAnswer === correctAnswer;
  clearInterval(timerInterval);
  nextQuestion(isCorrect);
}

function nextQuestion(correct) {
  if (correct) {
    score++;
    alert("Correct! Well done!");
  } else {
    alert(`Oops! The correct answer was ${correctAnswer}.`);
  }

  questionCount++;
  document.getElementById("score").innerText = `Score: ${score} / ${totalQuestions}`;

  if (questionCount === 10) {
    document.getElementById("subscribeModal").style.display = "block";
    return;
  }

  if (questionCount < totalQuestions) {
    generateQuestion();
  } else {
    setTimeout(() => {
      const proceed = confirm(`Congratulations! You completed ${totalQuestions} questions. Your score: ${score}.\n\nDo you want to proceed to the next level?`);
      if (proceed) {
        window.location.href = "next-topic-page.html";
      } else {
        window.location.href = "index.html";
      }
    }, 500);
  }
}

function closeModal() {
  document.getElementById("subscribeModal").style.display = "none";
  generateQuestion(); // Continue with the game
}

generateQuestion();
