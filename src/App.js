import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Setting from "./components/Setting";
import GameApp from "./components/GameApp";
import NotFoundPage from "./components/NotFoundPage";



function App() {
    const [category, setCategory] = useState();
    const [difficulty, setDifficulty] = useState();

    return (
            <Router>
                <Switch>
                    <Route path="/Setting"  render={(props) => <Setting {...props} setCategory={setCategory} setDifficulty={setDifficulty} category={category} difficulty={difficulty}  />}></Route>
                    <Route path="/GameApp" render={(props) => <GameApp {...props} category={category} difficulty={difficulty} setCategory={setCategory} setDifficulty={setDifficulty}  />}></Route>
                    <Route path="/*" component={NotFoundPage} />

                </Switch>
            </Router>
    );
}

export default App;
