import React, {useState, useEffect} from 'react';
import './style.css'
import './dropdown.css'
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
        //unfortunately, the api does not support multiple categories that don't include everything in their database
        //so we can't just have the 6 categories specified above unless we made many api requests
        let url = `http://opentdb.com/api.php?amount=10&type=multiple&category=${parsedCategory}`;
        if (event.target.difficulty.value !== "mixed") {
            url = url.concat(`&difficulty=${event.target.difficulty.value}`);
        }
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
            switch (currentQuestion.difficulty) {
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
                    <ProgressBar color={"#ff7979"} width={"102%"} value={props.secondsLeft} max={20} />
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
                <h3 id="timeCounter">Time: <Countdown date={props.time} renderer={renderer} onStart={updateSeconds} onTick={updateSeconds} onComplete={handleTimerAdvance} /></h3>
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

    function Counter(props) {
        function MainCounterComponent() {
            return (
                <>
                    <h2>Number Correct: {numberCorrect}</h2>
                    <h2>Score: {score}</h2>
                </>
            )
        } 
        if (props.gameFinished) {
            return (
                <>
                    <div id="counters" className="endOfGameCounterPosition">
                        <MainCounterComponent />
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div id="counters" className="defaultCounterPosition">
                        <MainCounterComponent />
                    </div>
                </>
            );
        }
    }

    function RenderPage() {
        if (gameFinished) {
            return (
                <>
                    <Counter gameFinished={gameFinished} />
                    <h1>GG</h1>
                </>
            )
        } else if (gameStarted) {
            return (
                <>
                    <TimerBar secondsLeft={secondsLeft} />
                	<Timer setSecondsLeft={setSecondsLeft} time={expiryTime} /><br />
                    <Counter gameFinished={gameFinished} />
                    <QuestionTitle />
                    <RenderQuestionButtons />
                </>
            )
        } else {
            return (
                <>
                <h1 id="mainTitle">Welcome to Quizzly Bears' quiz 🐻</h1>
                <form onSubmit={startGame}>
                    <label id="difficultyLabel">Difficulty:
                    <br /><select name="difficulty" id="difficulty">
                        <option value="mixed">🤹 Mixed</option>
                        <option value="easy">🤣 Easy</option>
                        <option value="medium">🤔 Medium</option>
                        <option value="hard">😳 Hard</option>
                    </select><br />
                    </label>
                    <label id="categoryLabel">Category:
                    <br /><select name="category" id="category">
                        <option value="General Knowledge">📚 General Knowledge</option>
                        <option value="History">🕰️ History</option>
                        <option value="Science & Nature">🧪 Science & Nature</option>
                        <option value="Geography">🌍 Geography</option>
                        <option value="Sports">🏃‍♂️ Sports</option>
                        <option value="Animals">🦓 Animals</option>
                    </select></label>
                    <button id="startTheQuiz" type="submit">Start the Quiz!</button>
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
