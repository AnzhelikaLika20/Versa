import React, {useState} from 'react'
const Button = (props) => {
    const { text, backgroundColor, id } = props;

    const [isHovered, setIsHovered] = useState(false);

    const buttonHoverStyles = {
        backgroundColor: isHovered? backgroundColor : 'rgb(1, 3, 26, 1)',
        color: isHovered? 'rgb(1, 3, 26, 1)' : 'white',
        cursor: 'pointer',
    };

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <button
            type="button"
            className={id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={buttonHoverStyles}
        >
            {text}
        </button>
    );
}

export default Button