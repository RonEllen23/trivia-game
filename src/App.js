import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Setting from "./components/Setting";
import GameApp from "./components/GameApp";



function App() {
    const [category, setCategory] = useState("14");
    const [difficulty, setDifficulty] = useState("easy");

    return (
        <Router>
            <Switch>
                <Route path="/Setting"  render={(props) => <Setting {...props} setCategory={setCategory} setDifficulty={setDifficulty} />}></Route>
                <Route path="/GameApp" render={(props) => <GameApp {...props} category={category} difficulty={difficulty} />}></Route>
            </Switch>
        </Router>
    );
}

export default App;
