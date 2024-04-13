import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import './../css/SignUpFrame.css';
import Button from "./Button";
import close from './../img/ellipse.png';
import Image from "./Image";
import Input from "./Input";
import {validateEmail, validatePassword} from "./Validator"
import axios from "axios";

axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage['token']}`;
    return config;
});
const SignUpFrame = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isWrongEmail, setEmailFlag] = useState(false)
    const [isWrongPassword, setPasswordFlag] = useState(false)
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
        handleEmailChange(email)
        handlePasswordChange(password)
        if (isWrongEmail || isWrongPassword) return
        try {
            console.log(email)
            console.log(password)
            let response = await axios.post('http://localhost/api/v1/register', {
                email: email,
                password: password
            });
            response = await axios.post('http://localhost/api/v1/login', {
                email: email,
                password: password
            })
            localStorage.setItem('token', response.data['accessToken'])
            history.push('/editor')
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="sign-up-frame-container">
            <Helmet>
                <title>Versa</title>
                <meta property="og:title" content="sign-upFrame - exported project"/>
            </Helmet>
            <div className="sign-up-frame-frame1">
                <div className="sign-up-frame-form">
                    <Input
                        type={"email"}
                        placeholder={"email"}
                        className={"sign-up-frame-email"}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type={"password"}
                        placeholder={"password"}
                        className={"sign-up-frame-password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Image
                        src={close}
                        className="sign-up-frame-ellipse1"
                        onClick={() => history.push('/')}
                    />

                    <span className="sign-up-frame-text7">
                        <span>Create your own personal account</span>
                    </span>

                    <Button
                        text="Sign up"
                        backgroundColor="rgba(254, 114, 101)"
                        id="sign-up-frame-button"
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
                </div>
            </div>
        </div>
    );
};

export default SignUpFrame;
