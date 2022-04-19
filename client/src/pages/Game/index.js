import React, {useState} from 'react';
import './style.css'

const Game = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState("");

    function updateCurrentQuestion() {
    }

    function startGame(event) {
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
        let url = `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${event.target.difficulty.value}&category=${parsedCategory}`;
        console.log(url)
        setQuestions();
        setGameStarted(true);
    }

    function RenderPage() {
        if (gameStarted) {
            return (
                <>
                <h1>{currentQuestion}</h1>
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
