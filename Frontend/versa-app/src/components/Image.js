import React from 'react'

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false
        }
    }

    handleMouseEnter = () => {
        this.setState({isHovered: true})
    }

    handleMouseLeave = () => {
        this.setState({isHovered: false})
    }
    
    render() {
        const {src, className, onClick} = this.props;
        
        const imageHoverStyles = {
            cursor: this.state.isHovered ? 'pointer' : 'default'
        };

        return (
            <img
                src={src}
                className={className}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={onClick}
                style={imageHoverStyles}
            />
        )
    }
}

export default Image