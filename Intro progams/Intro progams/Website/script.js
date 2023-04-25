
// //select what you want to change
// let sign=document.getElementById('sign')
//     console.log(sign)
// //modify
// console.log(sign.textContent)
// sign.textContent="javascript"
// console.log(sign.textContent)
// sign.innerHTML=sign.innerHTML +  ' please work'
// //changing style
// sign.style.color='blue'

// //multidemensional arrays
// let array=[[[1,2,3],[4,5,6]],[[14,15,16],[17,18,19]],[[8,9,10],[11,12,13]],[[20,21,22],[23,24,25]]]

// console.log(array)
function log(message) {
    console.log(message);
  }
let question={
    ayo:"How many Koroks are in Breath Of The Wild ?",
    alt:[800,899,900,999],
    correctAnswer:2
}
 
let listQuestions=[
{
    ayo:"How many Koroks are in Breath Of The Wild ?",
    alt:[800,899,900,999],
    correctAnswer:2
},
{
    ayo:"How many areas are in Breath of the Wild",
    alt:[10,12,15,17],
    correctAnswer:2
},
{
    ayo:"Which Shield allows you to surf fastest",
    alt:["Traveller's Shield","Radiant Shield","Hylian Shield","Royal Guard Shield"],
    correctAnswer:1
},
{
    ayo:"Which Weapon has the most transferable durability",
    alt:["Spring Loaded Hammer","Biggoron Sword","Master Sword","Mipha's Spear"],
    correctAnswer:0
},
{
    ayo:"Glitch Question: What is a BIL",
    alt:["Bomb Impact Launch","Bow Increased Lighting","Boomerang Invicibility Lock","Big Information Loop"],
    correctAnswer:0
},
{
    ayo:"Glitch Question: If you overload the game with effects, what happens",
    alt:["Crashes, Duh","Allows you to hack the game","Allows you to duplicate your holding item","Probably nothing"],
    correctAnswer:2
},
{
    ayo:"Speedrunning Question: How fast can Botw be beaten",
    alt:["More than 10 hours",'Around 1 hour','Around 45 minutes','Less than 30 minutes'],
    correctAnswer:3
},
{
    ayo:"Speedrunning Question: Which is NOT a 100% requirement",
    alt:["All Map Locations","All Weapon Upgrades","All Korok Seeds","All Compendium Photos"],
    correctAnswer:1
},
{
    ayo:"How many hours have I spent in botw",
    alt:["100 or less","Around 500","Around 800","1000+"],
    correctAnswer:2
},
{
    ayo:"What was the 4th question in this Quiz",
    alt:["How fast can Botw be beaten","Which Weapon has the most transferable durability","What is a BIL","How many areas are in Breath of the Wild"],
    correctAnswer:1
}

]
let app={
    start: function(){
        this.currPosition=0
        this.score=0
        let alts=document.querySelectorAll('.alt')
        //bind approach
        // alts.forEach(function(element,index){
        //     element.addEventListener('click',function(){
        //         //check correct answer
        //         this.checkAnswer(index)
        //         }.bind(this));
        //     }.bind(this));
            //arrow function approach
            alts.forEach((element,index)=>{
                element.addEventListener('click',()=>{
                    //check correct answer
                    this.checkAnswer(index)
                    });
                });
                this.updateStats()
            this.showQuestion(question);
        },
        showQuestion: function(k){
            this.currQuestion=k
            //select elemente
            let ayoDiv=document.getElementById('ayo')
            //modify
            ayoDiv.textContent=k.ayo
        
            //select query
            let alts=document.querySelectorAll('.alt')
            alts.forEach(function(element,index){
                element.textContent=k.alt[index]; 
}
)},
checkAnswer: function(userSelected){
    if(this.currQuestion.correctAnswer==userSelected){
        log('correct answer')
        this.score++
        this.showResult(true)
    }
    else{
        log('wrong answer')
        this.showResult(false)
    }
    this.increasePosition();
    this.updateStats()
    //show next question
    this.showQuestion(listQuestions[this.currPosition]);
    },
    increasePosition:function(){
        this.currPosition++
        //if you get end, want start over
        if(this.currPosition==listQuestions.length){
        this.currPosition=0;
        this.score=0
        let resultDiv=document.getElementById('result')
        resultDiv.textContent="Guess it's over already"
    }
    },
    updateStats:function(){
        //select score element
        let scoreDiv=document.getElementById('score');
        //display score
        scoreDiv.textContent="Your Score: "+this.score;
    },
    showResult: function(isCorrect) {
        //select DOM element
        let resultDiv = document.getElementById('result');
        let result = '';
        //check if right or not
        if (isCorrect) {
            let statements = ["Yeah you probably got it", "Ayo they're cheating", "You just won a million dollars","But are you sure you're right","You got it","By jove you're right"];
            let randomIndex = Math.floor(Math.random() * statements.length);
            result = statements[randomIndex];
        } else {
            //get current question
            let currQuestion = listQuestions[this.currPosition];
            //get correct answer
            let correctAnswerIndex = currQuestion.correctAnswer;
            let correctAnswerText = currQuestion.alt[correctAnswerIndex];
            //display a random statement
            let statements = ["Sorry, incorrect answer", "Not quite right", "Foooool","How could you get it wrong","Unbelivably disapointing", 'Dingus','Take the L','Just do better'];
            let randomIndex = Math.floor(Math.random() * statements.length);
            result = statements[randomIndex] + ", the correct answer is " + correctAnswerText;
        }
        resultDiv.textContent = result;
    }
}
app.start()

//select elemente
let btn=document.getElementById('push');
//listening to elemente
btn.addEventListener('click',function(){
    log('clicked?!')
})
var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', 'rgb(39, 72, 100)', '#1F87FF', '#1fffa9', '#ff1fff', 'rgb(255, 31, 80)', '#e9ff1f', '#ff841f', '#1fffa9', '#c01fff'];
document.getElementById('push').addEventListener('click', function() {
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
});


