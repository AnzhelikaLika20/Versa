import React from 'react';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: localStorage.getItem('content') || ''
        };
    }

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({ value });
        localStorage.setItem('content', value);
    };

    render() {
        const { placeholder, className } = this.props;
        const { value } = this.state;

        const checkLocalStorage = async () => {
            let prevValue = localStorage.getItem('content');
            setInterval(() => {
                const newValue = localStorage.getItem('content');
                if (newValue !== prevValue) {
                    this.setState({
                        value: newValue
                    })
                    prevValue = newValue;
                }
            }, 1000); // Проверка каждую секунду
        };

        checkLocalStorage().then();
        return (
            <textarea
                placeholder={placeholder}
                className={className}
                value={value}
                onChange={this.handleChange}
            />
        );
    }
}

export default TextInput;
