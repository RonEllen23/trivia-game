import { useEffect, useState } from "react";
import {Container, Card, Loader, Dimmer} from 'semantic-ui-react';
import BoardGame from "./BoardGame";
import axios from "axios";

//Example for URL: https://opentdb.com/api.php?amount=10&category=22&difficulty=medium


//Async function for getting resonse from API.
//create new object with shuffle questions.
async function getData(ApiConfig) {
    console.info("Hello   "+ ApiConfig.url);
    let data = await axios(ApiConfig);
    let results = data.data.results;
    return results.map((res) => {
        let answersList = [{ answer: res.correct_answer, isCorrect: true }];
        res.incorrect_answers.forEach((ans) => {
            answersList.push({ answer: ans, isCorrect: false });
        });
        answersList = answersList.sort(() => Math.random() - 0.5);
        return {
            category: res.category,
            type: res.type,
            difficulty: res.difficulty,
            question: res.question,
            answers: answersList,
        };
    });
}

function GameApp(props) {

    const category = props.category;
    const difficulty = props.difficulty;

    //Example for URL: https://opentdb.com/api.php?amount=10&category=22&difficulty=medium
    let ApiConfig = {
        method: "get",
        // url: "https://opentdb.com/api.php?amount=10"+"&category="+category+"&difficulty="+difficulty
        url: `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`
    };

    const [data, setData] = useState();
    //Check if newState for url is necessary and add it to useEffect

    useEffect(() => {
        getData(ApiConfig).then((data) => {
            setData(data);
        });
    }, []);

    //Spinner components while getting data.
    if (!data) {
        return (
            <Container>
                <h1
                    style={{
                        color: "white",
                        textAlign: "center",
                        fontFamily: "monospace",
                    }}
                >
                    Loading Questions...
                </h1>
                <br></br>
                <Card justifyContent={"center"} sx={{ display: "flex" }}>
                    <Dimmer active>
                        <Loader  size='large'
                        />
                    </Dimmer>
                </Card>
            </Container>
        );
    }

    //const LoaderExampleInlineCentered = () => <Loader active inline='centered' />
    return (
        <div className="App">
            <BoardGame
                data={data}
                didSelectPlayAgain={() => {
                    setData(null);
                    getData().then((data) => setData(data));
                }}
            />
        </div>
    );
}

export default GameApp;
