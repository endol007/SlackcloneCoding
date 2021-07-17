import React from "react";
import styled from "styled-components";
const Button = (props) => {
    const {_onClick, text, display} = props;
    return(
    <React.Fragment>
        <LoginButton onClick={_onClick} display={display}>{text}</LoginButton>
    </React.Fragment>)
}
Button.defaultProps={
    text: false,
    margin: false,
    display: false,
    _onClick: ()=> {},
}

const LoginButton = styled.button`
    display: ${(props)=> props.display};
    width: 100%;
    color: #fff;
    background-color: #4a154b;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    height: 44px;
    cursor: pointer;
`;
export default Button;