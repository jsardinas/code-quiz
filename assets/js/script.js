//game settings
var optionsSize = 4;
var nextQuestionTimeout = 2000;
var score = 0;
var gameTime = 5;
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
var gameOverView;
var highScoresView;
var scoreP;
var highScoresTable;


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

function createGameOverView(){
    gameOverView = document.createElement('div');
    gameOverView.className = 'game-over';
    
    let h1 = document.createElement('h1');
    h1.textContent = 'Game Over!';

    let h2 = document.createElement('h2');
    h2.textContent = 'Enter your name to save your score';

    let form = document.createElement('form');
    
    let nameDiv = document.createElement('div');
    nameDiv.className = 'name';

    let name = document.createElement('input');
    name.setAttribute('type', 'text');
    name.setAttribute('placeholder', 'Your name here');
    name.setAttribute('id', 'name-input')

    scoreP = document.createElement('p');

    let submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Save');

    form.onsubmit = saveScore;

    nameDiv.append(name);
    nameDiv.append(scoreP);

    form.append(nameDiv);
    form.append(submit);

    gameOverView.append(h1);
    gameOverView.append(h2);
    gameOverView.append(form);
}

function createHighScoresView(){
    highScoresView = document.createElement('div');
    highScoresView.className = 'high-scores';

    let h1 = document.createElement('h1');
    h1.textContent = 'High Scores';

    highScoresTable = document.createElement('table');

    let menuBtn = document.createElement('button');
    menuBtn.textContent = 'Main Menu';
    menuBtn.onclick = mainMenu;

    highScoresView.append(h1);
    highScoresView.append(highScoresTable);
    highScoresView.append(menuBtn);
}

function mainMenu(){
    displayView(menuDiv);
}

function saveScore(event){
    event.preventDefault();
    const name = document.querySelector('#name-input').value;
    let hs = window.localStorage.getItem('highScores');
    hsPair = {'name':name, 'hs':score}
    if(hs == null || hs == undefined)
        hs = [hsPair];
    else{
        hs = JSON.parse(hs);
        console.log(hs);
        hs.push(hsPair);
    }
    window.localStorage.setItem('highScores', JSON.stringify(hs));
    showHighScores();
}

function initComponents(){

    createMenu();
    createTrivia(optionsSize);
    createGameOverView();
    createHighScoresView();

    mainArea = document.querySelector("main");

    mainMenu();
}

function displayView(view){
    while (mainArea.firstChild) {
        mainArea.removeChild(mainArea.firstChild);
    }
    mainArea.append(view);
}

function timerHandler(){
    if(--gameTime == 0){
        gameOver();
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
    //clear table
    while (highScoresTable.firstChild) {
        highScoresTable.removeChild(highScoresTable.firstChild);
    }
    let hs = window.localStorage.getItem('highScores');
    if (hs != null || hs != undefined){
        hs = JSON.parse(hs);
        for (item of hs){
            let tr = document.createElement('tr');
            let tdLeft = document.createElement('td');
            tdLeft.textContent = item['name'];
            tr.append(tdLeft);
            let tdRight = document.createElement('td');
            tdRight.textContent = item['hs'];
            tr.append(tdRight);
            highScoresTable.append(tr);
        }
    }
    displayView(highScoresView);
}

function gameOver(){
    scoreP.textContent = `Score: ${score}`
    displayView(gameOverView);
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