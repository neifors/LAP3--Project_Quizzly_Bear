import React, {useState, useEffect} from 'react';
import './style.css'
import Countdown from 'react-countdown'
import ProgressBar from '../../components/ProgressBar'

const Game = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [questions, setQuestions] = useState([]);
    let [currentQuestion, setCurrentQuestion] = useState();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [shuffled, setShuffled] = useState([]);
    const [score, setScore] = useState(0);
    const [numberCorrect, setNumberCorrect] = useState(0);
    const [difficulty, setDifficulty] = useState("");
    const [category, setCategory] = useState("");
    const [expiryTime, setExpiryTime] = useState();
    const [secondsLeft, setSecondsLeft] = useState(20);

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
            const regex = /&#?\w+;/g;
            for (let i of localQuestions.results) {
                i.question = i.question.replace(regex, '');
                i.correct_answer = i.correct_answer.replace(regex, '');
                let arr = [];
                for (let j of i.incorrect_answers) {
                    arr.push(j.replace(regex, ''));
                }
                i.incorrect_answers = arr;
            }
            //set the whole array for all the questions that will be asked
            setQuestions(localQuestions.results);
            //set global difficulty and category so we can change scores awarded appropriately
            //and send back relevant category to the server later
            setDifficulty(event.target.difficulty.value);
            setCategory(event.target.category.value);

            resetTimer();
            setCurrentQuestion(localQuestions.results[0]);
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
            this.state = {
                answer: props.answer,
                selectedAnswer: props.selectedAnswer,
                setSelectedAnswer: props.setSelectedAnswer
            }
            this.quizAnswerClick = this.quizAnswerClick.bind(this);
        }

        quizAnswerClick() {
            this.state.setSelectedAnswer(this.state.answer, this.forceUpdate());
        }

        render() {
            let classes = '';
            if (this.state.selectedAnswer === this.state.answer) {
                classes = 'selectedAnswer';
            }
            return (
                <>
                    <button onClick={this.quizAnswerClick} className={classes} type="button">{this.state.answer}</button><br />
                </>
            )
        }
    }

    function shuffleAnswers() {
        let mergedAnswers = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer);
        let localShuffled = mergedAnswers
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        setShuffled(localShuffled);
    }

    function submitAnswer() {
        if (selectedAnswer === currentQuestion.correct_answer) {
            switch (difficulty) {
                case 'easy':
                    setScore(score + 1);
                    break;
                case 'medium':
                    setScore(score + 2);
                    break;
                case 'hard':
                    setScore(score + 4);
                    break;
            }
            setNumberCorrect(numberCorrect + 1);
        }
        setSelectedAnswer("");
        if (questionIndex + 1 < 10) {
            resetTimer();
            setCurrentQuestion(questions[questionIndex + 1]);
            setQuestionIndex(questionIndex + 1);
        } else {
            setGameFinished(true);
        }
        RenderPage();
    }

    function RenderQuestionButtons() {
        return (
            <>
            	<RenderQuestionButton answer={shuffled[0]} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
            	<RenderQuestionButton answer={shuffled[1]} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
            	<RenderQuestionButton answer={shuffled[2]} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
            	<RenderQuestionButton answer={shuffled[3]} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
                <button onClick={submitAnswer} type="submit" value="Submit" id="quizSubmitButton">Next Question</button>
            </>
        );
    }

    useEffect(() => {
        if (gameStarted) {
            shuffleAnswers();
            resetTimer();
        }
    }, [currentQuestion])

    useEffect(() => {
        console.log(currentQuestion)
        RenderQuestionButtons();
    }, [shuffled])

    function handleTimerAdvance() {
        if (document.querySelector("#secondsTimer")) {
            submitAnswer();
        }
    }

    function TimerBar(props) {
        if (document.querySelector("#secondsTimer")) {
            return (
                <>
                    <ProgressBar color={"#ff7979"} width={"101%"} value={props.secondsLeft} max={20} />
                </>
            )
        } else {
            return (<></>);
        }
    }

    function Timer(props) {
        const renderer = ({seconds}) => (
            <span id="secondsTimer">{seconds - 1}</span>
        )

        function updateSeconds() {
            props.setSecondsLeft(parseInt(document.querySelector("#secondsTimer").textContent))
        }

        return (
            <>
                <p>Time: <Countdown date={props.time} renderer={renderer} onStart={updateSeconds} onTick={updateSeconds} onComplete={handleTimerAdvance} /></p>
            </>
        )
    }

    function resetTimer() {
        setExpiryTime(Date.now() + 21000);
    }

    function QuestionTitle() {
        return (
            <>
                <h1>{questionIndex + 1}. {currentQuestion.question}</h1>
            </>
        )
    }

    function Counter() {
        return (
            <>
                <p>Number Correct: {numberCorrect}</p>
                <p>Score: {score}</p>
            </>
        );
    }

    function RenderPage() {
        if (gameFinished) {
            return (
                <>
                    <Counter />
                    <h1>GG</h1>
                </>
            )
        } else if (gameStarted) {
            return (
                <>
                    <TimerBar secondsLeft={secondsLeft} />
                	<Timer setSecondsLeft={setSecondsLeft} time={expiryTime} />
                    <Counter />
                    <QuestionTitle />
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
