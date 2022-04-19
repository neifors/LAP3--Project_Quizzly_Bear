import React, {useState} from 'react';
import './style.css'

const Game = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");

    function updateCurrentQuestion() {
    }

    async function startGame(event) {
        //https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple
        event.preventDefault();
        let parsedCategory;
        switch (event.target.category.value) {
            case 'General Knowledge':
                parsedCategory = 9;
                break;
            case 'Sports':
                parsedCategory = 21;
                break;
            case 'History':
                parsedCategory = 23;
                break;
            case 'Geography':
                parsedCategory = 22;
                break;
            case 'Animals':
                parsedCategory = 27;
                break;
            case 'Science & Nature':
                parsedCategory = 17;
                break;
        }
        let url = `http://opentdb.com/api.php?amount=10&type=multiple&difficulty=${event.target.difficulty.value}&category=${parsedCategory}`;
        let localQuestions;
        try {
            const questionsJson = await fetch(url);
            localQuestions = await questionsJson.json();
            if (localQuestions.response_code != 0) {
                throw 'Response code was not OK!';
            }

            //remove horrible html tags from our questions that are recieved for some reason
            const regex = /&\w+;/g;
            for (let i of localQuestions.results) {
                i.question = i.question.replace(regex, '');
                i.correct_answer = i.correct_answer.replace(regex, '');
                let arr = [];
                for (let j of i.incorrect_answers) {
                    arr.push(j.replace(regex, ''));
                }
                i.incorrect_answers = arr;
            }

            setQuestions(localQuestions.results);
            setCurrentQuestion(localQuestions.results[0]);
            console.log(localQuestions)
        } catch (error) {
            console.log(error);
            console.log(localQuestions);
            setCurrentQuestion("Error! See the console for details")
        }
        setGameStarted(true);
    }

    class RenderQuestionButton extends React.Component {
        constructor(props) {
            super(props);
        }

        quizAnswerClick() {
            console.log('astarts')
        }

        render() {
            return (
                <>
                    <button onClick={this.quizAnswerClick} type="button">{this.props.answer}</button><br />
                </>
            )
        }
    }

    function RenderQuestionButtons() {
        console.log(currentQuestion)
        let mergedAnswers = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer);
        let shuffled = mergedAnswers
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        return (
            <>
            	<RenderQuestionButton answer={shuffled[0]} />
            	<RenderQuestionButton answer={shuffled[1]} />
            	<RenderQuestionButton answer={shuffled[2]} />
            	<RenderQuestionButton answer={shuffled[3]} />
                <button type="submit" value="Submit" id="quizSubmitButton">Next Question</button>
            </>
        );
    }

    function RenderPage() {
        if (gameStarted) {
            return (
                <>
                    <h1>{questionIndex + 1}. {currentQuestion.question}</h1>
                    <RenderQuestionButtons />
                </>
            )
        } else {
            return (
                <>
                <h1>Welcome to Quizzly Bears🐻</h1>
                <form onSubmit={startGame}>
                    <label id="difficultyLabel">Difficulty:
                    <select name="difficulty" id="difficulty">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select><br />
                    </label>
                    <label id="categoryLabel">Category:
                    <select name="category" id="category">
                        <option value="General Knowledge">General Knowledge</option>
                        <option value="History">History</option>
                        <option value="Science & Nature">Science & Nature</option>
                        <option value="Geography">Geography</option>
                        <option value="Sports">Sports</option>
                        <option value="Animals">Animals</option>
                    </select></label>
                    <button type="submit">Start the Quiz!</button>
                </form>
                </>
            )
        }
    }

    return (
    <>
        <RenderPage />
    </>
    );
}

export default Game;
