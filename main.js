const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '^';
const mine = 'o';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;
const difficulty = 0.25

class Field {
    field = [];
    constructor() {
        this.locationX = 0;
        this.locationY = 0;
        for (let a = 0; a < row; a++) {
            this.field[a] = [];
        }
        this.generateField();
        this.field[0][0] = pathCharacter
    }
    
    generateField() {
        for (let y = 0; y < row; y++) {
            for (let x = 0; x < col; x++) {
                const prob = Math.random();
                this.field[y][x] = fieldCharacter;
                this.field[y][x] = prob > difficulty ? fieldCharacter : mine
                //this.field[prob+4][prob+4] = mine;
                //this.field.fill(mine, (prob*prob*5), (prob*prob*5));
            }
        }
        const hatLocation = {
            x: Math.floor(Math.random() * row),
            y: Math.floor(Math.random() * col)
        };
        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * row);
            hatLocation.y = Math.floor(Math.random() * col);
        }
        this.field[hatLocation.y][hatLocation.x] = hat;
        return this.field;
    }
    
    isInBounds() {
        return (
          this.locationY >= 0 &&
          this.locationX >= 0 &&
          this.locationY < this.field.length &&
          this.locationX < this.field[0].length
        );
    }
    
    isHat() {
        return this.field[this.locationY][this.locationX] === hat;
    }
    
    isDead() {
        return this.field[this.locationY][this.locationX] === mine;
    }

    runGame() {
        
        let play = true
        while (play) {
            this.print();
            this.askQuestion();
        if (!this.isInBounds()) {
            console.log('This is the LAST TIME! I will have you COURT-MARTIALED for DERELICTION OF DUTY!!!');
            play= false;
        } else if (this.isDead()) {
            console.log('You have died; your remains lie scattered upon the churned fields, supplying nutrients to the plants... if they ever regrow');
            play = false;
        } else if (this.isHat()) {
            console.log('Congratulations, you have exhibited magnificent bravery to recover your attire in the heat of battle, now GET BACK IN FORMATION!!!');
            play = false;
        }
        this.field[this.locationY][this.locationX] = pathCharacter;
        
        }
    }

    print() {
        clear();
        console.log("You are out of uniform, soldier! Where is your cover!?", '\n', "...you lost it???", '\n', "Trooper, do you UNDERSTAND the amount of Worldly Pain you have just visited upon yourself!?? The truth is that you've just lost an expensive piece of ARMY-ISSUE EQUIPMENT. That hat is going to come out of your PAY, and you will remain in this man's Army until you are FIVE HUNDRED AND TEN YEARS OLD, which is the number of years it will take you to pay for a Mark II Powered Combat Safari Hat!", '\n', '\n', "RETURN to the place where you misplaced your cover, RETRIEVE it, and REPORT back to ME! DISMISSED!", '\n', '\n', "press W to move up, S to move down, A to move left, and D to move right");
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    askQuestion() {
        const answer = prompt('Which way, maggot??? ').toUpperCase();
        //insert code here
        switch (answer) {
            case 'W':
              this.locationY -= 1;
              break;
            case 'S':
              this.locationY += 1;
              break;
            case 'A':
              this.locationX -= 1;
              break;
            case 'D':
              this.locationX += 1;
              break;
            default:
              console.log('Enter w, s, a, or d.');
              this.askQuestion();
              break;
        }
    }
}

const myField = new Field();
myField.runGame();