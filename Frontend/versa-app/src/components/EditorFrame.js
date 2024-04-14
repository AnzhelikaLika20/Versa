import React from 'react';
import {Helmet} from 'react-helmet';
import './../css/EditorFrame.css';
import {FaCameraRetro} from "react-icons/fa6"; // <FaCameraRetro /> // snapshot
import {FaCheck} from "react-icons/fa"; //  <FaCheck /> // checkout
import {RiDeleteBin2Fill} from "react-icons/ri"; // <RiDeleteBin2Fill /> // delete
import {CgProfile} from "react-icons/cg"; // <CgProfile /> // profile
import TextInput from "./TextInput";
import IconButton from "./IconButton"
import Versions from "./Versions";
import {useHistory} from "react-router-dom";
import {useState} from 'react'
import axios from "axios";
import versions from "./Versions";

axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

const EditorFrame = () => {
    const history = useHistory();
    const [text, setText] = useState('');
    const [versions, setVersions] = useState([])

    const loadFile = async () => {
        console.log(text)
        let blob = new Blob([text], {type: 'text/plain'});
        let formData = new FormData();
        formData.append('file', blob, 'file.txt');
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        try {
            await axios.post('http://localhost/api/v1/files', formData, { headers })
            let response = await axios.get('http://localhost/api/v1/files')
            console.log(response.data)
            setVersions(response.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response)
            }
        }
    }

    const deleteFile = async () => {
        const fileName = 'file.txt'
        const version = 1
        console.log(version)
        try {
            await axios.delete(`http://localhost/api/v1/files/${fileName}?version=${version}`)
            let response = await axios.get('http://localhost/api/v1/files')
            console.log(response.data)
            setVersions(response.data)
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
                    <Versions versions={versions}/>
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
