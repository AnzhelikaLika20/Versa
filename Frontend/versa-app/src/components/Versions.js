import React from "react";
import Version from "./Version";


class Versions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { versions } = this.props
        return <div>
            {versions.map((el) => (
                <Version el={el}/>
            ))}
        </div>
    }
}

export default Versions