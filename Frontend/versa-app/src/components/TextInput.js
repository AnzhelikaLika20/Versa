import React from 'react'

class TextInput extends React.Component {
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