//This is awesome
function log(message) {
  console.log(message);
}

//global variables
let balance=100
let stock= 50
let price= 5

//functions
function hrsToMins(hours){
    //conversion
    let result=hours*60;
    console.log(result);
    //returning
    return result;
}
//weird and has to go after
hrsToMins(1)

function ozToCups(ounces){
    let result=ounces/8
    console.log(result+" Cups");
    return result;
}
ozToCups(32)

function sellItem(quantity){
    //check stock
    if(stock>=quantity){
        //reduce my stock
        stock-=quantity;
        balance+=price*quantity
        console.log('purchase complete','balence $'+balance,'Stock left',stock)
    }
    else{
        console.log('transaction incomplete')
    }
}
sellItem(15)

let player={
    age:4000,
    height:7,
    name:'Bob',
    health:100,
    outfit:{
        color:"blue",
        size:"xs",
        underwater: true
    }
}
//player then one of the below for specific atribute
console.log(player.name)
//or console.log(player['name'])

// change attribute
player.age=7;
console.log(player.age)
//delete attribute
delete player.name
console.log(player)
//create attribute
player.legs="long";
console.log(player)
console.log(player.outfit)

//functions in objects(method)
let hero={
    health:100,
    fun:0,
    play: function(food){
        if(food=="apple"){
            this.health+=10;
        }
        else if(food=="candy"){
            this.health+=5;
            this.fun+=5;
        }
    }
}
hero.play('candy')
log(hero)

//loops
function sendHelp(){
    log("send help")
}
let i=0;
while(i<10){
    sendHelp();
    i++
    //i=i+1
    //i+=1
}
for(a=0;a<10;a++){
    sendHelp()
}

//arrays or lists
let list=['book','computer','notebook','pencils']
//change list
list[0]='Physics book'
//add to list
list.push('protractor')
//remove from list
list.pop()
log(list)
//access a specific item
let backpack=list[3]
log(backpack)
//access last item in array
let last=list[list.length-1]
log(list.length)
log(last)
//list of objects
let characters=[hero,player]
log(characters)