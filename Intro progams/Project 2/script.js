//just a cool function so I don't have to write console anymore
function log(message) {
    console.log(message);
  }
//making wizard
  let wizard = {
    health: 100,
    magic: 50,
    age: 70,
    //wizard attack functions
    fight: function(damage) {
        if (damage == "wand" && this.magic > 15 && this.age < 100) {
            bigPlant.health -= 50;
            this.magic -= 15;
            this.age += 5;
        } else if (damage == "smack") {
            bigPlant.health -= 10;
        }
    }
};

//wizard's backpack list
let backpack = ["potion", "magic book", "cloak"];

//making a big plant
let bigPlant = {
    health: 200,
    attack: 20,
    growth: 10,
    //making attack and heal functions
    fight: function(move) {
        if (move == "hit") {
            wizard.health -= this.attack;
            this.attack += 5;
        } else if (move == "heal") {
            this.health += this.growth;
        }
    }
};

//making big plants array of resources
let swamp = ["moss", "sunlight", "rocks"];

//wizard attack loop
while (wizard.magic > 15) {
    wizard.fight("wand");
}
while (wizard.magic < 15 && bigPlant.health > 0) {
    wizard.fight("smack");
}

//big plant attack loop
for (let i = 0; i < 50; i++) {
    if (i % 3 == 0 && wizard.health > 0) {
        bigPlant.fight("heal");
    }
    else if (wizard.health > 0) {
        bigPlant.fight("hit");
    }
}
//wizard war cry
function warCry() {
    console.log("hyaaaa");
}
while (wizard.health > 0 && bigPlant.health > 0) {
    warCry();
}
//win conditions
if(bigPlant.health<=0){
    console.log('wizard wins')
}

if(wizard.health<=0){
    console.log('plant wins')
}