import React, { Component } from 'react';

class IconButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
        }
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }

    handleMouseEnter = () => {
        this.setState({isHovered: true})
    }

    handleMouseLeave = () => {
        this.setState({
            isHovered: false,
        })
    }

    render() {
        const { icon: Icon, className, onClick } = this.props;
        const hoveredStyle = {
            cursor: this.state.isHovered ? 'pointer' : 'default',
        }

        return (
            <Icon
                className={className}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={onClick}
                style={hoveredStyle}
            />
        );
    }
}

export default IconButton;
