import React from 'react'

import {Helmet} from 'react-helmet'

import './../css/SignUpFrame.css'
import Button from "./Button";
import close from './../img/ellipse.png'
import Image from "./Image";
import Input from "./Input";

class SignUpFrame extends React.Component {
    render() {
        const {onClick} = this.props

        return (
            <div className="sign-up-frame-container">
                <Helmet>
                    <title>Versa</title>
                    <meta property="og:title" content="sign-upFrame - exported project"/>
                </Helmet>
                <div className="sign-up-frame-frame1">
                    <div className="sign-up-frame-form">
                        <Input type={"email"} 
                               placeholder={"email"} 
                               className={"sign-up-frame-email"}
                               errorClassName={"error-email"}
                        />

                        <Input type={"password"} 
                               placeholder={"password"} 
                               className={"sign-up-frame-password"}
                               errorClassName={"error-password"}
                        />

                        <Image src={close}
                               className="sign-up-frame-ellipse1"
                               onClick={onClick}
                        />
                        <span className="sign-up-frame-text7">
            <span>Create your own personal account</span>
          </span>
                        <Button text="Sign up" backgroundColor="rgba(254, 114, 101)" id="sign-up-frame-button"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUpFrame
