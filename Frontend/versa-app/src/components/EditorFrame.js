import React from 'react';
import {Helmet} from 'react-helmet';
import './../css/EditorFrame.css';
import {FaCameraRetro} from "react-icons/fa6"; // <FaCameraRetro /> // snapshot
import {FaCheck} from "react-icons/fa"; //  <FaCheck /> // checkout
import {RiDeleteBin2Fill} from "react-icons/ri"; // <RiDeleteBin2Fill /> // delete
import {CgProfile} from "react-icons/cg"; // <CgProfile /> // profile
import TextInput from "./TextInput";
import IconButton from "./IconButton"
import {useHistory} from "react-router-dom";
import {useState} from 'react'
import axios from "axios";

axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

const EditorFrame = () => {
    const history = useHistory();
    const [text, setText] = useState('');

    const loadFile = async () => {
        console.log(text)
        let blob = new Blob([text], {type: 'text/plain'});
        let formData = new FormData();
        formData.append('file', blob, 'file.txt');
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        try {
            const response = await axios.post('http://localhost/api/v1/files', formData, { headers })
            console.log(response.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response)
            }
        }
    }

    const deleteFile = async () => {
        const fileName = 'file.txt'
        try {
            const response = await axios.delete(`http://localhost/api/v1/files/${fileName}`, {
                version: 2
            })
            console.log(response.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response)
            }
        }
    }

    return (
        <div className="editor-frame-container">
            <Helmet>
                <title>Versa</title>
                <meta property="og:title" content="EditorFrame - exported project"/>
            </Helmet>
            <div className="editor-frame-frame13">
                <div className="editor-frame-editor">
                    <TextInput
                        placeholder={"Type your text here..."}
                        className={"editor-frame-text"}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="editor-frame-versions">
                    <div
                        className="editor-frame-rectangle6"
                    />
                    <span className="editor-frame-text2">
                            <span>Init text</span>
                        </span>
                </div>

                <span className="editor-frame-snapshots">
                    <span>Snapshots</span>
                </span>

                <span className="editor-frame-versa-editor">
                    <span>Versa editor</span>
                </span>

                <IconButton
                    icon={FaCheck}
                    className="checkout-icon"
                />

                <IconButton
                    icon={RiDeleteBin2Fill}
                    className="delete-icon"
                    onClick={deleteFile}
                />

                <IconButton
                    icon={FaCameraRetro}
                    className="snapshot-icon"
                    onChange={(e) => setText(e.target.value)}
                    onClick={loadFile}
                />

                <IconButton
                    icon={CgProfile}
                    className="profile-icon"
                    onClick={() => history.push('/profile')}
                />
            </div>
        </div>
    );

}

export default EditorFrame;
