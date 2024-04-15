import React from 'react'
import {Helmet} from 'react-helmet'
import {useHistory} from 'react-router-dom'
import './../css/SignInFrame.css'
import Button from "./Button";
import close from './../img/ellipse.png'
import Image from "./Image";
import Input from "./Input";
import {useState} from 'react'
import {validateEmail, validatePassword} from "./Validator"
import axios from "axios"


axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});


const SignInFrame = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isWrongEmail, setEmailFlag] = useState(false)
    const [isWrongPassword, setPasswordFlag] = useState(false)
    const [isWrongAuth, setAuthFlag] = useState(false)
    const handleEmailChange = (email) => {
        if (email.length === 0) {
            setEmailFlag(false)
            return
        }
        setEmailFlag(!validateEmail(email))
    }

    const handlePasswordChange = (password) => {
        if (password.length === 0) {
            setPasswordFlag(false)
            return
        }
        setPasswordFlag(!validatePassword(password))
    }

    const registerUser = async () => {
        setAuthFlag(false)
        handleEmailChange(email)
        handlePasswordChange(password)
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        if (!isEmailValid || !isPasswordValid) return
        try {
            const response = await axios.post('http://localhost/api/v1/login', {
                email: email,
                password: password
            })
            localStorage.setItem('accessToken', response.data['accessToken'])
            localStorage.setItem('refreshToken', response.data['refreshToken'])
            history.push('/editor')
        } catch (error) {
            if (axios.isAxiosError(error) && error.response &&
                error.response.status === 401) {
                console.log(error.response)
                setAuthFlag(true)
            }
        }
    };

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
                           onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input type={"password"}
                           placeholder={"password"}
                           className={"sign-in-frame-password"}
                           onChange={(e) => setPassword(e.target.value)}
                    />

                    <Image src={close}
                           className="sign-in-frame-ellipse1"
                           onClick={() => history.push('/')}
                    />
                    <span className="sign-in-frame-text7">
                        <span>Log in to your personal account</span>
                    </span>
                    <Button text="Sign in"
                            backgroundColor="rgb(81, 208, 210)"
                            id="sign-in-frame-button"
                            onClick={registerUser}
                    />
                    {isWrongEmail && (
                        <span className={"error-email"}>
                            Email must be correct
                        </span>
                    )}
                    {isWrongPassword && (
                        <span className={"error-password"}>
                            Password must contain at least 10 characters, 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character
                        </span>
                    )}
                    {isWrongAuth && (
                        <span className={"error-auth"}>
                            Incorrect email or password
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SignInFrame
