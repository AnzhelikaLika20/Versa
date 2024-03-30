import {Helmet} from 'react-helmet'
import React from 'react'

import './../css/MainFrame.css'
import Button from './Button'
import SignInFrame from "./SignInFrame";
import SignUpFrame from "./SignUpFrame";

class MainFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignInOpen: false,
            isSignUpOpen: false
        };
        this.openSignIn = this.openSignIn.bind(this)
        this.closeSignIn = this.closeSignIn.bind(this)
        this.openSignUp = this.openSignUp.bind(this)
        this.closeSignUp = this.closeSignUp.bind(this)
    }

    openSignIn() {
        this.setState({isSignInOpen: true})
    }
    
    closeSignIn() {
        this.setState({isSignInOpen: false})
        
    }

    openSignUp() {
        this.setState({isSignUpOpen: true})
    }

    closeSignUp() {
        this.setState({isSignUpOpen: false})
    }

    render() {
        if (this.state.isSignInOpen)
            return <SignInFrame onClick={() => this.closeSignIn()}/>
        
        if (this.state.isSignUpOpen)
            return <SignUpFrame onClick={() => this.closeSignUp()}/>
        
        return (
            <div className="frame1-container">
                <Helmet>
                    <title>Versa</title>
                </Helmet>
                <div className="frame1-frame1">
                    <span className="frame1-slogan">Make your life versatile</span>
                    <div className="frame1-feature-picture"></div>
                    <div className="frame1-fish">
          <span className="frame1-text">
            <span className="frame1-text1">
              Enhance your ability to create with
              <span
                  dangerouslySetInnerHTML={{
                      __html: ' ',
                  }}
              />
            </span>
            <span className="frame1-text1"><i>versa editor</i></span>
          </span>
                    </div>
                    <Button text="Sign in" backgroundColor="rgb(81, 208, 210)" id="frame1-sign-in"
                            onClick={() => this.openSignIn()}/>
                    <Button text="Sign up" backgroundColor="rgba(254, 114, 101, 1)" id="frame1-sign-up"
                            onClick={() => this.openSignUp()}/>
                </div>
            </div>
        )
    }
}

export default MainFrame
