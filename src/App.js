import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Container , Card } from 'semantic-ui-react';
import BoardGame from "./components/BoardGame";
import axios from "axios";

var ApiConfig = {
  method: "get",
  url: "https://opentdb.com/api.php?amount=10",
};

//Async function for getting resonse from API.
//create new object with shuffle questions.
async function getData() {
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

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    getData().then((data) => {
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
          <CircularProgress
            style={{
              padding: "50px",
              color: "white",
            }}
          />
        </Card>
      </Container>
    );
  }

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

export default App;
