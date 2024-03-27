import { Helmet } from 'react-helmet'

import './frame1.css'
import Button from './Button.js'


const Frame1 = (props) => {
  return (
      <div className="frame1-container">
        <Helmet>
          <title>exported project</title>
        </Helmet>
        <div className="frame1-frame1">
          <span className="frame1-slogan">Make your life versatile</span>
          <img
              alt="Rectangle31710"
              src="/external/rectangle31710-meem-500h.png"
              className="frame1-rectangle"
          />
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
            <span>versa editor</span>
          </span>
          </div>
          <Button text="Sign in" backgroundColor="rgb(81, 208, 210)" id="frame1-sign-in"/>
          <Button text="Sign up" backgroundColor="rgba(254, 114, 101, 1)" id="frame1-sign-up"/>
        </div>
      </div>
  )
}

export default Frame1
