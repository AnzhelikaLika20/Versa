import React from "react";
import Version from "./Version";
import axios from "axios";

const getFile = async () => {
    const fileName = localStorage.getItem('fileName')
    const version = localStorage.getItem('version')
    try {
        const response = await axios.get(`http://localhost/api/v1/files/${fileName}?version=${version}`)
        localStorage.setItem('content', response.data)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response)
        }
    }
}

class Versions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {versions} = this.props
        return <div>
            {versions.map((el) => (
                <Version
                    el={el}
                    onClick={() => {
                        localStorage.setItem('fileName', el['fileName'])
                        localStorage.setItem('version', el['version'])
                        getFile()
                            .then((result) => {
                        })
                            .catch((error) => {
                                console.error('Error:', error);
                        });
                    }}
                />
            ))}
        </div>
    }
}

export default Versions