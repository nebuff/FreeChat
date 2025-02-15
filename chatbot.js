const fs = require('fs');
const path = require('path');
const readline = require('readline');
const placeholders = require('./examples/placeholders');

class ChatBot {
    constructor() {
        this.examples = this.loadExamples();
    }

    loadExamples() {
        const examplesDir = path.join(__dirname, 'examples');
        const files = fs.readdirSync(examplesDir).filter(file => file.endsWith('.txt'));
        const examples = [];

        files.forEach(file => {
            const content = fs.readFileSync(path.join(examplesDir, file), 'utf-8');
            const [questionPart, answerPart] = content.split('Answer:');
            const questions = questionPart
                .replace('Question:', '')
                .split(',')
                .map(q => q.trim().toLowerCase())
                .filter(q => q);
            
            let answers;
            if (answerPart.includes('-')) {
                answers = answerPart
                    .split('\n')
                    .map(a => a.trim())
                    .filter(a => a && a.startsWith('-'))
                    .map(a => a.substring(1).trim());
            } else {
                answers = [answerPart.trim()];
            }
            
            examples.push({ questions, answers });
        });

        return examples;
    }

    getResponse(userInput) {
        const normalizedInput = userInput.trim().toLowerCase();
        
        for (const example of this.examples) {
            for (const question of example.questions) {
                const exactMatch = new RegExp(`^${question}$`, 'i');
                const partialMatch = new RegExp(question, 'i');
                if (question.includes(':')) {
                    // For error messages, use partial matching
                    if (partialMatch.test(normalizedInput)) {
                        return this.getRandomAnswer(example.answers);
                    }
                } else if (exactMatch.test(normalizedInput)) {
                    // For regular questions, use exact matching
                    return this.getRandomAnswer(example.answers);
                }
            }
        }
        return this.generateMessage();
    }

    getRandomAnswer(answers) {
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        return this.replacePlaceholders(randomAnswer);
    }

    replacePlaceholders(answer) {
        return answer.replace(/\(([^)]+)\)/g, (_, key) => {
            return placeholders[key] || key;
        });
    }

    generateMessage() {
        const allAnswers = this.examples.flatMap(example => example.answers);
        const randomParts = [];
        for (let i = 0; i < 3; i++) {
            const randomAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];
            const randomPart = randomAnswer.split(' ').slice(0, 3).join(' ');
            randomParts.push(randomPart);
        }
        return randomParts.join(' ') + '...';
    }
}

const bot = new ChatBot();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("ChatBot is running. Type your questions below:");

rl.on('line', (input) => {
    console.log(`> ${input}`);
    console.log(`- ${bot.getResponse(input)}`);
});
