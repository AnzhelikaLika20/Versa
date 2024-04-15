import React from 'react';
import {Helmet} from 'react-helmet';
import './../css/EditorFrame.css';
import {FaCameraRetro} from "react-icons/fa6"; // <FaCameraRetro /> // snapshot
import {MdOutlineDownloading} from "react-icons/md"; //  <MdOutlineDownloading /> // download (not implemented)
import {RiDeleteBin2Fill} from "react-icons/ri"; // <RiDeleteBin2Fill /> // delete
import {CgProfile} from "react-icons/cg"; // <CgProfile /> // profile
import TextInput from "./TextInput";
import IconButton from "./IconButton"
import Versions from "./Versions";
import {useHistory} from "react-router-dom";
import {useState} from 'react'
import axios from "axios";

axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

const EditorFrame = () => {
    const history = useHistory();
    const [versions, setVersions] = useState([])

    const loadAllVersions = async () => {
        try {
            let response = await axios.get('http://localhost/api/v1/files')
            setVersions(response.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response)
            }
        }
    }
    const saveFile = async () => {
        let blob = new Blob([localStorage.getItem('content')], {type: 'text/plain'});
        let formData = new FormData();
        formData.append('file', blob, 'file.txt');
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        try {
            await axios.post('http://localhost/api/v1/files', formData, { headers })
            loadAllVersions().then()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response)
            }
        }
    }

    const deleteFile = async () => {
        const fileName = localStorage.getItem('fileName')
        const version = localStorage.getItem('version')
        try {
            await axios.delete(`http://localhost/api/v1/files/${fileName}?version=${version}`)
            loadAllVersions().then()
            localStorage.setItem('content', '')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response)
            }
        }
    }

    loadAllVersions().then()
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
                        onChange={(e) => localStorage.setItem('content', e.target.value)}
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
                    icon={MdOutlineDownloading}
                    className="load-icon"
                />

                <IconButton
                    icon={RiDeleteBin2Fill}
                    className="delete-icon"
                    onClick={deleteFile}
                />

                <IconButton
                    icon={FaCameraRetro}
                    className="snapshot-icon"
                    onChange={(e) => localStorage.setItem('content', e.target.value)}
                    onClick={saveFile}
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
