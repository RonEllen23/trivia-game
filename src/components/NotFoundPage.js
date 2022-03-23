import error_image from "../Images/not_found.png";


function NotFoundPage() {
    return (
        <div>
            <img src={error_image} style={{width:"50%", padding: "50px 50px 50px 50px", marginLeft:"300px"}}/>

        </div>
    );
}

export default NotFoundPage;