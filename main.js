const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

class Field {
    field = [];
    constructor() {
        this.locationX = 0;
        this.locationY = 0;
        for (let a = 0; a < row; a++) {
            this.field[a] = [];
        }
        this.generateField();
    }
    
    generateField() {
        for (let y = 0; y < row; y++) {
            for (let x = 0; x < col; x++) {
                const prob = Math.random();
                this.field[y][x] = fieldCharacter;
            }
        }
    }
    
    runGame() {
        //insert code here
        this.print();
        this.askQuestion();
    }

    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    askQuestion() {
        const answer = prompt('Which way, maggot??? ').toUpperCase();
        //insert code here
    }
}

const myField = new Field();
myField.runGame();