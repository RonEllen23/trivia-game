import { useEffect, useState } from "react";
import { Progress } from 'semantic-ui-react'
import "../App.css";

function ProgressLine(props) {
  const [progress, setProgress] = useState(0);

  let animationTime = props.animationTime;

  /*progress line that indicate how much time left to present next line
  each interval will take 2 seconds.
  trigger when user choose an answer
  */
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        return oldProgress + 1;
      });
    }, animationTime / 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Progress style={{ marginTop: "10px"}} percent={progress} indicating />;
}

export default ProgressLine;
