import React from "react";
import { useState } from "react";

import {Container, Card, Grid, Button, Step, Icon, Advertisement, Table} from 'semantic-ui-react';
import "../Styles/BoardGame.css";
import ProgressLine from "./TimeLinear";
import {Link} from "react-router-dom";

//constants styles for container and button
//Move styles to folder for BoardGame
const styles = {
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
    textAlign: "center",
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
  let category = props.category;
  let difficulty = props.difficulty;
  let apiConfig = props.ApiConfig;
  //current question that presented to user
  let currQuest = questions[current];

  /*
  End of Game - user see screen with his finall score, 
  and option to rerun app with new questions.
  */

  //TODO: check if button is clicked redirect to Setting or GameAPP with same Props
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
          <Button.Group>
            <Button
                style={styles.againButton}
                onClick={() => {
                  apiConfig.url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`
                  didSelectPlayAgain(apiConfig);
                }}
            >
              {" "}
              Play Again
            </Button>
            <Button.Or />
            <Button style={styles.againButton} > <Link to="/Setting"> {" "} Select New</Link> </Button>
          </Button.Group>
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
    <div className="title-name">
      <h1>Trivia Game</h1>
      <Container fixed>
        <div className="first-container">
          <span>
            <label className="labelCategory">Category: </label>
            {currQuest.category}
          </span>
          <span sx={{ fontSize: 18 }} gutterBottom>
            <label className="labelCategory">Score: {score}</label>
          </span>
        </div>
        <Container text className="question-content-container">
         <div>
            <Advertisement   unit="leaderboard"  dangerouslySetInnerHTML={{
               __html: `<label class="question-label"> Question ${
                   current + 1
               }/10 </label><br> <label class="question-content">${
                   currQuest.question
               }</label>`,
             }}
             variant="h5"
             component="div">
           </Advertisement>
         </div>
        <div>
            <Grid className="answers-boardGame-grid">
              <Grid.Column>
                {currQuest.answers.map((option) => {
                  let color = "#2c3e50";
                  if (isAnswer) {
                    color = option.isCorrect ? "#27ae60" : "#e74c3c";
                  }
                  return (
                      <div >
                        <Table className="each-answer-grid">
                          <Button
                              style={{ backgroundColor: color, color: "white", width: "100%"}}
                              disableRipple={isAnswer}
                              disableElevation={isAnswer}
                              onClick={onClickAnswer(option)}
                          >
                            {option.answer}
                          </Button>
                        </Table>
                      </div>
                  );
                })}
              </Grid.Column>
            </Grid>
        </div>
        </Container>
      </Container>
    </div>
  );
}

export default BoardGame;
