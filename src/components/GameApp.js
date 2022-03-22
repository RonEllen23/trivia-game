import { useEffect, useState } from "react";
import {Container, Card, Loader, Dimmer} from 'semantic-ui-react';
import BoardGame from "./BoardGame";
import axios from "axios";
import "../App.css";
import "../Styles/GameApp.css";


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

    const ApiConfig = {
        method: "get",
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
            <Container text className="container-gameApp">
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
                    <Dimmer active inverted >
                        <Loader className="loader-gameApp" size='large'
                        />
                    </Dimmer>
                </Card>
            </Container>
        );
    }

    return (
            <div className="App">
                <BoardGame
                    data={data}
                    category={category}
                    difficulty={difficulty}
                    ApiConfig={ApiConfig}
                    didSelectPlayAgain={(apiConfig) => {
                        setData(null);
                        getData(apiConfig).then((data) => setData(data));
                    }}
                />
            </div>
    );
}

export default GameApp;
