


//levels avialable in the game
const levels = {'easy' : {'time':7, 'wordCount': 5, 'ins':'is not'}, 'medium' : {'time':5, 'wordCount': 10, 'ins':'is'}, 'hard' : {'time':3, 'wordCount': 15, 'ins':'is'}};
//Words to be used in the game
const wordsArray = [ 'UWEM', 'OSSAI', 'NOYE', 'SHOLA', 'SEGUN', 'OLADOTUN', 'EMENUM', 'CHUKS', 'OLAYEMI', 'CHINEYE', 'NGOZI', 'TAYE', 'CHINEDU', 'KELECHI', 'EKENEM', 'SHADE', 'UZOR', 'OGBODO', 'EMEYAZIA', 'ETUKOMENI', 'ODION', 'CHUKWUDI', 'ISHIOMA', 'CHIOMA', 'YUSUF', 'UDOKACHUKWU'];
//color aarray for the words
const colors = ['#8C489E', '#C32451', '#E94338', '#D2DF4C', '#FF4DAC'];

const timeBar = document.querySelector('#time-bar div');
const scoreBar = document.querySelector('#score-bar div');
const wordsOnScreen =document.querySelector('#word-container h1');
const userInput = document.querySelector('input');

let currentLevel, isPlaying, time, score, userScore, interval;


//This starts the coundown b4 a word is shown
function startWordCountDown(){
    let i = 0
    let intr =[`This level ${currentLevel.ins} case Sensitive`, `YOU HAVE ${currentLevel.time}seconds`, 'START']
    let word = document.querySelector('#word-container h1')
    let countdownword = setInterval(() => {
        // 
        if(wordsOnScreen.innerText.length > 5)
        {
            word.style.fontSize = '100%'
        }
        else
        {
            word.style.fontSize = '150%'
        }
        word.style.color = colors[i]
        word.innerHTML = intr[i];
        
        if(i==2){ userInput.disabled = false;
            userInput.focus();}
        if (i === 3) {clearInterval(countdownword); showWord(); gameInit(); }
        i++;
    }, 1500);
}
//This is responsible for showing a new word in the game
function showWord ()
{
    const wordsOnScreen =document.querySelector('#word-container h1');
    let index = Math.floor(Math.random() * wordsArray.length);
    wordsOnScreen.innerHTML =  wordsArray[index];
    let index1 = Math.floor(Math.random() * colors.length);
    wordsOnScreen.style.color =  colors[index1];
    console.log(colors[index1]);
    

}
//This intializes the game settings all necessary variables
function gameInit ()
{
    
    userScore = score;
    time = 0;
    userInput.value = '';
    barReset(timeBar);
    updateBar(scoreBar, score, userScore);
    document.getElementById('skip-button').addEventListener('click', () => {
        update();
})
    startGame();
   
}
//This handles the game logic
function startGame ()
{   
    
    showWord();
    let stopTime = setInterval(TimeCountDown, 500);
    setTimeout(() => {
        console.log('it is time');
          
      }, currentLevel.time*1000);

      interval  =stopTime
    userInput.addEventListener('input', () => {
        if(userInput.value.length === wordsOnScreen.innerHTML.length)
        {
            if(matchWords())
            {
                
                userInput.value = '';
                userScore--;
                if (userScore==0){
                    endGame('YOU WON');
                }
                updateBar(scoreBar, score, userScore);
                update();
                

            }
        }
    })
    

}
//This handles the time countdown fo rthe game
function TimeCountDown()
{   

    if (time < currentLevel.time)
    {
        time +=  0.5;
        console.log(time);
        
        updateBar(timeBar, currentLevel.time, time);
        
        
        
        
    }
    else if (time >= currentLevel.time)
    {
      endGame('YOU LOST');
      userInput.disabled = true;
        

    }
}
// This restart the time countdown and shows a nnew word
function update () 
{
    time = -0.5
    showWord();
    userInput.focus();
}


function selectLevel (value)
    {   
    
        switch (value)
        {
            case 'easy' : currentLevel = levels.easy   
                           
                            score = currentLevel.wordCount;             
            break;
    
            case 'medium' :currentLevel = levels.medium;    
                            
                            score = currentLevel.wordCount;        
            break;
    
            case 'hard' : currentLevel = levels.hard;  
                       
                        score = currentLevel.wordCount;                        
            break;
        }
    }


function matchWords() {

    switch (currentLevel)
    {
        case levels.easy :   if(wordsOnScreen.innerHTML.toLocaleLowerCase() === userInput.value.toLocaleLowerCase())
                            {   
                                
                                
                                return true;
                            }
                            else
                            {
                                return false;
                            }
                            break;

        case levels.medium :   if(wordsOnScreen.innerHTML === userInput.value)
                            {   
                                
                              
                                return true;
                            }
                            else
                            {
                                return false;
                            }
                            break;
                            
                            
        case levels.hard :   if(wordsOnScreen.innerHTML === userInput.value)
                            {   
                                
                               
                                return true;
                            }
                            else
                            
                            break;
            
    }


}




//This function updates a progressbar visually relative to its current value 
function updateBar (element, maxValue, currentValue)
{
     //the rate at with the bar is increased
    let dy = element.clientHeight / maxValue;

     //updates the height of the bar by changing its top margin
    element.style.marginTop = `${dy * currentValue}px`
    
}

//This function starts a countdown for a progressBar
//It calls updateBar() to visually  update the element
//timeInterval is in seconds (500ms === 0.5)a



function barReset (element)
{
    element.style.marginTop = '0px';
}

// Pushes a page off a screen
function makeInvisible(element) 
{ 
    setTimeout(() => {
        element.style.top = '100vh'
        
        
    }, 500);
    setTimeout(() => {
        element.style.visibility = 'hidden'
        
        
    }, 500);
 }


// bHandles evemts for select level buttons ie easy, medium and hard
const levelsButtons = document.querySelector('#levels-container').children;
    for (let i = 0; i<levelsButtons.length; i++)
    {
        levelsButtons[i].addEventListener('click', function () {
            let that = this.innerText.toLowerCase();
            selectLevel(that)
            console.log(this);
            console.log(this.parentNode);
            this.style.animation = 'scale 0.5s infinite ease-in'
           makeInvisible(this.parentNode);
           userInput.disabled = true;
                startWordCountDown();
            
            // let that = this.innerText.toLowerCase(); //this takes the text of the selected level

             // 
        })
    }
// Adds animation when the start button is clicked
document.getElementById('start-button')
.addEventListener('click', function () {
    console.log(this);
    this.style.animation = 'clicked 0.5s ease-in-out 1 forwards'
    makeInvisible(this.parentNode);
    
})

//This functions generates the message at the end of the game
function endGame (txttt)
{
    const endScreen = document.createElement('div');
    endScreen.setAttribute('id', 'end-screen')
    const endtext = document.createElement('p')
    endScreen.appendChild(endtext)
    endtext.innerText = txttt
    endtext.style.animation = 'textShadow 1s infinite ease-in'
    document.querySelector('body').appendChild(endScreen)
    
    console.log(endScreen);
    clearInterval(interval);
    setTimeout(() => {
        location.reload();
    }, 2500);
    
}


//canvas circle functions

createCircles();

function createCircles()
{const canvas = document.querySelector('canvas')
// canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');
window.addEventListener('resize', () => {
    // canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
})


function Circle (x, y, radius, dx, dy, circol)
{
    let yMin = window.innerHeight + 100;
     this.y = Math.random() * 100 + yMin,
     this.x = Math.random() * window.innerWidth,
     this.dy = Math.random() * 2 + 1,
     this.dx = Math.random() * 2 - 0.5,
     this.radius = Math.random() * 5 + 3;
     const colors = ['#8C489E', '#C32451', '#E94338', '#D2DF4C', '#FF4DAC'];
     this.circol = colors[Math.floor(Math.random() * 5)]  
    this.draw = function () 
    {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2 , false);
        context.fillStyle=this.circol;
        
        context.fill();
        
    }

    this.update = function ()
    {   if(this.y < -30)
        {
            this.y = Math.random() * 100 + yMin;
            this.x = Math.random() * window.innerWidth;
            this.dy = Math.random() * 2 + 1;
            this.dx = Math.random() * 2 - 0.5;
            this.radius = Math.random() * 5 + 3;
            this.circol = colors[Math.floor(Math.random() * 5)]  ;
        }

        
        this.y-=this.dy;
        this.x+=this.dx;
        this.draw();
    }
}

let circleArr = [];



function animate ()
{
    context.clearRect(0, 0, innerWidth, innerHeight);

   

    
    requestAnimationFrame(animate)
    {
        
        circleArr.forEach(circle => {
            
            circle.update();
            });  
    }
}





{for (let i = 0; i < 70; i++) {
   
       circleArr.push(new Circle()) 
       circleArr[i].draw();
       
}
animate();}



}

