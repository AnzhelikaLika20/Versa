import React from 'react'

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false
        };

        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }

    handleMouseEnter = () => {
        this.setState({isHovered: true})
    }

    handleMouseLeave = () => {
        this.setState({isHovered: false})
    }
    
    render() {
        const { text, backgroundColor, id, onClick } = this.props;
        const {isHovered} = this.state;

        const buttonHoverStyles = {
            backgroundColor: isHovered ? backgroundColor : 'rgb(1, 3, 26, 1)',
            color: isHovered ? 'rgb(1, 3, 26, 1)' : 'white',
            cursor: isHovered ? 'pointer' : 'default',
        };

        return (
            <button
                type="button"
                className={id}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={onClick}
                style={buttonHoverStyles}
            >
                {text}
            </button>
        );
    }
}

export default Button