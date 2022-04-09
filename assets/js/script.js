//game settings
var optionsSize = 4;
var nextQuestionTimeout = 2000;
var score = 0;
var gameTime = 30;
var refreshRate = 1;

//elements
var mainArea;
var menuDiv;
var startBtn;
var hsBtn;
var triviaDiv;
var questionP;
var timer;
var liArray = Array(optionsSize);
var timeHandlerId;


function createMenu(){
    menuDiv = document.createElement('div');
    menuDiv.className = 'main-menu';

    startBtn = document.createElement('button');
    startBtn.textContent = "Start Quiz!";
    startBtn.className = 'start-btn'
    startBtn.onclick = playGame;
    
    hsBtn = document.createElement('button');
    hsBtn.textContent = "High Scores";
    hsBtn.className = 'highscore-btn';
    hsBtn.onclick = showHighScores;
    
    menuDiv.append(startBtn);
    menuDiv.append(hsBtn);
}

function createTrivia(size){
    triviaDiv = document.createElement('div');
    h1 = document.createElement('h1');
    h1.className = 'trivia-header';
    h1.textContent = 'Question';

    timer = document.createElement('p');
    timer.className = 'timer';
    timer.textContent = gameTime;

    questionP = document.createElement('p');
    questionP.className = 'question';

    var answers = document.createElement('div');
    answers.className ='answers';

    var ol = document.createElement('ol');
    for(let i = 0; i < size; ++i){
        liArray[i] = document.createElement('li');
        liArray[i].textContent = i;
        ol.append(liArray[i]);
    }
    answers.append(ol);
    triviaDiv.append(h1);
    triviaDiv.append(timer);
    triviaDiv.append(questionP);
    triviaDiv.append(answers);
}

function initComponents(){

    createMenu();
    createTrivia(optionsSize);

    mainArea = document.querySelector("main");

    displayView(menuDiv);
}

function displayView(view){
    while (mainArea.firstChild) {
        mainArea.removeChild(mainArea.firstChild);
    }
    mainArea.append(view);
}

function timerHandler(){
    if(--gameTime == 0){
        alert('game over');
        window.clearInterval(timeHandlerId);
    }
    else
        timer.textContent = gameTime;
}

function playGame(){
    displayView(triviaDiv);
    timeHandlerId = window.setInterval(timerHandler, 1000*refreshRate);
    showQuestion();
}

function showQuestion(){
    let nextQuestion = getRandomItem(questions);
    questionP.textContent = nextQuestion['question'];
    let s = getRandomInt(optionsSize);
    liArray[s].textContent = nextQuestion['answer'];
    liArray[s].className = 'unanswered';
    liArray[s].onclick = rightAnswer;
    let wrong = nextQuestion['wrong_answers'].slice();
    for(let i = 1; i < optionsSize; ++i){
        liArray[(s+i)%optionsSize].textContent = getAndRemoveRandomItem(wrong);
        liArray[(s+i)%optionsSize].className = 'unanswered';
        liArray[(s+i)%optionsSize].onclick = wrongAnswer;
    }
}

function rightAnswer(event){
    console.log(event);
    event.target.classList.remove('unanswered');
    event.target.classList.add('right-answer');
    score++;
    window.setTimeout(showQuestion, nextQuestionTimeout);
}

function wrongAnswer(event){
    event.target.classList.remove('unanswered');
    event.target.classList.add('wrong-answer');
    window.setTimeout(showQuestion, nextQuestionTimeout);
}

function showHighScores(){

}

window.onload = initComponents;


/*Helpers*/
function getRandomItem(array){
    return array[getRandomInt(array.length)];
}

function getAndRemoveRandomItem(array){
    let idx = getRandomInt(array.length);
    let item = array[idx];
    array.splice(idx,1);
    return item;
}

function getRandomInt(max){
    return Math.floor(Math.random()*max);
}

/*Data*/
var questions = [
    {
        'question': 'What does HTML stand for?',
        'answer': 'Hyper Text Markup Language',
        'wrong_answers':[
            'Hyper Trainer Marking Language',
            'Hyper Text Markup Leveler',
            'Hyper Text Marketing Language']
    },
    {
        'question': 'What tag will be used to create a hyperlink? ',
        'answer': 'a',
        'wrong_answers':[
            'img ',
            'div',
            'link']
    },
    {
        'question': 'Which among the heading levels got the biggest size?',
        'answer': 'h1',
        'wrong_answers':[
            'h2',
            'h3',
            'h4',
            'h5',
            'h6']
    }
];