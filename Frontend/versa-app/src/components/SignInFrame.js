import React from 'react'
import {Helmet} from 'react-helmet'
import { useHistory } from 'react-router-dom'
import './../css/SignInFrame.css'
import Button from "./Button";
import close from './../img/ellipse.png'
import Image from "./Image";
import Input from "./Input";


const SignInFrame = () => {
    const history = useHistory();
        
    return (
        <div className="sign-in-frame-container">
            <Helmet>
                <title>Versa</title>
                <meta property="og:title" content="sign-inFrame - exported project"/>
            </Helmet>
            <div className="sign-in-frame-frame1">
                <div className="sign-in-frame-background"></div>

                <div className="sign-in-frame-form">
                    <Input type={"email"}
                           placeholder={"email"} 
                           className={"sign-in-frame-email"}
                           errorClassName={"error-email"}
                    />

                    <Input type={"password"} 
                           placeholder={"password"} 
                           className={"sign-in-frame-password"} 
                           errorClassName={"error-password"}
                    />
                    
                    <Image src={close}
                           className="sign-in-frame-ellipse1"
                           onClick={() => history.push('/')}
                    />
                    <span className="sign-in-frame-text7">
        <span>Log in to your personal account</span>
      </span>
                    <Button text="Sign in" backgroundColor="rgb(81, 208, 210)" id="sign-in-frame-button"/>
                </div>
            </div>
        </div>
    )
}

export default SignInFrame
