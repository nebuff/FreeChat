# Free Chat

This is a simple chat bot that can respond to various questions and error messages based on examples provided in text files. The bot can also generate its own messages by combining parts of the answers it has learned.

## Features

- Responds to predefined questions and error messages
- Generates its own messages when it doesn't find an exact match
- Supports placeholders for dynamic responses

## Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory.

```sh
cd /Users/nebuff-vje/Documents/Developing/Simple Chat Bot
```

3. Install the necessary dependencies (if any).

## Running the Chat Bot

To run the chat bot, you can use the provided shell script:

1. Make the script executable by running the following command in the terminal:

```sh
chmod +x "/Users/nebuff-vje/Documents/Developing/Simple Chat Bot/run"
```

2. Add the project directory to your PATH by adding the following line to your shell configuration file (e.g., `.zshrc` or `.bashrc`):

```sh
export PATH=$PATH:"/Users/nebuff-vje/Documents/Developing/Simple Chat Bot"
```

3. After updating your shell configuration file, reload it by running:

```sh
source ~/.zshrc  # or source ~/.bashrc
```

4. Now, you can run the chat bot by simply typing `run` in the terminal:

```sh
run
```

## Examples

Here are some example interactions with the chat bot:

```plaintext
ChatBot is running. Type your questions below:
> What's your name?
- My name is ChatBot.
> Tell me a joke
- Why don't scientists trust atoms? Because they make up everything!
> NameError: name 'x' is not defined
- This error occurs when you try to use a variable that hasn't been declared. Make sure to declare the variable before using it.
> ZeroDivisionError: division by zero
- This error occurs when you try to divide a number by zero. Make sure the divisor is not zero.
> What time is it?
- The time is (TIME)
> What's the weather like?
- The weather is (WEATHER)
```

## Adding New Examples

To add new examples, create a new text file in the `examples` directory with the following format:

```plaintext
Question: Your question here, Another version of the question
Answer: Your answer here
```

For multiple answers, use the following format:

```plaintext
Question: Your question here, Another version of the question
Answer:
- First answer
- Second answer
- Third answer
```

## Placeholders

You can use placeholders in your answers, which will be replaced with dynamic values. The placeholders are defined in the `placeholders.js` file in the `examples` directory. For example:

```javascript
// filepath: /Users/nebuff-vje/Documents/Developing/Simple Chat Bot/examples/placeholders.js
module.exports = {
    TIME: new Date().toLocaleTimeString(),
    DATE: new Date().toLocaleDateString(),
    WEATHER: "sunny"
};
```

## License

This project is licensed under the MIT License.
