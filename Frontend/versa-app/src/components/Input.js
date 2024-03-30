import React from 'react'

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null;
};

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toShow: false,
            isHovered: false,
            isWrongEmail: false,
            isWrongPassword: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
    }

    handleClick() {
        if (this.state.toShow)
            this.setState({toShow: false})
        else
            this.setState({toShow: true})
    }

    handleEmailChange(event) {
        let status
        if (validateEmail(event.target.value)) {
            status = false
            console.log("false")
        } else {
            status = true
            console.log("true")
        }
        this.setState({
            isWrongEmail: status
        })
    }

    handlePasswordChange(event) {
        let status
        if (event.target.value.length < 10) {
            status = true
        } else {
            status = false
        }
        this.setState({
            isWrongPassword: status
        })
    }

    handleMouseEnter = () => {
        this.setState({isHovered: true})
    }

    handleMouseLeave = () => {
        this.setState({isHovered: false})
    }

    render() {
        const {type, placeholder, className, errorClassName} = this.props;
        const hoverStyle = {
            cursor: this.state.isHovered ? 'pointer' : 'default',
        }

        if (type === "password")
            return (
                <div>
                    <input type={this.state.toShow ? "text" : "password"}
                           placeholder={placeholder}
                           className={className}
                           onChange={this.handlePasswordChange}
                    />
                    <span id="togglePassword"
                          onClick={this.handleClick}
                          onMouseEnter={this.handleMouseEnter}
                          onMouseLeave={this.handleMouseLeave}
                          style={hoverStyle}
                    >
                        👁️
                    </span>
                    {this.state.isWrongPassword && (
                        <span className={errorClassName}>
                            Password must contain at least 10 characters
                        </span>
                    )}
                </div>
            )

        return (
            <div>
                <input type={type}
                       placeholder={placeholder}
                       className={className}
                       onChange={this.handleEmailChange}
                />
                {this.state.isWrongEmail && (
                    <span className={errorClassName}>
                            Email must be correct
                    </span>
                )}
            </div>
            
        );
    }
}

export default Input