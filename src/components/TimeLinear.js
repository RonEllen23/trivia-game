import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

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

  return <LinearProgress variant="determinate" value={progress} />;
}

export default ProgressLine;
