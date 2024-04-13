import {Helmet} from "react-helmet";
import Image from "./Image";
import close from "../img/ellipse.png";
import Button from "./Button";
import React from "react";
import {useHistory} from "react-router-dom";
import '../css/ProfileFrame.css'


const ProfileFrame = () => {
    const history = useHistory();
    const logOut = () => {
        localStorage.removeItem('token')
        history.push('/')
    }
    return (
        <div className="sign-in-frame-container">
            <Helmet>
                <title>Versa profile</title>
                <meta property="og:title" content="sign-inFrame - exported project"/>
            </Helmet>
            <div className="account-frame-outer">
                <div className="account-frame-form">
                    <Image src={close}
                           className="sign-in-frame-ellipse1"
                           onClick={() => history.push('/editor')}
                    />
                    <Button
                        text="Log out"
                        backgroundColor="rgba(254, 114, 101)"
                        id="log-out-button"
                        onClick={logOut}
                    />
                    <Button
                        text="Delete account"
                        backgroundColor="rgba(254, 114, 101)"
                        id="delete-button"
                        onClick={logOut}
                    />
                    <span className="account-frame-title">
                        <span>Personal account management</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProfileFrame