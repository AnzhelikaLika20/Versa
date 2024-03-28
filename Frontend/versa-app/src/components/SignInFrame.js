import React from 'react'

import {Helmet} from 'react-helmet'

import './../css/SignInFrame.css'
import Button from "./Button";
import close from './../img/ellipse.png'
import background from './../img/rectangle.png'
import Image from "./Image";

class SignInFrame extends React.Component {

    render() {
        const {onClick} = this.props
        
        return (
            <div className="sign-in-frame-container">
                <Helmet>
                    <title>Versa</title>
                    <meta property="og:title" content="sign-inFrame - exported project"/>
                </Helmet>
                <div className="sign-in-frame-frame1">
                    <span className="sign-in-frame-slogan">Make your life versatile</span>
                    <button type="button" className="sign-in-frame-sign-in button">
                        Sign in
                    </button>
                    <button type="button" className="sign-in-frame-sign-up button">
                        Sign up
                    </button>
                    <div className="sign-in-frame-feature-picture"></div>
                    <div className="sign-in-frame-fish">
          <span className="sign-in-frame-text">
            <span className="sign-in-frame-text1">
              Enhance your ability to create with
              <span
                  dangerouslySetInnerHTML={{
                      __html: ' ',
                  }}
              />
            </span>
            <span>versa editor</span>
          </span>
                    </div>
                    <Image src={background}
                           className="sign-in-frame-rectangle4"
                           toHover={false}
                    />
                    <div className="sign-in-frame-form">
                        <div className="sign-in-frame-email">
            <span className="sign-in-frame-text3">
              <span>email</span>
            </span>
                        </div>
                        <div className="sign-in-frame-password">
            <span className="sign-in-frame-text5">
              <span>password</span>
            </span>
                        </div>
                        <Image src={close}
                               className="sign-in-frame-ellipse1"
                               toHover={true}
                               onClick={onClick}
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
}

export default SignInFrame
