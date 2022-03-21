import {Button , Dropdown, Card, Container, Form, Icon } from "semantic-ui-react";
import "../Styles/Setting.css";
import {CATEGORY, DIFFICULTY} from "../Contants/AdditionalInfoUrl";
import GameApp from "./GameApp";

function Setting(props) {

    let setCategory = props.setCategory;
    let setDifficulty = props.setDifficulty;

    const handleDropDownSelectCategory = (event, data) => {
        setCategory(data.value);
    };

    const handleDropDownSelectDifficulty = (event, data) => {
        setDifficulty(data.value);
    };

    function onClickGame() {

        console.log("button has been clicked!");
    }

    return (
        <Container>
            <h1 className="header-setting"> Welcome!</h1>
            <Form>
                <Form.Field>
                    <label>Choose Category</label>
                    <Dropdown styles={{control: customElements}}
                        placeholder='---'
                        search
                        fluid
                        selection
                        options={CATEGORY}
                        onChange={handleDropDownSelectCategory}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Choose Difficulty</label>
                    <Dropdown
                        placeholder='---'
                        fluid
                        search
                        selection
                        options={DIFFICULTY}
                        onChange={handleDropDownSelectDifficulty}
                    />
                </Form.Field>
            </Form>
            <div className="button-setting">
                <Button  inverted color='olive' onClick={onClickGame}> Start Game <Icon name='right arrow' /></Button>
            </div>
        </Container>
    );
}
export default Setting;