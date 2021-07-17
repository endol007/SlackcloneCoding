import React from "react";
import styled from "styled-components";

const Input = (props) => {
    const {
        padding,
        height,
        width,
        children,
        border_radius,
        font_size,
        text,
        type,
        margin
    } = props;
    const styles = {
        padding: padding,
        height: height,
        width: width,
        border_radius: border_radius,
        font_size: font_size,
        margin: margin,
    }
    return(
        <React.Fragment>
            <LoginInput 
            placeholder={text}
            type={type}
            {...styles}>{children}</LoginInput>
        </React.Fragment>
    )
}
Input.defaultProps={
    children: null,
    type: "",
    text: false,
    padding: false,
    height: false,
    width: false,
    font_size: false,
    border_radius: false,
    margin: false,
}

const LoginInput = styled.input`
    width: 100%;
    height: 44px;
    padding: ${(props) => props.padding};
    font-size: ${(props) => props.font_size};
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29,155,209,.3);
    line-height: 1.33333333;
    font-size: 18px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #868686;
    margin: ${(props) => props.margin};
    transition: border 80mx ease-out,box-shadow 80ms ease-out;
    font: 400 13.3333px Arial;
    cursor: text;
`;
export default Input;