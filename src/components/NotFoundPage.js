import error_image from "../Images/not_found.png";
import {Link} from "react-router-dom";
import {Button, Icon} from "semantic-ui-react";
import React from "react";


function NotFoundPage(ele) {
    return (
        <div>
            <img src={error_image} style={{width:"50%", padding: "50px 50px 50px 50px", marginLeft:"300px"}}/>
            <Button color='Black' > <Link style={{color:"#876f70"}} to="/Setting">Home Page</Link> <Icon style={{color:"#876f70"}} name='home' /></Button>
        </div>
    );
}

export default NotFoundPage;