import React from 'react'

class TextInput extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {placeholder, className} = this.props;

        return (
            <textarea
                   placeholder={placeholder}
                   className={className}
            />
        );
    }
}

export default TextInput