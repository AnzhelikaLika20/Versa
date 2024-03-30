import React, { Component } from 'react';

class IconButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
            isClicked: false
        }
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleMouseClick = this.handleMouseClick.bind(this)
    }

    handleMouseEnter = () => {
        this.setState({isHovered: true})
    }

    handleMouseLeave = () => {
        this.setState({
            isHovered: false,
            isClicked: false
        })
    }

    handleMouseClick = () => {
        this.setState({isClicked: true})
        setTimeout(() => {
            this.setState({
                isClicked: false
            })
        }, 350)
    }
    
    getColor(color) {
        if (color === "red")
            return 'rgb(254, 114, 101)';
        return 'rgb(81, 208, 210)'
    }
    render() {
        const { icon: Icon, className, color } = this.props;
        const hoveredStyle = {
            cursor: this.state.isHovered ? 'pointer' : 'default',
        }

        return (
            <Icon
                className={className}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleMouseClick}
                style={hoveredStyle}
                color={this.state.isClicked ? this.getColor(color) : 'rgba(217, 217, 217, 1)'}
            />
        );
    }
}

export default IconButton;
