import {Button, Container, Form, Icon, Message} from "semantic-ui-react";
import "../Styles/Setting.css";
import {CATEGORY, DIFFICULTY} from "../Contants/AdditionalInfoUrl";
import React from "react";
import {Link} from "react-router-dom";

function Setting(props) {

    let setCategory = props.setCategory;
    let setDifficulty = props.setDifficulty;

    //update category
    const handleDropDownSelectCategory = (event, data) => {
        setCategory(data.value);
    };

    //update difficulty
    const handleDropDownSelectDifficulty = (event, data) => {
        setDifficulty(data.value);
    };

    return (
        <div className="background-setting">
            <Container text className="container-setting">
                <h1 className="header-setting"> Welcome!</h1>
                <Form>
                    <Form.Field>
                        <label className="label-setting">Choose Category</label>
                        <div className="dropdown-setting">
                            <Form.Select  styles={{control: customElements} }
                                placeholder='Please choose category'
                                search
                                fluid
                                selection
                                options={CATEGORY}
                                onChange={handleDropDownSelectCategory}
                            />
                        </div>
                    </Form.Field>
                    <Form.Field>
                        <label className="label-setting">Choose Difficulty</label>
                        <div className="dropdown-setting">
                            <Form.Select
                                placeholder='Please choose difficulty'
                                fluid
                                search
                                selection
                                options={DIFFICULTY}
                                onChange={handleDropDownSelectDifficulty}
                            />
                        </div>
                    </Form.Field>
                        {!props.category || !props.difficulty ?
                            <Message  negative>
                                <Message.Header>You must complete all required fields</Message.Header>
                            </Message>
                       :
                            <Message positive>
                                <Message.Header>You complete all required fields</Message.Header>
                                <p>
                                    Enjoy the game and <b>Good luck!</b>
                                </p>
                            </Message>
                        }
                    <div >
                        {props.category && props.difficulty ?
                            <Button color='white' > <Link style={{color:"#876f70"}} to="/GameApp">Start Game</Link> <Icon style={{color:"#876f70"}} name='right arrow' /></Button>
                       :
                            <div className="disable-setting">Start Game</div>
                        }
                    </div>
                </Form>
            </Container>
        </div>
    );
}
export default Setting;