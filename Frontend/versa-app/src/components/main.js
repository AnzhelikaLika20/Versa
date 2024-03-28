import {Helmet} from 'react-helmet'
import React from 'react'

import './../css/main.css'
import Button from './Button'

class Main extends React.Component {
    render() {
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
                    <Button text="Sign in" backgroundColor="rgb(81, 208, 210)" id="frame1-sign-in"/>
                    <Button text="Sign up" backgroundColor="rgba(254, 114, 101, 1)" id="frame1-sign-up"/>
                </div>
            </div>
        )
    }
}

export default Main
