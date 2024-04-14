import React from 'react'

class TextInput extends React.Component {
    render() {
        const {placeholder, className, onChange} = this.props;

        return (
            <textarea
                   placeholder={placeholder}
                   className={className}
                   onChange={onChange}
            />
        );
    }
}

export default TextInput