import React, {Component} from "react";

class Version extends Component {
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
        })
    }

    handleMouseClick = (onClick) => {
        onClick()
        this.setState({
            isClicked: !this.state.isClicked
        })
    }

    render() {
        const { el, onClick } = this.props;
        const hoveredStyle = {
            backgroundColor: this.state.isClicked ? 'rgb(81, 208, 210)' : 'rgb(1, 3, 26, 1)',
            color: this.state.isClicked ? 'rgb(1, 3, 26, 1)' : 'rgba(217, 217, 217, 1)',
            cursor: this.state.isHovered ? 'pointer' : 'default',
        }

        return (
            <div
                className="editor-frame-version"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleMouseClick}
                style={hoveredStyle}
            >
                <span>{el['fileName'] + '_' + el['version']}</span>
            </div>
        );
    }
}

export default Version