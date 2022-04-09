var mainArea;
var menuDiv;
var startBtn;
var hsBtn;
var triviaDiv;

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
    h2 = document.createElement('h2');
    h2.textContent = 'Question';

    var question = document.createElement('p');
    question.className = 'question';
    question.textContent = 'pregunta';

    var answers = document.createElement('div');
    answers.className ='answers';

    var ol = document.createElement('ol');
    var li;
    for(let i = 0; i < size; ++i){
        li = document.createElement('li');
        li.textContent = i;
        ol.append(li);
    }
    answers.append(ol);
    triviaDiv.append(h2);
    triviaDiv.append(question);
    triviaDiv.append(answers);
}

function initComponents(){

    createMenu();
    createTrivia(4);

    mainArea = document.querySelector("main");

    displayView(menuDiv);
}

function displayView(view){
    while (mainArea.firstChild) {
        mainArea.removeChild(mainArea.firstChild);
    }
    mainArea.append(view);
}

function playGame(){
    displayView(triviaDiv);
    
}

function showHighScores(){

}

window.onload = initComponents;