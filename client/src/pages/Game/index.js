import React, {useState} from 'react';
import './style.css'

const Game = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [question, setQuestion] = useState("");

    function updateQuestion() {
    }

    function startGame(event) {
        event.preventDefault();
        setQuestion("yoarstarst");
        setGameStarted(true);
    }

    function RenderPage() {
        if (gameStarted) {
            return (
                <>
                <h1>{question}</h1>
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
                        <option value="Sports">Sports</option>
                        <option value="History">History</option>
                        <option value="Geography">Geography</option>
                        <option value="Animals">Animals</option>
                    </select></label>
                    <input type="submit" value="Start the quiz!" />
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
