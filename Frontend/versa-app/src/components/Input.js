import React from 'react'

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toShow: false,
            isHovered: false
        }
        
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        if (this.state.toShow)
            this.setState({toShow: false})
        else
            this.setState({toShow: true})
    }
    handleMouseEnter = () => {
        this.setState({isHovered: true})
    }

    handleMouseLeave = () => {
        this.setState({isHovered: false})
    }
    render() {
        const { type, placeholder, className } = this.props;
        const hoverStyle = {
            cursor: this.state.isHovered ? 'pointer' : 'default',
        }
        
        if (type === "password")
            return (
                <div>
                    <input type={this.state.toShow ? "text" : "password"} placeholder={placeholder} className={className} />
                    <span id="togglePassword" 
                          onClick={this.handleClick}
                          onMouseEnter={this.handleMouseEnter}
                          onMouseLeave={this.handleMouseLeave}
                          style={hoverStyle}
                    >
                        👁️
                    </span>
                </div>
            )
        
        return (
            <input type={type} placeholder={placeholder} className={className} />
        );
    }
}

export default Input