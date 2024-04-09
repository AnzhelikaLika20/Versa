import {Helmet} from 'react-helmet'
import { useHistory } from 'react-router-dom';
import React from 'react'

import './../css/MainFrame.css'
import Button from './Button'
import editor from './../img/versa-editor.png'


const MainFrame = () => {
    const history = useHistory();

    return (
        <div className="frame1-container">
            <Helmet>
                <title>Versa</title>
            </Helmet>
            <div className="frame1-frame1">
                <span className="frame1-slogan">Make your life versatile</span>
                <div className="frame1-feature-picture">
                    <img
                        src={editor}
                        alt="Versa editor"
                        draggable="false"
                        className="main-frame-editor"
                    />
                </div>
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
                        onClick={() => history.push('/signin')}/>
                <Button text="Sign up" backgroundColor="rgba(254, 114, 101, 1)" id="frame1-sign-up"
                        onClick={() => history.push('/signup')}/>
            </div>
        </div>
    )
}

export default MainFrame
