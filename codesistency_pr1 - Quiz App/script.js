const startScreen = document.getElementById('start-screen');//start screen
const quizScreen = document.getElementById('quiz-screen');//quiz screen
const resultScreen = document.getElementById('result-screen');//result screen
const startBtn = document.getElementById('start-btn');//start btn
const questionText = document.getElementById('question-text');//text
const currentQuestionSpan = document.getElementById('current-question');//textspan
const totalQuestionsSpan = document.getElementById('total-questions');//textspan
const scoreSpan = document.getElementById('score');//textspan
const answersContainer = document.getElementById('answers-container');//answer container think of the box is the parent
const finalScoreSpan = document.getElementById('final-score');//textspan
const maxScoreSpan = document.getElementById('max-score');//textspan
const resultMessage = document.getElementById('result-message');//text
const restartBtn = document.getElementById('restart-btn');//restart btn
const progressBar = document.getElementById('progress');//progress bar

//initialize questions
const quizQuestions = [
    {
        question: "Which character(s) that lives in a Pineapple under the sea?",
        answers: [
            { text: "Finn & Jake", correct: false },
            { text: "Flame Princess", correct: false },
            { text: "Mordecai & Rizzme", correct: false },
            { text: "Spongebob Square Pants", correct: true },
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            { text: "New Delhi", correct: true },
            { text: "Cebu", correct: false },
            { text: "Kyiv", correct: false },
            { text: "London", correct: false },
        ]
    },
    {
        question: "How many colours are there in a rainbow?",
        answers: [
            { text: "three", correct: false },
            { text: "six", correct: false },
            { text: "seven", correct: true },
            { text: "four", correct: false },
        ]
    },
    {
        question: "What is known as the Red Planet?",
        answers: [
            { text: "Pluto", correct: false },
            { text: "Venus", correct: false },
            { text: "Mercury", correct: false },
            { text: "Mars", correct: true },
        ]
    },
    {
        question: "Which is the largest mammal on Earth?",
        answers: [
            { text: "Killer Whale", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Great White Shark", correct: false },
            { text: "Elephant", correct: false },
        ]
    },
]

//Quiz state vars
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

currentQuestionSpan.textContent = currentQuestionIndex;
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
    //reset vars
    score = 0;
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
    console.log("Engine, Start.")
}
function showQuestion() {
    //reset state
    answerDisabled = false;

    //initialize current question from the array of objects
    const currentQuestion = quizQuestions[currentQuestionIndex];

    //initialize current question index 0+1
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    //initialize progress bar with percentage base since current question is 0, progress did not yet happened
    //0%
    const progressPercent = (currentQuestionIndex/quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    //initialize current question text
    questionText.textContent = currentQuestion.question;

    //TO DO: Explain... hmm maybe its because everyShowQuestion would mean refreshing the container A RESET
    answersContainer.innerHTML = "";

    
    //Traverse to the Arrays of Objects called quizQuestions array then run foreach method to create 
    //element called button element for each object found in the quizQuestions array
    currentQuestion.answers.forEach(answer => {
        //we just created a button element using a javascript from here
        const answerBtn = document.createElement("button");
        answerBtn.innerHTML = answer.text;
        answerBtn.classList.add("answer-btn");

        //what is dataset? Basically, it is a "property" of answerBtn element("<button></button>") 
        //that allows you to store custom data. So you would like to use dataset to an element 
        //whenever you want to store custom data, like in this case is the correct element from the array.
        answerBtn.dataset.correct = answer.correct; //attach the correct string("true"/"false") value from the array to the answerBtn

        //add event listener then run the method when the user clicks
        answerBtn.addEventListener("click", selectAnswer);
        
        //but how did these answers showed up exactly inside the id=answers-container without using any selector?
        // LOL here it is... appendchild to the answerContainer.
        answersContainer.appendChild(answerBtn);

    });
}

//takes the object as event(this.object), in this case is the button
function selectAnswer(event) {
    if(answerDisabled) return;
    
    answerDisabled = true;

    const selectedBtn = event.target;//targets the selected button
    const isCorrect = selectedBtn.dataset.correct == "true";//then check if that button is the correct button
    
    //TO DO: Explain this
    //so.. technically parents can become arrays or each element can become a parent depending on if that element
    // contains children elements. To access such children, in this case are the buttons
    //We run a class Array.from() to arbitrarily create an array of children from the container
    // then in the if statement we check each button element with button.dataset.correct is the correct
    // button(we just selected or clicked) using the dataset property,
    // we apply a class name with the selector.classList.add()
    // THE POINT: so we just add the "correct" class to the selected button, 
    // else add the "incorrect" class if the selected is wrong.
    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.addEventListener("mouseover", () => {
                button.classList.add("correct");
            });
            button.classList.add("correct");
        } else if (button === selectedBtn) {
            button.addEventListener("mouseover", () => {
            button.classList.add("incorrect");
            });
            button.classList.add("incorrect");
        }
    });

    //Update the score
    if(isCorrect) {
        answerDisabled = true;
        score++;
        scoreSpan.textContent=score;
    }

    //Add delay time then increase the progress bar
    setTimeout(() => {
        currentQuestionIndex++;
        
        //check if there are more questions or the quiz is over // recursion
        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
    
}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    
    finalScoreSpan.textContent = score;

    const percentageScore = (score/quizQuestions.length) * 100;

    if(percentageScore === 100) {
        resultMessage.textContent = "Perfect! You are a genius!";
    } else if (percentageScore >= 80) {
        resultMessage.textContent = "Great Job! You know your stuff!";
    } else if (percentageScore >= 60) {
        resultMessage.textContent = "Good Effort! Keep learning!";
    } else if (percentageScore >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
    //video timestamp to continue: 58:25
}