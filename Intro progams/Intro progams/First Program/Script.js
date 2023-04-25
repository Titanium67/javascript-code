//how to make a variable
let scrible=1000;
var pet='bearded dragon';
const cheese=true;
console.log(scrible);
console.log(pet);
console.log(cheese);

//math
let a=3.14159265358979328462643383279;
let b=1;
let c=a**b
console.log(c)

//modulus
let o=a%b
console.log(o)

let num=0.2
if(num%2==0){
    console.log("even number")
}
else{
    console.log("odd number")
}

let age=17;
let money=true;
let condition2=money!==true ||age<10;
let condition1=age>=17 && money
let condition3=age<17 && money
if (condition1){
    console.log("Watch R rated movies")
}
else if(condition3){
    console.log("Need a parent")
}
else if(condition2){
    console.log('defintly no movie')
}
else{
    console.log("no go movie")
}
let time=42
if(time){
    console.log("Answer")
}
//Assignment be started
//Setting variables for student doing work
let hours=6
let homework=12
let determination=3
//setting conditions
if(homework>10 && determination<5 && hours<3){
    console.log("I'm too tired to do Homework")
}
else if(hours>5 && homework>10 || determination<=3){
    console.log("This might take a while")
}
else{
    console.log("I'll have this done soon")
}
//calculating what they will feel like tomorrow
let work=homework/determination
let sleep=hours-work
let tomorrow=determination+sleep
if(tomorrow<5){
    let tomorrow=true;
    console.log("exhausted")
}
else{
    let tomorrow=false;
    console.log("Kinda eh")
}

//what += does and ++ does
let owl=17
let bear=20
console.log(owl+=bear)
owl++
owl--
owl-=bear
console.log(owl)
owl+=bear
console.log(owl)