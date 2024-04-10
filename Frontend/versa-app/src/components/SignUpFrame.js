import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import './../css/SignUpFrame.css';
import Button from "./Button";
import close from './../img/ellipse.png';
import Image from "./Image";
import Input from "./Input";
import axios from "axios";

const SignUpFrame = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        console.log(email)
        console.log(password)
        try {
            const response = await axios.post('http://localhost/api/v1/register', {
                email: email,
                password: password
            });
            console.log('Registration successful:', response.data);
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
                        errorClassName={"error-email"}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type={"password"}
                        placeholder={"password"}
                        className={"sign-up-frame-password"}
                        errorClassName={"error-password"}
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
                </div>
            </div>
        </div>
    );
};

export default SignUpFrame;
