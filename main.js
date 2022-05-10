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
        
        //insert code here
        
        this.print();
        this.askQuestion();
    }

    print() {
        clear();
        console.log("You are out of uniform, soldier! Where is your cover!?", '\n', "...you lost it???", '\n', "press i to move up, k to move down, j to move left, and l to move right");
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    askQuestion() {
        const answer = prompt('Which way, maggot??? ').toUpperCase();
        //insert code here
        /*switch (answer) {
            case 'I':
              this.locationY -= 1;
              break;
            case 'K':
              this.locationY += 1;
              break;
            case 'J':
              this.locationX -= 1;
              break;
            case 'L':
              this.locationX += 1;
              break;
            default:
              console.log('Enter i, k, j, or l.');
              this.askQuestion();
              break;
        }*/
    }
}

const myField = new Field();
myField.runGame();