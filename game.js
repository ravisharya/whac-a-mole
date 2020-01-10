var GAME_APP = {};
GAME_APP.dimension = "";
GAME_APP.colorIndex  = "";
GAME_APP.clickCount = "";
GAME_APP.timeToWin = "";
GAME_APP.numOfColors = "";
GAME_APP.attemptsCount = "";
GAME_APP.totalAttempts = "";
GAME_APP.timeOutID = "";

var formBox = null;
var databox = null;

function fetchAndValidateInputs(){
    var error = false;
    var dimension = document.getElementById('dimension');
    var numberOfColors = document.getElementById('numberOfColors');
    var timeToWin = document.getElementById('timeToWin');
    var totalAttempts = document.getElementById('totalAttempts');
    
    if (dimension.value == "" || numberOfColors.value == "" || timeToWin.value == "" || totalAttempts.value == "") {
        error = true;
    }
   
    if (dimension.value != "" && numberOfColors.value != "") { 
        if (parseInt(numberOfColors.value) > Math.pow( parseInt(dimension.value), 2) ) {
            error = true;
        }
    }
    
    if (error) {
        //alert("Incorrect Input. Please enter again")
        throw new Error("Incorrect Input. Please enter again");
    }
    
    GAME_APP.dimension = parseInt(dimension.value);
    GAME_APP.timeToWin = parseInt(timeToWin.value);
    GAME_APP.numOfColors = parseInt(numberOfColors.value);
    GAME_APP.totalAttempts  = parseInt(totalAttempts.value);
    
    if (GAME_APP.dimension == 0 || GAME_APP.timeToWin == 0 || GAME_APP.numOfColors == 0 || GAME_APP.totalAttempts == 0) {
        throw new Error("Incorrect Input. Please enter non zero values");
    }
}

function generateGrid() {
    //Initialising locals
    var rows = null;
    var grid= null;
    var databox = null;
    var cellValue = 0;
    
    //Resetting globals
    GAME_APP.clickCount = 0;
    GAME_APP.dimension = 0;
    GAME_APP.timeToWin = 0;
    GAME_APP.numOfColors = 0;
    
    databox = document.getElementById('databox');
    databox.innerHTML="";
    
    try {
        fetchAndValidateInputs();
    }
    catch(e) {
        alert (e);
        return; 
    }

    cols = rows = GAME_APP.dimension;
    grid = document.createElement('table');
    grid.className = 'grid';
    
    for (var r=0; r<rows; ++r) {
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0; c<cols; ++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.innerHTML = cellValue++;
            cell.addEventListener('click',handleClick);
        }
    }
    
    databox.appendChild(grid);
    (GAME_APP.attemptsCount)++;
    randomColor();
    GAME_APP.timeOutID = setTimeout(checkTimeOut,GAME_APP.timeToWin*1000);
}

function handleClick(){
    var key = parseInt(this.innerHTML);
    if (GAME_APP.colorIndex.indexOf(key) != -1 && this.className != 'clicked') {
        this.className='clicked';
        ++(GAME_APP.clickCount);
        if (GAME_APP.clickCount == GAME_APP.numOfColors) {
            alert('YOU WIN!!! Plz submit the game again to replay.');
            clearTimeout(GAME_APP.timeOutID);
            GAME_APP.attemptsCount = 0;
            formBox.style.display = "block";
        }
    }
}

function randomColor() {
    var maxNum = Math.pow(GAME_APP.dimension, 2);
    GAME_APP.colorIndex = new Array();
    for (var i=0; i< GAME_APP.numOfColors; ++i) {
        do {
            var randomNo = Math.floor(Math.random() * maxNum);
        } while (GAME_APP.colorIndex.indexOf(randomNo) != -1);
        
        GAME_APP.colorIndex.push(randomNo);
    }
    
    for (var i=0; i< GAME_APP.numOfColors; ++i) {
        document.getElementsByTagName('td')[GAME_APP.colorIndex[i]].className='unclicked';
    }
}

function checkTimeOut() {
    if (GAME_APP.attemptsCount == GAME_APP.totalAttempts) {
        alert('Sorry You lost. No more attempts left!! Plz submit the game again to replay.');
        clearTimeout(GAME_APP.timeOutID);
        GAME_APP.attemptsCount = 0;
        GAME_APP.clickCount = 100;
        formBox.style.display = "block";
        return;
    }
    if (GAME_APP.clickCount != GAME_APP.numOfColors) {
        alert('Sorry. Timeout!!  Try again.');
        generateGrid();
    }
}

function initiate(){
    button=document.getElementById('button');
    button.addEventListener('click', function() {
        formBox = document.getElementById('formbox');
        formBox.style.display = "none";
        generateGrid();}, 
    false);
}    
    
window.addEventListener('load', initiate, false);
