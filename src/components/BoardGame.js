import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Container, Card} from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import ProgressLine from "./TimeLinear";
import "../App.css";

//constants styles for container and button
//Move styles to folder for BoardGame
const styles = {
  boxContainer: {
    backgroundposition: "center",
    backgroundrepeat: "no-repeat",
    height: "500px",
  },
  againButton: {
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    margin: "1px",
    padding: "1px",
    border: "6px",
    borderRadius: "10%",
    background: "#2C3A47",
    width: "100px",
    height: "50px",
    fontFamily: "cursive",
  },
};

/*
using 3 states for boardGame:
1. current - index that indiacted number of question.
2. score - on each right answer score increase by 1.
3. IsAnswer - boolean stata that indiacted if user choose right answer (use to change button color)
*/
function BoardGame(props) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswer, setIsAnswer] = useState(false);

  //user can rerun app after finish game
  let didSelectPlayAgain = props.didSelectPlayAgain;
  let questions = props.data;
  //current question that presented to user
  let currQuest = questions[current];

  /*
  End of Game - user see screen with his finall score, 
  and option to rerun app with new questions.
  */
  if (current >= questions.length) {
    return (
      <div
        className="title-name"
        style={{ display: "grid", textAlig: "center" }}
      >
        <h1>End of Game</h1>
        <br></br>
        <h1>Final Score: {score}</h1>
        <div>
          <Button
            style={styles.againButton}
            onClick={() => {
              didSelectPlayAgain();
            }}
          >
            {" "}
            Play Again
          </Button>
        </div>
      </div>
    );
  }

  /*
  function the received chosen Answer from user,
  using callback to:
  - in order not allow user to click after choosing Answer we adding a condition to check state
  - increase score if user correct
  - in order to allow user see right answer we use sleep for 2 sec until next question apper.
  */
  let onClickAnswer = (option) => {
    let func = () => {
      if (isAnswer) {
        return;
      }
      setIsAnswer(true);
      if (option.isCorrect) {
        setScore(score + 1);
      }
      setTimeout(() => {
        setCurrent(current + 1);
        setIsAnswer(false);
      }, 2000);
    };
    return func;
  };

  //return html
  return (
    <div className="title-name" style={{ display: "grid", textAlig: "center" }}>
      <h1>Trivia Game</h1>
      <Container fixed>
        <div className="first-container">
          <span>
            <label className="labelCategory">Category: </label>
            {currQuest.category}
          </span>
          <Typography sx={{ fontSize: 18 }} gutterBottom>
            <label className="labelCategory">Score: {score}</label>
          </Typography>
        </div>
        <Box style={styles.boxContainer}>
          <Card
            style={{ display: "flex", justifyContent: "center" }}
            variant="outlined"
            sx={{ minWidth: 600 }}
          >
            <CardContent>
              {isAnswer ? <ProgressLine animationTime={1500} /> : <></>}
              <Typography width={800} component={"span"}>
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: `<label class="question-label"> Question ${
                      current + 1
                    }/10 </label><br> <label class="question-content">${
                      currQuest.question
                    }</label>`,
                  }}
                  variant="h5"
                  component="div"
                ></Typography>
                <Grid
                  container
                  style={{ maxWidth: "70%", display: "center" }}
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  {currQuest.answers.map((option) => {
                    let color = "#2c3e50";
                    if (isAnswer) {
                      color = option.isCorrect ? "#27ae60" : "#e74c3c";
                    }
                    return (
                      <Grid item xs={6}>
                        <Button
                          style={{ width: "100%", backgroundColor: color }}
                          variant="contained"
                          disableRipple={isAnswer}
                          disableElevation={isAnswer}
                          onClick={onClickAnswer(option)}
                        >
                          {option.answer}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default BoardGame;
