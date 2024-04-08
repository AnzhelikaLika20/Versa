import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import './../css/EditorFrame.css';
import {FaCameraRetro} from "react-icons/fa6"; // <FaCameraRetro /> // snapshot
import {FaCheck} from "react-icons/fa"; //  <FaCheck /> // checkout
import {RiDeleteBin2Fill} from "react-icons/ri"; // <RiDeleteBin2Fill /> // delete
import {CgProfile} from "react-icons/cg"; // <CgProfile /> // profile
import TextInput from "./TextInput";
import IconButton from "./IconButton"


class EditorFrame extends Component {

    render() {
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
                        color={'blue'}
                    />

                    <IconButton 
                        icon={RiDeleteBin2Fill}
                        className="delete-icon"
                        color={'red'}
                    />

                    <IconButton 
                        icon={FaCameraRetro}
                        className="snapshot-icon"
                        color={'blue'}
                    />

                    <IconButton 
                        icon={CgProfile}
                        className="profile-icon"
                        color={'red'}
                    />
                </div>
            </div>
        );
    }
}

export default EditorFrame;
